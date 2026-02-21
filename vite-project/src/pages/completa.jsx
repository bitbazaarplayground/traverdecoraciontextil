// src/pages/completa.jsx
import { useMemo, useState } from "react";
import styled, { css } from "styled-components";

import domoticaImg from "../assets/Automatizacion/domoticaInd.webp";
import heroImg from "../assets/Automatizacion/heroB.webp";
// OJO: revisa el nombre real del archivo:
import packImg from "../assets/Automatizacion/smartHom1.webp";

import {
  Accent,
  BadgePrimary,
  ButtonDark,
  ButtonGhost,
  ButtonPrimary,
  Card,
  Chip,
  Container,
  Dot,
  Fine,
  Glass,
  H1,
  H2,
  Icon,
  P,
  PillLink,
  PillPrimary,
  Section,
  SectionTight,
  Tick,
  TickList,
  Underline,
} from "../styles/ui";

const PACKS = [
  {
    id: "core",
    name: "Core Residence",
    subtitle: "Para 2–3 dormitorios (lo más típico)",
    price: "Desde 1.200 €",
    emphasis: "popular",
    bullets: [
      "3 estores motorizados + mando",
      "3 cortinas motorizadas + mando",
      "Instalación + programación básica",
      "Explicación de uso al cliente",
    ],
    note: "El precio final se ajusta por medidas, tejido, motor y marca.",
  },
  {
    id: "toldos",
    name: "Pack Toldos Smart",
    subtitle: "Para terraza / balcón",
    price: "Desde 1.100 €",
    emphasis: "normal",
    bullets: [
      "1 toldo motorizado + mando",
      "Sensores opcionales (viento/sol) como extra",
      "Instalación + puesta en marcha",
      "Bundle: añade Core Residence por +1.000 €",
    ],
    note: "El precio final se ajusta por medidas, tejido, motor y marca.",
  },
  {
    id: "full",
    name: "Full Smart Home",
    subtitle: "Vivienda completa (premium claro)",
    price: "Desde 2.600–3.200 €",
    emphasis: "top",
    bullets: [
      "4–6 estores/roller motorizados",
      "4–6 cortinas motorizadas",
      "1 toldo motorizado",
      "Centralización (1 mando/escenas)",
      "Programación avanzada (horarios/escenas)",
    ],
    note: "Rango orientativo: ajustamos por medidas, tejido, motor y marca.",
  },
];

const INCLUDES = [
  {
    title: "Medición y asesoría",
    desc: "Vamos a tu casa, medimos y te recomendamos la solución ideal por estancia.",
  },
  {
    title: "Instalación profesional",
    desc: "Montaje limpio y seguro. Sin complicaciones: lo hacemos por ti.",
  },
  {
    title: "Programación",
    desc: "Básica o avanzada según pack: horarios, escenas y centralización si procede.",
  },
  {
    title: "Puesta en marcha",
    desc: "Te lo dejamos funcionando y probado, con explicaciones claras.",
  },
  {
    title: "Garantía y soporte",
    desc: "Acompañamiento tras instalar: si hay algo, respondemos y lo resolvemos.",
  },
  {
    title: "Acabado premium",
    desc: "Cables ordenados, remates bien hechos y estética cuidada.",
  },
];

const EXTRAS = [
  "Sensores viento/sol/lluvia",
  "Control desde móvil (según marca)",
  "Integración con asistentes (si procede)",
  "Motores premium silenciosos",
];

const FAQ = [
  {
    q: "¿Cuánto cuesta automatizar una casa?",
    a: "Depende del número de estores/cortinas/toldos, medidas, tejido y motor. Por eso trabajamos con packs “desde” y ajustamos tras medición.",
  },
  {
    q: "¿Qué incluye la automatización completa?",
    a: "Medición, instalación, programación (básica o avanzada según pack), puesta en marcha y explicación. Además, garantía y soporte.",
  },
  {
    q: "¿Es complicado usarlo?",
    a: "No. Te lo dejamos configurado y te enseñamos: mandos, escenas y horarios. Si quieres, también control desde móvil (según marca).",
  },
  {
    q: "¿Merece la pena frente a opciones tipo Leroy/Merlin?",
    a: "La diferencia suele estar en ajuste a medida, tejidos/motores, instalación profesional, programación real (escenas/horarios) y soporte posterior.",
  },
];

