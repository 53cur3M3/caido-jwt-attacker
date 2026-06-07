import { createHmac, createSign, createVerify } from "node:crypto";
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

export function signRSA(
  header: JWTHeader,
  payload: Record<string, unknown>,
  privateKeyPem: string,
  alg: "RS256" | "RS384" | "RS512" | "PS256" | "PS384" | "PS512"
): string {
  const hashMap = {
    RS256: "SHA256", RS384: "SHA384", RS512: "SHA512",
    PS256: "SHA256", PS384: "SHA384", PS512: "SHA512",
  } as const;
  const padding = alg.startsWith("PS") ? "RSA-PSS" : undefined;
  const signingInput = encodeUnsigned(header, payload);

  const signer = createSign(hashMap[alg]);
  signer.update(signingInput);

  const sig = padding
    ? signer.sign({ key: privateKeyPem, padding: 6, saltLength: -2 })  // RSA_PSS_SALTLEN_DIGEST
    : signer.sign(privateKeyPem);

  return `${signingInput}.${b64urlEncode(sig)}`;
}

export function signECDSA(
  header: JWTHeader,
  payload: Record<string, unknown>,
  privateKeyPem: string,
  alg: "ES256" | "ES384" | "ES512"
): string {
  const hashMap = { ES256: "SHA256", ES384: "SHA384", ES512: "SHA512" } as const;
  const signingInput = encodeUnsigned(header, payload);

  const signer = createSign(hashMap[alg]);
  signer.update(signingInput);
  const derSig = signer.sign(privateKeyPem);

  // Convert DER-encoded ECDSA signature to raw R||S format for JWT
  const rawSig = derToRawECDSA(derSig, alg);
  return `${signingInput}.${b64urlEncode(rawSig)}`;
}

function derToRawECDSA(der: Buffer, alg: "ES256" | "ES384" | "ES512"): Buffer {
  const componentLen = { ES256: 32, ES384: 48, ES512: 66 }[alg];

  let offset = 2; // skip SEQUENCE tag + length
  if (der[1] === 0x81) offset = 3;
  else if (der[1] === 0x82) offset = 4;

  offset++; // INTEGER tag
  const rLen = der[offset++];
  let rStart = offset;
  if (der[rStart] === 0x00) { rStart++; }
  const r = der.slice(rStart, offset + rLen);
  offset += rLen;

  offset++; // INTEGER tag
  const sLen = der[offset++];
  let sStart = offset;
  if (der[sStart] === 0x00) { sStart++; }
  const s = der.slice(sStart, offset + sLen);

  const result = Buffer.alloc(componentLen * 2, 0);
  r.copy(result, componentLen - r.length);
  s.copy(result, componentLen * 2 - s.length);
  return result;
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
