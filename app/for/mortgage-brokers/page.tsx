import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Mortgage Brokers | Assurgit",
  description:
    "Done-for-you AI video content for mortgage brokers and loan officers. Build referral authority, educate buyers, and stay top-of-mind with 5 videos per week. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Mortgage Brokers — Done For You",
    description:
      "Turn your mortgage expertise into 5 weekly educational videos — published automatically. Build referral relationships and attract buyers without filming.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Mortgage Brokers",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content for mortgage brokers. 5 educational videos per week using your personal AI avatar and voice clone.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What video content works best for mortgage brokers?",
      "acceptedAnswer": { "@type": "Answer", "text": "Buyer education content consistently performs: 'How much house can I actually afford,' 'The real difference between pre-qualification and pre-approval,' 'What actually happens at closing,' 'FHA vs conventional — which is right for you.' Content that answers the questions buyers ask before they ever call a mortgage broker builds trust and generates referral credibility with real estate agents." }
    },
    {
      "@type": "Question",
      "name": "Can Assurgit target first-time buyers vs. move-up buyers vs. investors?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. During setup, we brief on your primary borrower types and the loan products you focus on. Content is segmented to speak directly to each audience's concerns — whether that's a first-timer nervous about the process, an investor evaluating DSCR loans, or a move-up buyer managing the timing of selling and buying simultaneously." }
    },
    {
      "@type": "Question",
      "name": "How does video content help mortgage brokers get more referrals?",
      "acceptedAnswer": { "@type": "Answer", "text": "Real estate agents refer to mortgage brokers they trust and who keep their clients educated. When you're consistently showing up on social media with valuable, educational content, agents see you as the knowledgeable professional they want to recommend. Video content also builds direct trust with buyers before their first call — shortening the sales cycle significantly." }
    },
    {
      "@type": "Question",
      "name": "Does Assurgit handle compliance review for mortgage content?",
      "acceptedAnswer": { "@type": "Answer", "text": "Every script comes to you for review on Monday with a 48-hour window before anything renders. You can approve, request revisions, or flag compliance concerns. Our team writes educational content (not specific rate quotes or lending commitments), but you are the compliance checkpoint. We work within your guidelines." }
    },
  ]
};

export default function MortgageBrokersPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-amber-600/20 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-500/30 mb-6">
            For Mortgage Brokers & Loan Officers
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Be the mortgage broker{" "}
            <span className="text-amber-400">every agent in your market trusts</span>
            {" "}— without spending hours on content
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches what buyers and agents in your market are searching for, and publishes 5 educational videos a week — while you close loans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>

          {/* Value props */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { stat: "5 videos/week", label: "Buyer education + agent trust-building content" },
              { stat: "30 min", label: "One-time setup — then the system runs itself" },
              { stat: "No filming", label: "Your avatar appears on camera, not you" },
            ].map((item) => (
              <div key={item.stat} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-amber-400 font-black text-2xl mb-1">{item.stat}</p>
                <p className="text-gray-400 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            How it works for mortgage brokers
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, capture your voice clone, and brief on your loan products, target borrowers, geographic market, and referral partner relationships you want to strengthen." },
              { step: "2", title: "Weekly research", desc: "Our pipeline tracks what buyers and real estate agents in your market are searching: rate questions, process explainers, down payment myths, loan product comparisons." },
              { step: "3", title: "5 educational scripts every Monday", desc: "Written in your voice for your target audience. Buyer education, market updates, agent-facing content, and process walkthroughs — the content that builds referral credibility." },
              { step: "4", title: "Human QC + your review window", desc: "Every video is reviewed for quality and presentation. You receive scripts Monday with a 48-hour review window to catch anything before it renders." },
              { step: "5", title: "Published across your platforms", desc: "Instagram, TikTok, YouTube, LinkedIn — appearing in front of buyers at the start of their search and in front of agents who need a reliable broker to recommend." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-amber-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
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
            Sample content topics for mortgage brokers
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Pre-Approval vs Pre-Qualification: What's the Difference?",
              "How Much House Can You Actually Afford? (The Real Formula)",
              "FHA vs Conventional Loans: Which Is Right for You?",
              "The 5 Things That Can Derail Your Loan Before Closing",
              "What Actually Happens at Closing (Step by Step)",
              "Why Your Credit Score Matters More Than You Think",
              "Down Payment Myths Buyers Still Believe in 2026",
              "What to Do When Rates Drop — and When to Wait",
              "How to Buy and Sell a Home at the Same Time",
              "The Real Cost of Waiting to Buy (The Math Nobody Shows You)",
            ].map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for mortgage brokers</h2>
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
                  { name: "Launch", price: "$397/mo", videos: "5/week", platforms: "IG, TT, LI, YT", publishing: "MP4 delivery", highlight: false },
                  { name: "Starter", price: "$997/mo", videos: "5/week", platforms: "IG, TT, LI, YT", publishing: "Auto-publishing", highlight: true },
                  { name: "Growth", price: "$1,997/mo", videos: "10+/week", platforms: "IG, TT, LI, YT", publishing: "Auto-publishing + White-glove", highlight: false },
                ].map((plan) => (
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-amber-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-amber-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-amber-400 font-bold">{plan.price}</td>
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
          <div className="bg-amber-600/10 border border-amber-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Be the broker agents refer without thinking twice.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your content would look like. Start building referral authority this week.
            </p>
            <Link href="/book" className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/loan-officers" className="text-amber-400 hover:underline">Loan Officers</Link>
            <Link href="/for/real-estate-agents" className="text-amber-400 hover:underline">Real Estate Agents</Link>
            <Link href="/for/financial-advisors" className="text-amber-400 hover:underline">Financial Advisors</Link>
            <Link href="/pricing" className="text-amber-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-amber-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
