import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Consultants — Done For You | Assurgit",
  description:
    "Done-for-you AI video content for management and strategy consultants. Build authority online with weekly thought leadership videos — no filming required. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Consultants — Done For You",
    description:
      "Stop losing engagements to consultants who dominate LinkedIn. Get your AI avatar, scripts, and auto-publishing — all done for you.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Consultants",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content service for management and strategy consultants. Includes AI avatar creation, voice cloning, research-backed scripts, and auto-publishing to social media.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD", "priceSpecification": { "@type": "RecurringChargeSpecification", "billingPeriod": "Month" } },
  "areaServed": "US",
  "serviceType": "Video Content Marketing",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What kind of video content works for consultants?",
      "acceptedAnswer": { "@type": "Answer", "text": "Insight-driven, frameworks-based content works best for consultants. Short-form videos that name a problem your target clients have, offer a proprietary framework for thinking about it, and demonstrate the depth of your expertise — without giving away the full solution — consistently generate inbound inquiry from decision-makers." }
    },
    {
      "@type": "Question",
      "name": "Is LinkedIn the right platform for consultant video content?",
      "acceptedAnswer": { "@type": "Answer", "text": "LinkedIn is typically the highest-ROI platform for B2B consultants. It directly reaches CFOs, CEOs, VPs, and business owners who hire consultants. We also publish to YouTube for long-term search authority and to Instagram and TikTok for consultants who serve founder or SMB markets." }
    },
    {
      "@type": "Question",
      "name": "Will the content reflect my specific area of expertise?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. During setup, you share your domain, methodology, ideal client profile, and the problems you solve. Our writers research your space weekly and write every script around your specific niche — whether that's operational efficiency, go-to-market strategy, change management, or anything else." }
    },
    {
      "@type": "Question",
      "name": "How long does setup take?",
      "acceptedAnswer": { "@type": "Answer", "text": "Your AI avatar and voice clone are ready within 48–72 hours of your 30-minute setup call. Your first batch of videos publishes the Monday after setup completes. Total time investment from you: 30 minutes, once." }
    },
    {
      "@type": "Question",
      "name": "I bill at $300+ per hour. Is this worth my time?",
      "acceptedAnswer": { "@type": "Answer", "text": "At $397/month, one new client engagement pays for the service many times over. Most consultants who engage Assurgit recoup the cost within 30–60 days. The setup call is 30 minutes total. After that, you invest zero time — the system runs completely in the background." }
    },
  ]
};

const painPoints = [
  {
    icon: "🏆",
    pain: "Prospects short-list consultants they already know from LinkedIn — you're not on their radar",
    solution: "Weekly thought leadership videos on LinkedIn put your frameworks and insights directly in front of the buyers who will eventually need your services — before they ever run an RFP.",
  },
  {
    icon: "⏳",
    pain: "You're billing 50+ hours a week — content creation is the last thing you have energy for",
    solution: "Your AI avatar creates the content. You invest 30 minutes at setup. Every video after that publishes automatically while you stay focused on billable work.",
  },
  {
    icon: "🎯",
    pain: "Your expertise is deep but you struggle to translate it into content that resonates on social",
    solution: "Our researchers study what your target clients — C-suite leaders, VPs, business owners — are searching and discussing. We translate your expertise into the language and formats that actually perform.",
  },
];

const contentIdeas = [
  "The 3-Part Framework I Use to Diagnose Any Underperforming Business in 48 Hours",
  "Why Most Change Management Initiatives Fail in Month 3 (and How to Prevent It)",
  "The Difference Between a Strategic Problem and an Execution Problem",
  "5 Signs Your Company Is Ready to Hire Its First Strategy Consultant",
  "How to Build a Business Case That Gets Budget Approved Every Time",
  "Why McKinsey-Style Decks Don't Work for Mid-Market Companies",
  "The One Question I Ask Every New Client in the Discovery Call",
  "How to Identify the Real Decision-Maker Before You Write a Proposal",
  "What Good Operational Efficiency Actually Looks Like (Hint: It's Not Headcount Cuts)",
  "3 Metrics Every Operator Should Track Weekly But Almost Nobody Does",
];

