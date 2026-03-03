import { ArrowRight, Moon, Smartphone, Sun, Wind } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AutomationFaq from "../components/automatizacion/AutomationFaq";
import { CONTACT } from "../config/contact";
import { trackEvent } from "../lib/analytics";
/* =========================
   ASSETS
========================= */
import benefit1 from "../assets/Automatizacion/benefit1.webp";
import automatizacionPackImg from "../assets/Automatizacion/domoticaInd.webp";
import programaHorarios from "../assets/Automatizacion/programa.webp";
import vacaciones from "../assets/Automatizacion/vacaciones.webp";
import Img3 from "../assets/Home/HeroImg/img3.webp";
import heroVideo from "../assets/video1.mp4";
/* =========================
   PAGE
========================= */
export default function Automatizacion({ onOpenAsesoramiento }) {
  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");

  const canonical = `${baseUrl}/automatizacion`;
  const siteName = CONTACT.siteName || "Traver Decoración Textil";

  const title =
    "Automatización Somfy | Cortinas, estores y toldos motorizados en Castellón y Valencia";
  const description =
    "Automatiza cortinas, estores, persianas y toldos con Somfy: sensores, escenas y control por app. Instalación profesional en Castellón y Valencia. Asesoramiento y propuesta a medida.";

  const ogImage = `${baseUrl}/og.png`;
  const ogImageAlt = "Automatización Somfy para cortinas y toldos a medida";

  const jsonLd = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: "Automatización Somfy",
        serviceType: "Automatización de cortinas, estores, persianas y toldos",
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
    ],
    [baseUrl, canonical, description, siteName, title]
  );

  // Premium: cursor spotlight + subtle parallax tilt (no libs)
  useEffect(() => {
    const root = document.documentElement;

    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        root.style.setProperty("--mx", `${x * 100}%`);
        root.style.setProperty("--my", `${y * 100}%`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // Premium: intersection reveal (adds data-reveal="in")
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.setAttribute("data-reveal", "in");
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Premium: FAQ accordion (editorial + clean)
  const faqs = useMemo(
    () => [
      {
        q: "¿Se puede empezar por una zona y ampliar después?",
        a: "Sí. Diseñamos una base sólida (motores + control) para que puedas añadir estancias o productos sin rehacerlo todo.",
        aText:
          "Sí. Diseñamos una base sólida (motores + control) para que puedas añadir estancias o productos sin rehacerlo todo.",
      },
      {
        q: "¿La instalación se nota? (cajas, cableado, estética)",
        a: "Nuestro enfoque es “estética primero”: solución discreta, remates limpios y configuración final para que solo se vea el resultado.",
        aText:
          "Nuestro enfoque es “estética primero”: solución discreta, remates limpios y configuración final para que solo se vea el resultado.",
      },
      {
        q: "¿Necesito domótica completa para usar Somfy?",
        a: "No. Puedes empezar con app, mando o escenas simples. Si quieres integrar más adelante, lo dejamos preparado.",
        aText:
          "No. Puedes empezar con app, mando o escenas simples. Si quieres integrar más adelante, lo dejamos preparado.",
      },
      {
        q: "¿Qué gana el día a día (más allá del móvil)?",
        a: "Confort real: luz y privacidad en el punto justo, escenas que se activan solas y un hogar que responde con calma.",
        aText:
          "Confort real: luz y privacidad en el punto justo, escenas que se activan solas y un hogar que responde con calma.",
      },
    ],
    []
  );

  return (
    <Page>
      <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
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

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* HERO (DO NOT CHANGE) */}
      <Hero>
        <HeroVideo src={heroVideo} autoPlay muted loop playsInline />
        <HeroOverlay />
        <HeroContent>
          <Eyebrow>Automatización residencial · Somfy</Eyebrow>
          <HeroTitle>
            El lujo no se <span>controla</span>. <br />
            Se anticipa.
          </HeroTitle>
          <HeroSubtitle>
            Cortinas, estores y toldos que responden con precisión silenciosa a
            la luz, al clima y a tu rutina. Sin esfuerzo. Sin interrupciones.
            Como debe ser.
          </HeroSubtitle>

          <HeroActions>
            <PrimaryButton
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                trackEvent("open_quick_enquiry", {
                  source: "automatizacion_private",
                  pack: "Automatización",
                });
                onOpenAsesoramiento?.(
                  "Automatización",
                  "automatizacion_private"
                );
              }}
            >
              Asesoramiento privado
            </PrimaryButton>
            <SecondaryButton href="#experiencia">
              Descubrir la experiencia
            </SecondaryButton>
          </HeroActions>

          <MicroLine>
            Proyectos a medida para hogares exigentes. Integración discreta,
            acabado impecable y una sensación que solo se entiende al vivirla.
          </MicroLine>
        </HeroContent>
      </Hero>

      {/* PREMIUM CONTENT */}
      <Surface>
        <Ambient aria-hidden="true" />
        <Noise aria-hidden="true" />
        <SurfaceInner>
          {/* SECTION: INTRO / ESSENCE */}
          <Section data-reveal="out">
            <SectionTop>
              <Kicker>Esencia</Kicker>
              <Title>
                La casa funciona <span>sola</span>
              </Title>
              <Lead>
                Automatización elegante y discreta para que luz, privacidad y
                confort respondan con calma a tu día. Sin ruido visual. Sin
                fricción.
              </Lead>
            </SectionTop>

            <EditorialGrid>
              <EditorialCard>
                <CardTop>
                  <Chip>Diseño + tecnología</Chip>
                  <CardTitle>Menos “domótica”. Más sensación.</CardTitle>
                  <CardText>
                    Escenas, sensores y horarios — con un objetivo: que tu hogar
                    se sienta mejor sin que “se note” el sistema. Una ejecución
                    limpia, una respuesta silenciosa.
                  </CardText>
                </CardTop>

                <Rule />

                <BulletGrid>
                  <Bullet>
                    <Dot />
                    <span>Silencio y precisión en cada movimiento</span>
                  </Bullet>
                  <Bullet>
                    <Dot />
                    <span>Escenas reales: día, noche, cine, verano</span>
                  </Bullet>
                  <Bullet>
                    <Dot />
                    <span>Integración discreta: estética primero</span>
                  </Bullet>
                </BulletGrid>

                <CardActions>
                  <MiniPrimary
                    to="/contact"
                    onClick={(e) => {
                      e.preventDefault();

                      trackEvent("open_quick_enquiry", {
                        source: "mini_primary_cta",
                        pack: "Automatización",
                      });

                      onOpenAsesoramiento?.(
                        "Automatización",
                        "mini_primary_cta"
                      );
                    }}
                  >
                    Solicitar propuesta <ArrowRight size={16} />
                  </MiniPrimary>
                  <MiniGhost href="#escenas">Ver escenas</MiniGhost>
                </CardActions>
              </EditorialCard>

              <MediaCard aria-label="Automatización residencial discreta y elegante">
                <MediaImage
                  src={automatizacionPackImg}
                  alt="Automatización residencial discreta y elegante"
                  loading="lazy"
                />
                <MediaTint />
                <MediaLabel>
                  <strong>Somfy</strong>
                  <span>motores · sensores · escenas</span>
                </MediaLabel>
              </MediaCard>
            </EditorialGrid>

            <StatsRow>
              <Stat>
                <StatKicker>Instalación</StatKicker>
                <StatValue>Impecable</StatValue>
                <StatText>Remates limpios, estética respetada.</StatText>
              </Stat>
              <Stat>
                <StatKicker>Movimiento</StatKicker>
                <StatValue>Silencioso</StatValue>
                <StatText>Precisión suave, sin tirones.</StatText>
              </Stat>
              <Stat>
                <StatKicker>Control</StatKicker>
                <StatValue>Simple</StatValue>
                <StatText>App, mando y escenas coordinadas.</StatText>
              </Stat>
            </StatsRow>
          </Section>

          {/* SECTION: PATHS */}
          <Section
            id="enfoque"
            aria-label="Elige tu enfoque de automatización"
            data-reveal="out"
          >
            <SectionTop>
              <Kicker>Elige tu enfoque</Kicker>
              <Title>
                Dos formas de empezar a <span>automatizar</span>
              </Title>
              <Lead>
                Puedes integrar todo el hogar desde el principio o comenzar por
                una zona concreta y ampliar cuando lo disfrutes.
              </Lead>
            </SectionTop>

            <PathGrid>
              <PathCard
                to="/automatizacion/completa"
                aria-label="Automatización integral del hogar"
              >
                <PathMedia>
                  <PathImg
                    style={{ backgroundImage: `url(${automatizacionPackImg})` }}
                  />
                  <PathOverlay />
                  <PathBadge>Integral</PathBadge>
                </PathMedia>

                <PathBody>
                  <PathTitle>Automatización completa</PathTitle>
                  <PathText>
                    Un sistema coordinado que integra cortinas, persianas,
                    toldos, sensores y escenas para que todo funcione en
                    armonía.
                  </PathText>

                  <PathCta>
                    Ver solución integral <ArrowRight size={16} />
                  </PathCta>
                </PathBody>

                <Sheen aria-hidden="true" />
              </PathCard>

              <PathCard
                to="/automatizacion/individual"
                aria-label="Automatización por zonas"
              >
                <PathMedia>
                  <PathImg style={{ backgroundImage: `url(${Img3})` }} />
                  <PathOverlay />
                  <PathBadge>Por zonas</PathBadge>
                </PathMedia>

                <PathBody>
                  <PathTitle>Automatización individual</PathTitle>
                  <PathText>
                    Empieza por cortinas, persianas o toldos. Diseñamos la base
                    perfecta para que puedas ampliar cuando quieras.
                  </PathText>

                  <PathCta>
                    Ver opciones por zona <ArrowRight size={16} />
                  </PathCta>
                </PathBody>

                <Sheen aria-hidden="true" />
              </PathCard>
            </PathGrid>

            <Quote>
              <QuoteMark aria-hidden="true">“</QuoteMark>
              <QuoteText>
                El lujo aquí es invisible: todo está pensado para que la casa se
                anticipe sin que tú tengas que pensar.
              </QuoteText>
              <QuoteMeta>
                <span>Traver</span> · Instalación profesional en Castellón y
                Valencia
              </QuoteMeta>
            </Quote>
          </Section>

          {/* SECTION: BENEFITS */}
          <Section id="experiencia" data-reveal="out">
            <SectionTop>
              <Kicker>Experiencia</Kicker>
              <Title>
                Automatización que se <span>siente</span>
              </Title>
              <Lead>
                Luz a medida, tranquilidad real y rutinas que se adaptan. La
                diferencia está en el ajuste fino.
              </Lead>
            </SectionTop>

            <BenefitsGrid>
              <BenefitCard>
                <BenefitMedia>
                  <BenefitImg
                    src={benefit1}
                    alt="Luz natural regulada"
                    loading="lazy"
                    decoding="async"
                  />
                  <BenefitOverlay />
                </BenefitMedia>

                <BenefitBody>
                  <BenefitTitle>Luz que acompaña el día</BenefitTitle>
                  <BenefitParagraph>
                    Persianas, toldos y cortinas se ajustan para dejar pasar la
                    cantidad justa de luz. Confort visual, sin deslumbramientos.
                  </BenefitParagraph>

                  <BenefitHint>
                    Ajuste automático <Dot /> Sin esfuerzo
                  </BenefitHint>
                </BenefitBody>

                <Sheen aria-hidden="true" />
              </BenefitCard>

              <BenefitCard>
                <BenefitMedia>
                  <BenefitImg
                    src={vacaciones}
                    alt="Control del hogar durante vacaciones"
                    loading="lazy"
                  />
                  <BenefitOverlay />
                </BenefitMedia>

                <BenefitBody>
                  <BenefitTitle>Tranquilidad estés donde estés</BenefitTitle>
                  <BenefitParagraph>
                    Control desde el móvil y simulación de presencia cuando no
                    estás en casa. Una sensación de calma, incluso de viaje.
                  </BenefitParagraph>

                  <BenefitHint>
                    Presencia real <Dot /> Más seguridad
                  </BenefitHint>
                </BenefitBody>

                <Sheen aria-hidden="true" />
              </BenefitCard>

              <BenefitCard>
                <BenefitMedia>
                  <BenefitImg
                    src={programaHorarios}
                    alt="Programación de horarios"
                    loading="lazy"
                  />
                  <BenefitOverlay />
                </BenefitMedia>

                <BenefitBody>
                  <BenefitTitle>Rutinas que se adaptan a ti</BenefitTitle>
                  <BenefitParagraph>
                    Horarios por estación o por tu día a día. La casa se ajusta
                    sola. Tú solo lo disfrutas.
                  </BenefitParagraph>

                  <BenefitHint>
                    Rutinas inteligentes <Dot /> A tu ritmo
                  </BenefitHint>
                </BenefitBody>

                <Sheen aria-hidden="true" />
              </BenefitCard>
            </BenefitsGrid>

            <MicroProof>
              <strong>Consejo Traver:</strong> empezamos por lo que más se nota
              (luz + privacidad) y escalamos cuando lo disfrutas.
            </MicroProof>
          </Section>
          {/* SECTION: SCENES (interactive, “premium”) */}
          <Section id="escenas" data-reveal="out">
            <SectionTop>
              <Kicker>Escenas</Kicker>
              <Title>
                Automatización con <span>sentido</span>
              </Title>
              <Lead>
                Lo importante no es la app. Es lo que evita: calor,
                deslumbramientos, daños por viento y la sensación de “estar
                pendiente”.
              </Lead>
            </SectionTop>

            <ScenesGrid>
              <SceneTile>
                <SceneIcon aria-hidden="true">
                  <Sun size={18} />
                </SceneIcon>
                <SceneTileTitle>Mañana</SceneTileTitle>
                <SceneTileText>
                  Apertura suave para aprovechar luz natural sin
                  deslumbramiento.
                </SceneTileText>
                <SceneMeta>Horario · amanecer · rutina</SceneMeta>
              </SceneTile>

              <SceneTile>
                <SceneIcon aria-hidden="true">
                  <Moon size={18} />
                </SceneIcon>
                <SceneTileTitle>Noche</SceneTileTitle>
                <SceneTileText>
                  Privacidad total y oscuridad cuando toca. Se cierra sola.
                </SceneTileText>
                <SceneMeta>Anochecer · descanso</SceneMeta>
              </SceneTile>

              <SceneTile>
                <SceneIcon aria-hidden="true">
                  <Wind size={18} />
                </SceneIcon>
                <SceneTileTitle>Viento / lluvia</SceneTileTitle>
                <SceneTileText>
                  El toldo se recoge automáticamente para evitar golpes y
                  tensiones.
                </SceneTileText>
                <SceneMeta>Sensores · protección</SceneMeta>
              </SceneTile>

              <SceneTile>
                <SceneIcon aria-hidden="true">
                  <Smartphone size={18} />
                </SceneIcon>
                <SceneTileTitle>Control por app</SceneTileTitle>
                <SceneTileText>
                  Mando o móvil. Ajustes rápidos y escenas guardadas para cada
                  momento.
                </SceneTileText>
                <SceneMeta>Wi-Fi · escenas</SceneMeta>
              </SceneTile>
            </ScenesGrid>

            {/* FINAL CTA */}
            <Section data-reveal="out">
              <CTA>
                <div>
                  <CTATitle>¿Lo vemos en tu casa?</CTATitle>
                  <CTAText>
                    Te proponemos una solución clara y realista según tu
                    espacio. Medición, propuesta y presupuesto sin compromiso.
                  </CTAText>
                </div>

                <CTAButtons>
                  <CTAButtonPrimary
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      trackEvent("open_quick_enquiry", {
                        source: "automatizacion_primary",
                        pack: "Automatización",
                      });
                      onOpenAsesoramiento?.(
                        "Automatización",
                        "automatizacion_primary"
                      );
                    }}
                  >
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
          </Section>
          {/* SECTION: PROCESS */}
          <Section data-reveal="out">
            <SectionTop>
              <Kicker>Proceso</Kicker>
              <Title>
                Cómo <span>trabajamos</span>
              </Title>
              <Lead>
                Una experiencia sencilla, cuidada y sin sorpresas: desde la
                medición hasta la puesta en marcha.
              </Lead>
            </SectionTop>

            <Steps>
              <Step>
                <StepIndex>01</StepIndex>
                <StepTitle>Escuchamos tu espacio</StepTitle>
                <StepText>
                  Medimos, analizamos y entendemos cómo vives tu hogar para
                  proponer lo que tiene sentido.
                </StepText>
              </Step>

              <Step>
                <StepIndex>02</StepIndex>
                <StepTitle>Diseñamos la solución</StepTitle>
                <StepText>
                  Propuesta clara y realista, con opciones equilibradas según
                  tejidos, medidas y uso.
                </StepText>
              </Step>

              <Step>
                <StepIndex>03</StepIndex>
                <StepTitle>Instalamos y ajustamos</StepTitle>
                <StepText>
                  Instalación certificada, ajuste fino y entrega final para que
                  todo funcione con precisión.
                </StepText>
              </Step>
            </Steps>
          </Section>

          {/* SECTION: FAQ */}
          <AutomationFaq
            items={faqs}
            kicker="FAQ"
            title={
              <>
                Respuestas claras, <span>sin humo</span>
              </>
            }
            lead="Si lo estás considerando, esto es lo que más nos preguntan."
            withSchema
            canonicalUrl={canonical}
          />
        </SurfaceInner>
      </Surface>
    </Page>
  );
}

