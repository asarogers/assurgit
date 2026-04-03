import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Wellness Coaches | Assurgit",
  description:
    "Done-for-you AI video content for wellness coaches. Build authority, attract clients, and grow your practice with 5 educational videos per week. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Wellness Coaches — Done For You",
    description:
      "Turn your wellness expertise into 5 weekly videos — published automatically. Build the trust that converts followers into clients.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Wellness Coaches",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content service for wellness coaches. Build authority and attract clients through consistent educational video content.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What kind of wellness content performs best on social media?",
      "acceptedAnswer": { "@type": "Answer", "text": "Educational content that addresses real pain points — burnout, stress, sleep, energy — consistently outperforms promotional posts. Videos that answer questions your audience is already searching for build the trust that converts viewers into paying clients. Myth-busting content and practical tips they can apply immediately tend to get shared the most." }
    },
    {
      "@type": "Question",
      "name": "How does Assurgit make sure the content fits my wellness philosophy?",
      "acceptedAnswer": { "@type": "Answer", "text": "Your 30-minute setup call is where we capture your voice, your philosophy, and your specific approach to wellness — whether that's nervous system work, holistic nutrition, mindset coaching, or something else entirely. Every script is written to reflect your framework, not generic wellness advice." }
    },
    {
      "@type": "Question",
      "name": "Do clients actually make purchasing decisions based on educational video content?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — especially in wellness. People don't hire a wellness coach impulsively. They spend weeks or months researching, watching, and deciding whether they trust someone enough to invest. Consistent educational video content keeps you in front of them during that entire consideration phase, so when they're ready, you're the obvious choice." }
    },
    {
      "@type": "Question",
      "name": "Can you cover sensitive wellness topics like mental health or chronic illness?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, with appropriate care. Scripts are written to be educational and empowering — not diagnostic. We brief on your specific scope of practice and ensure content reflects what you're qualified to address. All videos go through human QC before publishing to make sure the framing is accurate and appropriate." }
    },
  ]
};

export default function WellnessCoachesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-violet-600/20 text-violet-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-violet-500/30 mb-6">
            For Wellness Coaches
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Build the trust that makes{" "}
            <span className="text-violet-400">clients choose you</span>
            {" "}— before they ever book a call
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches what your audience is searching for, and publishes 5 educational videos a week — positioning you as the authority in your wellness niche.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>

          {/* Value prop callout */}
          <div className="mt-12 max-w-2xl mx-auto bg-violet-500/10 border border-violet-500/30 rounded-2xl p-6 text-left">
            <p className="text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">Why Consistent Content Wins in Wellness</p>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-white font-bold text-lg mb-2">People invest in coaches they already trust</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Wellness clients don't make impulsive decisions. They watch, read, and research for weeks before reaching out. Coaches who show up consistently with educational content — answering real questions about stress, burnout, energy, and mindset — build that trust passively, at scale, without spending every hour on social media.
                </p>
                <p className="text-gray-500 text-xs">— Asa Rogers, Founder of Assurgit</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            How it works for wellness coaches
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, capture your voice clone, and brief on your specific wellness philosophy, niche audience, and scope of practice." },
              { step: "2", title: "Weekly research", desc: "Our pipeline tracks what your audience is actively searching for — burnout recovery, stress management, sleep, energy, morning routines, and more." },
              { step: "3", title: "5 educational scripts every Monday", desc: "Written in your voice, aligned with your framework. Content that teaches, builds trust, and makes your ideal client feel understood." },
              { step: "4", title: "Human QC before publishing", desc: "Every video is reviewed for quality, accuracy, and tone. Sensitive wellness topics are handled with appropriate framing before anything goes live." },
              { step: "5", title: "Published across your platforms", desc: "Instagram, TikTok, YouTube, LinkedIn — reaching people where they're already looking for guidance on their wellness journey." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-violet-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
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
            Sample content topics for wellness coaches
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "5 Signs You're Burned Out (and What Actually Helps)",
              "How to Build a Morning Routine That Actually Sticks",
              "The Difference Between Stress and Burnout",
              "What Holistic Wellness Actually Means (and What It Doesn't)",
              "Why Your Energy Crashes Every Afternoon — and How to Fix It",
              "3 Things That Are Quietly Destroying Your Sleep",
              "How to Set Boundaries Without Feeling Guilty",
              "The Nervous System Reset That Takes 5 Minutes",
              "Why Willpower Isn't the Problem With Your Health Goals",
              "What to Do When You Know What's Healthy But Still Can't Do It",
            ].map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for wellness coaches</h2>
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
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-violet-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-violet-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-violet-400 font-bold">{plan.price}</td>
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
          <div className="bg-violet-600/10 border border-violet-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Turn your expertise into reach.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your content would look like. Start building the authority that brings clients to you.
            </p>
            <Link href="/book" className="inline-block bg-violet-600 hover:bg-violet-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/personal-trainers" className="text-violet-400 hover:underline">Personal Trainers</Link>
            <Link href="/for/nutritionists" className="text-violet-400 hover:underline">Nutritionists & Dietitians</Link>
            <Link href="/for/chiropractors" className="text-violet-400 hover:underline">Chiropractors</Link>
            <Link href="/pricing" className="text-violet-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-violet-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
