import type { JWK } from "../types.js";
import { COMMON_JWKS_PATHS } from "../types.js";
import { x509CertToPublicKeyPem, encodeSequence, encodeBitString } from "./rsa.js";

// A function that performs an HTTP GET and returns the response body as text,
// or throws on a non-2xx/transport error. Injected by the caller so requests
// go through Caido's own networking (sdk.requests.send) rather than the LLRT
// global fetch — which would reject self-signed certs, miss proxied/internal
// hosts, and not appear in HTTP history.
export type UrlFetcher = (url: string) => Promise<string>;

// TLS certificate fetching is not available in LLRT (no tls module).
// This stub allows algConfusion to skip the TLS cert key source gracefully.
export async function fetchTLSCertPem(_host: string, _port = 443): Promise<string> {
  throw new Error("TLS certificate fetching not available in this runtime");
}

export async function fetchJWKS(fetcher: UrlFetcher, url: string): Promise<{ keys: JWK[] } | null> {
  try {
    const body = await fetcher(url);
    const parsed = JSON.parse(body) as { keys: JWK[] };
    if (Array.isArray(parsed.keys)) return parsed;
    return null;
  } catch {
    return null;
  }
}

export async function fetchOpenIDConfig(fetcher: UrlFetcher, issuerUrl: string): Promise<string | null> {
  try {
    const configUrl = `${issuerUrl.replace(/\/$/, "")}/.well-known/openid-configuration`;
    const body = await fetcher(configUrl);
    const config = JSON.parse(body) as { jwks_uri?: string };
    return config.jwks_uri ?? null;
  } catch {
    return null;
  }
}

// ─── Certificate / public-key file probing ──────────────────────────────────

// Common locations where servers accidentally expose signing certificates or
// public keys (the RS256-key-confusion source material).
const COMMON_CERT_PATHS = [
  "/cert.pem", "/certificate.pem", "/cert.crt", "/certificate.crt",
  "/server.pem", "/server.crt", "/tls.crt", "/ssl/cert.pem", "/ssl.crt",
  "/public.pem", "/public_key.pem", "/publickey.pem", "/pubkey.pem",
  "/public.crt", "/rsa.pub", "/key.pub", "/id_rsa.pub",
  "/jwt.pem", "/jwt.key.pub", "/jwtRS256.key.pub", "/jwt_public.pem",
  "/.well-known/cert.pem", "/.well-known/public.pem",
  "/static/cert.pem", "/keys/public.pem", "/keys/cert.pem",
];

export interface DiscoveredKey {
  url: string;
  publicKeyPem: string;
  kind: "certificate" | "public-key";
  content: string; // raw body returned by the endpoint
}

// Wrap a PKCS#1 RSAPublicKey DER in a SubjectPublicKeyInfo so it parses like a
// standard SPKI public key everywhere downstream.
function pkcs1ToSpkiPem(pkcs1Der: Buffer): string {
  const algId = encodeSequence(Buffer.concat([
    Buffer.from("06092a864886f70d010101", "hex"), // OID rsaEncryption
    Buffer.from("0500", "hex"),                    // NULL
  ]));
  const spki = encodeSequence(Buffer.concat([algId, encodeBitString(pkcs1Der)]));
  const b64 = spki.toString("base64");
  const lines = b64.match(/.{1,64}/g)!.join("\n");
  return `-----BEGIN PUBLIC KEY-----\n${lines}\n-----END PUBLIC KEY-----\n`;
}

// Interpret a fetched body as a certificate or public key and normalize it to
// a SPKI public-key PEM. Returns null if the body is not key material.
function extractPublicKeyPem(body: string): { pem: string; kind: DiscoveredKey["kind"] } | null {
  if (body.includes("-----BEGIN CERTIFICATE-----")) {
    try {
      return { pem: x509CertToPublicKeyPem(body), kind: "certificate" };
    } catch { return null; }
  }
  if (body.includes("-----BEGIN PUBLIC KEY-----")) {
    return { pem: body, kind: "public-key" };
  }
  if (body.includes("-----BEGIN RSA PUBLIC KEY-----")) {
    try {
      const b64 = body.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
      return { pem: pkcs1ToSpkiPem(Buffer.from(b64, "base64")), kind: "public-key" };
    } catch { return null; }
  }
  return null;
}

export async function discoverPublicKeys(
  fetcher: UrlFetcher,
  baseUrl: string,
  extraPaths: string[] = []
): Promise<DiscoveredKey[]> {
  let origin: string;
  try {
    const parsed = new URL(baseUrl);
    origin = `${parsed.protocol}//${parsed.host}`;
  } catch {
    return [];
  }

  const paths = [...COMMON_CERT_PATHS, ...extraPaths];
  const found: DiscoveredKey[] = [];

  for (let i = 0; i < paths.length; i += 5) {
    const batch = paths.slice(i, i + 5);
    const settled = await Promise.allSettled(
      batch.map(async (path): Promise<DiscoveredKey | null> => {
        const url = `${origin}${path}`;
        const body = await fetcher(url);
        const extracted = extractPublicKeyPem(body);
        if (!extracted) return null;
        return { url, publicKeyPem: extracted.pem, kind: extracted.kind, content: body };
      })
    );
    for (const r of settled) {
      if (r.status === "fulfilled" && r.value) found.push(r.value);
    }
  }

  return found;
}

export interface JWKSDiscoveryResult {
  url: string;
  keys: JWK[];
  content: string; // raw body returned by the endpoint
}

// Fetch a URL and return it as a JWKS result if it parses to a non-empty key set.
async function tryJwks(fetcher: UrlFetcher, url: string): Promise<JWKSDiscoveryResult | null> {
  try {
    const body = await fetcher(url);
    const parsed = JSON.parse(body) as { keys: JWK[] };
    if (Array.isArray(parsed.keys) && parsed.keys.length > 0) {
      return { url, keys: parsed.keys, content: body };
    }
  } catch { /* not a JWKS */ }
  return null;
}

export async function discoverJWKS(
  fetcher: UrlFetcher,
  baseUrl: string,
  extraPaths: string[] = []
): Promise<JWKSDiscoveryResult[]> {
  let origin: string;
  try {
    const parsed = new URL(baseUrl);
    origin = `${parsed.protocol}//${parsed.host}`;
  } catch {
    return [];
  }

  const pathsToTry = [...COMMON_JWKS_PATHS, ...extraPaths];
  const results: JWKSDiscoveryResult[] = [];
  const seenUrls = new Set<string>();

  // First try OpenID discovery
  try {
    const jwksUri = await fetchOpenIDConfig(fetcher, origin);
    if (jwksUri && !seenUrls.has(jwksUri)) {
      const jwks = await tryJwks(fetcher, jwksUri);
      if (jwks) {
        seenUrls.add(jwksUri);
        results.push(jwks);
      }
    }
  } catch { /* ignore */ }

  // Try common paths concurrently in batches of 5
  for (let i = 0; i < pathsToTry.length; i += 5) {
    const batch = pathsToTry.slice(i, i + 5);
    const settled = await Promise.allSettled(
      batch.map((path) => tryJwks(fetcher, `${origin}${path}`))
    );
    for (const r of settled) {
      if (r.status === "fulfilled" && r.value && !seenUrls.has(r.value.url)) {
        seenUrls.add(r.value.url);
        results.push(r.value);
      }
    }
  }

  return results;
}