/* =========================
   REQUIRED TITLE (DO NOT EDIT)
========================= */
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

/* =========================
   PAGE
========================= */

const Page = styled.main`
  width: 100%;
  background: #0b0c0f;
  color: #f4f4f5;

  /* Spotlight follows cursor */
  --mx: 50%;
  --my: 35%;
`;

/* =========================
   HERO (KEEP AS IS)
========================= */

const Hero = styled.section`
  position: relative;
  min-height: 45vh;
  min-height: 45svh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 6rem 2rem 4.5rem;
  overflow: hidden;
  margin-top: 0rem;

  @media (max-width: 768px) {
    margin-top: 0rem;
    min-height: 42vh;
    min-height: 42svh;
    padding: 4rem 1.5rem 3rem;
  }
`;

const HeroVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 22%;
  transform: scale(1.06);
  filter: saturate(0.95) contrast(1.05);
  z-index: 0;

  @media (min-width: 1320px) {
    transform: scale(1.12);
  }
  @media (min-width: 1400px) {
    transform: scale(1.15);
  }
  @media (min-width: 1600px) {
    transform: scale(1.18);
  }
  @media (min-width: 1800px) {
    transform: scale(1.22);
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      1200px 700px at 50% 35%,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.68)
    ),
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35) 0%,
      rgba(0, 0, 0, 0.88) 70%,
      rgba(11, 12, 15, 1) 100%
    );
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1100px;
`;

const Eyebrow = styled.p`
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(244, 244, 245, 0.72);
  margin: 0 0 0.9rem 0;
