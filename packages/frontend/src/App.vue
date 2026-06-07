<template>
  <div id="plugin--jwt-attacker" class="h-full flex flex-col bg-gray-950 text-gray-200 overflow-hidden">
    <!-- Top bar -->
    <div class="flex items-center gap-1 px-3 py-2 border-b border-gray-700 bg-gray-900 shrink-0">
      <span class="text-base font-bold text-yellow-400 mr-2">🔑 JWT Attacker</span>
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="['px-3 py-1 rounded text-xs font-medium transition-colors',
          activeTab === tab.id
            ? 'bg-gray-700 text-white'
            : 'text-gray-400 hover:text-gray-200']"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Results tab: split pane -->
    <div v-show="activeTab === 'results'" class="flex-1 flex overflow-hidden min-h-0">
      <div class="w-[42%] shrink-0 border-r border-gray-700 overflow-hidden flex flex-col">
        <AttackList
          :selected-id="selectedResult?.id"
          @select="selectedResult = $event"
          @show-jwks="showJwks = $event"
        />
      </div>
      <div class="flex-1 overflow-hidden">
        <AttackDetail :result="selectedResult ?? null" />
      </div>
    </div>

    <!-- Config tab -->
    <div v-show="activeTab === 'config'" class="flex-1 overflow-hidden">
      <ConfigPanel />
    </div>

    <!-- JWKS modal -->
    <div
      v-if="showJwks"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6"
      @click.self="showJwks = null"
    >
      <div class="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h2 class="text-sm font-semibold">JKU/X5U Spoofing — JWKS Payload</h2>
          <button @click="showJwks = null" class="text-gray-500 hover:text-gray-300 text-lg leading-none">✕</button>
        </div>
        <div class="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <div>
            <p class="text-xs text-gray-400 mb-2">
              Host this JSON at your configured JWKS URL so the server can fetch the attacker's public key.
            </p>
            <pre class="bg-gray-800 rounded p-3 text-xs text-green-300 overflow-x-auto select-all max-h-48">{{ showJwks.jwksJson }}</pre>
            <button @click="copy(showJwks!.jwksJson!)" class="mt-1 text-xs text-gray-500 hover:text-gray-300">Copy JWKS</button>
          </div>
          <div v-if="showJwks.jwksPrivateKey">
            <p class="text-xs text-gray-400 mb-2">Private key used to sign the spoofed tokens:</p>
            <pre class="bg-gray-800 rounded p-3 text-xs text-yellow-300 overflow-x-auto select-all max-h-36">{{ showJwks.jwksPrivateKey }}</pre>
            <button @click="copy(showJwks!.jwksPrivateKey!)" class="mt-1 text-xs text-gray-500 hover:text-gray-300">Copy Private Key</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AttackList from "./components/AttackList.vue";
import AttackDetail from "./components/AttackDetail.vue";
import ConfigPanel from "./components/ConfigPanel.vue";
import type { AttackResult, AttackSession } from "./types.js";

const activeTab = ref("results");
const selectedResult = ref<AttackResult | null>(null);
const showJwks = ref<AttackSession | null>(null);

const tabs = [
  { id: "results", label: "Results" },
  { id: "config", label: "Configuration" },
];

async function copy(text: string) {
  await navigator.clipboard.writeText(text);
}
</script>
