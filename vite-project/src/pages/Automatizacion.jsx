import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CONTACT } from "../config/contact";

/* =========================
   ASSETS
========================= */
import benefit1 from "../assets/Automatizacion/benefit1.png";
import automatizacionPackImg from "../assets/Automatizacion/domoticaInd.png";
import programaHorarios from "../assets/Automatizacion/programa.png";
import vacaciones from "../assets/Automatizacion/vacaciones.png";
import cortinasEstores from "../assets/Home/HeroImg/img2.webp";
import Img3 from "../assets/Home/HeroImg/img3.webp";
import toldosProteccionSolar from "../assets/servicios/toldoServicios.png";
import heroVideo from "../assets/video1.mp4";

export default function Automatizacion() {
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

  const jsonLd = [
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
  ];

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
            <PrimaryButton href="/contact">Asesoramiento privado</PrimaryButton>
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
        <SurfaceInner>
          {/* SECTION: INTRO / ESSENCE */}
          <Section>
            <SectionTop>
              <Title>
                La casa funciona <span>sola</span>
              </Title>
              <Lead>
                Automatización elegante y discreta para que luz, privacidad y
                confort respondan con calma a tu día. Sin ruido visual. Sin
                fricción.
              </Lead>
            </SectionTop>

            <EssenceGrid>
              <EssenceCopy>
                <P>
                  Diseñamos la solución según tu espacio: escenas, sensores,
                  horarios y control por app, siempre con una instalación limpia
                  y un acabado impecable.
                </P>

                <Highlights>
                  <Highlight>
                    <Dot />
                    <span>Silencio y precisión en cada movimiento</span>
                  </Highlight>
                  <Highlight>
                    <Dot />
                    <span>Escenas y rutinas (día, noche, cine, verano)</span>
                  </Highlight>
                  <Highlight>
                    <Dot />
                    <span>Integración discreta: estética primero</span>
                  </Highlight>
                </Highlights>

                <InlineCtas>
                  <SmallPrimary to="/contact">Solicitar propuesta</SmallPrimary>
                  <SmallGhost to="#experiencia">Ver beneficios</SmallGhost>
                </InlineCtas>
              </EssenceCopy>

              <EssenceMedia>
                <MediaFrame>
                  <MediaImg
                    src={automatizacionPackImg}
                    alt="Automatización residencial discreta y elegante"
                    loading="lazy"
                  />
                  <MediaBadge>
                    <strong>Somfy</strong>
                    <span>motores · sensores · escenas</span>
                  </MediaBadge>
                </MediaFrame>
              </EssenceMedia>
            </EssenceGrid>
          </Section>

          {/* SECTION: FULL HOME PREVIEW */}
          <Section>
            <SectionTop>
              <Kicker>Automatización integral</Kicker>
              <Title>
                Una solución completa, hecha a <span>medida</span>
              </Title>
              <Lead>
                Coordinamos cortinas, persianas, toldos y control solar para que
                todo funcione en armonía. Instalación profesional y ajustes
                finos.
              </Lead>
            </SectionTop>

            <FeatureRow>
              <FeatureCard>
                <FeatureMeta>
                  <FeatureEyebrow>Pack recomendado</FeatureEyebrow>
                  <FeatureTitle>Automatización integral</FeatureTitle>
                  <FeatureText>
                    Sistema centralizado con escenas, sensores y programación.
                    Ideal si buscas una experiencia completa desde el primer
                    día.
                  </FeatureText>

                  <PriceHint>
                    Inversión orientativa desde <span>~3.500€</span>
                  </PriceHint>
                </FeatureMeta>

                <FeatureActions>
                  <SoftLink to="/automatizacion/completa">
                    Ver cómo funciona
                  </SoftLink>
                  <GhostLink to="/contact">Asesoramiento privado</GhostLink>
                </FeatureActions>
              </FeatureCard>

              <MiniTrust>
                <MiniTrustItem>
                  <MiniIcon>✓</MiniIcon>
                  <div>
                    <MiniTitle>Instalación cuidada</MiniTitle>
                    <MiniText>Cableado y remates discretos</MiniText>
                  </div>
                </MiniTrustItem>
                <MiniTrustItem>
                  <MiniIcon>✓</MiniIcon>
                  <div>
                    <MiniTitle>Calibración fina</MiniTitle>
                    <MiniText>Caídas, finales y escenas</MiniText>
                  </div>
                </MiniTrustItem>
                <MiniTrustItem>
                  <MiniIcon>✓</MiniIcon>
                  <div>
                    <MiniTitle>Entrega lista</MiniTitle>
                    <MiniText>Te lo dejamos funcionando</MiniText>
                  </div>
                </MiniTrustItem>
              </MiniTrust>
            </FeatureRow>
          </Section>

          {/* SECTION: INDIVIDUAL */}
          <Section>
            <SectionTop>
              <Kicker>Automatización individual</Kicker>
              <Title>
                Automatiza lo que tiene sentido en tu <span>hogar</span>
              </Title>
              <Lead>
                Puedes empezar por una zona concreta y ampliar cuando quieras.
                Todo queda coherente desde el inicio.
              </Lead>
            </SectionTop>

            <Cards>
              {/* CARD 1 */}
              <AutoCard
                to="/automatizacion/individual#cortinas"
                aria-label="Cortinas y estores automatizados"
              >
                <AutoMedia>
                  <AutoImage
                    style={{ backgroundImage: `url(${cortinasEstores})` }}
                  />
                  <AutoOverlay />
                  <AutoBadge>Interior</AutoBadge>

                  <AutoContent>
                    <AutoCardTitle>Cortinas & estores</AutoCardTitle>
                    <AutoCardText>
                      Caída perfecta, silencio absoluto y control preciso de la
                      luz interior.
                    </AutoCardText>

                    <AutoFooter>
                      <div />
                      <AutoAccentDot>→</AutoAccentDot>
                    </AutoFooter>
                  </AutoContent>
                </AutoMedia>
              </AutoCard>

              {/* CARD 2 */}
              <AutoCard
                to="/automatizacion/individual#persianas"
                aria-label="Persianas y screens automatizados"
              >
                <AutoMedia>
                  <AutoImage style={{ backgroundImage: `url(${Img3})` }} />
                  <AutoOverlay />
                  <AutoBadge>Control solar</AutoBadge>

                  <AutoContent>
                    <AutoCardTitle>Persianas & screens</AutoCardTitle>
                    <AutoCardText>
                      Control solar, privacidad y confort térmico sin renunciar
                      al diseño.
                    </AutoCardText>

                    <AutoFooter>
                      <div />
                      <AutoAccentDot>→</AutoAccentDot>
                    </AutoFooter>
                  </AutoContent>
                </AutoMedia>
              </AutoCard>

              {/* CARD 3 */}
              <AutoCard
                to="/automatizacion/individual#toldos"
                aria-label="Toldos automatizados"
              >
                <AutoMedia>
                  <AutoImage
                    style={{ backgroundImage: `url(${toldosProteccionSolar})` }}
                  />
                  <AutoOverlay />
                  <AutoBadge>Exterior</AutoBadge>

                  <AutoContent>
                    <AutoCardTitle>Toldos & exterior</AutoCardTitle>
                    <AutoCardText>
                      Protección inteligente con sensores de sol, viento y
                      clima.
                    </AutoCardText>

                    <AutoFooter>
                      <div />
                      <AutoAccentDot>→</AutoAccentDot>
                    </AutoFooter>
                  </AutoContent>
                </AutoMedia>
              </AutoCard>
            </Cards>
          </Section>

          {/* SECTION: BENEFITS */}
          <Section id="experiencia">
            <SectionTop>
              <Kicker>Experiencia</Kicker>
              <Title>
                Automatización que se <span>nota</span>
              </Title>
              <Lead>
                No es “hacerlo desde el móvil”. Es vivir mejor: luz medida,
                confort real y una casa que responde con calma.
              </Lead>
            </SectionTop>

            <BenefitsInner>
              <BenefitRow>
                <BenefitText>
                  <BenefitTitle>Luz que acompaña el día</BenefitTitle>
                  <BenefitParagraph>
                    A medida que el sol avanza, persianas, toldos y cortinas se
                    regulan automáticamente para dejar pasar la cantidad justa
                    de luz. Confort visual, sin deslumbramientos.
                  </BenefitParagraph>
                </BenefitText>

                <BenefitImageWrap>
                  <BenefitImage
                    src={benefit1}
                    alt="Luz natural regulada"
                    loading="lazy"
                  />
                </BenefitImageWrap>
              </BenefitRow>

              <BenefitRow $reverse>
                <BenefitText>
                  <BenefitTitle>Tranquilidad estés donde estés</BenefitTitle>
                  <BenefitParagraph>
                    Controla tu hogar desde el móvil y simula presencia real
                    cuando no estás en casa. Una sensación de calma, incluso
                    durante tus vacaciones.
                  </BenefitParagraph>
                </BenefitText>

                <BenefitImageWrap>
                  <BenefitImage
                    src={vacaciones}
                    alt="Control del hogar durante vacaciones"
                    loading="lazy"
                  />
                </BenefitImageWrap>
              </BenefitRow>

              <BenefitRow>
                <BenefitText>
                  <BenefitTitle>Rutinas que se adaptan a ti</BenefitTitle>
                  <BenefitParagraph>
                    Define horarios según tu día a día o la estación del año. La
                    casa se ajusta sola. Tú solo lo disfrutas.
                  </BenefitParagraph>
                </BenefitText>

                <BenefitImageWrap>
                  <BenefitImage
                    src={programaHorarios}
                    alt="Programación de horarios"
                    loading="lazy"
                  />
                </BenefitImageWrap>
              </BenefitRow>
            </BenefitsInner>
          </Section>

          {/* SECTION: PROCESS */}
          <Section>
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

          {/* FINAL CTA */}
          <Section>
            <CTA>
              <div>
                <CTATitle>¿Lo vemos en tu casa?</CTATitle>
                <CTAText>
                  Te proponemos una solución clara y realista según tu espacio.
                  Medición, propuesta y presupuesto sin compromiso.
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
        </SurfaceInner>
      </Surface>
    </Page>
  );
}

