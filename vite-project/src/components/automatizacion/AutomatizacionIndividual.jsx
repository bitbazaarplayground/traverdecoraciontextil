// AutomatizacionIndividual.jsx
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
// IMAGES
import persianasImg from "../../assets/Automatizacion/benefit1.png";
import { default as cortinasImg } from "../../assets/Automatizacion/domotica1.png";
import toldosImg from "../../assets/Automatizacion/smartHom2.png";
// import persianasImg from "../../assets/Automatizacion/cortinaMotorizada.mp4";
/* =========================
   AUTOMATIZACION INDIVIDUAL
   Editorial · Light canvas · Premium
========================= */

export default function AutomatizacionIndividual({
  images = {},
  contactTo = "/contact",
}) {
  const location = useLocation();

  const sections = useMemo(
    () => [
      {
        id: "cortinas",
        title: "Cortinas & estores",
        lead: "Caída perfecta, silencio absoluto y control preciso de la luz interior.",
        paragraph:
          "Una automatización bien hecha no se nota: simplemente mejora tu día. Tejidos y caída impecable, motores discretos y un control suave que se integra con tu estilo.",
        price: "Desde 890€",
        availability:
          "Disponibilidad: pocas plazas de instalación esta semana.",
        bullets: [
          "Motor silencioso y ajuste fino",
          "Control por mando / app (según sistema)",
          "Instalación y puesta en marcha incluidas",
          "Garantía y soporte post-instalación",
        ],
        cta: "Pedir propuesta para cortinas",
        imageSrc: cortinasImg,

        imageAlt: "Cortinas y estores motorizados en salón luminoso",
      },
      {
        id: "persianas",
        title: "Persianas & screens",
        lead: "Control solar, privacidad y confort térmico sin renunciar al diseño.",
        paragraph:
          "El screen es la solución más equilibrada cuando quieres luz bonita sin deslumbramiento. Con automatización, tu casa se adapta con naturalidad.",
        price: "Desde 990€",
        availability:
          "Recomendado instalar antes de los meses de mayor exposición solar.",
        bullets: [
          "Tejido técnico screen (según elección)",
          "Movimiento suave y preciso",
          "Escenas día / noche / ausencia",
          "Instalación y configuración incluidas",
        ],
        cta: "Pedir propuesta para screens",
        imageSrc: persianasImg,
        imageAlt: "Screen enrollable con luz suave y diseño limpio",
      },
      {
        id: "toldos",
        title: "Toldos & exterior",
        lead: "Protección inteligente con sensores de sol, viento y clima.",
        paragraph:
          "En exterior, automatizar es proteger. El toldo se adapta al clima, se resguarda automáticamente y mantiene la terraza confortable sin intervención.",
        price: "Desde 1.390€",
        availability: "Temporada alta: agenda de instalación limitada.",
        bullets: [
          "Toldo motorizado + mando",
          "Sensores de sol y viento",
          "Protecciones y límites calibrados",
          "Instalación segura y pruebas finales",
        ],
        cta: "Pedir propuesta para toldos",
        imageSrc: toldosImg,
        imageAlt: "Toldo motorizado en terraza exterior elegante",
      },
    ],
    [images]
  );

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (!hash) return;
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
  }, [location.hash]);

  return (
    <Page>
      <Hero>
        <HeroInner>
          <MicroLine>
            Automatización · Decoración textil · Protección solar
          </MicroLine>

          <HeroTitle>Elige por interés.</HeroTitle>
          <HeroScript>
            Nosotros lo dejamos <em>perfecto</em>.
          </HeroScript>

          <HeroP>
            Cortinas, screens o toldos con una propuesta clara, instalación
            profesional y un resultado que se siente desde el primer día.
          </HeroP>

          <Nav>
            {sections.map((s) => (
              <NavLink key={s.id} href={`#${s.id}`}>
                {s.title}
                <ChevronDown />
              </NavLink>
            ))}
          </Nav>

          <SoftTrust>
            Instalación incluida · Configuración guiada · Garantía · Soporte
          </SoftTrust>
        </HeroInner>
      </Hero>

      <Main>
        {sections.map((s, idx) => (
          <Section key={s.id} id={s.id}>
            <Grid $flip={idx % 2 === 1}>
              <Media>
                <Img src={s.imageSrc} alt={s.imageAlt} />
              </Media>

              <Content>
                <Kicker>Precio orientativo</Kicker>
                <H2>{s.title}</H2>
                <Lead>{s.lead}</Lead>
                <Text>{s.paragraph}</Text>

                <PriceRow>
                  <Price>{s.price}</Price>
                  <Availability>{s.availability}</Availability>
                </PriceRow>

                <Offer>
                  <OfferTitle>Qué incluye</OfferTitle>
                  <List>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </List>

                  <Actions>
                    <Primary
                      to={contactTo}
                      state={{
                        from: "/automatizacion/individual",
                        focus: s.id,
                      }}
                    >
                      {s.cta}
                      <ArrowRight />
                    </Primary>
                  </Actions>

                  <FinePrint>
                    *El precio final depende de medidas, tejidos y número de
                    motores.
                  </FinePrint>
                </Offer>
              </Content>
            </Grid>
          </Section>
        ))}
      </Main>
    </Page>
  );
}

