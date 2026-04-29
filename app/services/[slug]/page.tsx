import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import { siteConfig } from "@/lib/siteConfig";
import {
  getServiceBySlug,
  getAllServiceSlugs,
  serviceImagePath,
} from "@/lib/services-data";
import { getLocationBySlug } from "@/lib/locations-data";
import { SERVICE_FAQS } from "@/lib/common-faqs";
import { getServiceFAQs } from "@/lib/service-faqs";
import { loadSitePlan, noindexSlugs } from "@/lib/site-plan";

/** Slugs the SEO pipeline marked exclude/orphan — emit noindex per page. */
const NOINDEX_SLUGS = noindexSlugs(loadSitePlan());

/** Convert a slug like "san-jose" to a label like "San Jose". */
function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ============================================================
   STATIC PARAMS — pre-render every service detail page
   ============================================================ */
export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

/* ============================================================
   SEO METADATA
   ============================================================ */
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const isNoindex = NOINDEX_SLUGS.has(slug);

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    // Pages in plan.exclude / plan.orphans get noindex — Google won't waste
    // crawl budget on them while we focus on target_now pages.
    ...(isNoindex
      ? { robots: { index: false, follow: true, googleBot: { index: false, follow: true } } }
      : {}),
    openGraph: {
      title: service.title,
      description: service.metaDescription,
      url: `${siteConfig.url}/services/${service.slug}`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "https://wellpreppedlife.com/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${service.title} | ${siteConfig.name}`,
        },
      ],
    },
  };
}

/* ============================================================
   PAGE COMPONENT
   ============================================================ */
