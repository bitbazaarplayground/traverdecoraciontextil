import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Host = styled.div`
  width: 100%;
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

      await Promise.all([
        import("slick-carousel/slick/slick.css"),
        import("slick-carousel/slick/slick-theme.css"),
      ]);

      const mod = await import("react-slick");
      setSliderComp(() => mod.default);
    };

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

  const slideSizes = "(max-width: 768px) 100vw, min(1100px, 100vw)";

  return (
    <Host ref={hostRef}>
      {SliderComp ? (
        <SliderComp {...settings}>
          {images.map((img, i) => {
            const isObj = img && typeof img === "object";
            const src = isObj ? img.src : img;
            const srcSet = isObj ? img.srcSet : undefined;

            return (
              <CarouselImage key={`${i}-${src}`}>
                <img
                  src={src}
                  srcSet={srcSet}
                  sizes={srcSet ? slideSizes : undefined}
                  width="1100"
                  height="733"
                  alt={`Cortinas y estores instalados — ejemplo ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                />
              </CarouselImage>
            );
          })}
        </SliderComp>
      ) : (
        <CarouselImage aria-hidden="true" />
      )}
    </Host>
  );
}
