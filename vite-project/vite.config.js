import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
});
