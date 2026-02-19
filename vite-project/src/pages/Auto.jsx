import {
  ArrowRight,
  Check,
  ChevronRight,
  Lightbulb,
  Mic,
  Shield,
  Sparkles,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { CONTACT } from "../config/contact";

import AutomatizacionEstimate from "../components/automatizacion/AutomatizacionEstimate";
import PromoBanner from "../components/pricing/PromoBanner";

/* =========================
   ASSETS
========================= */
import domoticaControl from "../assets/Automatizacion/domotica1.webp";
import automatizacionPackImg from "../assets/Automatizacion/smartHom1.webp";

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

  // ──────────────────────────────────────────────────────────────
  // WOW: Bundles + a “cockpit” configurator (prices are orientative)
  // ──────────────────────────────────────────────────────────────
  const bundles = useMemo(
    () => [
      {
        id: "core",
        tag: "Más vendido",
        title: "CORE Residence",
        sub: "Interior premium + escenas listas. Lo que más se nota, primero.",
        baseFrom: 5900,
        baseTo: 8900,
        signature: "Silencio + calibración fina",
        why: [
          "Control solar (sin deslumbrar)",
          "Privacidad automática noche",
          "Escenas entregadas funcionando",
        ],
        estimateItems: [
          {
            icon: "cortina",
            strong: "3–6 estores / cortinas motorizados",
            text: "Movimiento silencioso + ajuste fino",
            group: "interior",
          },
          {
            icon: "app",
            strong: "Control central (app + mando)",
            text: "Escenas por estancias",
            group: "control",
          },
          {
            icon: "sensores",
            strong: "Sensor luz/temperatura (interior)",
            text: "Confort térmico y visual",
            group: "interior",
          },
          {
            icon: "instalacion",
            strong: "Instalación + puesta en marcha",
            text: "Calibración y entrega guiada",
            group: "control",
          },
          {
            icon: "garantia",
            strong: "Garantía (según componentes)",
            text: "Cobertura y soporte",
            group: "control",
          },
        ],
      },
      {
        id: "shield",
        tag: "Terraza & toldo",
        title: "WEATHER Shield",
        sub: "Protección climática real. El toldo se salva solo.",
        baseFrom: 8900,
        baseTo: 13900,
        signature: "Sensor viento/sol calibrado",
        why: [
          "Retracción por viento",
          "Sombra inteligente",
          "Exterior + interior",
        ],
        estimateItems: [
          {
            icon: "toldo",
            strong: "1–2 toldos motorizados",
            text: "Protección automática por viento",
            group: "exterior",
          },
          {
            icon: "sensores",
            strong: "Sensor viento/sol exterior",
            text: "Sensibilidad ajustada a tu zona",
            group: "exterior",
          },
          {
            icon: "persiana",
            strong: "2–5 estores screen motorizados",
            text: "Control solar + privacidad",
            group: "interior",
          },
          {
            icon: "app",
            strong: "Escenas clima (sol fuerte / viento)",
            text: "Actúa antes de que moleste",
            group: "control",
          },
          {
            icon: "instalacion",
            strong: "Instalación certificada",
            text: "Calibración completa",
            group: "control",
          },
        ],
      },
      {
        id: "signature",
        tag: "Firma Traver",
        title: "SIGNATURE Home",
        sub: "Automatización integral: interior + exterior + iluminación + voz.",
        baseFrom: 14900,
        baseTo: 24900,
        signature: "Entrega “listo para vivir”",
        why: ["Escenas por hábitos", "Clima + seguridad", "Luces + presencia"],
        estimateItems: [
          {
            icon: "cortina",
            strong: "6–12 cortinas / estores motorizados",
            text: "Zonas clave del hogar",
            group: "interior",
          },
          {
            icon: "persiana",
            strong: "4–10 persianas / screen",
            text: "Por orientación solar",
            group: "interior",
          },
          {
            icon: "toldo",
            strong: "1–3 toldos motorizados",
            text: "Exterior protegido",
            group: "exterior",
          },
          {
            icon: "sensores",
            strong: "Pack sensores (luz/temp/viento/sol)",
            text: "Automatismos reales",
            group: "exterior",
          },
          {
            icon: "luz",
            strong: "Luces inteligentes (varias zonas)",
            text: "Escenas y ambientación",
            group: "interior",
          },
          {
            icon: "app",
            strong: "Control central + voz",
            text: "Preparado para Alexa/Google",
            group: "control",
          },
          {
            icon: "instalacion",
            strong: "Instalación + calibración total",
            text: "Sin “ajustes pendientes”",
            group: "control",
          },
          {
            icon: "garantia",
            strong: "Garantía + soporte premium",
            text: "Plan de revisión",
            group: "control",
          },
        ],
      },
    ],
    []
  );

  const addOns = useMemo(
    () => [
      {
        id: "lightsPlus",
        icon: Lightbulb,
        label: "Iluminación avanzada",
        desc: "Escenas (día/noche/ambiente) + zonas extra",
        price: 850,
      },
      {
        id: "climatePlus",
        icon: Thermometer,
        label: "Clima & confort",
        desc: "Sensor extra + automatismos por temperatura",
        price: 420,
      },
      {
        id: "windRainPlus",
        icon: Wind,
        label: "Viento / protección exterior",
        desc: "Ajuste fino de sensibilidad + perfiles clima",
        price: 520,
      },
      {
        id: "sunPlus",
        icon: Sun,
        label: "Control solar por orientación",
        desc: "Reglas por horas/estación (sin deslumbrar)",
        price: 390,
      },
      {
        id: "voice",
        icon: Mic,
        label: "Voz / asistente",
        desc: "Configuración + 1 altavoz compatible*",
        price: 0, // “gratis” como gancho (se comunica como promo)
        badge: "Incluido",
      },
      {
        id: "care",
        icon: Shield,
        label: "Care+ (12 meses)",
        desc: "Ajustes de escenas + revisión post-uso",
        price: 290,
      },
    ],
    []
  );

  const [activeBundle, setActiveBundle] = useState(bundles[0]);
  const [selectedAddOns, setSelectedAddOns] = useState(
    () => new Set(["voice"])
  );

  // Mobile bottom sheet
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  //   Prevent background scroll when sheet is open
  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  //   auto-focus close button when sheet opens (accessibility)
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (sheetOpen) closeBtnRef.current?.focus();
  }, [sheetOpen]);

  const totals = useMemo(() => {
    const sumAddOns = [...selectedAddOns].reduce((acc, id) => {
      const found = addOns.find((a) => a.id === id);
      return acc + (found?.price || 0);
    }, 0);

    const from = activeBundle.baseFrom + sumAddOns;
    const to = activeBundle.baseTo + sumAddOns;

    // “savings” theatrical but plausible: show value of “voice”
    const voiceValue = 79; // typical entry assistant (illustrative)
    const savings = selectedAddOns.has("voice") ? voiceValue : 0;

    return { from, to, savings };
  }, [activeBundle, selectedAddOns, addOns]);

  // Tilt effect for bundle cards
  const onTilt = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = (y / r.height - 0.5) * -7; // rotateX
    const ry = (x / r.width - 0.5) * 10; // rotateY
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${(x / r.width) * 100}%`);
    el.style.setProperty("--my", `${(y / r.height) * 100}%`);
  };

  const offTilt = (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  const toggleAddOn = (id) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      // keep voice always selected by default? (optional)
      return next;
    });
  };

  const estimateProps = useMemo(() => {
    return {
      priceText: "Desde",
      priceValue: `${formatEUR(totals.from)} – ${formatEUR(totals.to)}`,
      description:
        "Rango orientativo: depende de medidas, tejidos, número de motores y complejidad de integración. Te proponemos la opción más equilibrada para tu casa.",
      items: [
        ...activeBundle.estimateItems,
        ...[...selectedAddOns]
          .map((id) => addOns.find((a) => a.id === id))
          .filter(Boolean)
          .map((a) => ({
            icon:
              a.id === "lightsPlus"
                ? "luz"
                : a.id === "voice"
                ? "extra"
                : a.id === "care"
                ? "mantenimiento"
                : "sensores",
            strong: a.label,
            text:
              a.price === 0
                ? `${a.desc} (incluido)`
                : `${a.desc} (+${formatEUR(a.price)})`,
            group:
              a.id === "lightsPlus"
                ? "interior"
                : a.id === "windRainPlus" || a.id === "sunPlus"
                ? "exterior"
                : "control",
          })),
      ],
      finePrint:
        "*Los paquetes y precios son orientativos. Los asistentes de voz dependen de compatibilidad y disponibilidad. Se confirma en la propuesta.",
    };
  }, [activeBundle, selectedAddOns, addOns, totals]);

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

      {/* FUTURISTIC HERO */}
      <Hero>
        <HeroBg>
          <HeroImg src={domoticaControl} alt="" aria-hidden="true" />
          <HeroOverlay />
          <HeroGrid />
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

            <BackRow>
              <BackLink to="/automatizacion">
                ← Volver a Automatización
              </BackLink>
            </BackRow>
          </HeroTop>

          <HeroSide>
            <HeroStatCard>
              <StatLabel>Modo de uso</StatLabel>
              <StatValue>Automático</StatValue>
              <StatSub>sol · viento · horarios · presencia</StatSub>
              <StatRow>
                <StatPill>
                  <Wind size={14} /> Viento
                </StatPill>
                <StatPill>
                  <Sun size={14} /> Sol
                </StatPill>
                <StatPill>
                  <Thermometer size={14} /> Temperatura
                </StatPill>
                <StatPill>
                  <Shield size={14} /> Seguridad
                </StatPill>
              </StatRow>
            </HeroStatCard>
          </HeroSide>
        </HeroInner>
      </Hero>

      <Sheet>
        <SheetInner>
          {/* VALUE */}
          <Section>
            <Kicker>Qué cambia</Kicker>
            <H2>Los motivos reales para automatizar</H2>
            <SubLead>
              No vendemos “moverlo desde el móvil”. Vendemos:
              <b> confort térmico</b>, <b>protección del toldo</b>,{" "}
              <b>privacidad automática</b> y <b>escenas listas</b>.
            </SubLead>

            <ValueGrid>
              <ValueCard>
                <ValueIcon>
                  <Sun />
                </ValueIcon>
                <ValueTitle>Menos calor · menos reflejos</ValueTitle>
                <ValueText>
                  Ajuste por luz natural para evitar deslumbramientos y reducir
                  carga de aire acondicionado.
                </ValueText>
                <ValueProof>
                  <Check size={16} /> Reglas por orientación y estación
                </ValueProof>
              </ValueCard>

              <ValueCard>
                <ValueIcon>
                  <Wind />
                </ValueIcon>
                <ValueTitle>Protección exterior (toldos)</ValueTitle>
                <ValueText>
                  Con viento, el sistema retrae el toldo antes de que sufra.
                  Tranquilidad real, no “estar pendiente”.
                </ValueText>
                <ValueProof>
                  <Check size={16} /> Sensibilidad calibrada a tu zona
                </ValueProof>
              </ValueCard>

              <ValueCard>
                <ValueIcon>
                  <Shield />
                </ValueIcon>
                <ValueTitle>Privacidad y presencia</ValueTitle>
                <ValueText>
                  Cierres nocturnos automáticos y simulación de presencia cuando
                  no estás.
                </ValueText>
                <ValueProof>
                  <Check size={16} /> Escenas entregadas funcionando
                </ValueProof>
              </ValueCard>
            </ValueGrid>

            <ProofLine>
              <strong>Detalle Traver:</strong> límites calibrados, escenas
              configuradas y ajuste de sensores (sol/viento) antes de la entrega
              — no solo “instalado”.
            </ProofLine>
          </Section>

          {/* PACKAGES + COCKPIT */}
          <Section id="paquetes">
            <Kicker>Paquetes</Kicker>
            <H2>Elige tu nivel. Personaliza el resultado.</H2>
            <SubLead>
              Selecciona un bundle y activa extras. Verás un rango orientativo
              instantáneo. Esto es lo que hace que el sistema se sienta
              “premium”.
            </SubLead>

            <PromoBanner />

            <Cockpit>
              {/* Left: bundle cards */}
              <CockpitLeft>
                <BundleGrid>
                  {bundles.map((b) => {
                    const active = b.id === activeBundle.id;
                    return (
                      <BundleCard
                        key={b.id}
                        type="button"
                        $active={active}
                        onClick={() => setActiveBundle(b)}
                        onMouseMove={onTilt}
                        onMouseLeave={offTilt}
                        aria-pressed={active}
                      >
                        <BundleTop>
                          <BundleTag $active={active}>{b.tag}</BundleTag>
                          <BundleHint>
                            {formatEUR(b.baseFrom)} – {formatEUR(b.baseTo)}
                          </BundleHint>
                        </BundleTop>

                        <BundleTitle>{b.title}</BundleTitle>
                        <BundleSub>{b.sub}</BundleSub>

                        <BundleSignature>
                          <Sparkles size={16} />
                          <span>{b.signature}</span>
                        </BundleSignature>

                        <BundleWhy>
                          {b.why.map((w) => (
                            <BundleWhyItem key={w}>
                              <ChevronRight size={16} />
                              <span>{w}</span>
                            </BundleWhyItem>
                          ))}
                        </BundleWhy>

                        <BundleFooter>
                          <BundleCta>
                            Seleccionar <ArrowRight size={16} />
                          </BundleCta>
                        </BundleFooter>
                      </BundleCard>
                    );
                  })}
                </BundleGrid>

                <AddOns>
                  <AddOnsTitle>Extras (mejoran el “wow”)</AddOnsTitle>
                  <AddOnsGrid>
                    {addOns.map((a) => {
                      const Icon = a.icon;
                      const on = selectedAddOns.has(a.id);
                      return (
                        <AddOn
                          key={a.id}
                          $on={on}
                          onClick={() => toggleAddOn(a.id)}
                          type="button"
                        >
                          <AddOnIcon $on={on}>
                            <Icon size={18} />
                          </AddOnIcon>
                          <AddOnText>
                            <strong>
                              {a.label}{" "}
                              {a.badge ? <Badge>{a.badge}</Badge> : null}
                            </strong>
                            <span>{a.desc}</span>
                          </AddOnText>
                          <AddOnPrice>
                            {a.price === 0
                              ? "Gratis"
                              : `+${formatEUR(a.price)}`}
                          </AddOnPrice>
                        </AddOn>
                      );
                    })}
                  </AddOnsGrid>
                </AddOns>
              </CockpitLeft>

              {/* Right: sticky pricing + spec sheet */}
              <CockpitRight>
                <StickyCard>
                  <StickyTop>
                    <StickyKicker>Inversión orientativa</StickyKicker>
                    <StickyPrice>
                      <span>{formatEUR(totals.from)}</span>
                      <i>–</i>
                      <span>{formatEUR(totals.to)}</span>
                    </StickyPrice>
                    <StickySub>
                      Rango estimado · ajustamos según medidas, tejidos y nº de
                      motores.
                    </StickySub>

                    {totals.savings > 0 ? (
                      <Savings>
                        <Sparkles size={16} />
                        <span>
                          Bonus incluido: asistente de voz (valor{" "}
                          {formatEUR(totals.savings)})
                        </span>
                      </Savings>
                    ) : null}

                    <StickyButtons>
                      <StickyPrimary href="/contact">
                        Quiero una propuesta <ArrowRight size={16} />
                      </StickyPrimary>
                      <StickyGhost
                        href={CONTACT.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp
                      </StickyGhost>
                    </StickyButtons>

                    <StickyProof>
                      <strong>Entrega Traver:</strong> escenas configuradas,
                      sensibilidad ajustada y puesta en marcha guiada.
                    </StickyProof>
                  </StickyTop>

                  <Divider />

                  {/* Desktop (sticky) stays */}
                  <DesktopOnly>
                    <AutomatizacionEstimate
                      kicker="Configuración seleccionada"
                      priceText={estimateProps.priceText}
                      priceValue={estimateProps.priceValue}
                      description={estimateProps.description}
                      imageSrc={automatizacionPackImg}
                      imageAlt="Paquete de automatización integral"
                      items={estimateProps.items}
                      finePrint={estimateProps.finePrint}
                      perks={[
                        { icon: "garantia", label: "Escenas configuradas" },
                        {
                          icon: "mantenimiento",
                          label: "Calibración + entrega guiada",
                        },
                      ]}
                    />
                  </DesktopOnly>
                </StickyCard>
              </CockpitRight>
            </Cockpit>
            {/* Mobile: open in bottom sheet */}
            <MobileOnly>
              <BottomSheetOverlay
                $open={sheetOpen}
                onClick={() => setSheetOpen(false)}
                aria-hidden={!sheetOpen}
              />
              <BottomSheet
                $open={sheetOpen}
                role="dialog"
                aria-modal="true"
                aria-label="Detalle de estimación"
              >
                <SheetHandle />
                <SheetHeader>
                  <SheetTitle>Tu configuración</SheetTitle>
                  <SheetClose
                    aria-label="Cerrar detalles"
                    onClick={() => setSheetOpen(false)}
                    type="button"
                    ref={closeBtnRef}
                  >
                    Cerrar
                  </SheetClose>
                </SheetHeader>

                <SheetBody>
                  <AutomatizacionEstimate
                    kicker="Configuración seleccionada"
                    priceText={estimateProps.priceText}
                    priceValue={estimateProps.priceValue}
                    description={estimateProps.description}
                    imageSrc={automatizacionPackImg}
                    imageAlt="Paquete de automatización integral"
                    items={estimateProps.items}
                    finePrint={estimateProps.finePrint}
                    perks={[
                      { icon: "garantia", label: "Escenas configuradas" },
                      {
                        icon: "mantenimiento",
                        label: "Calibración + entrega guiada",
                      },
                    ]}
                  />
                </SheetBody>
              </BottomSheet>
            </MobileOnly>
            <MobileOnly>
              <StickyBar>
                <StickyBarLeft>
                  <StickyBarLabel>Estimación</StickyBarLabel>
                  <StickyBarValue>
                    {formatEUR(totals.from)} – {formatEUR(totals.to)}
                  </StickyBarValue>
                  <StickyBarHint>orientativo</StickyBarHint>
                </StickyBarLeft>

                <StickyBarButtons>
                  <StickyBarBtn
                    type="button"
                    onClick={() => setSheetOpen(true)}
                  >
                    Ver detalle
                  </StickyBarBtn>
                  <StickyBarCta href="/contact">Pedir propuesta</StickyBarCta>
                </StickyBarButtons>
              </StickyBar>
            </MobileOnly>
          </Section>

          {/* FINAL CTA */}
          <Section>
            <CTA>
              <div>
                <CTATitle>¿Lo vemos en tu casa?</CTATitle>
                <CTAText>
                  Medición, propuesta y presupuesto sin compromiso. Te
                  recomendaremos el bundle más equilibrado (no el más caro).
                </CTAText>
              </div>

              <CTAButtons>
                <CTAButtonPrimary href="/contact">
                  Pedir asesoramiento
                </CTAButtonPrimary>
                <CTAButtonSecondary
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </CTAButtonSecondary>
              </CTAButtons>
            </CTA>
          </Section>
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
   HERO (FUTURISTIC)
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
    linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(11, 12, 15, 0.92));
`;

