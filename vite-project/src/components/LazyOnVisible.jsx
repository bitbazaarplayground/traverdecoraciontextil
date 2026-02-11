import { useEffect, useRef, useState } from "react";

export default function LazyOnVisible({
  children,
  rootMargin = "600px 0px",
  minHeight = 1,
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return (
    <div ref={ref} style={{ minHeight }}>
      {show ? children : null}
    </div>
  );
}
