const layers = [
  {
    label: "Search + intent research",
    description:
      "Questions people are actively asking, seasonal demand shifts, and trending search signals — so every script topic is timely, not guessed.",
    clientTranslation: "The scripts sound relevant and useful.",
  },
  {
    label: "Competitive + content research",
    description:
      "We monitor what competitors in your niche are posting, what formats are working, and where the content gaps are.",
    clientTranslation: "The videos say something smarter than generic AI copy.",
  },
  {
    label: "Verification + synthesis",
    description:
      "Signals are cross-checked and filtered before becoming scripts. Weak or low-confidence talking points are dropped.",
    clientTranslation: "The final scripts feel confident and credible.",
  },
  {
    label: "Memory + feedback loop",
    description:
      "We track which hooks, CTAs, and topics have worked for your account over time. The system improves with every cycle.",
    clientTranslation: "The content gets better as the account matures.",
  },
];

export default function WhyScriptsBetter() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 mb-4 tracking-tight">
            Why our scripts are better
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            The real moat is not rendering. It&apos;s the research pipeline and memory loop behind every script.
          </p>
        </div>

        {/* Layer cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {layers.map((layer, i) => (
            <div key={layer.label} className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-brand-accent text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <h3 className="text-gray-950 font-bold text-base">{layer.label}</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">{layer.description}</p>
              <p className="text-brand-accent text-sm font-semibold">&ldquo;{layer.clientTranslation}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