`;

const HeroTitle = styled.h1`
  font-size: 3.45rem;
  font-weight: 600;
  line-height: 1.04;
  margin: 0 0 1.2rem 0;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.55rem;
    line-height: 1.08;
  }
`;

const HeroSubtitle = styled.p`
  max-width: 58ch;
  font-size: 1.15rem;
  line-height: 1.75;
  color: rgba(244, 244, 245, 0.78);
  margin: 0;
`;

const HeroActions = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2.25rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.25s ease, opacity 0.25s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
  @media (max-width: 520px) {
    width: 100%;
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2.15rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(244, 244, 245, 0.9);
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.09);
    transform: translateY(-1px);
  }
  @media (max-width: 520px) {
    width: 100%;
  }
`;

const MicroLine = styled.p`
  margin-top: 1.4rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(244, 244, 245, 0.6);
`;

/* =========================
   PREMIUM SURFACE + FX
========================= */
const Surface = styled.section`
  position: relative;
  background: #f4f5f7;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  margin-top: -18px;
  box-shadow: 0 -20px 80px rgba(0, 0, 0, 0.35);
  border-top: 1px solid rgba(196, 151, 98, 0.35);
  overflow: hidden;
`;

/* Ambient spotlight + editorial gradient, follows cursor */
const Ambient = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
      800px 520px at var(--mx) var(--my),
      rgba(196, 151, 98, 0.18),
      rgba(196, 151, 98, 0.05) 45%,
      rgba(244, 245, 247, 0) 70%
    ),
    radial-gradient(
      900px 620px at 18% 12%,
      rgba(15, 23, 42, 0.06),
      rgba(244, 245, 247, 0) 62%
    );
  mix-blend-mode: multiply;
  opacity: 0.9;

  @media (prefers-reduced-motion: reduce) {
    background: radial-gradient(
      900px 600px at 50% 20%,
      rgba(196, 151, 98, 0.12),
      rgba(244, 245, 247, 0) 70%
    );
  }
