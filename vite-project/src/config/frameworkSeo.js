import {
  getCortinasMetaDescriptors,
  CORTINAS_SEO,
} from "./cortinasSeo.js";
import { getHomeMetaDescriptors, HOME_SEO } from "./homeSeo.js";
import {
  getServicesMetaDescriptors,
  SERVICES_SEO,
} from "./servicesSeo.js";
import { getToldosMetaDescriptors, TOLDOS_SEO } from "./toldosSeo.js";

/**
 * Framework Mode is the metadata owner only for the isolated prerender proof
 * routes listed here. The regular Vite application never reads this lookup,
 * so its existing react-helmet-async behavior remains unchanged.
 */
const FRAMEWORK_SEO_ROUTES = [
  {
    path: HOME_SEO.path,
    seo: HOME_SEO,
    getMetaDescriptors: getHomeMetaDescriptors,
  },
  {
    path: CORTINAS_SEO.path,
    seo: CORTINAS_SEO,
    getMetaDescriptors: getCortinasMetaDescriptors,
  },
  {
    path: TOLDOS_SEO.path,
    seo: TOLDOS_SEO,
    getMetaDescriptors: getToldosMetaDescriptors,
  },
  {
    path: SERVICES_SEO.path,
    seo: SERVICES_SEO,
    getMetaDescriptors: getServicesMetaDescriptors,
  },
];

export function getFrameworkSeoRoute(pathname) {
  return FRAMEWORK_SEO_ROUTES.find(({ path }) => path === pathname) ?? null;
}

export function getFrameworkMetaDescriptors(pathname) {
  return getFrameworkSeoRoute(pathname)?.getMetaDescriptors() ?? [];
}