const gridMove = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(22px); }
`;

const HeroGrid = styled.div`
  position: absolute;
  inset: -20%;
  opacity: 0.22;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 64px 64px;
  animation: ${gridMove} 5.2s ease-in-out infinite alternate;
  mask-image: radial-gradient(circle at 50% 30%, black 40%, transparent 72%);
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

const HeroSide = styled.div`
  display: grid;
  justify-content: end;

  @media (max-width: 979px) {
    justify-content: start;
  }
`;

const HeroStatCard = styled.div`
  width: min(420px, 100%);
  border-radius: 22px;
  padding: 1.15rem 1.15rem 1.05rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(14px);
  box-shadow: 0 26px 100px rgba(0, 0, 0, 0.35);
`;

const StatLabel = styled.div`
  color: rgba(244, 244, 245, 0.7);
  font-size: 0.9rem;
  font-weight: 720;
`;

const StatValue = styled.div`
  margin-top: 0.35rem;
  font-size: 1.55rem;
  font-weight: 880;
  color: rgba(244, 244, 245, 0.95);
`;

const StatSub = styled.div`
  margin-top: 0.35rem;
  color: rgba(244, 244, 245, 0.66);
`;

const StatRow = styled.div`
  margin-top: 0.9rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const StatPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(244, 244, 245, 0.86);
  font-weight: 720;
  font-size: 0.9rem;
`;

