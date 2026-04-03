import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Best HeyGen Alternatives in 2026 (Ranked by What You Actually Get)",
  description:
    "The best HeyGen alternatives for businesses who want AI video content without doing it yourself. Ranked by how much you have to do, output quality, and real results.",
  openGraph: {
    title: "Best HeyGen Alternatives in 2026 (Ranked by What You Actually Get)",
    description:
      "The best HeyGen alternatives for businesses who want AI video content without doing it yourself. Ranked by effort, quality, and real results.",
    type: "article",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Best HeyGen Alternatives 2026",
  "description": "Ranked list of the best HeyGen alternatives for businesses, coaches, and consultants who want AI video content without doing it themselves.",
  "numberOfItems": 6,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Assurgit",
      "url": "https://assurgit.com",
      "description": "Fully done-for-you AI avatar video service. Your face, your voice, 5 short-form videos/week, published to 4 platforms automatically. Starting at $397/month."
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Synthesia",
      "url": "https://synthesia.io",
      "description": "DIY AI video platform. Stock or custom avatar. You write scripts, render, and publish yourself. $29–$1,250/month."
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "D-ID",
      "url": "https://d-id.com",
      "description": "Photo-based talking avatar platform. Less realistic than video-trained avatars. DIY. $9–$300/month."
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Colossyan",
      "url": "https://colossyan.com",
      "description": "Enterprise-focused AI video platform for training content. DIY. $21–$120/month."
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Pictory",
      "url": "https://pictory.ai",
      "description": "Text-to-video using stock footage. No personal avatar. Good for explainer content. $29–$99/month."
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "InVideo",
      "url": "https://invideo.io",
      "description": "Template-based video creation platform. No real avatar feature. $30–$60/month."
    },
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the best HeyGen alternatives?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best HeyGen alternatives in 2026 depend on what you need. If you want a fully done-for-you service where someone else handles scripts, rendering, and publishing, Assurgit is the top choice at $397/month. If you want another DIY avatar platform, Synthesia and D-ID are the closest competitors to HeyGen. If you want text-to-video with stock footage instead of an avatar, Pictory or InVideo may work."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a done-for-you alternative to HeyGen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Assurgit is a done-for-you AI video service — the only one in this list that handles research, scripting, rendering, quality control, and auto-publishing on your behalf. Every other HeyGen alternative is still a DIY tool where you do the work. Assurgit starts at $397/month and produces 5 videos/week using your personal AI avatar and cloned voice."
      }
    },
    {
      "@type": "Question",
      "name": "Why do people look for HeyGen alternatives?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most common reasons people look for HeyGen alternatives: (1) HeyGen requires significant time investment — you write scripts, operate the platform, and publish everything yourself. (2) Some users find the avatar quality or voice cloning less realistic than expected. (3) Others need a fully done-for-you service rather than a tool. (4) Pricing concerns — HeyGen's higher plans can be expensive for the volume of output. Most alternatives are still DIY tools; Assurgit is the exception."
      }
    },
    {
      "@type": "Question",
      "name": "Which HeyGen alternative is best for coaches and consultants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Assurgit is purpose-built for coaches, consultants, and professional service providers. It builds your personal AI avatar and voice clone, writes research-backed educational scripts every week, and auto-publishes to Instagram, TikTok, LinkedIn, and YouTube — all without you filming or editing. This is the opposite of what HeyGen and other DIY tools offer."
      }
    },
  ]
};

