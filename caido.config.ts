import { defineConfig } from "@caido-community/dev";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  id: "jwt-attacker",
  name: "JWT Attacker",
  description: "Automated JWT security testing — native implementation of the full JWT attack playbook",
  version: "1.0.0",
  author: {
    name: "Security Researcher",
  },
  plugins: [
    {
      kind: "frontend",
      id: "frontend",
      name: "JWT Attacker Frontend",
      root: "packages/frontend",
      backend: { id: "backend" },
      vite: {
        plugins: [vue()],
        css: {
          postcss: {
            plugins: [
              tailwindcss({
                config: {
                  content: ["./packages/frontend/src/**/*.{vue,ts}"],
                  prefix: "",
                  corePlugins: { preflight: false },
                  plugins: [],
                },
              }),
              autoprefixer(),
            ],
          },
        },
      },
    },
    {
      kind: "backend",
      id: "backend",
      name: "JWT Attacker Backend",
      root: "packages/backend",
    },
  ],
});
