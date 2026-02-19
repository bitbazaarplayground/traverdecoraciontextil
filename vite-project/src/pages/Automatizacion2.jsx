import { useMemo, useState } from "react";
import styled from "styled-components";

import domoticaControl from "../assets/Automatizacion/domotica1.webp";
import automatizacionPackImg from "../assets/Automatizacion/smartHom1.webp";

const formatEUR = (value) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

const WhatsAppLink = ({ phone, message, className, children }) => {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

const Badge = ({ tone = "primary", children }) => {
  return <PillBadge $tone={tone}>{children}</PillBadge>;
};

const Check = () => <CheckDot aria-hidden="true">✓</CheckDot>;

const FAQItem = ({ q, a, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <FaqItem $open={open}>
      <FaqQ
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <FaqIcon aria-hidden="true">{open ? "–" : "+"}</FaqIcon>
      </FaqQ>
      <FaqA role="region" $open={open}>
        <FaqAInner>{a}</FaqAInner>
      </FaqA>
    </FaqItem>
  );
};

export default function Auto2() {
  // ⚠️ Cambia al número real (formato internacional sin +)
  const WA_PHONE = "34600000000";

  const packs = useMemo(
    () => [
      {
        id: "core",
        name: "Core Residence",
        subtitle: "Ideal para viviendas de 2–3 dormitorios",
        priceFrom: 1200,
        highlight: "Más solicitado",
        tone: "primary",
        includes: [
          "3 estores motorizados + mando",
          "3 cortinas motorizadas + mando",
          "Instalación y puesta en marcha",
          "Programación básica y explicación de uso",
        ],
        notes: "Precio desde. Depende de medidas, tejido y tipo de motor.",
      },
      {
        id: "toldo",
        name: "Pack Toldos Smart",
        subtitle: "Terraza / balcón con comodidad total",
        priceFrom: 1100,
        highlight: "Exterior",
        tone: "accent",
        includes: [
          "1 toldo motorizado + mando",
          "Instalación y ajuste final",
          "Opción de sensores (viento/sol) como extra",
          "Soporte post-instalación",
        ],
        bundle: "Añade Core Residence por +1.000 € (bundle con descuento)",
        notes: "Precio desde. Varía por medidas, lona y estructura.",
      },
      {
        id: "full",
        name: "Full Smart Home",
        subtitle: "Automatización completa + centralización",
        priceRange: [2600, 3200],
        highlight: "Premium",
        tone: "premium",
        includes: [
          "4–6 estores motorizados",
          "4–6 cortinas motorizadas",
          "1 toldo motorizado",
          "Centralización (mando/escenas)",
          "Programación avanzada (horarios/escenas)",
        ],
        notes:
          "Rango orientativo. Se ajusta a número de ventanas, medidas y elección de tejidos.",
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "¿Por qué elegir Traver en lugar de una franquicia?",
        a: (
          <>
            Porque aquí no solo compras el producto: tienes{" "}
            <strong>asesoramiento</strong>, <strong>medición</strong>,{" "}
            <strong>instalación profesional</strong>, configuración y{" "}
            <strong>soporte</strong>. En automatización la diferencia suele
            estar en el montaje, ajustes y postventa.
          </>
        ),
      },
      {
        q: "¿Los precios son cerrados?",
        a: (
          <>
            Los packs son <strong>precios desde</strong>. El coste final depende
            de medidas, tejido, tipo de motor, marca y extras (sensores,
            centralización, control móvil).
          </>
        ),
      },
      {
        q: "¿Cuánto tarda la instalación?",
        a: (
          <>
            Normalmente <strong>1 día</strong> para packs pequeños y{" "}
            <strong>1–2 días</strong> para viviendas completas, según el número
            de elementos.
          </>
        ),
      },
      {
        q: "¿Se puede controlar desde el móvil?",
        a: (
          <>
            Sí, en muchos casos. Depende del sistema/marca elegidos. En la
            visita te proponemos la opción adecuada para tu presupuesto.
          </>
        ),
      },
      {
        q: "¿Qué incluye siempre Traver?",
        a: (
          <>
            Medición, asesoramiento, instalación, puesta en marcha, ajustes y{" "}
            <strong>soporte post-instalación</strong>.
          </>
        ),
      },
    ],
    []
  );

  const waMessageGeneral =
    "Hola, me interesa la automatización completa. ¿Podéis orientarme con un pack y una visita sin compromiso?";

  return (
    <Page>
      {/* HERO */}
      <Hero>
        <Container>
          <HeroGrid>
            <HeroText>
              <Badge tone="primary">Automatización completa</Badge>
              <H1>
                Toldos, estores y cortinas <Gradient>motorizados</Gradient> con
                instalación incluida
              </H1>
              <Lead>
                Packs orientativos con precios “desde”, asesoramiento y montaje
                profesional. Lo dejamos funcionando y listo.
              </Lead>

              <HeroCtas>
                <BtnPrimary
                  as={WhatsAppLink}
                  phone={WA_PHONE}
                  message={waMessageGeneral}
                >
                  Hablar por WhatsApp
                </BtnPrimary>
                <BtnGhost href="#packs">Ver packs</BtnGhost>
              </HeroCtas>

              <Trust>
                <TrustItem>
                  <strong>Incluye instalación</strong>
                  <span>Montaje + ajustes</span>
                </TrustItem>
                <TrustItem>
                  <strong>Asesoramiento</strong>
                  <span>Medición y recomendación</span>
                </TrustItem>
                <TrustItem>
                  <strong>Soporte</strong>
                  <span>Postventa real</span>
                </TrustItem>
              </Trust>
            </HeroText>

            <HeroVisual aria-hidden="true">
              <ImgCardTop>
                <Img src={domoticaControl} alt="" loading="lazy" />
                <ImgOverlay>
                  <Chip>Control sencillo</Chip>
                  <Chip>Escenas</Chip>
                  <Chip>Confort</Chip>
                </ImgOverlay>
              </ImgCardTop>

              <ImgCardBottom>
                <Img src={automatizacionPackImg} alt="" loading="lazy" />
                <ImgOverlay>
                  <ChipSolid>Instalación incluida</ChipSolid>
                  <ChipSolid>Puesta en marcha</ChipSolid>
                </ImgOverlay>
              </ImgCardBottom>
            </HeroVisual>
          </HeroGrid>
        </Container>
      </Hero>

      {/* BENEFICIOS */}
      <Section>
        <Container>
          <SectionHeader>
            <H2>¿Qué ganas con automatizar?</H2>
            <Muted>
              Comodidad, protección y control. Y lo mejor: no te complicas, lo
              hacemos todo por ti.
            </Muted>
          </SectionHeader>

          <Benefits>
            <BenefitCard>
              <BenefitIcon>⚡</BenefitIcon>
              <h3>Un click</h3>
              <p>Sube/baja estores o corre cortinas sin esfuerzo.</p>
            </BenefitCard>
            <BenefitCard>
              <BenefitIcon>🌡️</BenefitIcon>
              <h3>Confort térmico</h3>
              <p>Mejora la temperatura interior y reduce el exceso de sol.</p>
            </BenefitCard>
            <BenefitCard>
              <BenefitIcon>🛡️</BenefitIcon>
              <h3>Protección</h3>
              <p>Opciones con sensores para cuidar tu toldo y tejidos.</p>
            </BenefitCard>
            <BenefitCard>
              <BenefitIcon>🧰</BenefitIcon>
              <h3>Profesionales</h3>
              <p>Medimos, instalamos, ajustamos y dejamos todo listo.</p>
            </BenefitCard>
          </Benefits>
        </Container>
      </Section>

      {/* PACKS */}
      <SectionAlt id="packs">
        <Container>
          <SectionHeader>
            <H2>Packs de Automatización</H2>
            <Muted>
              Precios orientativos “desde”. Ajustamos a medidas, tejidos y nivel
              de automatización.
            </Muted>
          </SectionHeader>

          <PackGrid>
            {packs.map((p) => {
              const priceLabel = p.priceRange
                ? `Desde ${formatEUR(p.priceRange[0])} · hasta ${formatEUR(
                    p.priceRange[1]
                  )}`
                : `Desde ${formatEUR(p.priceFrom)}`;

              const waMessage = `Hola, me interesa el pack "${p.name}". ¿Podéis darme una propuesta para mi vivienda y una visita sin compromiso?`;

              return (
                <PackCard key={p.id} $tone={p.tone}>
                  <PackHeader>
                    <Badge tone={p.tone === "premium" ? "premium" : p.tone}>
                      {p.highlight}
                    </Badge>
                    <PackTitle>{p.name}</PackTitle>
                    <PackSubtitle>{p.subtitle}</PackSubtitle>
                    <PackPrice>{priceLabel}</PackPrice>
                  </PackHeader>

                  <PackList>
                    {p.includes.map((item) => (
                      <li key={item}>
                        <Check /> <span>{item}</span>
                      </li>
                    ))}
                  </PackList>

                  {p.bundle && <PackBundle>💡 {p.bundle}</PackBundle>}
                  <PackNote>{p.notes}</PackNote>

                  <PackCtas>
                    <BtnPrimary
                      as={WhatsAppLink}
                      phone={WA_PHONE}
                      message={waMessage}
                    >
                      Pedir propuesta
                    </BtnPrimary>
                    <BtnGhost href="#faq">Dudas</BtnGhost>
                  </PackCtas>
                </PackCard>
              );
            })}
          </PackGrid>
        </Container>
      </SectionAlt>

      {/* FAQ */}
      <Section id="faq">
        <Container>
          <SectionHeader>
            <H2>Preguntas frecuentes</H2>
            <Muted>Lo típico antes de decidir.</Muted>
          </SectionHeader>

          <Faq>
            {faqs.map((f, idx) => (
              <FAQItem key={f.q} q={f.q} a={f.a} defaultOpen={idx === 0} />
            ))}
          </Faq>
        </Container>
      </Section>

      {/* Sticky CTA móvil */}
      <StickyCta>
        <StickyBtn
          as={WhatsAppLink}
          phone={WA_PHONE}
          message={waMessageGeneral}
        >
          💬 WhatsApp · Pedir propuesta
        </StickyBtn>
      </StickyCta>
    </Page>
  );
}

/* =========================
   Styled Components
========================= */

const Page = styled.div`
  color: ${({ theme }) => theme.colors.dark};
  /* Si tu web usa fondo claro, esto encaja mejor con el resto */
  background: ${({ theme }) => theme.colors.light};
`;

const Container = styled.div`
  width: min(${({ theme }) => theme.layout.maxWidth}, 100%);
  padding: 0 18px;
  margin: 0 auto;
`;

const Hero = styled.section`
  padding: 40px 0 12px;
  /* Fondo suave para darle “premium” sin romper el site */
  background: radial-gradient(
      900px 420px at 10% 10%,
      rgba(229, 0, 126, 0.12),
      transparent 60%
    ),
    radial-gradient(
      700px 360px at 85% 20%,
      rgba(0, 0, 0, 0.06),
      transparent 62%
    ),
    linear-gradient(180deg, ${({ theme }) => theme.colors.gray}, transparent);
`;

const HeroGrid = styled.div`
  display: grid;
  gap: 18px;
  align-items: center;

  @media (min-width: 900px) {
    grid-template-columns: 1.15fr 0.85fr;
    gap: 26px;
  }
`;

const HeroText = styled.div``;

const H1 = styled.h1`
  margin: 12px 0;
  font-size: clamp(28px, 4.2vw, 46px);
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.dark};
`;

const Gradient = styled.span`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    #000
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Lead = styled.p`
  margin: 0 0 18px;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.72);
