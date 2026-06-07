import { randomBytes } from "crypto";

export function nanoid(size = 12): string {
  // LLRT's Buffer does not support the "base64url" encoding, so convert manually.
  return randomBytes(size)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
    .slice(0, size);
}

export function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  for (const pair of cookieHeader.split(";")) {
    const idx = pair.indexOf("=");
    if (idx === -1) continue;
    const key = pair.slice(0, idx).trim();
    const value = pair.slice(idx + 1).trim();
    cookies[key] = decodeURIComponent(value);
  }
  return cookies;
}

const JWT_REGEX = /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]*$/;

export function looksLikeJWT(value: string): boolean {
  const trimmed = value.trim();
  if (!JWT_REGEX.test(trimmed)) return false;
  // Quick sanity: header must be valid base64url JSON with alg
  try {
    const parts = trimmed.split(".");
    const header = JSON.parse(Buffer.from(
      parts[0] + "=".repeat((4 - parts[0].length % 4) % 4),
      "base64"
    ).toString("utf8")) as Record<string, unknown>;
    return typeof header.alg === "string";
  } catch {
    return false;
  }
}