/* =========================
   REQUIRED TITLE (DO NOT EDIT)
========================= */
const Title = styled.h2`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1rem;

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
`;

const MicroLine = styled.p`
  margin-top: 1.4rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(244, 244, 245, 0.6);
`;

/* =========================
   PREMIUM SURFACE
========================= */
const Surface = styled.section`
  position: relative;
  background: #ffffff;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  margin-top: -18px; /* premium overlap */
  box-shadow: 0 -20px 80px rgba(0, 0, 0, 0.35);
`;

const SurfaceInner = styled.div`
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
`;

const SectionTop = styled.div`
  text-align: center;
  margin-bottom: 1.7rem;
`;

const Kicker = styled.p`
  margin: 0 auto 0.65rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.08);
  color: rgba(15, 23, 42, 0.8);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;
`;

const Lead = styled.p`
  margin: 0 auto;
  width: min(820px, 100%);
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(15, 23, 42, 0.72);
`;

/* =========================
   ESSENCE
========================= */
const EssenceGrid = styled.div`
  margin-top: 1.8rem;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 1.6rem;
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const EssenceCopy = styled.div`
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.03),
    rgba(15, 23, 42, 0.01)
  );
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 22px;
  padding: 1.5rem 1.5rem 1.35rem;
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.06);
`;

const P = styled.p`
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.75;
  color: rgba(15, 23, 42, 0.74);
