import { createHmac, createHash } from "crypto";
import type { ParsedJWT, JWTHeader } from "../types.js";

export function b64urlEncode(data: Uint8Array | string): string {
  const bytes =
    typeof data === "string" ? Buffer.from(data, "utf8") : Buffer.from(data);
  return bytes
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export function b64urlDecode(str: string): Buffer {
  const padded = str + "=".repeat((4 - (str.length % 4)) % 4);
  return Buffer.from(padded.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

export function parseJWT(token: string): ParsedJWT {
  const parts = token.split(".");
  if (parts.length < 2) throw new Error("Invalid JWT: must have at least 2 parts");

  const [headerB64, payloadB64, signatureB64 = ""] = parts;

  let header: JWTHeader;
  let payload: Record<string, unknown>;

  try {
    header = JSON.parse(b64urlDecode(headerB64).toString("utf8")) as JWTHeader;
  } catch {
    throw new Error("Invalid JWT: malformed header");
  }

  try {
    payload = JSON.parse(b64urlDecode(payloadB64).toString("utf8")) as Record<string, unknown>;
  } catch {
    throw new Error("Invalid JWT: malformed payload");
  }

  return { headerB64, payloadB64, signatureB64, header, payload };
}

export function isJWT(value: string): boolean {
  const parts = value.split(".");
  if (parts.length < 2 || parts.length > 3) return false;
  try {
    const header = JSON.parse(b64urlDecode(parts[0]).toString("utf8")) as Record<string, unknown>;
    return typeof header.alg === "string";
  } catch {
    return false;
  }
}

export function encodeUnsigned(header: JWTHeader, payload: Record<string, unknown>): string {
  return `${b64urlEncode(JSON.stringify(header))}.${b64urlEncode(JSON.stringify(payload))}`;
}

export function buildJWT(header: JWTHeader, payload: Record<string, unknown>, signature: string): string {
  return `${b64urlEncode(JSON.stringify(header))}.${b64urlEncode(JSON.stringify(payload))}.${signature}`;
}

export function signHMAC(
  header: JWTHeader,
  payload: Record<string, unknown>,
  secret: Buffer,
  alg: "HS256" | "HS384" | "HS512"
): string {
  const hashMap = { HS256: "sha256", HS384: "sha384", HS512: "sha512" } as const;
  const signingInput = encodeUnsigned(header, payload);
  const hmac = createHmac(hashMap[alg], secret);
  hmac.update(signingInput);
  const sig = b64urlEncode(hmac.digest());
  return `${signingInput}.${sig}`;
}

// ─── RSA signing via pure-JS BigInt (PKCS#1 v1.5 only) ─────────────────────

// DER DigestInfo prefixes for EMSA-PKCS1-v1_5
const DIGEST_INFO: Record<string, string> = {
  sha256: "3031300d060960864801650304020105000420",
  sha384: "3041300d060960864801650304020205000430",
  sha512: "3051300d060960864801650304020305000440",
};

function derReadLen(buf: Buffer, off: number): { len: number; next: number } {
  const b = buf[off];
  if (b < 0x80) return { len: b, next: off + 1 };
  const nb = b & 0x7f;
  let len = 0;
  for (let i = 0; i < nb; i++) len = (len << 8) | buf[off + 1 + i];
  return { len, next: off + 1 + nb };
}

function derSkip(buf: Buffer, off: number): number {
  off++;
  const { len, next } = derReadLen(buf, off);
  return next + len;
}

function derReadBigInt(buf: Buffer, off: number): { value: bigint; next: number } {
  if (buf[off] !== 0x02) throw new Error(`Expected INTEGER at ${off}`);
  off++;
  const { len, next } = derReadLen(buf, off);
  const hex = buf.slice(next, next + len).toString("hex");
  return { value: hex ? BigInt("0x" + hex) : 0n, next: next + len };
}

function parsePKCS8RSAKey(pem: string): { n: bigint; d: bigint } {
  const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const der = Buffer.from(b64, "base64");
  let off = 0;

  // PKCS8 outer SEQUENCE
  if (der[off] !== 0x30) throw new Error("Not a PKCS8 key");
  off++;
  const { next: outerBody } = derReadLen(der, off);
  off = outerBody;

  // version INTEGER
  off = derSkip(der, off);
  // AlgorithmIdentifier SEQUENCE
  off = derSkip(der, off);

  // privateKey OCTET STRING
  if (der[off] !== 0x04) throw new Error("Expected OCTET STRING");
  off++;
  const { next: octBody } = derReadLen(der, off);
  off = octBody;

  // RSAPrivateKey SEQUENCE
  if (der[off] !== 0x30) throw new Error("Expected RSAPrivateKey SEQUENCE");
  off++;
  const { next: rsaBody } = derReadLen(der, off);
  off = rsaBody;

  // version INTEGER
  off = derSkip(der, off);
  // n modulus
  const { value: n, next: afterN } = derReadBigInt(der, off);
  off = afterN;
  // e publicExponent (skip)
  off = derSkip(der, off);
  // d privateExponent
  const { value: d } = derReadBigInt(der, off);

  return { n, d };
}

function modpow(base: bigint, exp: bigint, mod: bigint): bigint {
  if (mod === 1n) return 0n;
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp & 1n) result = (result * base) % mod;
    exp >>= 1n;
    base = (base * base) % mod;
  }
  return result;
}

function emsaPKCS1(hash: Buffer, hashAlg: string, keyLen: number): Buffer {
  const di = Buffer.from(DIGEST_INFO[hashAlg], "hex");
  const psLen = keyLen - 3 - di.length - hash.length;
  if (psLen < 8) throw new Error("Key too short for this hash algorithm");
  const em = Buffer.alloc(keyLen);
  let off = 0;
  em[off++] = 0x00;
  em[off++] = 0x01;
  em.fill(0xff, off, off + psLen);
  off += psLen;
  em[off++] = 0x00;
  di.copy(em, off);
  off += di.length;
  hash.copy(em, off);
  return em;
}

export function signRSA(
  header: JWTHeader,
  payload: Record<string, unknown>,
  privateKeyPem: string,
  alg: "RS256" | "RS384" | "RS512" | "PS256" | "PS384" | "PS512"
): string {
  if (alg.startsWith("PS")) {
    throw new Error("RSA-PSS signing not supported in this runtime");
  }
  const hashMap: Record<string, string> = {
    RS256: "sha256", RS384: "sha384", RS512: "sha512",
  };
  const hashAlg = hashMap[alg];
  if (!hashAlg) throw new Error(`Unsupported RSA algorithm: ${alg}`);

  const signingInput = encodeUnsigned(header, payload);
  const { n, d } = parsePKCS8RSAKey(privateKeyPem);
  const keyLen = Math.ceil(n.toString(2).length / 8);

  const hash = createHash(hashAlg).update(signingInput).digest();
  const em = emsaPKCS1(hash, hashAlg, keyLen);

  // sig = em^d mod n
  const m = BigInt("0x" + em.toString("hex"));
  const s = modpow(m, d, n);

  const sHex = s.toString(16).padStart(keyLen * 2, "0");
  const sBuf = Buffer.from(sHex, "hex");

  return `${signingInput}.${b64urlEncode(sBuf)}`;
}

export function signECDSA(
  _header: JWTHeader,
  _payload: Record<string, unknown>,
  _privateKeyPem: string,
  _alg: "ES256" | "ES384" | "ES512"
): string {
  throw new Error("ECDSA signing not supported in this runtime (requires elliptic curve math)");
}

export function verifyHMAC(
  token: string,
  secret: Buffer,
  alg: "HS256" | "HS384" | "HS512"
): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const hashMap = { HS256: "sha256", HS384: "sha384", HS512: "sha512" } as const;
  const signingInput = `${parts[0]}.${parts[1]}`;
  const hmac = createHmac(hashMap[alg], secret);
  hmac.update(signingInput);
  const expected = b64urlEncode(hmac.digest());
  return expected === parts[2];
}

export function getAlgorithmFamily(alg: string): "HS" | "RS" | "ES" | "PS" | "none" | "unknown" {
  if (alg.toLowerCase() === "none") return "none";
  if (alg.startsWith("HS")) return "HS";
  if (alg.startsWith("RS")) return "RS";
  if (alg.startsWith("ES")) return "ES";
  if (alg.startsWith("PS")) return "PS";
  return "unknown";
}
