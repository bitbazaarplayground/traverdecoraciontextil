let analyticsLoaded = false;

const GA_ID = "G-LD3K2K63QX";

function isProductionHost() {
  return (
    window.location.hostname === "www.traverdecoraciontextil.es" ||
    window.location.hostname === "traverdecoraciontextil.es"
  );
}

export function loadAnalytics() {
  if (!isProductionHost()) return;
  if (analyticsLoaded) return;
  if (!GA_ID) return;

  analyticsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };

  window.gtag("js", new Date());

  window.gtag("config", GA_ID, {
    anonymize_ip: true,
  });

  const existingScript = document.querySelector(
    `script[src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"]`
  );

  if (!existingScript) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  }
}

export function initAnalyticsIfAllowed() {
  const raw = localStorage.getItem("cookie_consent");

  if (!raw) return;

  try {
    const consent = JSON.parse(raw);

    if (consent.analytics) {
      loadAnalytics();
    }
  } catch (error) {
    console.error("Error initializing analytics:", error);
  }
}
