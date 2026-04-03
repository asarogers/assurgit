import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Physical Therapists | Assurgit",
  description:
    "Done-for-you AI video content for physical therapists. Build authority and attract patients through educational movement and recovery content. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Physical Therapists — Done For You",
    description:
      "Turn your physical therapy expertise into 5 weekly videos — published automatically. Reach patients searching for answers about pain, recovery, and movement.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Physical Therapists",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content service for physical therapists. Build authority and attract patients through educational movement and recovery content.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What physical therapy topics get the most searches and engagement online?",
      "acceptedAnswer": { "@type": "Answer", "text": "Pain-related content dominates search volume: lower back pain, knee pain, shoulder issues, and sciatica. Exercise-specific content — what actually helps, what makes things worse, and common movement mistakes — also performs extremely well. People search for this information constantly, especially after new or recurring pain. PTs who consistently answer these questions build an audience that naturally turns to them when they're ready to seek treatment." }
    },
    {
      "@type": "Question",
      "name": "Can Assurgit create content specific to my PT specialty — like sports rehab or pelvic floor?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Your setup call is where we capture your specialty, your patient population, and the specific conditions you treat most. Whether you specialize in orthopedics, sports rehabilitation, pelvic floor PT, neurological rehab, or pediatrics, scripts are written to your niche and the specific questions your ideal patients are searching for." }
    },
    {
      "@type": "Question",
      "name": "How is the content framed to avoid giving harmful medical advice?",
      "acceptedAnswer": { "@type": "Answer", "text": "Scripts are written as educational content — explaining anatomy, pain science, movement principles, and recovery concepts — rather than prescribing specific treatment for any individual's condition. You review every script before it goes into production and can add appropriate language like 'consult a physical therapist if you're experiencing acute pain' wherever needed. Our team applies additional QC to ensure nothing could be misapplied or unsafe." }
    },
    {
      "@type": "Question",
      "name": "Does educational video content actually bring in new patients?",
      "acceptedAnswer": { "@type": "Answer", "text": "It's one of the highest-ROI patient acquisition strategies available to PTs because the intent behind the searches is so high. Someone searching 'why does my lower back hurt when I sit' or 'exercises for knee pain' is in pain right now and actively looking for help. A PT whose video answers that question becomes the obvious person to call. The content also builds long-term referral relationships — physicians and other providers notice when their patients mention watching your educational videos." }
    },
  ]
};

export default function PhysicalTherapistsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-cyan-600/20 text-cyan-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-cyan-500/30 mb-6">
            For Physical Therapists
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Patients in pain are searching for answers{" "}
            <span className="text-cyan-400">right now — be the PT they find</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches what your patients are searching for about pain and recovery, and publishes 5 educational videos a week — positioning you as the movement authority they call first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>

          {/* Value prop callout */}
          <div className="mt-12 max-w-2xl mx-auto bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 text-left">
            <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">Why Physical Therapists Win With Educational Content</p>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-white font-bold text-lg mb-2">Pain and injury content has high search intent — people need help now</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  When someone searches "why does my knee hurt going down stairs" or "lower back pain after sitting," they're not passively browsing — they're in discomfort and actively looking for answers. PTs who consistently answer those questions on video become the credible, trusted expert that potential patients call when they're ready to get real treatment.
                </p>
                <p className="text-gray-500 text-xs">— Asa Rogers, Founder of Assurgit</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            How it works for physical therapists
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, capture your voice clone, and brief on your specialty — orthopedics, sports rehab, pelvic floor, neurological, or general outpatient PT — and the patient population you serve." },
              { step: "2", title: "Weekly research", desc: "Our pipeline tracks what people are actively searching for about pain, movement, and recovery: specific body parts, conditions, exercises, and the 'should I just rest or see someone?' questions people Google constantly." },
              { step: "3", title: "5 educational scripts every Monday", desc: "Written in your voice, grounded in evidence-based PT principles. Educational content that explains the 'why' behind pain and movement — and demonstrates why seeing a physical therapist is the right next step." },
              { step: "4", title: "Human QC before publishing", desc: "Every video is reviewed for quality and clinical accuracy. Movement and pain content goes through additional care to ensure nothing could be misapplied or unsafe for someone with an acute injury." },
              { step: "5", title: "Published across your platforms", desc: "YouTube, Instagram, TikTok, Facebook — reaching people in pain who are looking for someone credible to trust with their recovery." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-cyan-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
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
            Sample content topics for physical therapists
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Why Your Lower Back Hurts When You Sit All Day",
              "3 Exercises That Actually Help Knee Pain (and 2 That Make It Worse)",
              "When to See a PT vs. Just Rest and Wait It Out",
              "Why Your Shoulder Keeps Impinging — and What's Actually Causing It",
              "The Real Reason Your Hip Flexors Are Always Tight",
              "What Sciatica Actually Is (Most People Have It Wrong)",
              "How to Tell If Ankle Pain Is a Sprain or Something More Serious",
              "The Problem With Foam Rolling Your IT Band",
              "Why 'Just Strengthen Your Core' Is Incomplete Advice for Back Pain",
              "What Physical Therapy Actually Involves — Session by Session",
            ].map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for physical therapists</h2>
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
                  { name: "Launch", price: "$397/mo", videos: "5/week", platforms: "YT, IG, TT, FB", publishing: "MP4 delivery", highlight: false },
                  { name: "Starter", price: "$997/mo", videos: "5/week", platforms: "YT, IG, TT, FB", publishing: "Auto-publishing", highlight: true },
                  { name: "Growth", price: "$1,997/mo", videos: "10+/week", platforms: "YT, IG, TT, FB", publishing: "Auto-publishing + White-glove", highlight: false },
                ].map((plan) => (
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-cyan-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-cyan-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-cyan-400 font-bold">{plan.price}</td>
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
          <div className="bg-cyan-600/10 border border-cyan-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Turn your expertise into reach.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your content would look like. Start reaching the patients who are searching for the help you provide right now.
            </p>
            <Link href="/book" className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/chiropractors" className="text-cyan-400 hover:underline">Chiropractors</Link>
            <Link href="/for/personal-trainers" className="text-cyan-400 hover:underline">Personal Trainers</Link>
            <Link href="/for/wellness-coaches" className="text-cyan-400 hover:underline">Wellness Coaches</Link>
            <Link href="/pricing" className="text-cyan-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-cyan-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
