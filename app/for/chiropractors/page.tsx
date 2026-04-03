import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Chiropractors | Assurgit",
  description:
    "Done-for-you AI video content for chiropractors and chiropractic practices. 5 educational videos per week — patient education, pain relief tips, and authority content. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Chiropractors — Done For You",
    description:
      "Turn your chiropractic expertise into 5 weekly educational videos — published automatically. Build authority and attract new patients without filming.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Chiropractors",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content for chiropractors. 5 educational videos per week using your personal AI avatar and voice clone.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What type of video content works for chiropractors?",
      "acceptedAnswer": { "@type": "Answer", "text": "Patient education content performs extremely well: explaining what causes back pain, posture correction tips, when you should (and shouldn't) see a chiropractor, what to expect on your first visit, and myth-busting ('chiropractic is not just back cracking'). Content that addresses people's hesitations and questions before they book converts better than promotional posts." }
    },
    {
      "@type": "Question",
      "name": "Can Assurgit target specific patient types like athletes, pregnant women, or office workers?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. During setup, we brief on your target patients — whether that's athletes, desk workers with neck pain, prenatal patients, seniors with degenerative conditions, or families. All scripts are written to speak directly to that audience's pain points and questions." }
    },
    {
      "@type": "Question",
      "name": "Do I need to demonstrate adjustments on camera?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Your AI avatar delivers educational content — explanations, tips, myth-busting, patient education — without you needing to perform on camera. The content is talking-head style, perfect for social media reach. After your initial 30-minute setup call, the system runs automatically." }
    },
    {
      "@type": "Question",
      "name": "How does Assurgit handle medical accuracy for chiropractic content?",
      "acceptedAnswer": { "@type": "Answer", "text": "Every script goes through human QC before publishing, and you receive scripts each Monday with a 48-hour review window. You can approve as-is or request revisions. Nothing publishes without passing review. We write educational content — not medical advice — and your review ensures clinical accuracy." }
    },
  ]
};

export default function ChiropractorsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-teal-600/20 text-teal-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-teal-500/30 mb-6">
            For Chiropractors & Chiropractic Practices
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Educate patients before they walk in.{" "}
            <span className="text-teal-400">Build authority that books appointments.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches what patients in your area are searching for, and publishes 5 educational videos a week — while you focus on your practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>

          {/* Value props */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { stat: "5 videos/week", label: "Patient education content, published automatically" },
              { stat: "30 min", label: "One-time setup — then the system runs itself" },
              { stat: "No filming", label: "Your avatar appears on camera, not you" },
            ].map((item) => (
              <div key={item.stat} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-teal-400 font-black text-2xl mb-1">{item.stat}</p>
                <p className="text-gray-400 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            How it works for chiropractors
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, capture your voice clone, and brief on your specialties, target patients, geographic market, and any conditions or claims you want to stay away from." },
              { step: "2", title: "Weekly research", desc: "Our pipeline tracks what patients in your area are searching for: back pain, neck stiffness, sciatica, headaches, posture, sports injuries, and more." },
              { step: "3", title: "5 educational scripts every Monday", desc: "Written in your voice, for your target patient. Tips, explainers, myth-busting, and real patient concerns answered — the content that builds trust before the first appointment." },
              { step: "4", title: "Human QC before publishing", desc: "Every video is reviewed for quality, clinical accuracy, and presentation. You can also review scripts yourself before they render." },
              { step: "5", title: "Published across your platforms", desc: "Instagram, TikTok, YouTube, LinkedIn — reaching people the week before they decide which chiropractor to call." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-teal-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
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
            Sample content topics for chiropractors
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Why Your Back Hurts When You Wake Up (and What to Do About It)",
              "3 Stretches That Actually Help Sciatica",
              "Is Chiropractic Safe During Pregnancy? The Real Answer",
              "What Happens During a Chiropractic Adjustment — Step by Step",
              "5 Posture Mistakes Desk Workers Make Every Day",
              "The Difference Between a Chiropractor and a Physical Therapist",
              "Can Chiropractic Help With Headaches and Migraines?",
              "How Many Visits Does It Actually Take to Feel Better?",
              "When Back Pain Is Serious Enough to See a Doctor",
              "Why Athletes Swear by Regular Chiropractic Care",
            ].map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for chiropractors</h2>
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
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-teal-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-teal-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-teal-400 font-bold">{plan.price}</td>
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
          <div className="bg-teal-600/10 border border-teal-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Become the chiropractor everyone in your area knows.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your content would look like. Start publishing educational videos this week.
            </p>
            <Link href="/book" className="inline-block bg-teal-600 hover:bg-teal-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/personal-trainers" className="text-teal-400 hover:underline">Personal Trainers</Link>
            <Link href="/for/wellness-coaches" className="text-teal-400 hover:underline">Wellness Coaches</Link>
            <Link href="/for/nutritionists" className="text-teal-400 hover:underline">Nutritionists & Dietitians</Link>
            <Link href="/pricing" className="text-teal-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-teal-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