function encodeWhatsApp(message) {
  return encodeURIComponent(message);
}

export default function Completa() {
  const [openFaq, setOpenFaq] = useState(0);

  const waMessage = useMemo(() => {
    return encodeWhatsApp(
      "Hola 👋 Quiero automatizar mi casa. Me interesa un pack y me gustaría pedir una visita para medición. ¿Podemos hablar?"
    );
  }, []);

  // ✅ Pon tu número real: sin + y sin espacios. Ej: 346XXXXXXXX
  const WHATSAPP_NUMBER = "34XXXXXXXXX";
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <Page>
      {/* HERO */}
      <Hero>
        <HeroBg aria-hidden="true">
          <HeroImg src={heroImg} alt="" />
          <HeroOverlay />
        </HeroBg>

        <Container>
          <HeroGrid>
            <HeroCopy>
              <BadgePrimary>
                <Dot /> Automatización Completa • Packs cerrados “desde”
              </BadgePrimary>

              <H1>
                Motoriza tu casa <Underline>sin líos</Underline>. <br />
                Un acabado <Accent>perfecto</Accent>, como debe ser.
              </H1>

              <Lead>
                Precios claros, instalación profesional y programación. Tú
                eliges el pack, nosotros lo dejamos listo y bien integrado en tu
                decoración.
              </Lead>

              <HeroActions>
                <a href={waHref} target="_blank" rel="noreferrer">
                  <ButtonPrimary>
                    <Icon>💬</Icon> WhatsApp: pedir visita
                  </ButtonPrimary>
                </a>

                <a href="#packs">
                  <ButtonGhost>
                    <Icon>📦</Icon> Ver packs
                  </ButtonGhost>
                </a>
              </HeroActions>

              <HeroProof as={Card}>
                <ProofItem>
                  <ProofTitle>Medimos</ProofTitle>
                  <ProofSub>en tu vivienda</ProofSub>
                </ProofItem>
                <ProofSep />
                <ProofItem>
                  <ProofTitle>Instalamos</ProofTitle>
                  <ProofSub>limpio y seguro</ProofSub>
                </ProofItem>
                <ProofSep />
                <ProofItem>
                  <ProofTitle>Programamos</ProofTitle>
                  <ProofSub>y te lo explicamos</ProofSub>
                </ProofItem>
              </HeroProof>
            </HeroCopy>

            {/* HERO EDITORIAL CARD */}
            <HeroCard>
              <HeroCardInner as={Glass}>
                <HeroCardHeader>
                  <Kicker>Selección recomendada</Kicker>
                  <HeroCardTitle>Core Residence</HeroCardTitle>
                  <HeroCardPrice>Desde 1.200 €</HeroCardPrice>
                  <HeroCardLine />
                </HeroCardHeader>

                <HeroCardBody>
                  <MiniList>
                    <li>3 estores + 3 cortinas motorizadas</li>
                    <li>Instalación + programación básica</li>
                    <li>Explicación de uso al cliente</li>
                  </MiniList>

                  <Fine>
                    Ajuste final según medidas, tejido, motor y marca. Lo
                    cerramos tras medición, sin sorpresas.
                  </Fine>

                  <HeroCardActions>
                    <a href={waHref} target="_blank" rel="noreferrer">
                      <ButtonDark>
                        <Icon>✅</Icon> Quiero este pack
                      </ButtonDark>
                    </a>
                    <a href="#includes">
                      <ButtonGhost>
                        <Icon>🧩</Icon> Qué incluye
                      </ButtonGhost>
                    </a>
                  </HeroCardActions>
                </HeroCardBody>
              </HeroCardInner>
            </HeroCard>
          </HeroGrid>
        </Container>
      </Hero>

      {/* PACKS */}
      <Section id="packs">
        <Container>
          <HeaderRow>
            <div>
              <H2>Packs cerrados (muy claros)</H2>
              <Lead>
                Precios “desde” y ajuste por medición. Elegante, directo y
                vendible.
              </Lead>
            </div>

            <RightActions>
              <PillPrimary href={waHref} target="_blank" rel="noreferrer">
                <Icon>💬</Icon> WhatsApp
              </PillPrimary>

              <PillLink href="#cta">
                <Icon>📅</Icon> Pedir visita
              </PillLink>
            </RightActions>
          </HeaderRow>

          <CardsGrid>
            {PACKS.map((p) => (
              <PackCard key={p.id} $emphasis={p.emphasis} as={Card}>
                <PackTop>
                  <PackBadges>
                    {p.emphasis === "top" ? (
                      <TopTag>⭐ Top</TopTag>
                    ) : p.emphasis === "popular" ? (
                      <BadgePrimary>🔥 Popular</BadgePrimary>
                    ) : (
                      <NeutralTag>Pack</NeutralTag>
                    )}
                    <SubTag>{p.subtitle}</SubTag>
                  </PackBadges>

                  <PackName>{p.name}</PackName>
                  <PackPrice>{p.price}</PackPrice>
                </PackTop>

                <PackBody>
                  <TickList>
                    {p.bullets.map((b) => (
                      <li key={b}>
                        <Tick>✓</Tick>
                        <span>{b}</span>
                      </li>
                    ))}
                  </TickList>

                  <PackNote>{p.note}</PackNote>

                  <PackCtas>
                    <a href={waHref} target="_blank" rel="noreferrer">
                      <ButtonPrimary>
                        <Icon>💬</Icon> Pedir visita
                      </ButtonPrimary>
                    </a>
                    <a href="#faq">
                      <ButtonGhost>
                        <Icon>❓</Icon> FAQ
                      </ButtonGhost>
                    </a>
                  </PackCtas>
                </PackBody>
              </PackCard>
            ))}
          </CardsGrid>

          {/* EXTRAS */}
          <Extras as={Glass}>
            <ExtrasLeft>
              <ExtrasTitle>Extras (upsell natural)</ExtrasTitle>
              <P>
                Personaliza el resultado final con detalles que se notan en el
                día a día y en el confort.
              </P>

              <ExtrasRow>
                {EXTRAS.map((x) => (
                  <Chip key={x}>{x}</Chip>
                ))}
              </ExtrasRow>
            </ExtrasLeft>

            <ExtrasRight>
              <ImageCard>
                <img src={packImg} alt="Automatización para interior design" />
              </ImageCard>
            </ExtrasRight>
          </Extras>
        </Container>
      </Section>

      {/* INCLUDES */}
      <SectionTight id="includes">
        <Container>
          <Split>
            <SplitLeft>
              <H2>Qué incluye</H2>
              <Lead>
                Para que sea fácil: lo medimos, lo instalamos, lo programamos y
                lo dejamos perfecto.
              </Lead>

              <IncludesGrid>
                {INCLUDES.map((it) => (
                  <IncludeCard key={it.title} as={Card}>
                    <IncludeTitle>{it.title}</IncludeTitle>
                    <IncludeDesc>{it.desc}</IncludeDesc>
                  </IncludeCard>
                ))}
              </IncludesGrid>
            </SplitLeft>

            <SplitRight as={Card}>
              <SideMedia>
                <img src={domoticaImg} alt="Control y automatización" />
              </SideMedia>

              <SideContent>
                <SideTitle>¿Es complicado? Nada.</SideTitle>
                <SideText>
                  Te lo dejamos configurado y te enseñamos a usarlo. El
                  resultado se integra en tu casa — no parece “tech”.
                </SideText>

                <SideBullets>
                  <li>Uso sencillo (mandos y escenas)</li>
                  <li>Programación lista para tu rutina</li>
                  <li>Soporte después de instalar</li>
                </SideBullets>

                <a href={waHref} target="_blank" rel="noreferrer">
                  <ButtonDark>
                    <Icon>📩</Icon> Quiero que me llaméis
                  </ButtonDark>
                </a>

                <Fine>
                  * Control desde móvil e integraciones dependen de la marca
                  elegida.
                </Fine>
              </SideContent>
            </SplitRight>
          </Split>
        </Container>
      </SectionTight>

      {/* FAQ */}
      <SectionTight id="faq">
        <Container>
          <FaqWrap as={Glass}>
            <FaqHeader>
              <div>
                <H2>FAQ</H2>
                <Lead>Dudas típicas (y respuestas claras).</Lead>
              </div>

              <a href={waHref} target="_blank" rel="noreferrer">
                <ButtonPrimary>
                  <Icon>💬</Icon> Preguntar por WhatsApp
                </ButtonPrimary>
              </a>
            </FaqHeader>

            <FaqList>
              {FAQ.map((item, idx) => {
                const open = openFaq === idx;
                return (
                  <FaqItem key={item.q} as={Card}>
                    <FaqButton
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFaq((p) => (p === idx ? -1 : idx))}
                    >
                      <span>{item.q}</span>
                      <Chevron $open={open}>⌄</Chevron>
                    </FaqButton>

                    <FaqAnswer $open={open}>
                      <div>{item.a}</div>
                    </FaqAnswer>
                  </FaqItem>
                );
              })}
            </FaqList>
          </FaqWrap>
        </Container>
      </SectionTight>

      {/* CTA */}
      <SectionTight id="cta">
        <Container>
          <Cta as={Card}>
            <CtaLeft>
              <BadgePrimary>
                <Dot /> Último paso
              </BadgePrimary>

              <CtaTitle>
                Precio real <Underline>tras medición</Underline>.
              </CtaTitle>
              <Lead>
                En una visita tomamos medidas y preparamos una propuesta
                ajustada a tu vivienda (sin sorpresas).
              </Lead>

              <CtaButtons>
                <a href={waHref} target="_blank" rel="noreferrer">
                  <ButtonPrimary>
                    <Icon>💬</Icon> Pedir visita
                  </ButtonPrimary>
                </a>
                <a href="#packs">
                  <ButtonGhost>
                    <Icon>⬆️</Icon> Ver packs
                  </ButtonGhost>
                </a>
              </CtaButtons>

              <CtaFoot>
                <span>🧵</span> Tejidos a medida · <span>🛠️</span> Instalación
                premium · <span>✅</span> Todo listo
              </CtaFoot>
            </CtaLeft>

            <CtaRight>
              <Stat>
                <StatNum>3</StatNum>
                <StatLabel>Packs</StatLabel>
              </Stat>
              <Stat>
                <StatNum>“Desde”</StatNum>
                <StatLabel>Sin encorsetar</StatLabel>
              </Stat>
              <Stat>
                <StatNum>Traver</StatNum>
                <StatLabel>Acabado editorial</StatLabel>
              </Stat>
            </CtaRight>
          </Cta>
        </Container>
      </SectionTight>

      {/* Sticky CTA móvil */}
      <Sticky>
        <Container>
          <StickyInner as={Glass}>
            <StickyText>
              <strong>¿Te encaja?</strong>
              <span>Pide visita y medimos.</span>
            </StickyText>

            <StickyActions>
              <a href={waHref} target="_blank" rel="noreferrer">
                <StickyBtn $tone="primary">
                  <span>💬</span> WhatsApp
                </StickyBtn>
              </a>
              <a href="#cta">
                <StickyBtn $tone="dark">
                  <span>📅</span> Visita
                </StickyBtn>
              </a>
            </StickyActions>
          </StickyInner>
        </Container>
      </Sticky>
    </Page>
  );
}

