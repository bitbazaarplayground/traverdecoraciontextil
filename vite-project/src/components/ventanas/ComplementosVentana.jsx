// src/components/CortinasEstores/ComplementosVentana.jsx
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/* =========================
   EDITORIAL / SHOWROOM MODULE
   Panel japonés · Verticales · Barras · Rieles
========================= */

/* Subtle, premium motion */
const fade = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const PageSection = styled.section`
  margin-top: 3.8rem;
  padding: 0 0 0;
`;

/* Header */
const Header = styled(motion.div)`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.25rem 1.8rem;

  @media (max-width: 768px) {
    padding: 0 1.1rem 1.35rem;
  }
`;

const Kicker = styled.p`
  margin: 0 0 0.6rem 0;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: rgba(17, 17, 17, 0.55);
`;

const Title = styled.h2`
  margin: 0 0 0.85rem 0;

  /* requested editorial scale */
  font-size: 2.3rem;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;

  color: #121212;

  @media (max-width: 768px) {
    font-size: 1.85rem;
  }
`;

const Lead = styled.p`
  margin: 0;
  max-width: 72ch;
  font-size: 1.05rem;
  line-height: 1.75;
  color: #121212;
`;

/* Grid of features (full-width feel but aligned with your site) */
const Rail = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.25rem;

  display: grid;
  gap: 1.4rem;

  @media (max-width: 768px) {
    padding: 0 1.1rem;
    gap: 1.1rem;
  }
`;

const Feature = styled(motion.article)`
  border-radius: 26px;
  overflow: hidden;

  background: rgba(255, 255, 255, 0.035);
  outline: 1px solid rgba(255, 255, 255, 0.085);
  outline-offset: -1px;

  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.45);
`;

const FeatureInner = styled.div`
  display: grid;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: stretch;

    /* alternate layout */
    direction: ${({ $reverse }) => ($reverse ? "rtl" : "ltr")};
  }
`;

const Media = styled.div`
  position: relative;
  min-height: 320px;
  background: #0b0c0f;

  @media (min-width: 980px) {
    min-height: 420px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;

  transform: scale(1.02);
  filter: saturate(1.02) contrast(1.04);
`;

const MediaOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  background: radial-gradient(
      700px 420px at 18% 20%,
      rgba(229, 0, 126, 0.12),
      transparent 55%
    ),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.52));
`;

const Copy = styled.div`
  direction: ltr;
  padding: 1.35rem 1.35rem 1.25rem;

  @media (min-width: 980px) {
    padding: 1.65rem 1.7rem;
  }
`;

const Label = styled.p`
  margin: 0 0 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: rgba(17, 17, 17, 0.8);
`;

const H3 = styled.h3`
  margin: 0 0 0.7rem;
  font-size: clamp(1.35rem, 2vw, 1.75rem);
  font-weight: 650;
  letter-spacing: -0.01em;
  color: #121212;
`;

const Text = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.75;
  color: #121212;
  max-width: 62ch;
`;

/* Premium “use cases” row */
const UseCases = styled.div`
  margin-top: 1.1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.55rem 0.75rem;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.06);
  outline: 1px solid rgba(255, 255, 255, 0.1);
  outline-offset: -1px;

  color: #121212;
  font-weight: 600;
  font-size: 0.9rem;
`;

/* Small “luxury” line at bottom of each feature */
const Note = styled.p`
  margin: 1rem 0 0;
  color: #121212;
  font-size: 0.92rem;
  line-height: 1.6;
`;
const MoreLink = styled(Link)`
  margin-top: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  font-weight: 800;
  text-decoration: none;

  /* feels premium */
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.72rem;

  color: rgba(17, 17, 17, 0.78);

  opacity: 0.9;
  transition: transform 0.2s ease, opacity 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
    opacity: 0.85;
  }

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }
`;

/* CTA (keep your copy) */
const BottomCTA = styled.div`
  max-width: 1200px;
  margin: 1.6rem auto 0;
  padding: 0 1.25rem;

  @media (max-width: 768px) {
    padding: 0 1.1rem;
  }
`;

const CTACard = styled(motion.div)`
  border-radius: 26px;
  overflow: hidden;

  background: radial-gradient(
      1100px 520px at 15% 0%,
      rgba(229, 0, 126, 0.14),
      transparent 55%
    ),
    rgba(255, 255, 255, 0.04);

  outline: 1px solid rgba(255, 255, 255, 0.09);
  outline-offset: -1px;

  padding: 1.2rem 1.2rem;

  display: grid;
  gap: 0.9rem;

  @media (min-width: 900px) {
    grid-template-columns: 1.15fr 0.85fr;
    align-items: center;
    padding: 1.3rem 1.35rem;
  }
`;

const CTAContent = styled.div``;

const CTATitle = styled.p`
  margin: 0;
  font-weight: 700;
  color: #0b0c0f;
  letter-spacing: -0.01em;
  font-size: 1.05rem;
