import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  openGraph: {
  url: "https://assurgit.com/case-studies",
  images: [{ url: "https://assurgit.com/opengraph-image.png", width: 1024, height: 1024, alt: "Assurgit" }],
  },
  title: "Case Studies",
  description:
    "Real client results from Assurgit's AI clone content and presence infrastructure system. Named clients, verified outcomes.",
  alternates: {
    canonical: 'https://assurgit.com/case-studies',
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gray-950 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent mb-5">
              Results
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Real results. Named clients. Verified outcomes.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              These are early proof points — not guarantees. Each business is different. What holds
              across clients is the system.
            </p>
          </div>
        </section>

        {/* Case study: Well Prepared Life */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              {/* Header bar */}
              <div className="bg-brand-accent px-8 py-5">
                <p className="text-white text-xs font-semibold uppercase tracking-wider mb-1">Case Study #1</p>
                <h2 className="text-white font-black text-2xl">Well Prepared Life</h2>
              </div>

              <div className="p-8">
                <div className="grid sm:grid-cols-3 gap-8 mb-8">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Business</p>
                    <p className="text-gray-800 text-sm">Bay Area meal prep and kitchen coaching for seniors and disabled adults</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">What they used</p>
                    <p className="text-gray-800 text-sm">AI clone content system — no filming required</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Timeframe</p>
                    <p className="text-gray-800 text-sm">First week of Assurgit content</p>
                  </div>
                </div>

                {/* Result callout */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8 text-center">
                  <p className="text-emerald-800 text-4xl font-black mb-1">50%</p>
                  <p className="text-emerald-700 text-base font-semibold">Business growth in the first week</p>
                  <p className="text-emerald-600 text-sm mt-1">Without filming a single new video</p>
                </div>

                <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                  <p>
                    Well Prepared Life serves seniors and disabled adults in the Bay Area with meal prep
                    and kitchen coaching. Their founder had the expertise and the story — but no consistent
                    way to get it in front of new clients without spending hours on content every week.
                  </p>
                  <p>
                    In the first week of Assurgit content — AI clone videos published to their key platforms
                    with research-backed scripts — the business grew 50%. No new filming. No content sprint.
                    Just a system that ran.
                  </p>
                  <p className="text-xs text-gray-400 italic">
                    Note: This result reflects a specific client in a specific market during a specific period.
                    It is a named proof point, not a guaranteed outcome.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case study: FitLife Pro */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              {/* Header bar */}
              <div className="bg-brand-accent px-8 py-5">
                <p className="text-white text-xs font-semibold uppercase tracking-wider mb-1">Case Study #2</p>
                <h2 className="text-white font-black text-2xl">FitLife Pro</h2>
              </div>

              <div className="p-8">
                <div className="grid sm:grid-cols-3 gap-8 mb-8">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Business</p>
                    <p className="text-gray-800 text-sm">Online fitness course provider for busy professionals</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">What they used</p>
                    <p className="text-gray-800 text-sm">AI clone content system with custom scripting</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Timeframe</p>
                    <p className="text-gray-800 text-sm">First month of Assurgit content</p>
                  </div>
                </div>

                {/* Result callout */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8 text-center">
                  <p className="text-emerald-800 text-4xl font-black mb-1">30%</p>
                  <p className="text-emerald-700 text-base font-semibold">Increase in course sales</p>
                  <p className="text-emerald-600 text-sm mt-1">Within 30 days of implementation</p>
                </div>

                <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                  <p>
                    FitLife Pro helps busy professionals maintain their fitness goals through convenient
                    online courses. Their challenge was creating fresh, engaging content without the
                    resource drain of traditional video production.
                  </p>
                  <p>
                    By implementing Assurgit's AI clone system with custom scripting tailored to their
                    audience, FitLife Pro saw a 30% increase in course sales within the first month.
                    This growth was driven by consistent, high-quality content that resonated with their target market.
                  </p>
                  <p className="text-xs text-gray-400 italic">
                    Note: Results may vary based on individual business conditions and market factors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-gray-950 mb-8 text-center">Why Choose Assurgit?</h2>
            <div className="grid md:grid-cols-3 gap-8 space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <p className="font-bold text-gray-950 mb-3">Cost Efficiency</p>
                <p className="text-gray-600 leading-relaxed">
                  Reduce your content creation costs by up to 80% with our AI-powered system. No need for expensive
                  cameras, lighting, or editing software.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <p className="font-bold text-gray-950 mb-3">Time Efficiency</p>
                <p className="text-gray-600 leading-relaxed">
                  Create multiple videos in a single day without leaving your desk. Our system automates the entire
                  process, allowing you to focus on growing your business.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <p className="font-bold text-gray-950 mb-3">Scalability</p>
                <p className="text-gray-600 leading-relaxed">
                  Scale your content production effortlessly. Whether you need 10 videos or 10,000, our system
                  handles it with ease.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <p className="font-bold text-gray-950 mb-3">Consistency</p>
                <p className="text-gray-600 leading-relaxed">
                  Maintain a consistent brand voice across all your content. Our AI ensures every video aligns
                  with your messaging and tone.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <p className="font-bold text-gray-950 mb-3">Analytics & Optimization</p>
                <p className="text-gray-600 leading-relaxed">
                  Gain insights into what's working with detailed analytics. Optimize your content strategy
                  based on real data.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <p className="font-bold text-gray-950 mb-3">Support & Training</p>
                <p className="text-gray-600 leading-relaxed">
                  Our team provides comprehensive support and training to ensure you maximize the potential
                  of our AI clone system.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-gray-950 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <p className="font-bold text-gray-950 mb-3">What exactly is the AI clone content system?</p>
                <p className="text-gray-600 leading-relaxed">
                  The Assurgit AI clone system uses advanced AI technology to generate authentic, engaging video content
                  based on your expertise and messaging. It allows you to create professional-grade videos without
                  needing to film or hire expensive content creators.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <p className="font-bold text-gray-950 mb-3">How quickly can I see results?</p>
                <p className="text-gray-600 leading-relaxed">
                  Results vary by business and industry, but early adopters have seen measurable impact within the first
                  week. Consistent use of the system typically leads to ongoing growth over time.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <p className="font-bold text-gray-950 mb-3">Can this scale with my business?</p>
                <p className="text-gray-600 leading-relaxed">
                  Absolutely. The system is designed to grow with your business needs. As you expand your offerings,
                  the AI can adapt to create content for new products, services, or markets.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <p className="font-bold text-gray-950 mb-3">Are there any guarantees?</p>
                <p className="text-gray-600 leading-relaxed">
                  While results vary, we provide a clear system and framework for success. We believe in transparency
                  and work closely with clients to align the content strategy with their specific goals.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <p className="font-bold text-gray-950 mb-3">What about pricing?</p>
                <p className="text-gray-600 leading-relaxed">
                  We offer flexible pricing plans based on your business needs. Schedule a free consultation to discuss
                  the best option for your specific requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* More coming */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl font-black text-gray-950 mb-3">More case studies coming</h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto mb-8">
              We add named case studies as clients give permission to share their results. Every case
              study includes the business type, the offer used, and a specific, verifiable outcome.
            </p>
            <Link
              href="/book"
              className="inline-block bg-brand-accent hover:bg-brand-accent-hov text-white font-bold px-8 py-4 rounded-xl text-base transition-all"
            >
              Book a Free Call →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}