/**
 * Analytics and Conversion Tracking for Smash B (smashb.ae)
 * 
 * Configured for Google Ads conversion tracking and Google Analytics 4 (GA4).
 * Tracks high-intent customer actions:
 * - talabat_click (Order on Talabat)
 * - whatsapp_click (Order or inquiry via WhatsApp)
 * - call_click (Phone call to shop)
 * - directions_click (Google Maps navigation to outlet near AURAK)
 */

// Placeholders for Google Analytics 4 and Google Ads IDs
// Replace these with your actual IDs when ready:
export const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // e.g. 'G-1234567890'
export const GOOGLE_ADS_ID = 'AW-XXXXXXXXX';      // e.g. 'AW-987654321'
export const GOOGLE_ADS_CONVERSION_LABEL = '';    // e.g. 'AbCdEfGhIjKlMnOpQrS'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Extract UTM and advertising query parameters from current URL to preserve campaign attribution.
 */
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
    'fbclid'
  ];

  trackKeys.forEach((key) => {
    const val = searchParams.get(key);
    if (val) {
      params[key] = val;
    }
  });

  return params;
}

/**
 * Append current UTM tracking parameters to an outbound URL
 */
export function appendUtmParams(targetUrl: string): string {
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

/**
 * Generic event dispatcher for Google Analytics / Google Ads
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  const trackingData = {
    ...getTrackingParams(),
    ...params,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, trackingData);
  } else if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...trackingData,
    });
  }

  // Developer logging in debug mode
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Analytics Event] ${eventName}:`, trackingData);
  }
}

// Convenience trackers for high-value conversion actions
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
