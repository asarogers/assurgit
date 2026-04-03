import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Real Estate Agents | Assurgit",
  description:
    "Done-for-you AI video content for real estate agents. Market updates, buyer/seller education, and local authority content — 5 videos per week, published automatically. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Real Estate Agents — Done For You",
    description:
      "Turn your real estate expertise into 5 weekly educational videos — published automatically. Build local authority and stay top-of-mind with buyers and sellers.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Real Estate Agents",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content for real estate agents. 5 educational videos per week using your personal AI avatar and voice clone.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What video content works best for real estate agents?",
      "acceptedAnswer": { "@type": "Answer", "text": "Local market updates, buyer and seller education, and myth-busting content perform best. 'What's actually happening in [City] right now,' 'Is it a good time to buy or sell,' 'Why homes are sitting longer than last year,' 'What buyers need to know before making an offer.' Content that shows you understand the local market — not generic real estate tips — is what builds real authority." }
    },
    {
      "@type": "Question",
      "name": "Can Assurgit write local market content for my specific city or neighborhood?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. During setup, we brief on your market — city, neighborhoods, price ranges, buyer/seller mix, and local dynamics. Our research pipeline pulls data relevant to your specific market and writes scripts that position you as the local expert, not just another agent with generic national statistics." }
    },
    {
      "@type": "Question",
      "name": "How does video content help real estate agents get more listings?",
      "acceptedAnswer": { "@type": "Answer", "text": "Homeowners who are considering selling spend months thinking about it before they call an agent. The agent who's been showing up with valuable, local content every week is the one they call first. Video content builds the familiarity and trust that makes you the obvious choice before they ever start interviewing agents." }
    },
    {
      "@type": "Question",
      "name": "Can I target buyers and sellers separately?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. We can weight your content toward buyers, sellers, or both — and can target specific demographics like first-time buyers, investors, or move-up buyers. During setup and ongoing weekly calls, we calibrate the content mix to match where you want to grow your business." }
    },
  ]
};

export default function RealEstateAgentsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-rose-600/20 text-rose-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-rose-500/30 mb-6">
            For Real Estate Agents & Brokers
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Be the agent{" "}
            <span className="text-rose-400">every buyer and seller in your market already knows</span>
            {" "}— before they ever call
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches your local market, and publishes 5 videos per week — local updates, buyer education, seller tips, and authority content — while you focus on closings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>

          {/* Value props */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { stat: "5 videos/week", label: "Local market content, published to your platforms" },
              { stat: "30 min", label: "One-time setup — then the system runs itself" },
              { stat: "No filming", label: "Your avatar appears on camera, not you" },
            ].map((item) => (
              <div key={item.stat} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-rose-400 font-black text-2xl mb-1">{item.stat}</p>
                <p className="text-gray-400 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            How it works for real estate agents
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, capture your voice clone, and brief on your market, specialty (buyers, sellers, investors, luxury, first-time), target neighborhoods, and brand positioning." },
              { step: "2", title: "Weekly research", desc: "Our pipeline tracks local market data and what buyers and sellers in your market are searching: current inventory, price trends, process questions, and neighborhood-specific content." },
              { step: "3", title: "5 educational scripts every Monday", desc: "Written in your voice for your market. Local market updates, buyer guides, seller tips, myth-busting, and the content that makes you the obvious expert to call." },
              { step: "4", title: "Human QC before publishing", desc: "Every video is reviewed for quality and accuracy. You receive scripts each Monday with a 48-hour review window — catch anything before it renders." },
              { step: "5", title: "Published across your platforms", desc: "Instagram, TikTok, YouTube, LinkedIn — showing up in front of buyers researching neighborhoods and sellers thinking about listing." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-rose-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
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
            Sample content topics for real estate agents
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Is Now a Good Time to Buy a Home? The Honest Answer",
              "Why Homes Are Sitting on the Market Longer Right Now",
              "What Buyers Actually Compete With in [Your City] in 2026",
              "5 Things That Will Kill a Real Estate Deal (Buyers Should Know)",
              "How to Price Your Home to Sell Fast (Not Just High)",
              "The Real Cost of Waiting to Sell Your Home",
              "What Happens During a Home Inspection — and What You Can Negotiate",
              "Why Your Zestimate Is Wrong (and What Your Home Is Actually Worth)",
              "First-Time Buyer? Here's Everything That Happens After Your Offer Is Accepted",
              "How to Win a Multiple-Offer Situation Without Overpaying",
            ].map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for real estate agents</h2>
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
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-rose-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-rose-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-rose-400 font-bold">{plan.price}</td>
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
          <div className="bg-rose-600/10 border border-rose-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Own your market before the next listing cycle.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your local market content would look like. Start building the authority that generates leads before you ever ask for them.
            </p>
            <Link href="/book" className="inline-block bg-rose-600 hover:bg-rose-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/mortgage-brokers" className="text-rose-400 hover:underline">Mortgage Brokers</Link>
            <Link href="/for/loan-officers" className="text-rose-400 hover:underline">Loan Officers</Link>
            <Link href="/for/financial-advisors" className="text-rose-400 hover:underline">Financial Advisors</Link>
            <Link href="/pricing" className="text-rose-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-rose-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
