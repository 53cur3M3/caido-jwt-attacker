/**
 * RSA public key recovery from two JWT signatures sharing the same private key.
 * Implements the algorithm by Florian Picca (github.com/FlorianPicca/JWT-Key-Recovery).
 *
 * Given two RS256/RS384/RS512 JWTs signed with the same RSA private key, we
 * can recover the public modulus n using the PKCS#1 v1.5 signature structure:
 *
 *   sig^e ≡ EMSA_PKCS1(hash(message)) (mod n)
 *   => sig^e - EMSA_PKCS1(hash) = k * n
 *
 * GCD of two such values (from two signatures) gives a multiple of n.
 * We then factor out small primes to isolate n itself.
 *
 * Note: computing sig^65537 as a plain BigInt produces ~16 MB integers.
 * This is intentionally run in a worker/background context.
 */

import { createHash } from "crypto";
import { b64urlDecode } from "./jwt.js";
import { encodeSequence, encodeInteger, encodeBitString } from "./rsa.js";
import * as BN from "./bignum.js";
import type { ParsedJWT } from "../types.js";

// DER DigestInfo prefixes for PKCS#1 v1.5 encoding (rfc 3447 §9.2)
const DIGEST_INFO: Record<string, Buffer> = {
  sha256: Buffer.from("3031300d060960864801650304020105000420", "hex"),
  sha384: Buffer.from("3041300d060960864801650304020205000430", "hex"),
  sha512: Buffer.from("3051300d060960864801650304020305000440", "hex"),
};

const ALG_TO_HASH: Record<string, string> = {
  RS256: "sha256",
  RS384: "sha384",
  RS512: "sha512",
};

function modpow(base: bigint, exp: bigint, mod: bigint): bigint {
  if (mod === 1n) return 0n;
  let result = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp & 1n) result = (result * base) % mod;
    exp >>= 1n;
    base = (base * base) % mod;
  }
  return result;
}

function buildEM(hash: Buffer, hashAlg: string, keyLen: number): bigint {
  const di = DIGEST_INFO[hashAlg];
  if (!di) throw new Error(`No DigestInfo for ${hashAlg}`);

  const psLen = keyLen - 3 - di.length - hash.length;
  if (psLen < 8) throw new Error("Key too short for this hash algorithm");

  const em = Buffer.alloc(keyLen);
  let offset = 0;
  em[offset++] = 0x00;
  em[offset++] = 0x01;
  em.fill(0xff, offset, offset + psLen);
  offset += psLen;
  em[offset++] = 0x00;
  di.copy(em, offset);
  offset += di.length;
  hash.copy(em, offset);

  return BigInt("0x" + em.toString("hex"));
}

function bufferToBigint(buf: Buffer): bigint {
  if (buf.length === 0) return 0n;
  return BigInt("0x" + buf.toString("hex"));
}

function bigintToPublicKeyPem(n: bigint, e: bigint = 65537n): string {
  const nHex = n.toString(16);
  const eHex = e.toString(16);
  const nBuf = Buffer.from(nHex.length % 2 ? "0" + nHex : nHex, "hex");
  const eBuf = Buffer.from(eHex.length % 2 ? "0" + eHex : eHex, "hex");

  const nDer = nBuf[0] & 0x80 ? Buffer.concat([Buffer.from([0x00]), nBuf]) : nBuf;
  const eDer = eBuf[0] & 0x80 ? Buffer.concat([Buffer.from([0x00]), eBuf]) : eBuf;

  const rsaKeySeq = encodeSequence(Buffer.concat([encodeInteger(nDer), encodeInteger(eDer)]));
  const algId = encodeSequence(Buffer.concat([
    Buffer.from("06092a864886f70d010101", "hex"),
    Buffer.from("0500", "hex"),
  ]));
  const spki = encodeSequence(Buffer.concat([algId, encodeBitString(rsaKeySeq)]));

  const b64 = spki.toString("base64");
  const lines = b64.match(/.{1,64}/g)!.join("\n");
  return `-----BEGIN PUBLIC KEY-----\n${lines}\n-----END PUBLIC KEY-----\n`;
}

export interface KeyRecoveryResult {
  publicKeyPem: string;
  modulusBits: number;
}

/**
 * Recover the RSA public key from two signatures (silentsignal/rsa_sign2n's
 * jwt_forgery.py algorithm): for e in [3, 65537],
 *   n | gcd(sig0^e − EM0, sig1^e − EM1)
 * then strip a small cofactor (1..99) and validate sig0^e ≡ EM0 (mod n).
 *
 * sig^65537 is a ~16 MB integer that the runtime's native BigInt cannot hold, so
 * the powers and GCD are done with the limb-based bignum (BN) + Lehmer GCD.
 */
