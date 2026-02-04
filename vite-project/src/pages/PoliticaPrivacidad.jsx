import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CONTACT } from "../config/contact";

function useCanonicalUrl() {
  const { pathname, search } = useLocation();
  const base = import.meta?.env?.VITE_SITE_URL || window.location.origin;
  return `${base}${pathname}${search}`;
}

export default function PoliticaPrivacidad() {
  const canonical = useCanonicalUrl();
  const siteName = CONTACT.siteName;

  const metaTitle = `Política de privacidad | ${siteName}`;
  const metaDescription =
    "Información sobre el tratamiento de datos personales, finalidades, base legal, conservación, destinatarios y derechos del usuario.";

  // Datos legales (confirmados por ti)
  const legal = {
    holder: "Zenaida Zorita Vallés",
    nif: "18945550-J",
    address: "Carrer de Sant Felip, 67, 12550 Almassora, Castellón, Spain",
    legalEmail: CONTACT.email,
  };

  // JSON-LD básico (página informativa)
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

  return (
    <Page>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />

        {/* Twitter */}
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
            Aquí explicamos qué datos tratamos, con qué finalidad, durante
            cuánto tiempo y cómo puedes ejercer tus derechos.
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
              <P>
                <strong>Titular / Razón social:</strong> {legal.holder}
                <br />
                <strong>NIF:</strong> {legal.nif}
                <br />
                <strong>Domicilio:</strong> {legal.address}
                <br />
                <strong>Email:</strong>{" "}
                <A href={`mailto:${legal.legalEmail}`}>{legal.legalEmail}</A>
              </P>

              <Divider />

              <H2>2. Datos personales que tratamos</H2>
              <P>
                Podemos tratar los siguientes datos cuando el usuario los
                facilita:
              </P>
              <Ul>
                <li>Nombre y apellidos</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Dirección postal</li>
                <li>Información incluida en mensajes o solicitudes</li>
              </Ul>

              <Divider />

              <H2>3. Finalidades del tratamiento</H2>
              <Ul>
                <li>
                  Atender solicitudes de información, asesoramiento o
                  presupuesto.
                </li>
                <li>
                  Gestionar citas y comunicaciones relacionadas con el servicio.
                </li>
                <li>Mejorar la calidad del servicio y la experiencia web.</li>
              </Ul>

              <Divider />

              <H2>4. Base legal</H2>
              <Ul>
                <li>
                  <strong>Consentimiento</strong> del usuario (p. ej., al enviar
                  un formulario).
                </li>
                <li>
                  <strong>Medidas precontractuales</strong> (p. ej., preparar un
                  presupuesto solicitado).
                </li>
                <li>
                  <strong>Interés legítimo</strong>, cuando proceda (p. ej.,
                  seguridad y prevención de abuso).
                </li>
              </Ul>

              <Divider />

              <H2>5. Conservación</H2>
              <P>
                Conservaremos los datos durante el tiempo necesario para atender
                la solicitud, mantener la relación comercial o cumplir
                obligaciones legales. Posteriormente, se bloquearán o eliminarán
                de forma segura.
              </P>

              <Divider />

              <H2>6. Destinatarios y encargados</H2>
              <P>
                Para prestar el servicio, podemos utilizar proveedores
                tecnológicos que actúan como encargados del tratamiento:
              </P>
              <Ul>
                <li>
                  <strong>Supabase</strong> (almacenamiento/gestión de datos).
                </li>
                <li>
                  <strong>Netlify</strong> (alojamiento y/o gestión de
                  formularios).
                </li>
              </Ul>
              <P>No cedemos datos a terceros, salvo obligación legal.</P>

              <Divider />

              <H2>7. Derechos del usuario</H2>
              <P>
                Puedes ejercer tus derechos de acceso, rectificación, supresión,
                oposición, limitación y portabilidad enviando un email a{" "}
                <A href={`mailto:${legal.legalEmail}`}>{legal.legalEmail}</A>.
              </P>
              <P>
                También puedes presentar una reclamación ante la Agencia
                Española de Protección de Datos (AEPD) si consideras que tus
                derechos no han sido atendidos.
              </P>

              <Divider />

              <H2>8. Seguridad</H2>
              <P>
                Aplicamos medidas técnicas y organizativas razonables para
                proteger los datos personales frente a accesos no autorizados,
                pérdida o alteración.
              </P>

              <Divider />

              <H2>9. Cambios</H2>
              <P>
                Podemos actualizar esta política para adaptarla a cambios
                legales o técnicos. La fecha de la última actualización se
                reflejará en esta página.
              </P>

              <FooterRow>
                <SmallText>
                  Última actualización:{" "}
                  <strong>{new Date().toLocaleDateString("es-ES")}</strong>
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