`;

const HeroCtas = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 14px 0 18px;
`;

const ButtonBase = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 11px 14px;
  border-radius: 14px;

  font-weight: 700;
  font-size: 14px;

  text-decoration: none;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const BtnPrimary = styled(ButtonBase)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  box-shadow: 0 12px 28px rgba(229, 0, 126, 0.22);

  &:hover {
    box-shadow: 0 16px 34px rgba(229, 0, 126, 0.28);
  }
`;

const BtnGhost = styled(ButtonBase)`
  background: rgba(255, 255, 255, 0.8);
  color: ${({ theme }) => theme.colors.dark};
  border: 1px solid rgba(0, 0, 0, 0.12);

  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

const Trust = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
`;

const TrustItem = styled.div`
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
  padding: 10px;

  strong {
    display: block;
    font-size: 13px;
  }
  span {
    display: block;
    font-size: 12px;
    margin-top: 2px;
    color: rgba(0, 0, 0, 0.62);
  }
`;

const HeroVisual = styled.div`
  position: relative;
  min-height: 320px;
`;

const ImgCard = styled.div`
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.14);
  background: #fff;
`;

const ImgCardTop = styled(ImgCard)`
  transform: rotate(-1.2deg);
`;

const ImgCardBottom = styled(ImgCard)`
  position: absolute;
  right: 0;
  bottom: 0;
  width: min(340px, 92%);
  transform: rotate(1.2deg);
