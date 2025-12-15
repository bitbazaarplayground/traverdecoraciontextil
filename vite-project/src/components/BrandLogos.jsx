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
   SHARED
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
   DESKTOP VERSION
========================= */

const DesktopSection = styled.section`
  width: 100%;
  padding: 3.5rem 1.5rem 4rem;
  background: #fff;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 2.5rem;
`;

const DesktopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  place-items: center;
  gap: 2.5rem;
  max-width: 1100px;
  margin: 0 auto;
`;

const DesktopLogoItem = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
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
    transform: scale(1.06);
  }
`;

/* =========================
   MOBILE VERSION (TRUST STRIP)
========================= */

const MobileSection = styled.section`
  width: 100%;
  padding: 1.5rem 1rem;
  background: #fafafa;

  @media (min-width: 769px) {
    display: none;
  }
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
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  align-items: center;
`;

const MobileLogo = styled.img`
  max-height: 28px;
  max-width: 100%;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.6;
`;

/* =========================
   COMPONENT
========================= */

export default function BrandLogos() {
  return (
    <>
      {/* 🖥 Desktop */}
      <DesktopSection>
        <DesktopTitle>
          Trabajamos con marcas líderes en automatización y decoración
        </DesktopTitle>

        <DesktopGrid>
          {logos.map((logo) => (
            <DesktopLogoItem key={logo.alt}>
              <DesktopLogo src={logo.src} alt={logo.alt} />
            </DesktopLogoItem>
          ))}
        </DesktopGrid>
      </DesktopSection>

      {/* 📱 Mobile */}
      <MobileSection>
        <MobileTitle>Marcas con las que trabajamos</MobileTitle>

        <MobileGrid>
          {logos.slice(0, 8).map((logo) => (
            <MobileLogo key={logo.alt} src={logo.src} alt={logo.alt} />
          ))}
        </MobileGrid>
      </MobileSection>
    </>
  );
}
