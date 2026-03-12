import { ArrowRight, Check, Shield, Sparkles, Sun, Wind } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled, { keyframes } from "styled-components";
import { CONTACT } from "../../config/contact";
import useRevealOnScroll from "../../hooks/useReveal";
import { trackEvent } from "../../lib/analytics";
import StickyCtaButton from "../../mobile/StickyCtaButton";
import AutomationCta from "./AutomationCta";
import AutomationFaq from "./AutomationFaq";
/* =========================
   ASSETS
========================= */

import welcome1200 from "../../assets/Automatizacion/ctaAuto-1200.webp";
import welcome400 from "../../assets/Automatizacion/ctaAuto-400.webp";
import welcome600 from "../../assets/Automatizacion/ctaAuto-600.webp";
import welcome800 from "../../assets/Automatizacion/ctaAuto-800.webp";

import packBackground1200 from "../../assets/Automatizacion/heroB-1200.webp";
import packBackground400 from "../../assets/Automatizacion/heroB-400.webp";
import packBackground600 from "../../assets/Automatizacion/heroB-600.webp";
import packBackground800 from "../../assets/Automatizacion/heroB-800.webp";

const responsiveImages = {
  welcome: {
    400: welcome400,
    600: welcome600,
    800: welcome800,
    1200: welcome1200,
  },
  packBackground: {
    400: packBackground400,
    600: packBackground600,
    800: packBackground800,
    1200: packBackground1200,
  },
};

const getSrcSet = (images) =>
  `${images[400]} 400w, ${images[600]} 600w, ${images[800]} 800w, ${images[1200]} 1200w`;

// HERO
const heroImages = {
  400: "/automatizacion/domotica1-400.webp",
  600: "/automatizacion/domotica1-600.webp",
  800: "/automatizacion/domotica1-800.webp",
  1200: "/automatizacion/domotica1-1200.webp",
};

const HERO_SIZES = "100vw";

const formatEUR = (value) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

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
const Badge = ({ tone = "primary", children }) => {
  return <PillBadge $tone={tone}>{children}</PillBadge>;
};

/* =========================
   COMPONENT
========================= */

