import { defineStore } from "pinia";
import { ref } from "vue";
import type { PluginConfig } from "../types.js";
import { DEFAULT_CONFIG } from "../types.js";

interface ConfigSDK {
  storage: { get: (k: string) => Promise<unknown>; set: (k: string, v: unknown) => Promise<void> };
  backend: {
    generateSpoofKeyPair: () => Promise<{ privateKeyPem: string; jwksJson: string }>;
    netSelfTest: () => Promise<{ message: string }>;
  };
}

export const useConfigStore = defineStore("config", () => {
  const config = ref<PluginConfig>({ ...DEFAULT_CONFIG });
  const regenerating = ref(false);
  let sdk: ConfigSDK | null = null;

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

  // Generate (or replace) the persisted JKU/X5U spoofing key pair + its JWKS.
  async function regenerateSpoofKeyPair() {
    if (!sdk || regenerating.value) return;
    regenerating.value = true;
    try {
      const { privateKeyPem, jwksJson } = await sdk.backend.generateSpoofKeyPair();
      config.value = { ...config.value, spoofPrivateKeyPem: privateKeyPem, spoofJwksJson: jwksJson };
      await save();
    } finally {
      regenerating.value = false;
    }
  }

  // Generate the spoofing key pair once, on first run (when none is stored yet).
  async function ensureSpoofKeyPair() {
    if (!sdk) return;
    if (config.value.spoofPrivateKeyPem && config.value.spoofJwksJson) return;
    await regenerateSpoofKeyPair();
  }

  async function netSelfTest() {
    if (!sdk) return { message: "SDK not ready." };
    return sdk.backend.netSelfTest();
  }

  return { config, regenerating, setSDK, load, save, update, regenerateSpoofKeyPair, ensureSpoofKeyPair, netSelfTest };
});