export default async function ServiceDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  /* Build labels for related services and locations */
  const relatedServiceItems = service.relatedServices.map((rs) => {
    const related = getServiceBySlug(rs);
    return { slug: rs, label: related?.h1 ?? slugToLabel(rs) };
  });

  const relatedLocationItems = service.relatedLocations.map((rl) => {
    const related = getLocationBySlug(rl);
    return { slug: rl, label: related?.city ?? slugToLabel(rl) };
  });

  /* Schema.org JSON-LD for the service */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1,
    description: service.metaDescription,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phone.schema,
      url: siteConfig.url,
      areaServed: relatedLocationItems.map((loc) => ({
        "@type": "City",
        name: `${loc.label}, CA`,
      })),
    },
    areaServed: relatedLocationItems.map((loc) => ({
      "@type": "City",
      name: `${loc.label}, CA`,
    })),
    url: `${siteConfig.url}/services/${service.slug}`,
  };

  /* FAQPage JSON-LD — generated from sections whose headings are questions */
  const questionWords = /^(What|How|Why|Who|When|Can|Is|Are|Do|Does|Will|Should)\b/i;
  const faqSections = service.sections.filter((s) => questionWords.test(s.heading.trim()));
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

  /* BreadcrumbList JSON-LD */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${siteConfig.url}/services/${service.slug}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
      { "@type": "ListItem", position: 3, name: service.h1, item: `${siteConfig.url}/services/${service.slug}` },
    ],
  };

  /* WebPage JSON-LD */
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/services/${service.slug}`,
    url: `${siteConfig.url}/services/${service.slug}`,
    name: service.title,
    description: service.metaDescription,
    isPartOf: { "@id": "https://wellpreppedlife.com/#website" },
    breadcrumb: { "@id": `${siteConfig.url}/services/${service.slug}#breadcrumb` },
    about: { "@id": "https://wellpreppedlife.com/#business" },
  };

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={serviceImagePath(service.slug)}
          alt={service.h1}
          width={1200}
          height={560}
          className="w-full h-auto object-cover" loading="lazy" />
      </div>

      {/* ── Hero / Intro ─────────────────────────────────────── */}
      <section
        className="bg-[#6B8F71] section-pad"
        aria-labelledby="service-hero-heading"
      >
        <div className="container-xl max-w-3xl text-center">
          <p className="font-[family-name:var(--font-sans)] text-[#E8F0E9] font-semibold text-sm uppercase tracking-widest mb-4">
            {siteConfig.name} &mdash; Service
          </p>
          <h1
            id="service-hero-heading"
            className="font-[family-name:var(--font-serif)] text-[clamp(1.75rem,4vw+0.5rem,3.25rem)] font-bold text-white leading-tight mb-6"
          >
            {service.h1}
          </h1>
          <p className="font-[family-name:var(--font-sans)] text-[#E8F0E9] text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">
            {service.intro}
          </p>
        </div>
      </section>

      {/* ── Content Sections ─────────────────────────────────── */}
      {service.sections.map((section, idx) => {
        const isAlt = idx % 2 === 1;
        return (
          <section
            key={idx}
            className={`${isAlt ? "bg-[#E8F0E9]" : "bg-[#FAF7F2]"} section-pad`}
            aria-labelledby={`section-${idx}-heading`}
          >
            <div className="container-xl max-w-3xl">
              <div className="sage-divider mb-6" />
              <h2
                id={`section-${idx}-heading`}
                className="section-heading mb-5"
              >
                {section.heading}
              </h2>
              <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-lg leading-[1.85]">
                {section.content}
              </p>
            </div>
          </section>
        );
      })}

      {/* ── Related Links ────────────────────────────────────── */}
      <section
        className="bg-[#E8F0E9] section-pad"
        aria-labelledby="related-heading"
      >
        <div className="container-xl max-w-3xl">
          <div className="sage-divider mb-6" />
          <h2 id="related-heading" className="section-heading mb-8">
            Explore More
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Related Services */}
            <div>
              <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold text-[#2C2C2C] mb-4">
                Related Services
              </h3>
              <ul className="space-y-3">
                {relatedServiceItems.map((rs) => (
                  <li key={rs.slug}>
                    <Link
                      href={`/services/${rs.slug}`}
                      className="font-[family-name:var(--font-sans)] font-bold text-[#C4622D] hover:text-[#A34F23] text-base transition-colors"
                    >
                      {rs.label} &rarr;
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/services"
                    className="font-[family-name:var(--font-sans)] font-bold text-[#6B8F71] hover:text-[#4A6B50] text-base transition-colors"
                  >
                    View All Services &rarr;
                  </Link>
                </li>
              </ul>
            </div>

            {/* Service Locations */}
            <div>
              <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold text-[#2C2C2C] mb-4">
                Service Locations
              </h3>
              <ul className="space-y-3">
                {relatedLocationItems.map((rl) => (
                  <li key={rl.slug}>
                    <Link
                      href={`/locations/${rl.slug}`}
                      className="font-[family-name:var(--font-sans)] font-bold text-[#C4622D] hover:text-[#A34F23] text-base transition-colors"
                    >
                      {rl.label} &rarr;
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Extra nav links */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="font-[family-name:var(--font-sans)] font-semibold text-sm px-4 py-2.5 rounded-full border-2 border-[#6B8F71] text-[#6B8F71] hover:bg-[#6B8F71] hover:text-white transition-colors"
            >
              Read Our Blog
            </Link>
            <Link
              href="/book"
              className="font-[family-name:var(--font-sans)] font-semibold text-sm px-4 py-2.5 rounded-full border-2 border-[#6B8F71] text-[#6B8F71] hover:bg-[#6B8F71] hover:text-white transition-colors"
            >
              Book Your Free Kitchen Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <FAQSection
        faqs={getServiceFAQs(service.slug) ?? SERVICE_FAQS}
        headingId={`faq-${service.slug}`}
      />

      {/* ── Final CTA ────────────────────────────────────────── */}
      <CTABlock
        headline="Ready to Get Started?"
        subtext={`Book your free Kitchen & Nutrition Assessment today. We\u2019ll learn about your needs and show you exactly how our ${service.h1.toLowerCase()} service can help. Call us at ${siteConfig.phone.display} or schedule online.`}
        showPhone={true}
        headingId="service-detail-cta"
      />
    </>
  );
}
