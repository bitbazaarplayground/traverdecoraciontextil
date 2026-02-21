// const addOns = useMemo(
//   () => [
//     {
//       id: "lightsPlus",
//       icon: Lightbulb,
//       label: "Iluminación avanzada",
//       desc: "Escenas (día/noche/ambiente) + zonas extra",
//       price: 850,
//     },
//     {
//       id: "climatePlus",
//       icon: Thermometer,
//       label: "Clima & confort",
//       desc: "Sensor extra + automatismos por temperatura",
//       price: 420,
//     },
//     {
//       id: "windRainPlus",
//       icon: Wind,
//       label: "Viento / protección exterior",
//       desc: "Ajuste fino de sensibilidad + perfiles clima",
//       price: 520,
//     },
//     {
//       id: "sunPlus",
//       icon: Sun,
//       label: "Control solar por orientación",
//       desc: "Reglas por horas/estación (sin deslumbrar)",
//       price: 390,
//     },
//     {
//       id: "voice",
//       icon: Mic,
//       label: "Voz / asistente",
//       desc: "Configuración + 1 altavoz compatible*",
//       price: 0, // “gratis” como gancho (se comunica como promo)
//       badge: "Incluido",
//     },
//     {
//       id: "care",
//       icon: Shield,
//       label: "Care+ (12 meses)",
//       desc: "Ajustes de escenas + revisión post-uso",
//       price: 290,
//     },
//   ],
//   []
// );
import { ArrowRight, Check, Shield, Sparkles, Sun, Wind } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled, { keyframes } from "styled-components";
import { CONTACT } from "../config/contact";

/* =========================
     ASSETS
  ========================= */
import domoticaControl from "../assets/Automatizacion/domotica1.webp";

/* =========================
     UTIL
  ========================= */
const formatEUR = (n) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
    Math.round(n)
  );

/* =========================
     COMPONENT
  ========================= */