export default function Auto({ onOpenAsesoramiento }) {
  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");

  const canonical = `${baseUrl}/automatizacion/completa`;
  const siteName = CONTACT.siteName || "Traver Decoración Textil";

  const title =
    "Automatización integral Somfy | Casa inteligente con cortinas y toldos en Castellón y Valencia";
  const description =
    "Automatización integral Somfy para vivienda: cortinas, estores, persianas y toldos con sensores, escenas y control por app. Instalación profesional en Castellón y Valencia. Presupuesto orientativo y asesoramiento.";

  const ogImage = `${baseUrl}/og.png`;
  const ogImageAlt =
    "Automatización integral Somfy para cortinas, estores, persianas y toldos";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Automatización integral Somfy",
      serviceType:
        "Automatización integral de cortinas, estores, persianas y toldos",
      provider: {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${baseUrl}/#business`,
        name: siteName,
        url: `${baseUrl}/`,
        telephone: CONTACT.phoneLandline,
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Castellón" },
        { "@type": "AdministrativeArea", name: "Valencia" },
      ],
      url: canonical,
      description,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: "es-ES",
      isPartOf: { "@id": `${baseUrl}/#website` },
      about: { "@id": `${canonical}#service` },
      primaryImageOfPage: { "@type": "ImageObject", url: ogImage },
    },
  ];
  const WA_PHONE = CONTACT.whatsappNumber;

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
        aText:
          "Porque aquí no solo compras el producto: tienes asesoramiento, medición, instalación profesional, configuración y soporte. En automatización la diferencia suele estar en el montaje, ajustes y postventa.",
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
        aText:
          "Los packs son precios desde. El coste final depende de medidas, tejido, tipo de motor, marca y extras (sensores, centralización, control móvil).",
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
        aText:
          "Normalmente 1 día para packs pequeños y 1–2 días para viviendas completas, según el número de elementos.",
      },
      {
        q: "¿Se puede controlar desde el móvil?",
        a: (
          <>
            Sí, en muchos casos. Depende del sistema/marca elegidos. En la
            visita te proponemos la opción adecuada para tu presupuesto.
          </>
        ),
        aText:
          "Sí, en muchos casos. Depende del sistema y la marca elegidos. En la visita te proponemos la opción adecuada para tu presupuesto.",
      },
      {
        q: "¿Qué incluye siempre Traver?",
        a: (
          <>
            Medición, asesoramiento, instalación, puesta en marcha, ajustes y{" "}
            <strong>soporte post-instalación</strong>.
          </>
        ),
        aText:
          "Medición, asesoramiento, instalación, puesta en marcha, ajustes y soporte post-instalación.",
      },
    ],
    []
  );
  // totals/estimateProps no se usan todavía; lo dejo fuera para no meter más ruido.
  // Si lo necesitas luego, lo reintroducimos limpio.
  const [activeIndex, setActiveIndex] = useState(0);
  const gridRef = useRef(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const onScroll = () => {
      const card = el.querySelector(":scope > *");
      const cardWidth = card?.getBoundingClientRect().width || 1;

      const styles = window.getComputedStyle(el);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;

      const index = Math.round(el.scrollLeft / (cardWidth + gap));
      setActiveIndex(index);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set initial
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useRevealOnScroll();
  return (
    <Page>
      <RevealStyles>
        <Helmet>
          <title>{title}</title>

          <meta name="description" content={description} />
          <meta name="robots" content="index,follow" />
          <link rel="canonical" href={canonical} />
          <link
            rel="preload"
            as="image"
            href={heroImages[800]}
            imageSrcSet={getSrcSet(heroImages)}
            imageSizes={HERO_SIZES}
            fetchPriority="high"
          />
          <meta property="og:site_name" content={siteName} />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="es_ES" />
          <meta property="og:url" content={canonical} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:alt" content={ogImageAlt} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={ogImage} />
          <meta name="twitter:image:alt" content={ogImageAlt} />

          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>

        {/* HERO*/}
        <Hero>
          <HeroBg aria-hidden="true">
            <HeroImg
              src={heroImages[800]}
              srcSet={getSrcSet(heroImages)}
              sizes={HERO_SIZES}
              width="1200"
              height="675"
              loading="eager"
              decoding="async"
              alt=""
            />
            <HeroOverlay />
            <HeroGlow />
          </HeroBg>

          <HeroInner>
            <HeroTop>
              <KickerDark>AUTOMATIZACIÓN INTEGRAL DEL HOGAR</KickerDark>
              <HeroTitle>
                No es domótica.
                <br />
                Es <span>control invisible</span>.
              </HeroTitle>
              <HeroLead>
                Cortinas, estores, persianas y toldos coordinados con sensores y
                escenas reales. Protege el exterior, regula el calor y convierte
                rutinas en tranquilidad.
              </HeroLead>

              <HeroMicro>
                <Sparkles size={16} />
                <span>
                  Confort sin esfuerzo. Integración discreta de luz, privacidad
                  y rutina, para que tu hogar se adapte a ti.
                </span>
              </HeroMicro>
            </HeroTop>
          </HeroInner>
        </Hero>

        {/* SHEET */}
        <Sheet>
          <SheetInner>
            {/* VALUE — Reescrito limpio, profesional y responsive */}
            <SheetSection>
              <SheetKicker>Qué cambia</SheetKicker>
              <SheetH2>
                Los motivos reales para <span>automatizar</span>
              </SheetH2>
              <SheetLead>
                No va de “domótica”. Va de <b>confort</b>, <b>protección</b> y{" "}
                <b>rutinas discretas</b> que mejoran la casa sin alterar su
                estética.
              </SheetLead>

              <ValueGrid ref={gridRef}>
                <ValueCard>
                  <ValueIconWrap>
                    <Sun />
                  </ValueIconWrap>
                  <ValueTitle>Control solar elegante</ValueTitle>
                  <ValueText>
                    Reduce reflejos y calor sin oscurecer el espacio. Ajuste
                    fino por orientación para mantener la luz agradable.
                  </ValueText>
                  <ValueMeta>
                    <Check size={16} /> Reglas por horas y estación
                  </ValueMeta>
                </ValueCard>

                <ValueCard>
                  <ValueIconWrap>
                    <Wind />
                  </ValueIconWrap>
                  <ValueTitle>Protección del toldo</ValueTitle>
                  <ValueText>
                    Con viento, el sistema retrae antes de que sufra.
                    Tranquilidad real: no depende de que estés pendiente.
                  </ValueText>
                  <ValueMeta>
                    <Check size={16} /> Sensibilidad calibrada a tu zona
                  </ValueMeta>
                </ValueCard>

                <ValueCard>
                  <ValueIconWrap>
                    <Shield />
                  </ValueIconWrap>
                  <ValueTitle>Privacidad automática</ValueTitle>
                  <ValueText>
                    Cierres nocturnos y escenas por rutina. Más intimidad sin
                    “estar tocando mandos”.
                  </ValueText>
                  <ValueMeta>
                    <Check size={16} /> Escenas entregadas funcionando
                  </ValueMeta>
                </ValueCard>

                <ValueCard>
                  <ValueIconWrap>
                    <Sparkles />
                  </ValueIconWrap>
                  <ValueTitle>Escenas listas para vivir</ValueTitle>
                  <ValueText>
                    Mañana, tarde, noche. Te lo dejamos configurado y probado
                    para que simplemente funcione.
                  </ValueText>
                  <ValueMeta>
                    <Check size={16} /> Puesta en marcha + explicación
                  </ValueMeta>
                </ValueCard>
              </ValueGrid>
              <CarouselDots>
                {[0, 1, 2, 3].map((i) => (
                  <Dot
                    key={i}
                    type="button"
                    $active={i === activeIndex}
                    aria-label={`Ir a la tarjeta ${i + 1}`}
                    aria-pressed={i === activeIndex}
                    onClick={() => {
                      const el = gridRef.current;
                      if (!el) return;

                      const card = el.querySelector(":scope > *");
                      const cardWidth =
                        card?.getBoundingClientRect().width || 1;

                      const styles = window.getComputedStyle(el);
                      const gap =
                        parseFloat(styles.columnGap || styles.gap || "0") || 0;

                      el.scrollTo({
                        left: i * (cardWidth + gap),
                        behavior: "smooth",
                      });
                    }}
                  />
                ))}
              </CarouselDots>

              <ValueFooter>
                <SerifNote>
                  “El mejor sistema es el que no se ve: solo se nota en cómo se
                  vive la casa.”
                </SerifNote>
              </ValueFooter>
            </SheetSection>
          </SheetInner>
        </Sheet>

        {/* PACKS */}
        <SectionAlt id="packs">
          <Container>
            <SectionHeader>
              <H2>Packs de Automatización</H2>
              <Muted>
                Precios orientativos “desde”. Ajustamos a medidas, tejidos y
                nivel de automatización.
              </Muted>
            </SectionHeader>

            <PackGrid>
              {packs.map((p) => {
                const priceLabel = p.priceRange
                  ? `Desde ${formatEUR(p.priceRange[0])}`
                  : `Desde ${formatEUR(p.priceFrom)}`;

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
                          <CheckDot>
                            <Check size={14} />
                          </CheckDot>
                          <span>{item}</span>
                        </li>
                      ))}
                    </PackList>

                    {p.bundle && <PackBundle>💡 {p.bundle}</PackBundle>}
                    <PackNote>{p.notes}</PackNote>

                    <PackCtas>
                      <BtnPrimary
                        href="/contact"
                        onClick={(e) => {
                          e.preventDefault();
                          trackEvent("open_quick_enquiry", {
                            source: `auto_pack_${p.id}`,
                            pack: p.name,
                          });

                          onOpenAsesoramiento?.(p.name, `auto_pack_${p.id}`);
                        }}
                      >
                        Pedir propuesta <ArrowRight size={16} />
                      </BtnPrimary>

                      <BtnGhost
                        as={WhatsAppLink}
                        phone={CONTACT.whatsappNumber}
                        message={`Hola, me interesa el pack "${p.name}". ¿Podéis darme una propuesta y agendar una visita sin compromiso?`}
                      >
                        WhatsApp
                      </BtnGhost>
                    </PackCtas>
                  </PackCard>
                );
              })}
            </PackGrid>
          </Container>
        </SectionAlt>

        {/* Nuestro proceso */}
        <ProcessSection data-reveal>
          <ProcessInner>
            <ProcessLeft data-reveal>
              <SheetKicker>Nuestro proceso</SheetKicker>

              <ProcessTitle>
                Diseñamos contigo.
                <br />
                En tu casa o en nuestra tienda.
              </ProcessTitle>

              <ProcessLead>
                Escuchamos, medimos y proponemos con criterio.
                <br />
                <strong>La visita y asesoramiento son gratuitos.</strong>
              </ProcessLead>
            </ProcessLeft>

            <ProcessSteps>
              <ProcessItem data-reveal style={{ "--d": "250ms" }}>
                <ProcessNumber>01</ProcessNumber>
                <ProcessContent>
                  <h4>Visitamos y analizamos</h4>
                  <p>
                    Medimos, estudiamos orientación y uso real. Sin prisas. Sin
                    compromiso.
                  </p>
                </ProcessContent>
              </ProcessItem>

              <ProcessItem data-reveal style={{ "--d": "500ms" }}>
                <ProcessNumber>02</ProcessNumber>
                <ProcessContent>
                  <h4>Propuesta clara</h4>
                  <p>
                    Opciones con rango realista y acabados que respetan tu
                    estética.
                  </p>
                </ProcessContent>
              </ProcessItem>

              <ProcessItem data-reveal style={{ "--d": "750ms" }}>
                <ProcessNumber>03</ProcessNumber>
                <ProcessContent>
                  <h4>Instalación cuidada</h4>
                  <p>Montaje limpio, preciso y escenas configuradas contigo.</p>
                </ProcessContent>
              </ProcessItem>
            </ProcessSteps>
          </ProcessInner>
        </ProcessSection>

        {/* CTA */}
        <AutomationCta
          waPhone={WA_PHONE}
          onOpenAsesoramiento={onOpenAsesoramiento}
        />
        {/* FAQ */}

        <AutomationFaq
          items={faqs}
          kicker="Dudas rápidas"
          title={
            <>
              Preguntas <span>frecuentes</span>
            </>
          }
          lead="Lo típico antes de decidir."
          withSchema
          canonicalUrl={canonical}
        />
      </RevealStyles>
      <StickyCtaButton message="Hola, quiero una propuesta de automatización integral. ¿Podemos agendar una visita?" />
    </Page>
  );
}

