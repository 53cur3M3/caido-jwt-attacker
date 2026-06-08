import { randomBytes } from "crypto";
import { b64urlDecode, b64urlEncode } from "./jwt.js";
import type { JWK } from "../types.js";

export interface RSAKeyPair {
  publicKeyPem: string;
  privateKeyPem: string;
  publicJwk: JWK;
}

// ─── Pure-JS RSA key generation (BigInt) ────────────────────────────────────
// LLRT has no native key generation, so we build an RSA key pair from scratch
// using BigInt arithmetic and Miller-Rabin primality testing. The resulting
// key only needs to be a valid RSA key the *attacker* controls (we publish the
// matching public key), so cryptographic strength of the RNG is not critical.

const SMALL_PRIMES_GEN: bigint[] = (() => {
  const out: bigint[] = [];
  const limit = 2000;
  const sieve = new Uint8Array(limit + 1);
  for (let i = 2; i <= limit; i++) {
    if (!sieve[i]) {
      out.push(BigInt(i));
      for (let j = i * i; j <= limit; j += i) sieve[j] = 1;
    }
  }
  return out;
})();

function bytesToBigInt(buf: Buffer): bigint {
  return buf.length ? BigInt("0x" + buf.toString("hex")) : 0n;
}

function modpowBig(base: bigint, exp: bigint, mod: bigint): bigint {
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

function gcdBig(a: bigint, b: bigint): bigint {
  while (b) [a, b] = [b, a % b];
  return a < 0n ? -a : a;
}

function egcd(a: bigint, b: bigint): [bigint, bigint, bigint] {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - (a / b) * y];
}

function modinv(a: bigint, m: bigint): bigint {
  const [g, x] = egcd(((a % m) + m) % m, m);
  if (g !== 1n) throw new Error("modular inverse does not exist");
  return ((x % m) + m) % m;
}

function randomBigIntOfBits(bits: number): bigint {
  const bytes = Math.ceil(bits / 8);
  let n = bytesToBigInt(randomBytes(bytes));
  const mask = (1n << BigInt(bits)) - 1n;
  n &= mask;
  // Force the top two bits so the product of two such primes has the full
  // requested modulus size, and force odd.
  n |= 1n << BigInt(bits - 1);
  n |= 1n << BigInt(bits - 2);
  n |= 1n;
  return n;
}

