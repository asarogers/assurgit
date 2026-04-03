import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Handyman Contractors — Done For You | Assurgit",
  description:
    "Done-for-you AI video content for handyman contractors and home service businesses. Educational videos that keep you top-of-mind with homeowners. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Handyman Contractors — Done For You",
    description:
      "Stop relying only on referrals. Educational home improvement videos published weekly to Instagram, TikTok, LinkedIn, and YouTube — without you lifting a camera.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Handyman Contractors",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content for handyman contractors. Educational home improvement content that keeps contractors top-of-mind with local homeowners.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
  "areaServed": "US",
  "serviceType": "Video Content Marketing",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What kind of video content works for handyman contractors?",
      "acceptedAnswer": { "@type": "Answer", "text": "Home improvement tips, seasonal maintenance reminders, 'before and after' concept videos, DIY vs. hire-a-pro comparisons, and common home problem explainers all perform well. The goal is to be the trusted expert homeowners think of before they even search for a contractor." }
    },
    {
      "@type": "Question",
      "name": "Do I need to show my actual work in the videos?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Your AI avatar delivers the content — your face, your voice — without you being on a job site with a camera. The content is educational and informational, which builds trust and authority without requiring live footage of every project." }
    },
    {
      "@type": "Question",
      "name": "Will video actually bring in new clients for a contractor?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Homeowners search and scroll for trusted advice before making hire decisions. A contractor who shows up consistently on TikTok, Instagram, or YouTube with helpful content becomes the obvious choice when something breaks. Think of it as a referral that scales — one video can reach hundreds of local homeowners." }
    },
    {
      "@type": "Question",
      "name": "What platforms make the most sense for a handyman?",
      "acceptedAnswer": { "@type": "Answer", "text": "TikTok and Instagram Reels reach homeowners actively looking for tips and inspiration. YouTube Shorts builds long-term search authority for local home improvement queries. Facebook/Instagram is where older homeowners with higher household income spend time. LinkedIn helps if you target property managers or real estate investors." }
    },
    {
      "@type": "Question",
      "name": "How is this different from just posting photos of my work?",
      "acceptedAnswer": { "@type": "Answer", "text": "Photos show what you did. Educational videos show who you are and what you know. Video builds trust and positions you as the expert before someone even thinks about hiring. Photos get a like. Educational video gets a follow — and eventually a call." }
    },
  ]
};

const painPoints = [
  {
    icon: "📞",
    pain: "Word of mouth is drying up — you need new ways to get found",
    solution: "Educational home improvement content keeps you top-of-mind with every homeowner who follows you. When their toilet breaks or deck needs repairs, you're the contractor they already trust.",
  },
  {
    icon: "📸",
    pain: "You're too busy working to post — the camera never comes out",
    solution: "Your AI avatar does the posting. You do the work. 5 educational videos hit your platforms every week without you touching a camera after the initial 30-minute setup call.",
  },
  {
    icon: "💸",
    pain: "You lose bids to contractors with bigger online presence",
    solution: "Weekly educational content builds credibility that makes your bids more competitive. Clients who already trust you from your videos are less likely to price-shop.",
  },
];

const contentIdeas = [
  "5 Signs You Need to Replace Your Water Heater (Before It Fails)",
  "Why You Should Never Skip This One Step When Painting Interior Walls",
  "3 Things Every Homeowner Should Check Before Winter",
  "When to DIY and When to Call a Pro: A Contractor's Honest Guide",
  "The Most Common Plumbing Mistake Homeowners Make (And How to Avoid It)",
  "Why Caulking Your Windows Could Save You $500 This Year",
  "How to Tell If Your Home Has Electrical Code Violations",
  "The Truth About Deck Maintenance: What Most Contractors Won't Tell You",
  "How to Find a Good Handyman (From a Handyman's Perspective)",
  "Seasonal Home Maintenance Checklist: Spring Edition",
];

const plans = [
  { name: "Launch", price: "$397/mo", videos: "5/week", platforms: "IG, TT, LI, YT", publishing: "MP4 delivery", highlight: false },
  { name: "Starter", price: "$997/mo", videos: "5/week", platforms: "IG, TT, LI, YT", publishing: "Auto-publishing", highlight: true },
  { name: "Growth", price: "$1,997/mo", videos: "10+/week", platforms: "IG, TT, LI, YT", publishing: "Auto-publishing + White-glove", highlight: false },
];

