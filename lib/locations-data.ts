/**
 * ============================================================
 *  ASSURGIT — Location Page Data
 *  Static content for SEO-optimized location landing pages.
 *  Bay Area cities served from San Jose HQ.
 * ============================================================
 */

export interface LocationDetail {
  slug: string;
  city: string;
  state: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: { heading: string; content: string }[];
  neighborhoods: string[];
  nearbyLocations: string[];
  latitude: number;
  longitude: number;
}

export const locationDetails: LocationDetail[] = [
  {
    slug: "san-jose",
    city: "San Jose",
    state: "CA",
    title: "Local SEO & Website Design in San Jose, CA",
    metaDescription:
      "Custom websites, GBP management, and local SEO for San Jose service businesses. Tiers from $189/mo. You own everything we build. (256) 777-6287.",
    h1: "Local SEO & Custom Website Design for San Jose Service Businesses",
    intro:
      "Assurgit is headquartered in San Jose and works with service businesses across the South Bay — handymen, salons, contractors, attorneys, dentists, chiropractors, real estate agents, trainers, therapists, mortgage brokers, CPAs, loan officers, meal-prep services, personal chefs. We build custom-coded websites, optimize Google Business Profiles, build citations across 25+ directories, automate review requests, and publish monthly content — all on three monthly tiers from $189 to $649. You own the website, the domain, the GBP, the content, and the data. Month-to-month after a 3-month initial term.",
    sections: [
      {
        heading: "Why San Jose Service Businesses Choose Assurgit",
        content:
          "San Jose is one of the most competitive local markets in the country — a city of more than a million people, a metro of nearly two million, and a service-business density that rivals San Francisco. Generic Wix or Squarespace sites and generic GBP setups don't compete. Assurgit's program is built specifically for San Jose's competitive intensity: custom-coded websites that load in under one second, schema markup that earns rich-results eligibility, GBP optimization that fills every category and attribute slot, citations across BBB, Yelp, Bing, Apple Maps, Nextdoor, Patch, and the right vertical directories for your industry, and weekly review-request automation wired to your booking platform. We're based in San Jose, we know the neighborhoods, and we've seen what works in this market versus what doesn't.",
      },
      {
        heading: "Neighborhoods and Service Areas We Cover",
        content:
          "We work with San Jose service businesses everywhere in the city — Willow Glen, Rose Garden, Almaden Valley, Cambrian, Evergreen, Silver Creek, Berryessa, Naglee Park, Blossom Valley, Japantown, Downtown, North San Jose, Alum Rock, Communications Hill — plus the surrounding South Bay cities of Santa Clara, Sunnyvale, Cupertino, Campbell, Los Gatos, Saratoga, and Milpitas. If your service area is in or around San Jose, we can help. Geographic coverage mapping is part of every onboarding — we identify the cities and neighborhoods where you have the most demand and build the content and citations to rank in each one.",
      },
      {
        heading: "What Onboarding Looks Like in San Jose",
        content:
          "Most San Jose clients are live with a new Assurgit-built website within 14 to 21 days of signup. Week one we audit your existing online presence — current website (if any), GBP completeness, citation footprint, schema gaps, Core Web Vitals, and competitor benchmarks — and deliver a 30-day local SEO action plan. Week two we ship the website, set up GBP, and submit citations. Week three we wire review automation, install analytics, and verify Search Console. From month two onward we operate the system: weekly GBP posts, monthly content, ongoing citations, monthly reporting, quarterly competitor analysis. Book a free 30-minute consultation at /book or call (256) 777-6287.",
      },
      {
        heading: "Pricing for San Jose Service Businesses",
        content:
          "We offer three monthly tiers. Starter ($189/mo): custom website (5–10 pages), hosting, schema, sitemap, IndexNow, AI-search readiness, booking integration, GA4 + Search Console + Bing Webmaster, daily backups, security, form spam protection. Growth ($297/mo): everything in Starter plus active GBP optimization, citations, review request automation, monthly blog content, monthly SEO reporting, and quarterly competitor analysis. Scale ($649/mo): everything in Growth plus up to 40 pages, weekly content, daily competitor monitoring, conversion rate optimization, AEO, and call tracking. Three-month initial term, month-to-month after. You own everything.",
      },
    ],
    neighborhoods: [
      "Willow Glen",
      "Rose Garden",
      "Almaden Valley",
      "Cambrian",
      "Evergreen",
      "Silver Creek",
      "Berryessa",
      "Downtown San Jose",
      "North San Jose",
      "Japantown",
    ],
    nearbyLocations: ["santa-clara", "sunnyvale", "mountain-view", "palo-alto"],
    latitude: 37.3382,
    longitude: -121.8863,
  },
  {
    slug: "san-francisco",
    city: "San Francisco",
    state: "CA",
    title: "Local SEO & Website Design in San Francisco, CA",
    metaDescription:
      "Custom websites, GBP management, and local SEO for San Francisco service businesses. Tiers from $189/mo. You own everything. (256) 777-6287.",
    h1: "Local SEO & Custom Website Design for San Francisco Service Businesses",
    intro:
      "Assurgit serves service businesses throughout San Francisco — from the Marina to Bernal Heights, the Mission to the Outer Sunset. We build custom-coded websites, optimize Google Business Profiles, build citations across 25+ directories, automate review requests, and publish monthly content. San Francisco is one of the most competitive local markets in the country; generic websites don't rank. Our program is engineered for that competitive intensity — sub-second load times, hand-tuned schema, and continuous content + citation work. Tiers from $189/mo. You own the website, domain, GBP, content, and data.",
    sections: [
      {
        heading: "Why San Francisco Demands a Different Playbook",
        content:
          "San Francisco's local-SEO market is unusually competitive: high density of service businesses, sophisticated customers who actually read reviews and compare websites, and a Google Map Pack that's saturated in nearly every vertical. The agencies winning here aren't running generic templated playbooks — they're customizing for the city. We map demand by neighborhood (Mission queries differ from Marina queries differ from Outer Richmond queries), build content that targets the actual queries San Francisco customers type, and tune schema and Core Web Vitals to earn rich results in a market where Google rewards page-quality more aggressively than in suburban metros.",
      },
      {
        heading: "Neighborhoods We Cover in San Francisco",
        content:
          "We work with service businesses across every San Francisco neighborhood — Marina, Pacific Heights, Russian Hill, Nob Hill, North Beach, Financial District, SoMa, Mission, Castro, Noe Valley, Bernal Heights, Glen Park, Sunset, Richmond, Hayes Valley, Western Addition, Bayview, Excelsior. If your service area is in San Francisco proper, we can help. Geographic coverage mapping is part of onboarding — we identify the neighborhoods where you have the most demand and build the content and citations to rank in each one.",
      },
      {
        heading: "Bay Area Footprint and Why That Matters",
        content:
          "San Francisco service businesses don't only serve San Francisco — many cross the bridges into Oakland, Berkeley, the Peninsula, or Marin. Our content and citation strategy accommodates that. We can build location pages for every relevant city, set up service-area definitions correctly in GBP, and ensure your schema markup reflects your true coverage. The result is visibility for the queries your actual customers are searching, not just the ones in your zip code.",
      },
      {
        heading: "Getting Started in San Francisco",
        content:
          "Book a free 30-minute consultation at /book. We'll review your current online presence, identify gaps, and recommend a tier. Most San Francisco clients are live within 14 to 21 days of signup. Three-month initial term, month-to-month after. Call (256) 777-6287 to talk through your situation.",
      },
    ],
    neighborhoods: [
      "Marina",
      "Pacific Heights",
      "Mission",
      "Castro",
      "Noe Valley",
      "Bernal Heights",
      "Sunset",
      "Richmond",
      "Hayes Valley",
      "SoMa",
    ],
    nearbyLocations: ["oakland", "berkeley", "san-jose", "palo-alto"],
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    slug: "oakland",
    city: "Oakland",
    state: "CA",
    title: "Local SEO & Website Design in Oakland, CA",
    metaDescription:
      "Custom websites, GBP management, and local SEO for Oakland service businesses. Tiers from $189/mo. You own everything we build. (256) 777-6287.",
    h1: "Local SEO & Custom Website Design for Oakland Service Businesses",
    intro:
      "Assurgit works with service businesses across Oakland — from Rockridge to Fruitvale, Temescal to Montclair. We build custom-coded websites, optimize Google Business Profiles, build citations across 25+ directories, automate review requests, and publish monthly content. Oakland's neighborhoods are diverse and the search landscape varies sharply by area; our keyword research and content strategy reflect that. Tiers from $189/mo. You own the website, the domain, the GBP, the content, and the data.",
    sections: [
      {
        heading: "Why Oakland Service Businesses Trust Assurgit",
        content:
          "Oakland is a city of strong neighborhoods and strong local-business loyalty — and a city where Google's local algorithm rewards businesses that show up consistently across the digital ecosystem. Sporadic GBP posts, missing citations, and outdated NAP info don't cut it. Our program covers every layer that influences local rankings: on-page schema, GBP at 100% completion, citations across BBB, Yelp, Bing Places, Apple Maps, Nextdoor (especially Nextdoor for Oakland — the platform skews high in the East Bay), Patch, and 20+ vertical-specific directories. We pair that with weekly review automation and monthly content tuned to Oakland search demand.",
      },
      {
        heading: "Neighborhoods We Cover in Oakland",
        content:
          "We work with service businesses across all of Oakland — Rockridge, Temescal, Piedmont Avenue, Lake Merritt, Grand Lake, Adams Point, Uptown, Downtown, Jack London Square, Chinatown, Fruitvale, Dimond, Glenview, Montclair, Trestle Glen, Crocker Highlands, Lakeshore, San Antonio. If your service area is in Oakland, we can help. We can also extend coverage into Berkeley, Emeryville, Alameda, San Leandro, and Albany if your business serves those areas.",
      },
      {
        heading: "Onboarding Timeline for Oakland Clients",
        content:
          "Most Oakland clients are live with a new Assurgit-built website within 14 to 21 days of signup. Week one is audit and 30-day plan. Week two is website ship plus GBP optimization. Week three is citations, review automation, and analytics verification. From month two onward we operate the system: weekly GBP posts, monthly content, ongoing citation monitoring, monthly reporting, and quarterly competitor analysis. Book a free 30-minute consultation at /book or call (256) 777-6287.",
      },
      {
        heading: "Pricing for Oakland Service Businesses",
        content:
          "Three monthly tiers — Starter ($189), Growth ($297), and Scale ($649). All three include the custom website, hosting, schema, sitemap, AI-search readiness, booking integration, and analytics. Growth and Scale add active GBP optimization, citations, review automation, and monthly content + reporting. Three-month initial term, month-to-month after. No per-lead fees, no hidden charges, you own everything.",
      },
    ],
    neighborhoods: [
      "Rockridge",
      "Temescal",
      "Piedmont Avenue",
      "Lake Merritt",
      "Uptown",
      "Downtown",
      "Fruitvale",
      "Montclair",
      "Glenview",
      "Lakeshore",
    ],
    nearbyLocations: ["berkeley", "san-francisco", "san-jose", "fremont"],
    latitude: 37.8044,
    longitude: -122.2712,
  },
  {
    slug: "palo-alto",
    city: "Palo Alto",
    state: "CA",
    title: "Local SEO & Website Design in Palo Alto, CA",
    metaDescription:
      "Custom websites, GBP management, and local SEO for Palo Alto service businesses. Tiers from $189/mo. You own everything. (256) 777-6287.",
    h1: "Local SEO & Custom Website Design for Palo Alto Service Businesses",
    intro:
      "Assurgit serves Palo Alto service businesses with custom-coded websites, Google Business Profile optimization, citation building, review automation, and monthly content. Palo Alto customers expect fast, polished websites and detailed business information — generic templated sites don't meet the bar. Our program ships custom code, sub-second load times, hand-tuned schema, and ongoing GBP and citation work. Tiers from $189/mo. You own everything.",
    sections: [
      {
        heading: "Why Palo Alto Customers Demand a Better Website",
        content:
          "Palo Alto is one of the most discerning service-business markets in the country. Customers research before they call — they read your website, check your reviews, browse your photos, and compare you to two or three competitors before making a decision. A slow site, broken layout, missing pricing info, or thin content costs you the lead. Our custom-coded sites load in under one second, render correctly on every device, surface all the information Palo Alto customers want to see, and integrate booking, reviews, and tap-to-call directly into the experience.",
      },
      {
        heading: "Neighborhoods We Cover in Palo Alto",
        content:
          "We work with service businesses across all of Palo Alto and the surrounding Peninsula — Old Palo Alto, Crescent Park, Professorville, Downtown, Midtown, College Terrace, Barron Park, Palo Verde, Greenmeadow, Charleston Meadows, Stanford. We also extend into neighboring Menlo Park, Atherton, Mountain View, and Los Altos if your service area covers them. Geographic coverage mapping is part of every onboarding — we identify the cities where you have the most demand and build the content and citations to rank in each one.",
      },
      {
        heading: "What's Included for Palo Alto Service Businesses",
        content:
          "Every tier includes a custom-coded website on Cloudflare, schema markup, sitemap, IndexNow, AI-search readiness, booking integration, GA4, Search Console, Bing Webmaster, daily backups, and form spam protection. Growth ($297/mo) and Scale ($649/mo) add active GBP optimization, citations across 25+ directories, review request automation, monthly blog content, monthly SEO reporting, and quarterly competitor analysis. Scale adds weekly content, daily competitor monitoring, and conversion rate optimization. Three-month initial term, month-to-month after.",
      },
      {
        heading: "Getting Started",
        content:
          "Book a free 30-minute consultation at /book or call (256) 777-6287. We'll audit your current online presence, identify gaps, and recommend a tier. Most Palo Alto clients are live with a new Assurgit-built website within 14 to 21 days of signup.",
      },
    ],
    neighborhoods: [
      "Old Palo Alto",
      "Crescent Park",
      "Professorville",
      "Downtown",
      "Midtown",
      "College Terrace",
      "Barron Park",
      "Palo Verde",
    ],
    nearbyLocations: ["mountain-view", "san-jose", "sunnyvale", "san-francisco"],
    latitude: 37.4419,
    longitude: -122.143,
  },
  {
    slug: "mountain-view",
    city: "Mountain View",
    state: "CA",
    title: "Local SEO & Website Design in Mountain View, CA",
    metaDescription:
      "Custom websites, GBP management, and local SEO for Mountain View service businesses. Tiers from $189/mo. You own everything. (256) 777-6287.",
    h1: "Local SEO & Custom Website Design for Mountain View Service Businesses",
    intro:
      "Assurgit serves Mountain View service businesses with custom-coded websites, Google Business Profile optimization, citations, review automation, and monthly content. Mountain View blends Silicon Valley sophistication with a strong neighborhood feel — Castro Street downtown, the Stevens Creek Trail, family neighborhoods like Cuesta Park and Old Mountain View. Our program is built to compete in this market and serve the businesses that serve it. Tiers from $189/mo. You own everything.",
    sections: [
      {
        heading: "Why Mountain View Service Businesses Choose Assurgit",
        content:
          "Mountain View customers expect a fast, professional website and a fully optimized Google Business Profile — the bar is high and competitors are doing it well. Our custom-coded websites load in under one second on 4G, score 95+ on Core Web Vitals, and ship with hand-tuned schema markup that earns rich-results eligibility on every page. Combined with active GBP management, citations across 25+ directories, and review request automation wired to your booking platform, the result is sustained visibility in the Map Pack and steady organic traffic growth.",
      },
      {
        heading: "Neighborhoods We Cover in Mountain View",
        content:
          "We work with service businesses across all of Mountain View — Old Mountain View, Cuesta Park, Castro Street, Whisman Station, Sylvan Park, Monta Loma, North Whisman, Rex Manor, Waverly Park, Jackson Park, Shoreline West. We also extend into neighboring Los Altos, Palo Alto, Sunnyvale, and Santa Clara. Geographic coverage mapping is part of every onboarding — we identify the cities and neighborhoods where you have the most demand.",
      },
      {
        heading: "Onboarding Timeline",
        content:
          "Most Mountain View clients are live with a new Assurgit-built website within 14 to 21 days of signup. Week one is audit and 30-day local SEO action plan. Week two is website ship plus GBP optimization. Week three is citations, review automation, and analytics verification. From month two onward we operate the system: weekly GBP posts, monthly content, ongoing citations, monthly reporting, and quarterly competitor analysis.",
      },
      {
        heading: "Getting Started in Mountain View",
        content:
          "Book a free 30-minute consultation at /book or call (256) 777-6287. We'll review your current online presence, identify the biggest gaps, and recommend a tier. Three-month initial term, month-to-month after. You own the website, domain, GBP, content, and data.",
      },
    ],
    neighborhoods: [
      "Old Mountain View",
      "Cuesta Park",
      "Castro Street",
      "Whisman Station",
      "Sylvan Park",
      "Monta Loma",
      "Rex Manor",
      "Waverly Park",
    ],
    nearbyLocations: ["palo-alto", "sunnyvale", "san-jose", "san-francisco"],
    latitude: 37.3861,
    longitude: -122.0839,
  },
];

export function getLocationBySlug(slug: string): LocationDetail | null {
  return locationDetails.find((l) => l.slug === slug) ?? null;
}

export function getAllLocationSlugs(): string[] {
  return locationDetails.map((l) => l.slug);
}

export function getAllLocations(): LocationDetail[] {
  return locationDetails;
}
