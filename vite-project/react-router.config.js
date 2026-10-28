import { PUBLIC_ROUTES } from "./src/config/publicRoutes.js";

const PRERENDER_PROOF_PATHS = [
  "/",
  "/cortinas-estores",
  "/toldos-proteccion-solar",
  "/services",
  "/panel-japones",
  "/venecianas",
  "/limpieza",
  "/mosquiteras",
  "/automatizacion",
  "/automatizacion/completa",
  "/automatizacion/individual",
  "/propuestas",
  "/nosotros",
  "/contact",
  "/aviso-legal",
  "/politica-privacidad",
  "/politica-cookies",
];
const prerenderProofRoutes = PRERENDER_PROOF_PATHS.map((path) =>
  PUBLIC_ROUTES.find((route) => route.path === path)
);

const disabledPrerenderPath = prerenderProofRoutes.find(
  (route) => !route?.prerender
);

if (disabledPrerenderPath) {
  throw new Error(
    `The React Router prerender proof route must be enabled in PUBLIC_ROUTES: ${disabledPrerenderPath?.path || "missing route"}`
  );
}

/**
 * Development-only Framework Mode proof of concept.
 *
 * The regular Vite build continues to use vite.config.js and dist/. This
 * configuration writes to a separate directory so it cannot replace the
 * production Netlify build output by accident.
 */
export default {
  appDirectory: "src",
  buildDirectory: "build-framework-poc",
  ssr: false,
  prerender: prerenderProofRoutes.map(({ path }) => path),
};
