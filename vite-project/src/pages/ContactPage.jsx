// src/pages/ContactPage.jsx
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { CONTACT } from "../config/contact";
import { trackEvent } from "../lib/analytics";

const Page = styled.main`
  width: 100%;
  background: #fff;
  color: #111;
`;

const Wrap = styled.section`
  width: 100%;
  padding: 6rem 1.5rem 5.5rem;
  max-width: 1160px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 4.5rem 1rem 4.2rem;
  }
`;

const Header = styled.div`
  text-align: center;
  max-width: 760px;
  margin: 0 auto 3.2rem;
`;

const Eyebrow = styled.p`
  margin: 0 0 0.9rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(17, 17, 17, 0.55);
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 650;
  margin: 0 0 1rem;
  color: #111;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.1rem;
  }
`;

const Subtitle = styled.p`
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.68);
`;

const Grid = styled.div`
  display: grid;
  gap: 1.25rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 1.25rem;
    align-items: start;
  }
`;

const MapCard = styled.div`
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: #fafafa;
`;

const MapTop = styled.div`
  padding: 1.2rem 1.2rem 1rem;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
`;

const MapTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 750;
  color: #111;
`;

const MapLink = styled.a`
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  color: rgba(17, 17, 17, 0.75);

  &:hover {
    text-decoration: underline;
  }
