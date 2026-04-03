import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Business Coaches — Done For You | Assurgit",
  description:
    "Done-for-you AI video content for business coaches. Your face, your voice, thought leadership videos published weekly to Instagram, TikTok, LinkedIn, and YouTube. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Business Coaches — Done For You",
    description:
      "Stop losing coaching clients to coaches who show up online every week. Get your AI avatar, scripts, and auto-publishing — all done for you.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Business Coaches",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content service for business coaches. Includes AI avatar creation, voice cloning, research-backed scripts, and auto-publishing to social media.",
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
      "name": "What kind of video content works for business coaches?",
      "acceptedAnswer": { "@type": "Answer", "text": "Thought leadership and tactical how-to content consistently drives the most client inquiries for business coaches. Short-form videos covering leadership frameworks, revenue growth tactics, mindset shifts, and behind-the-scenes business decisions position you as the expert and attract your ideal high-ticket client — without pitching." }
    },
    {
      "@type": "Question",
      "name": "Will the AI avatar actually sound and look like me?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. During your 30-minute setup call, we capture your voice and build a lip-synced avatar from your footage. The result is a digital twin that speaks in your cadence, uses your expressions, and delivers your personality on camera — indistinguishable from you recording a new video." }
    },
    {
      "@type": "Question",
      "name": "How quickly will I see results from video content as a business coach?",
      "acceptedAnswer": { "@type": "Answer", "text": "Most coaches see meaningful engagement and inbound DMs within 3–4 weeks of consistent posting. The first week is about establishing presence. By week four, the algorithm starts distributing your content to cold audiences. WellPreparedLife grew their business 50% in their first week — results will vary by niche and audience warmth." }
    },
    {
      "@type": "Question",
      "name": "Do I need to film anything after setup?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. After your one-time 30-minute setup call, we handle everything — research, scripting, rendering, QC, and publishing. You can optionally review scripts Monday mornings. If you don't review, the system publishes automatically." }
    },
    {
      "@type": "Question",
      "name": "Can you write scripts in my specific coaching methodology?",
      "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. During setup, you share your frameworks, language, and client transformation story. Our writers embed your methodology and vocabulary into every script so content feels native to your brand — not generic coaching advice." }
    },
  ]
};

const painPoints = [
  {
    icon: "📉",
    pain: "Prospects choose the coach they've been watching for months — not you",
    solution: "Weekly content puts your name and face in front of your ideal clients every week, building the parasocial trust that converts cold audiences into paying clients.",
  },
  {
    icon: "🎥",
    pain: "You know you should be on video but coaching calls leave no time to film and edit",
    solution: "Your AI avatar does the filming. You show up once at setup. Five polished videos publish every week while you focus on delivering results for current clients.",
  },
  {
    icon: "💡",
    pain: "You keep recycling the same 3 content ideas and burning out on content creation",
    solution: "Our AI researches what your target clients are actually searching and struggling with each week — and builds a fresh content calendar around it. You never stare at a blank page.",
  },
];

const contentIdeas = [
  "The #1 Reason Entrepreneurs Hit a Revenue Ceiling at $10K/Month",
  "3 Leadership Habits That Separate 6-Figure Coaches from 7-Figure Ones",
  "Why Most Business Plans Are a Waste of Time (and What to Do Instead)",
  "How to Price Your Coaching Offer Without Undervaluing Your Expertise",
  "The 5-Minute Morning Routine That Runs My $500K Business",
  "How to Fire a Client Without Burning the Relationship",
  "Why Your Sales Calls Are Failing (and the One Shift That Fixes It)",
  "What I Wish I Knew Before Launching My First Group Coaching Program",
  "The Referral System That Fills My Coaching Calendar Every Month",
  "How to Create a Signature Framework Clients Actually Remember",
];

const plans = [
  { name: "Launch", price: "$397/mo", videos: "5/week", platforms: "IG, TT, LI, YT", publishing: "MP4 delivery", highlight: false },
  { name: "Starter", price: "$997/mo", videos: "5/week", platforms: "IG, TT, LI, YT", publishing: "Auto-publishing", highlight: true },
  { name: "Growth", price: "$1,997/mo", videos: "10+/week", platforms: "IG, TT, LI, YT", publishing: "Auto-publishing + White-glove", highlight: false },
];

export default function BusinessCoachesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-indigo-600/20 text-indigo-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-500/30 mb-6">
            For Business Coaches
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Your ideal clients hire the coach they{" "}
            <span className="text-indigo-400">see every week</span>
            {" "}— make sure that&apos;s you
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, writes research-backed thought leadership scripts, and publishes to LinkedIn, Instagram, TikTok, and YouTube — every week, on autopilot.
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
            <span>✓ Scripts written in your voice</span>
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
            The problem every business coach faces — and how we solve it
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
            How it works for business coaches
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We record your avatar, capture your voice clone, and brief ourselves on your coaching methodology, ideal client, and the transformation you deliver." },
              { step: "2", title: "We research your niche every week", desc: "Our AI monitors what aspiring entrepreneurs, early-stage founders, and business owners are searching and struggling with — then builds your content calendar around real demand." },
              { step: "3", title: "Scripts arrive Monday morning", desc: "5 thought leadership scripts written in your voice and vocabulary. Approve, request one round of changes, or skip review — the system publishes either way." },
              { step: "4", title: "Videos are rendered and human-reviewed", desc: "Every video goes through human QC before reaching your audience. Caption accuracy, rendering quality, platform formatting — all checked." },
              { step: "5", title: "Auto-published across your platforms", desc: "LinkedIn, Instagram, TikTok, YouTube — posted at optimal times, formatted per platform. You never touch a scheduling tool." },
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
            Tactical, trust-building content that positions you as the definitive expert — not a pitch. Here are examples of the type of scripts we write for business coaches:
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
            Plans for business coaches
          </h2>
          <p className="text-gray-400 text-center mb-10">
            Start with Launch to prove the system works, then scale up as you see results.
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
              Start showing up. Start attracting clients.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free 30-minute call. We&apos;ll show you exactly what your content would look like and recommend the right plan for your coaching business.
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
            <Link href="/for/consultants" className="text-indigo-400 hover:underline">Consultants</Link>
            <Link href="/for/personal-trainers" className="text-indigo-400 hover:underline">Personal Trainers</Link>
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