export default function Auto() {
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

  // Mantengo tus states/effects por si los usas más abajo (no rompen el build)
  const bundles = useMemo(() => [], []);
  const addOns = useMemo(() => [], []);
  const [activeBundle, setActiveBundle] = useState(bundles[0]);
  const [selectedAddOns, setSelectedAddOns] = useState(
    () => new Set(["voice"])
  );
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  useEffect(() => {
    if (sheetOpen) closeBtnRef.current?.focus();
  }, [sheetOpen]);

  // totals/estimateProps no se usan todavía; lo dejo fuera para no meter más ruido.
  // Si lo necesitas luego, lo reintroducimos limpio.
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const onScroll = () => {
      const cardWidth = el.firstChild?.offsetWidth || 1;
      const scrollLeft = el.scrollLeft;
      const index = Math.round(scrollLeft / (cardWidth + 14)); // gap approx
      setActiveIndex(index);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const gridRef = useRef(null);

  return (
    <Page>
      <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonical} />

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

      {/* FUTURISTIC HERO — NO TOCADO */}
      <Hero>
        <HeroBg>
          <HeroImg src={domoticaControl} alt="" aria-hidden="true" />
          <HeroOverlay />

          <HeroScan />
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

            <HeroActions>
              <PrimaryLink href="/contact">
                Asesoramiento privado <ArrowRight size={16} />
              </PrimaryLink>
              <SecondaryLink href="#paquetes">Ver paquetes</SecondaryLink>
            </HeroActions>

            <HeroMicro>
              <Sparkles size={16} />
              <span>
                Confort sin esfuerzo. Integración discreta de luz, privacidad y
                rutina, para que tu hogar se adapte a ti.
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
            <SheetH2>Los motivos reales para automatizar</SheetH2>
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
                  Reduce reflejos y calor sin oscurecer el espacio. Ajuste fino
                  por orientación para mantener la luz agradable.
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
                  Con viento, el sistema retrae antes de que sufra. Tranquilidad
                  real: no depende de que estés pendiente.
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
                  Mañana, tarde, noche. Te lo dejamos configurado y probado para
                  que simplemente funcione.
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
                  $active={i === activeIndex}
                  onClick={() => {
                    const el = gridRef.current;
                    const cardWidth = el.firstChild?.offsetWidth || 1;
                    el.scrollTo({
                      left: i * (cardWidth + 14),
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

              <ValueCtas>
                <ButtonPrimary href="#paquetes">
                  Ver paquetes <ArrowRight size={16} />
                </ButtonPrimary>
                <ButtonGhost href="/contact">Asesoramiento privado</ButtonGhost>
              </ValueCtas>
            </ValueFooter>
          </SheetSection>
        </SheetInner>
      </Sheet>
    </Page>
  );
}

const Page = styled.main`
  width: 100%;
  background: #0b0c0f;
  color: #f4f4f5;
`;

/* =========================
     HERO (FUTURISTIC) — NO TOCAR
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
  transform: scale(1.06);
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      900px 520px at 50% 18%,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.74)
    ),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(11, 12, 15, 0.92));
`;

const scan = keyframes`
    from { transform: translateY(-80%); opacity: 0; }
    30% { opacity: .25; }
    to { transform: translateY(120%); opacity: 0; }
  `;

const HeroScan = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 220px;
  top: 0;
  opacity: 0.25;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(196, 151, 98, 0.22),
    transparent
  );
  animation: ${scan} 4.8s ease-in-out infinite;
  pointer-events: none;
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

const HeroActions = styled.div`
  margin-top: 1.7rem;
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
  align-items: center;
`;

const PrimaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  justify-content: center;
  padding: 0.95rem 1.7rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 860;
  text-decoration: none;
  transition: transform 180ms ease, opacity 180ms ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;

const SecondaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(244, 244, 245, 0.92);
  font-weight: 740;
  text-decoration: none;
  transition: transform 180ms ease, background 180ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.09);
  }
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
  border-top-left-radius: 34px;
  border-top-right-radius: 34px;
  margin-top: -18px;
  position: relative;
  z-index: 5;
  box-shadow: 0 -18px 60px rgba(0, 0, 0, 0.35);
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
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(17, 17, 17, 0.55);
  margin: 0 0 0.7rem 0;
`;

const SheetH2 = styled.h2`
  margin: 0;
  font-size: 2.1rem;
  font-weight: 760;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.75rem;
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
  width: 7px;
  height: 7px;
  border-radius: 999px;
  border: none;
  padding: 0;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "rgba(17,17,17,0.2)"};
  transition: all 200ms ease;

  ${({ $active }) =>
    $active &&
    `
      width: 18px;
      border-radius: 999px;
    `}
`;

const ValueCard = styled.div`
  border-radius: 22px;
  padding: 1.15rem 1.15rem 1.05rem;
  background: linear-gradient(
    180deg,
    rgba(17, 17, 17, 0.02),
    rgba(17, 17, 17, 0.01)
  );
  border: 1px solid rgba(17, 17, 17, 0.1);
  box-shadow: 0 18px 60px rgba(17, 17, 17, 0.06);
  transition: transform 180ms ease, box-shadow 180ms ease,
    border-color 180ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 26px 80px rgba(17, 17, 17, 0.09);
    border-color: rgba(229, 0, 126, 0.18);
  }
  padding: 1.05rem 1.05rem 0.95rem;

  @media (max-width: 619px) {
    padding: 0.95rem 0.95rem 0.9rem;
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
  margin-top: 0.85rem;
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

const ValueCtas = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (min-width: 900px) {
    justify-content: flex-end;
  }
`;

const ButtonPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.95rem 1.45rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light || "#fff"};
  font-weight: 800;
  text-decoration: none;
  transition: transform 180ms ease, opacity 180ms ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;

const ButtonGhost = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.95rem 1.35rem;
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.04);
  border: 1px solid rgba(17, 17, 17, 0.1);
  color: rgba(17, 17, 17, 0.92);
  font-weight: 800;
  text-decoration: none;
  transition: transform 180ms ease, background 180ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(17, 17, 17, 0.07);
  }
`;
