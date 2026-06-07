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
      <section v-if="result.responseBody" class="px-4 py-3">
        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Response Body</p>
        <pre class="bg-gray-900 rounded p-2 text-xs text-gray-300 overflow-x-auto max-h-64 overflow-y-auto whitespace-pre-wrap break-all">{{ result.responseBody }}</pre>
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
</script>