const Page = styled.main`
  width: 100%;
  background: #ffffff;
  color: #111;
`;
const Container = styled.div`
  width: min(${({ theme }) => theme.layout.maxWidth}, 100%);
  padding: 0 18px;
  margin: 0 auto;
`;
const SectionHeader = styled.div`
  margin-bottom: 18px;
`;
const H2 = styled.h2`
  margin: 0 0 8px;
  font-size: clamp(22px, 3.3vw, 30px);
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.light};
`;
const Muted = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.light};
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

const BtnGhost = styled(ButtonBase)`
  background: rgba(255, 255, 255, 0.8);
  color: ${({ theme }) => theme.colors.dark};
  border: 1px solid rgba(0, 0, 0, 0.12);

  &:hover {
    background: rgba(255, 255, 255, 1);
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
/* =========================
   HERO
========================= */

const Hero = styled.section`
  position: relative;
  padding: 5.25rem 2rem 2.75rem;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4.25rem 1.5rem 2.25rem;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const HeroImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.95) contrast(1.06);
  transform: translateZ(0) scale(1.06);
  backface-visibility: hidden;
  will-change: transform;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      900px 520px at 50% 18%,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.74)
    ),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(11, 12, 15, 0.42));
`;

const scan = keyframes`
  from { transform: translateY(-80%); opacity: 0; }
  30% { opacity: .25; }
  to { transform: translateY(120%); opacity: 0; }
