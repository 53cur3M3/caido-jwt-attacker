// gmp-wasm-backed RSA public-key recovery (silentsignal rsa_sign2n / jwt_forgery.py).
//
// The pure-JS BigInt recovery is impractical (O(n²) GCD). GMP has subquadratic
// HGCD + fast multiplication, so the heavy operations (sig^65537 over the
// integers, GCD of two ~16 MB results) finish in well under a second — IF the
// backend runtime supports WebAssembly. This module first validates that.
//
// The WASM binary is embedded as base64 inside the gmp-wasm bundle, so no file
// or network fetch is needed (important for the LLRT backend). The static import
// only defines that string + functions; nothing is instantiated until init().

// IMPORTANT: the TextDecoder/TextEncoder polyfill MUST be imported before
// gmp-wasm — gmp-wasm runs `new TextDecoder()` at its module top level, which
// throws at backend load on runtimes lacking those globals (breaking the whole
// plugin). This side-effect import installs them first.
import "./textCodecPolyfill.js";
import { init as gmpInit } from "gmp-wasm";
import { randomBytes } from "crypto";

type GmpLib = Awaited<ReturnType<typeof gmpInit>>;

export interface GmpSelfTestResult {
  ok: boolean;
  webAssembly: boolean;
  message: string;
}

const E = 65537;

// Initialise gmp-wasm exactly once (cached). gmp-wasm is inlined into the backend
// bundle (single file), so no chunk/file loading is needed at runtime.
let gmpPromise: Promise<GmpLib> | null = null;
export function loadGmp(): Promise<GmpLib> {
  if (!gmpPromise) gmpPromise = gmpInit();
  return gmpPromise;
}

function randHex(nbytes: number, oddTopBit = false): string {
  const b = randomBytes(nbytes);
  if (oddTopBit) {
    b[0] = b[0] | 0x80;          // ensure full bit-length
    b[nbytes - 1] = b[nbytes - 1] | 0x01; // ensure odd
  }
  return b.toString("hex");
}

/**
 * Validate that gmp-wasm initialises and can perform the exact heavy arithmetic
 * rsa_sign2n needs, at realistic 2048-bit / e=65537 scale, and how fast.
 *
 * Method (no RSA key/sign needed): for a known 2048-bit modulus N and two random
 * 2048-bit "signatures" s0,s1, set EM_i = s_i^E mod N so that P_i = s_i^E and
 * (P_i − EM_i) is an exact multiple of N. Then
 *     gcd(P0 − EM0, P1 − EM1) = N · gcd(k0, k1)
 * which, after stripping the tiny cofactor, recovers N. This exercises the full
 * pipeline (two full sig^65537 ≈ 16 MB powers + a GCD of ~16 MB integers).
 */
export async function gmpSelfTest(): Promise<GmpSelfTestResult> {
  const webAssembly = typeof (globalThis as { WebAssembly?: unknown }).WebAssembly !== "undefined";
  if (!webAssembly) {
    return {
      ok: false,
      webAssembly: false,
      message: "WebAssembly is NOT available in this backend runtime — gmp-wasm cannot run here.",
    };
  }

  try {
    const t0 = Date.now();
    const gmp = await loadGmp();
    const initMs = Date.now() - t0;

    // Sanity check: gcd(48, 36) = 12.
    const sanityCtx = gmp.getContext();
    const sanity = sanityCtx.Integer(48).gcd(36).toString();
    sanityCtx.destroy();
    if (sanity !== "12") {
      return { ok: false, webAssembly: true, message: `gmp-wasm initialised but gcd(48,36) returned "${sanity}" (expected 12).` };
    }

    // Heavy-path validation at 2048-bit / e=65537 scale.
    const nHex = randHex(256, true);
    const s0Hex = randHex(256);
    const s1Hex = randHex(256);
    const nBig = BigInt("0x" + nHex);

    const t1 = Date.now();
    const ctx = gmp.getContext();
    const N = ctx.Integer(nHex, 16);
    const s0 = ctx.Integer(s0Hex, 16);
    const s1 = ctx.Integer(s1Hex, 16);
    const A = s0.pow(E).sub(s0.pow(E, N));   // s0^E − (s0^E mod N) = k0·N  (~16 MB)
    const B = s1.pow(E).sub(s1.pow(E, N));   // k1·N
    const gHex = A.gcd(B).toString(16);
    ctx.destroy();
    const heavyMs = Date.now() - t1;

    const G = BigInt("0x" + gHex);
    const divides = G !== 0n && G % nBig === 0n;
    const cofactor = divides ? G / nBig : 0n;
    const ok = divides && cofactor < 1000n;

    return {
      ok,
      webAssembly: true,
      message: ok
        ? `gmp-wasm works. init ${initMs}ms; full 2048-bit/e=65537 recovery ` +
          `(two sig^65537 + GCD of ~16 MB integers) in ${heavyMs}ms; modulus recovered correctly.`
        : `gmp-wasm ran (init ${initMs}ms, heavy ${heavyMs}ms) but the result did not match N ` +
          `(divides=${divides}, cofactor=${cofactor}).`,
    };
  } catch (e) {
    return { ok: false, webAssembly: true, message: `gmp-wasm failed: ${(e as Error).message}` };
  }
}
