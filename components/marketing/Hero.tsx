import Link from "next/link";

const trustSignals = [
  { label: "5 videos/week" },
  { label: "4 platforms" },
  { label: "Zero filming" },
  { label: "Research-backed" },
];

export default function Hero() {
  return (
    <section className="relative bg-brand-hero pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-accent-muted rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-brand-hero-fg leading-[1.05] tracking-tight mb-6">
          Your face. Your voice.{" "}
          <span className="text-brand-accent">5 videos a week.</span>
          <br className="hidden sm:block" />
          <span className="text-brand-hero-fg">Zero filming.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-brand-hero-sub max-w-2xl mx-auto mb-10 leading-relaxed">
          Assurgit builds your AI avatar and voice clone, researches your market, writes the scripts, and publishes to Instagram, TikTok, LinkedIn, and YouTube — every week, on autopilot.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/book"
            className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-hov text-white font-bold px-8 py-4 rounded-xl text-base transition-all shadow-lg hover:-translate-y-0.5"
          >
            Book a Free Call
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto border border-gray-300 hover:border-gray-500 text-gray-600 hover:text-gray-900 font-semibold px-8 py-4 rounded-xl text-base transition-colors"
          >
            See How It Works
          </a>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {trustSignals.map((signal, i) => (
            <div key={i} className="flex items-center gap-2 text-brand-hero-sub text-sm font-medium">
              <svg className="w-4 h-4 text-brand-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {signal.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
