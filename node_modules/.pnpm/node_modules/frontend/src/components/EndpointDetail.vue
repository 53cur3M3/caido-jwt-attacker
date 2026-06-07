<template>
  <div v-if="endpoint" class="h-full flex flex-col overflow-hidden text-sm">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-gray-700 bg-gray-900 flex items-start gap-3">
      <span class="px-2 py-0.5 rounded text-xs font-mono font-semibold shrink-0 bg-cyan-800 text-cyan-100">
        {{ endpoint.source }}
      </span>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-gray-100">Discovered key endpoint</p>
        <p class="text-gray-400 text-xs mt-0.5">
          {{ endpoint.keyCount }} key(s) extracted and used for algorithm-confusion attacks.
        </p>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto">
      <!-- URL -->
      <section class="px-4 py-3 border-b border-gray-700">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">URL</p>
        <div class="bg-gray-900 rounded p-2 font-mono text-xs break-all text-cyan-300 select-all">
          {{ endpoint.url }}
        </div>
        <button @click="copy(endpoint.url, 'url')" class="mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          {{ copiedKey === 'url' ? '✓ Copied' : 'Copy URL' }}
        </button>
      </section>

      <!-- Keys extracted -->
      <section class="px-4 py-3 border-b border-gray-700">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Keys extracted</p>
        <p class="text-gray-300 text-xs">{{ endpoint.keyCount }}</p>
      </section>

      <!-- PEM keys + the HMAC secret encodings used in algorithm confusion -->
      <section v-if="keyDetails.length" class="px-4 py-3 border-b border-gray-700">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">
          PEM-encoded {{ keyDetails.length > 1 ? 'keys' : 'key' }} used in algorithm-confusion attacks
        </p>
        <div v-for="(kd, i) in keyDetails" :key="i" class="mb-4 last:mb-0">
          <pre class="bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-48 overflow-y-auto select-all whitespace-pre">{{ kd.pem }}</pre>
          <button @click="copy(kd.pem, 'pem-' + i)" class="mt-1 text-xs text-gray-500 hover:text-gray-300 transition-colors">
            {{ copiedKey === 'pem-' + i ? '✓ Copied' : 'Copy PEM' }}
          </button>

          <p class="text-xs text-gray-500 mt-2 mb-1">
            HMAC secret encodings tried with this key (key {{ i + 1 }}):
          </p>
          <div v-for="(v, j) in kd.variants" :key="j" class="mb-1.5">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono text-orange-300">{{ v.label }}</span>
              <button @click="copy(v.value, `var-${i}-${j}`)" class="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                {{ copiedKey === `var-${i}-${j}` ? '✓ Copied' : 'Copy' }}
              </button>
            </div>
            <pre class="bg-gray-900 rounded p-2 text-xs text-gray-300 overflow-x-auto max-h-24 overflow-y-auto select-all whitespace-pre-wrap break-all">{{ v.value }}</pre>
          </div>
        </div>
      </section>

      <!-- Raw content returned -->
      <section class="px-4 py-3">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Content returned by URL</p>
        <pre class="bg-gray-900 rounded p-2 text-xs text-gray-300 overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap break-all">{{ endpoint.content || '(empty)' }}</pre>
        <button @click="copy(endpoint.content, 'content')" class="mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          {{ copiedKey === 'content' ? '✓ Copied' : 'Copy Content' }}
        </button>
      </section>
    </div>
  </div>
  <div v-else class="flex items-center justify-center h-full text-gray-500 text-sm">
    Select an item to see details
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { DiscoveredEndpoint } from "../types.js";

const props = defineProps<{ endpoint: DiscoveredEndpoint | null }>();

const copiedKey = ref<string | null>(null);

// Mirror the backend's secretVariants(): the exact HMAC secret encodings the
// algorithm-confusion attack signs with, derived from each extracted public key.
function secretVariants(pem: string): Array<{ label: string; value: string }> {
  const norm = pem.replace(/\r\n/g, "\n");
  return [
    { label: "PEM", value: norm },
    { label: "PEM (no trailing LF)", value: norm.replace(/\n+$/, "") },
    { label: "base64(PEM)", value: btoa(norm) },
    { label: "DER (base64)", value: norm.replace(/-----[^-]+-----/g, "").replace(/\s/g, "") },
  ];
}

const keyDetails = computed(() =>
  (props.endpoint?.pems ?? []).map((pem) => ({ pem, variants: secretVariants(pem) }))
);

async function copy(text: string, key: string) {
  await navigator.clipboard.writeText(text);
  copiedKey.value = key;
  setTimeout(() => { copiedKey.value = null; }, 1500);
}
</script>
