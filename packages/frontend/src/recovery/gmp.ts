// Frontend gmp-wasm loader + self-test.
//
// Caido's BACKEND runtime has no WebAssembly engine, so gmp-wasm can only run in
// the frontend (an Electron/browser renderer, which has WebAssembly). The heavy
// RSA recovery math therefore runs here; the backend handles history + sending.

import { init } from "gmp-wasm";

export interface GmpTestResult {
  ok: boolean;
  webAssembly: boolean;
  message: string;
}

function randHex(n: number): string {
  const b = new Uint8Array(n);
  crypto.getRandomValues(b);
  let s = "";
  for (const x of b) s += x.toString(16).padStart(2, "0");
  return s;
}

let gmpPromise: ReturnType<typeof init> | null = null;
export function loadGmp(): ReturnType<typeof init> {
  if (!gmpPromise) gmpPromise = init();
  return gmpPromise;
}

/**
 * Confirm gmp-wasm runs in this (frontend) runtime and benchmark the expensive
 * multiply. Intentionally skips the ~80 s GCD so the test doesn't freeze the UI —
 * the real recovery runs in a Web Worker.
 */
export async function gmpSelfTest(): Promise<GmpTestResult> {
  const webAssembly = typeof WebAssembly !== "undefined";
  if (!webAssembly) {
    return { ok: false, webAssembly: false, message: "WebAssembly is NOT available in the frontend runtime." };
  }
  try {
    const t0 = Date.now();
    const gmp = await loadGmp();
    const initMs = Date.now() - t0;

    const ctx0 = gmp.getContext();
    const sane = ctx0.Integer(48).gcd(36).toString();
    ctx0.destroy();
    if (sane !== "12") {
      return { ok: false, webAssembly: true, message: `gmp-wasm initialised but gcd(48,36)="${sane}" (expected 12).` };
    }

    // One full s^65537 (~16 MB) — confirms big-integer multiply works & is fast.
    const t1 = Date.now();
    const ctx = gmp.getContext();
    ctx.Integer(randHex(256), 16).pow(65537);
    ctx.destroy();
    const powMs = Date.now() - t1;

    return {
      ok: true,
      webAssembly: true,
      message:
        `gmp-wasm runs in the frontend. init ${initMs}ms; one s^65537 (16 MB) in ${powMs}ms. ` +
        `Full recovery (incl. the ~80s GCD) will run in a Web Worker so the UI stays responsive.`,
    };
  } catch (e) {
    return { ok: false, webAssembly: true, message: `gmp-wasm failed: ${(e as Error).message}` };
  }
}
