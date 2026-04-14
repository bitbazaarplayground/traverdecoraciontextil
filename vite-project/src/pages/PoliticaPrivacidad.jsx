// pages/PoliticaPrivacidad.jsx

import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CONTACT } from "../config/contact";

function useCanonicalUrl() {
  const { pathname, search } = useLocation();
  const base =
    import.meta?.env?.VITE_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}${pathname}${search}`;
}

export default function PoliticaPrivacidad() {
  const canonical = useCanonicalUrl();
  const siteName = CONTACT.siteName;

  const metaTitle = `Política de privacidad | ${siteName}`;
  const metaDescription =
    "Información sobre el tratamiento de datos personales, finalidades, base legal, conservación, destinatarios y derechos del usuario.";

  const legal = {
    holder: "TRAVER TOLDOS Y ENROLLABLES SL",
    nif: "B72908809",
    address:
      typeof CONTACT.address === "string"
        ? CONTACT.address
        : `${CONTACT.address.streetAddress}, ${CONTACT.address.postalCode}, ${CONTACT.address.addressLocality}`,
    legalEmail: CONTACT.email,
    phone: CONTACT.phoneLandline,
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: metaTitle,
    url: canonical,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: import.meta?.env?.VITE_SITE_URL || window.location.origin,
    },
  };
  const LAST_UPDATED = "13/04/2026";
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
            Política de <span>privacidad</span>
          </Title>
          <Sub>
            En esta página te explicamos cómo tratamos tus datos personales,
            para qué los utilizamos, durante cuánto tiempo los conservamos y
            cuáles son tus derechos.
          </Sub>

          <BackRow>
            <BackLink to="/contact">¿Tienes dudas? Contactar</BackLink>
          </BackRow>
        </Container>
      </Hero>

      <Main>
        <Container>
          <Card>
            <CardInner>
              <H2>1. Responsable del tratamiento</H2>
              <P>El responsable del tratamiento de los datos personales es:</P>

              <InfoBox>
                <strong>{legal.holder}</strong>
                <br />
                <strong>NIF:</strong> {legal.nif}
                <br />
                <strong>Email:</strong>{" "}
                <A href={`mailto:${legal.legalEmail}`}>{legal.legalEmail}</A>
                <br />
                <strong>Teléfono:</strong>{" "}
                <A href={`tel:${legal.phone}`}>{legal.phone}</A>
                <br />
                <strong>Dirección:</strong> {legal.address}
              </InfoBox>

              <Divider />

              <H2>2. Datos personales que tratamos</H2>
              <P>
                Podemos tratar los siguientes datos cuando el usuario los
                facilita voluntariamente:
              </P>
              <Ul>
                <li>Nombre y apellidos</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Dirección postal</li>
                <li>
                  Información incluida en mensajes, formularios o solicitudes
                </li>
              </Ul>

              <Divider />

              <H2>3. Finalidades del tratamiento</H2>
              <P>
                Los datos personales que nos facilites podrán utilizarse para:
              </P>
              <Ul>
                <li>
                  Atender consultas realizadas por formulario, email o teléfono.
                </li>
                <li>
                  Gestionar solicitudes de información, asesoramiento o
                  presupuesto.
                </li>
                <li>
                  Contactar contigo para ofrecerte atención personalizada.
                </li>
                <li>
                  Gestionar citas y comunicaciones relacionadas con el servicio.
                </li>
                <li>
                  Mejorar la experiencia de usuario y el funcionamiento de la
                  web, incluyendo análisis estadístico, solo cuando proceda y
                  exista consentimiento para ello.
                </li>
              </Ul>

              <Divider />

              <H2>4. Base legal</H2>
              <P>El tratamiento de tus datos puede basarse en:</P>
              <Ul>
                <li>
                  <strong>Medidas precontractuales</strong>, cuando solicitas
                  información, asesoramiento o presupuesto sobre nuestros
                  servicios.
                </li>
                <li>
                  <strong>Consentimiento</strong>, cuando nos facilitas tus
                  datos mediante formularios y aceptas expresamente la Política
                  de Privacidad, o cuando sea necesario para tratamientos
                  específicos.
                </li>
                <li>
                  <strong>Interés legítimo</strong>, cuando resulte aplicable,
                  por ejemplo para garantizar la seguridad del sitio web,
                  prevenir usos indebidos o atender adecuadamente la gestión
                  técnica del servicio.
                </li>
              </Ul>

              <Divider />

              <H2>5. Conservación de los datos</H2>
              <P>
                Los datos personales se conservarán durante el tiempo necesario
                para atender tu solicitud, mantener la relación comercial si
                existiera y cumplir con las obligaciones legales aplicables.
                Posteriormente, serán bloqueados o eliminados de forma segura.
              </P>

              <Divider />

              <H2>6. Destinatarios de los datos</H2>
              <P>No se cederán datos a terceros salvo obligación legal.</P>
              <P>
                No obstante, para la prestación del servicio podemos utilizar
                proveedores tecnológicos que actúan como encargados del
                tratamiento, únicamente cuando resulte necesario para el
                funcionamiento de la web, la gestión de formularios o la
                analítica consentida.
              </P>
              <Ul>
                <li>
                  <strong>Netlify</strong> (alojamiento web y/o gestión de
                  formularios).
                </li>
                <li>
                  <strong>Google Analytics</strong> u otras herramientas
                  equivalentes de analítica, únicamente cuando el usuario haya
                  prestado su consentimiento.
                </li>
                <P>
                  Cuando el tratamiento esté basado en tu consentimiento, podrás
                  retirarlo en cualquier momento, sin que ello afecte a la
                  licitud del tratamiento previo a su retirada.
                </P>
              </Ul>

              <Divider />

              <H2>7. Derechos del usuario</H2>
              <P>Tienes derecho a:</P>
              <Ul>
                <li>Acceder a tus datos personales</li>
                <li>Solicitar la rectificación de datos inexactos</li>
                <li>Solicitar su supresión</li>
                <li>Oponerte al tratamiento</li>
                <li>Solicitar la limitación del tratamiento</li>
                <li>Solicitar la portabilidad de tus datos</li>
              </Ul>

              <P>
                Puedes ejercer estos derechos enviando un email a{" "}
                <A href={`mailto:${legal.legalEmail}`}>{legal.legalEmail}</A>.
              </P>

              <P>
                También puedes presentar una reclamación ante la Agencia
                Española de Protección de Datos (AEPD) si consideras que tus
                derechos no han sido atendidos correctamente.
              </P>

              <Divider />

              <H2>8. Seguridad de los datos</H2>
              <P>
                Aplicamos medidas técnicas y organizativas razonables para
                garantizar la seguridad de los datos personales y evitar su
                pérdida, alteración, acceso no autorizado o uso indebido.
              </P>

              <Divider />

              <H2>9. Cookies</H2>
              <P>
                Esta web utiliza cookies técnicas necesarias para su
                funcionamiento y, en su caso, cookies analíticas sujetas al
                consentimiento del usuario.
              </P>

              <P>
                Puedes consultar más información en nuestra{" "}
                <StyledRouterLink to="/politica-cookies">
                  Política de cookies
                </StyledRouterLink>
                .
              </P>

              <Divider />

              <H2>10. Cambios en esta política</H2>
              <P>
                Podemos actualizar esta política de privacidad para adaptarla a
                cambios legales, técnicos o de funcionamiento del sitio web. La
                fecha de la última actualización se mostrará siempre en esta
                página.
              </P>

              <FooterRow>
                <SmallText>
                  Última actualización: <strong>{LAST_UPDATED}</strong>
                </SmallText>

                <MiniNav>
                  <MiniLink to="/aviso-legal">Aviso legal</MiniLink>
                  <Dot>·</Dot>
                  <MiniLink to="/politica-cookies">
                    Política de cookies
                  </MiniLink>
                </MiniNav>
              </FooterRow>
            </CardInner>
          </Card>
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
  background: radial-gradient(
      1200px 600px at 50% 0%,
      rgba(255, 255, 255, 0.04),
      transparent 60%
    ),
    #f5f4f2;
  color: #1c1c1c;
`;

