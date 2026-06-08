// Orchestrates frontend RSA public-key recovery: groups candidates by algorithm,
// tries each pair (e=3 then e=65537), and STOPS at the first recovered key.
import { gcdOfPowerDiffs } from "./recoverClient.js";
import { buildPairInputs, stripValidate, isSupportedAlg, type Candidate, type RecoveredKey } from "./recoverCore.js";

export async function recoverFromCandidates(
  candidates: Candidate[],
  onLog: (m: string) => void
): Promise<RecoveredKey[]> {
  const supported = candidates.filter((c) => isSupportedAlg(c.alg));
  if (supported.length < 2) {
    onLog(`Need ≥2 recoverable (RS256/384/512) JWTs; have ${supported.length}.`);
    return [];
  }

  // Diagnostics: decode each candidate's header + flag probe-like tokens and
  // duplicate messages (a valid same-key pair needs TWO DISTINCT real tokens).
  const decodeHeader = (b64: string): Record<string, unknown> => {
    try {
      const s = b64.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((b64.length + 3) % 4);
      return JSON.parse(atob(s));
    } catch { return {}; }
  };
  const msgSeen = new Map<string, number>();
  for (let i = 0; i < supported.length; i++) {
    const c = supported[i];
    const h = decodeHeader(c.headerB64);
    const flags: string[] = [];
    for (const k of ["jwk", "jku", "x5u", "x5c"]) if (k in h) flags.push(k);
    const msg = `${c.headerB64}.${c.payloadB64}`;
    msgSeen.set(msg, (msgSeen.get(msg) ?? 0) + 1);
    onLog(
      `candidate ${i + 1}: ${c.alg} kid=${h.kid ?? "—"} sig ${c.signatureB64.length} chars (…${c.signatureB64.slice(-8)})` +
      (flags.length ? ` ⚠ header has ${flags.join("/")} (looks like a forged/probe token)` : "")
    );
  }
  for (const [, n] of msgSeen) {
    if (n > 1) onLog(`⚠ ${n} candidates share an identical header.payload — those are the same message (e.g. the original + the plugin's invalid-signature probe) and can't form a valid pair.`);
  }

  // Group by algorithm — a key is tied to one hash algorithm.
  const byAlg: Record<string, Candidate[]> = {};
  for (const c of supported) (byAlg[c.alg] ??= []).push(c);
  const groups = Object.values(byAlg).filter((g) => g.length >= 2).sort((a, b) => b.length - a.length);

  for (const group of groups) {
    const alg = group[0].alg;
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        // Same signing input (header.payload) → can't recover; skip (don't waste ~83s).
        if (group[i].headerB64 === group[j].headerB64 && group[i].payloadB64 === group[j].payloadB64) {
          onLog(`Skipping pair ${i + 1}+${j + 1}: identical message (same header.payload).`);
          continue;
        }
        onLog(`Recovering ${alg} key from JWT pair ${i + 1}+${j + 1} of ${group.length}…`);
        try {
          const inp = await buildPairInputs(group[i], group[j]);
          for (const e of [3, 65537]) {
            onLog(`e=${e}: computing sig^e − EM and their GCD (Web Worker)…`);
            const t = Date.now();
            const gcdHex = await gcdOfPowerDiffs(inp.s0, inp.s1, inp.m0, inp.m1, e);
            const gcdBits = gcdHex === "0" ? 0 : gcdHex.replace(/^0+/, "").length * 4;
            onLog(`e=${e}: GCD ≈ ${gcdBits} bits (${Math.round((Date.now() - t) / 1000)}s). ${gcdBits < 512 ? "→ pair likely NOT same key" : "→ extracting modulus"}`);
            const key = stripValidate(gcdHex, inp, e);
            if (key) {
              onLog(`✓ Recovered ${key.bits}-bit modulus (e=${e}).`);
              return [key];
            }
            onLog(`e=${e}: no valid modulus from GCD.`);
          }
        } catch (err) {
          onLog(`Pair ${i + 1}+${j + 1} failed: ${(err as Error).message}`);
        }
      }
    }
  }
  onLog("No public key recovered from the available JWT pairs.");
  return [];
}
