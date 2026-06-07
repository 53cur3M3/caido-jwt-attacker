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
}

export interface PluginConfig {
  jwksUrl: string;
  customPublicKeyPem: string;
  customPrivateKeyPem: string;
  customCertPem: string;
  extraJwksPaths: string[];
  customWordlist: string[];
  enabledAttacks: Record<string, boolean>;
}

export const DEFAULT_CONFIG: PluginConfig = {
  jwksUrl: "",
  customPublicKeyPem: "",
  customPrivateKeyPem: "",
  customCertPem: "",
  extraJwksPaths: [],
  customWordlist: [],
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

export const COMMON_JWKS_PATHS = [
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
  "/connect/jwks_uri",
];
