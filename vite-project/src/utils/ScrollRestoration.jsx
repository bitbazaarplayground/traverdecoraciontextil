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
  const navType = useNavigationType();
  const key = getKey(location);
  const storeRef = useRef(readStore());

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    return () => {
      storeRef.current[key] = window.scrollY;
      writeStore(storeRef.current);
    };
  }, [key]);

  useLayoutEffect(() => {
    storeRef.current = readStore();

    if (navType === "POP") {
      const savedY = storeRef.current[key];
      if (typeof savedY === "number") {
        window.scrollTo(0, savedY);
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [key, navType]);

  return null;
}
