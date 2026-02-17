import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const STORAGE_KEY = "scroll-positions:v5";
const getKey = (loc) => `${loc.pathname}${loc.search}${loc.hash}`;

function readStore() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}
function writeStore(store) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {}
}

export default function ScrollRestoration() {
  const location = useLocation();
  const navType = useNavigationType(); // POP / PUSH / REPLACE
  const key = getKey(location);

  const storeRef = useRef(readStore());

  // Tell browser not to do its own restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // ✅ SAVE: on route change (cleanup runs while still on the old page)
  useLayoutEffect(() => {
    return () => {
      storeRef.current[key] = window.scrollY;
      writeStore(storeRef.current);
    };
  }, [key]);

  // ✅ RESTORE: on new route
  useLayoutEffect(() => {
    // Always refresh from storage (in case anything wrote to it)
    storeRef.current = readStore();

    if (navType !== "POP") {
      window.scrollTo(0, 0);
      return;
    }

    const savedY = storeRef.current[key];
    if (typeof savedY !== "number") return;

    // Apply a few times to beat image/layout shifts
    const apply = () => window.scrollTo(0, savedY);
    requestAnimationFrame(() => requestAnimationFrame(apply));
    const t1 = setTimeout(apply, 120);
    const t2 = setTimeout(apply, 350);
    const t3 = setTimeout(apply, 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [key, navType]);

  return null;
}
