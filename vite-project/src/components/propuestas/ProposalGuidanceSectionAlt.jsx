import styled from "styled-components";
import {
  trackEmailClick,
  trackPhoneClick,
  trackWhatsAppClick,
} from "../../lib/analytics";
/* =========================
   ASSETS
========================= */

import guidance1200 from "../../assets/propuestas/smartLivingRoom-1200.webp";
import guidance400 from "../../assets/propuestas/smartLivingRoom-400.webp";
import guidance600 from "../../assets/propuestas/smartLivingRoom-600.webp";
import guidance800 from "../../assets/propuestas/smartLivingRoom-800.webp";

/* =========================
   IMAGE HELPERS
========================= */

const responsiveImages = {
  guidance: {
    400: guidance400,
    600: guidance600,
    800: guidance800,
    1200: guidance1200,
  },
};

const getSrcSet = (images) =>
  `${images[400]} 400w, ${images[600]} 600w, ${images[800]} 800w, ${images[1200]} 1200w`;

const IMAGE_SIZES =
  "(max-width: 768px) calc(100vw - 3rem), (max-width: 1120px) 46vw, 520px";

/* =========================
   COMPONENT
========================= */

export default function ProposalGuidanceSectionAlt() {
  return (
    <Section aria-label="Asesoramiento personalizado">
      <Inner>
        {/* LEFT TEXT */}
        <Content>
          <Kicker>Asesoramiento a medida</Kicker>

          <Title>
            ¿No encuentras todavía tu <span>propuesta ideal</span>?
          </Title>

          <Lead>
            Podemos ayudarte a definir una solución a tu medida, combinando
            tejidos, sistemas y acabados con una propuesta realista para tu
            espacio, tu estilo y tu presupuesto.
          </Lead>

          <List>
            <ListItem>
              <Strong>Sin coste inicial.</Strong> La visita y el asesoramiento
              son gratuitos.
            </ListItem>

            <ListItem>
              <Strong>Sin presión comercial.</Strong> Te orientamos con
              honestidad y criterio.
            </ListItem>

            <ListItem>
              <Strong>En tienda o en casa.</Strong> Elegimos contigo la mejor
              forma de definir el proyecto.
            </ListItem>
          </List>
          <ContactRow>
            <ContactLink
              href="https://wa.me/34614952856"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("propuestas_guidance")}
            >
              WhatsApp
            </ContactLink>

            <Dot>·</Dot>

            <ContactLink
              href="tel:+34964562357"
              onClick={() => trackPhoneClick("propuestas_guidance")}
            >
              Llamar
            </ContactLink>

            <Dot>·</Dot>

            <ContactLink
              href="mailto:info@traverdecoraciontextil.es"
              onClick={() => trackEmailClick("propuestas_guidance")}
            >
              Email
            </ContactLink>
          </ContactRow>
        </Content>

        {/* RIGHT IMAGE */}
        <MediaPanel>
          <MediaImage
            src={responsiveImages.guidance[800]}
            srcSet={getSrcSet(responsiveImages.guidance)}
            sizes={IMAGE_SIZES}
            alt="Asesoramiento personalizado en decoración textil y propuestas a medida"
            loading="lazy"
            decoding="async"
          />
          <MediaOverlay />
          <MediaBadge>Sin compromiso</MediaBadge>

          <MediaContent>
            <MediaTitle>
              Propuestas pensadas <br />
              contigo.
            </MediaTitle>
            <MediaText>
              En tienda o en tu casa, con criterio real y una propuesta que
              encaje de verdad.
            </MediaText>
          </MediaContent>
        </MediaPanel>
      </Inner>

      {/* BOTTOM DIVIDER */}
      <Divider />
    </Section>
  );
}

/* =========================
   STYLES
========================= */

const Section = styled.section`
  padding: 1rem 0 2.2rem;

  @media (max-width: 768px) {
    padding: 0.6rem 0 3rem;
  }
`;

const Inner = styled.div`
  display: grid;
  gap: 1.6rem;

  @media (min-width: 980px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
    gap: 2.2rem;
    align-items: center; /* ✅ vertical centering */
  }
`;

const Content = styled.div`
  max-width: 60ch;
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
  font-size: clamp(1.95rem, 3vw, 2.6rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: rgba(17, 17, 17, 0.96);

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Lead = styled.p`
  margin: 1rem 0 0;
  max-width: 56ch;
  font-size: 1.04rem;
  line-height: 1.8;
  color: rgba(17, 17, 17, 0.68);
`;

const List = styled.div`
  margin-top: 1.2rem;
  display: grid;
  gap: 0.8rem;
`;

const ListItem = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.62);
`;

const Strong = styled.span`
  color: rgba(17, 17, 17, 0.92);
  font-weight: 800;
`;

/* =========================
   IMAGE PANEL
========================= */

const MediaPanel = styled.div`
  position: relative;
  min-height: 360px;
  border-radius: 28px;
  overflow: hidden;
  background: #151515;
  box-shadow: 0 28px 80px rgba(15, 23, 42, 0.12);

  @media (max-width: 768px) {
    min-height: 300px;
    border-radius: 22px;
  }
`;

const MediaImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MediaOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
      to top,
      rgba(10, 10, 10, 0.78) 10%,
      rgba(10, 10, 10, 0.42) 48%,
      rgba(10, 10, 10, 0.1) 100%
    ),
    linear-gradient(to right, rgba(0, 0, 0, 0.14), rgba(0, 0, 0, 0.04));
`;

const MediaBadge = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;

  padding: 0.38rem 0.75rem;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.92);
  color: rgba(17, 17, 17, 0.74);
  border: 1px solid rgba(17, 17, 17, 0.08);

  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const MediaContent = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;

  @media (min-width: 980px) {
    padding: 1.7rem;
  }
`;

const MediaTitle = styled.h3`
  margin: 0;
  max-width: 13ch;
  font-size: clamp(1.7rem, 2.2vw, 2.2rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: rgba(255, 255, 255, 0.98);
`;

const MediaText = styled.p`
  margin: 0.6rem 0 0;
  max-width: 32ch;
  font-size: 0.98rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.82);
`;

/* =========================
   DIVIDER (BOTTOM)
========================= */

const Divider = styled.div`
  width: min(720px, 100%);
  height: 1px;
  margin: 1.8rem auto 0;
  background: linear-gradient(
    to right,
    transparent,
    rgba(17, 17, 17, 0.12),
    transparent
  );
`;

const ContactRow = styled.div`
  margin-top: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;
`;

const ContactLink = styled.a`
  font-size: 0.95rem;
  font-weight: 700;
  color: rgba(17, 17, 17, 0.68);
  text-decoration: none;
  position: relative;
  transition: color 180ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  /* subtle underline animation */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0%;
    height: 1px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 200ms ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const Dot = styled.span`
  color: rgba(17, 17, 17, 0.35);
  font-weight: 500;
`;
