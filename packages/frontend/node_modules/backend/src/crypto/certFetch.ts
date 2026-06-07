import type { JWK } from "../types.js";
import { COMMON_JWKS_PATHS } from "../types.js";

// TLS certificate fetching is not available in LLRT (no tls module).
// This stub allows algConfusion to skip the TLS cert key source gracefully.
export async function fetchTLSCertPem(_host: string, _port = 443): Promise<string> {
  throw new Error("TLS certificate fetching not available in this runtime");
}

export async function fetchURL(url: string, timeoutMs = 8000): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchJWKS(url: string): Promise<{ keys: JWK[] } | null> {
  try {
    const body = await fetchURL(url);
    const parsed = JSON.parse(body) as { keys: JWK[] };
    if (Array.isArray(parsed.keys)) return parsed;
    return null;
  } catch {
    return null;
  }
}

export async function fetchOpenIDConfig(issuerUrl: string): Promise<string | null> {
  try {
    const configUrl = `${issuerUrl.replace(/\/$/, "")}/.well-known/openid-configuration`;
    const body = await fetchURL(configUrl);
    const config = JSON.parse(body) as { jwks_uri?: string };
    return config.jwks_uri ?? null;
  } catch {
    return null;
  }
}

export interface JWKSDiscoveryResult {
  url: string;
  keys: JWK[];
}

export async function discoverJWKS(
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

  // First try OpenID discovery
  try {
    const jwksUri = await fetchOpenIDConfig(origin);
    if (jwksUri) {
      const jwks = await fetchJWKS(jwksUri);
      if (jwks) results.push({ url: jwksUri, keys: jwks.keys });
    }
  } catch { /* ignore */ }

  // Try common paths concurrently in batches of 5
  for (let i = 0; i < pathsToTry.length; i += 5) {
    const batch = pathsToTry.slice(i, i + 5);
    const settled = await Promise.allSettled(
      batch.map(async (path) => {
        const url = `${origin}${path}`;
        const jwks = await fetchJWKS(url);
        if (jwks && jwks.keys.length > 0) return { url, keys: jwks.keys };
        return null;
      })
    );
    for (const r of settled) {
      if (r.status === "fulfilled" && r.value) results.push(r.value);
    }
  }

  return results;
}
