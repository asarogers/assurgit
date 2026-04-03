import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Best Video Content Service for Coaches in 2026 (Ranked)",
  description:
    "The best video content services for coaches in 2026. Ranked by consistency, authenticity, time investment, and real client results — not just features.",
  openGraph: {
    title: "Best Video Content Service for Coaches in 2026",
    description:
      "Which video content service actually works for coaches? Honest ranking based on output, automation level, and what coaches have to do each week.",
    type: "article",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Best Video Content Services for Coaches 2026",
  "description": "Ranked list of the best video content services for business coaches, life coaches, fitness coaches, and professional coaches in 2026.",
  "numberOfItems": 6,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Assurgit",
      "url": "https://assurgit.com",
      "description": "Done-for-you AI video content for coaches. Your personal AI avatar, your voice, 5 videos/week, auto-published. Proven results: WellPreparedLife grew 50% in week one. Starting at $397/month."
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Content creation agency (traditional)",
      "description": "Human content agency that films, edits, and publishes your video content. High quality, high cost — typically $3,000–10,000/month."
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "HeyGen (DIY)",
      "url": "https://heygen.com",
      "description": "DIY AI avatar tool for coaches who want to create their own videos. You write scripts, render videos, and post yourself. $29–$240/month."
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Repurpose.io",
      "url": "https://repurpose.io",
      "description": "Repurposing tool that distributes existing video content across platforms. Requires you to create the original content."
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "VidIQ / TubeBuddy",
      "url": "https://vidiq.com",
      "description": "YouTube optimization tools. Helpful for growing a YouTube channel, but not a content creation service."
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Fiverr video creator",
      "description": "Freelance video production from Fiverr. Variable quality, variable reliability — requires you to script and manage the process."
    },
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best video content service for coaches?",
      "acceptedAnswer": { "@type": "Answer", "text": "For coaches who want consistent, automated video content without filming or managing a production team, Assurgit is the best option at the $397–$1,997/month price range. It uses your personal AI avatar and voice clone, writes research-backed scripts for your coaching niche, and auto-publishes 5 videos per week. WellPreparedLife, a coaching service, grew their business 50% in their first week using Assurgit." }
    },
    {
      "@type": "Question",
      "name": "How much should a coach spend on video content?",
      "acceptedAnswer": { "@type": "Answer", "text": "Most coaches should expect to spend $397–$1,997/month for a fully managed video content service. Below $397/month, you're looking at DIY tools where you provide significant time and effort. Above $1,997/month, you're in traditional agency territory with higher production quality but more overhead. For most solo coaches and small coaching businesses, the $397–$997 range provides the best balance of output and cost." }
    },
    {
      "@type": "Question",
      "name": "Do coaches need to be on camera for video content to work?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Assurgit's AI avatar technology creates a digital version of your face and voice from a short video recording. Your avatar delivers the educational content on camera — you never need to film again after the initial setup. The content maintains your personal presence and authenticity while eliminating the friction of weekly filming sessions." }
    },
    {
      "@type": "Question",
      "name": "What types of coaches get the best results from video content?",
      "acceptedAnswer": { "@type": "Answer", "text": "Business coaches, life coaches, health and wellness coaches, fitness coaches, career coaches, and financial coaches all see strong results from consistent educational video content. The key is that coaching is a trust-based business — people hire coaches they know, like, and trust. Video content builds that familiarity before a prospect ever books a discovery call." }
    },
    {
      "@type": "Question",
      "name": "How quickly can a coach see results from video content?",
      "acceptedAnswer": { "@type": "Answer", "text": "WellPreparedLife saw 50% business growth in their first week. Results vary by niche, audience size, and baseline — but consistent weekly publishing typically produces measurable audience growth within 30–90 days. The key insight is that one video doesn't build authority; consistent weekly presence does. That's why automation matters: it removes the reason most coaches stop publishing." }
    },
  ]
};

