/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Assurgit — Analytics Module
 *
 * Handles:
 *  - GA4 event tracking (type-safe wrapper)
 *  - UTM parameter capture with first-touch attribution (localStorage)
 *  - Pre-built event helpers for every conversion touchpoint
 *
 * All functions are safe to call server-side (no-op when window is undefined).
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export type Attribution = {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
  landing_page: string;
  referrer: string;
  timestamp: number;
};

const ATTRIBUTION_KEY = 'assurgit_attribution';

/**
 * Fire a GA4 custom event. No-op if gtag is not loaded (dev mode / SSR).
 */
export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

/**
 * Read UTM params from the current URL and persist as first-touch attribution.
 * Only writes if UTM params are present — never overwrites existing attribution.
 * Call once on page mount (handled by AnalyticsProvider).
 */
export function captureUTM(): void {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const source = params.get('utm_source');
  const medium = params.get('utm_medium');
  const campaign = params.get('utm_campaign');

  if ((source || medium || campaign) && !localStorage.getItem(ATTRIBUTION_KEY)) {
    const attribution: Attribution = {
      source,
      medium,
      campaign,
      content: params.get('utm_content'),
      term: params.get('utm_term'),
      landing_page: window.location.pathname,
      referrer: document.referrer,
      timestamp: Date.now(),
    };
    try {
      localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
    } catch {
      // Ignore storage errors (incognito, storage disabled, etc.)
    }
  }
}

/**
 * Retrieve stored first-touch attribution data.
 */
export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

function buildAttributionParams(): Record<string, unknown> {
  const a = getAttribution();
  if (!a) return { traffic_source: 'direct' };
  return {
    traffic_source: a.source ?? 'direct',
    ...(a.medium ? { utm_medium: a.medium } : {}),
    ...(a.campaign ? { utm_campaign: a.campaign } : {}),
    first_landing_page: a.landing_page,
  };
}

function currentPath(): string {
  return typeof window !== 'undefined' ? window.location.pathname : '';
}

/**
 * Pre-built event helpers for every conversion touchpoint.
 *
 * Each event automatically includes:
 *  - page_path: the page where it fired
 *  - traffic_source + utm params: from first-touch attribution in localStorage
 */
export const Events = {
  /** User clicked the primary CTA (e.g. "Get Started", "Book a Demo") */
  ctaClick(ctaName: string) {
    trackEvent('cta_click', {
      cta_name: ctaName,
      page_path: currentPath(),
      ...buildAttributionParams(),
    });
  },

  /** User started filling out the onboarding / waitlist / contact form */
  formStart(context = 'signup') {
    trackEvent('form_start', {
      form_context: context,
      page_path: currentPath(),
      ...buildAttributionParams(),
    });
  },

  /** Form successfully submitted (signup, waitlist, contact) */
  formSubmit(context = 'signup') {
    trackEvent('form_submit', {
      form_context: context,
      page_path: currentPath(),
      ...buildAttributionParams(),
    });
  },

  /** User clicked "Book a Demo" or opened the demo scheduling flow */
  demoBooked() {
    trackEvent('demo_booked', {
      page_path: currentPath(),
      ...buildAttributionParams(),
    });
  },

  /** User clicked a pricing plan */
  pricingClick(plan: string) {
    trackEvent('pricing_click', {
      plan_name: plan,
      page_path: currentPath(),
      ...buildAttributionParams(),
    });
  },

  /** Scroll depth milestone reached. percent: 25 | 50 | 75 | 90 */
  scrollDepth(percent: number) {
    trackEvent('scroll', {
      percent,
      page_path: currentPath(),
    });
  },
};
