// Opens raw TCP sockets via LLRT's Node-compatible `net` module (NOT Caido's
// `sdk.net`, whose send/receive don't deliver data in the plugin runtime). This
// is the same Node socket API my Node tests validated byte-exact.
import { connect } from "net";
import { fetchTlsPublicKeyOverConns, type RawConn, type LogFn, type TlsPublicKey } from "./tlsCert.js";

export type { TlsPublicKey } from "./tlsCert.js";

// Wrap a `net.Socket` as a RawConn (send / await-data receive / close).
function openConn(host: string, port: number): Promise<RawConn> {
  return new Promise<RawConn>((resolve, reject) => {
    let settled = false;
    const sock = connect(port, host);
    let buf: Buffer = Buffer.alloc(0);
    let ended = false;
    const waiters: Array<(u: Uint8Array) => void> = [];
    const flush = () => {
      while (waiters.length && (buf.length || ended)) {
        const w = waiters.shift() as (u: Uint8Array) => void;
        const out = buf;
        buf = Buffer.alloc(0);
        w(new Uint8Array(out));
      }
    };
    sock.on("data", (d: Buffer) => { buf = buf.length ? Buffer.concat([buf, d]) : d; flush(); });
    sock.on("end", () => { ended = true; flush(); });
    sock.on("close", () => { ended = true; flush(); });
    sock.on("error", (e: Error) => { ended = true; flush(); if (!settled) { settled = true; reject(e); } });
    sock.once("connect", () => {
      if (settled) return;
      settled = true;
      resolve({
        // Node's write buffers and flushes; fire-and-forget is fine for our small
        // handshake records.
        send: (bytes) => { try { sock.write(Buffer.from(bytes as Uint8Array)); } catch { /* ignore */ } return Promise.resolve(); },
        // Resolve with buffered bytes, or wait for the next 'data'/'end' event.
        receive: () => new Promise<Uint8Array>((res) => {
          if (buf.length || ended) { const out = buf; buf = Buffer.alloc(0); res(new Uint8Array(out)); }
          else waiters.push(res);
        }),
        close: () => { try { sock.destroy(); } catch { /* ignore */ } },
      });
    });
  });
}

export async function fetchTlsPublicKey(
  host: string,
  port: number,
  log: LogFn = () => {}
): Promise<TlsPublicKey | null> {
  return fetchTlsPublicKeyOverConns(() => openConn(host, port), host, log);
}
