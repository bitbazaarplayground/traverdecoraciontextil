import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CONTACT } from "../config/contact";
import { openCookiePreferences } from "../utils/cookieConsent";

function useCanonicalUrl() {
  const { pathname, search } = useLocation();
  const base = import.meta?.env?.VITE_SITE_URL || window.location.origin;
  return `${base}${pathname}${search}`;
}

export default function PoliticaCookies() {
  const canonical = useCanonicalUrl();
  const siteName = CONTACT.siteName;

  const metaTitle = `Política de cookies | ${siteName}`;
  const metaDescription =
    "Información sobre las cookies y tecnologías similares utilizadas en esta web, su finalidad, gestión del consentimiento y forma de configuración.";

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: metaTitle,
    url: canonical,
    description: metaDescription,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: import.meta?.env?.VITE_SITE_URL || window.location.origin,
    },
  };

  return (
    <Page>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />

        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />

        <script type="application/ld+json">
          {JSON.stringify(webPageJsonLd)}
        </script>
      </Helmet>

      <Hero>
        <Container>
          <Eyebrow>Legal</Eyebrow>
          <Title>
            Política de <span>cookies</span>
          </Title>
          <Sub>
            En esta web utilizamos cookies y tecnologías similares para asegurar
            el funcionamiento básico del sitio y, solo si nos das tu
            consentimiento, para obtener estadísticas de uso que nos ayuden a
            mejorar nuestros servicios.
          </Sub>

          <HeroActions>
            <SecondaryLink to="/contact">
              ¿Necesitas ayuda? Contactar
            </SecondaryLink>
            <GhostButton type="button" onClick={openCookiePreferences}>
              Configurar cookies
            </GhostButton>
          </HeroActions>
        </Container>
      </Hero>

      <Main>
        <Container>
          <Shell>
            <IntroCard>
              <IntroBadge>Resumen rápido</IntroBadge>
              <IntroTitle>Cómo usamos las cookies en esta web</IntroTitle>
              <IntroText>
                Actualmente, esta web puede utilizar cookies o tecnologías
                equivalentes de carácter técnico y, si el usuario lo acepta,
                herramientas de analítica como Google Analytics 4 para medir el
                uso del sitio web.
              </IntroText>

              <Highlights>
                <HighlightItem>
                  <HighlightLabel>Cookies necesarias</HighlightLabel>
                  <HighlightValue>Siempre activas</HighlightValue>
                </HighlightItem>
                <HighlightItem>
                  <HighlightLabel>Cookies analíticas</HighlightLabel>
                  <HighlightValue>Solo con consentimiento</HighlightValue>
                </HighlightItem>
                <HighlightItem>
                  <HighlightLabel>Cookies publicitarias</HighlightLabel>
                  <HighlightValue>No activas actualmente*</HighlightValue>
                </HighlightItem>
              </Highlights>

              <Note>
                * Si en el futuro se incorporan cookies de publicidad,
                remarketing o perfiles publicitarios, esta política y el panel
                de configuración se actualizarán antes de su activación.
              </Note>
            </IntroCard>

            <ContentGrid>
              <MainCard>
                <Section>
                  <H2>1. ¿Qué son las cookies?</H2>
                  <P>
                    Las cookies son pequeños archivos que se descargan en tu
                    dispositivo al acceder a determinadas páginas web. También
                    existen tecnologías similares, como el almacenamiento local
                    del navegador, que permiten guardar o recuperar información
                    en el equipo del usuario.
                  </P>
                  <P>
                    Estas tecnologías pueden servir, por ejemplo, para recordar
                    preferencias, mantener la seguridad del sitio o recopilar
                    información estadística sobre la navegación.
                  </P>
                </Section>

                <Divider />

                <Section>
                  <H2>2. ¿Qué tipos de cookies se utilizan?</H2>
                  <P>
                    Esta web puede utilizar las siguientes categorías de cookies
                    o tecnologías similares:
                  </P>

                  <InfoList>
                    <li>
                      <strong>Cookies técnicas o necesarias:</strong> son
                      imprescindibles para que la web funcione correctamente,
                      para la navegación, la seguridad y la prestación de
                      servicios solicitados por el usuario. No requieren
                      consentimiento.
                    </li>
                    <li>
                      <strong>Cookies analíticas:</strong> permiten medir de
                      forma agregada cómo interactúan los usuarios con la web,
                      por ejemplo páginas visitadas, tiempo de navegación o
                      rendimiento general del sitio. Solo se activan si el
                      usuario las acepta.
                    </li>
                    <li>
                      <strong>Cookies de publicidad o marketing:</strong>{" "}
                      destinadas a mostrar publicidad personalizada o medir
                      campañas. En este momento no se encuentran activadas en la
                      web, salvo que en el futuro se incorporen servicios de esa
                      naturaleza y se solicite previamente el consentimiento del
                      usuario.
                    </li>
                  </InfoList>
                </Section>

                <Divider />

                <Section>
                  <H2>3. Base jurídica del uso de cookies</H2>
                  <P>
                    La base jurídica para el uso de cookies técnicas es el
                    interés legítimo y la necesidad técnica de prestar el
                    servicio solicitado por el usuario.
                  </P>
                  <P>
                    La base jurídica para el uso de cookies analíticas y, en su
                    caso, publicitarias, es el <strong>consentimiento</strong>{" "}
                    del usuario, que puede otorgarse, rechazarse o retirarse en
                    cualquier momento a través del panel de configuración de
                    cookies disponible en la web.
                  </P>
                </Section>

                <Divider />

                <Section>
                  <H2>4. Cookies y herramientas concretas utilizadas</H2>

                  <ToolCard>
                    <ToolHeader>
                      <ToolName>Google Analytics 4</ToolName>
                      <ToolTag>Analítica</ToolTag>
                    </ToolHeader>

                    <ToolBody>
                      <ToolRow>
                        <ToolLabel>Proveedor</ToolLabel>
                        <ToolValue>Google LLC</ToolValue>
                      </ToolRow>
                      <ToolRow>
                        <ToolLabel>Finalidad</ToolLabel>
                        <ToolValue>
                          Medición estadística del uso del sitio web, análisis
                          agregado del comportamiento de navegación y mejora del
                          rendimiento y los contenidos de la web.
                        </ToolValue>
                      </ToolRow>
                      <ToolRow>
                        <ToolLabel>Activación</ToolLabel>
                        <ToolValue>
                          Solo se carga si el usuario acepta las cookies
                          analíticas desde el banner o panel de configuración.
                        </ToolValue>
                      </ToolRow>
                      <ToolRow>
                        <ToolLabel>Datos tratados</ToolLabel>
                        <ToolValue>
                          Información técnica y estadística asociada a la
                          navegación, como páginas visitadas, interacciones,
                          dispositivo, navegador o datos aproximados de uso.
                        </ToolValue>
                      </ToolRow>
                      <ToolRow>
                        <ToolLabel>Conservación</ToolLabel>
                        <ToolValue>
                          La conservación dependerá de la configuración vigente
                          de la propiedad de Google Analytics y de las políticas
                          del proveedor.
                        </ToolValue>
                      </ToolRow>
                      <ToolRow>
                        <ToolLabel>Más información</ToolLabel>
                        <ToolValue>
                          <ExternalLink
                            href="https://policies.google.com/privacy?hl=es"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Política de privacidad de Google
                          </ExternalLink>
                        </ToolValue>
                      </ToolRow>
                    </ToolBody>
                  </ToolCard>

                  <P>
                    Si en el futuro se incorporan otras herramientas analíticas
                    o publicitarias, esta política será actualizada para
                    reflejar su identidad, finalidad y régimen de
                    consentimiento.
                  </P>
                </Section>

                <Divider />

                <Section>
                  <H2>5. Gestión del consentimiento</H2>
                  <P>
                    Cuando accedes por primera vez a esta web, se muestra un
                    aviso o panel de cookies desde el que puedes:
                  </P>

                  <InfoList>
                    <li>aceptar todas las cookies opcionales;</li>
                    <li>rechazar las cookies no necesarias; o</li>
                    <li>configurar tus preferencias por categorías.</li>
                  </InfoList>

                  <P>
                    Tus preferencias pueden modificarse más adelante en
                    cualquier momento mediante la opción{" "}
                    <strong>“Configurar cookies”</strong> disponible en la web.
                  </P>
                </Section>

                <Divider />

                <Section>
                  <H2>6. Cómo desactivar o eliminar cookies</H2>
                  <P>
                    Además de utilizar nuestro panel de configuración, puedes
                    permitir, bloquear o eliminar cookies desde las opciones de
                    tu navegador. Ten en cuenta que la desactivación de cookies
                    técnicas o necesarias puede afectar al correcto
                    funcionamiento del sitio web.
                  </P>

                  <BrowserList>
                    <li>Google Chrome</li>
                    <li>Mozilla Firefox</li>
                    <li>Microsoft Edge</li>
                    <li>Safari</li>
                  </BrowserList>
                </Section>

                <Divider />

                <Section>
                  <H2>7. Transferencias internacionales</H2>
                  <P>
                    El uso de herramientas de terceros podría implicar
                    transferencias internacionales de datos fuera del Espacio
                    Económico Europeo, en función de la infraestructura del
                    proveedor. En ese caso, dichas transferencias se regirán por
                    las garantías y mecanismos informados por el proveedor
                    correspondiente en su documentación de privacidad.
                  </P>
                </Section>

                <Divider />

                <Section>
                  <H2>8. Cambios en esta política</H2>
                  <P>
                    Podemos actualizar esta Política de Cookies cuando sea
                    necesario por cambios legales, técnicos o por modificación
                    de los servicios utilizados en la web. Te recomendamos
                    revisarla periódicamente.
                  </P>
                </Section>

                <FooterRow>
                  <SmallText>
                    Última actualización: <strong>19/03/2026</strong>
                  </SmallText>

                  <MiniNav>
                    <MiniLink to="/aviso-legal">Aviso legal</MiniLink>
                    <Dot>·</Dot>
                    <MiniLink to="/politica-privacidad">
                      Política de privacidad
                    </MiniLink>
                    <Dot>·</Dot>
                    <MiniButton type="button" onClick={openCookiePreferences}>
                      Configurar cookies
                    </MiniButton>
                  </MiniNav>
                </FooterRow>
              </MainCard>

              <AsideCard>
                <AsideTitle>Gestión rápida</AsideTitle>
                <AsideText>
                  Puedes revisar o modificar tu elección de cookies cuando
                  quieras.
                </AsideText>

                <AsideActions>
                  <AsideButton type="button" onClick={openCookiePreferences}>
                    Abrir preferencias
                  </AsideButton>
                  <AsideLink to="/politica-privacidad">
                    Ver política de privacidad
                  </AsideLink>
                </AsideActions>

                <AsideDivider />

                <AsideTitle>Responsable</AsideTitle>
                <AsideText>
                  {CONTACT.siteName}
                  <br />
                  {CONTACT.address.streetAddress}, {CONTACT.address.postalCode},{" "}
                  {CONTACT.address.addressLocality}
                  <br />
                  {CONTACT.email}
                  <br />
                  {CONTACT.phoneLandline}
                </AsideText>
              </AsideCard>
            </ContentGrid>
          </Shell>
        </Container>
      </Main>
    </Page>
  );
}

