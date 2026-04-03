import Image from "next/image";
import { MotionWrapper, StaggerContainer, MotionItem } from "@/components/marketing/MotionWrapper";

const credentials = [
  {
    signal: "Current role",
    detail:
      "Software Engineer at ServiceNow building AI systems — RAG pipelines, document intelligence tooling, and workflow automation.",
    relevance: "The infrastructure behind Assurgit is production-grade, not a weekend project.",
  },
  {
    signal: "Prior experience",
    detail: "Sandia National Laboratories, Deloitte, and Sonoco across enterprise software, defense applications, and manufacturing automation.",
    relevance: "Deep systems experience across regulated, high-stakes environments.",
  },
  {
    signal: "Education",
    detail: "MS Robotics, Northwestern University — hands-on work in control, autonomy, perception, and automation.",
    relevance: "Multi-agent orchestration is core to how Assurgit operates at scale.",
  },
];

export default function FounderSection() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <MotionWrapper>
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* Photo + name */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-40 h-40 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4 flex-shrink-0">
              <Image
                src="/founder.jpg"
                alt="Asa Rogers, Founder of Assurgit"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-black text-gray-950 dark:text-white text-lg">Asa Rogers</p>
            <p className="text-gray-500 text-sm">Founder, Assurgit</p>
          </div>

          {/* Credentials */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-4">
              Why the system is credible
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-8">
              Background in multi-agent systems, orchestration, APIs, and automation increases trust that
              Assurgit is a real operating system — not a freelancer juggling tools.
            </p>
            <StaggerContainer className="space-y-5">
              {credentials.map((cred) => (
                <MotionItem key={cred.signal}>
                <div className="flex gap-4 items-start">
                  <div className="min-w-[100px] text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider pt-0.5">
                    {cred.signal}
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200 text-sm font-medium mb-0.5">{cred.detail}</p>
                    <p className="text-gray-400 text-xs">{cred.relevance}</p>
                  </div>
                </div>
                </MotionItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