`;

const CTAText = styled.p`
  margin: 0.4rem 0 0;
  color: gray;
  line-height: 1.7;
  font-size: 0.96rem;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (min-width: 900px) {
    justify-content: flex-end;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;

  padding: 0.9rem 1.35rem;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;

  font-weight: 800;
  text-decoration: none;
  letter-spacing: 0.04em;

  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.95;
  }
`;

const SecondaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.9rem 1.25rem;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.06);
  outline: 1px solid rgba(255, 255, 255, 0.12);
  outline-offset: -1px;

  color: rgba(244, 244, 245, 0.92);
  font-weight: 700;
  text-decoration: none;

  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.09);
  }
`;

/* ======= PLACEHOLDER IMAGES =======
   Replace these with your real assets later.
   (Use your own imports if you prefer.)
=================================== */
const placeholder1 =
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2000&q=70";
const placeholder2 =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=70";
const placeholder3 =
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=70";
const placeholder4 =
  "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=2000&q=70";

export default function ComplementosVentana({
  id = "sistemas",
  whatsapp = "https://wa.me/34647856817",
}) {
  const features = [
    {
      label: "Sistema",
      title: "Panel japonés · Verticales",
      text: "Paneles deslizantes con estética editorial. Ideal para puertas correderas, grandes ventanales y espacios donde la arquitectura manda.",
      tags: ["Ventanales", "Puertas correderas", "Separador de ambientes"],
      note: "Recomendado cuando buscas un acabado de revista con líneas rectas y presencia.",
      img: placeholder1,
      alt: "Panel japonés en ventanal moderno",
      moreTo: "/panel-japones",
    },
    {
      label: "Sistema",
      title: "Venecianas",
      text: "Control solar preciso y privacidad regulable. Un look contemporáneo que funciona especialmente bien en oficinas, estudios y salones luminosos.",
      tags: ["Control de luz", "Privacidad", "Grandes superficies"],
      note: "Perfectas si necesitas ajustar luz y vistas con mucha precisión a lo largo del día.",
      img: placeholder2,
      alt: "Cortinas venecianas en salón contemporáneo",
      reverse: true,
      moreTo: "/venecianas",
    },
    {
      label: "Acabados",
      title: "Barras · Rieles",
      text: "La opción más decorativa. Selección de acabados premium (negro mate, latón, acero o madera) con soportes discretos y proporción perfecta.",
      tags: ["Decoración", "Acabados premium", "Look editorial"],
      note: "Cuando el herraje también forma parte del diseño (y se nota).",
      img: placeholder3,
      alt: "Barra de cortina premium con acabado elegante",
    },
    {
      label: "Precisión",
      title: "Rieles",
      text: "El detalle que cambia el resultado: deslizamiento suave, caída correcta y un conjunto impecable. Discretos, silenciosos y duraderos.",
      tags: ["Silencio", "Deslizamiento", "Instalación limpia"],
      note: "La elección cuando quieres que todo se vea perfecto… y se sienta aún mejor.",
      img: placeholder4,
      alt: "Riel de cortina instalado con acabado discreto",
      reverse: true,
    },
  ];

  return (
    <PageSection
      id={id}
      aria-label="Venecianas, panel japonés, barras y rieles"
    >
      <Header
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.div variants={fade}>
          <Kicker>Sistemas</Kicker>
          <Title>Venecianas, paneles japoneses, rieles y barras</Title>
          <Lead>
            No es “un accesorio”. Es el sistema que define la caída, la luz y la
            sensación final. Te ayudamos a elegir el formato correcto para tu
            espacio — con criterio de interiorismo.
          </Lead>
        </motion.div>
      </Header>

      <Rail>
        {features.map((f) => (
          <Feature
            key={f.title}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.28 }}
          >
            <FeatureInner $reverse={f.reverse}>
              <Media>
                <Img src={f.img} alt={f.alt} loading="lazy" />
                <MediaOverlay />
              </Media>

              <Copy>
                <Label>{f.label}</Label>
                <H3>{f.title}</H3>
                <Text>{f.text}</Text>

                <UseCases>
                  {f.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </UseCases>

                <Note>{f.note}</Note>
                {f.moreTo ? (
                  <MoreLink to={f.moreTo}>
                    Ver más <ArrowRight />
                  </MoreLink>
                ) : null}
              </Copy>
            </FeatureInner>
          </Feature>
        ))}
      </Rail>

      <BottomCTA>
        <CTACard
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <CTAContent>
            <CTATitle>
              ¿Te aconsejamos el sistema ideal para tu ventana?
            </CTATitle>
            <CTAText>
              Medimos, proponemos y lo dejamos instalado con acabado impecable.
              Sin compromiso.
            </CTAText>
          </CTAContent>

          <CTAButtons>
            <CTAButton to="/contact">
              Solicitar asesoramiento <ArrowRight size={18} />
            </CTAButton>
            <SecondaryBtn href={whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </SecondaryBtn>
          </CTAButtons>
        </CTACard>
      </BottomCTA>
    </PageSection>
  );
}
