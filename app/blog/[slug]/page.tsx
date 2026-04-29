import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { resolveImagePath } from '@/lib/image-path';
import CTABlock from '@/components/CTABlock';

/* ──────────────────────────────────────────────────────────
   STATIC PARAMS + METADATA
   ────────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const imageUrl = `https://wellpreppedlife.com${resolveImagePath('blog', post.slug)}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    ...(post.keywords && { keywords: post.keywords }),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://wellpreppedlife.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: imageUrl, width: 1200, height: 560, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

/* ──────────────────────────────────────────────────────────
   HELPERS
   ────────────────────────────────────────────────────────── */
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Extract FAQ entries.
 *  Checks two patterns:
 *  1. A dedicated "## Frequently Asked Questions" section with ### sub-headings.
 *  2. Any ## headings throughout the post that start with a question word.
 */
function extractFAQ(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const seen = new Set<string>();

  // Pattern 1 — explicit FAQ section
  const faqMatch = content.match(/##\s+(?:Frequently Asked Questions|FAQ)[^\n]*\n([\s\S]*?)(?=\n##\s|\n---\s*$|$)/i);
  if (faqMatch) {
    const qRegex = /###\s+(.+?)\n([\s\S]*?)(?=###\s|$)/g;
    let m;
    while ((m = qRegex.exec(faqMatch[0])) !== null) {
      const q = m[1].trim();
      if (!seen.has(q)) {
        seen.add(q);
        faqs.push({ question: q, answer: m[2].trim().replace(/\*\*/g, '').replace(/\n+/g, ' ').slice(0, 320) });
      }
    }
  }

  // Pattern 2 — any ## heading that starts with a question word
  const sectionRegex = /^##\s+(.+)$/gm;
  let sm;
  while ((sm = sectionRegex.exec(content)) !== null) {
    const heading = sm[1].trim();
    if (!seen.has(heading) && /^(what|how|who|why|when|where|can|is|are|does|do|should|will)\b/i.test(heading)) {
      // Grab paragraph text immediately following this heading
      const afterHeading = content.slice(sm.index + sm[0].length);
      const paraMatch = afterHeading.match(/^\n+([\s\S]+?)(?=\n##|\n---|\n###|$)/);
      const answer = paraMatch
        ? paraMatch[1].trim().replace(/\*\*/g, '').replace(/\n+/g, ' ').slice(0, 320)
        : heading;
      seen.add(heading);
      faqs.push({ question: heading, answer });
    }
  }

  return faqs;
}

/** Extract HowTo schema from the first ordered list found in the content.
 *  Returns null if no ordered list with ≥ 2 steps is present.
 */
function extractHowTo(content: string, title: string): object | null {
  // Split into sections by ## headings
  const sections = content.split(/(?=^##\s)/m);
  for (const section of sections) {
    const lines = section.split('\n');
    const headingLine = lines.find((l) => l.startsWith('##'));
    const sectionName = headingLine ? headingLine.replace(/^#+\s*/, '').trim() : title;

    const steps: string[] = [];
    for (const line of lines) {
      const match = line.match(/^\d+\.\s+(.+)$/);
      if (match) steps.push(match[1].trim().replace(/\*\*/g, ''));
    }

    if (steps.length >= 2) {
      return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: sectionName,
        description: title,
        step: steps.map((text, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: text,
          text,
        })),
      };
    }
  }
  return null;
}

/** Extract H2 headings from markdown content for a simple table of contents. */
function extractH2Headings(content: string): { text: string; id: string }[] {
  const regex = /^##\s+(.+)$/gm;
  const headings: { text: string; id: string }[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    headings.push({ text, id });
  }
  return headings;
}


/* ──────────────────────────────────────────────────────────
   CATEGORY → SERVICE CTA MAPPING
   ────────────────────────────────────────────────────────── */
const CATEGORY_SERVICE_MAP: Record<string, { path: string; serviceName: string }> = {
  'Meal Prep Tips': { path: '/services/weekly-meal-prep', serviceName: 'Weekly Meal Prep' },
  'Adaptive Cooking': { path: '/services/adaptive-cooking', serviceName: 'Adaptive Cooking' },
  'Caregiver Resources': { path: '/services/caregiver-meal-support', serviceName: 'Caregiver Meal Support' },
  'Nutrition for Seniors': { path: '/services/senior-nutrition-planning', serviceName: 'Senior Nutrition Planning' },
  'Kitchen Safety': { path: '/services/kitchen-safety-assessment', serviceName: 'Kitchen Safety Assessment' },
  'Cooking Life Skills': { path: '/services/in-home-cooking-lessons', serviceName: 'In-Home Cooking Lessons' },
  'Senior Meal Prep': { path: '/services/meal-prep-for-seniors', serviceName: 'Meal Prep for Seniors' },
  'Senior Care': { path: '/services/personal-chef-for-seniors', serviceName: 'Personal Chef for Seniors' },
  'Personal Chef': { path: '/services/personal-chef-for-seniors', serviceName: 'Personal Chef for Seniors' },
};

function getCategoryService(category: string): { path: string; serviceName: string } | null {
  return CATEGORY_SERVICE_MAP[category] ?? null;
}

/* ──────────────────────────────────────────────────────────
   RELATED SERVICES MAPPING
   ────────────────────────────────────────────────────────── */
const SERVICE_KEYWORD_MAP: { keywords: string[]; slug: string; label: string }[] = [
  { keywords: ['diabetes', 'diabetic', 'blood sugar', 'blood-sugar', 'glycemic'], slug: 'diabetic-meal-prep', label: 'Diabetic Meal Prep' },
  { keywords: ['dementia', 'alzheimer', 'cognitive decline', 'memory loss'], slug: 'dementia-meal-support', label: 'Dementia Meal Support' },
  { keywords: ['kitchen safety', 'fire', 'burn', 'fall prevention', 'elderly parents living alone'], slug: 'kitchen-safety-assessment', label: 'Kitchen Safety Assessment' },
  { keywords: ['arthritis', 'joint pain', 'grip', 'adaptive cooking', 'adaptive tool'], slug: 'arthritis-friendly-cooking', label: 'Arthritis-Friendly Cooking' },
  { keywords: ['caregiver', 'family caregiver', 'caring for', 'loved one'], slug: 'caregiver-meal-support', label: 'Caregiver Meal Support' },
  { keywords: ['wheelchair', 'wheelchair access', 'mobility', 'accessible kitchen'], slug: 'wheelchair-accessible-kitchen', label: 'Wheelchair-Accessible Kitchen' },
  { keywords: ['stroke', 'stroke recovery'], slug: 'stroke-recovery-meals', label: 'Stroke Recovery Meals' },
  { keywords: ['surgery', 'post-surgery', 'recovery', 'after surgery'], slug: 'post-surgery-meal-prep', label: 'Post-Surgery Meal Prep' },
  { keywords: ['parkinson', "parkinson's", 'tremor'], slug: 'parkinsons-meal-prep', label: "Parkinson's Meal Prep" },
  { keywords: ['low sodium', 'low-sodium', 'salt', 'hypertension', 'blood pressure'], slug: 'low-sodium-cooking', label: 'Low-Sodium Cooking' },
];

function getRelatedServices(content: string, title: string, category: string): { slug: string; label: string }[] {
  const searchText = `${title} ${content} ${category}`.toLowerCase();
  const matches = SERVICE_KEYWORD_MAP.filter((entry) =>
    entry.keywords.some((kw) => searchText.includes(kw.toLowerCase()))
  );
  // Deduplicate by slug and limit to 4
  const seen = new Set<string>();
  const unique: { slug: string; label: string }[] = [];
  for (const m of matches) {
    if (!seen.has(m.slug)) {
      seen.add(m.slug);
      unique.push({ slug: m.slug, label: m.label });
    }
    if (unique.length >= 4) break;
  }
  return unique;
}

function RelatedServicesSection({ content, title, category }: { content: string; title: string; category: string }) {
  const services = getRelatedServices(content, title, category);
  if (services.length === 0) return null;

  return (
    <section className="bg-[#FAF7F2] py-12 md:py-16" aria-labelledby="related-services-heading">
      <div className="container-xl max-w-4xl">
        <div className="rounded-2xl border border-[#E0D8CF] bg-white p-8 md:p-10">
          <h2
            id="related-services-heading"
            className="mb-6 font-[family-name:var(--font-serif)] text-2xl font-bold text-[#2C2C2C]"
          >
            Related Services
          </h2>
          <ul className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {services.map((svc) => (
              <li key={svc.slug}>
                <Link
                  href={`/services/${svc.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-[#E0D8CF] bg-[#FAF7F2] px-5 py-4 transition-all hover:border-[#6B8F71] hover:shadow-md"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F0E9] text-[#6B8F71] transition-colors group-hover:bg-[#6B8F71] group-hover:text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-[#2C2C2C] group-hover:text-[#4A6B50] transition-colors">
                    {svc.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-[#E0D8CF] pt-6">
            <p className="text-sm leading-relaxed text-[#5A5A5A]">
              We serve{' '}
              <Link href="/locations/san-jose" className="font-medium text-[#6B8F71] underline underline-offset-2 hover:text-[#4A6B50] transition-colors">San Jose</Link>,{' '}
              <Link href="/locations/palo-alto" className="font-medium text-[#6B8F71] underline underline-offset-2 hover:text-[#4A6B50] transition-colors">Palo Alto</Link>,{' '}
              <Link href="/locations/san-francisco" className="font-medium text-[#6B8F71] underline underline-offset-2 hover:text-[#4A6B50] transition-colors">San Francisco</Link>,
              and the entire{' '}
              <Link href="/locations/oakland" className="font-medium text-[#6B8F71] underline underline-offset-2 hover:text-[#4A6B50] transition-colors">Bay Area</Link>.{' '}
              <Link href="/book" className="font-semibold text-[#C4622D] underline underline-offset-2 hover:text-[#A34F23] transition-colors">
                Book a free assessment
              </Link>{' '}
              to get started.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────── */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  const headings = post.content.length > 1200 ? extractH2Headings(post.content) : [];
  const faqs = extractFAQ(post.content);
  const howTo = extractHowTo(post.content, post.title);
  const imageUrl = `https://wellpreppedlife.com${resolveImagePath('blog', post.slug)}`;

  // Article JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    ...(post.keywords && { keywords: post.keywords }),
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://wellpreppedlife.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Well Prepped Life',
      url: 'https://wellpreppedlife.com',
      logo: { '@type': 'ImageObject', url: 'https://wellpreppedlife.com/icon.svg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://wellpreppedlife.com/blog/${post.slug}` },
  };

  const howToSchema = howTo;

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  } : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `https://wellpreppedlife.com/blog/${post.slug}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wellpreppedlife.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://wellpreppedlife.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://wellpreppedlife.com/blog/${post.slug}` },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://wellpreppedlife.com/blog/${post.slug}`,
    url: `https://wellpreppedlife.com/blog/${post.slug}`,
    name: post.title,
    description: post.excerpt,
    isPartOf: { '@id': 'https://wellpreppedlife.com/#website' },
    breadcrumb: { '@id': `https://wellpreppedlife.com/blog/${post.slug}#breadcrumb` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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

      {/* ── Breadcrumb ──────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="bg-[#FAF7F2] py-4 border-b border-[#E0D8CF]"
      >
        <div className="container-xl">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-[#5A5A5A]">
            <li>
              <Link
                href="/"
                className="hover:text-[#6B8F71] transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="select-none">
              /
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-[#6B8F71] transition-colors"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden="true" className="select-none">
              /
            </li>
            <li
              className="text-[#2C2C2C] font-medium max-w-[280px] truncate"
              aria-current="page"
            >
              {post.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* ── Article Header ──────────────────────────────────────── */}
      <header className="bg-[#FAF7F2] section-pad pb-0">
        <div className="container-xl max-w-4xl">
          {/* Category + meta */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Link
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="rounded-full bg-[#6B8F71] px-4 py-1 text-sm font-bold text-white hover:bg-[#4A6B50] transition-colors"
              aria-label={`Browse all ${post.category} articles`}
            >
              {post.category}
            </Link>
            <span className="text-sm text-[#5A5A5A]">{post.readTime}</span>
            <span aria-hidden="true" className="text-[#E0D8CF]">·</span>
            <time dateTime={post.date} className="text-sm text-[#5A5A5A]">
              {formatDate(post.date)}
            </time>
          </div>

          {/* H1 */}
          <h1 className="font-[family-name:var(--font-serif)] text-[clamp(1.75rem,3vw+1rem,3rem)] font-bold leading-tight text-[#2C2C2C]">
            {post.title}
          </h1>

          {/* Author byline */}
          <div className="mt-6 flex items-start gap-3">
            {/* Author photo */}
            <img
              src="/headshot.webp"
              alt={`${post.author}, founder of Well Prepped Life`}
              className="h-11 w-11 shrink-0 rounded-full object-cover border-2 border-[#6B8F71]/30 mt-0.5"
              loading="lazy"
            />
            <div>
              <p className="text-sm font-semibold text-[#2C2C2C]">
                {post.author}
              </p>
              <p className="text-xs text-[#5A5A5A]">
                Life Skills &amp; Meal Prep Consultant &middot; ServSafe Certified &middot; Bay Area
              </p>
              <p className="mt-0.5 text-xs text-[#5A5A5A]">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true" className="mx-1.5">·</span>
                {post.readTime}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Featured Image ──────────────────────────────────────── */}
      <div className="bg-[#FAF7F2] pt-8">
        <div className="container-xl max-w-4xl">
          <img
            src={resolveImagePath('blog', post.slug)}
            alt={post.title}
            className="w-full h-[260px] md:h-[400px] object-cover rounded-xl" loading="lazy" />
        </div>
      </div>

      {/* ── Article Body ────────────────────────────────────────── */}
      <article className="section-pad bg-[#FAF7F2]" aria-label={post.title}>
        <div className="container-xl max-w-4xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">

            {/* Main content column */}
            <div className="min-w-0 flex-1">

              {/* Table of contents */}
              {headings.length > 0 && (
                <nav
                  aria-label="Table of contents"
                  className="mb-10 rounded-xl border border-[#E0D8CF] bg-white p-6"
                >
                  <p className="mb-3 font-[family-name:var(--font-sans)] text-xs font-bold uppercase tracking-widest text-[#6B8F71]">
                    In this article:
                  </p>
                  <ol className="space-y-2">
                    {headings.map((h, i) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="text-sm text-[#5A5A5A] hover:text-[#6B8F71] transition-colors"
                        >
                          <span className="mr-2 font-semibold text-[#6B8F71]">
                            {i + 1}.
                          </span>
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {/* Article content */}
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              {/* Mid-article CTA block — category-aware */}
              {(() => {
                const categoryService = getCategoryService(post.category);
                return (
                  <div className="my-10 rounded-xl border-l-4 border-[#6B8F71] bg-[#E8F0E9] p-6">
                    {categoryService ? (
                      <>
                        <p className="mb-3 font-semibold text-[#2C2C2C]">
                          Looking for help with {post.category.toLowerCase()}?{' '}
                          <Link
                            href={categoryService.path}
                            className="text-[#C4622D] underline underline-offset-2 hover:text-[#A34F23] transition-colors"
                          >
                            Learn about our {categoryService.serviceName} service&nbsp;&rarr;
                          </Link>
                        </p>
                        <p className="mb-4 text-[#5A5A5A]">
                          We&apos;ll walk through your specific kitchen situation
                          together — no pressure, no commitment.
                        </p>
                        <Link href="/book" className="btn-primary">
                          Book Your Free Kitchen Assessment
                        </Link>
                      </>
                    ) : (
                      <>
                        <p className="mb-3 font-semibold text-[#2C2C2C]">
                          Need personalized help?{' '}
                          <Link
                            href="/book"
                            className="text-[#C4622D] underline underline-offset-2 hover:text-[#A34F23] transition-colors"
                          >
                            Book a free assessment.
                          </Link>
                        </p>
                        <p className="mb-4 text-[#5A5A5A]">
                          We&apos;ll walk through your specific kitchen situation
                          together — no pressure, no commitment.
                        </p>
                        <Link href="/book" className="btn-primary">
                          Book Your Free Kitchen Assessment
                        </Link>
                      </>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Sidebar — only shown on larger screens */}
            <aside
              className="hidden lg:block lg:w-64 shrink-0"
              aria-label="Sidebar"
            >
              <div className="sticky top-24 space-y-6">
                {/* Category pill */}
                <div className="rounded-xl border border-[#E0D8CF] bg-white p-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#6B8F71]">
                    Category
                  </p>
                  <Link
                    href={`/blog?category=${encodeURIComponent(post.category)}`}
                    className="inline-block rounded-full bg-[#E8F0E9] px-4 py-1.5 text-sm font-semibold text-[#4A6B50] hover:bg-[#6B8F71] hover:text-white transition-colors"
                  >
                    {post.category}
                  </Link>
                </div>

                {/* Book CTA */}
                <div className="rounded-xl bg-[#6B8F71] p-5 text-center">
                  <p className="mb-1 font-[family-name:var(--font-serif)] font-bold text-white">
                    Free Assessment
                  </p>
                  <p className="mb-4 text-sm text-white/85">
                    30-minute call, no obligation.
                  </p>
                  <Link href="/book" className="btn-primary text-sm px-4 py-2">
                    Book Now →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* ── Related Posts ───────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section
          className="section-pad bg-white"
          aria-labelledby="related-posts-heading"
        >
          <div className="container-xl">
            <h2
              id="related-posts-heading"
              className="mb-8 font-[family-name:var(--font-serif)] text-2xl font-bold text-[#2C2C2C]"
            >
              You Might Also Like
            </h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E0D8CF] bg-[#FAF7F2] transition-shadow hover:shadow-md"
                    aria-label={`Read: ${related.title}`}
                  >
                    <img
                      src={resolveImagePath('blog', related.slug)}
                      alt={related.title}
                      className="h-40 w-full object-cover"
                      loading="lazy"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <span className="mb-2 text-xs font-bold uppercase tracking-wide text-[#6B8F71]">
                        {related.category}
                      </span>
                      <h3 className="mb-2 font-[family-name:var(--font-serif)] text-base font-bold leading-snug text-[#2C2C2C] group-hover:text-[#4A6B50] transition-colors">
                        {related.title}
                      </h3>
                      <p className="mt-auto text-sm font-semibold text-[#C4622D] group-hover:underline">
                        Read More →
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Related Services & Locations ──────────────────────────── */}
      <RelatedServicesSection content={post.content} title={post.title} category={post.category} />

      {/* ── Full-width CTA Block ─────────────────────────────────── */}
      <CTABlock
        headline="Researching this for someone in the Bay Area?"
        subtext="Justine Sanidad is available for a free 15-minute call this week — no form to fill, no commitment. She can tell you exactly how she handles this situation and whether she can help."
        showPhone={true}
      />
    </>
  );
}
