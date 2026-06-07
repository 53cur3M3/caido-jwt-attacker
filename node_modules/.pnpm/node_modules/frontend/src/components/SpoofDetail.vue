<template>
  <div v-if="spoof" class="h-full flex flex-col overflow-hidden text-sm">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-gray-700 bg-gray-900 flex items-start gap-3">
      <span :class="['px-2 py-0.5 rounded text-xs font-mono font-semibold shrink-0', statusBadge.cls]">
        {{ statusBadge.label }}
      </span>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-gray-100">JKU / X5U Spoofing</p>
        <p class="text-gray-400 text-xs mt-0.5">{{ spoof.verifyMessage }}</p>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto">
      <!-- Status summary -->
      <section class="px-4 py-3 border-b border-gray-700 space-y-1.5">
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-500 w-40 shrink-0">Endpoint check</span>
          <span :class="['text-xs font-medium', statusBadge.textCls]">{{ statusBadge.detail }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-500 w-40 shrink-0">Token self-verification</span>
          <span :class="['text-xs font-medium', spoof.selfVerified ? 'text-green-400' : 'text-red-400']">
            {{ spoof.selfVerified ? '✓ Signed token validates against this JWKS' : '✗ Signed token did NOT validate' }}
          </span>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-xs text-gray-500 w-40 shrink-0">JWKS Endpoint URL</span>
          <span class="text-xs font-mono text-cyan-300 break-all">{{ spoof.url }}</span>
        </div>
      </section>

      <!-- JWKS to host -->
      <section class="px-4 py-3 border-b border-gray-700">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">JWKS to host (at the URL above)</p>
        <pre class="bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-56 overflow-y-auto select-all whitespace-pre">{{ spoof.jwksJson }}</pre>
        <button @click="copy(spoof.jwksJson, 'jwks')" class="mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          {{ copied === 'jwks' ? '✓ Copied' : 'Copy JWKS' }}
        </button>
      </section>

      <!-- Content actually fetched from the URL -->
      <section v-if="spoof.fetchedContent" class="px-4 py-3 border-b border-gray-700">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Content returned by the URL</p>
        <pre class="bg-gray-900 rounded p-2 text-xs text-gray-300 overflow-x-auto max-h-56 overflow-y-auto whitespace-pre-wrap break-all">{{ spoof.fetchedContent }}</pre>
        <button @click="copy(spoof.fetchedContent, 'fetched')" class="mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          {{ copied === 'fetched' ? '✓ Copied' : 'Copy' }}
        </button>
      </section>

      <!-- Signing private key -->
      <section class="px-4 py-3">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Signing private key (spoofing key pair)</p>
        <pre class="bg-gray-900 rounded p-2 text-xs text-yellow-300 overflow-x-auto max-h-40 overflow-y-auto select-all whitespace-pre">{{ spoof.privateKeyPem }}</pre>
        <button @click="copy(spoof.privateKeyPem, 'key')" class="mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          {{ copied === 'key' ? '✓ Copied' : 'Copy private key' }}
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
import type { SpoofInfo } from "../types.js";

const props = defineProps<{ spoof: SpoofInfo | null }>();

const copied = ref<string | null>(null);

const statusBadge = computed(() => {
  switch (props.spoof?.verifyStatus) {
    case "verified":
      return { label: "✓ Verified", cls: "bg-green-800 text-green-100", textCls: "text-green-400", detail: "Hosted JWKS matches the spoofing key" };
    case "mismatch":
      return { label: "✗ Mismatch", cls: "bg-red-900 text-red-100", textCls: "text-red-400", detail: "Hosted JWKS does NOT match — re-host it" };
    case "unreachable":
      return { label: "⚠ Unreachable", cls: "bg-orange-900 text-orange-100", textCls: "text-orange-400", detail: "Could not fetch the JWKS URL" };
    default:
      return { label: "⚠ No URL", cls: "bg-gray-700 text-gray-200", textCls: "text-gray-400", detail: "No JWKS Endpoint URL configured" };
  }
});

async function copy(text: string, key: string) {
  await navigator.clipboard.writeText(text);
  copied.value = key;
  setTimeout(() => { copied.value = null; }, 1500);
}
</script>