`;

const HeroGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      900px 520px at 18% 10%,
      rgba(196, 151, 98, 0.18),
      transparent 55%
    ),
    radial-gradient(
      900px 520px at 82% 20%,
      rgba(229, 0, 126, 0.12),
      transparent 60%
    );
  pointer-events: none;
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  gap: 1.6rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: start;
  }
`;

const HeroTop = styled.div``;

const KickerDark = styled.p`
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(244, 244, 245, 0.72);
  margin: 0 0 0.9rem 0;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(2.3rem, 4.5vw, 3.7rem);
  font-weight: 760;
  line-height: 1.03;
  letter-spacing: -0.03em;
  color: rgba(244, 244, 245, 0.98);

  span {
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 0 26px rgba(229, 0, 126, 0.35);
  }
`;

const HeroLead = styled.p`
  margin: 1.1rem 0 0;
  max-width: 66ch;
  font-size: 1.12rem;
  line-height: 1.75;
  color: rgba(244, 244, 245, 0.78);
`;

const HeroMicro = styled.div`
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: rgba(244, 244, 245, 0.7);
  font-weight: 650;
`;

/* =========================
   SHEET + VALUE (clean, no collisions)
========================= */

const Sheet = styled.section`
  background: #ffffff;
  color: #111;
  position: relative;
  z-index: 1;
  margin-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  box-shadow: none;
`;

