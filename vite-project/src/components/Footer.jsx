import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import styled from "styled-components";

/* =========================
   FOOTER WRAPPER
========================= */

const FooterWrapper = styled.footer`
  background: #0e0e0e;
  color: #d1d1d1;
  padding: 4rem 1.5rem 2rem;
`;

const FooterInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

/* =========================
   BRAND
========================= */

const Brand = styled.div``;

const BrandTitle = styled.h3`
  font-size: 1.7rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.75rem;
`;

const BrandText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #b5b5b5;
  max-width: 420px;
`;

const TrustLine = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #9a9a9a;
  font-style: italic;
`;

/* =========================
   COLUMN
========================= */

const Column = styled.div``;

const ColumnTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 1.2rem;
`;

/* =========================
   CONTACT ITEMS
========================= */

const ContactItem = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #b5b5b5;
  text-decoration: none;
  font-size: 0.95rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ContactItemStatic = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #b5b5b5;
  font-size: 0.95rem;
`;

const IconCircle = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

const ContactText = styled.div`
  span {
    display: block;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #888;
  }

  small {
    font-size: 0.95rem;
    color: #d1d1d1;
  }
`;

/* =========================
   BOTTOM
========================= */

const Bottom = styled.div`
  max-width: 1100px;
  margin: 3rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
  font-size: 0.8rem;
  color: #888;
`;

/* =========================
   COMPONENT
========================= */

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterInner>
        {/* BRAND */}
        <Brand>
          <BrandTitle>Traver Decoración Textil</BrandTitle>
          <BrandText>
            Especialistas en decoración textil, cortinas, estores, toldos y
            papel pintado. Proyectos a medida con un enfoque profesional y
            cuidado por el detalle.
          </BrandText>

          <TrustLine>
            Clientes en Castellón y provincia confían en nuestro trabajo desde
            hace más de 32 años.
          </TrustLine>
        </Brand>

        {/* CONTACT */}
        <Column>
          <ColumnTitle>Contacto</ColumnTitle>

          <ContactItem
            href="https://wa.me/34647856817"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconCircle>
              <MessageCircle size={18} />
            </IconCircle>
            <ContactText>
              <span>WhatsApp</span>
              <small>647 856 817</small>
            </ContactText>
          </ContactItem>

          <ContactItem href="tel:+34964562357">
            <IconCircle>
              <Phone size={18} />
            </IconCircle>
            <ContactText>
              <span>Teléfono</span>
              <small>+34 964 56 23 57</small>
            </ContactText>
          </ContactItem>

          <ContactItem href="mailto:info@traverdecoracion.com">
            <IconCircle>
              <Mail size={18} />
            </IconCircle>
            <ContactText>
              <span>Email</span>
              <small>info@traverdecoracion.com</small>
            </ContactText>
          </ContactItem>
        </Column>

        {/* LOCATION */}
        <Column>
          <ColumnTitle>Visítanos</ColumnTitle>

          <ContactItemStatic>
            <IconCircle>
              <Clock size={18} />
            </IconCircle>
            <ContactText>
              <span>Horario</span>
              <small>L–V: 9:30–14:00 · 17:00–19:00</small>
            </ContactText>
          </ContactItemStatic>

          <ContactItem
            href="https://maps.app.goo.gl/nqxT2QX2NCbgYTDF9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconCircle>
              <MapPin size={18} />
            </IconCircle>
            <ContactText>
              <span>Tienda</span>
              <small>
                Carrer de Sant Felip, 67
                <br />
                12550 Almassora
              </small>
            </ContactText>
          </ContactItem>
        </Column>
      </FooterInner>

      <Bottom>
        © {new Date().getFullYear()} Traver Decoración Textil · Todos los
        derechos reservados
      </Bottom>
    </FooterWrapper>
  );
}
