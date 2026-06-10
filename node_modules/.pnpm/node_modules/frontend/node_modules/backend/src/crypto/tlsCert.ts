// Retrieve a web server's TLS certificate public key over a RAW socket (sdk.net
// with tls=false), performing the TLS handshake ourselves.
//
// - TLS 1.2: the server's Certificate is sent in plaintext → just parse it.
// - TLS 1.3: the Certificate is ENCRYPTED, so we do an X25519 key exchange, run
//   the TLS 1.3 key schedule (HKDF-SHA256) and AES-128-GCM-decrypt the server's
//   handshake flight to read the Certificate.
//
// We only need the leaf certificate's public key, so we offer a single TLS 1.3
// cipher (TLS_AES_128_GCM_SHA256) and group (x25519) to keep the crypto minimal.

import { createHmac, createHash, createDecipheriv, randomBytes } from "crypto";
import { x509CertToPublicKeyPem, publicKey2jwk } from "./rsa.js";

export interface RawConn {
  send(bytes: Uint8Array | number[]): Promise<void>;
  receive(size?: number): Promise<Uint8Array>;
  close?(): void;
}
export type LogFn = (m: string) => void;

const sleep = (ms: number): Promise<void> =>
  new Promise((res) => {
    const t = (globalThis as { setTimeout?: (f: () => void, ms: number) => unknown }).setTimeout;
    if (typeof t === "function") t(res, ms); else res();
  });

// ASCII string → byte array (hostnames/TLS labels are ASCII). Avoids TextEncoder
// (absent in LLRT) and Buffer.from(str,"utf8") (unreliable in LLRT).
const asciiBytes = (s: string): number[] => {
  const out: number[] = [];
  for (let i = 0; i < s.length; i++) out.push(s.charCodeAt(i) & 0xff);
  return out;
};

