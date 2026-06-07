import { defineStore } from "pinia";
import { ref } from "vue";
import type { PluginConfig } from "../types.js";
import { DEFAULT_CONFIG } from "../types.js";

export const useConfigStore = defineStore("config", () => {
  const config = ref<PluginConfig>({ ...DEFAULT_CONFIG });
  let sdk: { storage: { get: (k: string) => Promise<unknown>; set: (k: string, v: unknown) => Promise<void> } } | null = null;

  function setSDK(s: typeof sdk) {
    sdk = s;
  }

  async function load() {
    if (!sdk) return;
    try {
      const saved = await sdk.storage.get("config");
      if (saved && typeof saved === "object") {
        config.value = { ...DEFAULT_CONFIG, ...(saved as PluginConfig) };
      }
    } catch { /* ignore */ }
  }

  async function save() {
    if (!sdk) return;
    try {
      await sdk.storage.set("config", config.value);
    } catch { /* ignore */ }
  }

  function update(partial: Partial<PluginConfig>) {
    config.value = { ...config.value, ...partial };
  }

  return { config, setSDK, load, save, update };
});
