import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTABlock from "@/components/CTABlock";
import { siteConfig } from "@/lib/siteConfig";
import {
  getGBPCategoryBySlug,
  getAllGBPCategorySlugs,
} from "@/lib/gbp-categories-data";
import { getServiceBySlug } from "@/lib/services-data";

/* ============================================================
   STATIC PARAMS
   ============================================================ */
export function generateStaticParams() {
  return getAllGBPCategorySlugs().map((slug) => ({ slug }));
}

/* ============================================================
   SEO METADATA
   ============================================================ */
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getGBPCategoryBySlug(slug);
  if (!category) return {};

  const title = `${category.name} Services in the Bay Area | Well Prepped Life`;
  const description = category.description;

  return {
    title,
    description,
    alternates: { canonical: `/services/categories/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/services/categories/${slug}`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "https://wellpreppedlife.com/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${category.name} | ${siteConfig.name}`,
        },
      ],
    },
  };
}

/* ============================================================
   PAGE COMPONENT
   ============================================================ */
export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getGBPCategoryBySlug(slug);
  if (!category) notFound();

  /* Resolve service details for display — fall back to GBP name if no page yet */
  const resolvedServices = category.services.map((svc) => {
    const detail = getServiceBySlug(svc.slug);
    return {
      gbpName: svc.name,
      slug: svc.slug,
      title: detail?.h1 ?? svc.name,
      description: detail?.metaDescription
        ? detail.metaDescription.split(".")[0] + "."
        : `${svc.name} in the San Francisco Bay Area.`,
    };
  });

  /* Deduplicate by slug so the same page isn't linked twice */
  const seen = new Set<string>();
  const uniqueServices = resolvedServices.filter((s) => {
    if (seen.has(s.slug)) return false;
    seen.add(s.slug);
    return true;
  });

  /* JSON-LD */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
      { "@type": "ListItem", position: 3, name: category.name, item: `${siteConfig.url}/services/categories/${slug}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} Services | Well Prepped Life`,
    description: category.description,
    url: `${siteConfig.url}/services/categories/${slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phone.schema,
      url: siteConfig.url,
    },
    hasPart: uniqueServices.map((svc) => ({
      "@type": "Service",
      name: svc.gbpName,
      url: `${siteConfig.url}/services/${svc.slug}`,
    })),
  };

  const otherCategories = getAllGBPCategorySlugs()
    .filter((s) => s !== slug)
    .map((s) => {
      const c = getGBPCategoryBySlug(s)!;
      return { slug: s, name: c.name };
    });
  // Keep only 3 for the sidebar link
  const relatedCategories = otherCategories.slice(0, 3);

  return (
    <>
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="bg-[#6B8F71] section-pad"
        aria-labelledby="category-hero-heading"
      >
        <div className="container-xl max-w-3xl text-center">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-sm font-[family-name:var(--font-sans)] text-[#E8F0E9]/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold" aria-current="page">
                {category.name}
              </li>
            </ol>
          </nav>

          {category.isPrimary && (
            <p className="font-[family-name:var(--font-sans)] text-[#E8F0E9] font-semibold text-xs uppercase tracking-widest mb-3">
              Primary GBP Category
            </p>
          )}

          <h1
            id="category-hero-heading"
            className="font-[family-name:var(--font-serif)] text-[clamp(1.75rem,4vw+0.5rem,3rem)] font-bold text-white leading-tight mb-5"
          >
            {category.name} Services in the Bay Area
          </h1>

          <p className="font-[family-name:var(--font-sans)] text-[#E8F0E9] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {category.tagline}
          </p>

          <Link href="/book" className="btn-primary">
            Book a Free Kitchen Assessment
          </Link>
        </div>
      </section>

      {/* ── About This Category ────────────────────────────────── */}
      <section className="bg-[#FAF7F2] section-pad" aria-labelledby="about-cat-heading">
        <div className="container-xl max-w-3xl">
          <div className="sage-divider mb-6" />
          <h2
            id="about-cat-heading"
            className="section-heading mb-5"
          >
            About Our {category.name} Services
          </h2>
          <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-lg leading-[1.85]">
            {category.description}
          </p>
        </div>
      </section>

      {/* ── Service List ────────────────────────────────────────── */}
      <section className="bg-[#E8F0E9] section-pad" aria-labelledby="services-list-heading">
        <div className="container-xl max-w-5xl">
          <div className="text-center mb-10">
            <div className="sage-divider mx-auto mb-6" />
            <h2
              id="services-list-heading"
              className="section-heading mb-3"
            >
              {category.name} Services We Offer
            </h2>
            <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-lg max-w-2xl mx-auto">
              {uniqueServices.length} services available across the San Francisco Bay Area
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uniqueServices.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group bg-white rounded-2xl border border-[#E0D8CF] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#6B8F71]/50 flex flex-col gap-3"
              >
                <h3 className="font-[family-name:var(--font-serif)] text-base font-bold text-[#2C2C2C] group-hover:text-[#6B8F71] transition-colors leading-snug">
                  {svc.gbpName}
                </h3>
                <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-sm leading-relaxed flex-1">
                  {svc.description}
                </p>
                <span className="font-[family-name:var(--font-sans)] text-[#C4622D] font-semibold text-sm group-hover:underline">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Well Prepped Life ──────────────────────────────── */}
      <section className="bg-[#FAF7F2] section-pad" aria-labelledby="why-wpl-heading">
        <div className="container-xl max-w-3xl">
          <div className="sage-divider mb-6" />
          <h2
            id="why-wpl-heading"
            className="section-heading mb-8"
          >
            Why Families Choose Well Prepped Life
          </h2>
          <ul className="space-y-5">
            {[
              { label: "ServSafe-certified chef", text: "Every meal is prepared with food safety training and medical diet accuracy." },
              { label: "Real home-cooked food", text: "Not frozen, not portioned by a warehouse. Made from scratch in your own kitchen." },
              { label: "Medical diet expertise", text: "Diabetic, renal, cardiac, dysphagia, and condition-specific diets handled every day." },
              { label: "Available this week", text: "Book a free 60-minute kitchen assessment — no commitment, no sales pitch." },
            ].map(({ label, text }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#6B8F71] flex items-center justify-center mt-0.5" aria-hidden="true">
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] leading-relaxed">
                  <strong className="font-semibold text-[#2C2C2C]">{label}</strong> — {text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Browse Other Categories ────────────────────────────── */}
      <section className="bg-[#E8F0E9] section-pad" aria-labelledby="other-cats-heading">
        <div className="container-xl max-w-3xl">
          <div className="sage-divider mb-6" />
          <h2
            id="other-cats-heading"
            className="section-heading mb-6"
          >
            Browse Other Service Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {relatedCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/services/categories/${cat.slug}`}
                className="group bg-white rounded-xl border border-[#E0D8CF] p-4 text-center transition-all hover:shadow-md hover:border-[#6B8F71]/50"
              >
                <span className="font-[family-name:var(--font-serif)] font-bold text-[#2C2C2C] group-hover:text-[#6B8F71] transition-colors text-sm">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/services"
              className="font-[family-name:var(--font-sans)] font-semibold text-sm px-4 py-2.5 rounded-full border-2 border-[#6B8F71] text-[#6B8F71] hover:bg-[#6B8F71] hover:text-white transition-colors"
            >
              View All Services
            </Link>
            <Link
              href="/blog"
              className="font-[family-name:var(--font-sans)] font-semibold text-sm px-4 py-2.5 rounded-full border-2 border-[#6B8F71] text-[#6B8F71] hover:bg-[#6B8F71] hover:text-white transition-colors"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <CTABlock
        headline={`Ready for ${category.name} Services?`}
        subtext={`Book your free Kitchen & Nutrition Assessment today. We\u2019ll come to your home, learn about your situation, and match you with the right service. Call Justine at ${siteConfig.phone.display} or schedule online.`}
        showPhone={true}
        headingId={`${slug}-cta`}
      />
    </>
  );
}
