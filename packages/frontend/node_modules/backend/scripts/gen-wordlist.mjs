// Build-time codegen: reads the large HS256 secret wordlist (kept as a plain
// .txt so it's easy to update) and emits a bundled TS module. We generate-and-
// bundle rather than read the file at runtime because the Caido/LLRT backend
// ships as a single bundled JS file with no reliable on-disk asset access.
//
// Run automatically by `pnpm build` / `pnpm watch`, or manually:
//   node packages/backend/scripts/gen-wordlist.mjs

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const txtPath = join(here, "..", "wordlists", "jwt.secrets.list.txt");
const outPath = join(here, "..", "src", "wordlist.generated.ts");

const secrets = [];
if (existsSync(txtPath)) {
  const raw = readFileSync(txtPath, "utf8");
  const seen = new Set();
  // Split on newlines only (strip the CR of CRLF); preserve the rest of the line
  // verbatim so secrets with intentional spacing are not mangled.
  for (const line of raw.split(/\r?\n/)) {
    if (line.length === 0 || seen.has(line)) continue;
    seen.add(line);
    secrets.push(line);
  }
  console.log(`[gen-wordlist] ${secrets.length} unique secrets from ${txtPath}`);
} else {
  console.log(`[gen-wordlist] ${txtPath} not found — generating an empty list`);
}

mkdirSync(dirname(outPath), { recursive: true });

const banner =
  "// AUTO-GENERATED from packages/backend/wordlists/jwt.secrets.list.txt by\n" +
  "// scripts/gen-wordlist.mjs. Do not edit by hand — update the .txt and rebuild.\n";

// Emit a single newline-joined string literal split at runtime. With 100k+
// entries this parses far faster in QuickJS than a 100k-element array literal,
// and the entries never contain newlines (they were split on them). JSON.stringify
// fully escapes the string literal.
const expr = secrets.length ? `${JSON.stringify(secrets.join("\n"))}.split("\\n")` : "[]";
writeFileSync(
  outPath,
  `${banner}export const EXTENDED_JWT_SECRETS: string[] = ${expr};\n`
);
console.log(`[gen-wordlist] wrote ${outPath} (${secrets.length} secrets)`);
