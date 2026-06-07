import { generateKeyPairSync, createPublicKey, KeyObject } from "node:crypto";
import { b64urlEncode, b64urlDecode } from "./jwt.js";
import type { JWK } from "../types.js";

export interface RSAKeyPair {
  publicKeyPem: string;
  privateKeyPem: string;
  publicJwk: JWK;
}

export function generateRSAKeyPair(bits: 2048 | 4096 = 2048): RSAKeyPair {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: bits,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  const jwk = publicKey2jwk(publicKey);
  return { publicKeyPem: publicKey, privateKeyPem: privateKey, publicJwk: jwk };
}

export function publicKey2jwk(keyPem: string): JWK {
  const key = createPublicKey(keyPem);
  const raw = key.export({ format: "jwk" }) as JWK;
  return raw;
}

export function x509CertToPublicKeyPem(certPem: string): string {
  try {
    const key = createPublicKey(certPem);
    return key.export({ type: "spki", format: "pem" }) as string;
  } catch {
    throw new Error("Failed to extract public key from certificate");
  }
}

export function publicKeyPemToRawBytes(keyPem: string): Buffer {
  const key = createPublicKey(keyPem);
  return key.export({ type: "spki", format: "der" }) as Buffer;
}

export function jwkToPublicKeyPem(jwk: JWK): string {
  const key = createPublicKey({ key: jwk as Parameters<typeof createPublicKey>[0], format: "jwk" });
  return key.export({ type: "spki", format: "pem" }) as string;
}

export function jwksToPublicKeys(jwks: { keys: JWK[] }): string[] {
  const pems: string[] = [];
  for (const jwk of jwks.keys) {
    try {
      pems.push(jwkToPublicKeyPem(jwk));
    } catch {
      // Skip invalid keys
    }
  }
  return pems;
}

export function buildJWKSDocument(publicJwk: JWK, kid = "jwt-attacker-key"): object {
  return {
    keys: [
      {
        ...publicJwk,
        use: "sig",
        kid,
        alg: "RS256",
      },
    ],
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

export function getKeyObject(keyPem: string): KeyObject {
  return createPublicKey(keyPem);
}
