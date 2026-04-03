import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Insurance Agents | Assurgit",
  description:
    "Done-for-you AI video content for insurance agents. Demystify coverage, build trust with clients, and grow your book of business with 5 educational videos per week. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Insurance Agents — Done For You",
    description:
      "Turn your insurance expertise into 5 weekly videos — published automatically. Build the trust that keeps clients from shopping around.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Insurance Agents",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content service for insurance agents. Build trust, demystify coverage, and grow your book of business through educational video content.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does Assurgit handle compliance for insurance and financial content?",
      "acceptedAnswer": { "@type": "Answer", "text": "Scripts are written as general educational content — explaining concepts, coverage types, and common questions — rather than specific product recommendations or advice. This is the same approach used by compliant insurance educators across YouTube and social media. Before anything goes live, you review each script and can flag any language that needs adjustment for your state, carrier requirements, or firm's compliance guidelines." }
    },
    {
      "@type": "Question",
      "name": "Can I review scripts before they're published?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, always. Every week you receive the scripts before they're turned into videos. You have full approval before anything is recorded or published. If a topic needs to be reframed, a term needs a disclaimer, or a concept needs to be adjusted for accuracy, that happens before production — not after." }
    },
    {
      "@type": "Question",
      "name": "What insurance topics perform best for building an audience online?",
      "acceptedAnswer": { "@type": "Answer", "text": "Content that explains things people are already confused about drives the most engagement: term vs. whole life, how much coverage you actually need, what homeowners policies don't cover, how umbrella insurance works, and what happens when you file a claim. People search for this information constantly, and an agent who answers it clearly becomes the obvious person to call." }
    },
    {
      "@type": "Question",
      "name": "I sell multiple lines — can content cover life, home, and auto?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. During setup, we brief on all the lines you write and your target client profile. We can rotate across topics or focus on whatever lines are most profitable for your book. If you're running a campaign around open enrollment or a seasonal product, we can align content accordingly." }
    },
  ]
};

export default function InsuranceAgentsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-slate-600/20 text-slate-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-500/30 mb-6">
            For Insurance Agents
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Clients who understand their coverage{" "}
            <span className="text-slate-400">don't shop around</span>
            {" "}— educate them before someone else does
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches what your clients are searching for about insurance, and publishes 5 educational videos a week — building the trust that keeps your book of business growing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-slate-600 hover:bg-slate-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>

          {/* Value prop callout */}
          <div className="mt-12 max-w-2xl mx-auto bg-slate-500/10 border border-slate-500/30 rounded-2xl p-6 text-left">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Why Educational Content Wins for Insurance</p>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-white font-bold text-lg mb-2">People buy from agents they already trust — and trust is built before the call</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Insurance is one of the highest-trust purchases people make. They don't want to feel sold to — they want to feel educated. Agents who consistently publish clear, honest explanations of coverage, costs, and common mistakes become the obvious person to call when it's time to buy. Not a comparison website. Not a 1-800 number. You.
                </p>
                <p className="text-gray-500 text-xs">— Asa Rogers, Founder of Assurgit</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            How it works for insurance agents
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, capture your voice clone, and brief on your lines of business, target clients, and any compliance requirements specific to your state or carrier." },
              { step: "2", title: "Weekly research", desc: "Our pipeline tracks what your audience is searching for: coverage questions, policy comparisons, claims processes, life events that trigger insurance needs, and seasonal topics." },
              { step: "3", title: "5 educational scripts every Monday", desc: "Written in your voice as clear, trustworthy educational content. You review before anything is produced. Scripts can include appropriate disclaimers based on your guidance." },
              { step: "4", title: "Human QC before publishing", desc: "Every video is reviewed for quality and accuracy. Financial and insurance content goes through additional care to ensure it's educational rather than prescriptive." },
              { step: "5", title: "Published across your platforms", desc: "Facebook, YouTube, Instagram, LinkedIn — reaching homeowners, families, and business owners at the moments they're thinking about their coverage." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-slate-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
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
            Sample content topics for insurance agents
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Term vs. Whole Life Insurance — What Nobody Explains Clearly",
              "How Much Life Insurance Do You Actually Need?",
              "5 Things Your Homeowners Policy Doesn't Cover (That Might Surprise You)",
              "What Is an Umbrella Policy and Who Actually Needs One?",
              "How Filing a Claim Affects Your Premium (The Real Answer)",
              "Why Your Car Insurance Quote Changed When You Moved",
              "The Difference Between Replacement Cost and Actual Cash Value",
              "What Happens to Your Life Insurance If You Stop Paying?",
              "The Life Events That Should Trigger an Insurance Review",
              "Why Cheap Insurance Is Often the Most Expensive Mistake",
            ].map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for insurance agents</h2>
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
                  { name: "Launch", price: "$397/mo", videos: "5/week", platforms: "FB, YT, IG, LI", publishing: "MP4 delivery", highlight: false },
                  { name: "Starter", price: "$997/mo", videos: "5/week", platforms: "FB, YT, IG, LI", publishing: "Auto-publishing", highlight: true },
                  { name: "Growth", price: "$1,997/mo", videos: "10+/week", platforms: "FB, YT, IG, LI", publishing: "Auto-publishing + White-glove", highlight: false },
                ].map((plan) => (
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-slate-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-slate-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-slate-400 font-bold">{plan.price}</td>
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
          <div className="bg-slate-600/10 border border-slate-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Turn your expertise into reach.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your content would look like. Start building the trust that keeps your phone ringing.
            </p>
            <Link href="/book" className="inline-block bg-slate-600 hover:bg-slate-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/financial-advisors" className="text-slate-400 hover:underline">Financial Advisors</Link>
            <Link href="/for/loan-officers" className="text-slate-400 hover:underline">Loan Officers</Link>
            <Link href="/for/mortgage-brokers" className="text-slate-400 hover:underline">Mortgage Brokers</Link>
            <Link href="/pricing" className="text-slate-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-slate-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
