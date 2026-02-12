import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function deferViteCssPlugin() {
  return {
    name: "defer-vite-css",
    apply: "build",
    transformIndexHtml(html) {
      // Convert the main Vite CSS link into preload+onload (non-blocking)
      // Works with typical Vite output patterns.
      const replaced = html.replace(
        /<link([^>]*?)rel="stylesheet"([^>]*?)href="([^"]+\/assets\/index-[^"]+\.css)"([^>]*?)>/,
        `<link$1rel="preload"$2href="$3"$4 as="style" onload="this.onload=null;this.rel='stylesheet'">` +
          `\n<noscript><link$1rel="stylesheet"$2href="$3"$4></noscript>`
      );
      return replaced;
    },
  };
}

export default defineConfig({
  plugins: [react(), deferViteCssPlugin()],
  server: {
    host: true,
    port: 5173,
  },
});
