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
}

export interface DiscoveredEndpoint {
  url: string;
  source: string;
  keyCount: number;
  content: string;   // raw body returned by the URL
  pems: string[];    // PEM-encoded public keys extracted from it
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
  jwksJson?: string;
  jwksPrivateKey?: string;
  keyRecoveryLog: string[];
}

export interface PluginConfig {
  jwksUrl: string;
  customPublicKeyPem: string;
  customPrivateKeyPem: string;
  customCertPem: string;
  extraJwksPaths: string[];
  customWordlist: string[];
  enabledAttacks: Record<string, boolean>;
  // Opt-in: RSA public-key recovery from 2+ history JWTs. Off by default because
  // the integer arithmetic (sig^65537) is extremely slow in a pure-JS runtime.
  enableKeyRecovery: boolean;
}

export const DEFAULT_CONFIG: PluginConfig = {
  jwksUrl: "",
  customPublicKeyPem: "",
  customPrivateKeyPem: "",
  customCertPem: "",
  extraJwksPaths: [],
  customWordlist: [],
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

export const ATTACK_LABELS: Record<string, string> = {
  none: "None Algorithm",
  nullSig: "Null Signature",
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
    none: "bg-red-900 text-red-200",
    nullSig: "bg-red-900 text-red-200",
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
