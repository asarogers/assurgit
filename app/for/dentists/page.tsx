import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Dentists & Dental Practices | Assurgit",
  description:
    "Done-for-you AI video content for dentists and dental practices. Patient education, anxiety reduction, and local authority content — 5 videos per week. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Dentists — Done For You",
    description:
      "Turn your dental expertise into 5 weekly educational videos — published automatically. Build patient trust and reduce appointment anxiety before they walk in.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Dentists",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content for dentists and dental practices. 5 educational videos per week using your personal AI avatar and voice clone.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What video content works best for dental practices?",
      "acceptedAnswer": { "@type": "Answer", "text": "Patient education and anxiety reduction content consistently drives the most new patient inquiries. 'What actually happens during a root canal,' 'Is teeth whitening safe,' 'How long do veneers actually last,' and 'What to do about dental anxiety' address the real fears and questions stopping people from booking. Content that demystifies procedures reduces hesitation before patients call." }
    },
    {
      "@type": "Question",
      "name": "Can video content help a dental practice attract new patients?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Most people choose a dentist based on trust and familiarity — especially those who have dental anxiety. When potential patients have been watching your educational content for weeks before they search for a dentist, they already feel like they know you. That familiarity translates directly to appointment bookings. Practices that publish consistently see more 'I found you online' new patient inquiries." }
    },
    {
      "@type": "Question",
      "name": "Does Assurgit handle dental compliance for marketing content?",
      "acceptedAnswer": { "@type": "Answer", "text": "Every script is sent to you for review on Monday with a 48-hour window before anything renders. You can approve as-is, request revisions, or flag any compliance concerns. We write general patient education content — not specific clinical claims — and your review ensures everything meets professional and state dental board standards." }
    },
    {
      "@type": "Question",
      "name": "Can Assurgit create content for specific dental specialties like orthodontics or oral surgery?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. During setup, we brief on your specific specialty, patient population, and services. An orthodontist needs completely different content than a general dentist or oral surgeon. All scripts are researched and written for your specialty's specific patient questions, procedures, and concerns." }
    },
  ]
};

export default function DentistsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-cyan-600/20 text-cyan-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-cyan-500/30 mb-6">
            For Dentists & Dental Practices
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Reduce patient anxiety.{" "}
            <span className="text-cyan-400">Build the practice patients choose before they search.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches what potential patients in your area are searching for, and publishes 5 patient education videos a week — while you focus on your practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">How it works for dental practices</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, clone your voice, and brief on your specialty, patient population, key services, and any compliance or content guidelines." },
              { step: "2", title: "Weekly research", desc: "Our pipeline tracks what patients in your market are searching for: procedure questions, cost concerns, anxiety management, and comparison content ('invisalign vs braces')." },
              { step: "3", title: "5 patient education scripts every Monday", desc: "Written in your voice. Procedure explainers, myth-busting, and the content that converts anxious patients into booked appointments." },
              { step: "4", title: "Human QC + your review window", desc: "Every video reviewed for quality and clinical accuracy. Scripts come to you Monday with a 48-hour window to review before anything renders." },
              { step: "5", title: "Published across your platforms", desc: "Instagram, TikTok, YouTube, Facebook — reaching prospective patients where they search for dental providers." },
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

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">Sample content topics for dentists</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "What Actually Happens During a Root Canal (It's Not What You Think)",
              "Is Teeth Whitening Safe? The Honest Answer",
              "How to Handle Dental Anxiety (From a Dentist Who Hears This Every Day)",
              "Invisalign vs. Traditional Braces: Which Is Right for You?",
              "How Often Do You Actually Need to See a Dentist?",
              "Why Your Gums Are Bleeding — and When to Worry",
              "The Real Cost of Veneers in 2026",
              "What Dental Insurance Actually Covers (and What It Doesn't)",
              "How Long Do Dental Implants Last?",
              "5 Things Your Dentist Wishes You Did Differently",
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

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for dental practices</h2>
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
          <div className="bg-cyan-600/10 border border-cyan-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Be the dentist patients choose before they even search.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your patient education content would look like. Start publishing this week.
            </p>
            <Link href="/book" className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/chiropractors" className="text-cyan-400 hover:underline">Chiropractors</Link>
            <Link href="/for/physical-therapists" className="text-cyan-400 hover:underline">Physical Therapists</Link>
            <Link href="/for/attorneys" className="text-cyan-400 hover:underline">Attorneys</Link>
            <Link href="/pricing" className="text-cyan-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-cyan-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
