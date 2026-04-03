import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Attorneys & Law Firms | Assurgit",
  description:
    "Done-for-you AI video content for attorneys and law firms. Build authority, attract clients, and stay top-of-mind with 5 educational legal videos per week — without filming. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Attorneys — Done For You",
    description:
      "Turn your legal expertise into 5 weekly videos published automatically. Build authority and attract clients without spending hours on content.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Attorneys",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content service for attorneys and law firms. 5 educational videos per week using your personal AI avatar and voice clone.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What kind of video content works best for attorneys on social media?",
      "acceptedAnswer": { "@type": "Answer", "text": "Educational content that demystifies legal processes performs best — 'What to do if you're in a car accident,' 'How long does a probate take,' 'When do you actually need an attorney vs. DIY?' Videos that answer questions potential clients are already Googling build trust before they ever call. Avoid overly promotional content; attorneys who teach get more inquiries than attorneys who advertise." }
    },
    {
      "@type": "Question",
      "name": "Is it ethical for attorneys to use AI-generated video content?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Assurgit creates content in your voice and based on your expertise — your scripts are reviewed before publishing, and the content reflects your actual knowledge and practice areas. This is no different from working with a content marketing agency that writes on your behalf, which attorneys have done for decades. You review and approve every script." }
    },
    {
      "@type": "Question",
      "name": "Do I need to disclose that I use AI for content creation?",
      "acceptedAnswer": { "@type": "Answer", "text": "Bar requirements on AI disclosure vary by state and are still evolving. We recommend consulting your state bar's guidance. What is clear: the content uses your actual face, your voice clone, and your reviewed expertise — it is not fabricated legal advice from a generic AI. You approve all scripts, ensuring accuracy and compliance." }
    },
    {
      "@type": "Question",
      "name": "How does Assurgit handle practice area specificity?",
      "acceptedAnswer": { "@type": "Answer", "text": "During the 30-minute setup call, we brief on your practice areas, jurisdiction, target clients, and any topics to avoid. All scripts are researched and written specifically for your niche — whether that's family law, personal injury, estate planning, immigration, or business law. You also have a 48-hour window to review and request revisions before anything publishes." }
    },
  ]
};

export default function AttorneysPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-500/30 mb-6">
            For Attorneys & Law Firms
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Your legal expertise,{" "}
            <span className="text-blue-400">building trust with clients</span>
            {" "}— every week, on autopilot
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches what potential clients in your practice area are searching for, and publishes 5 educational videos a week — while you focus on practicing law.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>

          {/* Value prop callouts */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { stat: "5 videos/week", label: "Published across your platforms" },
              { stat: "30 min", label: "One-time setup call — then it runs itself" },
              { stat: "$0 filming", label: "Your avatar appears on camera, not you" },
            ].map((item) => (
              <div key={item.stat} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-blue-400 font-black text-2xl mb-1">{item.stat}</p>
                <p className="text-gray-400 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            How it works for attorneys
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, capture your voice clone, and brief on your practice areas, jurisdiction, ideal clients, and any content boundaries (e.g., topics to avoid, pending matters)." },
              { step: "2", title: "Weekly research", desc: "Our pipeline tracks what potential clients in your market are searching for: legal questions, process explainers, rights they don't know they have, and myths worth busting." },
              { step: "3", title: "5 educational scripts every Monday", desc: "Written in your voice for your practice area. You get a 48-hour review window to approve as-is or request one round of revisions." },
              { step: "4", title: "Human QC before publishing", desc: "Every video is reviewed for quality, accuracy, and compliance with professional standards. Nothing goes live until it meets the mark." },
              { step: "5", title: "Published across your platforms", desc: "Instagram, TikTok, YouTube, LinkedIn — reaching people where they search for legal guidance before they ever pick up the phone." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-blue-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
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
            Sample content topics for attorneys
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "5 Mistakes People Make After a Car Accident (Before Calling a Lawyer)",
              "How Long Does Probate Actually Take? (The Real Answer)",
              "What Happens If You Die Without a Will in [Your State]",
              "The Difference Between a Felony and a Misdemeanor — And Why It Matters",
              "Should You Talk to the Police Without a Lawyer? (The Short Answer: No)",
              "3 Things You Must Do Immediately After a Workplace Injury",
              "How Custody Is Actually Decided (Not What TV Shows You)",
              "What Is an LLC and Do You Actually Need One?",
              "Immigration Status Myths That Could Cost You Everything",
              "When Is It Worth Hiring a Lawyer vs. Handling It Yourself?",
            ].map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for attorneys</h2>
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
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-blue-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-blue-400 font-bold">{plan.price}</td>
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
          <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Turn your expertise into client trust.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your content would look like. Start building authority in your practice area before your competitors do.
            </p>
            <Link href="/book" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/consultants" className="text-blue-400 hover:underline">Consultants</Link>
            <Link href="/for/financial-advisors" className="text-blue-400 hover:underline">Financial Advisors</Link>
            <Link href="/for/business-coaches" className="text-blue-400 hover:underline">Business Coaches</Link>
            <Link href="/pricing" className="text-blue-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-blue-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
