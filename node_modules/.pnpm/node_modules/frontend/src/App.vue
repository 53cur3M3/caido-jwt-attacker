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
          :selected-endpoint-url="selectedEndpoint?.url"
          :selected-spoof="!!selectedSpoof"
          :selected-recovery="selectedRecovery"
          @select="onSelectAttack"
          @select-endpoint="onSelectEndpoint"
          @select-spoof="onSelectSpoof"
          @select-recovery="onSelectRecovery"
        />
      </div>
      <div class="flex-1 overflow-hidden">
        <RecoveryDetail v-if="selectedRecovery" :session="attackStore.activeSession" />
        <SpoofDetail v-else-if="selectedSpoof" :spoof="selectedSpoof" />
        <EndpointDetail v-else-if="selectedEndpoint" :endpoint="selectedEndpoint" />
        <AttackDetail v-else :result="selectedResult ?? null" />
      </div>
    </div>

    <!-- Config tab -->
    <div v-show="activeTab === 'config'" class="flex-1 overflow-hidden">
      <ConfigPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AttackList from "./components/AttackList.vue";
import AttackDetail from "./components/AttackDetail.vue";
import EndpointDetail from "./components/EndpointDetail.vue";
import SpoofDetail from "./components/SpoofDetail.vue";
import RecoveryDetail from "./components/RecoveryDetail.vue";
import ConfigPanel from "./components/ConfigPanel.vue";
import { useAttackStore } from "./stores/attacks.js";
import type { AttackResult, DiscoveredEndpoint, SpoofInfo } from "./types.js";

const attackStore = useAttackStore();
const activeTab = ref("results");
const selectedResult = ref<AttackResult | null>(null);
const selectedEndpoint = ref<DiscoveredEndpoint | null>(null);
const selectedSpoof = ref<SpoofInfo | null>(null);
const selectedRecovery = ref(false);

function clearSelections() {
  selectedResult.value = null;
  selectedEndpoint.value = null;
  selectedSpoof.value = null;
  selectedRecovery.value = false;
}

function onSelectAttack(result: AttackResult) {
  clearSelections();
  selectedResult.value = result;
}

function onSelectEndpoint(endpoint: DiscoveredEndpoint) {
  clearSelections();
  selectedEndpoint.value = endpoint;
}

function onSelectSpoof(spoof: SpoofInfo) {
  clearSelections();
  selectedSpoof.value = spoof;
}

function onSelectRecovery() {
  clearSelections();
  selectedRecovery.value = true;
}

const tabs = [
  { id: "results", label: "Results" },
  { id: "config", label: "Configuration" },
];
</script>