const BackRow = styled.div`
  margin-top: 1.05rem;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  color: rgba(244, 244, 245, 0.65);
  font-weight: 680;

  &:hover {
    color: rgba(244, 244, 245, 0.9);
  }
`;

/* =========================
   SHEET + SECTIONS
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

const Section = styled.section`
  padding: 3.2rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.06);

  &:first-child {
    border-top: none;
    padding-top: 0;
  }
`;

const Kicker = styled.p`
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(17, 17, 17, 0.55);
  margin: 0 0 0.7rem 0;
`;

const H2 = styled.h2`
  margin: 0;
  font-size: 2.1rem;
  font-weight: 760;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SubLead = styled.p`
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

const ProofLine = styled.p`
  margin: 1.1rem 0 0;
  color: rgba(15, 23, 42, 0.65);
  line-height: 1.7;

  strong {
    color: rgba(15, 23, 42, 0.9);
    font-weight: 860;
  }
`;

/* =========================
   VALUE GRID
========================= */

const ValueGrid = styled.div`
  margin-top: 1.4rem;
  display: grid;
  gap: 0.95rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ValueCard = styled.div`
  border-radius: 22px;
  padding: 1.25rem 1.25rem 1.15rem;
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.03),
    rgba(15, 23, 42, 0.01)
  );
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.06);
`;

const ValueIcon = styled.div`
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
    color: rgba(17, 17, 17, 0.9);
  }