`;

/* Subtle film grain */
const Noise = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.08;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
`;

const SurfaceInner = styled.div`
  position: relative;
  width: min(1120px, calc(100% - 3rem));
  margin: 0 auto;
  padding: clamp(2.2rem, 5vw, 4rem) 0 4.25rem;

  @media (max-width: 768px) {
    width: min(1120px, calc(100% - 2rem));
  }
`;

const Section = styled.section`
  padding: clamp(2.2rem, 4.2vw, 3.4rem) 0;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);

  &:last-of-type {
    border-bottom: 0;
    padding-bottom: 0;
  }

  /* Reveal animation */
  &[data-reveal="out"] {
    opacity: 0;
    transform: translateY(10px);
    filter: blur(2px);
  }
  &[data-reveal="in"] {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
    transition: opacity 700ms ease, transform 700ms ease, filter 700ms ease;
  }

  @media (prefers-reduced-motion: reduce) {
    &[data-reveal="out"],
    &[data-reveal="in"] {
      opacity: 1;
      transform: none;
      filter: none;
      transition: none;
    }
  }
`;

const SectionTop = styled.div`
  max-width: 860px;
  margin-bottom: 1.35rem;
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

const Lead = styled.p`
  margin: 0.75rem 0 0;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.62);
`;

/* =========================
   INTRO (Editorial)
========================= */
const EditorialGrid = styled.div`
  margin-top: 1.8rem;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.1rem;
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const EditorialCard = styled.div`
  border-radius: 24px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.66)
  );
  box-shadow: 0 28px 90px rgba(15, 23, 42, 0.08);
  padding: clamp(1.25rem, 2.5vw, 1.6rem);
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    inset: -2px;
    background: radial-gradient(
      600px 340px at var(--mx) var(--my),
      rgba(196, 151, 98, 0.22),
      rgba(196, 151, 98, 0) 55%
    );
    opacity: 0.65;
    pointer-events: none;
  }
`;

