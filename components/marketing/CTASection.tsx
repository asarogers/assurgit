import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-brand-cta py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 tracking-tight leading-tight">
          Stop being invisible.
          <br />
          Start showing up every week.
        </h2>

        <p className="text-white/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Book a 20-minute call. We&apos;ll show you exactly what your content would look like — before you spend a dollar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href="/book"
            className="w-full sm:w-auto bg-white text-brand-cta hover:bg-white/90 font-bold px-10 py-4 rounded-xl text-base transition-all shadow-lg hover:-translate-y-0.5"
          >
            Book Your Free Call
          </Link>
        </div>

        <p className="text-white/50 text-sm font-medium">
          No contracts. No filming. Cancel any time.
        </p>
      </div>
    </section>
  );
}
