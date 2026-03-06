// src/components/ventanas/ComplementosVentana.jsx
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/* default responsive images */
import domotica320 from "../../assets/Automatizacion/heroB-320.webp";
import domotica640 from "../../assets/Automatizacion/heroB-640.webp";
import domotica960 from "../../assets/Automatizacion/heroB-960.webp";

import panel320 from "../../assets/panelJapones/bedroomDarkPanel-320.webp";
import panel640 from "../../assets/panelJapones/bedroomDarkPanel-640.webp";
import panel960 from "../../assets/panelJapones/bedroomDarkPanel-960.webp";

import mosquitera320 from "../../assets/servicios/mosquiteras/mosquiteraPatio-320.webp";
import mosquitera640 from "../../assets/servicios/mosquiteras/mosquiteraPatio-640.webp";
import mosquitera960 from "../../assets/servicios/mosquiteras/mosquiteraPatio-960.webp";

import venecianas320 from "../../assets/venecianas/oficina2-320.webp";
import venecianas640 from "../../assets/venecianas/oficina2-640.webp";
import venecianas960 from "../../assets/venecianas/oficina2-960.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: "easeOut" },
  }),
};

const STORAGE_KEY = "scroll-positions:v4";

const saveScrollNow = () => {
  try {
    const store = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    const key =
      window.location.pathname + window.location.search + window.location.hash;

    store[key] = window.scrollY;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {}
};

const DEFAULT_ITEMS = [
  {
    title: "Panel japonés",
    desc: "Ideal para puertas correderas y grandes ventanales.",
    img: {
      src: panel640,
      srcSet: `${panel320} 320w, ${panel640} 640w, ${panel960} 960w`,
      width: 278,
      height: 185,
      alt: "Panel japonés en dormitorio",
    },
    to: "/panel-japones",
  },
  {
    title: "Venecianas",
    desc: "Control solar preciso con privacidad regulable.",
    img: {
      src: venecianas640,
      srcSet: `${venecianas320} 320w, ${venecianas640} 640w, ${venecianas960} 960w`,
      width: 267,
      height: 178,
      alt: "Venecianas en oficina",
    },
    to: "/venecianas",
  },
  {
    title: "Automatización",
    desc: "Sistemas motorizados y control inteligente del hogar.",
    img: {
      src: domotica640,
      srcSet: `${domotica320} 320w, ${domotica640} 640w, ${domotica960} 960w`,
      width: 267,
      height: 178,
      alt: "Automatización del hogar",
    },
    to: "/automatizacion",
  },
  {
    title: "Mosquiteras",
    desc: "Ventila sin insectos. Discretas y resistentes.",
    img: {
      src: mosquitera640,
      srcSet: `${mosquitera320} 320w, ${mosquitera640} 640w, ${mosquitera960} 960w`,
      width: 267,
      height: 178,
      alt: "Mosquitera instalada en ventana",
    },
    to: "/mosquiteras",
  },
];

function normalizeImage(img, fallbackAlt = "") {
  if (!img) {
    return {
      src: "",
      srcSet: undefined,
      sizes: undefined,
      width: undefined,
      height: undefined,
      alt: fallbackAlt,
    };
  }

  if (typeof img === "string") {
    return {
      src: img,
      srcSet: undefined,
      sizes: undefined,
      width: undefined,
      height: undefined,
      alt: fallbackAlt,
    };
  }

  const hasSrcSet = Boolean(img.srcSet);

  return {
    src: img.src || "",
    srcSet: img.srcSet,
    sizes:
      img.sizes ||
      (hasSrcSet
        ? "(max-width: 768px) 82vw, (max-width: 1120px) 25vw, 260px"
        : undefined),
    width: img.width,
    height: img.height,
    alt: img.alt || fallbackAlt,
  };
}

export default function ComplementosVentana({
  id = "sistemas",
  items = DEFAULT_ITEMS,
  title = (
    <>
      Otros productos <span>para tu ventana</span>
    </>
  ),
  lead = "Complementos que combinan para dejar el conjunto perfecto.",
}) {
  return (
    <Section id={id} aria-label="Accesos rápidos a otros productos">
      <Container>
        <Top>
          <Heading>
            <Kicker>Accesos rápidos</Kicker>
            <Title>{title}</Title>
            <Lead>{lead}</Lead>
          </Heading>

          <Hint>
            Desliza en móvil <span aria-hidden="true">→</span>
          </Hint>
        </Top>

        <Cards
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {items.map((item, i) => {
            const image = normalizeImage(item.img, item.title);

            return (
              <Card
                key={item.to || item.title}
                as={motion.div}
                variants={fadeUp}
                custom={i}
              >
                <CardLink
                  to={item.to}
                  aria-label={`Ver ${item.title}`}
                  onClick={saveScrollNow}
                >
                  <Media>
                    <Img
                      src={image.src}
                      srcSet={image.srcSet}
                      sizes={image.sizes}
                      width={image.width}
                      height={image.height}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    <Overlay />
                  </Media>

                  <Body>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDesc>{item.desc}</CardDesc>

                    <More>
                      Ver más <ArrowRight size={16} />
                    </More>
                  </Body>

                  <Sheen aria-hidden="true" />
                </CardLink>
              </Card>
            );
          })}
        </Cards>
      </Container>
    </Section>
  );
}

/* =========================
   STYLES
========================= */

const Section = styled.section`
  padding: clamp(2.4rem, 4.2vw, 3.4rem) 0;
  background: #fff;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
`;

const Container = styled.div`
  width: min(1120px, calc(100% - 3rem));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(1120px, calc(100% - 2rem));
  }
`;

const Top = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.35rem;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 1.1rem;
  }
