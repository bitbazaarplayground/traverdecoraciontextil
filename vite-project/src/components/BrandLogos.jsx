import { useEffect, useState } from "react";
import styled from "styled-components";

import Bandalux from "../assets/Home/brands/bandalux.jpeg";
import Casadeco from "../assets/Home/brands/casadeco.jpg";
import Coordonne from "../assets/Home/brands/coordonne.jpg";
import Destiny from "../assets/Home/brands/destiny.jpg";
import Ganga from "../assets/Home/brands/gimenezganga.jpg";
import Jover from "../assets/Home/brands/jover.jpg";
import Plein from "../assets/Home/brands/philippplein.png";
import RobertoCavalli from "../assets/Home/brands/robertocavalli.png";
import Somfy from "../assets/Home/brands/somfy.png";

/* =========================
   DATA
========================= */

const logos = [
  { src: Somfy, alt: "Somfy" },
  { src: Bandalux, alt: "Bandalux" },
  { src: Casadeco, alt: "Casadeco" },
  { src: Coordonne, alt: "Coordonné" },
  { src: Destiny, alt: "Destiny Decor" },
  { src: Jover, alt: "Jover" },
  { src: Ganga, alt: "Giménez Ganga" },
  { src: RobertoCavalli, alt: "Roberto Cavalli" },
  { src: Plein, alt: "Philipp Plein" },
];

/* =========================
   HOOK
========================= */

function useIsDesktop(minWidth = 769) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (!window?.matchMedia) return;

    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setIsDesktop(mq.matches);

    update();
    // Safari compatibility: addListener/removeListener fallback
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, [minWidth]);

  return isDesktop;
}

/* =========================
   DESKTOP VERSION
========================= */

const DesktopSection = styled.section`
  width: 100%;
  padding: 3rem 1.5rem 3.2rem;
  background: #fff;
`;

const DesktopTitle = styled.h2`
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

const DesktopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  place-items: center;
  gap: 2.1rem;
  max-width: 1100px;
  margin: 0 auto;
`;

const DesktopLogoItem = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: rgba(17, 17, 17, 0.02);
  border: 1px solid rgba(17, 17, 17, 0.06);
  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(17, 17, 17, 0.03);
  }

  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

const DesktopLogo = styled.img`
  max-height: 55px;
  max-width: 150px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.65;
  transition: opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease;

  ${DesktopLogoItem}:hover & {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(1.04);
  }
`;

/* =========================
   MOBILE VERSION (TRUST STRIP)
========================= */

const MobileSection = styled.section`
  width: 100%;
  padding: 1.25rem 1rem;
  background: #fff;
`;

const MobileTitle = styled.p`
  text-align: center;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #777;
  margin-bottom: 1rem;
`;

const MobileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  align-items: center;
`;

const MobileLogo = styled.img`
  max-height: 32px;
  max-width: 100%;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.6;
`;

/* =========================
   COMPONENT
========================= */

export default function BrandLogos() {
  const isDesktop = useIsDesktop(769);

  if (isDesktop) {
    return (
      <DesktopSection>
        <DesktopTitle>
          Trabajamos con marcas <span>líderes</span> en automatización y
          decoración
        </DesktopTitle>

        <DesktopGrid>
          {logos.map((logo) => (
            <DesktopLogoItem key={logo.alt}>
              <DesktopLogo
                src={logo.src}
                alt={logo.alt}
                width="150"
                height="55"
                loading="lazy"
                decoding="async"
              />
            </DesktopLogoItem>
          ))}
        </DesktopGrid>
      </DesktopSection>
    );
  }

  return (
    <MobileSection>
      <MobileTitle>Marcas con las que trabajamos</MobileTitle>

      <MobileGrid>
        {logos.slice(0, 8).map((logo) => (
          <MobileLogo
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            width="120"
            height="32"
            loading="lazy"
            decoding="async"
          />
        ))}
      </MobileGrid>
    </MobileSection>
  );
}
