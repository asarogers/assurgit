import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for CPAs & Tax Professionals | Assurgit",
  description:
    "Done-for-you AI video content for CPAs and tax professionals. Build authority, generate referrals, and attract ideal clients through educational tax content. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for CPAs & Tax Professionals — Done For You",
    description:
      "Turn your tax expertise into 5 weekly videos — published automatically. Build the authority that generates referrals and attracts high-quality clients year-round.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for CPAs and Tax Professionals",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content service for CPAs and tax professionals. Build authority and generate referrals through consistent educational tax content.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does Assurgit handle IRS and regulatory compliance for tax content?",
      "acceptedAnswer": { "@type": "Answer", "text": "Scripts are written as general educational content — explaining tax concepts, strategies, and common mistakes — rather than specific advice for any individual's situation. This is the same approach used by compliant tax educators across YouTube and social media. Scripts always include your review before production. You can add standard disclaimers like 'consult a tax professional for your specific situation' anywhere you see fit, and our team will incorporate that language before publishing." }
    },
    {
      "@type": "Question",
      "name": "Can I review and approve scripts before they're turned into videos?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, every time. Scripts are delivered to you each Monday before production begins. You review, approve, and can request revisions before anything is recorded. For CPAs, this is especially important — if a tax law has changed, a strategy has nuance, or a topic needs a specific framing, you catch it before it's live, not after." }
    },
    {
      "@type": "Question",
      "name": "What tax topics generate the most interest from business owner audiences?",
      "acceptedAnswer": { "@type": "Answer", "text": "Business owners are particularly hungry for content about entity structure (S-Corp vs. LLC), deductions they might be missing, retirement account strategies, self-employment tax, and quarterly estimated payments. These topics have high search volume year-round — not just during tax season — which means consistent content builds an audience that compounds over time." }
    },
    {
      "@type": "Question",
      "name": "Can educational content actually generate referrals for a CPA firm?",
      "acceptedAnswer": { "@type": "Answer", "text": "Referrals come from visibility and trust — and educational video content builds both at scale. When a business owner watches your video about a deduction they're missing and sends it to their accountant asking 'why aren't we doing this?', that's a referral trigger. When their friend is looking for a new CPA, they think of the one whose content they've been watching for months. Consistent educational presence makes you the obvious recommendation." }
    },
  ]
};

export default function CPAsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-emerald-600/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/30 mb-6">
            For CPAs & Tax Professionals
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            The CPA who educates publicly{" "}
            <span className="text-emerald-400">becomes the one everyone refers</span>
            {" "}— without chasing clients
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches what business owners and individuals are searching for about taxes, and publishes 5 educational videos a week — building the authority that generates referrals year-round.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>

          {/* Value prop callout */}
          <div className="mt-12 max-w-2xl mx-auto bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-left">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">Why CPAs Win With Educational Content</p>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-white font-bold text-lg mb-2">Tax content has high search volume 12 months a year</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Business owners are thinking about taxes constantly — not just in April. Quarterly payments, entity structure decisions, year-end planning, payroll questions — they're searching for answers all year. CPAs who consistently show up with clear educational content become the authority their audience trusts when it's time to hire someone or make a referral.
                </p>
                <p className="text-gray-500 text-xs">— Asa Rogers, Founder of Assurgit</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            How it works for CPAs and tax professionals
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, capture your voice clone, and brief on your target client — business owners, high earners, real estate investors, or whoever you specialize in serving." },
              { step: "2", title: "Weekly research", desc: "Our pipeline identifies what your audience is actively searching for: tax deductions, entity comparisons, IRS notices, retirement strategies, and seasonal tax planning questions." },
              { step: "3", title: "5 educational scripts every Monday", desc: "Written as clear, educational content in your voice. You review before production and can approve, revise, or add disclaimers specific to your practice before anything goes live." },
              { step: "4", title: "Human QC before publishing", desc: "Every video is reviewed for quality and accuracy. Tax and financial content receives additional scrutiny to ensure it's properly framed as educational rather than prescriptive advice." },
              { step: "5", title: "Published across your platforms", desc: "YouTube, LinkedIn, Instagram, Facebook — reaching business owners and individuals who are actively searching for the tax expertise you provide." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-emerald-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
                <div>
                  <p className="text-white font-semibold mb-1">{item.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Content ideas */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">
            Sample content topics for CPAs
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "5 Tax Deductions Business Owners Miss Every Single Year",
              "What Actually Triggers an IRS Audit (and How to Avoid It)",
              "S-Corp vs. LLC: Which Is Right for Your Business?",
              "How to Pay Yourself as a Business Owner Without Overpaying Taxes",
              "The Retirement Accounts That Give Business Owners the Best Tax Benefits",
              "What to Do If You Get an IRS Letter (Don't Panic — Read This First)",
              "Home Office Deduction: Who Qualifies and What You Can Actually Deduct",
              "Year-End Tax Planning Moves to Make Before December 31",
              "Why Quarterly Estimated Taxes Exist and How to Calculate Them",
              "The Real Difference Between a Tax Credit and a Tax Deduction",
            ].map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for CPAs and tax professionals</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900">
                  <th className="text-left py-4 px-5 font-semibold text-gray-400">Plan</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Price</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Videos/Week</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Platforms</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Publishing</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Launch", price: "$397/mo", videos: "5/week", platforms: "YT, LI, IG, FB", publishing: "MP4 delivery", highlight: false },
                  { name: "Starter", price: "$997/mo", videos: "5/week", platforms: "YT, LI, IG, FB", publishing: "Auto-publishing", highlight: true },
                  { name: "Growth", price: "$1,997/mo", videos: "10+/week", platforms: "YT, LI, IG, FB", publishing: "Auto-publishing + White-glove", highlight: false },
                ].map((plan) => (
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-emerald-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-emerald-400 font-bold">{plan.price}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{plan.videos}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{plan.platforms}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{plan.publishing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-2xl font-black text-white text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((q, i) => (
              <details key={i} className="bg-gray-900 border border-gray-800 rounded-xl group">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <span className="text-white font-medium text-sm">{q.name}</span>
                  <svg className="w-4 h-4 text-gray-500 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
          <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Turn your expertise into reach.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your content would look like. Start building the authority that generates referrals without cold outreach.
            </p>
            <Link href="/book" className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/financial-advisors" className="text-emerald-400 hover:underline">Financial Advisors</Link>
            <Link href="/for/attorneys" className="text-emerald-400 hover:underline">Attorneys</Link>
            <Link href="/for/consultants" className="text-emerald-400 hover:underline">Consultants</Link>
            <Link href="/pricing" className="text-emerald-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-emerald-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
