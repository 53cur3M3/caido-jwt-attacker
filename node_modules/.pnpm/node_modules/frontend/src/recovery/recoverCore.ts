// Browser-native helpers for RSA public-key recovery (rsa_sign2n / jwt_forgery.py).
// The heavy GMP arithmetic happens in the worker; this module prepares the inputs
// (EMSA-PKCS1 message + signature as integers) and validates/strips the GCD result
// to the exact modulus. The recovered modulus (hex) + exponent is sent to the
// backend, which builds the public-key PEM.

export interface Candidate {
  alg: string;
  headerB64: string;
  payloadB64: string;
  signatureB64: string;
}

const ALG: Record<string, { hash: AlgorithmIdentifier; diHex: string }> = {
  RS256: { hash: "SHA-256", diHex: "3031300d060960864801650304020105000420" },
  RS384: { hash: "SHA-384", diHex: "3041300d060960864801650304020205000430" },
  RS512: { hash: "SHA-512", diHex: "3051300d060960864801650304020305000440" },
};

export function isSupportedAlg(alg: string): boolean {
  return alg in ALG;
}

function b64urlToBytes(s: string): Uint8Array {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function bytesToHex(b: Uint8Array): string {
  let s = "";
  for (const x of b) s += x.toString(16).padStart(2, "0");
  return s;
}

function modpow(base: bigint, exp: bigint, mod: bigint): bigint {
  if (mod === 1n) return 0n;
  let r = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp & 1n) r = (r * base) % mod;
    exp >>= 1n;
    base = (base * base) % mod;
  }
  return r;
}

// EMSA-PKCS1-v1.5 encoded message for signing input `${headerB64}.${payloadB64}`,
// as a hex string of length keyLen bytes: 0x00 01 FF..FF 00 DigestInfo Hash.
async function buildEMHex(signingInput: string, alg: string, keyLen: number): Promise<string> {
  const { hash, diHex } = ALG[alg];
  const data = new TextEncoder().encode(signingInput);
  const digest = new Uint8Array(await crypto.subtle.digest(hash, data));
  const di = new Uint8Array(diHex.length / 2);
  for (let i = 0; i < di.length; i++) di[i] = parseInt(diHex.substr(i * 2, 2), 16);

  const psLen = keyLen - 3 - di.length - digest.length;
  if (psLen < 8) throw new Error("key too short for this hash");

  const em = new Uint8Array(keyLen);
  let o = 0;
  em[o++] = 0x00;
  em[o++] = 0x01;
  for (let i = 0; i < psLen; i++) em[o++] = 0xff;
  em[o++] = 0x00;
  em.set(di, o); o += di.length;
  em.set(digest, o);
  return bytesToHex(em);
}

export interface PairInputs {
  s0: string; s1: string; m0: string; m1: string; // hex
}

/** Compute the (sig, EM) integer inputs (hex) for a candidate pair. */
export async function buildPairInputs(c0: Candidate, c1: Candidate): Promise<PairInputs> {
  const sig0 = b64urlToBytes(c0.signatureB64);
  const sig1 = b64urlToBytes(c1.signatureB64);
  const keyLen = sig0.length;
  const m0 = await buildEMHex(`${c0.headerB64}.${c0.payloadB64}`, c0.alg, keyLen);
  const m1 = await buildEMHex(`${c1.headerB64}.${c1.payloadB64}`, c1.alg, keyLen);
  return { s0: bytesToHex(sig0), s1: bytesToHex(sig1), m0, m1 };
}

export interface RecoveredKey { nHex: string; e: number; bits: number; }

/** Strip a small cofactor from the GCD and validate against the PKCS#1 relation,
 *  returning the exact modulus (hex) — or null if no valid modulus is found. */
export function stripValidate(gcdHex: string, inp: PairInputs, e: number): RecoveredKey | null {
  let g: bigint;
  try { g = BigInt("0x" + gcdHex); } catch { return null; }
  if (g <= 1n) return null;

  const s0 = BigInt("0x" + inp.s0);
  const m0 = BigInt("0x" + inp.m0);
  const eb = BigInt(e);
  const validates = (nc: bigint) => nc > 1n && modpow(s0, eb, nc) === ((m0 % nc) + nc) % nc;

  for (let k = 1n; k <= 100n; k++) {
    if (g % k !== 0n) continue;
    let nc = g / k;
    if (nc.toString(2).length < 1024) continue;
    if (!validates(nc)) continue;
    // Reduce any residual tiny factor to the exact modulus.
    for (const p of [2n, 3n, 5n, 7n, 11n, 13n]) {
      while (nc % p === 0n && validates(nc / p)) nc /= p;
    }
    const hex = nc.toString(16);
    return { nHex: hex.length % 2 ? "0" + hex : hex, e, bits: nc.toString(2).length };
  }
  return null;
}
