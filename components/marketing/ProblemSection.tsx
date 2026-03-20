const problems = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2zM3 3l18 18" />
      </svg>
    ),
    headline: "You know you should be posting video.",
    body: "But you never have time to actually film anything. The camera sits there. The ideas pile up. Another week goes by.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    headline: "You've tried hiring an editor or agency.",
    body: "They don't know your niche. The content feels generic. You spend more time reviewing it than it would take to make it yourself.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    headline: "You post once, get traction, and stop.",
    body: "Consistency is impossible to maintain manually. Life gets in the way. The algorithm punishes the silence. You're invisible again.",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-gray-950 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Most businesses know video works.
            <br className="hidden sm:block" />
            <span className="text-gray-400"> They just can&apos;t keep up.</span>
          </h2>
        </div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8"
            >
              <div className="w-14 h-14 bg-red-950/50 border border-red-900/50 rounded-xl flex items-center justify-center text-red-400 mb-6">
                {problem.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-3 leading-snug">
                {problem.headline}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {problem.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
