import { ArrowRight, Check } from "lucide-react";
import styled from "styled-components";
import { CONTACT } from "../../config/contact";
import { trackEvent } from "../../lib/analytics";

import welcome1200 from "../../assets/Automatizacion/ctaAuto-1200.webp";
import welcome400 from "../../assets/Automatizacion/ctaAuto-400.webp";
import welcome600 from "../../assets/Automatizacion/ctaAuto-600.webp";
import welcome800 from "../../assets/Automatizacion/ctaAuto-800.webp";

const responsiveImages = {
  welcome: {
    400: welcome400,
    600: welcome600,
    800: welcome800,
    1200: welcome1200,
  },
};

const getSrcSet = (images) =>
  `${images[400]} 400w, ${images[600]} 600w, ${images[800]} 800w, ${images[1200]} 1200w`;

const WhatsAppLink = ({ phone, message, className, children }) => {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default function AutomationCta({ onOpenAsesoramiento, waPhone }) {
  const phone = waPhone || CONTACT.whatsappNumber;

  return (
    <AfterPacksCTA id="cta">
      <AfterBg aria-hidden="true">
        <AfterBgImg
          src={welcome800}
          srcSet={getSrcSet(responsiveImages.welcome)}
          sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <AfterOverlay />
        <AfterGlow />
      </AfterBg>

      <AfterCTAInner>
        <AfterCTALeft>
          <AfterKicker>Estamos aquí para ayudarte</AfterKicker>
          <AfterTitle>¿Lo vemos en tu casa sin compromiso?</AfterTitle>
          <AfterText>
            Medimos, proponemos y te damos un rango claro. Te recomendamos lo
            que tiene sentido según orientación, uso y estética.
          </AfterText>

          <AfterProof>
            <Check size={16} />
            Visita + propuesta sin coste · instalación profesional · escenas
            configuradas
          </AfterProof>
        </AfterCTALeft>

        <AfterCTARight>
          <AfterButtons>
            <AfterPrimary
              href="/contact"
              onClick={(e) => {
                e.preventDefault();

                trackEvent("open_quick_enquiry", {
                  source: "automatizacion_completa_cta",
                  pack: "Automatización Completa",
                });

                onOpenAsesoramiento?.(
                  "Automatización Completa",
                  "automatizacion_completa_cta"
                );
              }}
            >
              Pedir asesoramiento <ArrowRight size={16} />
            </AfterPrimary>

            <AfterSecondary
              as={WhatsAppLink}
              phone={phone}
              message="Hola, quiero una propuesta de automatización integral. ¿Podemos agendar una visita?"
            >
              WhatsApp
            </AfterSecondary>
          </AfterButtons>

          <AfterMini>
            Respuesta rápida en horario comercial · Castellón y Valencia
          </AfterMini>
        </AfterCTARight>
      </AfterCTAInner>
    </AfterPacksCTA>
  );
}

const AfterPacksCTA = styled.section`
  margin-top: 32px;
  position: relative;
  overflow: hidden;

  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);

  background: #111;

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 899px) {
    background-position: center 100%;
  }
`;

const AfterBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const AfterBgImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`;

const AfterOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(11, 12, 15, 0.9) 0%,
    rgba(11, 12, 15, 0.78) 35%,
    rgba(11, 12, 15, 0.52) 60%,
    rgba(11, 12, 15, 0.3) 100%
  );
`;

const AfterGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      800px 420px at 15% 10%,
      rgba(229, 0, 126, 0.16),
      transparent 55%
    ),
    radial-gradient(
      800px 420px at 80% 40%,
      rgba(196, 151, 98, 0.14),
      transparent 60%
    );
  pointer-events: none;
`;

const AfterCTAInner = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 28px 20px;
  display: grid;
  gap: 14px;

  @media (min-width: 900px) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: center;
    padding: 34px 24px;
  }
`;

const AfterCTALeft = styled.div``;

const AfterKicker = styled.p`
  margin: 0 0 8px 0;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: rgba(244, 244, 245, 0.72);
`;

const AfterTitle = styled.h3`
  margin: 0;
  font-size: clamp(1.4rem, 2.2vw, 1.8rem);
  letter-spacing: -0.02em;
  color: rgba(244, 244, 245, 0.98);
`;

const AfterText = styled.p`
  margin: 8px 0 0;
  line-height: 1.7;
  color: rgba(244, 244, 245, 0.74);
  max-width: 62ch;
`;

const AfterProof = styled.div`
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(244, 244, 245, 0.88);
  font-weight: 750;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 899px) {
    display: none;
  }
`;

const AfterCTARight = styled.div`
  display: grid;
  gap: 10px;

  @media (min-width: 900px) {
    justify-items: end;
    text-align: right;
  }
`;

const AfterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 899px) {
    display: none;
  }
`;

const AfterPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  padding: 12px 14px;
  border-radius: 14px;

  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 900;
  text-decoration: none;

  transition: transform 0.15s ease, opacity 0.15s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;

const AfterSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 12px 14px;
  border-radius: 14px;

  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(244, 244, 245, 0.95);
  font-weight: 850;
  text-decoration: none;

  transition: transform 0.15s ease, background 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const AfterMini = styled.div`
  color: rgba(244, 244, 245, 0.62);
  font-size: 0.92rem;

  @media (max-width: 899px) {
    display: none;
  }
`;
