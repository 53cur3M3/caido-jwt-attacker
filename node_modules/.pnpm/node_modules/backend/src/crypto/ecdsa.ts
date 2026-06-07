import { publicKeyPemToRawBytes, x509CertToPublicKeyPem } from "./rsa.js";
import type { JWK } from "../types.js";

export interface ECKeyPair {
  publicKeyPem: string;
  privateKeyPem: string;
  publicJwk: JWK;
  curve: string;
}

// EC key generation requires Node.js crypto — not available in LLRT.
export function generateECKeyPair(_alg: "ES256" | "ES384" | "ES512"): ECKeyPair {
  throw new Error("EC key generation is not available in this runtime");
}

// Returns SPKI DER bytes of the public key (used as HMAC secret for algConfusion)
export function ecPublicKeyPemToRawBytes(keyPem: string): Buffer {
  return publicKeyPemToRawBytes(keyPem);
}

export function x509CertToECPublicKeyPem(certPem: string): string {
  return x509CertToPublicKeyPem(certPem);
}

export function buildECJWKS(publicJwk: JWK, alg: string, kid = "jwt-attacker-ec-key"): object {
  return {
    keys: [{ ...publicJwk, use: "sig", kid, alg }],
  };
}

// ECDSA key recovery from two JWT signatures — requires elliptic curve math not
// available in this runtime.
export async function recoverECPublicKeyCandidates(
  _jwt1: string,
  _jwt2: string
): Promise<string[]> {
  return [];
}