const services = [
  {
    rank: 1,
    name: "Assurgit",
    category: "Done-For-You AI Video Content",
    isUs: true,
    price: "From $397/month",
    priceNote: "3 plans: $397, $997, $1,997",
    scripting: "Done for you — research-backed",
    filming: "No filming — AI avatar",
    publishing: "Auto-publish (Starter+) or MP4",
    timePerWeek: "~30 minutes (optional review)",
    outputPerWeek: "5 videos",
    humanQC: true,
    verdict: "The best option for coaches who want consistent content without the filming or production overhead. Your personal avatar, your voice, 5 videos every week. No filming required after setup.",
    proofPoint: "WellPreparedLife: 50% business growth in week one",
    stars: 5,
  },
  {
    rank: 2,
    name: "Content Agency (Traditional)",
    category: "Full-Service Content Agency",
    isUs: false,
    price: "$3,000–10,000/month",
    priceNote: "Project or retainer-based",
    scripting: "Human writers — high quality",
    filming: "Requires filming sessions",
    publishing: "Often included",
    timePerWeek: "2–4 hours (filming + reviews)",
    outputPerWeek: "2–5 videos",
    humanQC: true,
    verdict: "High production quality. Requires you to film on a schedule and costs significantly more. Best for coaches who want premium production and have the budget for it.",
    proofPoint: null,
    stars: 4,
  },
  {
    rank: 3,
    name: "HeyGen (DIY)",
    category: "DIY AI Avatar Tool",
    isUs: false,
    price: "$29–240/month",
    priceNote: "Tool only — you do the work",
    scripting: "You write it",
    filming: "No — AI avatar (you operate the tool)",
    publishing: "You post manually",
    timePerWeek: "5–15+ hours",
    outputPerWeek: "However many you make yourself",
    humanQC: false,
    verdict: "Cheap entry point, but you handle everything. For coaches with 10+ hours per week to invest in content creation. Not realistic for most coaches building an active practice.",
    proofPoint: null,
    stars: 3,
  },
  {
    rank: 4,
    name: "Repurpose.io",
    category: "Content Distribution Tool",
    isUs: false,
    price: "$25–100/month",
    priceNote: "Tool only",
    scripting: "Not included",
    filming: "Requires existing content",
    publishing: "Auto-distributes your existing content",
    timePerWeek: "Varies — requires original content creation",
    outputPerWeek: "Depends on what you provide",
    humanQC: false,
    verdict: "Useful for coaches who already create content and want better distribution. Doesn't solve the content creation problem — only the distribution layer.",
    proofPoint: null,
    stars: 3,
  },
  {
    rank: 5,
    name: "VidIQ / TubeBuddy",
    category: "YouTube Optimization",
    isUs: false,
    price: "$10–50/month",
    priceNote: "Tool only",
    scripting: "Basic AI suggestions only",
    filming: "Requires you to film",
    publishing: "YouTube-focused only",
    timePerWeek: "Significant — YouTube requires full production",
    outputPerWeek: "Depends on your filming",
    humanQC: false,
    verdict: "Strong for growing an established YouTube channel. Not a content creation service — requires significant filming and editing investment.",
    proofPoint: null,
    stars: 2,
  },
  {
    rank: 6,
    name: "Fiverr Video Creator",
    category: "Freelance Production",
    isUs: false,
    price: "$50–500/video",
    priceNote: "Per-project, variable quality",
    scripting: "You provide the brief",
    filming: "Requires footage or scripting from you",
    publishing: "You handle it",
    timePerWeek: "High — managing multiple freelancers",
    outputPerWeek: "Variable",
    humanQC: false,
    verdict: "Inconsistent quality and reliability. Best for one-off projects, not for the consistent weekly content strategy coaches need.",
    proofPoint: null,
    stars: 2,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-4 h-4 ${i <= n ? "text-yellow-400" : "text-gray-700"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function VideoContentServiceForCoachesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-yellow-500/20 text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-500/30">Best Of</span>
            <span className="text-gray-500 text-xs">Updated March 2026 · By Asa Rogers, Founder of Assurgit</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
            Best Video Content Service for Coaches in 2026: What Actually Works
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Coaching is a trust business. Clients hire coaches they know, like, and trust — and video content is the fastest way to build that at scale. But most coaches start strong and stop within 6 weeks because the process is too time-consuming. The best video content services solve this by removing the friction entirely. Here&apos;s what we found when we looked at every serious option.
          </p>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-sm">
            <p className="text-gray-400 mb-2"><strong className="text-white">The question we answered:</strong></p>
            <p className="text-gray-500">Which services produce consistent, high-quality video content for coaches — week after week — without requiring the coach to become a content creator?</p>
          </div>
        </div>

        {/* Case study highlight */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">Real Result — Coaching Business</p>
            <p className="text-white text-lg font-bold mb-2">WellPreparedLife grew their coaching business 50% in week one with Assurgit.</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              WellPreparedLife is a Bay Area meal prep and kitchen coaching service for seniors and disabled adults, run by Justine Sanidad. After partnering with Assurgit, they published 5 educational videos in their first week and grew their business by 50% — without filming a single new video themselves.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10 mb-16">
          <h2 className="text-2xl font-black text-white">Full Rankings</h2>

          {services.map((s) => (
            <div key={s.name} className={`border rounded-2xl overflow-hidden ${s.isUs ? "border-indigo-500/50" : "border-gray-800"}`}>
              <div className={`px-6 py-5 flex items-start justify-between gap-4 ${s.isUs ? "bg-indigo-600/10" : "bg-gray-900"}`}>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-gray-500 text-sm font-bold">#{s.rank}</span>
                    <h3 className="text-xl font-black text-white">{s.name}</h3>
                    {s.isUs && <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full font-semibold">This Site</span>}
                  </div>
                  <p className="text-yellow-500 text-xs font-semibold uppercase tracking-wider">{s.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <Stars n={s.stars} />
                  <p className="text-gray-300 font-bold text-sm mt-1">{s.price}</p>
                </div>
              </div>

              <div className="px-6 py-5 bg-gray-950">
                {s.proofPoint && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3 mb-4 text-sm text-emerald-400">
                    📈 <strong>Proven result:</strong> {s.proofPoint}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm mb-5">
                  {[
                    ["Scripting", s.scripting],
                    ["Filming required", s.filming],
                    ["Publishing", s.publishing],
                    ["Human QC", s.humanQC ? "Yes, every video" : "No"],
                    ["Your time/week", s.timePerWeek],
                    ["Output", s.outputPerWeek + "/week"],
                  ].map(([label, val]) => (
                    <div key={String(label)} className="flex gap-2">
                      <span className="text-gray-600 shrink-0 w-28">{label}:</span>
                      <span className="text-gray-300">{String(val)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-800 pt-4">
                  <p className="text-sm font-semibold text-white mb-1">Verdict</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.verdict}</p>
                </div>

                {s.isUs && (
                  <div className="mt-4 flex gap-3">
                    <Link href="/book" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors">
                      Book a Free Call
                    </Link>
                    <Link href="/best/video-content-service-for-coaches" className="border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold px-5 py-2 rounded-lg text-sm transition-colors">
                      See Pricing
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 mb-8">
          <h2 className="text-2xl font-black text-white mb-8">Frequently Asked Questions</h2>
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

        {/* Internal links */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/business-coaches" className="text-indigo-400 hover:underline">AI Video for Business Coaches</Link>
            <Link href="/for/wellness-coaches" className="text-indigo-400 hover:underline">AI Video for Wellness Coaches</Link>
            <Link href="/for/personal-trainers" className="text-indigo-400 hover:underline">AI Video for Personal Trainers</Link>
            <Link href="/best/done-for-you-ai-video-service" className="text-indigo-400 hover:underline">Best Done-For-You AI Video Services</Link>
            <Link href="/pricing" className="text-indigo-400 hover:underline">Pricing — from $397/mo</Link>
            <Link href="/" className="text-indigo-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
