import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Meal Prep Coaches & Kitchen Educators | Assurgit",
  description:
    "Done-for-you AI video content for meal prep coaches, nutrition educators, and kitchen coaching businesses. WellPreparedLife grew 50% in week one. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Meal Prep Coaches — Done For You",
    description:
      "Turn your meal prep expertise into 5 weekly videos — published automatically. See how WellPreparedLife grew 50% in their first week with Assurgit.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Meal Prep Coaches",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content service for meal prep coaches and kitchen educators. Proven result: WellPreparedLife grew 50% in week one.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What content works best for meal prep coaches on social media?",
      "acceptedAnswer": { "@type": "Answer", "text": "Quick tip videos (5 meal prep mistakes, 3 freezer meal hacks), educational content about nutrition for specific populations (seniors, people with diabetes, busy families), and behind-the-scenes system videos all perform well. The key is educational value — content people save and share — not just promotional posts." }
    },
    {
      "@type": "Question",
      "name": "Can Assurgit write scripts for niche audiences like seniors or people with dietary restrictions?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. During setup, we brief on your specific audience — whether that's seniors, people managing diabetes, busy caregivers, or families on a budget. All scripts are researched and written to speak directly to your niche, in your voice." }
    },
    {
      "@type": "Question",
      "name": "How did WellPreparedLife grow 50% in their first week?",
      "acceptedAnswer": { "@type": "Answer", "text": "WellPreparedLife (wellpreppedlife.com) is a Bay Area meal prep and kitchen coaching service for seniors and disabled adults, managed by Justine Sanidad. With Assurgit handling their video content — 5 educational videos per week published across platforms — they grew their business 50% in week one. The consistent educational content built trust and visibility with their exact target audience." }
    },
    {
      "@type": "Question",
      "name": "Do I need to cook on camera?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Your AI avatar delivers the educational content — your face, your voice — without you needing to film in the kitchen every week. After the initial 30-minute setup call, the system runs automatically." }
    },
  ]
};

export default function MealPrepCoachesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-emerald-600/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/30 mb-6">
            For Meal Prep Coaches & Kitchen Educators
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Your meal prep expertise,{" "}
            <span className="text-emerald-400">reaching hundreds of people</span>
            {" "}— every week, on autopilot
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches what your audience is searching for, and publishes 5 educational videos a week — while you focus on cooking and coaching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>

          {/* Featured case study */}
          <div className="mt-12 max-w-2xl mx-auto bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-left">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">Featured Client Result</p>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-white font-bold text-lg mb-2">WellPreparedLife: 50% business growth in week one</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  WellPreparedLife is a Bay Area meal prep and kitchen coaching service for seniors and disabled adults, run by Justine Sanidad. After partnering with Assurgit, they published 5 educational videos in their first week — and grew their business by 50%. Without filming a single new video themselves.
                </p>
                <p className="text-gray-500 text-xs">— Asa Rogers, Founder of Assurgit</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            How it works for meal prep coaches
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, capture your voice clone, and brief on your audience — seniors, families, people with dietary restrictions, whatever your niche is." },
              { step: "2", title: "Weekly research", desc: "Our pipeline tracks what your target audience is searching for: seasonal recipes, dietary tips, caregiver needs, meal planning for specific conditions." },
              { step: "3", title: "5 educational scripts every Monday", desc: "Written in your voice, tailored to your audience. Tips, how-tos, myth-busting, and practical advice that builds trust before anyone books a session." },
              { step: "4", title: "Human QC before publishing", desc: "Every video is reviewed for quality, accuracy, and presentation. Nothing goes live until it meets the standard." },
              { step: "5", title: "Published across your platforms", desc: "Instagram, TikTok, YouTube, LinkedIn — reaching people where they're already looking for exactly what you teach." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-emerald-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
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
            Sample content topics for meal prep coaches
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "5 Meal Prep Mistakes That Are Wasting Your Time (and Money)",
              "The Best Freezer Meals for Seniors With Dietary Restrictions",
              "How to Meal Prep for the Whole Week in Under 2 Hours",
              "Kitchen Setup Tips for People With Limited Mobility",
              "3 High-Protein Lunches That Prep in 15 Minutes",
              "Why Most Meal Prep Advice Is Wrong for Seniors",
              "How to Simplify Cooking When You're a Family Caregiver",
              "The Real Cost of Not Meal Prepping (Most People Don't Calculate This)",
              "Batch Cooking vs. Meal Prepping: What's the Difference?",
              "5 Kitchen Tools Every Meal Prepper Actually Needs",
            ].map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for meal prep coaches</h2>
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
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-emerald-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-emerald-400 font-bold">{plan.price}</td>
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
          <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Turn your expertise into reach.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your content would look like. Join WellPreparedLife and other coaches growing their business with Assurgit.
            </p>
            <Link href="/book" className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/nutritionists" className="text-emerald-400 hover:underline">Nutritionists & Dietitians</Link>
            <Link href="/for/wellness-coaches" className="text-emerald-400 hover:underline">Wellness Coaches</Link>
            <Link href="/for/business-coaches" className="text-emerald-400 hover:underline">Business Coaches</Link>
            <Link href="/pricing" className="text-emerald-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-emerald-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