const services = [
  {
    rank: 1,
    name: "Assurgit",
    url: "/",
    tagline: "The only done-for-you alternative — your face, your voice, everything handled",
    isUs: true,
    price: "From $397/month",
    priceNote: "3 plans: $397, $997, $1,997",
    doItYourself: "Minimal (~30 min/week)",
    avatar: "Your personal AI avatar",
    voice: "Your cloned voice",
    publishing: "Auto-publish (Starter+) or MP4 delivery",
    platforms: "IG, TT, LI, YT",
    videosPerWeek: "5–10+",
    scriptsBy: "AI + research pipeline",
    bestFor: "Coaches, consultants, professionals wanting full automation",
    verdict: "The only HeyGen alternative that is truly done for you. Every other platform on this list is still a DIY tool. Assurgit handles research, scripting, rendering, QC, and publishing — with your personal avatar and voice.",
    proofPoint: "Client grew business 50% in first week",
    stars: 5,
  },
  {
    rank: 2,
    name: "Synthesia",
    url: "https://synthesia.io",
    tagline: "DIY enterprise AI video platform",
    isUs: false,
    price: "$29–$1,250/month",
    priceNote: "Personal to Enterprise tiers",
    doItYourself: "High — you script, render, post everything",
    avatar: "Stock avatars or custom avatar",
    voice: "AI voice or your clone (higher plans)",
    publishing: "You download and post manually",
    platforms: "You manage all platforms",
    videosPerWeek: "Limited by plan credits",
    scriptsBy: "You",
    bestFor: "Enterprise training and internal communications",
    verdict: "Strong platform for corporate training videos. Not designed for personal brand social media at volume. You do all the work.",
    proofPoint: null,
    stars: 3,
  },
  {
    rank: 3,
    name: "D-ID",
    url: "https://d-id.com",
    tagline: "Photo-based talking avatar platform",
    isUs: false,
    price: "$9–$300/month",
    priceNote: "Lite to Advanced tiers",
    doItYourself: "High — fully DIY",
    avatar: "Photo-animated avatar (less realistic)",
    voice: "TTS or voice upload",
    publishing: "You download and post manually",
    platforms: "You manage all platforms",
    videosPerWeek: "Credit-based",
    scriptsBy: "You",
    bestFor: "Budget-conscious creators wanting basic avatar video",
    verdict: "Lower entry price, but the photo-animation technology is noticeably less realistic than video-trained avatars. Good for low-stakes use cases. You still do everything yourself.",
    proofPoint: null,
    stars: 2,
  },
  {
    rank: 4,
    name: "Colossyan",
    url: "https://colossyan.com",
    tagline: "AI video for enterprise training — DIY",
    isUs: false,
    price: "$21–$120/month",
    priceNote: "Starter to Business tiers",
    doItYourself: "High — fully DIY",
    avatar: "Stock or custom avatar",
    voice: "AI voice",
    publishing: "You manage distribution",
    platforms: "Internal LMS focus",
    videosPerWeek: "Credit-based",
    scriptsBy: "You",
    bestFor: "HR teams producing internal training content",
    verdict: "Purpose-built for employee training and onboarding, not social media. If you need L&D video at scale and you have a team to manage it, Colossyan works. Not for personal brand building.",
    proofPoint: null,
    stars: 2,
  },
  {
    rank: 5,
    name: "Pictory",
    url: "https://pictory.ai",
    tagline: "Text-to-video with stock footage — no personal avatar",
    isUs: false,
    price: "$29–$99/month",
    priceNote: "Starter to Professional tiers",
    doItYourself: "Medium — you input text, platform assembles",
    avatar: "None — stock footage only",
    voice: "AI voiceover",
    publishing: "You download and post",
    platforms: "You manage all platforms",
    videosPerWeek: "Credit-based",
    scriptsBy: "You provide the text",
    bestFor: "Content repurposing: blog posts, podcasts into clip videos",
    verdict: "Useful for repurposing long-form content into video clips. No personal avatar means no authority-building personal brand value. Not a true HeyGen alternative — a different use case entirely.",
    proofPoint: null,
    stars: 2,
  },
  {
    rank: 6,
    name: "InVideo",
    url: "https://invideo.io",
    tagline: "Template-based video creation — no avatar",
    isUs: false,
    price: "$30–$60/month",
    priceNote: "Business and Unlimited tiers",
    doItYourself: "High — template selection, editing, posting all on you",
    avatar: "No avatar — template + stock footage",
    voice: "AI voiceover or upload",
    publishing: "You download and post",
    platforms: "You manage all platforms",
    videosPerWeek: "Unlimited templates",
    scriptsBy: "You",
    bestFor: "Marketers producing promotional or ad video at volume",
    verdict: "Not a HeyGen alternative in any meaningful sense — no avatar, no personal brand element. Template-based marketing video tool. Lowest quality signal for authority building.",
    proofPoint: null,
    stars: 1,
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

export default function BestHeyGenAlternativesPage() {
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
            Best HeyGen Alternatives in 2026 (Ranked by What You Actually Get)
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Most HeyGen alternatives are still DIY tools — you write the scripts, render the videos, and post everything yourself. This ranking is different. It&apos;s built around one question: <em>how much do you have to do?</em> If you want a tool, there are several good ones. If you want the content handled for you, there&apos;s really only one option.
          </p>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-sm">
            <p className="text-gray-400 mb-2"><strong className="text-white">How we ranked these alternatives:</strong></p>
            <div className="grid sm:grid-cols-2 gap-2 text-gray-500">
              <span>✓ How much YOU have to do each week</span>
              <span>✓ Authenticity (your face/voice vs. stock avatar)</span>
              <span>✓ Output volume and consistency</span>
              <span>✓ Auto-publishing vs. manual posting</span>
              <span>✓ Price relative to actual value delivered</span>
              <span>✓ Proven results for real businesses</span>
            </div>
          </div>
        </div>

        {/* Quick comparison table */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <h2 className="text-xl font-black text-white mb-6">Quick Comparison: All 6 HeyGen Alternatives</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-gray-400">
                  <th className="text-left py-3 px-4 font-semibold">#</th>
                  <th className="text-left py-3 px-4 font-semibold">Service</th>
                  <th className="text-left py-3 px-4 font-semibold">Price</th>
                  <th className="text-left py-3 px-4 font-semibold">Personal Avatar</th>
                  <th className="text-left py-3 px-4 font-semibold">Scripts Done For You</th>
                  <th className="text-left py-3 px-4 font-semibold">Auto-Publish</th>
                  <th className="text-left py-3 px-4 font-semibold">DIY Work</th>
                  <th className="text-left py-3 px-4 font-semibold">Rating</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.name} className={`border-t border-gray-800 ${s.isUs ? "bg-indigo-600/10" : ""}`}>
                    <td className="py-3 px-4 text-gray-500 font-bold">{s.rank}</td>
                    <td className="py-3 px-4 font-semibold text-white">
                      {s.name}
                      {s.isUs && <span className="ml-2 text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded">us</span>}
                    </td>
                    <td className="py-3 px-4 text-gray-300">{s.price}</td>
                    <td className="py-3 px-4 text-center">{s.avatar.includes("personal") || s.avatar.includes("Your") ? "✅" : s.avatar.includes("custom") ? "⚠️" : "❌"}</td>
                    <td className="py-3 px-4 text-center">{s.scriptsBy !== "You" ? "✅" : "❌"}</td>
                    <td className="py-3 px-4 text-center">{s.publishing.includes("Auto") ? "✅" : "❌"}</td>
                    <td className="py-3 px-4 text-center text-gray-300">{s.doItYourself}</td>
                    <td className="py-3 px-4"><Stars n={s.stars} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* The key insight callout */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-6">
            <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">The Key Distinction</p>
            <h2 className="text-xl font-black text-white mb-3">Every other alternative is still a tool. Assurgit is a service.</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Synthesia, D-ID, Colossyan, Pictory, and InVideo all require you to write the scripts, operate the platform, and post the content yourself. They compete with HeyGen on features and price. Assurgit doesn&apos;t compete with HeyGen at all — it replaces the entire workflow. Your scripts are written, your videos are rendered, your content is published. Every week. Without you.
            </p>
          </div>
        </div>

        {/* Detailed reviews */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12 mb-16">
          <h2 className="text-2xl font-black text-white">Full Reviews</h2>

          {services.map((s) => (
            <div key={s.name} className={`border rounded-2xl overflow-hidden ${s.isUs ? "border-indigo-500/50" : "border-gray-800"}`}>
              <div className={`px-6 py-5 flex items-start justify-between gap-4 ${s.isUs ? "bg-indigo-600/10" : "bg-gray-900"}`}>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-gray-500 text-sm font-bold">#{s.rank}</span>
                    <h3 className="text-xl font-black text-white">{s.name}</h3>
                    {s.isUs && <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full font-semibold">This Site</span>}
                  </div>
                  <p className="text-gray-400 text-sm">{s.tagline}</p>
                </div>
                <div className="text-right shrink-0">
                  <Stars n={s.stars} />
                  <p className="text-indigo-400 font-bold text-sm mt-1">{s.price}</p>
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
                    ["Scripts written by", s.scriptsBy],
                    ["Avatar", s.avatar],
                    ["Voice", s.voice],
                    ["Publishing", s.publishing],
                    ["Platforms", s.platforms],
                    ["Your weekly work", s.doItYourself],
                    ["Best for", s.bestFor],
                  ].map(([label, val]) => (
                    <div key={String(label)} className="flex gap-2">
                      <span className="text-gray-600 shrink-0 w-32">{label}:</span>
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
                    <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold px-5 py-2 rounded-lg text-sm transition-colors">
                      See Pricing
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Who should use which */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
          <h2 className="text-2xl font-black text-white mb-6">Who Should Use Which</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-gray-400">
                  <th className="text-left py-3 px-4 font-semibold">If you want…</th>
                  <th className="text-left py-3 px-4 font-semibold">Best choice</th>
                  <th className="text-left py-3 px-4 font-semibold">Why</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Everything done for you — scripts, videos, publishing", "Assurgit ($397/mo)", "The only truly done-for-you option on this list"],
                  ["DIY avatar platform with best quality", "Synthesia or HeyGen", "Strong platforms — but you do all the work yourself"],
                  ["Cheapest possible avatar video", "D-ID ($9/mo)", "Low cost, lower realism — fine for simple use cases"],
                  ["Enterprise training video at scale", "Colossyan", "Purpose-built for L&D teams, not social media"],
                  ["Repurpose blogs and podcasts into clips", "Pictory", "Good for content repurposing, not personal brand"],
                  ["Template-based promotional video", "InVideo", "Marketing video templates — not an avatar tool"],
                ].map(([want, choice, why]) => (
                  <tr key={String(want)} className="border-t border-gray-800">
                    <td className="py-3 px-4 text-gray-300">{want}</td>
                    <td className="py-3 px-4 text-indigo-400 font-semibold">{choice}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Social proof */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">Real Result</p>
            <p className="text-white text-lg font-bold mb-2">WellPreparedLife grew their business 50% in the first week with Assurgit.</p>
            <p className="text-gray-400 text-sm">Without filming a single new video. Without spending hours on any DIY tool.</p>
          </div>
        </div>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Want a HeyGen alternative that actually does it for you?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. We&apos;ll show you what your content would look like — your face, your voice — and get you live in under a week.
            </p>
            <Link href="/book" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call — Starts at $397/mo
            </Link>
          </div>
        </section>

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
            <Link href="/compare/assurgit-vs-heygen" className="text-indigo-400 hover:underline">Assurgit vs. HeyGen (Full Comparison)</Link>
            <Link href="/compare/assurgit-vs-synthesia" className="text-indigo-400 hover:underline">Assurgit vs. Synthesia</Link>
            <Link href="/best/done-for-you-ai-video-service" className="text-indigo-400 hover:underline">Best Done-For-You AI Video Services</Link>
            <Link href="/best/create-video-content-without-filming" className="text-indigo-400 hover:underline">How to Create Video Without Filming</Link>
            <Link href="/pricing" className="text-indigo-400 hover:underline">Pricing — from $397/mo</Link>
            <Link href="/" className="text-indigo-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