`;

const Img = styled.img`
  width: 100%;
  height: 230px;
  object-fit: cover;
  display: block;
`;

const ImgOverlay = styled.div`
  position: absolute;
  inset: auto 10px 10px 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.span`
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.55);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.14);
`;

const ChipSolid = styled(Chip)`
  background: rgba(255, 255, 255, 0.86);
  color: #111;
  border-color: rgba(0, 0, 0, 0.1);
`;

const Section = styled.section`
  padding: 54px 0;
`;

const SectionAlt = styled(Section)`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.03), transparent);
`;

const SectionHeader = styled.div`
  margin-bottom: 18px;
`;

const H2 = styled.h2`
  margin: 0 0 8px;
  font-size: clamp(22px, 3.3vw, 30px);
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.dark};
`;

const Muted = styled.p`
  margin: 0;
  color: rgba(0, 0, 0, 0.62);
`;

const Benefits = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;

  @media (min-width: 720px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const BenefitCard = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);

  h3 {
    margin: 0 0 6px;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.dark};
  }
  p {
    margin: 0;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.62);
  }
`;

const BenefitIcon = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const PillBadge = styled.span`
  display: inline-flex;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;

  ${({ theme, $tone }) => {
    if ($tone === "premium") {
      return `
        background: rgba(0,0,0,0.06);
        border: 1px solid rgba(0,0,0,0.14);
        color: ${theme.colors.dark};
      `;
    }
    if ($tone === "accent") {
      return `
        background: rgba(0,0,0,0.05);
        border: 1px solid rgba(0,0,0,0.12);
        color: ${theme.colors.dark};
      `;
    }
    return `
      background: rgba(229, 0, 126, 0.10);
      border: 1px solid rgba(229, 0, 126, 0.22);
      color: ${theme.colors.primary};
    `;
  }}
