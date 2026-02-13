// src/components/LazyOnVisible.jsx
import { useEffect, useRef, useState } from "react";

export default function LazyOnVisible({
  children,
  rootMargin = "600px 0px",
  minHeight = 1,
  deferMs = 0,
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // Fallback: just render (older browsers / very rare cases)
      setShow(true);
      return;
    }

    let timerId = null;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        io.disconnect();

        if (deferMs > 0) {
          timerId = window.setTimeout(() => setShow(true), deferMs);
        } else {
          setShow(true);
        }
      },
      { rootMargin }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      if (timerId) window.clearTimeout(timerId);
    };
  }, [show, rootMargin, deferMs]);

  return (
    <div
      ref={ref}
      style={{
        minHeight,
        // ✅ helps reduce CLS when sections mount (especially desktop)
        contentVisibility: "auto",
        containIntrinsicSize: `${Math.max(1, Number(minHeight) || 1)}px`,
      }}
    >
      {show ? children : null}
    </div>
  );
}