/* =========================
   Styles
========================= */

const Page = styled.main`
  width: 100%;
  min-height: 100vh;
  background: radial-gradient(
      1100px 520px at 50% 0%,
      rgba(255, 255, 255, 0.06),
      transparent 62%
    ),
    linear-gradient(180deg, #f6f4f1 0%, #efebe6 100%);
  color: #1a1a1a;
`;

const Container = styled.div`
  width: min(1180px, calc(100% - 2.2rem));
  margin: 0 auto;
`;

const Hero = styled.header`
  padding: clamp(3.4rem, 6vw, 5.8rem) 0 1.5rem;
`;

const Eyebrow = styled.p`
  margin: 0 0 0.95rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-size: 0.74rem;
  color: rgba(0, 0, 0, 0.56);
`;

const Title = styled.h1`
  margin: 0;
  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.02;
  color: rgba(0, 0, 0, 0.92);
  font-size: clamp(2.3rem, 5vw, 4.4rem);

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Sub = styled.p`
  max-width: 78ch;
  margin: 1.05rem 0 0;
  font-size: 1.05rem;
  line-height: 1.82;
  color: rgba(0, 0, 0, 0.68);
`;

const HeroActions = styled.div`
  margin-top: 1.45rem;
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
`;

const SecondaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.85rem 1.2rem;
  border-radius: 999px;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.82);
  font-weight: 700;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
`;

const GhostButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.85rem 1.2rem;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, 0.82);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.04);

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
`;

const Main = styled.section`
  padding: 0 0 5.4rem;
`;

const Shell = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const IntroCard = styled.section`
  border-radius: 30px;
  padding: clamp(1.35rem, 3vw, 2rem);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.88),
    rgba(255, 255, 255, 0.72)
  );
  border: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0 26px 80px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
`;

const IntroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.48rem 0.82rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const IntroTitle = styled.h2`
  margin: 1rem 0 0;
  font-size: clamp(1.45rem, 3vw, 2rem);
  line-height: 1.2;
  color: rgba(0, 0, 0, 0.92);
`;

const IntroText = styled.p`
  margin: 0.85rem 0 0;
  max-width: 84ch;
  font-size: 1rem;
  line-height: 1.78;
  color: rgba(0, 0, 0, 0.68);
`;

const Highlights = styled.div`
  margin-top: 1.2rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightItem = styled.div`
  border-radius: 22px;
  padding: 1rem 1.05rem;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const HighlightLabel = styled.div`
  font-size: 0.84rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(0, 0, 0, 0.52);
`;

const HighlightValue = styled.div`
  margin-top: 0.48rem;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.88);
`;

const Note = styled.p`
  margin: 1rem 0 0;
  font-size: 0.94rem;
  line-height: 1.65;
  color: rgba(0, 0, 0, 0.6);
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(290px, 0.7fr);
  gap: 1.2rem;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const MainCard = styled.article`
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0 26px 80px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

const AsideCard = styled.aside`
  position: sticky;
  top: 110px;
  border-radius: 28px;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0 24px 65px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);

  @media (max-width: 980px) {
    position: static;
  }
