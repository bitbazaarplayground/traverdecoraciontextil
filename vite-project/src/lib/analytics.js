// src/lib/analytics.js

export function trackEvent(eventName, params = {}) {
  try {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;

    window.gtag("event", eventName, params);
  } catch {
    // nunca romper la UX si analytics falla o está bloqueado
  }
}

// Contact clicks
export function trackWhatsAppClick(location = "unknown") {
  trackEvent("contact_whatsapp_click", {
    contact_method: "whatsapp",
    location,
  });
}

export function trackPhoneClick(location = "unknown") {
  trackEvent("contact_phone_click", {
    contact_method: "phone",
    location,
  });
}
// Email
export function trackEmailClick(location = "unknown") {
  trackEvent("contact_email_click", {
    contact_method: "email",
    location,
  });
}
// Lead / form submissions
export function trackFormSubmit(formName = "unknown", location = "unknown") {
  trackEvent("generate_lead", {
    form_name: formName,
    location,
  });
}

// CTA clicks
export function trackCtaClick(location = "unknown", ctaName = "unknown") {
  trackEvent("cta_click", {
    location,
    cta_name: ctaName,
  });
}

// Map clicks
export function trackMapClick(location = "unknown") {
  trackEvent("contact_map_click", {
    contact_method: "map",
    location,
  });
}

// Optional: open enquiry / modal style events
export function trackOpenQuickEnquiry(
  location = "unknown",
  pack = "unknown",
  extraParams = {}
) {
  trackEvent("open_quick_enquiry", {
    location,
    pack,
    ...extraParams,
  });
}
