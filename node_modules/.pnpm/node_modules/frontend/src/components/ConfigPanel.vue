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
        Host the JWKS JSON below at this URL so the target server can fetch the attacker's key.
      </p>

      <!-- JWKS document to host (matches the persisted spoofing key pair) -->
      <div class="mt-3">
        <div class="flex items-center justify-between mb-1">
          <label class="block text-gray-300">JWKS to host (<code>jwks.json</code>)</label>
          <div class="flex items-center gap-3">
            <button
              @click="copyJwks"
              class="text-xs text-gray-400 hover:text-blue-400 transition-colors"
            >{{ copiedJwks ? "✓ Copied" : "Copy" }}</button>
            <button
              @click="regenerate"
              :disabled="store.regenerating"
              class="text-xs text-gray-400 hover:text-blue-400 transition-colors disabled:opacity-50"
              title="Generate a new key pair and JWKS (invalidates the previously hosted one)"
            >{{ store.regenerating ? "Regenerating…" : "↻ Regenerate key pair" }}</button>
          </div>
        </div>
        <textarea
          :value="cfg.spoofJwksJson"
          readonly
          rows="10"
          placeholder="(generated automatically on first run)"
          class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-green-300 text-xs font-mono focus:outline-none resize-y"
        />
        <p class="text-xs text-gray-500 mt-1">
          Auto-generated and stored on install. The JKU/X5U spoofing attack signs tokens with the
          matching private key, so host this exact document. Use Regenerate to rotate the key pair —
          you must then re-host the new JWKS.
        </p>
      </div>
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
            Recovers the public key from 2+ same-host RS/PS JWTs (silentsignal rsa_sign2n method),
            then runs algorithm-confusion with it. Off by default. The GCD of two ~16&nbsp;MB integers
            (sig<sup>65537</sup>) is O(n²) in a JS runtime with no GMP, so for 2048-bit/e=65537 keys
            this can take a <strong>very long time</strong> (tens of minutes to hours) and blocks the
            backend while it runs. For fast results, run <code>rsa_sign2n</code> externally and paste
            the recovered key into the Public Key field above. e=3 keys recover quickly.
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
import type { PluginConfig } from "../types.js";

const store = useConfigStore();
// Deep-clone so the local form never shares nested objects (e.g. enabledAttacks)
// with the store. A shallow copy would let checkbox edits mutate the store and
// trigger the sync watch, which would clobber other unsaved fields (e.g. the
// JWKS Endpoint URL).
const clone = (c: PluginConfig): PluginConfig => JSON.parse(JSON.stringify(c));
const cfg = reactive(clone(store.config));
const saved = ref(false);
const copiedJwks = ref(false);

// Sync store → form only on genuine external store changes (load / regenerate /
// save), deep-cloning so refs stay independent.
watch(() => store.config, (v) => Object.assign(cfg, clone(v)), { deep: true });

function resetJwksPaths() {
  cfg.jwksPaths = [...DEFAULT_CONFIG.jwksPaths];
}

async function regenerate() {
  // Commit current form edits (incl. the JWKS Endpoint URL) to the store FIRST,
  // so regenerating the key pair doesn't wipe an unsaved URL via the sync watch.
  store.update({ ...cfg });
  await store.regenerateSpoofKeyPair();
  // store.config now holds the new key pair/JWKS; the watch above syncs `cfg`.
}

async function copyJwks() {
  if (!cfg.spoofJwksJson) return;
  await navigator.clipboard.writeText(cfg.spoofJwksJson);
  copiedJwks.value = true;
  setTimeout(() => { copiedJwks.value = false; }, 1500);
}

async function save() {
  store.update({ ...cfg });
  await store.save();
  saved.value = true;
  setTimeout(() => { saved.value = false; }, 2000);
}
</script>

<style scoped>
/* Caido's host styles override the Tailwind bg utility on form controls, leaving
   them white with low-contrast text. Force a dark-ish gray (matching the Caido
   left menu colour) with light text so the fields are readable. */
input:not([type="checkbox"]),
textarea {
  background-color: rgb(107 114 128) !important;
  color: #f9fafb !important;
}
input:not([type="checkbox"])::placeholder,
textarea::placeholder {
  color: #e5e7eb !important;
  opacity: 0.7;
}
</style>
