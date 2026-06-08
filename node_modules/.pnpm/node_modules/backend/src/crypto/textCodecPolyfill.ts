// Minimal UTF-8 TextEncoder/TextDecoder polyfill.
//
// gmp-wasm instantiates `new TextDecoder()` / `new TextEncoder()` at its module
// top level, so they must exist the moment gmp-wasm is imported. Some backend
// runtimes (QuickJS/LLRT) don't expose them as globals — without this, importing
// gmp-wasm throws at backend load and breaks the ENTIRE plugin (every RPC 500s).
//
// This module is imported (for its side effect) BEFORE gmp-wasm anywhere gmp-wasm
// is pulled in, so the globals are present first. It only installs the polyfill
// when the global is missing, so native implementations are preferred.

const g = globalThis as Record<string, unknown>;

if (typeof g.TextEncoder === "undefined") {
  g.TextEncoder = class {
    readonly encoding = "utf-8";
    encode(str = ""): Uint8Array {
      const out: number[] = [];
      for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if (c < 0x80) {
          out.push(c);
        } else if (c < 0x800) {
          out.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
        } else if (c >= 0xd800 && c <= 0xdbff) {
          const c2 = str.charCodeAt(++i);
          c = 0x10000 + ((c & 0x3ff) << 10) + (c2 & 0x3ff);
          out.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 0x3f), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
        } else {
          out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
        }
      }
      return new Uint8Array(out);
    }
  };
}

if (typeof g.TextDecoder === "undefined") {
  g.TextDecoder = class {
    readonly encoding = "utf-8";
    decode(input?: ArrayBufferView | ArrayBuffer): string {
      if (!input) return "";
      const bytes =
        input instanceof Uint8Array
          ? input
          : new Uint8Array(ArrayBuffer.isView(input) ? input.buffer : (input as ArrayBuffer));
      let str = "";
      let i = 0;
      while (i < bytes.length) {
        const c = bytes[i++];
        if (c < 0x80) {
          str += String.fromCharCode(c);
        } else if (c < 0xe0) {
          str += String.fromCharCode(((c & 0x1f) << 6) | (bytes[i++] & 0x3f));
        } else if (c < 0xf0) {
          str += String.fromCharCode(((c & 0xf) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f));
        } else {
          let cp = ((c & 7) << 18) | ((bytes[i++] & 0x3f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f);
          cp -= 0x10000;
          str += String.fromCharCode(0xd800 + (cp >> 10), 0xdc00 + (cp & 0x3ff));
        }
      }
      return str;
    }
  };
}