/* =========================
   STYLES — LIGHT EDITORIAL
========================= */

const Page = styled.div`
  background: radial-gradient(
      1200px 600px at 50% 0%,
      rgba(255, 255, 255, 0.04),
      transparent 60%
    ),
    #f5f4f2;

  color: #1c1c1c;

  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial,
    "Helvetica Neue", sans-serif;
`;

const Hero = styled.header`
  padding: clamp(3.5rem, 6vw, 5.5rem) 0 2rem;
`;

const HeroInner = styled.div`
  width: min(1120px, calc(100% - 2.4rem));
  margin: 0 auto;
`;

const MicroLine = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.28em;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0 0 1rem;
`;

const HeroTitle = styled.h1`
  font-family: "Cormorant Garamond", serif;
  font-weight: 300;
  text-transform: uppercase;
  font-size: clamp(2.2rem, 5vw, 4.2rem);
  margin: 0;
`;

const HeroScript = styled.div`
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: clamp(1.6rem, 3.6vw, 3rem);

  em {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const HeroP = styled.p`
  max-width: 70ch;
  margin-top: 1rem;
  color: rgba(0, 0, 0, 0.7);
  line-height: 1.7;
`;

const Nav = styled.nav`
  margin-top: 1.4rem;
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const NavLink = styled.a`
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.06);
  color: #1c1c1c;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const SoftTrust = styled.p`
  margin-top: 1.2rem;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.55);
`;

const Main = styled.main`
  padding-bottom: 4rem;
`;

const Section = styled.section`
  scroll-margin-top: 96px;
  padding: 3rem 0;
`;

const Grid = styled.div`
  width: min(1120px, calc(100% - 2.4rem));
  margin: 0 auto;
  display: grid;
  gap: 1.6rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: center;

    ${(p) =>
      p.$flip &&
      `
      direction: rtl;
      & > * { direction: ltr; }
    `}
  }
`;

const Media = styled.div`
  border-radius: 28px;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* 👈 instead of cover */
  padding: 1.5rem;
`;

const Content = styled.div``;

const Kicker = styled.div`
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.55);
`;

const H2 = styled.h2`
  font-family: "Cormorant Garamond", serif;
  font-weight: 300;
  text-transform: uppercase;
  margin: 0.7rem 0 0;
`;

const Lead = styled.p`
  margin-top: 0.6rem;
  font-size: 1.05rem;
`;

const Text = styled.p`
  margin-top: 0.7rem;
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.75;
`;

const PriceRow = styled.div`
  margin-top: 1.1rem;
`;

const Price = styled.div`
  font-size: 0.9rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const Availability = styled.div`
  margin-top: 0.3rem;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.55);
`;

const Offer = styled.div`
  margin-top: 1.4rem;
  padding: 1.2rem;
  border-radius: 22px;
  background: rgba(0, 0, 0, 0.05);
`;

const OfferTitle = styled.h3`
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin: 0;
`;

const List = styled.ul`
  margin: 0.8rem 0 0;
  padding-left: 1.1rem;
`;

const Actions = styled.div`
  margin-top: 1.1rem;
`;

const Primary = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.2rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  text-decoration: none;
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const FinePrint = styled.p`
  margin-top: 0.8rem;
  font-size: 0.82rem;
  color: rgba(0, 0, 0, 0.45);
`;
