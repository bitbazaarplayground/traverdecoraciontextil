import styled from "styled-components";

import Bandalux from "../assets/brands/bandalux.jpeg";
import Casadeco from "../assets/brands/casadeco.jpg";
import Coordonne from "../assets/brands/coordonne.jpg";
import Destiny from "../assets/brands/destiny.jpg";
import Ganga from "../assets/brands/gimenezganga.jpg";
import Jover from "../assets/brands/jover.jpg";
import Plein from "../assets/brands/philippplein.png";
import RobertoCavalli from "../assets/brands/robertocavalli.png";
import Somfy from "../assets/brands/somfy.png";

// Wrapper
const Section = styled.section`
  width: 100%;
  padding: 3rem 1.5rem 4rem 1.5rem;
  background: #fff;

  @media (max-width: 768px) {
    padding: 2.5rem 1rem;
  }
`;

// Title
const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 2rem;
`;

// Logo grid
const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  place-items: center;
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
`;

// Single logo
const Logo = styled.img`
  height: 55px;
  width: auto;
  filter: grayscale(100%);
  opacity: 0.65;
  transition: all 0.35s ease;

  &:hover {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(1.06);
  }

  @media (max-width: 768px) {
    height: 45px;
  }
`;

export default function BrandLogos() {
  return (
    <Section>
      <Title>
        Trabajamos con marcas líderes en automatización y decoración
      </Title>

      <LogoGrid>
        <Logo src={Somfy} alt="Somfy" />
        <Logo src={Coordonne} alt="Coordonne" />
        <Logo src={Casadeco} alt="Casadeco" />
        <Logo src={Destiny} alt="Destiny Decor" />
        <Logo src={Jover} alt="Jover" />
        <Logo src={Ganga} alt="Giménez Ganga" />
        <Logo src={Plein} alt="Philipp Plein" />
        <Logo src={RobertoCavalli} alt="Roberto Cavalli" />
        <Logo src={Bandalux} alt="Bandalux" />
      </LogoGrid>
    </Section>
  );
}
