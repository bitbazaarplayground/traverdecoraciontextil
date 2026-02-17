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

  const storeRef = useRef(readStore());
  const key = getKey(location);
  const prevKeyRef = useRef(key);

  // Manual browser scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Keep store updated while user scrolls (optional but nice)
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        storeRef.current[key] = window.scrollY;
        writeStore(storeRef.current);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [key]);

  // Core: save previous route BEFORE scrolling, then restore/top depending on nav type.
  useLayoutEffect(() => {
    const prevKey = prevKeyRef.current;

    // 1) Save scroll for the page we're leaving (prevKey)
    if (prevKey && prevKey !== key) {
      storeRef.current[prevKey] = window.scrollY;
      writeStore(storeRef.current);
    }

    // 2) Restore or top
    const savedY = storeRef.current[key];

    if (navType === "POP") {
      if (typeof savedY === "number") {
        // fight layout shifts for a moment
        const start = performance.now();
        const maxMs = 1200;

        const apply = () => window.scrollTo(0, savedY);

        requestAnimationFrame(() => requestAnimationFrame(apply));

        const ro = new ResizeObserver(() => {
          if (performance.now() - start > maxMs) return;
          apply();
        });
        ro.observe(document.body);

        const t1 = setTimeout(apply, 120);
        const t2 = setTimeout(apply, 350);
        const t3 = setTimeout(apply, 800);

        // cleanup observers/timeouts for this restore cycle
        return () => {
          ro.disconnect();
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
        };
      }
      // if no saved, do nothing
    } else {
      // PUSH/REPLACE (normal link navigation) -> top
      window.scrollTo(0, 0);
    }

    // 3) Update prev key after we’ve handled this navigation
    prevKeyRef.current = key;
  }, [key, navType]);

  return null;
}
