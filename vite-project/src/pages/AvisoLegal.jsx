// src/pages/AvisoLegal.jsx
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CONTACT } from "../config/contact";

/* =========================
   Helpers
========================= */

function useCanonicalUrl() {
  const { pathname, search } = useLocation();
  const base = import.meta?.env?.VITE_SITE_URL || window.location.origin;
  return `${base}${pathname}${search}`;
}

/* =========================
   Page
========================= */

export default function AvisoLegal() {
  const canonical = useCanonicalUrl();
  const siteName = CONTACT.siteName;

  const metaTitle = `Aviso legal | ${siteName}`;
  const metaDescription =
    "Aviso legal del sitio web de Traver Decoración Textil. Información del titular, condiciones de uso y datos de contacto.";

  // Datos del titular (autónomo)
  const titular = "Zenaida Zorita Vallés";
  const nif = "18945550-J";

  return (
    <Page>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />

        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />

        {/* JSON-LD: WebPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: metaTitle,
            url: canonical,
            isPartOf: {
              "@type": "WebSite",
              name: siteName,
              url: import.meta?.env?.VITE_SITE_URL || window.location.origin,
            },
          })}
        </script>
      </Helmet>

      <Hero>
        <HeroInner>
          <Eyebrow>Información legal</Eyebrow>
          <Title>Aviso legal</Title>
          <Intro>
            Información general del titular del sitio web, condiciones de uso y
            datos de contacto.
          </Intro>

          <BackRow>
            <BackLink to="/">← Volver a inicio</BackLink>
          </BackRow>
        </HeroInner>
      </Hero>

      <Content>
        <Inner>
          <Card>
            <H2>1. Titular del sitio web</H2>
            <P>
              En cumplimiento con el deber de información recogido en la
              normativa aplicable, se informa que este sitio web es titularidad
              de:
            </P>

            <List>
              <li>
                <strong>Titular:</strong> {titular}
              </li>
              <li>
                <strong>NIF:</strong> {nif}
              </li>
              <li>
                <strong>Nombre comercial:</strong> {CONTACT.siteName}
              </li>
              <li>
                <strong>Domicilio:</strong> {CONTACT.address.streetAddress},{" "}
                {CONTACT.address.postalCode} {CONTACT.address.addressLocality},{" "}
                {CONTACT.address.addressRegion}, Spain
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <strong>Teléfono:</strong>{" "}
                <a href={`tel:${CONTACT.phoneLandlineTel}`}>
                  {CONTACT.phoneLandline}
                </a>
              </li>
              <li>
                <strong>WhatsApp:</strong>{" "}
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer">
                  +34 {CONTACT.whatsappNumber}
                </a>
              </li>
            </List>
          </Card>

          <Card>
            <H2>2. Objeto</H2>
            <P>
              El presente Aviso Legal regula el acceso, navegación y uso del
              sitio web, así como las responsabilidades derivadas de la
              utilización de sus contenidos (textos, imágenes, diseño, código,
              etc.).
            </P>
          </Card>

          <Card>
            <H2>3. Condiciones de uso</H2>
            <P>
              El usuario se compromete a utilizar el sitio web de forma
              diligente y conforme a la ley, la buena fe, el orden público y el
              presente Aviso Legal. Queda prohibido:
            </P>
            <List>
              <li>Utilizar el sitio con fines ilícitos o fraudulentos.</li>
              <li>
                Dañar, inutilizar o sobrecargar el sitio o impedir su normal
                funcionamiento.
              </li>
              <li>
                Introducir o difundir virus o cualquier sistema susceptible de
                causar daños.
              </li>
            </List>
          </Card>

          <Card>
            <H2>4. Propiedad intelectual e industrial</H2>
            <P>
              Todos los contenidos del sitio web (incluyendo, sin carácter
              limitativo, textos, fotografías, imágenes, diseño gráfico,
              logotipo y código fuente) son titularidad de {CONTACT.siteName} o
              de sus respectivos titulares, y están protegidos por la normativa
              de propiedad intelectual e industrial.
            </P>
            <P>
              Queda prohibida la reproducción, distribución o comunicación
              pública total o parcial sin autorización expresa del titular.
            </P>
          </Card>

          <Card>
            <H2>5. Responsabilidad</H2>
            <P>
              {CONTACT.siteName} no se responsabiliza de los daños que puedan
              derivarse de interferencias, interrupciones, virus informáticos,
              averías telefónicas o desconexiones motivadas por causas ajenas al
              titular del sitio web.
            </P>
            <P>
              Tampoco se responsabiliza del uso indebido que los usuarios puedan
              hacer de los contenidos del sitio.
            </P>
          </Card>

          <Card>
            <H2>6. Enlaces externos</H2>
            <P>
              El sitio web puede contener enlaces a páginas de terceros. En tal
              caso, {CONTACT.siteName} no asume ninguna responsabilidad por los
              contenidos, políticas o prácticas de dichos sitios externos.
            </P>
          </Card>

          <Card>
            <H2>7. Protección de datos y cookies</H2>
            <P>
              El tratamiento de datos personales se regula en la{" "}
              <InlineLink to="/politica-privacidad">
                Política de privacidad
              </InlineLink>
              . El uso de cookies se regula en la{" "}
              <InlineLink to="/politica-cookies">
                Política de cookies
              </InlineLink>
              .
            </P>
          </Card>

          <Card>
            <H2>8. Legislación aplicable y jurisdicción</H2>
            <P>
              El presente Aviso Legal se rige por la legislación española. Para
              cualquier controversia que pudiera derivarse del acceso o uso del
              sitio web, las partes se someterán a los Juzgados y Tribunales que
              correspondan conforme a la normativa aplicable.
            </P>
          </Card>

          <Note>
            Última actualización:{" "}
            <strong>{new Date().toLocaleDateString("es-ES")}</strong>
          </Note>
        </Inner>
      </Content>
    </Page>
  );
}

/* =========================
   Styles
========================= */

const Page = styled.main`
  width: 100%;
  background: #f5f4f2;
  color: #1c1c1c;
`;

const Hero = styled.header`
  padding: clamp(3.8rem, 6.5vw, 6.2rem) 1.5rem 2.2rem;
`;

const HeroInner = styled.div`
  max-width: 980px;
  margin: 0 auto;
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
  line-height: 1.02;
  font-size: clamp(2.2rem, 5vw, 4.2rem);
`;

const Intro = styled.p`
  margin: 1.1rem 0 0;
  max-width: 78ch;
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.68);
`;

const BackRow = styled.div`
  margin-top: 1.25rem;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.65);
  font-weight: 650;

  &:hover {
    color: rgba(0, 0, 0, 0.85);
  }
`;

const Content = styled.section`
  padding: 0 1.5rem 5.5rem;
`;

const Inner = styled.div`
  max-width: 980px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
`;

const Card = styled.article`
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.06);
  padding: 1.6rem 1.6rem;

  @media (max-width: 768px) {
    padding: 1.35rem 1.2rem;
  }
`;

const H2 = styled.h2`
  margin: 0 0 0.8rem;
  font-size: 1.25rem;
  font-weight: 850;
  color: rgba(0, 0, 0, 0.9);
`;

const P = styled.p`
  margin: 0.65rem 0 0;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.68);
  font-size: 1rem;
`;

const List = styled.ul`
  margin: 0.9rem 0 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.45rem;

  li {
    line-height: 1.65;
    color: rgba(0, 0, 0, 0.68);
  }

  a {
    color: rgba(0, 0, 0, 0.82);
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const InlineLink = styled(Link)`
  color: rgba(0, 0, 0, 0.85);
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Note = styled.p`
  margin: 0.8rem 0 0;
  font-size: 0.92rem;
  color: rgba(0, 0, 0, 0.55);
`;