`;

const Heading = styled.div`
  max-width: 860px;
`;

const Kicker = styled.p`
  margin: 0 0 0.55rem 0;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-size: 0.82rem;
  color: rgba(17, 17, 17, 0.55);
  position: relative;
  display: inline-block;
  padding-bottom: 0.55rem;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0.1rem;
    width: 48px;
    height: 1px;
    background: rgba(196, 151, 98, 0.65);
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 2.15rem;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: rgba(17, 17, 17, 0.96);

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const Hint = styled.p`
  margin: 0;
  font-size: 0.92rem;
  color: rgba(17, 17, 17, 0.55);

  span {
    display: inline-block;
    transform: translateY(1px);
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const Lead = styled.p`
  margin: 0.75rem 0 0;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.62);
  max-width: 70ch;
`;

const Cards = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.9rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: unset;
    display: flex;
    gap: 0.85rem;
    overflow-x: auto;
    padding-bottom: 0.35rem;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Card = styled.div`
  @media (max-width: 768px) {
    min-width: min(82vw, 360px);
    scroll-snap-align: start;
  }
`;

const CardLink = styled(Link)`
  position: relative;
  display: block;
  border-radius: 18px;
  overflow: hidden;
  text-decoration: none;

  border: 1px solid rgba(17, 17, 17, 0.1);
  background: #fff;
  box-shadow: 0 12px 30px rgba(17, 17, 17, 0.06);

  transition: transform 220ms ease, box-shadow 220ms ease,
    border-color 220ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 44px rgba(17, 17, 17, 0.09);
    border-color: rgba(17, 17, 17, 0.14);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1), 0 12px 30px rgba(17, 17, 17, 0.06);
  }
`;

const Media = styled.div`
  position: relative;
  height: 130px;
  background: #f4f4f4;

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform 700ms ease;

  ${CardLink}:hover & {
    transform: scale(1.06);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.22));
`;

const Body = styled.div`
  padding: 0.95rem 0.95rem 1.05rem;
  display: grid;
  gap: 0.35rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  color: rgba(17, 17, 17, 0.95);
`;

const CardDesc = styled.p`
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: rgba(17, 17, 17, 0.62);
`;

const More = styled.div`
  margin-top: 0.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  font-weight: 800;
  font-size: 0.92rem;
  color: rgba(17, 17, 17, 0.9);

  svg {
    transition: transform 200ms ease;
  }

  ${CardLink}:hover & svg {
    transform: translateX(3px);
  }
`;

const Sheen = styled.div`
  position: absolute;
  inset: -40% -60%;
  background: linear-gradient(
    120deg,
    transparent 35%,
    rgba(255, 255, 255, 0.32) 45%,
    transparent 55%
  );
  transform: translateX(-30%) rotate(10deg);
  opacity: 0;
  pointer-events: none;
  transition: opacity 250ms ease;

  ${CardLink}:hover & {
    opacity: 1;
    animation: sheenMove 900ms ease forwards;
  }

  @keyframes sheenMove {
    from {
      transform: translateX(-30%) rotate(10deg);
    }
    to {
      transform: translateX(30%) rotate(10deg);
    }
  }
`;