export async function recoverRSAPublicKey(
  jwt0: ParsedJWT,
  jwt1: ParsedJWT,
  onProgress?: (msg: string) => void,
  budgetMs = 240000 // ~4 minutes total; e=65537 over 16 MB integers is O(n²) here
): Promise<KeyRecoveryResult> {
  const alg = jwt0.header.alg as string;
  if (!ALG_TO_HASH[alg]) throw new Error(`Unsupported algorithm: ${alg}`);
  const hashAlg = ALG_TO_HASH[alg];

  const deadline = Date.now() + budgetMs;
  const abort = () => Date.now() > deadline;

  const sig0 = b64urlDecode(jwt0.signatureB64);
  const sig1 = b64urlDecode(jwt1.signatureB64);
  const keyLen = sig0.length; // e.g. 256 for 2048-bit RSA

  const h0 = createHash(hashAlg).update(`${jwt0.headerB64}.${jwt0.payloadB64}`).digest();
  const h1 = createHash(hashAlg).update(`${jwt1.headerB64}.${jwt1.payloadB64}`).digest();
  const m0 = buildEM(h0, hashAlg, keyLen);
  const m1 = buildEM(h1, hashAlg, keyLen);

  const s0 = bufferToBigint(sig0);
  const s1 = bufferToBigint(sig1);
  const s0bn = BN.fromBigInt(s0);
  const s1bn = BN.fromBigInt(s1);
  const m0bn = BN.fromBigInt(m0);
  const m1bn = BN.fromBigInt(m1);

  // Try the common public exponents, smallest first (e=3 is cheap; e=65537 is
  // heavy — it runs under the time budget and aborts cleanly if it can't finish).
  for (const e of [3n, 65537n]) {
    try {
      onProgress?.(`e=${e}: computing sig^e…`);
      const p0 = BN.pow(s0bn, e, undefined, abort);
      const p1 = BN.pow(s1bn, e, undefined, abort);
      if (BN.cmp(p0, m0bn) < 0 || BN.cmp(p1, m1bn) < 0) continue;
      const A = BN.sub(p0, m0bn);
      const B = BN.sub(p1, m1bn);

      onProgress?.(`e=${e}: computing GCD (the slow step)…`);
      let lastPct = -1;
      const g = BN.gcd(A, B, (remaining, start) => {
        const pct = Math.min(99, Math.floor((1 - remaining / start) * 100));
        if (pct !== lastPct) {
          lastPct = pct;
          onProgress?.(`e=${e}: GCD ${pct}%…`);
        }
      }, abort);
      const gInt = BN.toBigInt(g); // k·n — a few thousand bits, fits native

      // Strip a small cofactor and validate (jwt_forgery: my_gcd in 1..99).
      const validates = (nc: bigint) => nc > 1n && modpow(s0, e, nc) === ((m0 % nc) + nc) % nc;
      for (let k = 1n; k <= 100n; k++) {
        if (gInt % k !== 0n) continue;
        let nCand = gInt / k;
        if (nCand.toString(2).length < 1024) continue;
        if (!validates(nCand)) continue;
        // Reduce out any remaining tiny factor so we return the EXACT modulus
        // (the GCD can be a small multiple of n, e.g. 2n, which also validates).
        for (const p of [2n, 3n, 5n, 7n, 11n, 13n]) {
          while (nCand % p === 0n && validates(nCand / p)) nCand /= p;
        }
        const bits = nCand.toString(2).length;
        onProgress?.(`Recovered ${bits}-bit modulus (e=${e}). Building public key…`);
        return { publicKeyPem: bigintToPublicKeyPem(nCand, e), modulusBits: bits };
      }
      onProgress?.(`e=${e}: no valid modulus from the GCD.`);
    } catch (err) {
      onProgress?.(`e=${e} failed: ${(err as Error).message}`);
    }
  }

  throw new Error("Could not recover a modulus for e=3 or e=65537 from this JWT pair");
}

export async function recoverPublicKeyFromJWTs(
  jwts: ParsedJWT[],
  onProgress?: (msg: string) => void
): Promise<KeyRecoveryResult[]> {
  // Filter to only RS-family tokens with the same algorithm
  const rsJwts = jwts.filter((j) => j.header.alg && ALG_TO_HASH[j.header.alg]);
  if (rsJwts.length < 2) {
    throw new Error("Need at least 2 RS-family JWTs with the same algorithm");
  }

  // Group by algorithm
  const byAlg: Record<string, ParsedJWT[]> = {};
  for (const jwt of rsJwts) {
    const alg = jwt.header.alg as string;
    (byAlg[alg] ??= []).push(jwt);
  }

  const results: KeyRecoveryResult[] = [];

  // Only the largest single-algorithm group is attempted, and only ONE pair from
  // it. Each recoverRSAPublicKey call performs sig^65537 over the integers plus a
  // GCD on ~16 MB numbers, which is very expensive in pure-JS BigInt — trying
  // multiple pairs would multiply an already large cost.
  const groups = Object.values(byAlg).filter((g) => g.length >= 2).sort((a, b) => b.length - a.length);
  if (groups.length) {
    const group = groups[0];
    const alg = group[0].header.alg as string;
    onProgress?.(`Attempting key recovery for ${alg} using 2 of ${group.length} JWTs…`);
    try {
      results.push(await recoverRSAPublicKey(group[0], group[1], onProgress));
    } catch (err) {
      onProgress?.(`Recovery failed: ${(err as Error).message}`);
    }
  }

  return results;
}
