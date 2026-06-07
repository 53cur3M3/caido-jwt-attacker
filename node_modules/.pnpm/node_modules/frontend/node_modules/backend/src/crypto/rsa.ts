import { b64urlDecode, b64urlEncode } from "./jwt.js";
import type { JWK } from "../types.js";

export interface RSAKeyPair {
  publicKeyPem: string;
  privateKeyPem: string;
  publicJwk: JWK;
}

// RSA key generation requires Node.js crypto — not available in LLRT.
export function generateRSAKeyPair(_bits: 2048 | 4096 = 2048): RSAKeyPair {
  throw new Error("RSA key generation is not available in this runtime");
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