const CardTop = styled.div`
  position: relative;
  z-index: 1;
`;

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.08);
  color: rgba(15, 23, 42, 0.78);
  font-weight: 760;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const CardTitle = styled.h3`
  margin: 0.85rem 0 0.5rem;
  font-size: 1.55rem;
  letter-spacing: -0.02em;
  color: rgba(15, 23, 42, 0.92);
`;

const CardText = styled.p`
  margin: 0;
  line-height: 1.75;
  color: rgba(15, 23, 42, 0.72);
  max-width: 62ch;
`;

const Rule = styled.div`
  margin: 1.05rem 0;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(196, 151, 98, 0.55),
    rgba(15, 23, 42, 0.08),
    transparent
  );
`;

const BulletGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 0.65rem;
`;

const Bullet = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;

  span {
    line-height: 1.55;
    color: rgba(17, 17, 17, 0.82);
    font-weight: 680;
  }
`;

const CardActions = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 1.15rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const MiniPrimary = styled(Link)`
  text-decoration: none;
  padding: 0.9rem 1.05rem;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: #111;
  font-weight: 720;
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.12);
  transition: transform 180ms ease, filter 180ms ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.02);
  }
`;

const MiniGhost = styled.a`
  text-decoration: none;
  padding: 0.9rem 1.05rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(15, 23, 42, 0.12);
  color: rgba(15, 23, 42, 0.82);
  font-weight: 700;
  transition: transform 180ms ease, background 180ms ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(15, 23, 42, 0.02);
  }
`;

