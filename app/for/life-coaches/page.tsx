import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Life Coaches | Assurgit",
  description:
    "Done-for-you AI video content for life coaches. Stand out in a crowded market with consistent educational videos that build trust before the first call. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Life Coaches — Done For You",
    description:
      "Turn your life coaching expertise into 5 weekly videos — published automatically. Differentiate yourself before prospects ever book a discovery call.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Life Coaches",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content service for life coaches. Stand out in a crowded market through consistent educational video content that builds trust at scale.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does video content help life coaches in such a crowded market?",
      "acceptedAnswer": { "@type": "Answer", "text": "Life coaching is one of the most competitive personal services markets because there's no credential barrier to entry. The coaches who win are the ones who've built the most trust before the first conversation. Consistent educational video content — showing how you think, what you believe, and how you help people — differentiates you in a way a website bio or a one-time post never can." }
    },
    {
      "@type": "Question",
      "name": "Can the content reflect my specific coaching methodology or framework?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. During your setup call, we brief on your methodology, your coaching philosophy, the specific transformation you help clients achieve, and the language you use. Scripts are written to reflect your framework — not generic self-help advice that sounds like every other coach online." }
    },
    {
      "@type": "Question",
      "name": "What if my coaching niche is very specific — like divorce recovery or empty nest transitions?",
      "acceptedAnswer": { "@type": "Answer", "text": "Specificity is an advantage, not a limitation. Niche life coaches who publish consistently to their exact audience build faster and deeper trust than generalists. Our research pipeline identifies exactly what your target audience is searching for, and scripts are written to speak directly to their specific situation and concerns." }
    },
    {
      "@type": "Question",
      "name": "How many videos do I need before I see results?",
      "acceptedAnswer": { "@type": "Answer", "text": "There's no universal timeline, but consistency is the key variable. Life coaching clients often consume a coach's content for weeks or months before reaching out. The coaches who book consistently are the ones showing up in their audience's feed consistently — not the ones who posted six videos and stopped. Assurgit keeps that machine running without requiring your time." }
    },
  ]
};

export default function LifeCoachesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-purple-600/20 text-purple-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-purple-500/30 mb-6">
            For Life Coaches
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            In a crowded coaching market,{" "}
            <span className="text-purple-400">the coach who shows up consistently</span>
            {" "}wins
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches what your ideal clients are searching for, and publishes 5 educational videos a week — building the trust that converts strangers into paying clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>

          {/* Value prop callout */}
          <div className="mt-12 max-w-2xl mx-auto bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 text-left">
            <p className="text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">The Life Coaching Content Problem</p>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-white font-bold text-lg mb-2">Your prospects spend weeks deciding before they ever reach out</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Life coaching clients don't book impulsively. They research, watch, compare, and decide — often over weeks or months. The coaches who earn those bookings are the ones who showed up in their feed consistently, built trust through educational content, and felt like the obvious choice before a discovery call was ever scheduled.
                </p>
                <p className="text-gray-500 text-xs">— Asa Rogers, Founder of Assurgit</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            How it works for life coaches
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, capture your voice clone, and brief on your coaching framework, your ideal client, the transformation you deliver, and how you talk about your work." },
              { step: "2", title: "Weekly research", desc: "Our pipeline identifies what your target audience is actively searching for: goal-setting struggles, mindset blocks, decision-making, relationship patterns, and the specific challenges your niche faces." },
              { step: "3", title: "5 educational scripts every Monday", desc: "Written in your voice, reflecting your methodology. Content that demonstrates how you think, builds trust in your approach, and makes your ideal client feel understood." },
              { step: "4", title: "Human QC before publishing", desc: "Every video is reviewed for quality, tone, and alignment with your coaching philosophy before anything goes live." },
              { step: "5", title: "Published across your platforms", desc: "Instagram, TikTok, YouTube, LinkedIn — reaching people at the exact moment they're searching for the clarity and direction you provide." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-purple-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
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
            Sample content topics for life coaches
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Why You Keep Setting Goals and Not Reaching Them",
              "The Real Reason You're Stuck (It's Not Motivation)",
              "How to Make Decisions Without Overthinking Every Option",
              "The Difference Between Being Busy and Making Progress",
              "Why Self-Sabotage Happens and How to Break the Pattern",
              "How to Figure Out What You Actually Want",
              "The One Mindset Shift That Changes Everything",
              "Why You Feel Behind in Life (and How to Stop Comparing)",
              "How to Build Confidence When You Don't Feel Ready",
              "What 'Doing the Work' Actually Looks Like in Real Life",
            ].map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for life coaches</h2>
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
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-purple-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-purple-400 font-bold">{plan.price}</td>
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
          <div className="bg-purple-600/10 border border-purple-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Turn your expertise into reach.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your content would look like. Start showing up consistently for the clients who need what you offer.
            </p>
            <Link href="/book" className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/business-coaches" className="text-purple-400 hover:underline">Business Coaches</Link>
            <Link href="/for/career-coaches" className="text-purple-400 hover:underline">Career Coaches</Link>
            <Link href="/for/wellness-coaches" className="text-purple-400 hover:underline">Wellness Coaches</Link>
            <Link href="/pricing" className="text-purple-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-purple-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
