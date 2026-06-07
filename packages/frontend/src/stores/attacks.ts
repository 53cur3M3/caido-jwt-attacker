import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { AttackSession } from "../types.js";

export const useAttackStore = defineStore("attacks", () => {
  const sessions = ref<AttackSession[]>([]);
  const activeSessionId = ref<string | null>(null);

  const activeSession = computed(() =>
    sessions.value.find((s) => s.sessionId === activeSessionId.value) ?? sessions.value[0] ?? null
  );

  function startSession(sessionId: string, requestId: string) {
    const session: AttackSession = {
      sessionId,
      requestId,
      startedAt: Date.now(),
      results: [],
      total: 0,
      complete: false,
      errors: [],
      recoveredKeys: [],
      keyRecoveryLog: [],
    };
    sessions.value.unshift(session);
    activeSessionId.value = sessionId;
  }

  function setSessionTotal(sessionId: string, total: number) {
    const s = sessions.value.find((x) => x.sessionId === sessionId);
    if (s) s.total = total;
  }

  function addResult(sessionId: string, result: AttackSession["results"][number]) {
    const s = sessions.value.find((x) => x.sessionId === sessionId);
    if (s) s.results.push(result);
  }

  function completeSession(sessionId: string, errors: string[]) {
    const s = sessions.value.find((x) => x.sessionId === sessionId);
    if (s) {
      s.complete = true;
      s.errors.push(...errors);
    }
  }

  function addRecoveredKey(sessionId: string, key: string) {
    const s = sessions.value.find((x) => x.sessionId === sessionId);
    if (s && !s.recoveredKeys.includes(key)) s.recoveredKeys.push(key);
  }

  function logKeyRecovery(sessionId: string, message: string) {
    const s = sessions.value.find((x) => x.sessionId === sessionId);
    if (s) s.keyRecoveryLog.push(message);
  }

  function setJWKSPayload(sessionId: string, jwksJson: string, jwksPrivateKey: string) {
    const s = sessions.value.find((x) => x.sessionId === sessionId);
    if (s) {
      s.jwksJson = jwksJson;
      s.jwksPrivateKey = jwksPrivateKey;
    }
  }

  function setActiveSession(sessionId: string) {
    activeSessionId.value = sessionId;
  }

  function clearSessions() {
    sessions.value = [];
    activeSessionId.value = null;
  }

  return {
    sessions,
    activeSessionId,
    activeSession,
    startSession,
    setSessionTotal,
    addResult,
    completeSession,
    addRecoveredKey,
    logKeyRecovery,
    setJWKSPayload,
    setActiveSession,
    clearSessions,
  };
});