function isProbablePrime(n: bigint, rounds = 16): boolean {
  if (n < 2n) return false;
  for (const p of SMALL_PRIMES_GEN) {
    if (n === p) return true;
    if (n % p === 0n) return false;
  }
  let d = n - 1n;
  let r = 0n;
  while ((d & 1n) === 0n) {
    d >>= 1n;
    r++;
  }
  const witnesses = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
  for (let i = 0; i < rounds; i++) {
    const a = witnesses[i % witnesses.length];
    if (a >= n - 1n) continue;
    let x = modpowBig(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    let composite = true;
    for (let j = 1n; j < r; j++) {
      x = (x * x) % n;
      if (x === n - 1n) {
        composite = false;
        break;
      }
    }
    if (composite) return false;
  }
  return true;
}

function randomPrime(bits: number): bigint {
  for (;;) {
    let cand = randomBigIntOfBits(bits);
    for (let k = 0; k < 4096; k++) {
      if (isProbablePrime(cand)) return cand;
      cand += 2n;
    }
  }
}

// Minimal big-endian bytes of an unsigned bigint (no sign padding).
function unsignedBytes(n: bigint): Buffer {
  let hex = n.toString(16);
  if (hex.length % 2) hex = "0" + hex;
  return Buffer.from(hex, "hex");
}

// DER INTEGER from an unsigned bigint (prepends 0x00 if the high bit is set).
function encodeUIntBig(n: bigint): Buffer {
  let buf = unsignedBytes(n);
  if (buf.length === 0) buf = Buffer.from([0x00]);
  if (buf[0] & 0x80) buf = Buffer.concat([Buffer.from([0x00]), buf]);
  return encodeInteger(buf);
}

function buildPKCS8RSAPem(
  n: bigint, e: bigint, d: bigint,
  p: bigint, q: bigint, dp: bigint, dq: bigint, qi: bigint
): string {
  const rsaPrivateKey = encodeSequence(Buffer.concat([
    encodeInteger(Buffer.from([0x00])), // version
    encodeUIntBig(n),
    encodeUIntBig(e),
    encodeUIntBig(d),
    encodeUIntBig(p),
    encodeUIntBig(q),
    encodeUIntBig(dp),
    encodeUIntBig(dq),
    encodeUIntBig(qi),
  ]));

  const algId = encodeSequence(Buffer.concat([
    Buffer.from("06092a864886f70d010101", "hex"), // OID rsaEncryption
    Buffer.from("0500", "hex"),                   // NULL
  ]));

  const pkcs8 = encodeSequence(Buffer.concat([
    encodeInteger(Buffer.from([0x00])), // version
    algId,
    Buffer.concat([Buffer.from([0x04]), encodeLength(rsaPrivateKey.length), rsaPrivateKey]), // OCTET STRING
  ]));

  const b64 = pkcs8.toString("base64");
  const lines = b64.match(/.{1,64}/g)!.join("\n");
  return `-----BEGIN PRIVATE KEY-----\n${lines}\n-----END PRIVATE KEY-----\n`;
}

export function generateRSAKeyPair(bits: 2048 | 4096 = 2048): RSAKeyPair {
  const e = 65537n;
  let p: bigint, q: bigint, n: bigint, d: bigint;

  for (;;) {
    p = randomPrime(bits / 2);
    q = randomPrime(bits / 2);
    if (p === q) continue;
    n = p * q;
    if (n.toString(2).length !== bits) continue;
    const phi = (p - 1n) * (q - 1n);
    if (gcdBig(e, phi) !== 1n) continue;
    d = modinv(e, phi);
    break;
  }

  if (p < q) [p, q] = [q, p];
  const dp = d % (p - 1n);
  const dq = d % (q - 1n);
  const qi = modinv(q, p);

  const privateKeyPem = buildPKCS8RSAPem(n, e, d, p, q, dp, dq, qi);
  const publicJwk: JWK = {
    kty: "RSA",
    n: b64urlEncode(unsignedBytes(n)),
    e: b64urlEncode(unsignedBytes(e)),
  };
  const publicKeyPem = rsaJwkToSpkiPem(publicJwk);

  return { publicKeyPem, privateKeyPem, publicJwk };
}

// ─── DER helpers ────────────────────────────────────────────────────────────

function encodeLength(len: number): Buffer {
  if (len < 0x80) return Buffer.from([len]);
  if (len < 0x100) return Buffer.from([0x81, len]);
  return Buffer.from([0x82, (len >> 8) & 0xff, len & 0xff]);
}

export function encodeSequence(data: Buffer): Buffer {
  return Buffer.concat([Buffer.from([0x30]), encodeLength(data.length), data]);
}

export function encodeInteger(data: Buffer): Buffer {
  return Buffer.concat([Buffer.from([0x02]), encodeLength(data.length), data]);
}

export function encodeBitString(data: Buffer): Buffer {
  const inner = Buffer.concat([Buffer.from([0x00]), data]);
  return Buffer.concat([Buffer.from([0x03]), encodeLength(inner.length), inner]);
}

// Build a SubjectPublicKeyInfo (X.509) PEM from an RSA modulus n and exponent e.
export function bigintToPublicKeyPem(n: bigint, e: bigint = 65537n): string {
  const toBuf = (x: bigint) => {
    const hex = x.toString(16);
    return Buffer.from(hex.length % 2 ? "0" + hex : hex, "hex");
  };
  const nBuf = toBuf(n);
  const eBuf = toBuf(e);
  // Prepend 0x00 if the high bit is set (DER INTEGER must be non-negative).
  const nDer = nBuf[0] & 0x80 ? Buffer.concat([Buffer.from([0x00]), nBuf]) : nBuf;
  const eDer = eBuf[0] & 0x80 ? Buffer.concat([Buffer.from([0x00]), eBuf]) : eBuf;

  const rsaKeySeq = encodeSequence(Buffer.concat([encodeInteger(nDer), encodeInteger(eDer)]));
  const algId = encodeSequence(Buffer.concat([
    Buffer.from("06092a864886f70d010101", "hex"), // rsaEncryption OID
    Buffer.from("0500", "hex"),                    // NULL params
  ]));
  const spki = encodeSequence(Buffer.concat([algId, encodeBitString(rsaKeySeq)]));
  const b64 = spki.toString("base64");
  const lines = b64.match(/.{1,64}/g)!.join("\n");
  return `-----BEGIN PUBLIC KEY-----\n${lines}\n-----END PUBLIC KEY-----\n`;
}

function derReadLength(buf: Buffer, offset: number): { len: number; next: number } {
  const first = buf[offset];
  if (first < 0x80) return { len: first, next: offset + 1 };
  const nb = first & 0x7f;
  let len = 0;
  for (let i = 0; i < nb; i++) len = (len << 8) | buf[offset + 1 + i];
  return { len, next: offset + 1 + nb };
}

function derSkip(buf: Buffer, offset: number): number {
  offset++; // tag
  const { len, next } = derReadLength(buf, offset);
  return next + len;
}

// ─── X.509 cert → SPKI extraction ───────────────────────────────────────────

export function x509CertToPublicKeyPem(certPem: string): string {
  const b64 = certPem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const der = Buffer.from(b64, "base64");

  // Walk Certificate SEQUENCE → TBSCertificate SEQUENCE → skip to SubjectPublicKeyInfo
  let offset = 0;
  if (der[offset] !== 0x30) throw new Error("Not a certificate SEQUENCE");
  offset++;
  const { next: tbsStart } = derReadLength(der, offset);
  offset = tbsStart;

  if (der[offset] !== 0x30) throw new Error("TBSCertificate not a SEQUENCE");
  offset++;
  const { next: tbsBodyStart } = derReadLength(der, offset);
  offset = tbsBodyStart;

  // Skip optional version [0]
  if (der[offset] === 0xa0) offset = derSkip(der, offset);
  // Skip serialNumber
  offset = derSkip(der, offset);
  // Skip signature AlgorithmIdentifier
  offset = derSkip(der, offset);
  // Skip issuer
  offset = derSkip(der, offset);
  // Skip validity
  offset = derSkip(der, offset);
  // Skip subject
  offset = derSkip(der, offset);

  // Now at SubjectPublicKeyInfo SEQUENCE
  if (der[offset] !== 0x30) throw new Error("SPKI not found in certificate");
  const spkiStart = offset;
  offset++;
  const { len: spkiLen, next: spkiBodyStart } = derReadLength(der, offset);
  const spki = der.slice(spkiStart, spkiBodyStart + spkiLen);

  const pem64 = spki.toString("base64");
  const lines = pem64.match(/.{1,64}/g)!.join("\n");
  return `-----BEGIN PUBLIC KEY-----\n${lines}\n-----END PUBLIC KEY-----\n`;
}

// ─── Public key PEM → DER bytes ─────────────────────────────────────────────

// Returns the SPKI DER bytes (the whole thing, useful as HMAC secret for algConfusion)
export function publicKeyPemToRawBytes(keyPem: string): Buffer {
  const b64 = keyPem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  return Buffer.from(b64, "base64");
}

// ─── JWK → public key PEM ───────────────────────────────────────────────────

export function jwkToPublicKeyPem(jwk: JWK): string {
  if (jwk.kty === "RSA") {
    return rsaJwkToSpkiPem(jwk);
  }
  if (jwk.kty === "EC") {
    return ecJwkToSpkiPem(jwk);
  }
  throw new Error(`Unsupported JWK kty: ${jwk.kty}`);
}

function rsaJwkToSpkiPem(jwk: JWK): string {
  if (!jwk.n || !jwk.e) throw new Error("RSA JWK missing n or e");
  const nBuf = b64urlDecode(jwk.n);
  const eBuf = b64urlDecode(jwk.e);

  const nDer = nBuf[0] & 0x80 ? Buffer.concat([Buffer.from([0x00]), nBuf]) : nBuf;
  const eDer = eBuf[0] & 0x80 ? Buffer.concat([Buffer.from([0x00]), eBuf]) : eBuf;

  const rsaKeySeq = encodeSequence(Buffer.concat([encodeInteger(nDer), encodeInteger(eDer)]));
  const algId = encodeSequence(Buffer.concat([
    Buffer.from("06092a864886f70d010101", "hex"), // OID rsaEncryption
    Buffer.from("0500", "hex"),                   // NULL
  ]));
  const spki = encodeSequence(Buffer.concat([algId, encodeBitString(rsaKeySeq)]));

  const b64 = spki.toString("base64");
  const lines = b64.match(/.{1,64}/g)!.join("\n");
  return `-----BEGIN PUBLIC KEY-----\n${lines}\n-----END PUBLIC KEY-----\n`;
}

function ecJwkToSpkiPem(jwk: JWK): string {
  if (!jwk.x || !jwk.y || !jwk.crv) throw new Error("EC JWK missing x, y, or crv");

  const curveOids: Record<string, string> = {
    "P-256": "06082a8648ce3d030107",
    "P-384": "06052b81040022",
    "P-521": "06052b81040023",
  };
  const pointLens: Record<string, number> = { "P-256": 32, "P-384": 48, "P-521": 66 };

  const oidHex = curveOids[jwk.crv];
  if (!oidHex) throw new Error(`Unsupported EC curve: ${jwk.crv}`);

  const xBuf = b64urlDecode(jwk.x);
  const yBuf = b64urlDecode(jwk.y);
  const coordLen = pointLens[jwk.crv];

  const xPadded = Buffer.alloc(coordLen);
  const yPadded = Buffer.alloc(coordLen);
  xBuf.copy(xPadded, coordLen - xBuf.length);
  yBuf.copy(yPadded, coordLen - yBuf.length);

  const point = Buffer.concat([Buffer.from([0x04]), xPadded, yPadded]);
  const ecPublicKeyOid = Buffer.from("06072a8648ce3d0201", "hex");
  const curveOid = Buffer.from(oidHex, "hex");
  const algId = encodeSequence(Buffer.concat([ecPublicKeyOid, curveOid]));
  const spki = encodeSequence(Buffer.concat([algId, encodeBitString(point)]));

  const b64 = spki.toString("base64");
  const lines = b64.match(/.{1,64}/g)!.join("\n");
  return `-----BEGIN PUBLIC KEY-----\n${lines}\n-----END PUBLIC KEY-----\n`;
}

export function publicKey2jwk(keyPem: string): JWK {
  // Parse SPKI DER to extract RSA n and e as JWK
  const b64 = keyPem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const der = Buffer.from(b64, "base64");

  // SPKI: SEQUENCE { SEQUENCE(algId), BIT STRING { SEQUENCE { INTEGER(n), INTEGER(e) } } }
  let offset = 0;
  if (der[offset] !== 0x30) throw new Error("Not a SPKI SEQUENCE");
  offset++;
  const { next: outerBody } = derReadLength(der, offset);
  offset = outerBody;

  // Skip AlgorithmIdentifier
  offset = derSkip(der, offset);

  // BIT STRING: skip tag + length + leading zero byte
  if (der[offset] !== 0x03) throw new Error("Expected BIT STRING");
  offset++;
  const { next: bsBody } = derReadLength(der, offset);
  offset = bsBody + 1; // +1 for unused-bits byte (0x00)

  // RSAPublicKey SEQUENCE
  if (der[offset] !== 0x30) throw new Error("Expected RSAPublicKey SEQUENCE");
  offset++;
  const { next: rsakBody } = derReadLength(der, offset);
  offset = rsakBody;

  // n INTEGER
  if (der[offset] !== 0x02) throw new Error("Expected INTEGER for n");
  offset++;
  const { len: nLen, next: nBody } = derReadLength(der, offset);
  const nBuf = der.slice(nBody, nBody + nLen);
  offset = nBody + nLen;

  // e INTEGER
  if (der[offset] !== 0x02) throw new Error("Expected INTEGER for e");
  offset++;
  const { len: eLen, next: eBody } = derReadLength(der, offset);
  const eBuf = der.slice(eBody, eBody + eLen);

  return {
    kty: "RSA",
    n: b64urlEncode(nBuf),
    e: b64urlEncode(eBuf),
  };
}

export function jwksToPublicKeys(jwks: { keys: JWK[] }): string[] {
  const pems: string[] = [];
  for (const jwk of jwks.keys) {
    try {
      pems.push(jwkToPublicKeyPem(jwk));
    } catch { /* skip invalid keys */ }
  }
  return pems;
}

export function buildJWKSDocument(publicJwk: JWK, kid = "jwt-attacker-key"): object {
  return {
    keys: [{ ...publicJwk, use: "sig", kid, alg: "RS256" }],
  };
}

export function bigintToBuffer(n: bigint, byteLength?: number): Buffer {
  const hex = n.toString(16).padStart(byteLength ? byteLength * 2 : 0, "0");
  const paddedHex = hex.length % 2 ? "0" + hex : hex;
  return Buffer.from(paddedHex, "hex");
}

export function bufferToBigint(buf: Buffer): bigint {
  return BigInt("0x" + buf.toString("hex"));
}

// Stub — KeyObject type not available in LLRT
export function getKeyObject(_keyPem: string): never {
  throw new Error("KeyObject not available in this runtime");
}
