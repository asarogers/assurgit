/**
 * ============================================================
 *  ASSURGIT — Service Detail Page Data
 *  Static content for SEO-optimized service detail pages.
 *
 *  Assurgit is a done-for-you local presence system for Bay
 *  Area service businesses. Custom websites, GBP optimization,
 *  citations, review automation, monthly content + reporting.
 *  Phone: (256) 777-6287 | assurgit.com | San Jose, CA
 * ============================================================
 */

import { resolveImagePath } from "./image-path";

export function serviceImagePath(slug: string): string {
  return resolveImagePath("services", slug);
}

export interface ServiceDetail {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: { heading: string; content: string }[];
  relatedServices: string[];
  relatedLocations: string[];
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "custom-website-design",
    title: "Custom Website Design for Bay Area Service Businesses",
    metaDescription:
      "Custom-coded websites for Bay Area service businesses. Hosted on Cloudflare. Schema, sitemap, AI-search ready. Tiers from $189/mo. Call (256) 777-6287.",
    h1: "Custom Website Design for Bay Area Service Businesses",
    intro:
      "Most small-business websites are slow, generic templates running on shared hosting that breaks under traffic. Assurgit builds custom-coded websites for Bay Area service businesses — handymen, salons, contractors, attorneys, dentists, chiropractors — on the same enterprise hosting platform that powers Disney+ and Notion. Every site ships with schema markup, sitemaps, IndexNow, AI-search readiness, booking integration, tap-to-call, embedded live map, and a Core Web Vitals guarantee. You own everything we build, including the domain, the source code, the content, and the data.",
    sections: [
      {
        heading: "What's Included in Every Assurgit Website",
        content:
          "Every Assurgit website is custom-coded — not a Wix or Squarespace template. Starter tier covers 5 to 10 pages; Growth covers up to 25; Scale covers up to 40. Every tier includes Google Analytics, Search Console, Bing Webmaster Tools, schema markup, sitemap and IndexNow integration, AI-search optimization, booking platform integration with Booksy, Square, Cal.com, Vagaro, or GlossGenius, a tap-to-call mobile button, an embedded live map, a live Google review widget, a Core Web Vitals guarantee, custom email aliases through Cloudflare, daily backups, security maintenance, and form spam protection. We migrate your existing site if you have one — URLs are preserved and 301 redirects set up so SEO equity carries over.",
      },
      {
        heading: "Why Custom Code Beats Page Builders for Local SEO",
        content:
          "Page builders like Wix, Squarespace, and most WordPress themes ship with bloated CSS, render-blocking scripts, and unpredictable HTML structure. That hurts Core Web Vitals scores — and Google uses those scores as a ranking signal in mobile search. Custom-coded sites give us control over every byte: the hero image is webp, the layout is CSS grid, the JavaScript is tree-shaken, and the schema is hand-tuned to match your exact GBP categories. The result is a site that loads in under one second on 4G and earns rich-results eligibility on every page.",
      },
      {
        heading: "What You Own at the End",
        content:
          "You own the domain, the website source code (we'll hand over the GitHub repo), the GBP, the content, and the data. There's no proprietary lock-in, no per-lead fees, and no contract beyond the 3-month initial term. Month-to-month after that. If you ever leave Assurgit, you walk away with everything — the website keeps running on your domain, the GBP stays under your account, and you can hire any developer to maintain the codebase.",
      },
      {
        heading: "How to Get Started",
        content:
          "Book a free 30-minute consultation at /book. We'll review your current online presence, identify the biggest gaps, and recommend a tier. Most Bay Area service businesses are live with a new Assurgit-built website within 14 to 21 days of signup, including content migration from any legacy site, schema setup, and Search Console verification. Call (256) 777-6287 or book online to start.",
      },
    ],
    relatedServices: [
      "local-seo",
      "google-business-profile-optimization",
      "review-request-automation",
      "citation-building",
    ],
    relatedLocations: ["san-jose", "san-francisco", "oakland", "palo-alto"],
  },
  {
    slug: "local-seo",
    title: "Local SEO for Bay Area Service Businesses",
    metaDescription:
      "Bay Area local SEO for service businesses. Schema, citations, GBP, reviews, content, monthly reporting. Tiers from $189/mo. (256) 777-6287.",
    h1: "Local SEO for Bay Area Service Businesses",
    intro:
      "Local SEO is the difference between showing up in the Google Map Pack when someone in Oakland searches for your service and being invisible. Assurgit's local SEO program covers every layer that influences local rankings: on-page optimization, schema markup, Google Business Profile management, citation building across 25+ directories, review request automation, monthly content publishing, and weekly competitor monitoring. Every Bay Area client gets a 30-day local SEO action plan in week one.",
    sections: [
      {
        heading: "What Local SEO Actually Includes",
        content:
          "Our local SEO service starts with a full audit — schema gaps, NAP inconsistencies, missing GBP services, slow Core Web Vitals, weak citation footprint, and competitor benchmarks. From that audit we build a 30-day action plan with specific deliverables. We then execute: schema markup on every service page, sitemap and IndexNow submission, GBP services and attributes brought to 100% completion, citations submitted to BBB, Yelp, Bing Places, Apple Maps, Nextdoor, Patch, and 20+ vertical-specific directories, review request automation wired to your booking platform, monthly blog content targeting striking-distance keywords, and a monthly health report you actually read.",
      },
      {
        heading: "Why Bay Area Local Markets Are Different",
        content:
          "The Bay Area has more than 7 million people spread across 9 counties, and search intent shifts dramatically by neighborhood. A handyman in Oakland competes against different operators than one in Palo Alto, even if they're 20 miles apart. Our keyword research is geographic — we map demand by city and neighborhood, score competitors per market, and build content that targets the actual queries Bay Area customers type. Our striking-distance keyword reports identify queries where you're ranked positions 5–20 and flag the smallest content/link tweaks to push them onto page one.",
      },
      {
        heading: "Reporting That Means Something",
        content:
          "Most agencies send dashboard screenshots that nobody reads. Our monthly SEO report is a written synthesis: what changed in your market, what we shipped, what moved, and what we're doing next. It includes ranking changes for your top 25 keywords, GBP insights pulled from the API, citations added or fixed, reviews captured, traffic from GA4, and conversions from your CRM if it's integrated. Quarterly we add a competitor report — 40+ data points per competitor, daily monitoring across multiple platforms.",
      },
      {
        heading: "Pricing and What to Expect Month One",
        content:
          "Local SEO is included in Growth ($297/mo) and Scale ($649/mo) tiers. Most Bay Area clients see improved GBP visibility in 4–6 weeks and meaningful organic traffic gains in 3–4 months. The 3-month initial term gives us enough runway to ship the foundational work; after that, month-to-month. Book a consult at /book or call (256) 777-6287.",
      },
    ],
    relatedServices: [
      "google-business-profile-optimization",
      "citation-building",
      "review-request-automation",
      "custom-website-design",
    ],
    relatedLocations: ["san-jose", "san-francisco", "oakland", "mountain-view"],
  },
  {
    slug: "google-business-profile-optimization",
    title: "Google Business Profile Optimization in the Bay Area",
    metaDescription:
      "Done-for-you Google Business Profile setup, optimization, and posting for Bay Area service businesses. Categories, services, photos, posts. (256) 777-6287.",
    h1: "Google Business Profile Optimization in the Bay Area",
    intro:
      "Your Google Business Profile is the single biggest local-SEO asset you own — and most are 30% complete, with the wrong primary category, no services listed, and no posts in the last six months. Assurgit fixes that. We audit, optimize, and operate your GBP every month: category and services tuning, photo refreshes, weekly posts, Q&A seeding, attribute completion, review responses, and insights monitoring. The GBP is yours; we just keep it running at 100%.",
    sections: [
      {
        heading: "GBP Setup From Zero (or Cleanup From a Mess)",
        content:
          "If you don't have a GBP yet, we set one up — registration, verification (postcard, video, or live), category selection, service-area definition, and full attribute completion. If you already have one but it's incomplete or unverified, we audit it: primary category against the GBP taxonomy, additional categories filled to the 9-category limit, every service from your catalog listed with descriptions and pricing where appropriate, hours of operation, attributes (wheelchair-accessible, free Wi-Fi, etc.), photos in every required slot (logo, cover, exterior, interior, team, work samples), and Q&A seeded with questions customers actually ask.",
      },
      {
        heading: "Ongoing Posting and Engagement",
        content:
          "On Growth and Scale tiers we post weekly — offers, events, updates, products, or services — using imagery generated specifically for your business. We monitor and respond to reviews within 24 hours, including thoughtful responses to negative ones that turn customer-service moments into trust signals for future searchers. We answer Google Q&A as they come in. And we monitor GBP Insights monthly: search queries, customer actions, photo views, direction requests, and call clicks.",
      },
      {
        heading: "Why GBP Optimization Beats Paid Ads for Local",
        content:
          "Local Service Ads and Google Ads work, but they're a tax — every click costs you, every month, forever. A fully optimized GBP appears in the Map Pack organically, drives free clicks, calls, and direction requests, and compounds over time as you accumulate reviews and posts. Most of our clients see GBP-driven calls and direction requests double in the first 60 days after we take over the profile.",
      },
      {
        heading: "How to Get Started",
        content:
          "GBP optimization is included in Growth and Scale tiers. Book a free consult at /book to see your current GBP audit, what's missing, and what we'd ship in week one. Or call (256) 777-6287 directly.",
      },
    ],
    relatedServices: [
      "local-seo",
      "review-request-automation",
      "citation-building",
      "custom-website-design",
    ],
    relatedLocations: ["san-jose", "san-francisco", "oakland", "sunnyvale"],
  },
  {
    slug: "citation-building",
    title: "Citation Building for Bay Area Local SEO",
    metaDescription:
      "Done-for-you citation building across 25+ directories — BBB, Yelp, Bing, Apple Maps, Nextdoor, Patch, vertical sites. Bay Area service businesses. (256) 777-6287.",
    h1: "Citation Building for Bay Area Service Businesses",
    intro:
      "Citations are mentions of your business name, address, and phone number on third-party directories — and consistent citations across the right directories are still one of the strongest signals Google uses to verify a business's legitimacy. Assurgit builds and cleans up citations across 25+ directories tailored to your vertical. We don't just submit and forget; we audit existing listings, fix NAP inconsistencies, and add structured data where the directory supports it.",
    sections: [
      {
        heading: "The 25+ Directories We Cover",
        content:
          "Tier-0 universal directories: Google Business Profile, Bing Places, Apple Maps, Yelp, Facebook, Better Business Bureau, Yellow Pages, Mapquest, Foursquare. Tier-1 hyperlocal: Nextdoor (with category-correct service tags), Patch.com, Alignable, Manta. Vertical-specific: HomeAdvisor and Angi for home services, Avvo and Justia for attorneys, Healthgrades and Vitals for medical, Zillow and Realtor.com for real estate, The Knot and WeddingWire for wedding pros. We pick the right 25 for your specific GBP categories.",
      },
      {
        heading: "Why NAP Consistency Matters More Than Volume",
        content:
          "Google cross-references your business across the web. If your phone number is (256) 777-6287 on your website but (256) 777-6288 on an old Yellow Pages listing from 2018, that's a trust gap. We audit every existing mention, fix or claim each one, and ensure your NAP — name, address, phone — matches exactly across every directory. We also fix or remove duplicate listings, which actively hurt rankings.",
      },
      {
        heading: "How Citations Compound Over Time",
        content:
          "Citation work is front-loaded but compounds. Most submissions are live within 2–6 weeks; the long-tail of vertical directories continues for 60–90 days. After the initial buildout, we monitor monthly for new directories worth claiming, broken listings to fix, and competitor citation gaps to close. The citation footprint is one of the slowest-changing local SEO signals — once it's right, it stays right.",
      },
      {
        heading: "Pricing",
        content:
          "Citation building is included in Growth ($297/mo) and Scale ($649/mo). One-time citation cleanup for Starter clients is available at $499 flat. Book a consult at /book or call (256) 777-6287.",
      },
    ],
    relatedServices: [
      "local-seo",
      "google-business-profile-optimization",
      "custom-website-design",
      "review-request-automation",
    ],
    relatedLocations: ["san-jose", "san-francisco", "oakland", "fremont"],
  },
  {
    slug: "review-request-automation",
    title: "Review Request Automation for Bay Area Service Businesses",
    metaDescription:
      "Automated Google review requests after every job. SMS + email, branded landing page, response automation. Bay Area service businesses. (256) 777-6287.",
    h1: "Review Request Automation for Bay Area Service Businesses",
    intro:
      "Reviews are the second-strongest local-SEO signal after proximity, and they double as social proof on every page of your website. Assurgit wires review request automation directly to your booking platform or CRM — every completed job triggers a templated SMS and email asking for a Google review, with a one-click branded landing page that nudges happy customers to Google and unhappy customers to a private feedback form. Average review velocity for new Assurgit clients triples within 60 days.",
    sections: [
      {
        heading: "How the Automation Works",
        content:
          "We integrate with Booksy, Square, Cal.com, Vagaro, GlossGenius, Jobber, Housecall Pro, ServiceTitan, Clio Grow, Pipedrive, GoHighLevel, and HubSpot — whichever platform you use. When a job is marked complete, the customer receives an SMS within 2 hours and an email within 24 hours, both linking to a branded review landing page that asks 'How did we do?'. 4-5 stars routes them to your Google review form with the rating pre-filled. 1-3 stars routes them to a private feedback form that emails you directly so you can fix issues before they become public reviews.",
      },
      {
        heading: "Response Automation",
        content:
          "Every review — positive or negative — gets a thoughtful response within 24 hours. Positive reviews get personalized thank-yous that name-check the service performed and the staff member involved. Negative reviews get a structured de-escalation response that acknowledges the issue, takes responsibility, and moves the conversation offline. This response cadence is one of the most underrated GBP ranking factors.",
      },
      {
        heading: "Why Review Velocity Matters More Than Total Count",
        content:
          "Google's local algorithm weights recency. A business with 50 reviews where the last one was 18 months ago ranks below a business with 30 reviews where the last 5 are from this month. Our automation ensures consistent monthly review flow — typically 5 to 25 new reviews per month for active Bay Area service businesses, depending on volume. The result is sustained Map Pack visibility instead of a one-time spike.",
      },
      {
        heading: "Pricing and Setup",
        content:
          "Review request automation is included in Growth ($297/mo) and Scale ($649/mo). Setup takes 3–5 days once we have CRM access. Book a consult at /book or call (256) 777-6287.",
      },
    ],
    relatedServices: [
      "google-business-profile-optimization",
      "local-seo",
      "custom-website-design",
      "citation-building",
    ],
    relatedLocations: ["san-jose", "san-francisco", "oakland", "berkeley"],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | null {
  return serviceDetails.find((s) => s.slug === slug) ?? null;
}

export function getAllServiceSlugs(): string[] {
  return serviceDetails.map((s) => s.slug);
}

export function getAllServices(): ServiceDetail[] {
  return serviceDetails;
}
