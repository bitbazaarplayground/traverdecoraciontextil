import {
  getCortinasMetaDescriptors,
  CORTINAS_SEO,
} from "./cortinasSeo.js";
import { getHomeMetaDescriptors, HOME_SEO } from "./homeSeo.js";
import {
  getLimpiezaMetaDescriptors,
  LIMPIEZA_SEO,
} from "./limpiezaSeo.js";
import {
  getPanelJaponesMetaDescriptors,
  PANEL_JAPONES_SEO,
} from "./panelJaponesSeo.js";
import {
  getServicesMetaDescriptors,
  SERVICES_SEO,
} from "./servicesSeo.js";
import { getToldosMetaDescriptors, TOLDOS_SEO } from "./toldosSeo.js";
import {
  getVenecianasMetaDescriptors,
  VENECIANAS_SEO,
} from "./venecianasSeo.js";

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
  {
    path: PANEL_JAPONES_SEO.path,
    seo: PANEL_JAPONES_SEO,
    getMetaDescriptors: getPanelJaponesMetaDescriptors,
  },
  {
    path: VENECIANAS_SEO.path,
    seo: VENECIANAS_SEO,
    getMetaDescriptors: getVenecianasMetaDescriptors,
  },
  {
    path: LIMPIEZA_SEO.path,
    seo: LIMPIEZA_SEO,
    getMetaDescriptors: getLimpiezaMetaDescriptors,
  },
];

export function getFrameworkSeoRoute(pathname) {
  return FRAMEWORK_SEO_ROUTES.find(({ path }) => path === pathname) ?? null;
}

export function getFrameworkMetaDescriptors(pathname) {
  return getFrameworkSeoRoute(pathname)?.getMetaDescriptors() ?? [];
}
