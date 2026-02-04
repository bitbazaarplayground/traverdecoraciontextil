import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CONTACT } from "../config/contact";

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
    "Información sobre el uso de cookies, tipos (técnicas, analíticas y marketing), consentimiento y cómo gestionarlas.";

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
            Política de <span>cookies</span>
          </Title>
          <Sub>
            Usamos cookies para que la web funcione correctamente y, si lo
            aceptas, para analizar rendimiento y mejorar campañas
            (analytics/ads).
          </Sub>

          <BackRow>
            <BackLink to="/contact">¿Necesitas ayuda? Contactar</BackLink>
          </BackRow>
        </Container>
      </Hero>

      <Main>
        <Container>
          <Card>
            <CardInner>
              <H2>1. ¿Qué son las cookies?</H2>
              <P>
                Las cookies son pequeños archivos que se almacenan en tu
                navegador para recordar información sobre tu visita (por
                ejemplo, preferencias o mediciones de uso).
              </P>

              <Divider />

              <H2>2. Tipos de cookies que puede usar esta web</H2>
              <P>En esta web podemos usar las siguientes categorías:</P>

              <List>
                <li>
                  <strong>Cookies técnicas (necesarias):</strong> permiten el
                  funcionamiento básico del sitio y no requieren consentimiento.
                </li>
                <li>
                  <strong>Cookies analíticas:</strong> ayudan a medir el uso y
                  mejorar el rendimiento (p. ej., Google Analytics u otros).
                </li>
                <li>
                  <strong>Cookies de marketing / publicidad:</strong> permiten
                  medir campañas y mostrar anuncios relevantes (p. ej., Google
                  Ads, Meta/Facebook Pixel).
                </li>
              </List>

              <Divider />

              <H2>3. Consentimiento</H2>
              <P>
                Las cookies no necesarias (analíticas y marketing) solo se
                instalarán si das tu consentimiento mediante el banner de
                cookies.
              </P>

              <Divider />

              <H2>4. Cómo gestionar o eliminar cookies</H2>
              <P>
                Puedes configurar tu navegador para bloquear o eliminar cookies
                en cualquier momento. Ten en cuenta que desactivar cookies
                técnicas puede afectar al funcionamiento del sitio.
              </P>

              <Divider />

              <H2>5. Cambios en esta política</H2>
              <P>
                Podemos actualizar esta política por cambios legales o técnicos.
                La fecha de actualización se indicará en esta página.
              </P>

              <FooterRow>
                <SmallText>
                  Última actualización:{" "}
                  <strong>{new Date().toLocaleDateString("es-ES")}</strong>
                </SmallText>

                <MiniNav>
                  <MiniLink to="/aviso-legal">Aviso legal</MiniLink>
                  <Dot>·</Dot>
                  <MiniLink to="/politica-privacidad">Privacidad</MiniLink>
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

const List = styled.ul`
  margin: 0.6rem 0 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.65rem;
  color: rgba(0, 0, 0, 0.66);
  line-height: 1.7;

  strong {
    color: rgba(0, 0, 0, 0.84);
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
