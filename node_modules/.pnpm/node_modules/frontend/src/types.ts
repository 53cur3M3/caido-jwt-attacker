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
  // Invalid-signature probe: set when its response matched the baseline, i.e. the
  // server appears to accept a token with a bad signature.
  signatureNotValidated?: boolean;
  // Weak-secret crack: how many unique secrets were tested.
  secretsTested?: number;
}

export interface DiscoveredEndpoint {
  url: string;
  source: string;
  keyCount: number;
  content: string;   // raw body returned by the URL
  pems: string[];    // PEM-encoded public keys extracted from it
}

export interface SpoofInfo {
  jwksJson: string;        // the JWKS document to host
  privateKeyPem: string;   // the signing private key
  url: string;             // configured JWKS endpoint URL
  verifyStatus: "verified" | "mismatch" | "unreachable" | "no-url";
  verifyMessage: string;
  fetchedContent: string;  // what was actually fetched from the URL
  selfVerified: boolean;   // signed token validates against the configured JWKS
}

export interface RecoveryInfo {
  candidates: string[];   // full JWT strings scanned from history
  originalJWT: string;    // the token being attacked
  keys: Array<{ pem: string; bits: number; e: number }>; // recovered public key(s)
}

export interface AttackSession {
  sessionId: string;
  requestId: string;
  startedAt: number;
  results: AttackResult[];
  total: number;
  complete: boolean;
  errors: string[];
  recoveredKeys: string[];
  discoveredEndpoints: DiscoveredEndpoint[];
  spoof?: SpoofInfo;
  recovery?: RecoveryInfo;
  keyRecoveryLog: string[];
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

// Default JWKS discovery paths — kept in sync with the backend's COMMON_JWKS_PATHS.
// Used to seed the config field and to power the "Reset to defaults" button.
export const COMMON_JWKS_PATHS = [
  "/.well-known/jwks.json",
  "/.well-known/openid-configuration",
  "/oauth/jwks",
  "/oauth2/jwks",
  "/oauth2/v1/keys",
  "/oauth2/v3/certs",
  "/v1/keys",
  "/v2/keys",
  "/.well-known/keys",
  "/auth/keys",
  "/auth/realms/master/protocol/openid-connect/certs",
  "/realms/master/protocol/openid-connect/certs",
  "/jwks",
  "/jwks.json",
  "/api/auth/jwks",
  "/api/jwks",
  "/api/v1/jwks",
  "/api/v2/jwks",
  "/.well-known/pki-validation/jwks.json",
  "/common/discovery/keys",
  "/discovery/v2.0/keys",
  "/oauth2/default/v1/keys",
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
    psychicSig: true,
    algConfusion: true,
    embeddedJwk: true,
    // Off by default: these require the user to configure & host a JWKS URL first.
    jkuSpoof: false,
    x5uSpoof: false,
    kidInject: true,
    claimTamper: true,
    weakSecret: true,
  },
};

export const ATTACK_LABELS: Record<string, string> = {
  none: "None Algorithm",
  nullSig: "Null Signature",
  psychicSig: "Psychic Signature",
  algConfusion: "Algorithm Confusion",
  embeddedJwk: "Embedded JWK",
  jkuSpoof: "JKU Spoofing",
  x5uSpoof: "X5U Spoofing",
  kidInject: "KID Injection",
  claimTamper: "Claim Tampering",
  weakSecret: "Weak Secret",
};

export function statusColor(status?: number): string {
  if (!status) return "text-gray-400";
  if (status < 300) return "text-green-400";
  if (status < 400) return "text-yellow-400";
  if (status < 500) return "text-orange-400";
  return "text-red-400";
}

export function techniqueColor(technique: string): string {
  const palette: Record<string, string> = {
    baseline: "bg-gray-600 text-gray-100",
    invalidSig: "bg-gray-500 text-gray-100",
    none: "bg-red-900 text-red-200",
    nullSig: "bg-red-900 text-red-200",
    psychicSig: "bg-red-900 text-red-200",
    algConfusion: "bg-orange-900 text-orange-200",
    embeddedJwk: "bg-yellow-900 text-yellow-200",
    jkuSpoof: "bg-purple-900 text-purple-200",
    x5uSpoof: "bg-purple-900 text-purple-200",
    kidInject: "bg-blue-900 text-blue-200",
    claimTamper: "bg-teal-900 text-teal-200",
    weakSecret: "bg-pink-900 text-pink-200",
  };
  return palette[technique] ?? "bg-gray-700 text-gray-200";
}
