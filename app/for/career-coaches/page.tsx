import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Career Coaches | Assurgit",
  description:
    "Done-for-you AI video content for career coaches. Attract clients navigating job searches, promotions, and career transitions with 5 educational videos per week. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Career Coaches — Done For You",
    description:
      "Turn your career coaching expertise into 5 weekly videos — published automatically. Reach job seekers and professionals at the exact moment they need your help.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Career Coaches",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content service for career coaches. Attract job seekers, career changers, and professionals seeking advancement through consistent educational video content.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What career coaching topics get the most views and engagement?",
      "acceptedAnswer": { "@type": "Answer", "text": "Resume and LinkedIn optimization content consistently drives high search volume because people actively look for this help during job searches. Salary negotiation, interview preparation, and career change strategy also perform extremely well. The highest-performing content tends to be specific and tactical — '3 resume mistakes that get you filtered out' outperforms 'how to write a good resume' every time." }
    },
    {
      "@type": "Question",
      "name": "My clients are professionals in specific industries — can content be tailored to them?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. During your setup call, we brief on your specific client base — whether that's tech workers navigating layoffs, mid-career professionals making industry switches, recent graduates, or executives seeking board positions. Scripts are written to speak directly to the situations and concerns your specific audience faces." }
    },
    {
      "@type": "Question",
      "name": "Is career coaching content better suited for LinkedIn or other platforms?",
      "acceptedAnswer": { "@type": "Answer", "text": "LinkedIn is the highest-intent platform for career coaching content because your audience is already there thinking about their careers. But TikTok and Instagram also have large audiences searching for job search and career advice content. Assurgit publishes across all platforms so you capture attention wherever your ideal clients are spending time." }
    },
    {
      "@type": "Question",
      "name": "How does educational content convert to actual coaching clients?",
      "acceptedAnswer": { "@type": "Answer", "text": "Career coaching clients usually have a triggering moment — a layoff, a passed-over promotion, a burnout point — that sends them looking for help. If you've been consistently showing up in their feed with useful, tactical content, you're already the person they trust when that moment hits. Educational video content keeps you top of mind during the long stretches between their trigger and their decision to invest in coaching." }
    },
  ]
};

export default function CareerCoachesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-sky-600/20 text-sky-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-sky-500/30 mb-6">
            For Career Coaches
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Be the career coach{" "}
            <span className="text-sky-400">people find when they need help most</span>
            {" "}— not after they've moved on
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches what job seekers and professionals are searching for, and publishes 5 educational videos a week — putting your expertise in front of people at exactly the right moment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>

          {/* Value prop callout */}
          <div className="mt-12 max-w-2xl mx-auto bg-sky-500/10 border border-sky-500/30 rounded-2xl p-6 text-left">
            <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">The Career Coaching Content Opportunity</p>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-white font-bold text-lg mb-2">Millions of people search for career help every week</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Job search, resume writing, salary negotiation, career change — these are some of the highest-volume search categories online. Career coaches who publish consistently to these topics build an audience that self-selects, comes pre-educated, and converts into clients without a drawn-out sales process.
                </p>
                <p className="text-gray-500 text-xs">— Asa Rogers, Founder of Assurgit</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            How it works for career coaches
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, capture your voice clone, and brief on your specialty — job search strategy, salary negotiation, executive coaching, career transitions, or whatever your niche is." },
              { step: "2", title: "Weekly research", desc: "Our pipeline tracks what professionals and job seekers are actively searching for: resume formats, LinkedIn optimization, interview tactics, promotion strategies, and industry-specific career topics." },
              { step: "3", title: "5 educational scripts every Monday", desc: "Written in your voice, tailored to your audience. Tactical, actionable content that demonstrates your expertise and makes people want to work with you directly." },
              { step: "4", title: "Human QC before publishing", desc: "Every video is reviewed for quality, accuracy, and relevance before going live. Tactical career advice is fact-checked to make sure it reflects current market realities." },
              { step: "5", title: "Published across your platforms", desc: "LinkedIn, Instagram, TikTok, YouTube — reaching professionals where they're spending time and searching for exactly the help you provide." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-sky-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
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
            Sample content topics for career coaches
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "3 Resume Mistakes That Get You Filtered Out Before Anyone Reads It",
              "How to Negotiate Your Salary Without Feeling Awkward",
              "What Interviewers Actually Want to Hear (It's Not Your Resume)",
              "The LinkedIn Profile Section Most People Get Wrong",
              "How to Explain a Career Gap Without Apologizing for It",
              "Why You're Not Getting Callbacks (and How to Fix It)",
              "How to Ask for a Promotion Without Sabotaging Yourself",
              "The Right Way to Follow Up After a Job Interview",
              "Career Change at 35, 45, or 55: What's Actually Possible",
              "How to Find a Job Through Your Network (Without Feeling Desperate)",
            ].map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for career coaches</h2>
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
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-sky-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-sky-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-sky-400 font-bold">{plan.price}</td>
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
          <div className="bg-sky-600/10 border border-sky-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Turn your expertise into reach.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your content would look like. Start reaching the professionals who need your help right now.
            </p>
            <Link href="/book" className="inline-block bg-sky-600 hover:bg-sky-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/business-coaches" className="text-sky-400 hover:underline">Business Coaches</Link>
            <Link href="/for/life-coaches" className="text-sky-400 hover:underline">Life Coaches</Link>
            <Link href="/for/consultants" className="text-sky-400 hover:underline">Consultants</Link>
            <Link href="/pricing" className="text-sky-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-sky-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