`;

const PackGrid = styled.div`
  display: grid;
  gap: 14px;

  @media (min-width: 860px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const PackCard = styled.article`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 14px;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;

  ${({ theme, $tone }) =>
    $tone === "primary"
      ? `outline: 1px solid rgba(229,0,126,0.12);`
      : $tone === "premium"
      ? `outline: 1px solid rgba(0,0,0,0.10);`
      : `outline: 1px solid rgba(0,0,0,0.08);`}
`;

const PackHeader = styled.header``;

const PackTitle = styled.h3`
  margin: 10px 0 4px;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.dark};
`;

const PackSubtitle = styled.p`
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.45;
  color: rgba(0, 0, 0, 0.62);
`;

const PackPrice = styled.div`
  font-weight: 800;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.dark};
`;

const PackList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 12px 0 10px;
  display: grid;
  gap: 8px;

  li {
    display: grid;
    grid-template-columns: 18px 1fr;
    gap: 10px;
    align-items: start;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.78);
  }
`;

const CheckDot = styled.span`
  width: 18px;
  height: 18px;
  display: inline-grid;
  place-items: center;
  border-radius: 999px;
  background: rgba(229, 0, 126, 0.1);
  border: 1px solid rgba(229, 0, 126, 0.18);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  font-weight: 900;
`;

const PackBundle = styled.div`
  margin-top: 8px;
  padding: 10px;
  border-radius: 14px;
  border: 1px dashed rgba(0, 0, 0, 0.16);
  background: rgba(0, 0, 0, 0.03);
  font-size: 13px;
  color: rgba(0, 0, 0, 0.76);
`;

const PackNote = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.62);
`;

const PackCtas = styled.div`
  margin-top: 14px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Faq = styled.div`
  display: grid;
  gap: 10px;
`;

const FaqItem = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);

  ${({ $open }) =>
    $open
      ? `
    `
      : `
    `}
`;

const FaqQ = styled.button`
  width: 100%;
  text-align: left;
  background: transparent;
  border: 0;
  color: #111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
`;

const FaqIcon = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const FaqA = styled.div`
  max-height: ${({ $open }) => ($open ? "260px" : "0px")};
  overflow: hidden;
  transition: max-height 0.22s ease;
`;

const FaqAInner = styled.div`
  padding: 0 14px 14px;
  color: rgba(0, 0, 0, 0.66);
  font-size: 13px;
  line-height: 1.55;
`;

/* ✅ Acordeón: max-height por prop $open */
const FaqItemWithOpen = styled(FaqItem)``; // (no se usa; evitamos duplicar)

FaqItem.defaultProps = { "data-open": "false" };

const StickyCta = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 10px;
  z-index: 50;
  padding: 0 14px;
  display: grid;
  place-items: center;

  @media (min-width: 920px) {
    display: none;
  }
`;

const StickyBtn = styled(ButtonBase)`
  width: min(520px, 100%);
  padding: 14px 16px;
  border-radius: 16px;

  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  box-shadow: 0 18px 55px rgba(229, 0, 126, 0.25);
`;
