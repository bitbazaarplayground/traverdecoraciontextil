// src/components/LazyOnVisible.jsx
import { useEffect, useRef, useState } from "react";

export default function LazyOnVisible({
  children,
  rootMargin = "600px 0px",
  minHeight = 1,
  deferMs = 0, // ✅ optional: delay mounting even after it becomes visible
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;

    let timeoutId;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries[0]?.isIntersecting;
        if (!hit) return;

        // Stop observing as soon as we decide to show it
        io.disconnect();

        if (deferMs > 0) {
          timeoutId = window.setTimeout(() => setShow(true), deferMs);
        } else {
          setShow(true);
        }
      },
      { rootMargin }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [show, rootMargin, deferMs]);

  return (
    <div ref={ref} style={{ minHeight }}>
      {show ? children : null}
    </div>
  );
}
