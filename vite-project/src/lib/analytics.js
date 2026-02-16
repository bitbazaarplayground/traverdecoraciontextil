// src/lib/analytics.js
export function trackEvent(eventName, params = {}) {
  try {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;

    window.gtag("event", eventName, params);
  } catch {
    // never break UX if analytics fails/blocked
  }
}