`;

const Highlights = styled.div`
  margin-top: 1.15rem;
  display: grid;
  gap: 0.65rem;
`;

const Highlight = styled.div`
  display: grid;
  grid-template-columns: 12px 1fr;
  gap: 0.7rem;
  align-items: start;
  font-size: 0.98rem;
  color: rgba(15, 23, 42, 0.78);
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  margin-top: 0.35rem;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.03);
`;

const InlineCtas = styled.div`
  margin-top: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const SmallPrimary = styled(Link)`
  text-decoration: none;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: #111;
  font-weight: 650;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.1);
  transition: transform 180ms ease, filter 180ms ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.02);
  }
`;

const SmallGhost = styled.a`
  text-decoration: none;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.12);
  color: rgba(15, 23, 42, 0.82);
  font-weight: 650;
  transition: transform 180ms ease, background 180ms ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(15, 23, 42, 0.02);
  }
`;

const EssenceMedia = styled.div``;

const MediaFrame = styled.div`
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.1);
  box-shadow: 0 22px 70px rgba(15, 23, 42, 0.12);
  background: #0b0c0f;
  min-height: 320px;

  @media (max-width: 900px) {
    min-height: 260px;
  }
`;

const MediaImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transform: scale(1.03);
  filter: contrast(1.05) saturate(0.98);
`;

const MediaBadge = styled.div`
  position: absolute;
  left: 14px;
  bottom: 14px;
  padding: 0.75rem 0.9rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(12px);
  color: rgba(255, 255, 255, 0.9);

  strong {
    display: block;
    font-weight: 750;
    letter-spacing: -0.01em;
  }

  span {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.78);
  }
`;

/* =========================
   FEATURE ROW
========================= */
const FeatureRow = styled.div`
  margin-top: 1.8rem;
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 1.2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  border-radius: 22px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.02),
    rgba(15, 23, 42, 0.005)
  );
  padding: 1.6rem;
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.08);
`;

const FeatureMeta = styled.div``;

const FeatureEyebrow = styled.div`
  display: inline-flex;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.08);
  color: rgba(15, 23, 42, 0.78);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const FeatureTitle = styled.h3`
  margin: 0.9rem 0 0.55rem;
  font-size: 1.45rem;
  letter-spacing: -0.02em;
  color: #111;
`;

