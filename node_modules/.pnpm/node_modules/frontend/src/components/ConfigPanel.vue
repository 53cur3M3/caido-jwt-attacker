<template>
  <div class="h-full overflow-y-auto px-4 py-4 space-y-6 text-sm">
    <section>
      <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">JKU / X5U Spoofing</h2>
      <label class="block mb-1 text-gray-300">JWKS Endpoint URL</label>
      <input
        v-model="cfg.jwksUrl"
        type="url"
        placeholder="https://attacker.example.com/jwks.json"
        class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500"
      />
      <p class="text-xs text-gray-500 mt-1">
        Host the generated JWKS JSON at this URL so the target server can fetch it.
      </p>
    </section>

    <section>
      <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Custom Keys / Certificate</h2>
      <div class="space-y-3">
        <div>
          <label class="block mb-1 text-gray-300">Public Key (PEM)</label>
          <textarea
            v-model="cfg.customPublicKeyPem"
            rows="4"
            placeholder="-----BEGIN PUBLIC KEY-----&#10;..."
            class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>
        <div>
          <label class="block mb-1 text-gray-300">Private Key (PEM) — for JKU/X5U spoofing</label>
          <textarea
            v-model="cfg.customPrivateKeyPem"
            rows="4"
            placeholder="-----BEGIN PRIVATE KEY-----&#10;..."
            class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>
        <div>
          <label class="block mb-1 text-gray-300">Certificate (PEM) — for algorithm confusion</label>
          <textarea
            v-model="cfg.customCertPem"
            rows="4"
            placeholder="-----BEGIN CERTIFICATE-----&#10;..."
            class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>
      </div>
    </section>

    <section>
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">JWKS Discovery Paths</h2>
        <button
          @click="resetJwksPaths"
          class="text-xs text-gray-400 hover:text-blue-400 transition-colors"
          title="Restore the built-in default JWKS path list"
        >↺ Reset to defaults</button>
      </div>
      <textarea
        :value="cfg.jwksPaths.join('\n')"
        @input="cfg.jwksPaths = ($event.target as HTMLTextAreaElement).value.split('\n').map(s => s.trim()).filter(Boolean)"
        rows="10"
        placeholder="/.well-known/jwks.json&#10;/jwks.json"
        class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-y"
      />
      <p class="text-xs text-gray-500 mt-1">
        One path per line. These are the exact paths probed on the target host for a JWKS.
        Edit freely — use Reset to restore the built-in defaults ({{ DEFAULT_CONFIG.jwksPaths.length }} paths).
      </p>
    </section>

    <section>
      <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Custom Wordlist (Weak Secret)</h2>
      <textarea
        :value="cfg.customWordlist.join('\n')"
        @input="cfg.customWordlist = ($event.target as HTMLTextAreaElement).value.split('\n').map(s => s.trim()).filter(Boolean)"
        rows="4"
        placeholder="mysecret&#10;appkey123"
        class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
      />
      <p class="text-xs text-gray-500 mt-1">One word per line. Appended to the built-in list of ~120 common JWT secrets.</p>
    </section>

    <section>
      <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Enabled Attacks</h2>
      <div class="space-y-2">
        <label
          v-for="(label, key) in ATTACK_LABELS"
          :key="key"
          class="flex items-center gap-2 cursor-pointer select-none"
        >
          <input
            type="checkbox"
            :checked="cfg.enabledAttacks[key] ?? true"
            @change="cfg.enabledAttacks[key] = ($event.target as HTMLInputElement).checked"
            class="accent-blue-500"
          />
          <span class="text-gray-300">{{ label }}</span>
        </label>
      </div>
    </section>

    <section>
      <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Experimental</h2>
      <label class="flex items-start gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          v-model="cfg.enableKeyRecovery"
          class="accent-blue-500 mt-0.5"
        />
        <span class="text-gray-300">
          RSA public-key recovery from HTTP history
          <span class="block text-xs text-gray-500 mt-0.5">
            Attempts to recover the signing key from 2+ same-host RS/PS JWTs, then runs
            algorithm-confusion with it. Off by default — the math (sig<sup>65537</sup>) is
            extremely slow in Caido's JS runtime and may take many minutes or not finish.
          </span>
        </span>
      </label>
    </section>

    <div class="pt-2 flex gap-3">
      <button
        @click="save"
        class="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors"
      >
        Save
      </button>
      <span v-if="saved" class="text-xs text-green-400 self-center">✓ Saved</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useConfigStore } from "../stores/config.js";
import { ATTACK_LABELS, DEFAULT_CONFIG } from "../types.js";

const store = useConfigStore();
const cfg = reactive({ ...store.config });
const saved = ref(false);

watch(() => store.config, (v) => Object.assign(cfg, v), { deep: true });

function resetJwksPaths() {
  cfg.jwksPaths = [...DEFAULT_CONFIG.jwksPaths];
}

async function save() {
  store.update({ ...cfg });
  await store.save();
  saved.value = true;
  setTimeout(() => { saved.value = false; }, 2000);
}
</script>
