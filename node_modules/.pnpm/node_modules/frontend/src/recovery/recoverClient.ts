// Main-thread client for the recovery worker. `?worker&inline` makes Vite embed
// the worker (and its gmp-wasm) as a base64 blob inside the single frontend
// bundle — no separate chunk file (which Caido wouldn't package).
import RecoveryWorker from "./recovery.worker?worker&inline";

let worker: Worker | null = null;
let seq = 0;
const pending = new Map<number, { resolve: (v: unknown) => void; reject: (e: Error) => void }>();

function getWorker(): Worker {
  if (!worker) {
    worker = new RecoveryWorker();
    worker.onmessage = (ev: MessageEvent<{ id: number; error?: string }>) => {
      const { id, error } = ev.data;
      const p = pending.get(id);
      if (!p) return;
      pending.delete(id);
      if (error) p.reject(new Error(error));
      else p.resolve(ev.data);
    };
    worker.onerror = (e) => {
      for (const [, p] of pending) p.reject(new Error(e.message || "worker error"));
      pending.clear();
    };
  }
  return worker;
}

function call<T>(msg: Record<string, unknown>): Promise<T> {
  const id = ++seq;
  return new Promise<T>((resolve, reject) => {
    pending.set(id, { resolve: resolve as (v: unknown) => void, reject });
    getWorker().postMessage({ ...msg, id });
  });
}

export function selfTest(sampleHex: string): Promise<{ ok: boolean; message: string }> {
  return call({ type: "selftest", sampleHex });
}

export function gcdOfPowerDiffs(s0: string, s1: string, m0: string, m1: string, e: number): Promise<string> {
  return call<{ gcdHex: string }>({ type: "gcd", s0, s1, m0, m1, e }).then((r) => r.gcdHex);
}