`;

const ValueTitle = styled.h3`
  margin: 0.85rem 0 0.45rem;
  font-size: 1.15rem;
  font-weight: 860;
  letter-spacing: -0.01em;
  color: rgba(15, 23, 42, 0.92);
`;

const ValueText = styled.p`
  margin: 0;
  line-height: 1.75;
  color: rgba(15, 23, 42, 0.68);
`;

const ValueProof = styled.div`
  margin-top: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 750;
  color: rgba(15, 23, 42, 0.8);
`;

/* =========================
   COCKPIT (Bundles + Sticky)
========================= */

const Cockpit = styled.div`
  margin-top: 1.5rem;
  display: grid;
  gap: 1.1rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: start;
  }
`;

const CockpitLeft = styled.div``;

const CockpitRight = styled.div`
  @media (min-width: 980px) {
    position: relative;
  }
`;

const BundleGrid = styled.div`
  display: grid;
  gap: 0.95rem;

  @media (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const sheen = keyframes`
  from { transform: translateX(-30%) rotate(10deg); opacity: 0; }
  30% { opacity: .85; }
  to { transform: translateX(30%) rotate(10deg); opacity: 0; }
`;

const BundleCard = styled.button`
  appearance: none;
  border: 0;
  text-align: left;
  cursor: pointer;

  --rx: 0deg;
  --ry: 0deg;
  --mx: 50%;
  --my: 50%;

  position: relative;
  border-radius: 22px;
  padding: 1.15rem 1.15rem 1.05rem;

  background: ${({ $active }) =>
    $active
      ? "linear-gradient(180deg, rgba(255,255,255,1), rgba(255,255,255,0.86))"
      : "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.78))"};
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(196,151,98,.42)" : "rgba(15,23,42,.10)"};
  box-shadow: ${({ $active }) =>
    $active
      ? "0 30px 120px rgba(15,23,42,.14)"
      : "0 18px 70px rgba(15,23,42,.08)"};

  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 180ms ease, box-shadow 180ms ease,
    border-color 180ms ease;

  &:hover {
    box-shadow: 0 34px 140px rgba(15, 23, 42, 0.14);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.08),
      0 34px 140px rgba(15, 23, 42, 0.14);
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 22px;
    pointer-events: none;
    background: radial-gradient(
      420px 240px at var(--mx) var(--my),
      rgba(196, 151, 98, 0.24),
      transparent 55%
    );
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 180ms ease;
  }

  &::after {
    content: "";
    position: absolute;
    inset: -40% -60%;
    pointer-events: none;
    background: linear-gradient(
      120deg,
      transparent 35%,
      rgba(255, 255, 255, 0.32) 45%,
      transparent 55%
    );
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    animation: ${({ $active }) => ($active ? sheen : "none")} 950ms ease;
  }
`;

const BundleTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const BundleTag = styled.div`
  display: inline-flex;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: ${({ $active }) =>
    $active ? "rgba(196,151,98,0.16)" : "rgba(15,23,42,0.04)"};
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(196,151,98,0.32)" : "rgba(15,23,42,0.08)"};
  color: rgba(15, 23, 42, 0.78);
  font-weight: 860;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const BundleHint = styled.div`
  font-weight: 820;
  color: rgba(15, 23, 42, 0.68);
`;

const BundleTitle = styled.h3`
  margin: 0.85rem 0 0.35rem;
  font-size: 1.35rem;
  letter-spacing: -0.02em;
  font-weight: 880;
  color: rgba(15, 23, 42, 0.92);
`;

const BundleSub = styled.p`
  margin: 0;
  color: rgba(15, 23, 42, 0.68);
  line-height: 1.65;
`;

const BundleSignature = styled.div`
  margin-top: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-weight: 780;
  color: rgba(15, 23, 42, 0.8);
`;

const BundleWhy = styled.div`
  margin-top: 0.75rem;
  display: grid;
  gap: 0.45rem;
`;

const BundleWhyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: rgba(15, 23, 42, 0.72);
  font-weight: 650;

  svg {
    opacity: 0.75;
  }
`;

const BundleFooter = styled.div`
  margin-top: 0.9rem;
  display: flex;
  justify-content: flex-end;
`;

const BundleCta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 880;
  color: rgba(15, 23, 42, 0.92);

  svg {
    transition: transform 180ms ease;
  }

  ${BundleCard}:hover & svg {
    transform: translateX(3px);
  }
`;

const AddOns = styled.div`
  margin-top: 1.1rem;
  border-radius: 22px;
  padding: 1.15rem 1.15rem 1.05rem;
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.03),
    rgba(15, 23, 42, 0.01)
  );
  border: 1px solid rgba(15, 23, 42, 0.08);