/* ======================= STYLES (editorial / magazine) ======================= */

const Page = styled.div`
  position: relative;
`;

/* HERO */
const Hero = styled.header`
  position: relative;
  padding: 78px 0 34px;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 108px 0 54px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const HeroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.03) contrast(1.02);
  transform: scale(1.02);
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.78) 0%,
      rgba(255, 255, 255, 0.92) 46%,
      rgba(255, 255, 255, 1) 100%
    ),
    radial-gradient(
      900px 360px at 18% 18%,
      rgba(229, 0, 126, 0.12),
      transparent 60%
    );
`;

/* Layout */
const HeroGrid = styled.div`
  position: relative;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1.06fr 0.94fr;
    align-items: center;
    gap: 28px;
  }
`;

const HeroCopy = styled.div`
  display: grid;
  gap: 14px;
`;

const HeroActions = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 6px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const HeroProof = styled.div`
  margin-top: 12px;
  padding: 14px 14px;
  border-radius: ${({ theme }) => theme.radii.lg};
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr auto 1fr auto 1fr;
    align-items: center;
    gap: 14px;
  }
`;

const ProofItem = styled.div`
  display: grid;
  gap: 2px;
`;

const ProofTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letter.normal};
`;

const ProofSub = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
`;

const ProofSep = styled.div`
  display: none;
  width: 1px;
  height: 34px;
  background: ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

/* Hero Card */
const HeroCard = styled.div`
  display: grid;
