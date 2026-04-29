/**
 * lib/common-faqs.ts
 *
 * Shared FAQ sets for pages that don't define their own.
 * Used by app/locations/[slug]/page.tsx and app/services/[slug]/page.tsx.
 *
 * These power both the visible FAQ accordion AND the FAQPage JSON-LD.
 */
export interface FAQ { q: string; a: string }

export const LOCATION_FAQS: FAQ[] = [
  {
    q: "How much does local SEO cost in {city}?",
    a: "Assurgit offers three tiers — Starter ($189/mo), Growth ($297/mo), and Scale ($649/mo). Every tier includes a custom-coded website, hosting, schema, sitemap, and analytics. Growth and Scale add active GBP management, citations, review automation, and monthly reporting for businesses in {city} and across the Bay Area.",
  },
  {
    q: "Do you only work with businesses in {city}?",
    a: "We're based in San Jose and serve every major Bay Area market — including {city}. If your service area touches the Bay Area, we can help. We've built sites and run GBP campaigns for handymen, salons, contractors, attorneys, dentists, chiropractors, and more.",
  },
  {
    q: "How long until I see results from local SEO in {city}?",
    a: "Most clients see improved Google Business Profile visibility within 4–6 weeks and meaningful organic traffic gains within 3–4 months. The pace depends on your market's competitiveness in {city} and how much content/citation work was needed at start.",
  },
  {
    q: "Do I own my website if I cancel?",
    a: "Yes. You own the domain, the website code, the GBP, the content, and the data — full stop. Month-to-month after the 3-month initial term. We'll hand off everything if you ever leave.",
  },
  {
    q: "Can you migrate my existing website?",
    a: "Yes. Website migration to our Cloudflare-hosted stack is included in every tier. We preserve URLs and set up 301 redirects so SEO equity carries over.",
  },
];

export const SERVICE_FAQS: FAQ[] = [
  {
    q: "What's included in this service?",
    a: "Every Assurgit engagement includes a custom-coded website, hosting on the same platform that powers Disney+ and Notion, schema markup, sitemap, IndexNow, AI-search readiness, and analytics setup. Growth and Scale tiers add active GBP optimization, citation building, review automation, and monthly reporting.",
  },
  {
    q: "How is Assurgit different from a freelance web designer?",
    a: "We're a system, not a one-off project. Your website, GBP, citations, reviews, and content are operated together — and we keep operating them every month. Most freelancers hand off a site and disappear; we run it.",
  },
  {
    q: "Do I have to sign a long contract?",
    a: "Three-month initial term, then month-to-month. No per-lead fees. No surprise charges. You own everything we build.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "Single-location and small multi-location service businesses across the Bay Area — handymen, salons, barbers, contractors, attorneys, dentists, chiropractors, real estate agents, trainers, therapists, mortgage brokers, CPAs, loan officers, meal-prep services, personal chefs.",
  },
  {
    q: "Where are you based?",
    a: "San Jose, California. We serve every major Bay Area market — San Francisco, Oakland, Berkeley, Palo Alto, Mountain View, Sunnyvale, Cupertino, Santa Clara, Fremont, the Peninsula, the East Bay, and Marin.",
  },
];

export function resolveFAQ(faq: FAQ, vars: Record<string, string>): FAQ {
  return {
    q: Object.entries(vars).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, v), faq.q),
    a: Object.entries(vars).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, v), faq.a),
  };
}
