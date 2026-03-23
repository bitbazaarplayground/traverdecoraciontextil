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
    <Wrap>
      <Banner
        role="dialog"
        aria-modal="true"
        aria-label="Preferencias de cookies"
      >
        <TopRow>
          <TextBlock>
            <Eyebrow>Privacidad</Eyebrow>
            <Title>Cookies y medición</Title>
            <Text>
              Usamos cookies necesarias para el funcionamiento de la web y, solo
              si lo aceptas, cookies analíticas para medir el uso del sitio.
            </Text>
            <InlineLinks>
              <StyledLink to="/politica-cookies">
                Política de cookies
              </StyledLink>
              <Dot>·</Dot>
              <StyledLink to="/politica-privacidad">
                Política de privacidad
              </StyledLink>
            </InlineLinks>
          </TextBlock>

          <Actions>
            <SecondaryButton type="button" onClick={handleRejectAll}>
              Rechazar
            </SecondaryButton>

            {!showSettings ? (
              <GhostButton type="button" onClick={() => setShowSettings(true)}>
                Configurar
              </GhostButton>
            ) : (
              <GhostButton type="button" onClick={() => setShowSettings(false)}>
                Ocultar opciones
              </GhostButton>
            )}

            <PrimaryButton type="button" onClick={handleAcceptAll}>
              Aceptar
            </PrimaryButton>
          </Actions>
        </TopRow>

        {showSettings && (
          <SettingsPanel>
            <SettingCard>
              <SettingHeader>
                <SettingTitle>Necesarias</SettingTitle>
                <AlwaysOn>Siempre activas</AlwaysOn>
              </SettingHeader>
              <SettingText>
                Permiten la navegación, seguridad y funcionamiento básico del
                sitio.
              </SettingText>
            </SettingCard>

            <SettingCard>
              <SettingHeader>
                <SettingTitle>Analíticas</SettingTitle>
                <Switch>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                  />
                  <span />
                </Switch>
              </SettingHeader>
              <SettingText>
                Nos ayudan a entender cómo se usa la web para mejorar contenido,
                estructura y rendimiento.
              </SettingText>
            </SettingCard>

            <SettingCard>
              <SettingHeader>
                <SettingTitle>Marketing</SettingTitle>
                <Switch>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                  />
                  <span />
                </Switch>
              </SettingHeader>
              <SettingText>
                Reservadas para futuras campañas o medición publicitaria. Ahora
                mismo no las usamos activamente.
              </SettingText>
            </SettingCard>

            <BottomRow>
              <MutedText>
                Puedes cambiar tu elección en cualquier momento desde
                “Configurar cookies”.
              </MutedText>

              <SaveButton type="button" onClick={handleSavePreferences}>
                Guardar preferencias
              </SaveButton>
            </BottomRow>
          </SettingsPanel>
        )}
      </Banner>
    </Wrap>
  );
}

/* =========================
   Styles
========================= */

const Wrap = styled.div`
  position: fixed;
  inset: auto 0 1rem 0;
  z-index: 9999;
  padding: 0 1rem;
  pointer-events: none;
`;

const Banner = styled.div`
  width: min(1080px, 100%);
  margin: 0 auto;
  pointer-events: auto;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(17, 17, 17, 0.08);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(14px);
  overflow: hidden;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1rem 1rem 1.1rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

const TextBlock = styled.div`
  min-width: 0;
`;

const Eyebrow = styled.div`
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.48);
`;

const Title = styled.h2`
  margin: 0.35rem 0 0;
  font-size: 1.05rem;
  font-weight: 850;
  color: rgba(17, 17, 17, 0.92);
`;

const Text = styled.p`
  margin: 0.45rem 0 0;
  max-width: 70ch;
  font-size: 0.96rem;
  line-height: 1.65;
  color: rgba(17, 17, 17, 0.66);
`;

const InlineLinks = styled.div`
  margin-top: 0.6rem;
  display: inline-flex;
  gap: 0.55rem;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.92rem;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
`;

const Dot = styled.span`
  color: rgba(17, 17, 17, 0.28);
`;

const Actions = styled.div`
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 860px) {
    justify-content: flex-start;
  }
`;

const BaseButton = styled.button`
  min-height: 44px;
  border-radius: 999px;
  padding: 0.78rem 1.05rem;
  border: 0;
  font: inherit;
  font-size: 0.94rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.18s ease, opacity 0.18s ease, border-color 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const PrimaryButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
`;

const SecondaryButton = styled(BaseButton)`
  background: rgba(17, 17, 17, 0.07);
  color: rgba(17, 17, 17, 0.84);
`;

const GhostButton = styled(BaseButton)`
  background: transparent;
  color: rgba(17, 17, 17, 0.74);
  border: 1px solid rgba(17, 17, 17, 0.1);
`;

const SettingsPanel = styled.div`
  padding: 0 1rem 1rem 1rem;
  display: grid;
  gap: 0.85rem;
`;

const SettingCard = styled.div`
  border-radius: 18px;
  padding: 0.95rem 1rem;
  background: rgba(17, 17, 17, 0.035);
  border: 1px solid rgba(17, 17, 17, 0.06);
`;

const SettingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const SettingTitle = styled.h3`
  margin: 0;
  font-size: 0.98rem;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.88);
`;

const SettingText = styled.p`
  margin: 0.45rem 0 0;
  font-size: 0.92rem;
  line-height: 1.6;
  color: rgba(17, 17, 17, 0.64);
`;

const AlwaysOn = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.42rem 0.72rem;
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.08);
  color: rgba(17, 17, 17, 0.72);
  font-size: 0.8rem;
  font-weight: 800;
`;

const Switch = styled.label`
  position: relative;
  display: inline-flex;
  width: 54px;
  height: 32px;
  cursor: pointer;

  input {
    display: none;
  }

  span {
    position: absolute;
    inset: 0;
    border-radius: 999px;
    background: rgba(17, 17, 17, 0.16);
    transition: background 0.2s ease;
  }

  span::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background: #fff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s ease;
  }

  input:checked + span {
    background: ${({ theme }) => theme.colors.primary};
  }

  input:checked + span::after {
    transform: translateX(22px);
  }
`;

const BottomRow = styled.div`
  display: flex;
  gap: 0.85rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 0.2rem;
`;

const MutedText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgba(17, 17, 17, 0.58);
`;

const SaveButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
`;
