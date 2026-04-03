import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Fitness Coaches | Assurgit",
  description:
    "Done-for-you AI video content for online and in-person fitness coaches. 5 educational videos per week — training tips, nutrition education, and authority content. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Fitness Coaches — Done For You",
    description:
      "Turn your fitness expertise into 5 weekly educational videos — published automatically. Build authority and attract clients without filming.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Fitness Coaches",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content for fitness coaches. 5 educational videos per week using your personal AI avatar and voice clone.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What video content works best for fitness coaches?",
      "acceptedAnswer": { "@type": "Answer", "text": "Short educational content that addresses the real questions your clients have: why people plateau, the truth about fat loss, how to structure a training week, what to eat around workouts, and how to build habits that stick. The best fitness content educates — it doesn't just show exercises. Coaches who explain the 'why' behind their approach build trust faster than coaches who just demo workouts." }
    },
    {
      "@type": "Question",
      "name": "Can Assurgit create content for online fitness coaching specifically?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Online fitness coaches have a different content strategy than gym-based trainers — the goal is to attract remote clients through educational authority content, not local foot traffic. Assurgit writes scripts that speak directly to online buyers: content about the online coaching experience, how remote accountability works, and the results your remote clients achieve." }
    },
    {
      "@type": "Question",
      "name": "Do I need to demonstrate exercises on camera?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Assurgit creates talking-head educational content — tips, explanations, myth-busting, mindset content — using your AI avatar. This is the format that builds personal connection and authority. For exercise demonstrations, you can continue filming those yourself optionally, but the weekly Assurgit content focuses on the educational authority that drives client inquiries." }
    },
    {
      "@type": "Question",
      "name": "How does Assurgit handle different fitness niches (weight loss, strength, sport-specific)?",
      "acceptedAnswer": { "@type": "Answer", "text": "During setup, we brief on your coaching specialty, target client, training philosophy, and any topics to avoid. All 5 weekly scripts are written for your specific niche — whether that's women's fat loss, powerlifting, marathon training, or corporate wellness. The research pipeline tracks what your ideal client is actively searching for each week." }
    },
  ]
};

export default function FitnessCoachesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-red-500/30 mb-6">
            For Fitness Coaches & Online Trainers
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Build the fitness brand that{" "}
            <span className="text-red-400">attracts clients before you ever speak to them</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches what your ideal client is searching for, and publishes 5 educational videos a week — while you coach and grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">How it works for fitness coaches</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, clone your voice, and brief on your coaching specialty, target client, and content philosophy." },
              { step: "2", title: "Weekly research", desc: "Our pipeline tracks what your ideal client is searching for: training questions, nutrition myths, motivation struggles, and fitness goals relevant to your niche." },
              { step: "3", title: "5 educational scripts every Monday", desc: "Written in your voice, for your niche. Tips, myth-busting, mindset content, and client FAQs — the content that builds trust before someone books a call." },
              { step: "4", title: "Human QC before publishing", desc: "Every video reviewed for quality and accuracy. You also receive scripts with a 48-hour review window." },
              { step: "5", title: "Published across your platforms", desc: "Instagram, TikTok, YouTube, LinkedIn — reaching your future clients every week, without you lifting a finger." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-red-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
                <div>
                  <p className="text-white font-semibold mb-1">{item.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">Sample content topics for fitness coaches</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Why You're Not Losing Fat (It's Not What You Think)",
              "How Many Days a Week Should You Actually Train?",
              "The Real Reason You're Not Building Muscle",
              "Cardio for Fat Loss: What Actually Works in 2026",
              "Why Most Fitness Advice Online Is Wrong for Women",
              "How to Train When You're Exhausted From Work",
              "The Truth About Protein Supplements (Do You Need Them?)",
              "Why People Quit the Gym After 6 Weeks — and How Not To",
              "Progressive Overload Explained Simply",
              "How Online Fitness Coaching Actually Works",
            ].map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for fitness coaches</h2>
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
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-red-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-red-400 font-bold">{plan.price}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{plan.videos}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{plan.platforms}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{plan.publishing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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

        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
          <div className="bg-red-600/10 border border-red-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Be the fitness coach clients find before they're ready to start.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your content would look like. Start publishing this week.
            </p>
            <Link href="/book" className="inline-block bg-red-600 hover:bg-red-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/personal-trainers" className="text-red-400 hover:underline">Personal Trainers</Link>
            <Link href="/for/wellness-coaches" className="text-red-400 hover:underline">Wellness Coaches</Link>
            <Link href="/for/nutritionists" className="text-red-400 hover:underline">Nutritionists</Link>
            <Link href="/pricing" className="text-red-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-red-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
