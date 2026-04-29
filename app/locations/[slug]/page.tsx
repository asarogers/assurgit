import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import { siteConfig } from "@/lib/siteConfig";
import {
  getLocationBySlug,
  getAllLocationSlugs,
  getAllLocations,
} from "@/lib/locations-data";
import { getAllServices } from "@/lib/services-data";
import { getAllPosts } from "@/lib/blog";
import { LOCATION_FAQS, resolveFAQ } from "@/lib/common-faqs";
import { locationEnrichments } from "@/lib/locations-enrichment";
import { loadSitePlan, noindexSlugs } from "@/lib/site-plan";
import LocationHeroImage from "./LocationHeroImage";

/** Slugs the SEO pipeline marked exclude/orphan — emit noindex per page. */
const NOINDEX_SLUGS = noindexSlugs(loadSitePlan());

/* ============================================================
   STATIC PARAMS — pre-render every location page
   ============================================================ */
export function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ slug }));
}

/* ============================================================
   SEO METADATA
   ============================================================ */
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  const isNoindex = NOINDEX_SLUGS.has(slug);

  return {
    title: location.title,
    description: location.metaDescription,
    alternates: { canonical: `/locations/${slug}` },
    ...(isNoindex
      ? { robots: { index: false, follow: true, googleBot: { index: false, follow: true } } }
      : {}),
    openGraph: {
      title: location.title,
      description: location.metaDescription,
      url: `${siteConfig.url}/locations/${location.slug}`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "https://wellpreppedlife.com/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${location.title} | ${siteConfig.name}`,
        },
      ],
    },
  };
}

/* ============================================================
   PAGE COMPONENT
   ============================================================ */
