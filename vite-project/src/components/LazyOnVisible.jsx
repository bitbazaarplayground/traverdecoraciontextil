// src/components/LazyOnVisible.jsx
import { useEffect, useRef, useState } from "react";

function runIdle(cb, timeout = 900) {
  if ("requestIdleCallback" in window) {
    return window.requestIdleCallback(cb, { timeout });
  }
  return window.setTimeout(cb, 1);
}

function cancelIdle(id) {
  if ("cancelIdleCallback" in window) window.cancelIdleCallback(id);
  else window.clearTimeout(id);
}

export default function LazyOnVisible({
  children,
  rootMargin = "200px 0px", // preload slightly before it appears
  minHeight = 1,
  once = true,
  idle = false, // ✅ if true: mount during idle once visible
  idleTimeout = 900,
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;

    // If IO isn't supported, just render (better than blank content)
    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }

    let idleId = null;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries[0]?.isIntersecting;
        if (!hit) return;

        if (once) io.disconnect();

        if (idle) {
          idleId = runIdle(() => setShow(true), idleTimeout);
        } else {
          setShow(true);
        }
      },
      { rootMargin }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      if (idleId) cancelIdle(idleId);
    };
  }, [show, rootMargin, once, idle, idleTimeout]);

  return (
    <div ref={ref} style={{ minHeight }}>
      {show ? children : null}
    </div>
  );
}