const MediaCard = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  min-height: 320px;
  background: #0b0c0f;
  box-shadow: 0 34px 100px rgba(15, 23, 42, 0.14);
  border: 1px solid rgba(196, 151, 98, 0.18);

  transform: translateZ(0);
`;

const MediaImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transform: scale(1.04);
  filter: contrast(1.06) saturate(0.98);
`;

const MediaTint = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      900px 520px at var(--mx) var(--my),
      rgba(196, 151, 98, 0.24),
      rgba(0, 0, 0, 0) 58%
    ),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.45));
  opacity: 0.9;
`;

const MediaLabel = styled.div`
  position: absolute;
  left: 14px;
  bottom: 14px;
  padding: 0.75rem 0.9rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(196, 151, 98, 0.28);
  backdrop-filter: blur(12px);
  color: rgba(255, 255, 255, 0.9);

  strong {
    display: block;
    font-weight: 760;
    letter-spacing: -0.01em;
  }

  span {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.78);
  }
`;

const StatsRow = styled.div`
  margin-top: 1.05rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.85rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Stat = styled.div`
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.8);
  padding: 1rem 1rem 0.95rem;
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.05);
`;

const StatKicker = styled.div`
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-size: 0.72rem;
  color: rgba(15, 23, 42, 0.58);
  font-weight: 760;
`;

const StatValue = styled.div`
  margin-top: 0.35rem;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  color: rgba(15, 23, 42, 0.92);
  font-weight: 820;
`;

const StatText = styled.div`
  margin-top: 0.35rem;
  color: rgba(15, 23, 42, 0.66);
  line-height: 1.6;
`;