`;

const HeroCardInner = styled.div`
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
`;

const HeroCardHeader = styled.div`
  padding: 18px 18px 10px;
`;

const Kicker = styled.div`
  font-family: ${({ theme }) => theme.typography.font.accent};
  font-style: italic;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.muted};
`;

const HeroCardTitle = styled.div`
  margin-top: 8px;
  font-weight: ${({ theme }) => theme.typography.weight.black};
  letter-spacing: ${({ theme }) => theme.typography.letter.tight};
  font-size: 30px;
`;

const HeroCardPrice = styled.div`
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
`;

const HeroCardLine = styled.div`
  margin-top: 12px;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
`;

const HeroCardBody = styled.div`
  padding: 14px 18px 18px;
  display: grid;
  gap: 12px;
`;

const MiniList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: ${({ theme }) => theme.typography.line.relaxed};
`;

const HeroCardActions = styled.div`
  display: grid;
  gap: 10px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`;

/* Header Row */
const HeaderRow = styled.div`
  display: grid;
  gap: 16px;
  align-items: end;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr auto;
  }
`;

const RightActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-end;
  }
`;

/* Cards grid */
const CardsGrid = styled.div`
  margin-top: 18px;
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }
`;

const PackCard = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  transition: transform 180ms ease, box-shadow 180ms ease,
    border-color 180ms ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow.md};
    border-color: rgba(229, 0, 126, 0.18);
  }
`;

