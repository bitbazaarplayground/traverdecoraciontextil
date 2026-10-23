import { reactRouter } from "@react-router/dev/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * Kept separate from vite.config.js so the normal development and production
 * build paths remain unchanged while the Framework Mode proof is reviewed.
 */
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-styled-components", { ssr: true }]],
      },
    }),
    reactRouter(),
  ],
  ssr: {
    // react-helmet-async is CommonJS. Bundle it for the Framework server build
    // so existing named Helmet imports remain compatible during prerendering.
    noExternal: ["react-helmet-async", "styled-components"],
  },
  server: {
    host: true,
    port: 5174,
  },
});
