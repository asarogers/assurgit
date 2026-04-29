/**
 * ============================================================
 *  ASSURGIT — GBP Categories & Services
 *  Mirrors the D1 row in gbp_locations (id='assurgit').
 *  Source: assurgit-db.gbp_locations
 * ============================================================
 */

export interface GBPService {
  name: string;
  slug: string;
  isNew?: boolean;
}

export interface GBPCategory {
  slug: string;
  name: string;
  gbpName: string;
  tagline: string;
  description: string;
  isPrimary?: boolean;
  services: GBPService[];
}

export const gbpCategories: GBPCategory[] = [
  {
    slug: "website-designer",
    name: "Website Designer",
    gbpName: "Website designer",
    tagline: "Custom-coded websites for Bay Area service businesses.",
    description:
      "Custom-coded websites built on Cloudflare's enterprise platform — schema, sitemap, AI-search readiness, booking integrations, tap-to-call, and a Core Web Vitals guarantee. You own the source code, domain, and data.",
    isPrimary: true,
    services: [
      { name: "Custom website design and development", slug: "custom-website-design" },
      { name: "Website migration to Cloudflare", slug: "website-migration", isNew: true },
      { name: "Service page creation", slug: "service-page-creation", isNew: true },
      { name: "City and neighborhood page creation", slug: "city-neighborhood-pages", isNew: true },
      { name: "Booking platform integration", slug: "booking-integration", isNew: true },
      { name: "Tap-to-call and live map integration", slug: "tap-to-call-map", isNew: true },
      { name: "Live Google review widget", slug: "google-review-widget", isNew: true },
      { name: "Custom domain email setup", slug: "custom-email-setup", isNew: true },
      { name: "Privacy/terms/accessibility statement", slug: "legal-statements", isNew: true },
      { name: "Quarterly WCAG 2.1 AA accessibility audit", slug: "accessibility-audit", isNew: true },
      { name: "Daily site backups", slug: "daily-backups", isNew: true },
      { name: "Site uptime monitoring", slug: "uptime-monitoring", isNew: true },
      { name: "Bug fix and edit support", slug: "bug-fix-support", isNew: true },
      { name: "HubSpot CRM integration", slug: "hubspot-integration", isNew: true },
      { name: "Jobber integration", slug: "jobber-integration", isNew: true },
      { name: "Housecall Pro integration", slug: "housecall-pro-integration", isNew: true },
      { name: "ServiceTitan integration", slug: "servicetitan-integration", isNew: true },
      { name: "Clio Grow integration", slug: "clio-grow-integration", isNew: true },
      { name: "Pipedrive CRM integration", slug: "pipedrive-integration", isNew: true },
      { name: "GoHighLevel integration", slug: "gohighlevel-integration", isNew: true },
      { name: "Landing page A/B testing", slug: "ab-testing", isNew: true },
    ],
  },
  {
    slug: "internet-marketing-service",
    name: "Internet Marketing Service",
    gbpName: "Internet marketing service",
    tagline: "Local SEO + AI search + content for Bay Area service businesses.",
    description:
      "Schema markup, sitemap, IndexNow, AI-search optimization, monthly content, GA4/GSC reporting, and weekly competitor monitoring — operated end-to-end by Assurgit.",
    services: [
      { name: "Local SEO", slug: "local-seo" },
      { name: "Local SEO audit", slug: "local-seo-audit", isNew: true },
      { name: "30-day local SEO action plan", slug: "30-day-seo-plan", isNew: true },
      { name: "Keyword research", slug: "keyword-research", isNew: true },
      { name: "On-page SEO", slug: "on-page-seo", isNew: true },
      { name: "Schema markup implementation", slug: "schema-markup", isNew: true },
      { name: "AI search optimization", slug: "ai-search-optimization", isNew: true },
      { name: "Core Web Vitals optimization", slug: "core-web-vitals", isNew: true },
      { name: "Google Analytics setup", slug: "google-analytics-setup", isNew: true },
      { name: "Google Search Console setup", slug: "search-console-setup", isNew: true },
      { name: "Bing Webmaster Tools setup", slug: "bing-webmaster-setup", isNew: true },
      { name: "Monthly SEO health report", slug: "monthly-seo-report", isNew: true },
      { name: "Quarterly competitor report", slug: "competitor-report", isNew: true },
      { name: "Conversion rate optimization", slug: "cro", isNew: true },
      { name: "AI citation tracking", slug: "ai-citation-tracking", isNew: true },
    ],
  },
  {
    slug: "marketing-agency",
    name: "Marketing Agency",
    gbpName: "Marketing agency",
    tagline: "Done-for-you GBP, citations, reviews, and content.",
    description:
      "Active Google Business Profile management, citation building across 25+ directories, automated review request flows, and monthly content publishing — for Bay Area service businesses.",
    services: [
      { name: "Google Business Profile setup", slug: "google-business-profile-optimization" },
      { name: "Google Business Profile optimization", slug: "google-business-profile-optimization" },
      { name: "Citation building", slug: "citation-building" },
      { name: "Review request automation", slug: "review-request-automation" },
      { name: "Monthly blog content", slug: "monthly-blog-content", isNew: true },
      { name: "Weekly GBP posts", slug: "weekly-gbp-posts", isNew: true },
      { name: "Review response automation", slug: "review-response", isNew: true },
      { name: "Branded review landing page", slug: "review-landing-page", isNew: true },
    ],
  },
  {
    slug: "seo-agency",
    name: "SEO Agency",
    gbpName: "SEO agency",
    tagline: "Technical + local SEO for Bay Area service businesses.",
    description:
      "Technical SEO audits, schema implementation, Core Web Vitals optimization, and AI-search readiness — bundled with local SEO and content.",
    services: [
      { name: "Technical SEO audit", slug: "technical-seo-audit", isNew: true },
      { name: "Schema markup implementation", slug: "schema-markup", isNew: true },
      { name: "Site speed optimization", slug: "site-speed-optimization", isNew: true },
    ],
  },
  {
    slug: "advertising-agency",
    name: "Advertising Agency",
    gbpName: "Advertising agency",
    tagline: "Conversion-focused landing pages and ad infrastructure.",
    description:
      "Landing page design, A/B testing, conversion tracking, and ad-platform integration — built to make every ad dollar accountable.",
    services: [
      { name: "Landing page design", slug: "landing-page-design", isNew: true },
      { name: "Landing page A/B testing", slug: "ab-testing", isNew: true },
      { name: "Conversion tracking setup", slug: "conversion-tracking", isNew: true },
      { name: "Call tracking setup", slug: "call-tracking", isNew: true },
    ],
  },
];

export function getCategoryBySlug(slug: string): GBPCategory | null {
  return gbpCategories.find((c) => c.slug === slug) ?? null;
}

export function getAllCategorySlugs(): string[] {
  return gbpCategories.map((c) => c.slug);
}

// Aliases used by app/services/page.tsx and app/services/categories/[slug]/page.tsx
export const getAllGBPCategories = (): GBPCategory[] => gbpCategories;
export const getGBPCategoryBySlug = getCategoryBySlug;
export const getAllGBPCategorySlugs = getAllCategorySlugs;
