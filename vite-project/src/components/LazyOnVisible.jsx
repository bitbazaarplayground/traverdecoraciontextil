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
    if (!el) return;

    let timer = null;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          io.disconnect();

          if (deferMs > 0) {
            timer = window.setTimeout(() => setShow(true), deferMs);
          } else {
            setShow(true);
          }
        }
      },
      { rootMargin }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, [show, rootMargin, deferMs]);

  return (
    <div ref={ref} style={{ minHeight }}>
      {show ? children : null}
    </div>
  );
}