const FeatureText = styled.p`
  margin: 0;
  line-height: 1.75;
  color: rgba(15, 23, 42, 0.72);
`;

const PriceHint = styled.p`
  margin: 1.1rem 0 0;
  font-weight: 650;
  color: rgba(15, 23, 42, 0.78);

  span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 800;
  }
`;

const FeatureActions = styled.div`
  margin-top: 1.2rem;
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
  align-items: center;
`;

const SoftLink = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  color: rgba(15, 23, 42, 0.85);
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 200ms ease;
    border-radius: 99px;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;

const GhostLink = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  color: rgba(15, 23, 42, 0.82);
  padding: 0.75rem 0.9rem;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #fff;
  transition: transform 180ms ease, background 180ms ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(15, 23, 42, 0.02);
  }
`;

const MiniTrust = styled.div`
  border-radius: 22px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: #fff;
  padding: 1.2rem;
  display: grid;
  gap: 0.9rem;
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.06);
`;

const MiniTrustItem = styled.div`
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 0.75rem;
  align-items: start;
`;

const MiniIcon = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 900;
`;

const MiniTitle = styled.div`
  font-weight: 750;
  color: rgba(15, 23, 42, 0.88);
`;

const MiniText = styled.div`
  margin-top: 0.15rem;
  color: rgba(15, 23, 42, 0.65);
  font-size: 0.95rem;
`;

/* =========================
   CARDS
========================= */
const Cards = styled.div`
  margin-top: 1.6rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.1rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const AutoCard = styled(Link)`
  display: block;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: #fff;
  box-shadow: 0 28px 85px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: inherit;
  transform: translateY(0);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 40px 110px rgba(0, 0, 0, 0.12);
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.2);
    outline-offset: 4px;
  }
`;

const AutoMedia = styled.div`
  position: relative;
  height: 310px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 240px;
  }
`;

const AutoImage = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.02);
  transition: transform 0.65s ease;

  ${AutoCard}:hover & {
    transform: scale(1.06);
  }
`;

const AutoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0.55) 88%,
    rgba(0, 0, 0, 0.65) 100%
  );
`;

const AutoBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
  padding: 0.48rem 0.8rem;
  border-radius: 999px;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.92);
  color: rgba(17, 17, 17, 0.75);
`;

const AutoContent = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 1.35rem 1.35rem 1.25rem;
  display: grid;
  gap: 0.55rem;
`;

const AutoCardTitle = styled.h3`
  margin: 0;
  font-size: 1.45rem;
  font-weight: 750;
  color: #fff;
  letter-spacing: -0.2px;
`;

const AutoCardText = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.82);
  max-width: 44ch;
`;

const AutoFooter = styled.div`
  margin-top: 0.55rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
`;

const AutoAccentDot = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.16);
  display: grid;
  place-items: center;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 900;
  transition: transform 0.25s ease, background 0.25s ease;

  ${AutoCard}:hover & {
    transform: translateX(2px);
    background: rgba(255, 255, 255, 0.16);
  }
`;

/* =========================
   BENEFITS
========================= */
const BenefitsInner = styled.div`
  margin-top: 1.8rem;
  display: grid;
  gap: 1.25rem;
`;

const BenefitRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  align-items: center;
  padding: 1.2rem;
  border-radius: 22px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: #fff;
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.06);

  ${({ $reverse }) =>
    $reverse
      ? `
    direction: rtl;
  `
      : ""}

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    ${({ $reverse }) =>
      $reverse
        ? `
      direction: ltr;
    `
        : ""}
  }
`;

const BenefitText = styled.div`
  ${({ theme }) => theme};
`;

const BenefitTitle = styled.h3`
  margin: 0 0 0.55rem;
  font-size: 1.35rem;
  letter-spacing: -0.02em;
  color: rgba(15, 23, 42, 0.92);
`;

const BenefitParagraph = styled.p`
  margin: 0;
  line-height: 1.8;
  color: rgba(15, 23, 42, 0.68);
`;

const BenefitImageWrap = styled.div`
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.08);
`;

const BenefitImage = styled.img`
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;

  @media (max-width: 900px) {
    height: 240px;
  }
`;

/* =========================
   STEPS
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
    rgba(15, 23, 42, 0.02),
    rgba(15, 23, 42, 0.005)
  );
  padding: 1.35rem 1.35rem 1.25rem;
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.06);
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
   CTA
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
