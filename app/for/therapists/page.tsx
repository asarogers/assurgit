import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Therapists & Mental Health Professionals | Assurgit",
  description:
    "Done-for-you AI video content for therapists building a private practice. Reduce stigma, attract ideal clients, and grow your practice with 5 educational videos per week. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Therapists — Done For You",
    description:
      "Turn your mental health expertise into 5 weekly videos — published automatically. Build the trust that helps clients take the first step toward therapy.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Therapists and Mental Health Professionals",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content service for therapists building a private practice. Reduce stigma and attract ideal clients through educational mental health content.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does Assurgit handle HIPAA and ethics rules for mental health content?",
      "acceptedAnswer": { "@type": "Answer", "text": "Scripts are written as general psychoeducational content — explaining concepts, normalizing common experiences, and helping people understand mental health — rather than providing specific clinical advice or guidance for any individual situation. This is consistent with how licensed therapists ethically participate in public education across social media. All scripts are reviewed by you before production, and you can add appropriate disclaimers ('this is not therapy and not a substitute for professional treatment') wherever you feel they're needed." }
    },
    {
      "@type": "Question",
      "name": "Will the content feel clinical and cold, or will it connect emotionally?",
      "acceptedAnswer": { "@type": "Answer", "text": "The goal is warmth and accessibility — the kind of content that makes someone feel understood and less alone, not lectured to. During your setup call, we capture your communication style, your therapeutic approach, and your specific voice. Scripts are written to sound like you talking to a potential client, not like a textbook or a clinical report." }
    },
    {
      "@type": "Question",
      "name": "Can educational content help people who are hesitant about therapy take that first step?",
      "acceptedAnswer": { "@type": "Answer", "text": "This is one of the most powerful things educational mental health content can do. Many people are curious about therapy but have misconceptions, stigma, or anxiety about what it involves. Content that explains what therapy actually looks like, normalizes asking for help, and demonstrates a therapist's approach can make that first call significantly less intimidating. You're not selling therapy — you're removing the barriers to it." }
    },
    {
      "@type": "Question",
      "name": "What modalities and specialties can the content address?",
      "acceptedAnswer": { "@type": "Answer", "text": "Any specialty you practice: anxiety, depression, trauma, relationships, grief, OCD, ADHD, eating disorders, life transitions, couples work, LGBTQ+ affirming therapy, and more. Content is tailored during setup to your specific population and approach — whether you're CBT-focused, somatic, attachment-based, or integrative. We write to your specialty, not generic mental health topics." }
    },
  ]
};

export default function TherapistsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-rose-600/20 text-rose-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-rose-500/30 mb-6">
            For Therapists & Mental Health Professionals
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Help people feel understood{" "}
            <span className="text-rose-400">before they ever pick up the phone</span>
            {" "}— and fill your practice
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, researches what your ideal clients are searching for about mental health, and publishes 5 educational videos a week — reducing stigma, building trust, and attracting people who are ready for the right therapist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>

          {/* Value prop callout */}
          <div className="mt-12 max-w-2xl mx-auto bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 text-left">
            <p className="text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">Why Therapists Who Educate Fill Their Practices Faster</p>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-white font-bold text-lg mb-2">The clients who need you most are quietly searching for someone like you</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Most people spend months thinking about therapy before making a call. They search, they research, they watch videos — and they gravitate toward therapists who make them feel understood before the intake form. Educational content is how you become that person for your ideal client, on their timeline, without any sales pressure.
                </p>
                <p className="text-gray-500 text-xs">— Asa Rogers, Founder of Assurgit</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            How it works for therapists
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We build your avatar, capture your voice clone, and brief on your specialty, therapeutic approach, ideal client, and any ethical guidelines specific to your practice or licensure." },
              { step: "2", title: "Weekly research", desc: "Our pipeline identifies what your potential clients are actively searching for: anxiety symptoms, therapy misconceptions, relationship struggles, trauma responses, and the questions people Google at 2am when they're ready to ask for help." },
              { step: "3", title: "5 psychoeducational scripts every Monday", desc: "Written in your voice, warm and accessible. Content that educates without diagnosing, normalizes without minimizing, and demonstrates your approach without crossing ethical lines." },
              { step: "4", title: "Human QC before publishing", desc: "Every video is reviewed for quality, tone, and ethical appropriateness. Mental health content is handled with particular care — nothing goes live that could be harmful, misleading, or inconsistent with your clinical approach." },
              { step: "5", title: "Published across your platforms", desc: "Instagram, TikTok, YouTube, LinkedIn — reaching people in the quiet moments when they're searching for someone who understands what they're going through." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-rose-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
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
            Sample content topics for therapists
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "The Difference Between Anxiety and an Anxiety Disorder",
              "5 Signs It Might Be Time to Talk to a Therapist",
              "What Actually Happens in Therapy (It's Not What TV Shows)",
              "Why You Can Know Something Intellectually and Still Struggle With It",
              "The Real Reason Trauma Responses Don't Make Logical Sense",
              "How to Find a Therapist Who's Actually Right for You",
              "What 'Setting Boundaries' Actually Means (and How to Do It)",
              "The Difference Between Sadness and Depression",
              "Why Therapy Feels Weird at First — and Why That's Normal",
              "What Therapists Actually Think When You Share Something Embarrassing",
            ].map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-black text-white text-center mb-4">Plans for therapists and mental health professionals</h2>
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
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-rose-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-rose-600 text-white px-2 py-0.5 rounded-full">Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-rose-400 font-bold">{plan.price}</td>
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
          <div className="bg-rose-600/10 border border-rose-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Turn your expertise into reach.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. See exactly what your content would look like. Start reaching the people who are searching for exactly the help you provide.
            </p>
            <Link href="/book" className="inline-block bg-rose-600 hover:bg-rose-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/life-coaches" className="text-rose-400 hover:underline">Life Coaches</Link>
            <Link href="/for/wellness-coaches" className="text-rose-400 hover:underline">Wellness Coaches</Link>
            <Link href="/for/chiropractors" className="text-rose-400 hover:underline">Chiropractors</Link>
            <Link href="/pricing" className="text-rose-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-rose-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
