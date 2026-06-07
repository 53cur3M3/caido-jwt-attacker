export interface ParsedJWT {
  headerB64: string;
  payloadB64: string;
  signatureB64: string;
  header: JWTHeader;
  payload: Record<string, unknown>;
}

export interface JWTHeader {
  alg: string;
  typ?: string;
  kid?: string;
  jku?: string;
  jwk?: JWK;
  x5u?: string;
  x5c?: string[];
  [key: string]: unknown;
}

export interface JWK {
  kty: string;
  n?: string;
  e?: string;
  d?: string;
  p?: string;
  q?: string;
  dp?: string;
  dq?: string;
  qi?: string;
  crv?: string;
  x?: string;
  y?: string;
  use?: string;
  kid?: string;
  alg?: string;
  [key: string]: unknown;
}

export interface JwtLocation {
  type: "header" | "cookie" | "body-json" | "query";
  headerName?: string;
  prefix?: string;
  cookieName?: string;
  jsonKey?: string;
  queryParam?: string;
  jwt: string;
}

export interface AttackResult {
  id: string;
  technique: string;
  techniqueName: string;
  description: string;
  modifiedJWT: string;
  requestId?: string;
  responseStatus?: number;
  responseLength?: number;
  responseBody?: string;
  responseHeaders?: Record<string, string>;
  error?: string;
  timestamp: number;
  durationMs?: number;
  // For algorithm-confusion attacks: the public key / certificate PEM used as
  // the HMAC secret basis, which encoding of it was signed with, and the original
  // (unmodified) token — used to render jwt_tool reproduction commands.
  keyPem?: string;
  secretEncoding?: string;
  originalJWT?: string;
  // For HMAC-based attacks (kid injection, weak secret): the plaintext HMAC
  // secret used to sign — needed for jwt_tool reproduction commands.
  hmacSecret?: string;
  // For JKU/X5U spoofing: the RSA private key (PEM) used to sign — needed for
  // jwt_tool reproduction commands that re-sign with the same key.
  signingKeyPem?: string;
  // Informational results (e.g. weak-secret "not found") that should be shown
  // but NOT sent as an HTTP request.
  infoOnly?: boolean;
  // Weak-secret crack: how many unique secrets were tested.
  secretsTested?: number;
}

export interface PluginConfig {
  jwksUrl: string;
  customPublicKeyPem: string;
  customPrivateKeyPem: string;
  customCertPem: string;
  // JWKS discovery paths probed on the target host (configurable; defaults to
  // COMMON_JWKS_PATHS).
  jwksPaths: string[];
  customWordlist: string[];
  // Persisted JKU/X5U spoofing key pair (generated once on install, regenerable):
  // the RSA private key used to sign spoofed tokens, and the JWKS document that
  // must be hosted at jwksUrl. The two are always kept consistent.
  spoofPrivateKeyPem: string;
  spoofJwksJson: string;
  enabledAttacks: Record<string, boolean>;
  // Opt-in: RSA public-key recovery from 2+ history JWTs. Off by default because
  // the integer arithmetic (sig^65537) is extremely slow in a pure-JS runtime.
  enableKeyRecovery: boolean;
}

export const COMMON_JWKS_PATHS = [
  "/.well-known/jwks.json",
  "/.well-known/openid-configuration", // parsed to follow its jwks_uri
  "/oauth/jwks",
  "/oauth2/jwks",
  "/oauth2/v1/keys",
  "/oauth2/v3/certs",
  "/v1/keys",
  "/v2/keys",
  "/.well-known/keys",
  "/auth/keys",
  "/auth/realms/master/protocol/openid-connect/certs", // Keycloak ({realm}=master)
  "/realms/master/protocol/openid-connect/certs",       // Keycloak (newer layout)
  "/jwks",
  "/jwks.json",
  "/api/auth/jwks",
  "/api/jwks",
  "/api/v1/jwks",
  "/api/v2/jwks",
  "/.well-known/pki-validation/jwks.json",
  "/common/discovery/keys",      // Azure AD
  "/discovery/v2.0/keys",        // Azure AD
  "/oauth2/default/v1/keys",     // Okta
  // Retained extras from prior list
  "/api/auth/keys",
  "/oauth/v2/keys",
  "/auth/jwks",
  "/.well-known/jwt-keys",
  "/api/v1/jwks.json",
  "/connect/jwks_uri",
];

export const DEFAULT_CONFIG: PluginConfig = {
  jwksUrl: "",
  customPublicKeyPem: "",
  customPrivateKeyPem: "",
  customCertPem: "",
  jwksPaths: [...COMMON_JWKS_PATHS],
  customWordlist: [],
  spoofPrivateKeyPem: "",
  spoofJwksJson: "",
  enableKeyRecovery: false,
  enabledAttacks: {
    none: true,
    nullSig: true,
    algConfusion: true,
    embeddedJwk: true,
    jkuSpoof: true,
    x5uSpoof: true,
    kidInject: true,
    claimTamper: true,
    weakSecret: true,
  },
};
