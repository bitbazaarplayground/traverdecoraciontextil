import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/* =========================
   ASSETS
========================= */
import automatizacionPack1200 from "../../assets/Automatizacion/domoticaInd-1200.webp";
import automatizacionPack400 from "../../assets/Automatizacion/domoticaInd-400.webp";
import automatizacionPack600 from "../../assets/Automatizacion/domoticaInd-600.webp";
import automatizacionPack800 from "../../assets/Automatizacion/domoticaInd-800.webp";

/* =========================
   IMAGE HELPERS
========================= */
const responsiveImages = {
  automatizacionPack: {
    400: automatizacionPack400,
    600: automatizacionPack600,
    800: automatizacionPack800,
    1200: automatizacionPack1200,
  },
};

const getSrcSet = (images) =>
  `${images[400]} 400w, ${images[600]} 600w, ${images[800]} 800w, ${images[1200]} 1200w`;

const IMAGE_SIZES =
  "(max-width: 768px) calc(100vw - 2.4rem), (max-width: 1120px) 42vw, 520px";

/* =========================
   COMPONENT
========================= */

export default function AutomationScaleSection() {
  return (
    <Section aria-label="Escalabilidad de la automatización">
      <Inner>
        <Left>
          <Kicker>Escalabilidad</Kicker>

          <Title>
            Empieza por una <span>zona</span>.
            <br />
            Amplía cuando quieras.
          </Title>

          <Lead>
            La automatización individual es la forma más práctica de empezar con
            una cortina, un screen o un toldo concreto. Si más adelante quieres
            conectar varios productos, crear escenas o integrar distintas
            estancias, podemos plantear una evolución natural hacia una solución
            más completa.
          </Lead>

          <SupportText>
            Así no necesitas resolverlo todo desde el principio, pero dejas la
            puerta abierta a un sistema más conectado cuando tenga sentido para
            tu espacio y tu forma de usarlo.
          </SupportText>
        </Left>

        <Right>
          <BridgeCardLink
            to="/automatizacion/completa"
            aria-label="Ver automatización completa"
          >
            <BridgeMedia>
              <BridgeImage
                src={responsiveImages.automatizacionPack[800]}
                srcSet={getSrcSet(responsiveImages.automatizacionPack)}
                sizes={IMAGE_SIZES}
                alt="Automatización completa para varios productos y estancias"
                loading="lazy"
                decoding="async"
              />
              <BridgeBadge>Integral</BridgeBadge>
            </BridgeMedia>

            <BridgeBody>
              <BridgeTitle>Automatización completa</BridgeTitle>

              <BridgeText>
                Un sistema coordinado que integra cortinas, persianas, toldos,
                sensores y escenas para que todo funcione en armonía.
              </BridgeText>

              <BridgeCta>
                Ver solución integral <ArrowRight size={16} />
              </BridgeCta>
            </BridgeBody>
          </BridgeCardLink>
        </Right>
      </Inner>
    </Section>
  );
}

/* =========================
   STYLES
========================= */

const Section = styled.section`
  padding: 1.6rem 0 1rem;

  @media (max-width: 768px) {
    padding: 1.2rem 0 0.8rem;
  }
`;

const Inner = styled.div`
  border-top: 1px solid rgba(17, 17, 17, 0.08);
  padding-top: 2.4rem;
  display: grid;
  gap: 1.4rem;

  @media (min-width: 980px) {
    grid-template-columns: minmax(0, 1fr) minmax(360px, 520px);
    gap: 2.4rem;
    align-items: center;
  }

  @media (max-width: 768px) {
    padding-top: 2rem;
  }
`;

const Left = styled.div`
  max-width: 62ch;
`;

const Kicker = styled.p`
  margin: 0 0 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: rgba(17, 17, 17, 0.5);
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(1.9rem, 3vw, 2.6rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: rgba(17, 17, 17, 0.96);

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: clamp(1.7rem, 7vw, 2.1rem);
  }
`;

const Lead = styled.p`
  margin: 1rem 0 0;
  font-size: 1.03rem;
  line-height: 1.78;
  color: rgba(17, 17, 17, 0.66);
  max-width: 60ch;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.72;
  }
`;

const SupportText = styled.p`
  margin: 0.95rem 0 0;
  font-size: 0.98rem;
  line-height: 1.72;
  color: rgba(17, 17, 17, 0.58);
  max-width: 58ch;

  @media (max-width: 768px) {
    font-size: 0.96rem;
  }
`;

const Right = styled.div`
  display: grid;

  @media (min-width: 980px) {
    align-self: center;
  }
`;

const BridgeCardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(17, 17, 17, 0.08);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
  transform: translateY(0);
  transition: transform 220ms ease, box-shadow 220ms ease,
    border-color 220ms ease;

  @media (min-width: 980px) {
    height: 315px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 28px 82px rgba(15, 23, 42, 0.12);
    border-color: rgba(17, 17, 17, 0.12);
  }
`;

const BridgeImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 500ms ease;

  ${BridgeCardLink}:hover & {
    transform: scale(1.05);
  }
`;

const BridgeBadge = styled.span`
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 1;

  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0.38rem 0.72rem;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.92);
  color: rgba(17, 17, 17, 0.72);
  border: 1px solid rgba(17, 17, 17, 0.08);

  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.04em;
`;

// HERE
const BridgeMedia = styled.div`
  position: relative;
  overflow: hidden;
  flex: 1.38;

  @media (max-width: 979px) {
    height: 170px;
    flex: none;
  }

  @media (max-width: 768px) {
    height: 155px;
  }
`;

const BridgeBody = styled.div`
  flex: 0.62;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.8rem 1rem 0.78rem;

  @media (min-width: 980px) {
    padding: 0.78rem 1rem 0.82rem;
  }
`;

const BridgeTitle = styled.h3`
  margin: 0;
  font-size: clamp(1.22rem, 1.5vw, 1.5rem);
  line-height: 1.06;
  letter-spacing: -0.022em;
  color: rgba(17, 17, 17, 0.94);
`;

const BridgeText = styled.p`
  margin: 0.38rem 0 0;
  font-size: 0.88rem;
  line-height: 1.5;
  color: rgba(17, 17, 17, 0.66);
`;

const BridgeCta = styled.span`
  margin-top: 0.56rem;
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;

  font-size: 0.88rem;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.84);
  transition: transform 180ms ease, color 180ms ease;

  ${BridgeCardLink}:hover & {
    transform: translateX(2px);
    color: ${({ theme }) => theme.colors.primary};
  }
`;
