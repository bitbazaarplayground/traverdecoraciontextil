import {
  AUTOMATIZACION_COMPLETA_SEO,
  AUTOMATIZACION_INDIVIDUAL_SEO,
  AUTOMATIZACION_SEO,
  getAutomatizacionCompletaMetaDescriptors,
  getAutomatizacionIndividualMetaDescriptors,
  getAutomatizacionMetaDescriptors,
} from "./automatizacionSeo.js";
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
  getMosquiterasMetaDescriptors,
  MOSQUITERAS_SEO,
} from "./mosquiterasSeo.js";
import {
  AVISO_LEGAL_SEO,
  CONTACT_SEO,
  getAvisoLegalMetaDescriptors,
  getContactMetaDescriptors,
  getNosotrosMetaDescriptors,
  getPoliticaCookiesMetaDescriptors,
  getPoliticaPrivacidadMetaDescriptors,
  getPropuestasMetaDescriptors,
  NOSOTROS_SEO,
  POLITICA_COOKIES_SEO,
  POLITICA_PRIVACIDAD_SEO,
  PROPUESTAS_SEO,
} from "./remainingPublicSeo.js";
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
    path: PROPUESTAS_SEO.path,
    seo: PROPUESTAS_SEO,
    getMetaDescriptors: getPropuestasMetaDescriptors,
  },
  {
    path: NOSOTROS_SEO.path,
    seo: NOSOTROS_SEO,
    getMetaDescriptors: getNosotrosMetaDescriptors,
  },
  {
    path: CONTACT_SEO.path,
    seo: CONTACT_SEO,
    getMetaDescriptors: getContactMetaDescriptors,
  },
  {
    path: AVISO_LEGAL_SEO.path,
    seo: AVISO_LEGAL_SEO,
    getMetaDescriptors: getAvisoLegalMetaDescriptors,
  },
  {
    path: POLITICA_PRIVACIDAD_SEO.path,
    seo: POLITICA_PRIVACIDAD_SEO,
    getMetaDescriptors: getPoliticaPrivacidadMetaDescriptors,
  },
  {
    path: POLITICA_COOKIES_SEO.path,
    seo: POLITICA_COOKIES_SEO,
    getMetaDescriptors: getPoliticaCookiesMetaDescriptors,
  },
  {
    path: AUTOMATIZACION_SEO.path,
    seo: AUTOMATIZACION_SEO,
    getMetaDescriptors: getAutomatizacionMetaDescriptors,
  },
  {
    path: AUTOMATIZACION_COMPLETA_SEO.path,
    seo: AUTOMATIZACION_COMPLETA_SEO,
    getMetaDescriptors: getAutomatizacionCompletaMetaDescriptors,
  },
  {
    path: AUTOMATIZACION_INDIVIDUAL_SEO.path,
    seo: AUTOMATIZACION_INDIVIDUAL_SEO,
    getMetaDescriptors: getAutomatizacionIndividualMetaDescriptors,
  },
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
  {
    path: MOSQUITERAS_SEO.path,
    seo: MOSQUITERAS_SEO,
    getMetaDescriptors: getMosquiterasMetaDescriptors,
  },
];

export function getFrameworkSeoRoute(pathname) {
  return FRAMEWORK_SEO_ROUTES.find(({ path }) => path === pathname) ?? null;
}

export function getFrameworkMetaDescriptors(pathname) {
  return getFrameworkSeoRoute(pathname)?.getMetaDescriptors() ?? [];
}
