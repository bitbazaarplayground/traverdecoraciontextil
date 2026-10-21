import { useLayoutEffect } from "react";
import App from "../App.jsx";
import {
  getToldosMetaDescriptors,
  TOLDOS_SEO,
} from "../config/toldosSeo.js";
import { useLocation } from "react-router-dom";

function FrameworkToldosTitleBoundary({ active }) {
  useLayoutEffect(() => {
    if (!active) return;

    const titles = [...document.head.querySelectorAll("title")];
    const frameworkTitle = titles
      .slice()
      .reverse()
      .find((title) => title.textContent === TOLDOS_SEO.title);

    if (!frameworkTitle) return;

    // Framework Meta has committed its route title at this point. Remove only
    // the prior legacy Helmet title so there is one unambiguous owner.
    titles.forEach((title) => {
      if (title !== frameworkTitle) title.remove();
    });
  }, [active]);

  return null;
}

// React Router route modules require this non-component export.
// eslint-disable-next-line react-refresh/only-export-components
export function meta({ location }) {
  return location.pathname === TOLDOS_SEO.path
    ? getToldosMetaDescriptors()
    : [];
}

export default function LegacyAppRoute() {
  const { pathname } = useLocation();
  const isFrameworkToldosRoute = pathname === TOLDOS_SEO.path;

  return (
    <>
      <FrameworkToldosTitleBoundary active={isFrameworkToldosRoute} />
      <App
        suppressToldosHelmet={isFrameworkToldosRoute}
        disableLegacyScrollToTop
      />
    </>
  );
}