`;

const AsideTitle = styled.h3`
  margin: 0;
  font-size: 1.02rem;
  font-weight: 850;
  color: rgba(0, 0, 0, 0.9);
`;

const AsideText = styled.p`
  margin: 0.72rem 0 0;
  font-size: 0.96rem;
  line-height: 1.72;
  color: rgba(0, 0, 0, 0.66);
`;

const AsideActions = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 0.75rem;
`;

const AsideButton = styled.button`
  min-height: 46px;
  border: 0;
  border-radius: 16px;
  padding: 0.85rem 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font: inherit;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.12);

  &:hover {
    transform: translateY(-1px);
    opacity: 0.96;
  }
`;

const AsideLink = styled(Link)`
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 0.85rem 1rem;
  text-decoration: none;
  background: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.82);
  font-weight: 800;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const AsideDivider = styled.hr`
  margin: 1.15rem 0;
  border: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
`;

const Section = styled.section`
  padding: clamp(1.4rem, 3vw, 2rem);
`;

const H2 = styled.h2`
  margin: 0 0 0.72rem;
  font-size: 1.28rem;
  line-height: 1.25;
  font-weight: 850;
  color: rgba(0, 0, 0, 0.92);
`;

const P = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.82;
  color: rgba(0, 0, 0, 0.68);

  & + & {
    margin-top: 0.9rem;
  }
`;

const InfoList = styled.ul`
  margin: 0.85rem 0 0;
  padding-left: 1.15rem;
  display: grid;
  gap: 0.8rem;
  color: rgba(0, 0, 0, 0.67);
  line-height: 1.75;

  strong {
    color: rgba(0, 0, 0, 0.9);
  }
`;

const BrowserList = styled.ul`
  margin: 0.85rem 0 0;
  padding-left: 1.15rem;
  display: grid;
  gap: 0.45rem;
  color: rgba(0, 0, 0, 0.67);
  line-height: 1.7;
`;

const ToolCard = styled.div`
  margin: 1rem 0 1.05rem;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const ToolHeader = styled.div`
  padding: 1rem 1.1rem;
  display: flex;
  gap: 0.8rem;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: rgba(0, 0, 0, 0.035);
`;

const ToolName = styled.h3`
  margin: 0;
  font-size: 1.02rem;
  font-weight: 850;
  color: rgba(0, 0, 0, 0.9);
`;

const ToolTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.42rem 0.72rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.72);
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const ToolBody = styled.div`
  padding: 0.3rem 1.1rem 1rem;
`;

const ToolRow = styled.div`
  display: grid;
  grid-template-columns: minmax(150px, 180px) 1fr;
  gap: 0.9rem;
  padding: 0.78rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
`;

const ToolLabel = styled.div`
  font-size: 0.93rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.82);
`;

const ToolValue = styled.div`
  font-size: 0.97rem;
  line-height: 1.72;
  color: rgba(0, 0, 0, 0.67);
`;

const ExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.hr`
  margin: 0;
  border: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
`;

const FooterRow = styled.div`
  padding: 1.4rem clamp(1.4rem, 3vw, 2rem) 1.7rem;
  display: flex;
  gap: 0.85rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
`;

const SmallText = styled.div`
  font-size: 0.93rem;
  color: rgba(0, 0, 0, 0.6);
`;

const MiniNav = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;
`;

const MiniLink = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.72);
  font-weight: 750;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MiniButton = styled.button`
  background: none;
  border: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.72);
  font: inherit;
  font-weight: 750;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Dot = styled.span`
  color: rgba(0, 0, 0, 0.35);
`;