const u16 = (n: number) => [(n >> 8) & 0xff, n & 0xff];
const u24 = (n: number) => [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
const concat = (arrs: Uint8Array[]): Uint8Array => {
  let len = 0;
  for (const a of arrs) len += a.length;
  const out = new Uint8Array(len);
  let o = 0;
  for (const a of arrs) { out.set(a, o); o += a.length; }
  return out;
};

// ─── X25519 (RFC 7748) ───────────────────────────────────────────────────────
const P25519 = (1n << 255n) - 19n;
function powmod(b: bigint, e: bigint, m: bigint): bigint {
  let r = 1n; b %= m;
  while (e > 0n) { if (e & 1n) r = (r * b) % m; e >>= 1n; b = (b * b) % m; }
  return r;
}
function decodeLE(b: Uint8Array): bigint { let n = 0n; for (let i = b.length - 1; i >= 0; i--) n = (n << 8n) | BigInt(b[i]); return n; }
function encodeLE(n: bigint): Uint8Array { const o = new Uint8Array(32); for (let i = 0; i < 32; i++) { o[i] = Number(n & 0xffn); n >>= 8n; } return o; }

export function x25519(scalar: Uint8Array, uBytes: Uint8Array): Uint8Array {
  const k = scalar.slice();
  k[0] &= 248; k[31] &= 127; k[31] |= 64;
  const kBig = decodeLE(k);
  let u = decodeLE(uBytes) & ((1n << 255n) - 1n);
  let x1 = u, x2 = 1n, z2 = 0n, x3 = u, z3 = 1n, swap = 0n;
  const a24 = 121665n;
  const cswap = (s: bigint, a: bigint, b: bigint): [bigint, bigint] => {
    const d = (s * ((a - b + P25519) % P25519)) % P25519;
    return [(a - d + P25519) % P25519, (b + d) % P25519];
  };
  for (let t = 254; t >= 0; t--) {
    const kt = (kBig >> BigInt(t)) & 1n;
    swap ^= kt;
    [x2, x3] = cswap(swap, x2, x3);
    [z2, z3] = cswap(swap, z2, z3);
    swap = kt;
    const A = (x2 + z2) % P25519, AA = (A * A) % P25519;
    const B = (x2 - z2 + P25519) % P25519, BB = (B * B) % P25519;
    const E = (AA - BB + P25519) % P25519;
    const C = (x3 + z3) % P25519, D = (x3 - z3 + P25519) % P25519;
    const DA = (D * A) % P25519, CB = (C * B) % P25519;
    x3 = (((DA + CB) % P25519) ** 2n) % P25519;
    z3 = (x1 * ((((DA - CB + P25519) % P25519) ** 2n) % P25519)) % P25519;
    x2 = (AA * BB) % P25519;
    z2 = (E * ((AA + (a24 * E) % P25519) % P25519)) % P25519;
  }
  [x2, x3] = cswap(swap, x2, x3);
  [z2, z3] = cswap(swap, z2, z3);
  const res = (x2 * powmod(z2, P25519 - 2n, P25519)) % P25519;
  return encodeLE(res);
}
const X25519_BASE = (() => { const b = new Uint8Array(32); b[0] = 9; return b; })();

// ─── HKDF (RFC 5869) + TLS 1.3 labels (RFC 8446) ─────────────────────────────
const hmacSha256 = (key: Uint8Array, data: Uint8Array): Uint8Array =>
  new Uint8Array(createHmac("sha256", Buffer.from(key)).update(Buffer.from(data)).digest());
const sha256 = (data: Uint8Array): Uint8Array =>
  new Uint8Array(createHash("sha256").update(Buffer.from(data)).digest());

function hkdfExpand(prk: Uint8Array, info: Uint8Array, length: number): Uint8Array {
  const out: number[] = [];
  let t = new Uint8Array(0);
  let i = 1;
  while (out.length < length) {
    t = hmacSha256(prk, concat([t, info, new Uint8Array([i])]));
    for (const b of t) out.push(b);
    i++;
  }
  return new Uint8Array(out.slice(0, length));
}
function hkdfExpandLabel(secret: Uint8Array, label: string, context: Uint8Array, length: number): Uint8Array {
  const full = new Uint8Array(asciiBytes("tls13 " + label));
  const info = concat([
    new Uint8Array(u16(length)),
    new Uint8Array([full.length]), full,
    new Uint8Array([context.length]), context,
  ]);
  return hkdfExpand(secret, info, length);
}

// ─── TLS 1.2 ─────────────────────────────────────────────────────────────────
export function buildClientHello12(host: string): Uint8Array {
  const sni = asciiBytes(host);
  const random: number[] = [];
  for (let i = 0; i < 32; i++) random.push(Math.floor(Math.random() * 256));
  const cipherSuites = [
    0xc0, 0x2f, 0xc0, 0x30, 0xc0, 0x2b, 0xc0, 0x2c, 0xc0, 0x13, 0xc0, 0x14,
    0x00, 0x9c, 0x00, 0x9d, 0x00, 0x2f, 0x00, 0x35, 0x00, 0xff,
  ];
  const exts: number[] = [];
  const pushExt = (type: number, data: number[]) => exts.push(...u16(type), ...u16(data.length), ...data);
  const nameEntry = [0x00, ...u16(sni.length), ...sni];
  pushExt(0x0000, [...u16(nameEntry.length), ...nameEntry]);
  pushExt(0x000a, [...u16(6), 0x00, 0x1d, 0x00, 0x17, 0x00, 0x18]);
  pushExt(0x000b, [0x01, 0x00]);
  pushExt(0x000d, [...u16(20), 0x04, 0x01, 0x05, 0x01, 0x06, 0x01, 0x04, 0x03, 0x05, 0x03, 0x06, 0x03, 0x08, 0x04, 0x08, 0x05, 0x08, 0x06, 0x02, 0x01]);
  const body = [0x03, 0x03, ...random, 0x00, ...u16(cipherSuites.length), ...cipherSuites, 0x01, 0x00, ...u16(exts.length), ...exts];
  const hs = [0x01, ...u24(body.length), ...body];
  return new Uint8Array([0x16, 0x03, 0x01, ...u16(hs.length), ...hs]);
}

// Parse accumulated record bytes, return the first cert DER from a (plaintext)
// Certificate message, or null if incomplete. Throws on alert.
export function extractCertDER12(buf: Uint8Array): Uint8Array | null {
  const hs: number[] = [];
  let i = 0;
  while (i + 5 <= buf.length) {
    const type = buf[i];
    const len = (buf[i + 3] << 8) | buf[i + 4];
    if (i + 5 + len > buf.length) break;
    const payload = buf.subarray(i + 5, i + 5 + len);
    if (type === 0x15) throw new Error(`alert level ${payload[0]} desc ${payload[1]}`);
    if (type === 0x16) for (let k = 0; k < payload.length; k++) hs.push(payload[k]);
    i += 5 + len;
  }
  let j = 0;
  while (j + 4 <= hs.length) {
    const hsType = hs[j];
    const hsLen = (hs[j + 1] << 16) | (hs[j + 2] << 8) | hs[j + 3];
    if (j + 4 + hsLen > hs.length) break;
    if (hsType === 0x0b) {
      let k = j + 4 + 3; // skip cert_list length
      if (k + 3 > hs.length) return null;
      const certLen = (hs[k] << 16) | (hs[k + 1] << 8) | hs[k + 2]; k += 3;
      if (k + certLen > hs.length) return null;
      return new Uint8Array(hs.slice(k, k + certLen));
    }
    j += 4 + hsLen;
  }
  return null;
}

export async function fetchServerCertDER12(conn: RawConn, host: string, log: LogFn, maxReads = 40): Promise<Uint8Array | null> {
  const ch = buildClientHello12(host);
  // Send as a plain number[] (a valid Bytes form) — LLRT's socket send may not
  // transmit a Uint8Array correctly.
  try { await conn.send(Array.from(ch)); } catch (e) { log(`TLS1.2: send failed: ${(e as Error).message}`); return null; }
  const hasTimer = typeof (globalThis as { setTimeout?: unknown }).setTimeout === "function";
  log(`TLS1.2: sent ClientHello (${ch.length} B); reading response (setTimeout ${hasTimer ? "ok" : "MISSING — retries won't pause"})…`);
  let buf = new Uint8Array(0);
  let empties = 0;
  let loggedVer = false;
  for (let r = 0; r < maxReads; r++) {
    let chunk: Uint8Array;
    try { chunk = await conn.receive(16384); } catch (e) { log(`TLS1.2: receive error: ${(e as Error).message}`); break; }
    if (r < 4) log(`TLS1.2: read #${r} → ${chunk ? chunk.length : 0} B`);
    if (!chunk || chunk.length === 0) {
      // receive() can return empty when no data has arrived yet (non-blocking).
      // Wait briefly and retry; only give up after several empty reads.
      empties++;
      if (empties > 20) { log(`TLS1.2: no response after ${empties} empty reads (${buf.length} B) — server closed/ignored the ClientHello`); break; }
      await sleep(150);
      continue;
    }
    empties = 0;
    buf = concat([buf, chunk]);
    if (!loggedVer && buf.length >= 11 && buf[0] === 0x16) {
      log(`TLS1.2: received ${buf.length} B; ServerHello server_version=0x${(((buf[9] << 8) | buf[10])).toString(16)}`);
      loggedVer = true;
    }
    try {
      const cert = extractCertDER12(buf);
      if (cert) { log(`TLS1.2: got certificate (${cert.length} B)`); return cert; }
    } catch (e) { log(`TLS1.2: ${(e as Error).message}`); return null; }
    if (buf.length > 262144) break;
  }
  if (buf.length) log(`TLS1.2: no plaintext Certificate in ${buf.length} B (server may be TLS 1.3-only)`);
  return null;
}

// ─── TLS 1.3 ─────────────────────────────────────────────────────────────────
export function buildClientHello13(host: string, pub: Uint8Array): { record: Uint8Array; handshake: Uint8Array } {
  const sni = asciiBytes(host);
  const random: number[] = [];
  for (let i = 0; i < 32; i++) random.push(Math.floor(Math.random() * 256));
  const sessId: number[] = [];
  for (let i = 0; i < 32; i++) sessId.push(Math.floor(Math.random() * 256)); // legacy_session_id (compat)
  const cipherSuites = [0x13, 0x01]; // TLS_AES_128_GCM_SHA256
  const exts: number[] = [];
  const pushExt = (type: number, data: number[]) => exts.push(...u16(type), ...u16(data.length), ...data);
  const nameEntry = [0x00, ...u16(sni.length), ...sni];
  pushExt(0x0000, [...u16(nameEntry.length), ...nameEntry]);              // server_name
  pushExt(0x000a, [...u16(2), 0x00, 0x1d]);                              // supported_groups: x25519
  pushExt(0x000d, [...u16(8), 0x04, 0x03, 0x08, 0x04, 0x04, 0x01, 0x02, 0x01]); // signature_algorithms
  pushExt(0x002b, [0x02, 0x03, 0x04]);                                  // supported_versions: TLS 1.3
  pushExt(0x0033, [...u16(36), 0x00, 0x1d, ...u16(32), ...Array.from(pub)]); // key_share: x25519
  const body = [0x03, 0x03, ...random, sessId.length, ...sessId, ...u16(cipherSuites.length), ...cipherSuites, 0x01, 0x00, ...u16(exts.length), ...exts];
  const hs = new Uint8Array([0x01, ...u24(body.length), ...body]);
  const record = new Uint8Array([0x16, 0x03, 0x01, ...u16(hs.length), ...hs]);
  return { record, handshake: hs };
}

interface Hs13State { priv: Uint8Array; clientHelloHs: Uint8Array; }

// Parse the server's records; derive keys from the ServerHello, AES-GCM-decrypt
// the handshake records, and return the first cert DER, or null if incomplete.
export function tryExtractCert13(buf: Uint8Array, st: Hs13State, log: LogFn): Uint8Array | null {
  // 1. Walk records; capture ServerHello, gather encrypted (type 23) records.
  let serverHelloHs: Uint8Array | null = null;
  const encRecords: { header: Uint8Array; payload: Uint8Array }[] = [];
  let i = 0;
  while (i + 5 <= buf.length) {
    const type = buf[i];
    const len = (buf[i + 3] << 8) | buf[i + 4];
    if (i + 5 + len > buf.length) break;
    const header = buf.subarray(i, i + 5);
    const payload = buf.subarray(i + 5, i + 5 + len);
    if (type === 0x15) throw new Error(`alert level ${payload[0]} desc ${payload[1]}`);
    if (type === 0x16 && !serverHelloHs) serverHelloHs = payload.slice(); // ServerHello (plaintext handshake)
    else if (type === 0x17) encRecords.push({ header: header.slice(), payload: payload.slice() });
    // type 0x14 ChangeCipherSpec → ignore
    i += 5 + len;
  }
  if (!serverHelloHs) return null;

  // 2. Extract server key_share (x25519) from ServerHello.
  const serverPub = parseServerHelloKeyShare(serverHelloHs);
  if (!serverPub) throw new Error("ServerHello has no x25519 key_share (HelloRetryRequest or unsupported group)");

  // 3. TLS 1.3 key schedule → server handshake traffic key/iv.
  const shared = x25519(st.priv, serverPub);
  const zeros = new Uint8Array(32);
  const earlySecret = hkdfExtract(zeros, zeros);
  const derived = hkdfExpandLabel(earlySecret, "derived", sha256(new Uint8Array(0)), 32);
  const handshakeSecret = hkdfExtract(derived, shared);
  const transcript = sha256(concat([st.clientHelloHs, serverHelloHs]));
  const sHs = hkdfExpandLabel(handshakeSecret, "s hs traffic", transcript, 32);
  const key = hkdfExpandLabel(sHs, "key", new Uint8Array(0), 16);
  const iv = hkdfExpandLabel(sHs, "iv", new Uint8Array(0), 12);

  // 4. Decrypt the encrypted handshake records in order.
  const hs: number[] = [];
  for (let s = 0; s < encRecords.length; s++) {
    let plain: Uint8Array;
    try { plain = aesGcmDecrypt(key, iv, BigInt(s), encRecords[s].header, encRecords[s].payload); }
    catch { return null; } // incomplete / wrong key for trailing record
    // inner plaintext = content || content_type || zero padding; strip trailing zeros
    let end = plain.length - 1;
    while (end >= 0 && plain[end] === 0) end--;
    if (end < 0) continue;
    const ctype = plain[end];
    if (ctype === 0x16) for (let k = 0; k < end; k++) hs.push(plain[k]); // handshake
    else if (ctype === 0x15) throw new Error(`encrypted alert ${plain[end - 1]}/${plain[end > 0 ? end - 1 : 0]}`);
  }

  // 5. Find the Certificate (type 0x0b) in the decrypted handshake (TLS 1.3 layout).
  let j = 0;
  while (j + 4 <= hs.length) {
    const hsType = hs[j];
    const hsLen = (hs[j + 1] << 16) | (hs[j + 2] << 8) | hs[j + 3];
    if (j + 4 + hsLen > hs.length) break;
    if (hsType === 0x0b) {
      let k = j + 4;
      const ctxLen = hs[k]; k += 1 + ctxLen;          // certificate_request_context
      k += 3;                                          // certificate_list length
      if (k + 3 > hs.length) return null;
      const certLen = (hs[k] << 16) | (hs[k + 1] << 8) | hs[k + 2]; k += 3;
      if (k + certLen > hs.length) return null;
      return new Uint8Array(hs.slice(k, k + certLen));
    }
    j += 4 + hsLen;
  }
  return null;
}

function parseServerHelloKeyShare(sh: Uint8Array): Uint8Array | null {
  // sh = handshake msg: type(1) len(3) | version(2) random(32) sid_len(1) sid | cipher(2) comp(1) ext_len(2) exts
  let p = 4 + 2 + 32;
  const sidLen = sh[p]; p += 1 + sidLen;
  p += 2 + 1; // cipher_suite + compression
  const extLen = (sh[p] << 8) | sh[p + 1]; p += 2;
  const end = p + extLen;
  while (p + 4 <= end) {
    const type = (sh[p] << 8) | sh[p + 1];
    const len = (sh[p + 2] << 8) | sh[p + 3];
    p += 4;
    if (type === 0x0033) { // key_share: group(2) keylen(2) key
      const group = (sh[p] << 8) | sh[p + 1];
      const klen = (sh[p + 2] << 8) | sh[p + 3];
      if (group === 0x001d && klen === 32) return sh.slice(p + 4, p + 4 + 32);
      return null;
    }
    p += len;
  }
  return null;
}

function hkdfExtract(salt: Uint8Array, ikm: Uint8Array): Uint8Array { return hmacSha256(salt, ikm); }

function aesGcmDecrypt(key: Uint8Array, iv: Uint8Array, seq: bigint, aad: Uint8Array, payload: Uint8Array): Uint8Array {
  const nonce = iv.slice();
  for (let i = 0; i < 8; i++) nonce[11 - i] ^= Number((seq >> BigInt(8 * i)) & 0xffn);
  const tag = payload.subarray(payload.length - 16);
  const ct = payload.subarray(0, payload.length - 16);
  const d = createDecipheriv("aes-128-gcm", Buffer.from(key), Buffer.from(nonce));
  d.setAAD(Buffer.from(aad));
  d.setAuthTag(Buffer.from(tag));
  return new Uint8Array(Buffer.concat([d.update(Buffer.from(ct)), d.final()]));
}

export async function fetchServerCertDER13(conn: RawConn, host: string, log: LogFn, maxReads = 40): Promise<Uint8Array | null> {
  const priv = new Uint8Array(randomBytes(32));
  const pub = x25519(priv, X25519_BASE);
  const { record, handshake } = buildClientHello13(host, pub);
  const st: Hs13State = { priv, clientHelloHs: handshake };
  try { await conn.send(Array.from(record)); } catch (e) { log(`TLS1.3: send failed: ${(e as Error).message}`); return null; }
  log(`TLS1.3: sent ClientHello (${record.length} B, x25519 key_share)`);
  let buf = new Uint8Array(0);
  let empties = 0;
  for (let r = 0; r < maxReads; r++) {
    let chunk: Uint8Array;
    try { chunk = await conn.receive(16384); } catch (e) { log(`TLS1.3: receive error: ${(e as Error).message}`); break; }
    if (!chunk || chunk.length === 0) {
      empties++;
      if (empties === 1) log(`TLS1.3: awaiting server response…`);
      if (empties > 12) { log(`TLS1.3: no response after ${empties} reads (${buf.length} B)`); break; }
      await sleep(150);
      continue;
    }
    empties = 0;
    buf = concat([buf, chunk]);
    try {
      const cert = tryExtractCert13(buf, st, log);
      if (cert) { log(`TLS1.3: decrypted Certificate (${cert.length} B)`); return cert; }
    } catch (e) { log(`TLS1.3: ${(e as Error).message}`); return null; }
    if (buf.length > 262144) break;
  }
  if (buf.length) log(`TLS1.3: no Certificate recovered from ${buf.length} B`);
  return null;
}

// ─── Public-key extraction ───────────────────────────────────────────────────
export function certDERToPublicKeyPem(der: Uint8Array): string {
  const b64 = Buffer.from(der).toString("base64");
  const pem = `-----BEGIN CERTIFICATE-----\n${b64.match(/.{1,64}/g)!.join("\n")}\n-----END CERTIFICATE-----\n`;
  return x509CertToPublicKeyPem(pem);
}

export function publicKeyPemToModulusHex(pem: string): string | null {
  try {
    const jwk = publicKey2jwk(pem);
    if (jwk.kty !== "RSA" || !jwk.n) return null;
    const b64 = jwk.n.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((jwk.n.length + 3) % 4);
    let hex = Buffer.from(b64, "base64").toString("hex").replace(/^0+/, "");
    if (hex.length % 2) hex = "0" + hex;
    return hex || null;
  } catch { return null; }
}

export interface TlsPublicKey { publicKeyPem: string; nHex: string | null; }

// Given a factory that opens a fresh raw socket, try TLS 1.2 then TLS 1.3.
export async function fetchTlsPublicKeyOverConns(
  newConn: () => Promise<RawConn>,
  host: string,
  log: LogFn = () => {}
): Promise<TlsPublicKey | null> {
  let der: Uint8Array | null = null;
  let c1: RawConn | undefined;
  try {
    log(`connecting to ${host} (raw socket) for TLS 1.2…`);
    c1 = await newConn();
    der = await fetchServerCertDER12(c1, host, log);
  } catch (e) { log(`TLS1.2: connect/handshake failed: ${(e as Error).message}`); }
  finally { try { c1?.close?.(); } catch { /* ignore */ } }

  if (!der) {
    let c2: RawConn | undefined;
    try {
      log(`retrying over TLS 1.3…`);
      c2 = await newConn();
      der = await fetchServerCertDER13(c2, host, log);
    } catch (e) { log(`TLS1.3: connect/handshake failed: ${(e as Error).message}`); }
    finally { try { c2?.close?.(); } catch { /* ignore */ } }
  }

  if (!der) return null;
  const publicKeyPem = certDERToPublicKeyPem(der);
  return { publicKeyPem, nHex: publicKeyPemToModulusHex(publicKeyPem) };
}