const SheetInner = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 4.2rem 2rem 5.4rem;

  @media (max-width: 768px) {
    padding: 3.1rem 1.5rem 4.4rem;
  }
`;

const SheetSection = styled.section`
  padding: 0;
`;

const SheetKicker = styled.p`
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

const SheetH2 = styled.h2`
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

const SheetLead = styled.p`
  margin: 0.85rem 0 0 0;
  max-width: 80ch;
  font-size: 1.03rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.7);

  b {
    color: rgba(17, 17, 17, 0.88);
    font-weight: 800;
  }
`;

const ValueGrid = styled.div`
  margin-top: 1.35rem;

  /* MOBILE: horizontal snap carousel */
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 88%;
  gap: 0.85rem;
  overflow-x: auto;
  padding: 0.25rem 0.25rem 0.75rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  /* hide scrollbar (pretty) */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Each card snaps */
  > * {
    scroll-snap-align: start;
  }

  /* Tablet: 2 columns grid */
  @media (min-width: 620px) {
    overflow: visible;
    padding: 0;
    scroll-snap-type: none;

    grid-auto-flow: unset;
    grid-auto-columns: unset;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.95rem;

    > * {
      scroll-snap-align: unset;
    }
  }

  /* Desktop: 4 columns grid */
  @media (min-width: 1080px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
  }
`;
// Carousel mobile dots
const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;

  @media (min-width: 620px) {
    display: none; /* solo móvil */
  }
`;

const Dot = styled.button`
  width: ${({ $active }) => ($active ? "18px" : "12px")};
  height: 12px;
  min-width: 12px;
  min-height: 12px;
  border-radius: 999px;
  border: none;
  padding: 0;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "rgba(17,17,17,0.28)"};
  transition: all 200ms ease;

  @media (pointer: coarse) {
    width: ${({ $active }) => ($active ? "24px" : "18px")};
    height: 18px;
    min-width: 18px;
    min-height: 18px;
  }
`;

const ValueCard = styled.div`
  border-radius: 22px;
  padding: 1.05rem 1.05rem 0.95rem;
  background: linear-gradient(
    180deg,
    rgba(17, 17, 17, 0.02),
    rgba(17, 17, 17, 0.01)
  );
  border: 1px solid rgba(17, 17, 17, 0.1);

  transition: transform 180ms ease, box-shadow 180ms ease,
    border-color 180ms ease;

  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(17, 17, 17, 0.07);
    border-color: rgba(229, 0, 126, 0.14);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 40px rgba(17, 17, 17, 0.07);
      border-color: rgba(229, 0, 126, 0.14);
    }
  }
`;

