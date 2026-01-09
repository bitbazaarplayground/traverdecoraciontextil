import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import styled from "styled-components";

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

const Item = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: 1rem 1rem;
  border-radius: 18px;
  text-decoration: none;

  background: rgba(17, 17, 17, 0.03);
  border: 1px solid rgba(17, 17, 17, 0.06);

  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    background: rgba(17, 17, 17, 0.05);
    transform: translateY(-1px);
  }
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

const Arrow = styled.div`
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

  ${ItemLeft} svg {
    color: rgba(17, 17, 17, 0.55);
  }
`;

const PrimaryCTA = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin: 0.85rem;
  padding: 1rem 1.1rem;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 900;
  text-decoration: none;
  transition: transform 0.25s ease, opacity 0.25s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;

export default function ContactPage() {
  return (
    <Page>
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
          {/* MAP */}
          <MapCard>
            <MapTop>
              <MapTitle>Visítanos</MapTitle>
              <MapLink
                href="https://maps.app.goo.gl/nqxT2QX2NCbgYTDF9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir en Google Maps →
              </MapLink>
            </MapTop>

            <MapFrame>
              <iframe
                title="Ubicación Traver Decoración Textil"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.073908292976!2d-0.07220452365018995!3d39.94384209087051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1290fd3cf9e940c7%3A0x43a24bed1dfc3786!2sCarrer%20de%20Sant%20Felip%2C%2067%2C%2012550%20Almassora%2C%20Castell%C3%B3n%2C%20Spain!5e0!3m2!1sen!2ses!4v1700000000000!5m2!1sen!2ses"
                loading="lazy"
                allowFullScreen
              />
            </MapFrame>
          </MapCard>

          {/* CONTACT PANEL */}
          <Panel>
            <PanelTop>
              <PanelTitle>Asesoramiento privado</PanelTitle>
              <PanelText>
                Si quieres una respuesta rápida, WhatsApp es lo más cómodo.
                También puedes llamarnos o escribirnos por email.
              </PanelText>
            </PanelTop>

            <PrimaryCTA
              href="https://wa.me/34647856817"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
            >
              <MessageCircle /> Escribir por WhatsApp
            </PrimaryCTA>

            <List>
              <Item href="tel:+34964562357">
                <ItemLeft>
                  <Phone />
                  <ItemText>
                    <span>Teléfono</span>
                    <small>+34 964 56 23 57</small>
                  </ItemText>
                </ItemLeft>
                <Arrow>→</Arrow>
              </Item>

              <Item href="mailto:info@traverdecoracion.com">
                <ItemLeft>
                  <Mail />
                  <ItemText>
                    <span>Email</span>
                    <small>info@traverdecoracion.com</small>
                  </ItemText>
                </ItemLeft>
                <Arrow>→</Arrow>
              </Item>

              <StaticItem>
                <ItemLeft>
                  <Clock />
                  <ItemText>
                    <span>Horario</span>
                    <small>L–V: 9:30–14:00, 17:00–19:00</small>
                  </ItemText>
                </ItemLeft>
                <Arrow />
              </StaticItem>

              <Item
                href="https://maps.app.goo.gl/nqxT2QX2NCbgYTDF9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ItemLeft>
                  <MapPin />
                  <ItemText>
                    <span>Tienda</span>
                    <small>Carrer de Sant Felip, 67 · Almassora</small>
                  </ItemText>
                </ItemLeft>
                <Arrow>→</Arrow>
              </Item>
            </List>
          </Panel>
        </Grid>
      </Wrap>
    </Page>
  );
}
