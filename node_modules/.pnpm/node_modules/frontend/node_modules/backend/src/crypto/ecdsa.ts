import { generateKeyPairSync, createPublicKey } from "node:crypto";
import type { JWK } from "../types.js";

export interface ECKeyPair {
  publicKeyPem: string;
  privateKeyPem: string;
  publicJwk: JWK;
  curve: string;
}

const ALG_TO_CURVE: Record<string, string> = {
  ES256: "prime256v1",
  ES384: "secp384r1",
  ES512: "secp521r1",
};

export function generateECKeyPair(alg: "ES256" | "ES384" | "ES512"): ECKeyPair {
  const curve = ALG_TO_CURVE[alg];
  const { publicKey, privateKey } = generateKeyPairSync("ec", {
    namedCurve: curve,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  const key = createPublicKey(publicKey);
  const jwk = key.export({ format: "jwk" }) as JWK;

  return { publicKeyPem: publicKey, privateKeyPem: privateKey, publicJwk: jwk, curve };
}

export function ecPublicKeyPemToRawBytes(keyPem: string): Buffer {
  const key = createPublicKey(keyPem);
  return key.export({ type: "spki", format: "der" }) as Buffer;
}

export function x509CertToECPublicKeyPem(certPem: string): string {
  try {
    const key = createPublicKey(certPem);
    if (key.asymmetricKeyType !== "ec") throw new Error("Not an EC key");
    return key.export({ type: "spki", format: "pem" }) as string;
  } catch {
    throw new Error("Failed to extract EC public key from certificate");
  }
}

export function buildECJWKS(publicJwk: JWK, alg: string, kid = "jwt-attacker-ec-key"): object {
  return {
    keys: [{ ...publicJwk, use: "sig", kid, alg }],
  };
}

// ECDSA key recovery from two JWT signatures.
// Returns candidate public key PEMs or empty array if recovery failed.
// Partial implementation: for ES256 only, returns candidates without
// full curve arithmetic (requires a dedicated EC math library for production use).
export async function recoverECPublicKeyCandidates(
  _jwt1: string,
  _jwt2: string
): Promise<string[]> {
  // Full ECDSA key recovery requires implementing point arithmetic over
  // secp256r1/secp384r1/secp521r1 curves natively.  This is deferred to
  // a future release.  For now we return an empty array so callers can
  // gracefully skip this path.
  return [];
}
