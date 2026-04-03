import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Best Done-For-You AI Video Service in 2025 (Ranked & Reviewed)",
  description:
    "Comparing the best done-for-you AI video content services in 2025. Rankings based on authenticity, price, output volume, and how hands-off the service actually is.",
  openGraph: {
    title: "Best Done-For-You AI Video Service in 2025 (Ranked & Reviewed)",
    description:
      "The honest ranking of done-for-you AI video services — who actually does it for you, who makes you do the work, and what each costs.",
    type: "article",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Best Done-For-You AI Video Services 2025",
  "description": "Ranked list of the best done-for-you AI video content services for businesses, coaches, and consultants.",
  "numberOfItems": 6,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Assurgit",
      "url": "https://assurgit.com",
      "description": "Fully done-for-you AI avatar + voice clone video service. Your face, your voice, 5 short-form videos/week, published to 4 platforms automatically. Starting at $397/month."
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Vidico",
      "url": "https://vidico.com",
      "description": "Premium video production agency. High-quality branded video content. Project-based pricing, typically $5,000–$50,000 per project."
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Single Grain",
      "url": "https://singlegrain.com",
      "description": "Full-service digital marketing agency with video content capabilities. Broad service scope, enterprise pricing."
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Content at Scale",
      "url": "https://contentatscale.ai",
      "description": "AI-powered content creation service. Primarily focused on written content and blog posts. Video is not a core service."
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "HeyGen (DIY)",
      "url": "https://heygen.com",
      "description": "DIY AI avatar video tool. You write the scripts, render the videos, and post them yourself. Starting at $29/month."
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Synthesia (DIY)",
      "url": "https://synthesia.io",
      "description": "DIY AI video creation platform. Enterprise-focused, stock avatars or custom. You handle scripting and publishing."
    },
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a done-for-you AI video service?",
      "acceptedAnswer": { "@type": "Answer", "text": "A done-for-you AI video service handles the entire video content production process — scripting, rendering, quality control, and publishing — without requiring the client to film, edit, or post anything. The best services use the client's actual face and voice (via AI avatar and voice clone) rather than generic stock avatars." }
    },
    {
      "@type": "Question",
      "name": "How much does a done-for-you AI video service cost?",
      "acceptedAnswer": { "@type": "Answer", "text": "Done-for-you AI video services range from $397/month (Assurgit Launch plan) to $50,000+ per project (traditional video agencies). The key price tiers are: $397–$1,997/month for fully managed AI-avatar services, $2,000–$5,000/month for hybrid human/AI approaches, and $5,000+ for traditional production companies." }
    },
    {
      "@type": "Question",
      "name": "What is the difference between done-for-you and DIY AI video tools?",
      "acceptedAnswer": { "@type": "Answer", "text": "DIY tools like HeyGen and Synthesia give you the technology to create AI videos yourself — you still write the scripts, operate the platform, and publish the videos. Done-for-you services handle all of that for you. The trade-off is price: DIY tools cost $29–$240/month while done-for-you services start around $397/month." }
    },
    {
      "@type": "Question",
      "name": "Which done-for-you AI video service is best for coaches and consultants?",
      "acceptedAnswer": { "@type": "Answer", "text": "Assurgit is purpose-built for coaches, consultants, and professional service providers who need to build authority through video but don't have time to film. It uses your personal AI avatar and voice clone, writes research-backed educational scripts, and auto-publishes to Instagram, TikTok, LinkedIn, and YouTube." }
    },
    {
      "@type": "Question",
      "name": "How do I know if a service is truly 'done for you'?",
      "acceptedAnswer": { "@type": "Answer", "text": "Ask four questions: (1) Do they write the scripts for you? (2) Do they render the videos? (3) Do they publish to your social accounts? (4) Do they use your face and voice, not a generic avatar? A real done-for-you service answers yes to all four. Many services answer yes to 1–2 but not all." }
    },
  ]
};

