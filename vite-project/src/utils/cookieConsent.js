const COOKIE_CONSENT_KEY = "cookie_consent";

export const defaultConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: null,
};

export function getStoredConsent() {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!raw) return null;

    const parsed = JSON.parse(raw);

    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      updatedAt: parsed.updatedAt || null,
    };
  } catch (error) {
    console.error("Error reading cookie consent:", error);
    return null;
  }
}

export function saveConsent(consent) {
  const finalConsent = {
    necessary: true,
    analytics: Boolean(consent.analytics),
    marketing: Boolean(consent.marketing),
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(finalConsent));

  window.dispatchEvent(
    new CustomEvent("cookie-consent-updated", {
      detail: finalConsent,
    })
  );

  return finalConsent;
}

export function hasUserMadeChoice() {
  return getStoredConsent() !== null;
}

export function acceptAllCookies() {
  return saveConsent({
    analytics: true,
    marketing: true,
  });
}

export function rejectOptionalCookies() {
  return saveConsent({
    analytics: false,
    marketing: false,
  });
}

export function resetCookieConsent() {
  localStorage.removeItem(COOKIE_CONSENT_KEY);

  window.dispatchEvent(new CustomEvent("cookie-consent-reset"));
}

export function canLoadAnalytics() {
  const consent = getStoredConsent();
  return Boolean(consent?.analytics);
}

export function canLoadMarketing() {
  const consent = getStoredConsent();
  return Boolean(consent?.marketing);
}
export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
}
