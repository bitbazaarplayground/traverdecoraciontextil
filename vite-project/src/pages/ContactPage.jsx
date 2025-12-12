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

  /* On mobile = second item, on desktop = second column */
  order: 2;

  @media (min-width: 900px) {
    order: 2;
  }
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
    margin-top: 4px;
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

  /* On mobile = first element */
  order: 1;

  @media (max-width: 768px) {
    height: 280px;
  }

  @media (min-width: 900px) {
    order: 1;
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
        {/* MAP FIRST */}
        <MapWrapper>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.073908292976!2d-0.07220452365018995!3d39.94384209087051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1290fd3cf9e940c7%3A0x43a24bed1dfc3786!2sCarrer%20de%20Sant%20Felip%2C%2067%2C%2012550%20Almassora%2C%20Castell%C3%B3n%2C%20Spain!5e0!3m2!1sen!2ses!4v1700000000000!5m2!1sen!2ses"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </MapWrapper>

        {/* CONTACT DETAILS SECOND */}
        <ContactBox>
          <ContactItem
            href="https://wa.me/34647856817"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconCircle>
              <MessageCircle />
            </IconCircle>
            <div>
              <span>WhatsApp</span>
              <small>647 856 817</small>
            </div>
          </ContactItem>

          <ContactItem href="tel:+34964562357">
            <IconCircle>
              <Phone />
            </IconCircle>
            <div>
              <span>Teléfono</span>
              <small>+34 964 56 23 57</small>
            </div>
          </ContactItem>

          <ContactItem href="mailto:info@traverdecoracion.com">
            <IconCircle>
              <Mail />
            </IconCircle>
            <div>
              <span>Email</span>
              <small>info@traverdecoracion.com</small>
            </div>
          </ContactItem>

          <ContactItem as="div">
            <IconCircle>
              <Clock />
            </IconCircle>
            <div>
              <span>Horario</span>
              <small>Lunes a Viernes: 9:30–14:00, 17:00–19:00</small>
            </div>
          </ContactItem>

          <ContactItem
            href="https://maps.app.goo.gl/nqxT2QX2NCbgYTDF9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconCircle>
              <MapPin />
            </IconCircle>
            <div>
              <span>Tienda</span>
              <small>Carrer de Sant Felip, 67, 12550 Almassora</small>
            </div>
          </ContactItem>
        </ContactBox>
      </Grid>
    </PageWrapper>
  );
}
