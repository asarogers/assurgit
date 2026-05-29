// Page-1-in-90-days guarantee + free audit form. Used at the bottom of
// /pricing under the FAQ section. The form posts (GET) to /tools/seo-audit
// with `url` query param — same pattern as the homepage hero so the audit
// page already knows how to handle the input.

export default function AuditGuaranteeCTA() {
  return (
    <section className="bg-zinc-950 border-t border-zinc-900 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Guarantee badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Performance Guarantee
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Page 1 in 90 days &mdash;
          <br className="hidden sm:block" />{" "}
          <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
            or your fourth month is free
          </span>
        </h2>

        <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          If after 90 days your top 5 keywords aren&rsquo;t on page 1 of Google, your fourth month is free.
          In writing, in your contract.
        </p>

        {/* Audit form */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 mb-6 max-w-xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
            Stop guessing what&rsquo;s broken.
            <br className="hidden sm:block" />
            <span className="text-zinc-400 font-bold">See it in 60 seconds.</span>
          </h3>
          <p className="text-sm text-zinc-400 mb-6">
            Free audit. No email needed to see the results. Live Google rank, page speed,
            GBP visibility, and the top 3 things costing you leads right now.
          </p>

          <form
            action="/tools/seo-audit"
            method="GET"
            className="flex flex-col sm:flex-row items-stretch gap-2"
          >
            <input
              type="text"
              name="url"
              placeholder="yoursite.com"
              aria-label="Your website URL"
              required
              className="flex-1 h-12 px-4 text-base text-white placeholder:text-zinc-500 bg-zinc-950 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
            />
            <button
              type="submit"
              className="h-12 px-5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm rounded-xl transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              Run my free audit &rarr;
            </button>
          </form>
        </div>

        <p className="text-sm text-zinc-500">
          Already audited?{" "}
          <a href="/book" className="text-[#7aa6ff] hover:text-white font-semibold transition-colors">
            Book a 15-minute call &rarr;
          </a>
          <span className="text-zinc-700 mx-2">&middot;</span>
          <a
            href="mailto:hello@assurgit.com"
            className="text-[#7aa6ff] hover:text-white font-semibold transition-colors"
          >
            Or email me directly
          </a>
        </p>
      </div>
    </section>
  );
}