/* =========================
   PATHS (kept + refined)
========================= */
const PathGrid = styled.div`
  margin-top: 1.25rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.95rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PathCard = styled(Link)`
  position: relative;
  display: block;
  border-radius: 20px;
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

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1), 0 12px 30px rgba(17, 17, 17, 0.06);
  }
`;

const PathMedia = styled.div`
  position: relative;
  height: 150px;

  @media (max-width: 900px) {
    height: 160px;
  }
`;

const PathImg = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.01);
  transition: transform 700ms ease;

  ${PathCard}:hover & {
    transform: scale(1.06);
  }
`;

const PathOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.22));
`;

const PathBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(196, 151, 98, 0.35);
  background: rgba(255, 255, 255, 0.86);
  color: rgba(17, 17, 17, 0.78);
  font-size: 0.78rem;
  font-weight: 800;
`;

const PathBody = styled.div`
  padding: 1rem 1rem 1.05rem;
  display: grid;
  gap: 0.35rem;
`;

const PathTitle = styled.h3`
  margin: 0;
  font-size: 1.12rem;
  letter-spacing: -0.01em;
  color: rgba(17, 17, 17, 0.95);
`;

const PathText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  color: rgba(17, 17, 17, 0.62);
`;

const PathCta = styled.div`
  margin-top: 0.35rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 850;
  font-size: 0.95rem;
  color: rgba(17, 17, 17, 0.92);

  svg {
    transition: transform 200ms ease;
  }

  ${PathCard}:hover & svg {
    transform: translateX(3px);
  }
`;

/* =========================
   QUOTE
========================= */
const Quote = styled.figure`
  margin: 1.25rem 0 0;
  border-radius: 22px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.72)
  );
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.06);
  padding: 1.2rem 1.2rem 1.05rem;
  position: relative;
  overflow: hidden;
`;

const QuoteMark = styled.div`
  position: absolute;
  top: -16px;
  left: 12px;
  font-size: 4rem;
  color: rgba(196, 151, 98, 0.22);
  font-weight: 900;
  line-height: 1;
`;

const QuoteText = styled.blockquote`
  margin: 0;
  padding: 0.25rem 0 0;
  font-size: 1.08rem;
  line-height: 1.75;
  color: rgba(15, 23, 42, 0.78);
  max-width: 78ch;
`;

const QuoteMeta = styled.figcaption`
  margin-top: 0.7rem;
  color: rgba(15, 23, 42, 0.62);
  font-size: 0.95rem;

  span {
    color: rgba(15, 23, 42, 0.86);
    font-weight: 780;
  }
`;

/* =========================
   SCENES (interactive)
========================= */
const ScenesGrid = styled.div`
  display: grid;
  gap: 1.15rem;
  margin-top: 1.8rem;

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    padding-bottom: 0.35rem;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (min-width: 980px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }
`;

const SceneTile = styled.article`
  border-radius: 20px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.55)
  );
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.06);
  padding: 1.35rem 1.25rem;

  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  height: 100%;

  transition: transform 0.25s ease, box-shadow 0.25s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    left: 14px;
    right: 14px;
    top: 12px;
    height: 1px;
    background: linear-gradient(
      to right,
      rgba(196, 151, 98, 0.65),
      rgba(15, 23, 42, 0.08),
      transparent
    );
    opacity: 0.9;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 26px 70px rgba(0, 0, 0, 0.08);
    border-color: rgba(229, 0, 126, 0.22);
  }

  @media (max-width: 768px) {
    min-width: 84%;
    scroll-snap-align: start;
  }

  @media (max-width: 520px) {
    padding: 1.1rem 1rem;
  }
`;
const SceneIcon = styled.div`
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
  ${SceneTile}:hover & {
    background: rgba(229, 0, 126, 0.1);
    border-color: rgba(229, 0, 126, 0.2);
  }
`;

const SceneTileTitle = styled.h3`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 750;
  color: rgba(17, 17, 17, 0.92);
`;

const SceneTileText = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.6;
  color: rgba(17, 17, 17, 0.68);
  @media (max-width: 520px) {
    font-size: 0.95rem;
  }
`;

const SceneMeta = styled.p`
  margin-top: auto;
  padding-top: 0.85rem;
  font-size: 0.88rem;
  font-weight: 750;
  color: rgba(17, 17, 17, 0.6);

  @media (max-width: 520px) {
    font-size: 0.82rem;
  }
`;

