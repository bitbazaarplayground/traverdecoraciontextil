import { useEffect, useLayoutEffect, useRef, useState } from "react";
import App from "../App.jsx";
import {
  CORTINAS_SEO,
  getCortinasMetaDescriptors,
} from "../config/cortinasSeo.js";
import {
  getHomeMetaDescriptors,
  HOME_SEO,
} from "../config/homeSeo.js";
import {
  getToldosMetaDescriptors,
  TOLDOS_SEO,
} from "../config/toldosSeo.js";
import { useLocation } from "react-router-dom";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function FrameworkRouteTitleBoundary({ title }) {
  useIsomorphicLayoutEffect(() => {
    if (!title) return;

    const titles = [...document.head.querySelectorAll("title")];
    const frameworkTitle = titles
      .slice()
      .reverse()
      .find((element) => element.textContent === title);

    if (!frameworkTitle) return;

    // Framework Meta has committed its route title at this point. Remove only
    // the prior legacy Helmet title so there is one unambiguous owner.
    titles.forEach((title) => {
      if (title !== frameworkTitle) title.remove();
    });
  }, [title]);

  return null;
}

// React Router route modules require this non-component export.
// eslint-disable-next-line react-refresh/only-export-components
export function meta({ location }) {
  if (location.pathname === HOME_SEO.path) return getHomeMetaDescriptors();
  if (location.pathname === CORTINAS_SEO.path)
    return getCortinasMetaDescriptors();
  if (location.pathname === TOLDOS_SEO.path)
    return getToldosMetaDescriptors();
  return [];
}

export default function LegacyAppRoute() {
  const { pathname } = useLocation();
  const isFrameworkCortinasRoute = pathname === CORTINAS_SEO.path;
  const isFrameworkHomeRoute = pathname === HOME_SEO.path;
  const isFrameworkToldosRoute = pathname === TOLDOS_SEO.path;
  const isFrameworkManagedRoute =
    isFrameworkCortinasRoute ||
    isFrameworkHomeRoute ||
    isFrameworkToldosRoute;
  const wasFrameworkManagedRoute = useRef(isFrameworkManagedRoute);
  const [legacyHelmetRefreshKey, setLegacyHelmetRefreshKey] = useState(0);

  useEffect(() => {
    const leftFrameworkManagedRoute =
      wasFrameworkManagedRoute.current && !isFrameworkManagedRoute;
    wasFrameworkManagedRoute.current = isFrameworkManagedRoute;

    if (!leftFrameworkManagedRoute) return undefined;

    // React Router removes its route title after the legacy page's Helmet has
    // committed. Remount only the nested legacy route on the next frame, once
    // Framework metadata is settled, so Helmet can establish its own title.
    const frame = window.requestAnimationFrame(() => {
      setLegacyHelmetRefreshKey((key) => key + 1);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isFrameworkManagedRoute]);
  const frameworkTitle = isFrameworkHomeRoute
    ? HOME_SEO.title
    : isFrameworkCortinasRoute
    ? CORTINAS_SEO.title
    : isFrameworkToldosRoute
    ? TOLDOS_SEO.title
    : null;

  return (
    <>
      <FrameworkRouteTitleBoundary title={frameworkTitle} />
      <App
        suppressCortinasHelmet={isFrameworkCortinasRoute}
        suppressHomeHelmet={isFrameworkHomeRoute}
        suppressToldosHelmet={isFrameworkToldosRoute}
        disableLegacyScrollToTop
        legacyHelmetRefreshKey={legacyHelmetRefreshKey}
      />
    </>
  );
}
