import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Host = styled.div`
  /* keeps layout stable while we lazy-load the real carousel */
  min-height: 260px;

  @media (min-width: 769px) {
    min-height: 420px;
  }
`;

const CarouselImage = styled.div`
  height: 420px;
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 768px) {
    height: 260px;
  }
`;

export default function SlickCarouselLazy({ images = [], settings }) {
  const hostRef = useRef(null);
  const [SliderComp, setSliderComp] = useState(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    let loaded = false;

    const load = async () => {
      if (loaded) return;
      loaded = true;

      // Load CSS only when needed
      await Promise.all([
        import("slick-carousel/slick/slick.css"),
        import("slick-carousel/slick/slick-theme.css"),
      ]);

      const mod = await import("react-slick");
      setSliderComp(() => mod.default);
    };

    // Fallback if IO is not available
    if (!("IntersectionObserver" in window)) {
      load();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        load();
        io.disconnect();
      },
      { rootMargin: "600px 0px" }
    );

    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <Host ref={hostRef}>
      {SliderComp ? (
        <SliderComp {...settings}>
          {images.map((img, i) => (
            <CarouselImage key={`${i}-${img}`}>
              <img
                src={img}
                alt={`Cortinas y estores instalados — ejemplo ${i + 1}`}
                loading="lazy"
                decoding="async"
              />
            </CarouselImage>
          ))}
        </SliderComp>
      ) : (
        // Placeholder (keeps height, prevents layout jump)
        <CarouselImage aria-hidden="true" />
      )}
    </Host>
  );
}
