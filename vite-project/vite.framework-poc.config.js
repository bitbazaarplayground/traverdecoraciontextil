import { reactRouter } from "@react-router/dev/vite";
import { transformAsync } from "@babel/core";
import { defineConfig } from "vite";

/**
 * React Router Framework Mode already supplies the React JSX and Fast Refresh
 * transforms. The normal @vitejs/plugin-react cannot also be registered here:
 * both plugins inject a `RefreshRuntime` binding in development.
 *
 * Keep only the styled-components Babel transform that is required for stable
 * server/client component IDs during Framework prerendering and hydration.
 */
function frameworkStyledComponents() {
  return {
    name: "framework-styled-components",
    enforce: "pre",
    async transform(code, id) {
      const filename = id.split("?", 1)[0];

      if (
        filename.includes("/node_modules/") ||
        !/\.[cm]?[jt]sx?$/.test(filename)
      ) {
        return null;
      }

      const result = await transformAsync(code, {
        babelrc: false,
        configFile: false,
        filename,
        sourceMaps: true,
        plugins: [["babel-plugin-styled-components", { ssr: true }]],
      });

      return result
        ? { code: result.code, map: result.map ?? null }
        : null;
    },
  };
}

/**
 * Kept separate from vite.config.js so the normal development and production
 * build paths remain unchanged while the Framework Mode proof is reviewed.
 */
export default defineConfig({
  plugins: [
    frameworkStyledComponents(),
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
