import * as tls from "node:tls";
import * as https from "node:https";
import * as http from "node:http";
import { URL } from "node:url";
import type { JWK } from "../types.js";
import { COMMON_JWKS_PATHS } from "../types.js";

export async function fetchTLSCertPem(host: string, port = 443): Promise<string> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      { host, port, rejectUnauthorized: false, servername: host },
      () => {
        const cert = socket.getPeerX509Certificate();
        socket.destroy();
        if (!cert) {
          reject(new Error("No certificate returned"));
          return;
        }
        // Convert DER to PEM
        const b64 = cert.raw.toString("base64");
        const lines = b64.match(/.{1,64}/g)!.join("\n");
        resolve(`-----BEGIN CERTIFICATE-----\n${lines}\n-----END CERTIFICATE-----\n`);
      }
    );
    socket.on("error", reject);
    socket.setTimeout(8000, () => {
      socket.destroy();
      reject(new Error("TLS connection timeout"));
    });
  });
}

export async function fetchURL(url: string, timeoutMs = 8000): Promise<string> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const lib = parsed.protocol === "https:" ? https : http;

    const req = lib.get(
      url,
      { rejectUnauthorized: false, headers: { "User-Agent": "Mozilla/5.0" } },
      (res) => {
        let data = "";
        res.on("data", (chunk: Buffer) => { data += chunk.toString(); });
        res.on("end", () => resolve(data));
      }
    );
    req.on("error", reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
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
  const parsed = new URL(baseUrl);
  const origin = `${parsed.protocol}//${parsed.host}`;

  const pathsToTry = [...COMMON_JWKS_PATHS, ...extraPaths];
  const results: JWKSDiscoveryResult[] = [];

  // First try OpenID discovery
  const jwksUri = await fetchOpenIDConfig(origin);
  if (jwksUri) {
    const jwks = await fetchJWKS(jwksUri);
    if (jwks) results.push({ url: jwksUri, keys: jwks.keys });
  }

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
