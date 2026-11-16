/// <reference types="vite/client" />
/**
 * Analytics and Conversion Tracking for Smash B (smashb.ae)
 *
 * Google Tag Manager container GTM-TJNTGJM3 is loaded in index.html.
 * Optional direct GA4 / Google Ads IDs can also be configured via
 * VITE_GA4_ID and VITE_GADS_ID environment variables.
 */

const rawGtmId = (import.meta.env?.VITE_GTM_ID || 'GTM-TJNTGJM3').trim();
const rawGa4Id = (import.meta.env?.VITE_GA4_ID || '').trim();
const rawGadsId = (import.meta.env?.VITE_GADS_ID || '').trim();
const rawGadsLabel = (import.meta.env?.VITE_GADS_CONVERSION_LABEL || '').trim();

const isPlaceholderId = (id: string) =>
  !id || /^G-X+$/i.test(id) || /^AW-X+$/i.test(id) || /^GTM-X+$/i.test(id);

export const GTM_CONTAINER_ID = isPlaceholderId(rawGtmId) ? '' : rawGtmId;
export const GA4_MEASUREMENT_ID = isPlaceholderId(rawGa4Id) ? '' : rawGa4Id;
export const GOOGLE_ADS_ID = isPlaceholderId(rawGadsId) ? '' : rawGadsId;
export const GOOGLE_ADS_CONVERSION_LABEL = rawGadsLabel;

export const isAnalyticsEnabled = (): boolean =>
  Boolean(GTM_CONTAINER_ID || GA4_MEASUREMENT_ID || GOOGLE_ADS_ID);

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

let analyticsInitialized = false;

export function initAnalytics(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (analyticsInitialized || !isAnalyticsEnabled()) return;

  analyticsInitialized = true;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
  }

  // Only inject direct gtag.js if VITE_GA4_ID or VITE_GADS_ID is additionally set
  const directGtagId = GA4_MEASUREMENT_ID || GOOGLE_ADS_ID;
  if (directGtagId) {
    if (GA4_MEASUREMENT_ID) {
      window.gtag('config', GA4_MEASUREMENT_ID);
    }
    if (GOOGLE_ADS_ID) {
      window.gtag('config', GOOGLE_ADS_ID);
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-smash-gtag="true"]'
    );
    if (!existing) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(directGtagId)}`;
      script.setAttribute('data-smash-gtag', 'true');
      document.head.appendChild(script);
    }
  }
}

export function getTrackingParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const searchParams = new URLSearchParams(window.location.search);
  const params: Record<string, string> = {};

  const trackKeys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'wbraid',
    'gbraid',
    'fbclid',
  ];

  trackKeys.forEach((key) => {
    const val = searchParams.get(key);
    if (val) {
      params[key] = val;
    }
  });

  return params;
}

export function appendUtmParams(targetUrl: string): string {
  if (typeof window === 'undefined') return targetUrl;
  try {
    const tracking = getTrackingParams();
    if (Object.keys(tracking).length === 0) return targetUrl;

    const url = new URL(targetUrl, window.location.origin);
    Object.entries(tracking).forEach(([k, v]) => {
      if (!url.searchParams.has(k)) {
        url.searchParams.set(k, v);
      }
    });
    return url.toString();
  } catch {
    return targetUrl;
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') return;

  const trackingData = {
    ...getTrackingParams(),
    ...params,
    timestamp: new Date().toISOString(),
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...trackingData,
  });

  if ((GA4_MEASUREMENT_ID || GOOGLE_ADS_ID) && typeof window.gtag === 'function') {
    window.gtag('event', eventName, trackingData);
  }
}

export const trackTalabatClick = (placement: string = 'hero') => {
  trackEvent('talabat_click', {
    event_category: 'conversion',
    event_label: 'Talabat Order',
    placement,
  });
};

export const trackWhatsAppClick = (placement: string = 'hero') => {
  trackEvent('whatsapp_click', {
    event_category: 'conversion',
    event_label: 'WhatsApp Order',
    placement,
  });
};

export const trackCallClick = (placement: string = 'find_us') => {
  trackEvent('call_click', {
    event_category: 'lead',
    event_label: 'Phone Call',
    placement,
  });
};

export const trackDirectionsClick = (placement: string = 'find_us') => {
  trackEvent('directions_click', {
    event_category: 'engagement',
    event_label: 'Get Directions (Google Maps)',
    placement,
  });
};

export const trackReviewClick = (placement: string = 'reviews') => {
  trackEvent('review_click', {
    event_category: 'engagement',
    event_label: 'Google Review Link',
    placement,
  });
};
