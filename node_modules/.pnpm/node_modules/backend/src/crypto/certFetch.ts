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
  paths: string[] = []
): Promise<JWKSDiscoveryResult[]> {
  let origin: string;
  try {
    const parsed = new URL(baseUrl);
    origin = `${parsed.protocol}//${parsed.host}`;
  } catch {
    return [];
  }

  // The caller supplies the configurable discovery path list; fall back to the
  // built-in defaults only if it is empty.
  const pathsToTry = paths.length ? paths : [...COMMON_JWKS_PATHS];
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

// ─── OpenID Connect discovery from the token's `iss` claim ───────────────────

export interface OIDCDiscovery {
  issuer: string;                    // the iss claim this was derived from
  configUrl: string;                 // the openid-configuration URL that responded
  configContent: string;            // raw openid-configuration body
  jwksUri: string | null;            // jwks_uri advertised by the document
  signingAlgs: string[];             // id_token_signing_alg_values_supported
  jwks: JWKSDiscoveryResult | null;  // keys fetched from jwks_uri
}

// Candidate openid-configuration URLs for an issuer. Primary form is OpenID
// Connect Discovery 1.0 (append to the issuer, e.g. Keycloak
// https://host/realms/x/.well-known/openid-configuration). For issuers with a
// path we also try the RFC 8414 form (insert the well-known segment between host
// and path), which some OAuth servers use.
function oidcConfigCandidates(issuer: string): string[] {
  const trimmed = issuer.replace(/\/+$/, "");
  const out = [`${trimmed}/.well-known/openid-configuration`];
  try {
    const u = new URL(trimmed);
    if (u.pathname && u.pathname !== "/") {
      out.push(`${u.protocol}//${u.host}/.well-known/openid-configuration${u.pathname}`);
      out.push(`${u.protocol}//${u.host}/.well-known/oauth-authorization-server${u.pathname}`);
    }
  } catch { /* issuer is not an absolute URL — caller guards this */ }
  return out;
}

// Resolve the token's `iss` claim via OpenID Connect discovery:
//   {iss}/.well-known/openid-configuration → jwks_uri → JWKS
// Also returns id_token_signing_alg_values_supported so the caller can decide
// which algorithm-confusion targets are relevant. Returns null if iss is not an
// absolute http(s) URL or no discovery document is reachable.
export async function discoverFromIssuer(
  fetcher: UrlFetcher,
  issuer: string
): Promise<OIDCDiscovery | null> {
  try {
    const u = new URL(issuer);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
  } catch {
    return null; // iss is not a URL (e.g. an opaque string) — nothing to resolve
  }

  for (const configUrl of oidcConfigCandidates(issuer)) {
    let configContent: string;
    try {
      configContent = await fetcher(configUrl);
    } catch {
      continue;
    }
    let doc: { jwks_uri?: unknown; id_token_signing_alg_values_supported?: unknown };
    try {
      doc = JSON.parse(configContent) as typeof doc;
    } catch {
      continue;
    }
    const jwksUri = typeof doc.jwks_uri === "string" ? doc.jwks_uri : null;
    const signingAlgs = Array.isArray(doc.id_token_signing_alg_values_supported)
      ? doc.id_token_signing_alg_values_supported.filter((a): a is string => typeof a === "string")
      : [];
    // Only accept a body that actually looks like OIDC/OAuth metadata.
    if (!jwksUri && signingAlgs.length === 0) continue;
    const jwks = jwksUri ? await tryJwks(fetcher, jwksUri) : null;
    return { issuer, configUrl, configContent, jwksUri, signingAlgs, jwks };
  }
  return null;
}
