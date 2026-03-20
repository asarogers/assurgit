const steps = [
  {
    number: "1",
    title: "We clone you",
    description:
      "30-minute setup call. We build your HeyGen avatar and voice clone from a short recording. You never film again.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "We research & script",
    description:
      "Every week, our AI monitors your competitors, tracks trending content in your niche, and writes 5 platform-optimized scripts in your voice.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "We publish for you",
    description:
      "Videos render, get human QC, and go live on Instagram, TikTok, LinkedIn, and YouTube — on schedule, every week.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 mb-4 tracking-tight">
            How it works
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            From zero to 5 published videos a week in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gray-200"
            aria-hidden="true"
          />

          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Number circle */}
              <div className="relative z-10 w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center mb-6 shadow-xl">
                <span className="text-white font-black text-3xl">{step.number}</span>
              </div>

              {/* Icon */}
              <div className="text-brand-accent mb-4">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-950 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed max-w-xs">{step.description}</p>

              {/* Mobile arrow */}
              {index < steps.length - 1 && (
                <div className="md:hidden mt-8 text-brand-accent text-2xl" aria-hidden="true">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
