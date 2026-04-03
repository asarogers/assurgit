import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Nutritionists & Dietitians | Assurgit",
  description:
    "Done-for-you AI video content for registered dietitians and nutrition coaches. Build authority, attract clients, and grow your practice with 5 educational videos per week. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Nutritionists & Dietitians — Done For You",
    description:
      "Turn your nutrition expertise into 5 weekly videos — published automatically. Build the authority that sets you apart from generic diet culture.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Nutritionists and Dietitians",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content service for registered dietitians and nutrition coaches. Build authority and attract ideal clients through educational video content.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What nutrition content topics get the most engagement?",
      "acceptedAnswer": { "@type": "Answer", "text": "Content that debunks popular myths tends to perform best — intermittent fasting, protein requirements, 'clean eating,' seed oils, and other heavily debated topics. People are bombarded with contradictory nutrition information and they trust credentialed professionals who can cut through the noise with evidence-based, practical guidance." }
    },
    {
      "@type": "Question",
      "name": "Can Assurgit write content that reflects my specific approach — like intuitive eating or sports nutrition?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Your 30-minute setup call is where we capture your philosophy, methodology, and target client. Whether you specialize in eating disorder recovery, gut health, performance nutrition, or general wellness, every script is written to reflect your framework and the population you serve." }
    },
    {
      "@type": "Question",
      "name": "How does educational video content help me compete against general wellness influencers?",
      "acceptedAnswer": { "@type": "Answer", "text": "Your credential is your competitive advantage — but only if people see you consistently. Most registered dietitians post sporadically and lose ground to influencers who post daily. Assurgit levels that playing field: you get 5 evidence-based videos per week, published consistently, without spending your clinical hours on content creation." }
    },
    {
      "@type": "Question",
      "name": "Will the scripts reflect evidence-based nutrition rather than diet culture trends?",
      "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. During setup, we brief on your scope of practice and evidence-based approach. All scripts go through human QC before publishing. If a topic conflicts with your clinical philosophy or current research, you can flag it during your weekly review and we'll revise before anything goes live." }
    },
  ]
};

export default function NutritionistsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-green-600/20 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-500/30 mb-6">
            For Nutritionists & Registered Dietitians
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Your credential deserves{" "}
            <span className="text-green-400">more visibility than</span>
            {" "}a once-a-week Instagram post
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches what your audience is searching for, and publishes 5 evidence-based educational videos a week — so your expertise reaches the people who need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>

          {/* Value prop callout */}
          <div className="mt-12 max-w-2xl mx-auto bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-left">
            <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-3">Why Dietitians Win With Educational Content</p>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-white font-bold text-lg mb-2">Credibility compounds — if you show up consistently</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  People searching for nutrition guidance are overwhelmed by influencers pushing fad diets and unqualified advice. A registered dietitian or nutrition coach who consistently shows up with clear, evidence-based content becomes the trusted authority in their feed — and the first call they make when they're ready for real help.
                </p>
                <p className="text-gray-500 text-xs">— Asa Rogers, Founder of Assurgit</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            How it works for nutritionists and dietitians
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, capture your voice clone, and brief on your specialty — whether that's gut health, sports nutrition, eating disorder recovery, weight management, or general wellness." },
              { step: "2", title: "Weekly research", desc: "Our pipeline tracks what your audience is actively searching for: macro myths, supplement questions, meal timing, specific conditions, and trending nutrition topics you can address credibly." },
              { step: "3", title: "5 educational scripts every Monday", desc: "Written in your voice, grounded in your evidence-based approach. Content that cuts through diet culture and establishes you as the expert worth trusting." },
              { step: "4", title: "Human QC before publishing", desc: "Every video is reviewed for quality and accuracy. Scripts are checked against your stated philosophy and clinical framework before anything goes live." },
              { step: "5", title: "Published across your platforms", desc: "Instagram, TikTok, YouTube, LinkedIn — reaching people drowning in nutrition misinformation who are actively looking for someone credible to follow." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-green-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
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
            Sample content topics for nutritionists
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "The Truth About Intermittent Fasting (What Studies Actually Show)",
              "5 Foods That Are Actually Good for You (Despite What You've Heard)",
              "How to Read a Nutrition Label Without Getting Confused",
              "Protein Myths Debunked by a Registered Dietitian",
              "Why You're Always Hungry — Even After Eating",
              "The Real Reason Most Diets Don't Work Long-Term",
              "What 'Eating Clean' Actually Means (and What It Doesn't)",
              "How to Build a Balanced Plate Without Counting Every Calorie",
              "The Truth About Seed Oils, Lectins, and Other Food Fears",
              "3 Supplements That Actually Have Evidence Behind Them",
            ].map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for nutritionists and dietitians</h2>
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
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-green-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-green-400 font-bold">{plan.price}</td>
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
          <div className="bg-green-600/10 border border-green-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Turn your expertise into reach.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your content would look like. Start building the authority that brings the right clients to you.
            </p>
            <Link href="/book" className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/wellness-coaches" className="text-green-400 hover:underline">Wellness Coaches</Link>
            <Link href="/for/personal-trainers" className="text-green-400 hover:underline">Personal Trainers</Link>
            <Link href="/for/meal-prep-coaches" className="text-green-400 hover:underline">Meal Prep Coaches</Link>
            <Link href="/pricing" className="text-green-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-green-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