`;

const AddOnsTitle = styled.div`
  font-weight: 900;
  letter-spacing: -0.01em;
  color: rgba(15, 23, 42, 0.9);
`;

const AddOnsGrid = styled.div`
  margin-top: 0.9rem;
  display: grid;
  gap: 0.75rem;

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const AddOn = styled.button`
  appearance: none;
  border: 0;
  cursor: pointer;
  text-align: left;

  display: grid;
  grid-template-columns: 40px 1fr auto;
  gap: 0.75rem;
  align-items: center;

  border-radius: 18px;
  padding: 0.85rem 0.85rem;

  background: ${({ $on }) =>
    $on ? "rgba(196,151,98,0.14)" : "rgba(255,255,255,0.72)"};
  border: 1px solid
    ${({ $on }) => ($on ? "rgba(196,151,98,0.32)" : "rgba(15,23,42,0.10)")};
  transition: transform 160ms ease, background 160ms ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ $on }) =>
      $on ? "rgba(196,151,98,0.18)" : "rgba(255,255,255,0.82)"};
  }
`;

const AddOnIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: ${({ $on }) =>
    $on ? "rgba(229,0,126,0.10)" : "rgba(15,23,42,0.04)"};
  border: 1px solid
    ${({ $on }) => ($on ? "rgba(229,0,126,0.16)" : "rgba(15,23,42,0.08)")};
  color: rgba(15, 23, 42, 0.9);