/* =========================
   BENEFITS (kept)
========================= */
const BenefitsGrid = styled.div`
  margin-top: 1.4rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.9rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: unset;
    display: flex;
    gap: 0.85rem;
    overflow-x: auto;
    padding-bottom: 0.35rem;

    padding-left: 0.25rem;
    padding-right: 0.25rem;

    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const BenefitCard = styled.article`
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(17, 17, 17, 0.1);
  box-shadow: 0 12px 30px rgba(17, 17, 17, 0.06);
  transition: transform 220ms ease, box-shadow 220ms ease,
    border-color 220ms ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 44px rgba(17, 17, 17, 0.09);
    border-color: rgba(17, 17, 17, 0.14);
  }

  @media (max-width: 768px) {
    min-width: 86%;
    scroll-snap-align: start;
  }
`;

const BenefitMedia = styled.div`
  position: relative;
  height: 140px;

  @media (max-width: 768px) {
    height: 160px;
  }
`;

const BenefitImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform 700ms ease;

  ${BenefitCard}:hover & {
    transform: scale(1.06);
  }
`;

const BenefitOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.22));
`;

const BenefitBody = styled.div`
  padding: 0.95rem 0.95rem 1.05rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.4rem;
`;

const BenefitTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  color: rgba(17, 17, 17, 0.95);
`;

const BenefitParagraph = styled.p`
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.55;
  color: rgba(17, 17, 17, 0.62);
`;

const BenefitHint = styled.div`
  margin-top: auto;
  padding-top: 0.3rem;
  font-size: 0.88rem;
  font-weight: 750;
  color: rgba(17, 17, 17, 0.85);
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: inline-block;
`;

const Sheen = styled.div`
  position: absolute;
  inset: -40% -60%;
  background: linear-gradient(
    120deg,
    transparent 35%,
    rgba(255, 255, 255, 0.28) 45%,
    transparent 55%
  );
  transform: translateX(-30%) rotate(10deg);
  opacity: 0;
  pointer-events: none;
  transition: opacity 240ms ease;

  ${BenefitCard}:hover &,
  ${PathCard}:hover & {
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

const MicroProof = styled.p`
  margin: 1rem 0 0;
  color: rgba(17, 17, 17, 0.62);
  font-size: 0.95rem;
  line-height: 1.6;

  strong {
    color: rgba(17, 17, 17, 0.9);
    font-weight: 800;
  }
`;

/* =========================
   STEPS (kept)
========================= */
const Steps = styled.div`
  margin-top: 1.7rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.1rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Step = styled.div`
  border-radius: 22px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: linear-gradient(
    180deg,
    rgba(252, 252, 255, 1),
    rgba(219, 233, 244, 1)
  );
  padding: 1.35rem 1.35rem 1.25rem;
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.06);
  transition: transform 180ms ease, box-shadow 180ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.08);
  }
`;

const StepIndex = styled.div`
  font-weight: 900;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.95;
`;

const StepTitle = styled.h3`
  margin: 0.7rem 0 0.55rem;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
  color: rgba(15, 23, 42, 0.9);
`;

const StepText = styled.p`
  margin: 0;
  line-height: 1.75;
  color: rgba(15, 23, 42, 0.68);
`;

/* =========================
   CTA (kept)
========================= */
const CTA = styled.div`
  border-radius: 26px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: radial-gradient(
      1200px 600px at 20% 10%,
      rgba(0, 0, 0, 0.03),
      rgba(0, 0, 0, 0)
    ),
    linear-gradient(180deg, #fff, rgba(15, 23, 42, 0.01));
  padding: clamp(1.35rem, 3.2vw, 2rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  box-shadow: 0 26px 90px rgba(15, 23, 42, 0.1);

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CTATitle = styled.h3`
  margin: 0;
  font-size: 1.6rem;
  letter-spacing: -0.02em;
  color: rgba(15, 23, 42, 0.92);
`;

const CTAText = styled.p`
  margin: 0.55rem 0 0;
  line-height: 1.75;
  color: rgba(15, 23, 42, 0.68);
  max-width: 56ch;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const CTAButtonPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.15rem;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 750;
  color: #111;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.12);
  transition: transform 180ms ease, filter 180ms ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.02);
  }
`;

const CTAButtonSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.15rem;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 750;
  color: rgba(15, 23, 42, 0.86);
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.12);
  transition: transform 180ms ease, background 180ms ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(15, 23, 42, 0.02);
  }
`;