const PackTop = styled.div`
  padding: 16px 16px 14px;
  background: radial-gradient(
      520px 240px at 20% 0%,
      rgba(229, 0, 126, 0.1),
      transparent 65%
    ),
    rgba(255, 255, 255, 0.55);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PackBadges = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

const NeutralTag = styled.span`
  display: inline-flex;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.gray};
  font-size: 13px;
`;

const TopTag = styled(NeutralTag)`
  background: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
  border-color: rgba(17, 17, 17, 0.22);
`;

const SubTag = styled.span`
  display: inline-flex;
  padding: 8px 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.72);
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
`;

const PackName = styled.div`
  margin-top: 10px;
  font-weight: ${({ theme }) => theme.typography.weight.black};
  font-size: 22px;
  letter-spacing: ${({ theme }) => theme.typography.letter.tight};
`;

const PackPrice = styled.div`
  margin-top: 6px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const PackBody = styled.div`
  padding: 14px 16px 16px;
  display: grid;
  gap: 14px;
`;

const PackNote = styled.div`
  color: ${({ theme }) => theme.colors.faint};
  font-size: 13px;
  line-height: ${({ theme }) => theme.typography.line.relaxed};
`;

const PackCtas = styled.div`
  display: grid;
  gap: 10px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`;

/* Extras */
const Extras = styled.div`
  margin-top: 18px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii.xl};
  display: grid;
  gap: 14px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
    padding: 18px;
  }
`;

const ExtrasLeft = styled.div`
  display: grid;
  gap: 10px;
`;

const ExtrasTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  font-size: 22px;
  letter-spacing: ${({ theme }) => theme.typography.letter.tight};
`;

const ExtrasRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ExtrasRight = styled.div`
  display: grid;
`;

const ImageCard = styled.div`
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  background: ${({ theme }) => theme.colors.light};

  img {
    width: 100%;
    height: 100%;
    max-height: 260px;
    object-fit: cover;
  }
`;

/* Includes split */
const Split = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 20px;
    align-items: start;
  }
`;