`;

const MapFrame = styled.div`
  height: 360px;
  background: #eee;

  @media (max-width: 768px) {
    height: 280px;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const Panel = styled.aside`
  border-radius: 24px;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: #fff;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const PanelTop = styled.div`
  padding: 1.35rem 1.3rem 1.1rem;
  border-bottom: 1px solid rgba(17, 17, 17, 0.08);
`;

const ContextPill = styled.div`
  margin-top: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.45rem 0.75rem;
  border-radius: 999px;

  background: rgba(17, 17, 17, 0.05);
  border: 1px solid rgba(17, 17, 17, 0.08);

  font-size: 0.85rem;
  color: rgba(17, 17, 17, 0.7);

  strong {
    color: rgba(17, 17, 17, 0.9);
    font-weight: 800;
  }
`;

const PanelTitle = styled.h2`
  margin: 0 0 0.35rem;
  font-size: 1.2rem;
  font-weight: 750;
  color: #111;
`;

const PanelText = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.68);
`;

const List = styled.div`
  padding: 0.35rem;
  display: grid;
  gap: 0.35rem;
`;

const ItemBase = `
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  width: 100%;
  padding: 1rem 1rem;
  border-radius: 18px;

  background: rgba(17, 17, 17, 0.03);
  border: 1px solid rgba(17, 17, 17, 0.06);

  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    background: rgba(17, 17, 17, 0.05);
    transform: translateY(-1px);
  }
`;

const Item = styled.a`
  ${ItemBase}
  text-decoration: none;
  cursor: pointer;
`;

const ItemButton = styled.button`
  ${ItemBase}
  cursor: pointer;
  border: 1px solid rgba(17, 17, 17, 0.06);
  text-align: left;
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;

  svg {
    width: 20px;
    height: 20px;
    color: rgba(17, 17, 17, 0.55);
  }
`;

const ItemText = styled.div`
  display: grid;
  gap: 0.2rem;

  span {
    font-size: 1rem;
    font-weight: 750;
    color: rgba(17, 17, 17, 0.9);
  }

  small {
    font-size: 0.95rem;
    color: rgba(17, 17, 17, 0.65);
  }
`;

const RightArrow = styled.div`
  font-weight: 900;
  color: rgba(17, 17, 17, 0.35);
`;

const StaticItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: 1rem 1rem;
  border-radius: 18px;

  background: rgba(17, 17, 17, 0.03);
  border: 1px solid rgba(17, 17, 17, 0.06);
`;

export default function ContactPage({ onOpenAsesoramiento }) {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // SEO base
  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");
  const canonical = `${baseUrl}/contact`;

  const siteName = CONTACT.siteName;

  const title = `Contacto | ${CONTACT.siteName} en ${CONTACT.address.addressLocality} (${CONTACT.address.addressRegion})`;
  const description =
    "Contacta con Traver Decoración Textil: asesoramiento, visita técnica y propuesta sin compromiso. Estamos en Almassora y trabajamos en Castellón y Valencia.";

  const ogImage = `${baseUrl}/og.png`;
  const ogImageAlt = `Contacto ${CONTACT.siteName} en ${CONTACT.address.addressLocality} (${CONTACT.address.addressRegion})`;

  const telephone = CONTACT.phoneLandline;
  const whatsappNumber = CONTACT.whatsappNumber;
  const whatsappUrl = CONTACT.whatsappUrl;

  const address = {
    "@type": "PostalAddress",
    ...CONTACT.address,
  };

  const jsonLd = useMemo(() => {
    const contactPageJsonLd = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${canonical}#contactpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: "es-ES",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: siteName,
      },
      about: { "@id": `${baseUrl}/#business` },
      mainEntity: {
        "@type": "Organization",
        "@id": `${baseUrl}/#business`,
        name: siteName,
        url: `${baseUrl}/`,
        telephone,
        address,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone,
            contactType: "customer support",
            availableLanguage: ["es"],
          },
          {
            "@type": "ContactPoint",
            telephone: `+${whatsappNumber.slice(0, 2)} ${whatsappNumber.slice(
              2,
              5
            )} ${whatsappNumber.slice(5, 8)} ${whatsappNumber.slice(8)}`,
            contactType: "customer support",
            availableLanguage: ["es"],
            url: whatsappUrl,
          },
        ],
        sameAs: [CONTACT.facebookUrl],
      },
    };

    return [contactPageJsonLd];
  }, [
    canonical,
    title,
    description,
    baseUrl,
    siteName,
    telephone,
    address,
    whatsappNumber,
    whatsappUrl,
  ]);

  // Map pack query param to friendly label (kept)
  const packLabel = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const pack = params.get("pack");

    if (pack === "dormitorio") return "Dormitorio";
    if (pack === "salon") return "Salón / Comedor";
    if (pack === "automatizacion") return "Confort + Automatización";

    // If a page ever passes a real label directly: /contact?pack=Toldos
    if (pack && pack.trim().length) return pack;

    return null;
  }, [location.search]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();

    const handler = () => apply();
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  const openDrawerForm = () => {
    const pack = packLabel ?? "General";

    trackEvent("open_quick_enquiry", {
      source: "contact_page",
      pack,
      device: isMobile ? "mobile" : "desktop",
    });

    onOpenAsesoramiento?.(pack, "contact_page");
  };

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

      <Wrap>
        <Header>
          <Eyebrow>Contacto · Asesoramiento</Eyebrow>
          <Title>
            Hablemos de tu <span>proyecto</span>.
          </Title>
          <Subtitle>
            Cortinas, estores, toldos y automatización. Te orientamos con
            honestidad y preparamos una propuesta ajustada a tu espacio.
          </Subtitle>
        </Header>

        <Grid>
          <MapCard>
            <MapTop>
              <MapTitle>Visítanos</MapTitle>
              <MapLink
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("maps_click", { source: "contact_page" })
                }
              >
                Abrir en Google Maps →
              </MapLink>
            </MapTop>

            <MapFrame>
              <iframe
                title={`Ubicación ${CONTACT.siteName}`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.073908292976!2d-0.07220452365018995!3d39.94384209087051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1290fd3cf9e940c7%3A0x43a24bed1dfc3786!2sCarrer%20de%20Sant%20Felip%2C%2067%2C%2012550%20Almassora%2C%20Castell%C3%B3n%2C%20Spain!5e0!3m2!1sen!2ses!4v1700000000000!5m2!1sen!2ses"
                loading="lazy"
                allowFullScreen
              />
            </MapFrame>
          </MapCard>

          <Panel>
            <PanelTop>
              <PanelTitle>Asesoramiento privado</PanelTitle>
              <PanelText>
                Si quieres una respuesta rápida, WhatsApp es lo más cómodo.
                También puedes llamarnos o, si lo prefieres, usar el formulario.
              </PanelText>

              {packLabel && (
                <ContextPill>
                  Solicitud: <strong>{packLabel}</strong>
                </ContextPill>
              )}
            </PanelTop>

            <List>
              {/* FORM (opens QuickEnquiryModal drawer) */}
              <ItemButton
                type="button"
                onClick={openDrawerForm}
                aria-label="Abrir formulario de contacto"
              >
                <ItemLeft>
                  <Mail />
                  <ItemText>
                    <span>Formulario</span>
                    <small>Envíanos tu consulta</small>
                  </ItemText>
                </ItemLeft>

                <RightArrow>→</RightArrow>
              </ItemButton>

              <Item
                href={`tel:${CONTACT.phoneLandlineTel}`}
                onClick={() =>
                  trackEvent("phone_click", {
                    source: "contact_page",
                    number: CONTACT.phoneLandlineTel,
                  })
                }
              >
                <ItemLeft>
                  <Phone />
                  <ItemText>
                    <span>Teléfono</span>
                    <small>{CONTACT.phoneLandline}</small>
                  </ItemText>
                </ItemLeft>
                <RightArrow>→</RightArrow>
              </Item>

              <Item
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_click", { source: "contact_page" })
                }
              >
                <ItemLeft>
                  <MessageCircle />
                  <ItemText>
                    <span>WhatsApp</span>
                    <small>Respuesta rápida</small>
                  </ItemText>
                </ItemLeft>
                <RightArrow>→</RightArrow>
              </Item>

              <StaticItem>
                <ItemLeft>
                  <Clock />
                  <ItemText>
                    <span>Horario</span>
                    <small>L–V: 9:30–14:00, 17:00–19:00</small>
                  </ItemText>
                </ItemLeft>
                <RightArrow />
              </StaticItem>

              <Item
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("maps_click", { source: "contact_page" })
                }
              >
                <ItemLeft>
                  <MapPin />
                  <ItemText>
                    <span>Tienda</span>
                    <small>
                      {CONTACT.address.streetAddress} ·{" "}
                      {CONTACT.address.addressLocality}
                    </small>
                  </ItemText>
                </ItemLeft>
                <RightArrow>→</RightArrow>
              </Item>
            </List>
          </Panel>
        </Grid>
      </Wrap>
    </Page>
  );
}
