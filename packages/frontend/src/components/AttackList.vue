<template>
  <div class="h-full flex flex-col overflow-hidden">
    <!-- Session selector + progress bar -->
    <div class="px-3 py-2 border-b border-gray-700 bg-gray-900 flex items-center gap-2">
      <select
        v-if="store.sessions.length > 1"
        :value="store.activeSessionId"
        @change="store.setActiveSession(($event.target as HTMLSelectElement).value)"
        class="text-xs bg-gray-800 border border-gray-600 rounded px-2 py-1 text-gray-300 flex-1 min-w-0"
      >
        <option v-for="s in store.sessions" :key="s.sessionId" :value="s.sessionId">
          Session {{ s.sessionId.slice(0, 6) }} — {{ s.results.length }}/{{ s.total }} ({{ new Date(s.startedAt).toLocaleTimeString() }})
        </option>
      </select>
      <span v-else class="text-xs text-gray-400 flex-1">
        <template v-if="session">
          {{ session.results.length }}/{{ session.total }} attacks
          <span v-if="!session.complete" class="ml-1 text-yellow-400 animate-pulse">running…</span>
          <span v-else class="ml-1 text-green-400">✓ complete</span>
        </template>
        <template v-else>No active session</template>
      </span>
      <button
        v-if="store.sessions.length"
        @click="store.clearSessions()"
        class="text-xs text-gray-500 hover:text-red-400 transition-colors"
      >Clear</button>
    </div>

    <!-- Progress bar -->
    <div v-if="session && !session.complete" class="h-1 bg-gray-800">
      <div
        class="h-1 bg-blue-500 transition-all duration-300"
        :style="{ width: session.total ? `${(session.results.length / session.total) * 100}%` : '0%' }"
      />
    </div>

    <!-- Key recovery log -->
    <div v-if="session?.keyRecoveryLog.length" class="px-3 py-1.5 bg-yellow-950 border-b border-yellow-800 text-xs text-yellow-300 max-h-16 overflow-y-auto">
      <p v-for="(msg, i) in session.keyRecoveryLog" :key="i">{{ msg }}</p>
    </div>

    <!-- Recovered keys notice -->
    <div v-if="session?.recoveredKeys.length" class="px-3 py-1.5 bg-green-950 border-b border-green-800 text-xs text-green-300">
      ✓ Recovered {{ session.recoveredKeys.length }} public key(s) from HTTP history
    </div>

    <!-- JWKS info -->
    <div v-if="session?.jwksJson" class="px-3 py-1.5 bg-purple-950 border-b border-purple-800 text-xs text-purple-300 cursor-pointer hover:bg-purple-900" @click="emit('showJwks', session)">
      ℹ JKU/X5U spoofing — click to view JWKS payload to host
    </div>

    <!-- Filter tabs -->
    <div class="flex gap-1 px-2 py-1.5 border-b border-gray-700 overflow-x-auto shrink-0">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeFilter = tab.key"
        :class="['px-2 py-0.5 rounded text-xs font-medium transition-colors whitespace-nowrap',
          activeFilter === tab.key
            ? 'bg-blue-700 text-white'
            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700']"
      >
        {{ tab.label }} ({{ tab.count }})
      </button>
    </div>

    <!-- Results list -->
    <div class="flex-1 overflow-y-auto">
      <div v-if="!session || filteredResults.length === 0" class="flex items-center justify-center h-full text-gray-500 text-sm py-8">
        <template v-if="!session">Right-click a request with a JWT and select "Attack JWT"</template>
        <template v-else>No results yet…</template>
      </div>
      <div
        v-for="result in filteredResults"
        :key="result.id"
        @click="emit('select', result)"
        :class="['px-3 py-2 border-b border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors',
          selectedId === result.id ? 'bg-gray-800 border-l-2 border-l-blue-500' : '']"
      >
        <div class="flex items-center gap-2 min-w-0">
          <span :class="['px-1.5 py-0.5 rounded text-xs font-mono shrink-0', techniqueColor(result.technique)]">
            {{ result.technique }}
          </span>
          <span class="text-xs text-gray-200 truncate flex-1">{{ result.techniqueName }}</span>
          <span v-if="result.responseStatus" :class="['text-xs font-mono font-bold shrink-0', statusColor(result.responseStatus)]">
            {{ result.responseStatus }}
          </span>
          <span v-else-if="result.error" class="text-xs text-red-500 shrink-0">ERR</span>
          <span v-else class="text-xs text-gray-600 shrink-0 animate-pulse">…</span>
        </div>
        <p class="text-xs text-gray-500 mt-0.5 truncate pl-0.5">{{ result.description.slice(0, 80) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAttackStore } from "../stores/attacks.js";
import type { AttackResult, AttackSession } from "../types.js";
import { techniqueColor, statusColor } from "../types.js";

defineProps<{ selectedId?: string }>();
const emit = defineEmits<{
  (e: "select", result: AttackResult): void;
  (e: "showJwks", session: AttackSession): void;
}>();

const store = useAttackStore();
const activeFilter = ref("all");

const session = computed(() => store.activeSession);

const tabs = computed(() => {
  const results = session.value?.results ?? [];
  const successful = results.filter((r) => r.responseStatus && r.responseStatus < 300).length;
  const clientErr = results.filter((r) => r.responseStatus && r.responseStatus >= 400 && r.responseStatus < 500).length;
  const serverErr = results.filter((r) => r.responseStatus && r.responseStatus >= 500).length;
  const errors = results.filter((r) => r.error).length;
  return [
    { key: "all", label: "All", count: results.length },
    { key: "2xx", label: "2xx", count: successful },
    { key: "4xx", label: "4xx", count: clientErr },
    { key: "5xx", label: "5xx", count: serverErr },
    { key: "err", label: "Errors", count: errors },
  ];
});

const filteredResults = computed(() => {
  const results = session.value?.results ?? [];
  switch (activeFilter.value) {
    case "2xx": return results.filter((r) => r.responseStatus && r.responseStatus < 300);
    case "4xx": return results.filter((r) => r.responseStatus && r.responseStatus >= 400 && r.responseStatus < 500);
    case "5xx": return results.filter((r) => r.responseStatus && r.responseStatus >= 500);
    case "err": return results.filter((r) => r.error);
    default: return results;
  }
});
</script>