const plans = [
  { name: "Launch", price: "$397/mo", videos: "5/week", platforms: "IG, TT, LI, YT", publishing: "MP4 delivery", highlight: false },
  { name: "Starter", price: "$997/mo", videos: "5/week", platforms: "IG, TT, LI, YT", publishing: "Auto-publishing", highlight: true },
  { name: "Growth", price: "$1,997/mo", videos: "10+/week", platforms: "IG, TT, LI, YT", publishing: "Auto-publishing + White-glove", highlight: false },
];

export default function ConsultantsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-indigo-600/20 text-indigo-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-500/30 mb-6">
            For Consultants
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Decision-makers hire consultants{" "}
            <span className="text-indigo-400">they already trust</span>
            {" "}— build that trust at scale
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, writes research-backed thought leadership scripts, and publishes to LinkedIn, Instagram, TikTok, and YouTube — every week, completely hands-free.
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
            <span>✓ 5 short-form videos every week</span>
            <span>✓ Setup in 30 minutes</span>
            <span>✓ First videos live within 5 days</span>
            <span>✓ No filming after setup</span>
            <span>✓ LinkedIn-first strategy available</span>
          </div>

          {/* Social proof callout */}
          <div className="mt-10 inline-block bg-gray-900 border border-gray-700 rounded-xl px-6 py-4 text-left max-w-lg">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Real Result — Week 1</p>
            <p className="text-white text-sm leading-relaxed">
              &ldquo;WellPreparedLife grew their business <strong className="text-indigo-400">50% in their first week</strong> with Assurgit — without filming a single new video.&rdquo;
            </p>
            <p className="text-gray-500 text-xs mt-2">— Asa Rogers, Founder of Assurgit</p>
          </div>
        </section>

        {/* Pain Points */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            The problem every consultant faces — and how we solve it
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
            How it works for consultants
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We capture your voice clone, build your avatar, and brief ourselves on your consulting domain, ideal client profile, and the transformation you deliver." },
              { step: "2", title: "We research your market every week", desc: "Our AI monitors what your target buyers — executives, operators, founders — are searching, asking, and debating. We build your content calendar around real signal, not guesswork." },
              { step: "3", title: "Scripts arrive Monday morning", desc: "5 insight-driven scripts in your voice and your framework language. Approve, request changes, or skip review — the system runs either way." },
              { step: "4", title: "Videos are rendered and human-reviewed", desc: "Every video goes through human QC before reaching your network. Caption accuracy, rendering quality, platform formatting — all verified." },
              { step: "5", title: "Auto-published to your platforms", desc: "LinkedIn, Instagram, TikTok, YouTube — published at optimal times, formatted per platform, with captions and hashtags. Zero manual work." },
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

        {/* Content Ideas */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-4">
            What your content looks like
          </h2>
          <p className="text-gray-400 text-center mb-8 max-w-xl mx-auto">
            Insight-driven, framework-based content that demonstrates your expertise without giving away the engagement. Here are examples of scripts we write for consultants:
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
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-4">
            Plans for consultants
          </h2>
          <p className="text-gray-400 text-center mb-10">
            One new client engagement typically covers the annual cost. Start with Launch and scale as your pipeline grows.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900">
                  <th className="text-left py-4 px-5 font-semibold text-gray-400">Plan</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Price</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Videos/Week</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Platforms</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Publishing</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400"></th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-indigo-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">Most Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-indigo-400 font-bold">{plan.price}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{plan.videos}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{plan.platforms}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{plan.publishing}</td>
                    <td className="py-4 px-4 text-center">
                      <Link href="/book" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                        Get Started →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            All plans include avatar + voice clone, human QC, and research-backed scripts.{" "}
            <Link href="/pricing" className="text-indigo-400 hover:underline">Full pricing details →</Link>
          </p>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            Frequently asked questions
          </h2>
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
              Start building authority. Start winning more engagements.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free 30-minute call. We&apos;ll show you exactly what your content would look like and recommend the right plan for your consulting practice.
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
            <Link href="/for/business-coaches" className="text-indigo-400 hover:underline">Business Coaches</Link>
            <Link href="/for/attorneys" className="text-indigo-400 hover:underline">Attorneys</Link>
            <Link href="/for/financial-advisors" className="text-indigo-400 hover:underline">Financial Advisors</Link>
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