const ValueIconWrap = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: rgba(229, 0, 126, 0.08);
  border: 1px solid rgba(229, 0, 126, 0.14);

  svg {
    width: 20px;
    height: 20px;
    color: rgba(17, 17, 17, 0.92);
  }
`;

const ValueTitle = styled.h3`
  margin: 0.85rem 0 0.45rem;
  font-size: 1.08rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: rgba(17, 17, 17, 0.92);
`;

const ValueText = styled.p`
  margin: 0;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.7);

  @media (max-width: 619px) {
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 3 líneas máximo */
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const ValueMeta = styled.div`
  margin-top: auto;
  padding-top: 0.85rem;

  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-weight: 750;
  color: rgba(17, 17, 17, 0.82);

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ValueFooter = styled.div`
  margin-top: 1.2rem;
  padding-top: 1.1rem;
  border-top: 1px solid rgba(17, 17, 17, 0.06);
  display: grid;
  gap: 0.9rem;

  @media (min-width: 900px) {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
`;

const SerifNote = styled.p`
  margin: 0;
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-weight: 300;
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.72);
`;

// PACKS
const PackGrid = styled.div`
  display: grid;
  gap: 14px;

  @media (min-width: 860px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;
const Section = styled.section`
  padding: 54px 0;
`;

const SectionAlt = styled(Section)`
  position: relative;
  background: #111;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(${packBackground600});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.22;
    pointer-events: none;
  }

  @media (min-width: 768px) {
    &::before {
      background-image: url(${packBackground800});
    }
  }

  @media (min-width: 1200px) {
    &::before {
      background-image: url(${packBackground1200});
    }
  }

  > * {
    position: relative;
    z-index: 1;
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
  height: 100%;

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
  margin-top: auto;
  padding-top: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;
const PillBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
  font-weight: 850;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  ${({ theme, $tone }) =>
    $tone === "premium"
      ? `
        background: rgba(0,0,0,0.08);
        color: rgba(0,0,0,0.78);
        border: 1px solid rgba(0,0,0,0.12);
      `
      : $tone === "accent"
      ? `
        background: rgba(196,151,98,0.18);
        color: rgba(0,0,0,0.76);
        border: 1px solid rgba(196,151,98,0.28);
      `
      : `
        background: rgba(229,0,126,0.12);
        color: rgba(0,0,0,0.76);
        border: 1px solid rgba(229,0,126,0.18);
      `}
`;

// Proceso
const RevealStyles = styled.div`
  [data-reveal] {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 650ms ease, transform 650ms ease;
    transition-delay: var(--d, 0ms);
    will-change: opacity, transform;
  }

  [data-reveal].is-in {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    [data-reveal] {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }
`;
const ProcessSection = styled.section`
  background: #ffffff;
  padding: 80px 0 70px;
`;

const ProcessInner = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 20px;

  display: grid;
  gap: 60px;

  @media (min-width: 980px) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: start;
  }
`;

const ProcessLeft = styled.div``;

const ProcessTitle = styled.h2`
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0;
  color: #111;
`;

const ProcessLead = styled.p`
  margin-top: 22px;
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(0, 0, 0, 0.65);

  strong {
    display: block;
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 800;
  }
`;

const ProcessSteps = styled.div`
  display: grid;
  gap: 40px;
  position: relative;
`;

const ProcessItem = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 20px;
  align-items: start;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 30px;
    top: 50px;
    bottom: -40px;
    width: 1px;
    background: rgba(0, 0, 0, 0.08);
  }
`;

const ProcessNumber = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.35);
`;

const ProcessContent = styled.div`
  h4 {
    margin: 0 0 8px;
    font-size: 1.1rem;
    font-weight: 700;
    color: #111;
  }

  p {
    margin: 0;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.6);
  }
`;
