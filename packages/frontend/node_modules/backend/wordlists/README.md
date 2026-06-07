# Wordlists

Drop large secret wordlists here as plain `.txt` files (one secret per line).

## `jwt.secrets.list.txt`

The HS256 secret-cracking wordlist (~10,000 common secrets) consumed by the
weak-secret attack. It is **not** read at runtime — `scripts/gen-wordlist.mjs`
reads it at build time and emits `src/wordlist.generated.ts`, which is bundled
into the backend. Update this file and rebuild (`pnpm build`) to refresh.

If the file is absent the build still succeeds with an empty extended list.
