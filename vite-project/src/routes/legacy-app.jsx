import { useEffect, useLayoutEffect, useRef, useState } from "react";
import App from "../App.jsx";
import {
  getFrameworkMetaDescriptors,
  getFrameworkSeoRoute,
} from "../config/frameworkSeo.js";
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
  return getFrameworkMetaDescriptors(location.pathname);
}

export default function LegacyAppRoute() {
  const { pathname } = useLocation();
  const frameworkSeoRoute = getFrameworkSeoRoute(pathname);
  const isFrameworkManagedRoute = Boolean(frameworkSeoRoute);
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
  return (
    <>
      <FrameworkRouteTitleBoundary title={frameworkSeoRoute?.seo.title} />
      <App
        frameworkMetadataEnabled={isFrameworkManagedRoute}
        disableLegacyScrollToTop
        legacyHelmetRefreshKey={legacyHelmetRefreshKey}
      />
    </>
  );
}
