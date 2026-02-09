import { useRef } from "react";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import images
import Img1 from "../assets/Home/interior/cellular-shades-bedroom-pala-old-lace-three-quarter-inch-cell-vertical-cells.webp";
import Img2 from "../assets/Home/interior/roller-shades-dining-room-luminescence-sterling-large-statement-lamp.webp";
import Img3 from "../assets/Home/interior/roller-shades-living-room-artesian-antiquity-026-feather-vase.webp";
import Img4 from "../assets/Home/interior/roller-shades-living-room-hombre-flax-340-concrete-accent-furniture.webp";
import Img5 from "../assets/Home/interior/roller-shades-living-room-watson-dove-grey-380-textured-floral-walls.webp";
import Img6 from "../assets/Home/interior/solar-shades-dallas-coppell-commercial-church-sundance-1-percent-ebony-318-view-3.webp";
import Img7 from "../assets/Home/interior/solar-shades-kitchen-newscast-5-percent-white-white-202-sliding-glass-doors.webp";
import Img8 from "../assets/Home/interior/solar-shades-seattle-commercial-real-estate-office-shoreview-3-percent-charcoal-185-view-1.webp";

const SectionWrapper = styled.section`
  padding: 3.4rem 1.5rem;
  background: #fff;

  @media (max-width: 768px) {
    padding: 2.8rem 1rem;
  }

  /* Swiper pagination – premium */
  .swiper-pagination {
    position: relative;
    margin-top: 1.25rem;
  }

  .swiper-pagination-bullet {
    width: 7px;
    height: 7px;
    opacity: 0.35;
    background: rgba(17, 17, 17, 0.55);
    transition: transform 180ms ease, opacity 180ms ease;
  }

  .swiper-pagination-bullet-active {
    opacity: 0.95;
    transform: scale(1.15);
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1rem;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 2.5rem auto;
  font-size: 1.1rem;
  color: #555;
  line-height: 1.75;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 14px;
  cursor: pointer;
  aspect-ratio: 4 / 3;
  width: 100%;
  position: relative;

  @media (min-width: 768px) {
    &:hover img {
      transform: scale(1.05);
    }
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
`;

export default function GalleryCarousel() {
  const swiperRef = useRef(null);
  const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8];

  return (
    <SectionWrapper id="gallery">
      <Title>Inspírate</Title>
      <Subtitle>
        Descubre ideas y estilos que podemos adaptar a tu hogar, cuidando cada
        detalle.
      </Subtitle>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        navigation={false}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        onSwiper={(swiperInstance) => {
          swiperRef.current = swiperInstance;
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <ImageWrapper
              onMouseEnter={() => swiperRef.current?.autoplay.stop()}
              onMouseLeave={() => swiperRef.current?.autoplay.start()}
            >
              <Img src={src} alt={`gallery-${i}`} />
            </ImageWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </SectionWrapper>
  );
}
