import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"

  useEffect(() => {
    // Only scroll to top on normal navigations (link clicks).
    // Don't do it on Back/Forward, so scroll restoration can work.
    if (navType === "PUSH") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto", // "instant" isn't a valid value; use "auto" or "smooth"
      });
    }
  }, [pathname, navType]);

  return null;
}
