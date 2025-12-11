import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import styled from "styled-components";

const PageWrapper = styled.section`
  width: 100%;
  padding: 4rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.6rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  max-width: 650px;
  margin: 0 auto 3rem auto;
  color: #555;
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 1.3rem 1.2rem;
  background: #fff;
  border-radius: 12px;
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);

  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  }

  span {
    display: block;
    font-size: 1.1rem;
    font-weight: 500;
    color: #111;
  }

  small {
    color: #555;
  }
`;

const IconCircle = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  padding: 0.9rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: #fff;
    width: 24px;
    height: 24px;
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 350px;

  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

  @media (max-width: 768px) {
    height: 280px;
  }
`;

export default function ContactPage() {
  return (
    <PageWrapper>
      <Title>Contacto</Title>

      <Subtitle>
        Estamos aquí para ayudarte con cortinas, toldos, tapicerías y
        automatización del hogar. ¡Contacta con nosotros!
      </Subtitle>

      <Grid>
        {/* LEFT SIDE — CONTACT OPTIONS */}
        <ContactBox>
          {/* WhatsApp */}
          <ContactItem
            href="https://wa.me/34647856817"
            target="_blank"
            rel="noopener"
          >
            <IconCircle>
              <MessageCircle />
            </IconCircle>
            <div>
              <span>WhatsApp</span>
              <small>647 856 817</small>
            </div>
          </ContactItem>

          {/* Phone */}
          <ContactItem href="tel:+34964562357">
            <IconCircle>
              <Phone />
            </IconCircle>
            <div>
              <span>Teléfono</span>
              <small>+34 964 56 23 57</small>
            </div>
          </ContactItem>

          {/* Email */}
          <ContactItem href="mailto:info@traverdecoracion.com">
            <IconCircle>
              <Mail />
            </IconCircle>
            <div>
              <span>Email</span>
              <small>info@traverdecoracion.com</small>
            </div>
          </ContactItem>

          {/* Working Hours */}
          <ContactItem as="div">
            <IconCircle>
              <Clock />
            </IconCircle>
            <div>
              <span>Horario</span>
              <small>Lunes a Viernes: 9:30–14:00, 17:00–19:00</small>
            </div>
          </ContactItem>

          {/* Showroom Location */}
          <ContactItem
            href="https://maps.google.com/?q=Carrer+de+Sant+Felip,+67,+12550+Almassora,+Castellón,+Spain"
            target="_blank"
            rel="noopener"
          >
            <IconCircle>
              <MapPin />
            </IconCircle>
            <div>
              <span>Showroom</span>
              <small>Carrer de Sant Felip, 67, 12550 Almassora</small>
            </div>
          </ContactItem>
        </ContactBox>

        {/* RIGHT SIDE — MAP */}
        <MapWrapper>
          <iframe
            src="https://maps.app.goo.gl/nqxT2QX2NCbgYTDF9"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </MapWrapper>
      </Grid>
    </PageWrapper>
  );
}