const services = [
  {
    rank: 1,
    name: "Assurgit",
    url: "/",
    tagline: "Your face, your voice, fully done for you",
    isUs: true,
    price: "From $397/month",
    priceNote: "3 plans: $397, $997, $1,997",
    scriptsBy: "AI + research pipeline",
    avatar: "Your personal AI avatar",
    voice: "Your cloned voice",
    publishing: "Auto-publish (Starter+) or MP4",
    platforms: "IG, TT, LI, YT",
    videosPerWeek: "5–10+",
    humanQC: true,
    contract: "Month-to-month",
    bestFor: "Coaches, consultants, professionals who want full automation",
    verdict: "The most complete done-for-you AI video service at this price point. 5 videos/week, your face and voice, no filming required.",
    proofPoint: "Client grew business 50% in first week",
    stars: 5,
  },
  {
    rank: 2,
    name: "Vidico",
    url: "https://vidico.com",
    tagline: "Premium video production agency",
    isUs: false,
    price: "$5,000–$50,000/project",
    priceNote: "Project-based, no monthly plan",
    scriptsBy: "Human creative team",
    avatar: "Actors or your team on camera",
    voice: "Real recording",
    publishing: "Delivered as files",
    platforms: "You handle distribution",
    videosPerWeek: "Varies by project",
    humanQC: true,
    contract: "Project-based",
    bestFor: "Brands needing high-production brand videos",
    verdict: "Exceptional quality, but 10–100× more expensive and not designed for ongoing social content at scale.",
    proofPoint: null,
    stars: 4,
  },
  {
    rank: 3,
    name: "Single Grain",
    url: "https://singlegrain.com",
    tagline: "Full-service digital marketing agency",
    isUs: false,
    price: "$5,000+/month (estimated)",
    priceNote: "Enterprise pricing, not published",
    scriptsBy: "Human marketing team",
    avatar: "Traditional video production",
    voice: "Real recording",
    publishing: "Managed posting",
    platforms: "Varies",
    videosPerWeek: "Varies",
    humanQC: true,
    contract: "Typically 6–12 month",
    bestFor: "Enterprise brands with full marketing budgets",
    verdict: "Broad agency with video capabilities. Not specialized in AI avatar content or personal brand authority.",
    proofPoint: null,
    stars: 3,
  },
  {
    rank: 4,
    name: "HeyGen (DIY)",
    url: "https://heygen.com",
    tagline: "AI avatar tool — you do the work",
    isUs: false,
    price: "$29–$240/month",
    priceNote: "Tool access only — no service",
    scriptsBy: "You",
    avatar: "Stock avatars or custom (paid add-on)",
    voice: "Generic TTS or voice clone",
    publishing: "You post manually",
    platforms: "You choose and manage",
    videosPerWeek: "However many you make yourself",
    humanQC: false,
    contract: "Monthly or annual",
    bestFor: "Creators with time to learn and operate the platform",
    verdict: "Powerful tool, but you handle everything. Requires consistent time investment to get results.",
    proofPoint: null,
    stars: 3,
  },
  {
    rank: 5,
    name: "Synthesia",
    url: "https://synthesia.io",
    tagline: "Enterprise AI video platform",
    isUs: false,
    price: "$29–$1,250/month",
    priceNote: "Personal to Enterprise tiers",
    scriptsBy: "You",
    avatar: "Stock avatars or custom",
    voice: "AI voice or your clone",
    publishing: "You post manually",
    platforms: "You choose and manage",
    videosPerWeek: "Limited by plan",
    humanQC: false,
    contract: "Annual plans",
    bestFor: "Internal training videos and enterprise communications",
    verdict: "Best for corporate training content. Not designed for personal brand social media at volume.",
    proofPoint: null,
    stars: 3,
  },
  {
    rank: 6,
    name: "Content at Scale",
    url: "https://contentatscale.ai",
    tagline: "AI content service — written, not video",
    isUs: false,
    price: "$250–$1,000+/month",
    priceNote: "Written content focus",
    scriptsBy: "AI",
    avatar: "None — no video service",
    voice: "None",
    publishing: "Blog/written content only",
    platforms: "Blog, LinkedIn (text)",
    videosPerWeek: "0",
    humanQC: true,
    contract: "Monthly",
    bestFor: "Businesses prioritizing SEO blog content",
    verdict: "Strong for written content. If you need video, this is not the service.",
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

export default function BestDoneForYouAIVideoPage() {
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
            Best Done-For-You AI Video Services in 2025: Ranked and Reviewed
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            &ldquo;Done-for-you AI video&rdquo; means something different depending on who you ask. Some services write the scripts but make you record yourself. Some create avatars but leave publishing to you. Very few do all of it. This ranking is built on one question: how much do <em>you</em> actually have to do?
          </p>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-sm">
            <p className="text-gray-400 mb-2"><strong className="text-white">How we ranked these services:</strong></p>
            <div className="grid sm:grid-cols-2 gap-2 text-gray-500">
              <span>✓ Authenticity (your face/voice vs. stock avatar)</span>
              <span>✓ How much YOU have to do</span>
              <span>✓ Output volume (videos/week)</span>
              <span>✓ Platform coverage (IG, TT, LI, YT)</span>
              <span>✓ Price relative to value</span>
              <span>✓ Proven client results</span>
            </div>
          </div>
        </div>

        {/* Quick comparison table */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <h2 className="text-xl font-black text-white mb-6">Quick Comparison: All 6 Services</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-gray-400">
                  <th className="text-left py-3 px-4 font-semibold">#</th>
                  <th className="text-left py-3 px-4 font-semibold">Service</th>
                  <th className="text-left py-3 px-4 font-semibold">Price</th>
                  <th className="text-left py-3 px-4 font-semibold">Your Face/Voice</th>
                  <th className="text-left py-3 px-4 font-semibold">Videos/Week</th>
                  <th className="text-left py-3 px-4 font-semibold">Auto-Publish</th>
                  <th className="text-left py-3 px-4 font-semibold">Your Work</th>
                  <th className="text-left py-3 px-4 font-semibold">Rating</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.name} className={`border-t border-gray-800 ${s.isUs ? "bg-indigo-600/10" : ""}`}>
                    <td className="py-3 px-4 text-gray-500 font-bold">{s.rank}</td>
                    <td className="py-3 px-4 font-semibold text-white">
                      {s.isUs ? s.name : s.name}
                      {s.isUs && <span className="ml-2 text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded">us</span>}
                    </td>
                    <td className="py-3 px-4 text-gray-300">{s.price}</td>
                    <td className="py-3 px-4 text-center">{s.avatar.includes("personal") || s.avatar.includes("Your") ? "✅" : "⚠️"}</td>
                    <td className="py-3 px-4 text-center text-gray-300">{s.videosPerWeek}</td>
                    <td className="py-3 px-4 text-center">{s.publishing.includes("Auto") ? "✅" : "❌"}</td>
                    <td className="py-3 px-4 text-center">{s.scriptsBy === "You" ? "High" : "Minimal"}</td>
                    <td className="py-3 px-4"><Stars n={s.stars} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                    ["Human QC", s.humanQC ? "Yes, every video" : "No"],
                    ["Contract", s.contract],
                    ["Best for", s.bestFor],
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
                    <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold px-5 py-2 rounded-lg text-sm transition-colors">
                      See Pricing
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* How to choose */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
          <h2 className="text-2xl font-black text-white mb-6">How to Choose the Right Service</h2>
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
                  ["Fully hands-off, 5 videos/week, your face and voice, under $500/mo", "Assurgit Launch ($397/mo)", "Only service combining personal avatar + full automation at this price"],
                  ["Maximum reach across all 4 platforms with auto-publishing", "Assurgit Starter ($997/mo)", "Full automation, weekly strategy, competitive intel"],
                  ["Ultra-high production quality for brand campaigns", "Vidico", "Human creative team, exceptional quality — but project-based, not weekly"],
                  ["DIY tool to create videos yourself when you have time", "HeyGen ($29/mo)", "Best-in-class DIY avatar tool, but you do all the work"],
                  ["Enterprise training videos at scale", "Synthesia", "Purpose-built for internal comms and training"],
                  ["AI-written blog content, not video", "Content at Scale", "Strong for written SEO content"],
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
            <Link href="/compare/assurgit-vs-heygen" className="text-indigo-400 hover:underline">Assurgit vs. HeyGen</Link>
            <Link href="/for/coaches" className="text-indigo-400 hover:underline">AI Video for Coaches</Link>
            <Link href="/for/consultants" className="text-indigo-400 hover:underline">AI Video for Consultants</Link>
            <Link href="/pricing" className="text-indigo-400 hover:underline">Pricing — from $397/mo</Link>
            <Link href="/" className="text-indigo-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
