// Web Worker: the ONLY place gmp-wasm is loaded. Runs the heavy RSA-recovery
// arithmetic (sig^e over the integers + GCD of two ~16 MB numbers) off the main
// thread so Caido's UI stays responsive during the ~1–2 min computation.

import { init } from "gmp-wasm";

type GmpLib = Awaited<ReturnType<typeof init>>;

let gmpPromise: Promise<GmpLib> | null = null;
const loadGmp = () => (gmpPromise ??= init());

interface SelfTestMsg { id: number; type: "selftest"; sampleHex: string }
interface GcdMsg { id: number; type: "gcd"; s0: string; s1: string; m0: string; m1: string; e: number }
type InMsg = SelfTestMsg | GcdMsg;

self.onmessage = async (ev: MessageEvent<InMsg>) => {
  const msg = ev.data;
  try {
    if (typeof WebAssembly === "undefined") {
      throw new Error("WebAssembly is not available in the worker runtime");
    }
    const gmp = await loadGmp();

    if (msg.type === "selftest") {
      const t0 = Date.now();
      const ctx0 = gmp.getContext();
      const sane = ctx0.Integer(48).gcd(36).toString();
      ctx0.destroy();
      const t1 = Date.now();
      const ctx = gmp.getContext();
      ctx.Integer(msg.sampleHex, 16).pow(65537); // ~16 MB, confirms big multiply
      ctx.destroy();
      (self as unknown as Worker).postMessage({
        id: msg.id,
        ok: sane === "12",
        message: `gmp-wasm OK in worker. gcd(48,36)=${sane}; s^65537 (16 MB) in ${Date.now() - t1}ms; init+sanity ${t1 - t0}ms.`,
      });
      return;
    }

    if (msg.type === "gcd") {
      const ctx = gmp.getContext();
      const A = ctx.Integer(msg.s0, 16).pow(msg.e).sub(ctx.Integer(msg.m0, 16));
      const B = ctx.Integer(msg.s1, 16).pow(msg.e).sub(ctx.Integer(msg.m1, 16));
      const gcdHex = A.gcd(B).toString(16);
      ctx.destroy();
      (self as unknown as Worker).postMessage({ id: msg.id, gcdHex });
      return;
    }
  } catch (e) {
    (self as unknown as Worker).postMessage({ id: (msg as InMsg).id, error: (e as Error).message });
  }
};
