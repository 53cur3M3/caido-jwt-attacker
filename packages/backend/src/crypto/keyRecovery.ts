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

function gcd(a: bigint, b: bigint): bigint {
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a < 0n ? -a : a;
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

function encodeLength(len: number): Buffer {
  if (len < 0x80) return Buffer.from([len]);
  if (len < 0x100) return Buffer.from([0x81, len]);
  return Buffer.from([0x82, (len >> 8) & 0xff, len & 0xff]);
}

function encodeSequence(data: Buffer): Buffer {
  return Buffer.concat([Buffer.from([0x30]), encodeLength(data.length), data]);
}

function encodeInteger(data: Buffer): Buffer {
  return Buffer.concat([Buffer.from([0x02]), encodeLength(data.length), data]);
}

function encodeBitString(data: Buffer): Buffer {
  const inner = Buffer.concat([Buffer.from([0x00]), data]); // 0 unused bits
  return Buffer.concat([Buffer.from([0x03]), encodeLength(inner.length), inner]);
}

const SMALL_PRIMES = [
  2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n,
  53n, 59n, 61n, 67n, 71n, 73n, 79n, 83n, 89n, 97n, 101n, 103n, 107n, 109n,
  113n, 127n, 131n, 137n, 139n, 149n, 151n, 157n, 163n, 167n, 173n, 179n,
  181n, 191n, 193n, 197n, 199n, 211n, 223n, 227n, 229n, 233n, 239n, 241n,
];

function stripSmallFactors(n: bigint): bigint {
  for (const p of SMALL_PRIMES) {
    while (n % p === 0n) n /= p;
  }
  return n;
}

export interface KeyRecoveryResult {
  publicKeyPem: string;
  modulusBits: number;
}

export async function recoverRSAPublicKey(
  jwt1: ParsedJWT,
  jwt2: ParsedJWT,
  onProgress?: (msg: string) => void
): Promise<KeyRecoveryResult> {
  const alg = jwt1.header.alg as string;
  if (!ALG_TO_HASH[alg]) throw new Error(`Unsupported algorithm: ${alg}`);

  const hashAlg = ALG_TO_HASH[alg];

  const sig1 = b64urlDecode(jwt1.signatureB64);
  const sig2 = b64urlDecode(jwt2.signatureB64);
  const keyLen = sig1.length; // e.g. 256 for 2048-bit RSA

  onProgress?.(`Signature length: ${keyLen * 8} bits, computing hashes…`);

  const msg1 = `${jwt1.headerB64}.${jwt1.payloadB64}`;
  const msg2 = `${jwt2.headerB64}.${jwt2.payloadB64}`;

  const h1 = createHash(hashAlg).update(msg1).digest();
  const h2 = createHash(hashAlg).update(msg2).digest();

  const em1 = buildEM(h1, hashAlg, keyLen);
  const em2 = buildEM(h2, hashAlg, keyLen);

  const s1 = bufferToBigint(sig1);
  const s2 = bufferToBigint(sig2);

  onProgress?.(`Computing s1^e (this may take up to a minute)…`);
  const e = 65537n;
  const s1e = s1 ** e;

  onProgress?.(`Computing s2^e…`);
  const s2e = s2 ** e;

  onProgress?.(`Computing residuals and GCD…`);
  const r1 = s1e - em1;
  const r2 = s2e - em2;

  let nCandidate = gcd(r1 < 0n ? -r1 : r1, r2 < 0n ? -r2 : r2);
  onProgress?.(`Raw GCD computed (${nCandidate.toString(16).length / 2} bytes), removing small factors…`);

  nCandidate = stripSmallFactors(nCandidate);

  const bitLen = nCandidate.toString(2).length;
  if (bitLen < 512) throw new Error(`Recovered modulus too small (${bitLen} bits) — likely an incorrect pair`);

  onProgress?.(`Recovered ${bitLen}-bit modulus. Building public key…`);

  const pem = bigintToPublicKeyPem(nCandidate);
  return { publicKeyPem: pem, modulusBits: bitLen };
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

  for (const [alg, group] of Object.entries(byAlg)) {
    if (group.length < 2) continue;
    onProgress?.(`Attempting key recovery for ${alg} with ${group.length} JWTs…`);

    // Try pairs — first pair that works wins
    for (let i = 0; i < Math.min(group.length - 1, 3); i++) {
      for (let j = i + 1; j < Math.min(group.length, 4); j++) {
        try {
          const result = await recoverRSAPublicKey(group[i], group[j], onProgress);
          results.push(result);
          break; // One successful recovery per algorithm is enough
        } catch (err) {
          onProgress?.(`Pair ${i},${j} failed: ${(err as Error).message}`);
        }
      }
      if (results.find((r) => r.modulusBits > 0)) break;
    }
  }

  return results;
}
