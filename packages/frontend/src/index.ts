import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import { Classic as CaidoTheme } from "@caido/primevue";
import type { SDK } from "caido:plugin";
import type { API, BackendEvents } from "../../backend/src/index.js";

import App from "./App.vue";
import { useConfigStore } from "./stores/config.js";
import { useAttackStore } from "./stores/attacks.js";
import { recoverFromCandidates } from "./recovery/recover.js";

export type CaidoSDK = SDK<API, BackendEvents>;

export function init(sdk: CaidoSDK) {
  console.log("[JWT Attacker] init() called");

  // ─── Mount Vue app ──────────────────────────────────────────────────────
  const app = createApp(App);
  const pinia = createPinia();
  app.use(pinia);
  app.use(PrimeVue, { unstyled: true, pt: CaidoTheme });

  const root = document.createElement("div");
  root.id = "plugin--jwt-attacker-root";
  root.style.cssText = "height:100%;width:100%;overflow:hidden;";
  app.mount(root);

  // ─── Register page & sidebar ────────────────────────────────────────────
  sdk.navigation.addPage("/jwt-attacker", { body: root });
  sdk.sidebar.registerItem("JWT Attacker", "/jwt-attacker", { icon: "fas fa-key" });

  // ─── Load config from storage ───────────────────────────────────────────
  const configStore = useConfigStore();
  configStore.setSDK(sdk as unknown as Parameters<typeof configStore.setSDK>[0]);
  // Load config, then ensure a persisted spoofing key pair exists (generated
  // once on first run via the backend).
  configStore.load().then(() => configStore.ensureSpoofKeyPair());

  // ─── Wire up backend events ─────────────────────────────────────────────
  const attackStore = useAttackStore();

  sdk.backend.onEvent("jwt-attack-started", ({ sessionId, requestId, total }) => {
    console.log("[JWT Attacker] event: jwt-attack-started", { sessionId, requestId, total });
    attackStore.startSession(sessionId, requestId, total);
    sdk.navigation.goTo("/jwt-attacker");
  });

  sdk.backend.onEvent("jwt-attack-result", ({ sessionId, result }) => {
    attackStore.addResult(sessionId, result);
  });

  sdk.backend.onEvent("jwt-attack-complete", ({ sessionId, errors }) => {
    console.log("[JWT Attacker] event: jwt-attack-complete", { sessionId, errors });
    attackStore.completeSession(sessionId, errors);
  });

  sdk.backend.onEvent("jwt-key-recovery-progress", ({ sessionId, message }) => {
    attackStore.logKeyRecovery(sessionId, message);
  });

  sdk.backend.onEvent("jwt-key-recovery-complete", ({ sessionId, keys }) => {
    for (const key of keys) attackStore.addRecoveredKey(sessionId, key);
  });

  sdk.backend.onEvent("jwks-spoof", ({ sessionId, ...spoof }) => {
    attackStore.setSpoof(sessionId, spoof);
  });

  sdk.backend.onEvent("jwks-found", ({ sessionId, url, source, keyCount, content, pems }) => {
    attackStore.addDiscoveredEndpoint(sessionId, { url, source, keyCount, content, pems });
  });

  sdk.backend.onEvent("jwt-iss-discovery", ({ sessionId, ...info }) => {
    attackStore.setIssDiscovery(sessionId, info);
  });

  // Backend has no WebAssembly, so RSA key recovery runs HERE (gmp-wasm in a Web
  // Worker). On success, hand the modulus back to the backend to launch the
  // algorithm-confusion attack with it.
  sdk.backend.onEvent("jwt-recovery-candidates", async ({ sessionId, requestId, originalJWT, tlsModulusHex, candidates }) => {
    const log = (m: string) => attackStore.logKeyRecovery(sessionId, m);
    // Store the full candidate tokens so the recovery detail pane can show them.
    attackStore.setRecoveryCandidates(
      sessionId,
      candidates.map((c) => `${c.headerB64}.${c.payloadB64}.${c.signatureB64}`),
      originalJWT
    );
    try {
      log(`Frontend gmp-wasm recovery: ${candidates.length} candidate JWT(s). This runs in a background worker…`);
      const keys = await recoverFromCandidates(candidates, log);
      if (keys.length) {
        log("Recovered public key — launching algorithm-confusion attacks with it.");
        for (const key of keys) attackStore.addRecoveredKey(sessionId, `${key.bits}-bit modulus (e=${key.e})`);
        // Pass baseline + signature-validation context so the backend can raise a
        // finding when a forged (recovered-key) token is accepted.
        const sess = attackStore.sessions.find((x) => x.sessionId === sessionId);
        const baseline = sess?.results.find((r) => r.technique === "baseline");
        const invalidSig = sess?.results.find((r) => r.technique === "invalidSig");
        const res = await sdk.backend.runRecoveredConfusion(
          requestId,
          keys.map((k) => ({ nHex: k.nHex, e: k.e })),
          sessionId,
          {
            baselineStatus: baseline?.responseStatus,
            baselineLength: baseline?.responseLength,
            // Server enforces signatures if the invalid-sig probe differed from baseline.
            sigValidated: !!invalidSig && invalidSig.responseStatus !== undefined && !invalidSig.signatureNotValidated,
            candidateJwts: candidates.map((c) => `${c.headerB64}.${c.payloadB64}.${c.signatureB64}`),
            tlsModulusHex,
          }
        );
        // Store recovered key PEM(s) for the detail pane / jwt_tool repro.
        const pems = res?.pems ?? [];
        attackStore.setRecoveredKeys(
          sessionId,
          keys.map((k, i) => ({ pem: pems[i] ?? "", bits: k.bits, e: k.e }))
        );
        log(`Sent ${res?.count ?? 0} confusion attack(s) using the recovered key.`);
      }
    } catch (e) {
      log(`Recovery error: ${(e as Error).message}`);
    }
  });

  // ─── Register context menu commands ─────────────────────────────────────
  sdk.commands.register("jwt-attacker.attack", {
    name: "Attack JWT",
    group: "JWT Attacker",
    run: async (context) => {
      console.log("[JWT Attacker] run() called, context.type =", context.type);

      const requestIds: string[] = [];

      if (context.type === "RequestRowContext") {
        for (const req of context.requests) {
          requestIds.push(req.id);
        }
      } else if (context.type === "RequestContext") {
        const req = context.request;
        if ("id" in req && req.id) requestIds.push(req.id as string);
      }

      console.log("[JWT Attacker] requestIds:", requestIds);

      if (requestIds.length === 0) {
        console.warn("[JWT Attacker] No request IDs found in context");
        return;
      }

      // Make sure the persisted spoofing key pair (matching the hosted jwks.json)
      // exists before attacking, so JKU/X5U spoofing always signs with it.
      await configStore.ensureSpoofKeyPair();

      // Deep-clone to a plain object — the raw Pinia/Vue reactive proxy does not
      // always survive Caido's structured-clone RPC boundary intact (nested
      // `enabledAttacks` can arrive empty), which would build zero attacks.
      const plainConfig = JSON.parse(JSON.stringify(configStore.config));
      console.log("[JWT Attacker] config being sent:", plainConfig);

      for (const id of requestIds) {
        console.log("[JWT Attacker] calling backend attackJwt for id:", id);
        try {
          const result = await sdk.backend.attackJwt(id, plainConfig);
          console.log("[JWT Attacker] backend call returned:", result);
        } catch (e) {
          console.error("[JWT Attacker] backend call failed:", e);
        }
      }
    },
  });

  // Register in HTTP History and Replay panes
  sdk.menu.registerItem({
    type: "RequestRow",
    commandId: "jwt-attacker.attack",
    leadingIcon: "fas fa-key",
  });

  sdk.menu.registerItem({
    type: "Request",
    commandId: "jwt-attacker.attack",
    leadingIcon: "fas fa-key",
  });

  console.log("[JWT Attacker] init() complete — commands and menu items registered");
}
