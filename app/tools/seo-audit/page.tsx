import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import ShareButton from "./ShareButton";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Free SEO Audit Tool — Check Your Website in Seconds",
  description:
    "Run a free SEO audit on any URL. Instantly check title tags, H1s, schema markup, meta descriptions, OG tags, click-to-call, and more. No signup required.",
  alternates: {
    canonical: "https://assurgit.com/tools/seo-audit",
  },
  openGraph: {
    title: "Free SEO Audit Tool — Check Your Website in Seconds",
    description:
      "Run a free SEO audit on any URL. Instantly check title tags, H1s, schema markup, meta descriptions, OG tags, click-to-call, and more. No signup required.",
    url: "https://assurgit.com/tools/seo-audit",
    type: "website",
    images: [{ url: "https://assurgit.com/app-icon-1024.png", width: 1024, height: 1024, alt: "Assurgit — Done-For-You AI Video Content Service" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Assurgit Free SEO Audit Tool",
  "url": "https://assurgit.com/tools/seo-audit",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "A free online SEO audit tool that checks any URL for title tag length, H1 structure, meta descriptions, Open Graph tags, schema.org structured data, click-to-call markup, canonical tags, robots meta, and more. Returns a scored report instantly.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
  },
  "publisher": {
    "@type": "Organization",
    "name": "Assurgit",
    "url": "https://assurgit.com",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is this SEO audit tool really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Enter any URL and get a full scored report — no signup, no credit card, no trial period. It's free to use as many times as you want.",
      },
    },
    {
      "@type": "Question",
      "name": "What does the SEO audit check?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The audit checks: title tag presence and character length, H1 tag presence and keyword structure, meta description presence and length, Open Graph tags (og:title, og:description, og:image), schema.org structured data type and validity, click-to-call markup for phone numbers, canonical tag, robots meta tag, image alt text, and URL structure.",
      },
    },
    {
      "@type": "Question",
      "name": "How do I fix the issues it finds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each flagged item includes a plain-English explanation and what to fix. For most issues you or your developer can make the change in your CMS. On WordPress, Yoast or RankMath handle most items automatically.",
      },
    },
    {
      "@type": "Question",
      "name": "Does the audit check my whole site or just one page?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can audit a single page or your entire site. The full-site mode discovers your sitemap automatically and audits every page, showing errors and warnings across all URLs with an overall SEO health score.",
      },
    },
    {
      "@type": "Question",
      "name": "Does the audit cover Google Business Profile or social media?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This tool audits on-page SEO for any web URL. It does not currently audit Google Business Profile listings or social media profiles. For local businesses, on-page SEO is just one piece — citations, reviews, and consistent content also drive local rankings.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://assurgit.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tools",
      "item": "https://assurgit.com/tools"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "SEO Audit",
      "item": "https://assurgit.com/tools/seo-audit"
    }
  ]
};

export default function SeoAuditPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <h1 className="sr-only">Free SEO Audit Tool — Check Your Website in Seconds</h1>

      <div className="pt-16 flex flex-col flex-1">
        <div className="flex items-center justify-end px-4 py-1.5 border-b border-gray-100 bg-white">
          <ShareButton />
        </div>
        
        <iframe
          src="https://audit.assurgit.com"
          title="Free SEO Audit Tool"
          className="flex-1 w-full border-0"
          style={{ minHeight: "min(900px, calc(80svh - 120px))" }}
          allow="clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-downloads"
        />

        {/* Content Section */}
        <div className="px-4 py-8 max-w-3xl mx-auto text-black">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Optimize Your Website's SEO in Minutes</h2>
          <p className="text-gray-600 mb-6">
            Our free SEO audit tool provides comprehensive insights to help you improve your website's search engine rankings.
            By analyzing key on-page elements, we identify areas for optimization so you can deliver a better experience for both users and search engines.
          </p>

          {/* Features List */}
          <h3 className="text-xl font-semibold mb-4">What We Check</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Title tag presence and optimal character length for maximum visibility</li>
            <li>H1 tag structure and keyword placement for better content hierarchy</li>
            <li>Meta description length and relevance to improve click-through rates</li>
            <li>Open Graph tags (og:title, og:description, og:image) for social media sharing optimization</li>
            <li>Schema.org structured data implementation and validation</li>
            <li>Click-to-call markup for mobile-friendly phone number display</li>
            <li>Canonical tag presence to prevent duplicate content issues</li>
            <li>Robots meta tags for proper crawl instructions</li>
            <li>Image alt text coverage and accessibility optimization</li>
            <li>URL structure analysis for clean, user-friendly navigation</li>
            <li>Performance metrics including page load speed impact on SEO rankings</li>
            <li>Mobile-friendliness assessment according to Google's Mobile-First Index</li>
          </ul>

          {/* How It Works */}
          <h3 className="text-xl font-semibold mt-8 mb-4">How It Works</h3>
          <p className="text-gray-600 mb-6">
            Simply enter any URL and our tool will run a comprehensive audit in real-time.
            You'll receive an instant report with actionable recommendations, prioritized by impact on your SEO performance.
            For most issues, we provide detailed explanations and step-by-step guidance for implementation.
          </p>

          {/* Benefits Section */}
          <h3 className="text-xl font-semibold mb-4">Why Use Our Tool?</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Instant results with no waiting or complicated setup</li>
            <li>Clear, actionable recommendations for quick improvements</li>
            <li>Free to use without any registration requirements</li>
            <li>Supports single-page and full-site audits</li>
            <li>Regular updates with the latest SEO best practices</li>
          </ul>

          {/* FAQ Section */}
          <h3 className="text-xl font-semibold mt-8 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div className="border-l-2 border-blue-500 pl-4">
              <h4 className="font-medium text-blue-500">Is this tool really free to use?</h4>
              <p className="mt-2 text-gray-600">
                Yes! We believe in making quality SEO tools accessible to everyone.
                You can audit as many URLs as you'd like without any restrictions.
              </p>
            </div>
            <div className="border-l-2 border-blue-500 pl-4">
              <h4 className="font-medium text-blue-500">How often should I run an audit?</h4>
              <p className="mt-2 text-gray-600">
                We recommend auditing your site at least once every month to catch any new issues.
                After making changes, re-audit to verify improvements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}