const Container = styled.div`
  width: min(980px, calc(100% - 2.4rem));
  margin: 0 auto;
`;

const Hero = styled.header`
  padding: clamp(3.6rem, 6.2vw, 5.6rem) 0 1.6rem;
`;

const Eyebrow = styled.p`
  margin: 0 0 1rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.58);
`;

const Title = styled.h1`
  margin: 0;
  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: rgba(0, 0, 0, 0.92);
  line-height: 1.04;
  font-size: clamp(2.1rem, 5vw, 4.1rem);

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Sub = styled.p`
  max-width: 78ch;
  margin: 1.05rem 0 0;
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.68);
`;

const BackRow = styled.div`
  margin-top: 1.25rem;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.66);
  font-weight: 700;

  &:hover {
    color: rgba(0, 0, 0, 0.85);
  }
`;

const Main = styled.section`
  padding: 0 0 5.2rem;
`;

const Card = styled.article`
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const CardInner = styled.div`
  padding: clamp(1.5rem, 3vw, 2.4rem);
`;

const H2 = styled.h2`
  margin: 0 0 0.6rem 0;
  font-size: 1.25rem;
  font-weight: 850;
  color: rgba(0, 0, 0, 0.9);
`;

const P = styled.p`
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.68);

  & + & {
    margin-top: 0.9rem;
  }
`;

const Ul = styled.ul`
  margin: 0.6rem 0 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.55rem;
  color: rgba(0, 0, 0, 0.66);
  line-height: 1.7;
`;

const A = styled.a`
  color: rgba(0, 0, 0, 0.78);
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledRouterLink = styled(Link)`
  color: rgba(0, 0, 0, 0.78);
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const InfoBox = styled.div`
  margin-top: 1rem;
  padding: 1rem 1.1rem;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, 0.72);
  line-height: 1.75;
`;

const Divider = styled.hr`
  margin: 1.5rem 0;
  border: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
`;

const FooterRow = styled.div`
  margin-top: 2rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);

  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SmallText = styled.div`
  font-size: 0.92rem;
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
  color: rgba(0, 0, 0, 0.7);
  font-weight: 750;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Dot = styled.span`
  color: rgba(0, 0, 0, 0.35);
`;
