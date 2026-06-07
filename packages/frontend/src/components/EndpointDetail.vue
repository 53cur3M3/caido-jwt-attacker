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

      <!-- PEM-encoded keys -->
      <section v-if="endpoint.pems.length" class="px-4 py-3 border-b border-gray-700">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">
          PEM-encoded {{ endpoint.pems.length > 1 ? 'keys' : 'key' }}
        </p>
        <div v-for="(pem, i) in endpoint.pems" :key="i" class="mb-2 last:mb-0">
          <pre class="bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-48 overflow-y-auto select-all whitespace-pre">{{ pem }}</pre>
          <button @click="copy(pem, 'pem-' + i)" class="mt-1 text-xs text-gray-500 hover:text-gray-300 transition-colors">
            {{ copiedKey === 'pem-' + i ? '✓ Copied' : 'Copy PEM' }}
          </button>
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
import { ref } from "vue";
import type { DiscoveredEndpoint } from "../types.js";

defineProps<{ endpoint: DiscoveredEndpoint | null }>();

const copiedKey = ref<string | null>(null);

async function copy(text: string, key: string) {
  await navigator.clipboard.writeText(text);
  copiedKey.value = key;
  setTimeout(() => { copiedKey.value = null; }, 1500);
}
</script>
