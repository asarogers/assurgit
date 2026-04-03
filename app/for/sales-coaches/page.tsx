import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Sales Coaches & Trainers | Assurgit",
  description:
    "Done-for-you AI video content for sales coaches and sales trainers. Build authority, attract corporate clients, and stay top-of-mind with 5 videos per week. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Sales Coaches — Done For You",
    description:
      "Turn your sales expertise into 5 weekly educational videos — published automatically. Build the authority that attracts corporate training contracts.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Sales Coaches",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content for sales coaches and trainers. 5 educational videos per week using your personal AI avatar and voice clone.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What video content works best for sales coaches on LinkedIn and social media?",
      "acceptedAnswer": { "@type": "Answer", "text": "Tactical tips that salespeople can apply immediately perform best: 'The follow-up sequence that gets responses,' 'How to handle the price objection without discounting,' 'The question that qualifies buyers in 60 seconds.' Content that shows you know the craft — specific, actionable, credible — is what builds the authority that leads to corporate training contracts and individual coaching clients." }
    },
    {
      "@type": "Question",
      "name": "Can Assurgit target B2B vs. B2C sales training content?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. During setup, we brief on your focus — enterprise B2B, SMB, SaaS sales, financial services, real estate, or any other vertical. Scripts are written for your specific audience's language, challenges, and sales process. A SaaS sales coach and a retail sales trainer need completely different content, and we write for the specific one." }
    },
    {
      "@type": "Question",
      "name": "How does video content help sales coaches land corporate training contracts?",
      "acceptedAnswer": { "@type": "Answer", "text": "Corporate training buyers — VPs of Sales, CHROs, and L&D leaders — do their research before they reach out. Consistent educational video content positions you as the proven expert before the first conversation. When a decision-maker has been watching your content for weeks, the sales conversation starts from a position of trust rather than cold credibility-building." }
    },
    {
      "@type": "Question",
      "name": "Can the content be used for both attracting individual clients and corporate clients?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. We can mix content types: tactical tips that appeal to individual salespeople (who share it with their managers), and strategic content aimed at sales leaders and training buyers. During the weekly research, we track what's resonating in your target market and weight the content mix accordingly." }
    },
  ]
};

export default function SalesCoachesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-yellow-600/20 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-yellow-500/30 mb-6">
            For Sales Coaches & Trainers
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Be the sales coach{" "}
            <span className="text-yellow-400">every VP of Sales already knows</span>
            {" "}before you pitch
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches what your target clients are searching for, and publishes 5 tactical sales education videos a week — while you focus on delivering results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">How it works for sales coaches</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, clone your voice, and brief on your sales methodology, target buyer (individual salespeople vs. corporate), industry focus, and brand positioning." },
              { step: "2", title: "Weekly research", desc: "Our pipeline tracks what sales professionals and training buyers are searching for: objection handling, pipeline management, quota attainment, leadership development, and more." },
              { step: "3", title: "5 tactical scripts every Monday", desc: "Written in your voice. Specific, credible, actionable — the kind of content that gets shared by salespeople and noticed by their managers." },
              { step: "4", title: "Human QC before publishing", desc: "Every video reviewed for quality and professional presentation. Scripts come to you Monday with a 48-hour review window." },
              { step: "5", title: "Published across your platforms", desc: "LinkedIn, Instagram, YouTube, TikTok — reaching sales leaders and individual contributors where they consume content." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-yellow-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
                <div>
                  <p className="text-white font-semibold mb-1">{item.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">Sample content topics for sales coaches</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "The Follow-Up Sequence That Gets Responses (Most People Stop Too Early)",
              "How to Handle the Price Objection Without Discounting",
              "The One Question That Qualifies Buyers in 60 Seconds",
              "Why Your Salespeople Are Losing at Proposals (And How to Fix It)",
              "Cold Outreach Mistakes That Kill Your Reply Rate",
              "The Sales Discovery Process That Closes at 60%+",
              "How to Build a Sales Cadence That Doesn't Annoy Prospects",
              "Why Most Sales Training Doesn't Stick — and What Does",
              "The Psychology of Buying Decisions Your Team Needs to Understand",
              "How to Run a Sales Pipeline Review That Actually Drives Revenue",
            ].map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for sales coaches</h2>
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
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-yellow-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-yellow-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-yellow-400 font-bold">{plan.price}</td>
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
          <div className="bg-yellow-600/10 border border-yellow-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Be the sales expert buyers research before they ever reach out.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your content would look like. Start building corporate training pipeline this week.
            </p>
            <Link href="/book" className="inline-block bg-yellow-600 hover:bg-yellow-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/business-coaches" className="text-yellow-400 hover:underline">Business Coaches</Link>
            <Link href="/for/consultants" className="text-yellow-400 hover:underline">Consultants</Link>
            <Link href="/for/career-coaches" className="text-yellow-400 hover:underline">Career Coaches</Link>
            <Link href="/pricing" className="text-yellow-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-yellow-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
