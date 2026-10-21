import { PUBLIC_ROUTES } from "./src/config/publicRoutes.js";

const PRERENDER_PROOF_PATH = "/toldos-proteccion-solar";
const prerenderProofRoute = PUBLIC_ROUTES.find(
  ({ path }) => path === PRERENDER_PROOF_PATH
);

if (!prerenderProofRoute?.prerender) {
  throw new Error(
    `The React Router prerender proof route must be enabled in PUBLIC_ROUTES: ${PRERENDER_PROOF_PATH}`
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
  prerender: [prerenderProofRoute.path],
};
