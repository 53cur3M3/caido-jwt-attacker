import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import { Classic as CaidoTheme } from "@caido/primevue";
import type { SDK } from "caido:plugin";
import type { API, BackendEvents } from "../../backend/src/index.js";

import App from "./App.vue";
import { useConfigStore } from "./stores/config.js";
import { useAttackStore } from "./stores/attacks.js";

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
  configStore.load();

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

  sdk.backend.onEvent("jwks-payload", ({ sessionId, jwksJson, privateKeyPem }) => {
    attackStore.setJWKSPayload(sessionId, jwksJson, privateKeyPem);
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
