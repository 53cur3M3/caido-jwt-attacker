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
    attackStore.startSession(sessionId, requestId);
    attackStore.setSessionTotal(sessionId, total);
    sdk.navigation.goTo("/jwt-attacker");
  });

  sdk.backend.onEvent("jwt-attack-result", ({ sessionId, result }) => {
    attackStore.addResult(sessionId, result);
  });

  sdk.backend.onEvent("jwt-attack-complete", ({ sessionId, errors }) => {
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
    run: async (_sdk, context) => {
      const requestIds: string[] = [];

      if (context.type === "RequestRowContext") {
        for (const req of context.requests) {
          requestIds.push(req.getId());
        }
      } else if (context.type === "RequestContext") {
        requestIds.push(context.request.getId());
      }

      for (const id of requestIds) {
        const config = configStore.config;
        await sdk.backend.call("attackJwt", id, config);
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
}
