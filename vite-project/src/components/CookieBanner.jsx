import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  acceptAllCookies,
  getStoredConsent,
  rejectOptionalCookies,
  saveConsent,
} from "../utils/cookieConsent";
import { loadAnalytics } from "../utils/loadAnalytics";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existingConsent = getStoredConsent();

    if (!existingConsent) {
      setIsVisible(true);
    } else {
      setAnalytics(existingConsent.analytics);
      setMarketing(existingConsent.marketing);
      setIsVisible(false);
    }

    function handleOpenPreferences() {
      const stored = getStoredConsent();

      setAnalytics(Boolean(stored?.analytics));
      setMarketing(Boolean(stored?.marketing));
      setShowSettings(true);
      setIsVisible(true);
    }

    window.addEventListener("open-cookie-preferences", handleOpenPreferences);

    return () => {
      window.removeEventListener(
        "open-cookie-preferences",
        handleOpenPreferences
      );
    };
  }, []);

  function handleAcceptAll() {
    acceptAllCookies();
    loadAnalytics();
    setIsVisible(false);
    setShowSettings(false);
  }

  function handleRejectAll() {
    rejectOptionalCookies();
    setIsVisible(false);
    setShowSettings(false);
  }

  function handleSavePreferences() {
    const saved = saveConsent({
      analytics,
      marketing,
    });

    if (saved.analytics) {
      loadAnalytics();
    }

    setIsVisible(false);
    setShowSettings(false);
  }

  if (!isVisible) return null;

  return (
    <Overlay>
      <Banner
        role="dialog"
        aria-modal="true"
        aria-label="Preferencias de cookies"
      >
        <Content>
          <Title>Cookies</Title>

          <Text>
            Utilizamos cookies necesarias para el funcionamiento de la web y,
            solo si lo aceptas, cookies analíticas y de marketing para medir el
            uso del sitio y mejorar nuestras campañas.
          </Text>

          <Text>
            Puedes aceptar, rechazar las no necesarias o configurar tus
            preferencias. Para más información, consulta nuestra{" "}
            <StyledLink to="/politica-cookies">Política de cookies</StyledLink>.
          </Text>

          {showSettings && (
            <SettingsBox>
              <SettingRow>
                <SettingTextWrap>
                  <SettingTitle>Cookies necesarias</SettingTitle>
                  <SettingDescription>
                    Siempre activas. Son necesarias para que la web funcione
                    correctamente.
                  </SettingDescription>
                </SettingTextWrap>

                <AlwaysActive>Permanentes</AlwaysActive>
              </SettingRow>

              <SettingRow>
                <SettingTextWrap>
                  <SettingTitle>Cookies analíticas</SettingTitle>
                  <SettingDescription>
                    Nos ayudan a entender cómo se usa la web para mejorar su
                    rendimiento.
                  </SettingDescription>
                </SettingTextWrap>

                <ToggleWrap>
                  <ToggleInput
                    type="checkbox"
                    checked={analytics}
                    onChange={(event) => setAnalytics(event.target.checked)}
                  />
                </ToggleWrap>
              </SettingRow>

              <SettingRow>
                <SettingTextWrap>
                  <SettingTitle>Cookies de marketing</SettingTitle>
                  <SettingDescription>
                    Permiten medir campañas y mostrar contenido promocional más
                    relevante.
                  </SettingDescription>
                </SettingTextWrap>

                <ToggleWrap>
                  <ToggleInput
                    type="checkbox"
                    checked={marketing}
                    onChange={(event) => setMarketing(event.target.checked)}
                  />
                </ToggleWrap>
              </SettingRow>
            </SettingsBox>
          )}

          <ButtonsRow>
            {!showSettings ? (
              <>
                <SecondaryButton type="button" onClick={handleRejectAll}>
                  Rechazar
                </SecondaryButton>

                <SecondaryButton
                  type="button"
                  onClick={() => setShowSettings(true)}
                >
                  Configurar
                </SecondaryButton>

                <PrimaryButton type="button" onClick={handleAcceptAll}>
                  Aceptar todas
                </PrimaryButton>
              </>
            ) : (
              <>
                <SecondaryButton
                  type="button"
                  onClick={() => setShowSettings(false)}
                >
                  Volver
                </SecondaryButton>

                <SecondaryButton type="button" onClick={handleRejectAll}>
                  Rechazar
                </SecondaryButton>

                <PrimaryButton type="button" onClick={handleSavePreferences}>
                  Guardar preferencias
                </PrimaryButton>
              </>
            )}
          </ButtonsRow>
        </Content>
      </Banner>
    </Overlay>
  );
}

/* =========================
   Styles
========================= */

const Overlay = styled.div`
  position: fixed;
  inset: auto 0 0 0;
  z-index: 9999;
  padding: 1rem;
`;

const Banner = styled.div`
  width: min(980px, 100%);
  margin: 0 auto;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.16);
  overflow: hidden;
`;

const Content = styled.div`
  padding: clamp(1.1rem, 2.5vw, 1.7rem);
`;

const Title = styled.h2`
  margin: 0 0 0.75rem;
  font-size: 1.2rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.92);
`;

const Text = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.7);

  & + & {
    margin-top: 0.8rem;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SettingsBox = styled.div`
  margin-top: 1.25rem;
  padding: 1rem;
  border-radius: 18px;
  background: rgba(0, 0, 0, 0.03);
  display: grid;
  gap: 0.95rem;
`;

const SettingRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const SettingTextWrap = styled.div`
  flex: 1 1 320px;
`;

const SettingTitle = styled.h3`
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.88);
`;

const SettingDescription = styled.p`
  margin: 0;
  font-size: 0.94rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.66);
`;

const AlwaysActive = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  padding: 0.65rem 0.9rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.72);
  background: rgba(0, 0, 0, 0.08);
`;

const ToggleWrap = styled.label`
  display: inline-flex;
  align-items: center;
`;

const ToggleInput = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-top: 1.25rem;
`;

const BaseButton = styled.button`
  border: 0;
  border-radius: 999px;
  padding: 0.9rem 1.15rem;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.18s ease, opacity 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const PrimaryButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
`;

const SecondaryButton = styled(BaseButton)`
  background: rgba(0, 0, 0, 0.07);
  color: rgba(0, 0, 0, 0.82);
`;