export default async function LocationPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  /* Resolve nearby location slugs to full objects for display */
  const allLocations = getAllLocations();
  const nearbyLocationDetails = allLocations.filter((l) =>
    location.nearbyLocations.includes(l.slug)
  );

  /* Schema.org JSON-LD for this location */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${siteConfig.name} — ${location.city}`,
    description: location.metaDescription,
    telephone: siteConfig.phone.schema,
    url: `${siteConfig.url}/locations/${location.slug}`,
    image: `${siteConfig.url}/opengraph-image.png`,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/icon.svg`,
      width: 512,
      height: 512,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressRegion: location.state,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    },
    areaServed: [
      {
        "@type": "City",
        name: `${location.city}, ${location.state}`,
      },
      ...nearbyLocationDetails.map((loc) => ({
        "@type": "City",
        name: `${loc.city}, ${loc.state}`,
      })),
    ],
    serviceType: [
      "Personal Chef for Seniors",
      "Meal Prep for Seniors",
      "Diabetic Meal Prep",
      "Kitchen Optimization",
    ],
    priceRange: "$$",
    openingHours: ["Mo-Fr 08:00-18:00"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "14",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.tiktok,
      siteConfig.social.linkedin,
    ],
  };

  /* BreadcrumbList JSON-LD */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${siteConfig.url}/locations/${location.slug}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${siteConfig.url}/locations` },
      { "@type": "ListItem", position: 3, name: `${location.city}, ${location.state}`, item: `${siteConfig.url}/locations/${location.slug}` },
    ],
  };

  /* WebPage JSON-LD */
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/locations/${location.slug}`,
    url: `${siteConfig.url}/locations/${location.slug}`,
    name: location.title,
    description: location.metaDescription,
    isPartOf: { "@id": "https://wellpreppedlife.com/#website" },
    breadcrumb: { "@id": `${siteConfig.url}/locations/${location.slug}#breadcrumb` },
    about: { "@id": "https://wellpreppedlife.com/#business" },
  };

  /* FAQPage JSON-LD — generated from sections whose headings are questions */
  const questionWords = /^(What|How|Why|Who|When|Can|Is|Are|Do|Does|Will|Should)\b/i;
  const faqSections = location.sections.filter((s) => questionWords.test(s.heading.trim()));
  const faqSchema = faqSections.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqSections.map((s) => ({
          "@type": "Question",
          name: s.heading.trim().endsWith("?") ? s.heading.trim() : `${s.heading.trim()}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: s.content.slice(0, 500),
          },
        })),
      }
    : null;

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* ── Hero Image ──────────────────────────────────────── */}
      <div className="w-full overflow-hidden" style={{ maxHeight: '320px' }}>
        <LocationHeroImage
          slug={location.slug}
          alt={`${siteConfig.name} serving ${location.city}, ${location.state}`}
        />
      </div>

      {/* ── Hero / Intro ─────────────────────────────────────── */}
      <section
        className="bg-[#6B8F71] section-pad"
        aria-labelledby="location-hero-heading"
      >
        <div className="container-xl max-w-3xl text-center">
          <p className="font-[family-name:var(--font-sans)] text-[#E8F0E9] font-semibold text-sm uppercase tracking-widest mb-4">
            {siteConfig.name} &mdash; {location.city}, {location.state}
          </p>
          <h1
            id="location-hero-heading"
            className="font-[family-name:var(--font-serif)] text-[clamp(1.75rem,4vw+0.5rem,3.25rem)] font-bold text-white leading-tight mb-6"
          >
            {location.h1}
          </h1>
          <p className="font-[family-name:var(--font-sans)] text-[#E8F0E9] text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">
            {location.intro}
          </p>
        </div>
      </section>

      {/* ── Content Sections ─────────────────────────────────── */}
      {location.sections.map((section, idx) => {
        const isAlt = idx % 2 === 1;
        return (
          <>
            <section
              key={idx}
              className={`${isAlt ? "bg-[#E8F0E9]" : "bg-[#FAF7F2]"} section-pad`}
              aria-labelledby={`loc-section-${idx}-heading`}
            >
              <div className="container-xl max-w-3xl">
                <div className="sage-divider mb-6" />
                <h2
                  id={`loc-section-${idx}-heading`}
                  className="section-heading mb-5"
                >
                  {section.heading}
                </h2>
                <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-lg leading-[1.85]">
                  {section.content}
                </p>
              </div>
            </section>

            {idx === 1 && (
              <section
                key="mid-cta"
                className="bg-[#6B8F71] section-pad"
                aria-label={`Book a free kitchen assessment in ${location.city}`}
              >
                <div className="container-xl max-w-3xl">
                  <p className="font-[family-name:var(--font-sans)] text-[#E8F0E9] font-semibold text-sm uppercase tracking-widest mb-3">
                    Free Assessment &mdash; No Obligation
                  </p>
                  <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.4rem,3vw+0.5rem,2.25rem)] font-bold text-white leading-tight mb-4">
                    Book Your Free Kitchen Assessment in {location.city}
                  </h2>
                  <p className="font-[family-name:var(--font-sans)] text-[#E8F0E9] text-base sm:text-lg mb-6">
                    Call {siteConfig.phone.display} or schedule online &mdash; no obligation, no pressure.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/book"
                      className="font-[family-name:var(--font-sans)] font-bold text-sm sm:text-base bg-white text-[#6B8F71] hover:bg-[#FAF7F2] px-6 py-3 rounded-full transition-colors"
                    >
                      Book Online &rarr;
                    </Link>
                    <a
                      href={`tel:${siteConfig.phone.schema}`}
                      className="font-[family-name:var(--font-sans)] font-bold text-sm sm:text-base border-2 border-white text-white hover:bg-white hover:text-[#6B8F71] px-6 py-3 rounded-full transition-colors"
                    >
                      {siteConfig.phone.display}
                    </a>
                  </div>
                </div>
              </section>
            )}
          </>
        );
      })}

      {/* ── Local Senior Resources ───────────────────────────── */}
      {locationEnrichments[location.slug] && (() => {
        const enrichment = locationEnrichments[location.slug];
        return (
          <section
            className="bg-[#FAF7F2] section-pad"
            aria-labelledby="senior-resources-heading"
          >
            <div className="container-xl max-w-3xl">
              <div className="sage-divider mb-6" />
              <h2 id="senior-resources-heading" className="section-heading mb-5">
                Senior Resources Near You in {location.city}
              </h2>
              <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-lg leading-[1.85] mb-8">
                {enrichment.localParagraph}
              </p>

              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-[family-name:var(--font-serif)] text-lg font-bold text-[#2C2C2C] mb-3">
                    Nearby Hospitals
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {enrichment.hospitals.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center bg-[#E8F0E9] text-[#4A6B50] text-sm font-semibold font-[family-name:var(--font-sans)] px-3 py-1.5 rounded-full"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-[family-name:var(--font-serif)] text-lg font-bold text-[#2C2C2C] mb-3">
                    Senior Centers
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {enrichment.seniorCenters.map((sc) => (
                      <span
                        key={sc}
                        className="inline-flex items-center bg-[#E8F0E9] text-[#4A6B50] text-sm font-semibold font-[family-name:var(--font-sans)] px-3 py-1.5 rounded-full"
                      >
                        {sc}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-[family-name:var(--font-serif)] text-lg font-bold text-[#2C2C2C] mb-3">
                    Local Landmarks
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {enrichment.landmarks.map((lm) => (
                      <span
                        key={lm}
                        className="inline-flex items-center bg-[#E8F0E9] text-[#4A6B50] text-sm font-semibold font-[family-name:var(--font-sans)] px-3 py-1.5 rounded-full"
                      >
                        {lm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── Neighborhoods & Nearby Areas ─────────────────────── */}
      <section
        className="bg-[#FAF7F2] section-pad"
        aria-labelledby="neighborhoods-heading"
      >
        <div className="container-xl max-w-3xl">
          <div className="sage-divider mb-6" />
          <h2 id="neighborhoods-heading" className="section-heading mb-8">
            Neighborhoods &amp; Nearby Areas
          </h2>

          <div>
            <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold text-[#2C2C2C] mb-4">
              {location.city} Neighborhoods
            </h3>
            <div className="flex flex-wrap gap-2">
              {location.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="inline-flex items-center bg-[#E8F0E9] text-[#4A6B50] text-sm font-semibold font-[family-name:var(--font-sans)] px-3 py-1.5 rounded-full"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Services ─────────────────────────────────────── */}
      <section
        className="bg-[#E8F0E9] section-pad"
        aria-labelledby="loc-services-heading"
      >
        <div className="container-xl max-w-3xl">
          <div className="sage-divider mb-6" />
          <h2 id="loc-services-heading" className="section-heading mb-8">
            Services Available in {location.city}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {(() => {
              const allServices = getAllServices();
              /* Build keyword set from location content for relevance matching */
              const locationText = [
                location.h1,
                location.intro,
                ...location.sections.map((s) => `${s.heading} ${s.content}`),
              ]
                .join(" ")
                .toLowerCase();

              /* Score each service by how many words from its title appear in location text */
              const scored = allServices.map((svc) => {
                const words = svc.title
                  .toLowerCase()
                  .split(/\s+/)
                  .filter((w) => w.length > 3);
                const score = words.filter((w) => locationText.includes(w)).length;
                return { svc, score };
              });

              /* Sort by score descending, then take first 6 */
              scored.sort((a, b) => b.score - a.score);
              return scored.slice(0, 6).map(({ svc }) => svc);
            })().map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col"
              >
                <h3 className="font-[family-name:var(--font-serif)] text-[1.1rem] font-bold text-[#2C2C2C] mb-2">
                  {svc.title}
                </h3>
                <span className="font-[family-name:var(--font-sans)] font-bold text-[#C4622D] hover:text-[#A34F23] text-sm mt-auto">
                  Learn More &rarr;
                </span>
              </Link>
            ))}
          </div>

          {/* Link to main services page */}
          <div className="mt-8">
            <Link
              href="/services"
              className="font-[family-name:var(--font-sans)] font-bold text-[#6B8F71] hover:text-[#4A6B50] text-base underline underline-offset-4 decoration-[#6B8F71]/40 hover:decoration-[#4A6B50] transition-colors"
            >
              View All Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related Articles ─────────────────────────────────── */}
      {(() => {
        const allPosts = getAllPosts();
        const cityLower = location.city.toLowerCase();

        /* Prioritize posts mentioning the city name, fall back to most recent */
        const cityPosts = allPosts.filter(
          (p) =>
            p.title.toLowerCase().includes(cityLower) ||
            p.excerpt.toLowerCase().includes(cityLower)
        );
        const remaining = allPosts.filter(
          (p) =>
            !p.title.toLowerCase().includes(cityLower) &&
            !p.excerpt.toLowerCase().includes(cityLower)
        );
        const displayPosts = [...cityPosts, ...remaining].slice(0, 3);

        if (displayPosts.length === 0) return null;

        return (
          <section
            className="bg-white section-pad"
            aria-labelledby="related-articles-heading"
          >
            <div className="container-xl max-w-3xl">
              <div className="sage-divider mb-6" />
              <h2 id="related-articles-heading" className="section-heading mb-8">
                Related Articles
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {displayPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="bg-[#FAF7F2] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col"
                  >
                    <h3 className="font-[family-name:var(--font-serif)] text-[1.1rem] font-bold text-[#2C2C2C] mb-2">
                      {post.title}
                    </h3>
                    <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-sm leading-relaxed mb-3 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-xs mt-auto">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/blog"
                  className="font-[family-name:var(--font-sans)] font-bold text-[#6B8F71] hover:text-[#4A6B50] text-base underline underline-offset-4 decoration-[#6B8F71]/40 hover:decoration-[#4A6B50] transition-colors"
                >
                  Read All Articles &rarr;
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── Other Locations ──────────────────────────────────── */}
      <section
        className="bg-[#FAF7F2] section-pad"
        aria-labelledby="other-locations-heading"
      >
        <div className="container-xl max-w-3xl">
          <div className="sage-divider mb-6" />
          <h2 id="other-locations-heading" className="section-heading mb-8">
            Other Locations We Serve
          </h2>

          <div className="flex flex-wrap gap-3">
            {nearbyLocationDetails.map((rl) => (
              <Link
                key={rl.slug}
                href={`/locations/${rl.slug}`}
                className="font-[family-name:var(--font-sans)] font-semibold text-sm px-4 py-2.5 rounded-full border-2 border-[#6B8F71] text-[#6B8F71] hover:bg-[#6B8F71] hover:text-white transition-colors"
              >
                {rl.city}
              </Link>
            ))}
          </div>

          {/* Extra nav links */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/locations"
              className="font-[family-name:var(--font-sans)] font-bold text-[#6B8F71] hover:text-[#4A6B50] text-base underline underline-offset-4 decoration-[#6B8F71]/40 hover:decoration-[#4A6B50] transition-colors"
            >
              View All Locations &rarr;
            </Link>
            <Link
              href="/blog"
              className="font-[family-name:var(--font-sans)] font-bold text-[#C4622D] hover:text-[#A34F23] text-base transition-colors"
            >
              Read Our Blog &rarr;
            </Link>
            <Link
              href="/book"
              className="font-[family-name:var(--font-sans)] font-bold text-[#C4622D] hover:text-[#A34F23] text-base transition-colors"
            >
              Book Your Free Kitchen Assessment &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <FAQSection
        faqs={LOCATION_FAQS.map((f) => resolveFAQ(f, { city: location.city }))}
        headingId={`faq-${location.slug}`}
      />

      {/* ── Final CTA ────────────────────────────────────────── */}
      <CTABlock
        headline={`Ready to Get Started in ${location.city}?`}
        subtext={`Book your free Kitchen & Nutrition Assessment today. We serve seniors throughout ${location.city} and surrounding areas. Call us at ${siteConfig.phone.display} or schedule online \u2014 no pressure, no obligation.`}
        showPhone={true}
        headingId="location-cta"
      />
    </>
  );
}