const SplitLeft = styled.div`
  display: grid;
  gap: 14px;
`;

const IncludesGrid = styled.div`
  margin-top: 10px;
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const IncludeCard = styled.div`
  padding: 14px;
  border-radius: ${({ theme }) => theme.radii.lg};
`;

const IncludeTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  margin-bottom: 6px;
`;

const IncludeDesc = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  line-height: ${({ theme }) => theme.typography.line.relaxed};
`;

const SplitRight = styled.div`
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  display: grid;
`;

const SideMedia = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  img {
    width: 100%;
    height: 240px;
    object-fit: cover;

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      height: 260px;
    }
  }
`;

const SideContent = styled.div`
  padding: 16px;
  display: grid;
  gap: 12px;
`;

const SideTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.weight.black};
  font-size: 22px;
  letter-spacing: ${({ theme }) => theme.typography.letter.tight};
`;

const SideText = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  line-height: ${({ theme }) => theme.typography.line.relaxed};
`;

const SideBullets = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: ${({ theme }) => theme.typography.line.relaxed};
`;

/* FAQ */
const FaqWrap = styled.div`
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 16px;
`;

const FaqHeader = styled.div`
  display: grid;
  gap: 12px;
  align-items: end;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr auto;
  }
`;

const FaqList = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 10px;
`;

const FaqItem = styled.div`
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
`;

const FaqButton = styled.button`
  width: 100%;
  padding: 14px 14px;
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  span {
    text-align: left;
    font-weight: ${({ theme }) => theme.typography.weight.semibold};
  }

  &:hover {
    background: rgba(229, 0, 126, 0.05);
  }
`;

const Chevron = styled.span`
  transition: transform 180ms ease;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
  color: ${({ theme }) => theme.colors.muted};
`;

const FaqAnswer = styled.div`
  max-height: ${({ $open }) => ($open ? "220px" : "0px")};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: max-height 220ms ease, opacity 220ms ease;
  overflow: hidden;

  > div {
    padding: 0 14px 14px;
    color: ${({ theme }) => theme.colors.muted};
    line-height: ${({ theme }) => theme.typography.line.relaxed};
  }
`;

/* CTA */
const Cta = styled.div`
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 18px;
  display: grid;
  gap: 14px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: center;
  }
`;

const CtaLeft = styled.div`
  display: grid;
  gap: 12px;
`;

const CtaTitle = styled.div`
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-weight: ${({ theme }) => theme.typography.weight.black};
  font-size: clamp(22px, 3.4vw, 36px);
  letter-spacing: ${({ theme }) => theme.typography.letter.tight};
`;

const CtaButtons = styled.div`
  display: grid;
  gap: 10px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
    width: min(560px, 100%);
  }
`;

const CtaFoot = styled.div`
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 13px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const CtaRight = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-self: end;
    width: min(420px, 100%);
  }
`;

const Stat = styled.div`
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(229, 0, 126, 0.04);
  padding: 12px;
  text-align: center;
`;

const StatNum = styled.div`
  font-weight: ${({ theme }) => theme.typography.weight.black};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary};
`;

const StatLabel = styled.div`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
`;

/* Sticky mobile CTA */
const Sticky = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 40;
  padding: 10px 0 14px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(255, 255, 255, 0.82) 40%,
    rgba(255, 255, 255, 0.96) 100%
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const StickyInner = styled.div`
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 12px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
`;

const StickyText = styled.div`
  display: grid;
  gap: 2px;

  strong {
    font-weight: ${({ theme }) => theme.typography.weight.bold};
  }
  span {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 13px;
  }
`;

const StickyActions = styled.div`
  display: flex;
  gap: 8px;
`;

const StickyBtn = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.light};

  ${({ $tone, theme }) =>
    $tone === "primary" &&
    css`
      border-color: rgba(229, 0, 126, 0.25);
      background: rgba(229, 0, 126, 0.1);
      color: ${theme.colors.text};
    `}

  ${({ $tone, theme }) =>
    $tone === "dark" &&
    css`
      border-color: rgba(17, 17, 17, 0.22);
      background: ${theme.colors.dark};
      color: ${theme.colors.light};
    `}
`;
