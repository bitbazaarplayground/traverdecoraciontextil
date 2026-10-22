import { useEffect, useLayoutEffect } from "react";
import App from "../App.jsx";
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
  if (location.pathname === TOLDOS_SEO.path)
    return getToldosMetaDescriptors();
  return [];
}

export default function LegacyAppRoute() {
  const { pathname } = useLocation();
  const isFrameworkHomeRoute = pathname === HOME_SEO.path;
  const isFrameworkToldosRoute = pathname === TOLDOS_SEO.path;
  const frameworkTitle = isFrameworkHomeRoute
    ? HOME_SEO.title
    : isFrameworkToldosRoute
    ? TOLDOS_SEO.title
    : null;

  return (
    <>
      <FrameworkRouteTitleBoundary title={frameworkTitle} />
      <App
        suppressHomeHelmet={isFrameworkHomeRoute}
        suppressToldosHelmet={isFrameworkToldosRoute}
        disableLegacyScrollToTop
      />
    </>
  );
}
