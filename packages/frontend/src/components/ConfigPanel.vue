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
      <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Additional JWKS Paths</h2>
      <textarea
        :value="cfg.extraJwksPaths.join('\n')"
        @input="cfg.extraJwksPaths = ($event.target as HTMLTextAreaElement).value.split('\n').map(s => s.trim()).filter(Boolean)"
        rows="4"
        placeholder="/custom/.well-known/jwks.json&#10;/api/v2/auth/keys"
        class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
      />
      <p class="text-xs text-gray-500 mt-1">One path per line. Probed in addition to the built-in list of 15 common paths.</p>
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
import { ATTACK_LABELS } from "../types.js";

const store = useConfigStore();
const cfg = reactive({ ...store.config });
const saved = ref(false);

watch(() => store.config, (v) => Object.assign(cfg, v), { deep: true });

async function save() {
  store.update({ ...cfg });
  await store.save();
  saved.value = true;
  setTimeout(() => { saved.value = false; }, 2000);
}
</script>