`;

const AddOnText = styled.div`
  strong {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    font-weight: 900;
    color: rgba(15, 23, 42, 0.92);
  }
  span {
    display: block;
    margin-top: 0.12rem;
    color: rgba(15, 23, 42, 0.66);
    line-height: 1.45;
    font-size: 0.95rem;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  padding: 0.18rem 0.5rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: rgba(15, 23, 42, 0.78);
  font-weight: 850;
  font-size: 0.78rem;
`;

const AddOnPrice = styled.div`
  font-weight: 900;
  color: rgba(15, 23, 42, 0.84);
`;

const StickyCard = styled.div`
  @media (min-width: 980px) {
    position: sticky;
    top: 92px;
  }
`;

const StickyTop = styled.div`
  border-radius: 22px;
  padding: 1.15rem 1.15rem 1.05rem;
  background: #0b0c0f;
  color: rgba(244, 244, 245, 0.95);
  box-shadow: 0 34px 140px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StickyKicker = styled.div`
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: rgba(244, 244, 245, 0.68);
`;

const StickyPrice = styled.div`
  margin-top: 0.55rem;
  font-size: 1.75rem;
  font-weight: 920;
  letter-spacing: -0.02em;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;

  i {
    font-style: normal;
    opacity: 0.6;
    font-weight: 700;
  }
`;

const StickySub = styled.div`
  margin-top: 0.35rem;
  color: rgba(244, 244, 245, 0.72);
  line-height: 1.55;
`;

const Savings = styled.div`
  margin-top: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.7rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(244, 244, 245, 0.9);
  font-weight: 750;
`;

const StickyButtons = styled.div`
  margin-top: 0.9rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const StickyPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  justify-content: center;
  padding: 0.9rem 1.05rem;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 900;
  color: #0b0c0f;
  background: ${({ theme }) => theme.colors.primary};
  transition: transform 180ms ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const StickyGhost = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.05rem;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 850;
  color: rgba(244, 244, 245, 0.92);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);

  &:hover {
    background: rgba(255, 255, 255, 0.09);
  }
`;

const StickyProof = styled.div`
  margin-top: 0.9rem;
  color: rgba(244, 244, 245, 0.7);
  line-height: 1.6;

  strong {
    color: rgba(244, 244, 245, 0.92);
    font-weight: 900;
  }
`;

const Divider = styled.div`
  height: 14px;
`;

/* =========================
   CTA
========================= */

const CTA = styled.div`
  margin-top: 1.8rem;
  border-radius: 22px;
  padding: 2.2rem;
  background: #0b0c0f;
  color: #f4f4f5;
  display: grid;
  gap: 1.2rem;

  @media (min-width: 900px) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: center;
  }
`;

const CTATitle = styled.h3`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 760;
  line-height: 1.2;
`;

const CTAText = styled.p`
  margin: 0.6rem 0 0 0;
  color: rgba(244, 244, 245, 0.72);
  line-height: 1.65;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 0.9rem;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media (min-width: 900px) {
    justify-content: flex-end;
  }
`;

const CTAButtonPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.7rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 860;
  text-decoration: none;

  &:hover {
    opacity: 0.92;
  }
`;

const CTAButtonSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(244, 244, 245, 0.92);
  font-weight: 740;
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.11);
  }
`;
/* =========================
  MOBILE SHEET
========================= */

const MobileOnly = styled.div`
  @media (min-width: 980px) {
    display: none;
  }
`;

const DesktopOnly = styled.div`
  @media (max-width: 979px) {
    display: none;
  }
`;

const BottomSheetOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  z-index: 999;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 220ms ease;
`;

const BottomSheet = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 88vh;
  background: #0b0c0f;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
  z-index: 1000;
  transform: translateY(${({ $open }) => ($open ? "0%" : "105%")});
  transition: transform 260ms cubic-bezier(0.2, 0.9, 0.2, 1);
  overflow: auto;
  box-shadow: 0 -24px 90px rgba(0, 0, 0, 0.55);
`;

const SheetHandle = styled.div`
  width: 44px;
  height: 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.22);
  margin: 10px auto 6px;
`;

const SheetHeader = styled.div`
  padding: 0.85rem 1rem 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SheetTitle = styled.div`
  font-weight: 900;
  color: rgba(244, 244, 245, 0.95);
  letter-spacing: -0.01em;
`;

const SheetClose = styled.button`
  appearance: none;
  border: 0;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(244, 244, 245, 0.9);
  border-radius: 999px;
  padding: 0.55rem 0.75rem;
  font-weight: 800;
`;

const StickyBar = styled.div`
  position: sticky;
  bottom: 0;
  margin-top: 1.1rem;
  padding: 0.85rem 0.9rem;
  border-radius: 18px;
  background: rgba(11, 12, 15, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.9rem;
`;

const StickyBarLeft = styled.div`
  display: grid;
  gap: 0.1rem;
`;

const StickyBarLabel = styled.div`
  font-size: 0.8rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(244, 244, 245, 0.68);
`;

const StickyBarValue = styled.div`
  font-size: 1.02rem;
  font-weight: 900;
  color: rgba(244, 244, 245, 0.95);
`;

const StickyBarHint = styled.div`
  font-size: 0.85rem;
  color: rgba(244, 244, 245, 0.65);
`;

const StickyBarButtons = styled.div`
  display: flex;
  gap: 0.55rem;
  flex-wrap: nowrap;
`;

const StickyBarBtn = styled.button`
  appearance: none;
  border: 0;
  cursor: pointer;
  border-radius: 999px;
  padding: 0.75rem 0.85rem;
  font-weight: 900;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(244, 244, 245, 0.92);
  white-space: nowrap;
`;

const StickyBarCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0.75rem 0.95rem;
  font-weight: 950;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  text-decoration: none;
  white-space: nowrap;
`;
const SheetBody = styled.div`
  padding: 1rem 1.25rem 1.5rem;
  overflow-y: auto;
  max-height: calc(100vh - 120px);
`;