export default function HandymanContractorsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-indigo-600/20 text-indigo-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-500/30 mb-6">
            For Handyman Contractors & Home Service Businesses
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Homeowners hire the contractor{" "}
            <span className="text-indigo-400">they already trust.</span>
            {" "}Become that contractor.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar, writes educational home improvement scripts, and publishes 5 videos a week to TikTok, Instagram, and YouTube — while you&apos;re on the job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ 5 videos every week</span>
            <span>✓ Setup in 30 minutes</span>
            <span>✓ No filming while on the job</span>
            <span>✓ Educational content that builds trust</span>
          </div>

          <div className="mt-10 inline-block bg-gray-900 border border-gray-700 rounded-xl px-6 py-4 text-left max-w-lg">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Real Result — Week 1</p>
            <p className="text-white text-sm leading-relaxed">
              &ldquo;WellPreparedLife grew their business <strong className="text-indigo-400">50% in their first week</strong> with Assurgit.&rdquo;
            </p>
            <p className="text-gray-500 text-xs mt-2">— Asa Rogers, Founder of Assurgit</p>
          </div>
        </section>

        {/* Pain Points */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            The problem contractors face — and how we solve it
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((p, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="text-3xl mb-4">{p.icon}</div>
                <p className="text-gray-400 text-sm italic mb-3">&ldquo;{p.pain}&rdquo;</p>
                <div className="w-8 h-0.5 bg-indigo-500 mb-3" />
                <p className="text-gray-200 text-sm leading-relaxed">{p.solution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            How it works — while you&apos;re out on the job
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We record your avatar and voice clone, brief on your service area and specialty, and note the types of homeowners you want to attract." },
              { step: "2", title: "We build your content calendar", desc: "Our research pipeline identifies what local homeowners are searching and what home improvement content is trending — then builds your weekly scripts around it." },
              { step: "3", title: "Scripts arrive Monday morning", desc: "5 educational scripts in your voice, ready for your review. Approve, request changes, or skip review entirely. The system runs regardless." },
              { step: "4", title: "Human QC before anything goes live", desc: "Every video is reviewed for rendering quality, caption accuracy, and professional presentation before it reaches homeowners." },
              { step: "5", title: "Published while you work", desc: "TikTok, Instagram, YouTube — all published automatically on the Starter plan. You get the results while you're on a job site." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-indigo-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
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
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-4">
            Sample content topics for contractors
          </h2>
          <p className="text-gray-400 text-center mb-8 max-w-xl mx-auto">
            Educational tips and how-tos that homeowners share and save — positioning you as the expert before they ever need to hire:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {contentIdeas.map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-4">Plans for contractors</h2>
          <p className="text-gray-400 text-center mb-10">Start with Launch to see the system work, then add more platforms as you grow.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900">
                  <th className="text-left py-4 px-5 font-semibold text-gray-400">Plan</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Price</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Videos/Week</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Platforms</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Publishing</th>
                  <th className="text-center py-4 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-indigo-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-indigo-400 font-bold">{plan.price}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{plan.videos}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{plan.platforms}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{plan.publishing}</td>
                    <td className="py-4 px-4 text-center">
                      <Link href="/book" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">Get Started →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            All plans include avatar + voice clone, human QC, and research-backed scripts.{" "}
            <Link href="/pricing" className="text-indigo-400 hover:underline">Full pricing →</Link>
          </p>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">Frequently asked questions</h2>
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
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Be the contractor homeowners think of first.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free 30-minute call. We&apos;ll show you what your content would look like and get your first videos live within a week.
            </p>
            <Link href="/book" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
            <p className="text-gray-600 text-xs mt-4">No commitment. No credit card. Just a conversation.</p>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/real-estate-agents" className="text-indigo-400 hover:underline">Real Estate Agents</Link>
            <Link href="/for/business-owners" className="text-indigo-400 hover:underline">Local Business Owners</Link>
            <Link href="/for/solopreneurs" className="text-indigo-400 hover:underline">Solopreneurs</Link>
            <Link href="/pricing" className="text-indigo-400 hover:underline">Full Pricing</Link>
            <Link href="/best/done-for-you-ai-video-service" className="text-indigo-400 hover:underline">Best Done-For-You AI Video</Link>
            <Link href="/" className="text-indigo-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
