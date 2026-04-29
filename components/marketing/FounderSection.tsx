import Image from "next/image";
import { MotionWrapper, StaggerContainer, MotionItem } from "@/components/marketing/MotionWrapper";

const credentials = [
  {
    signal: "Why this exists",
    detail:
      "Built by an owner of multiple service businesses who got tired of the agency runaround — opaque deliverables, six-month contracts, no proof of work, and no real ownership of the assets they paid to build.",
    relevance: "Assurgit is the system the founder wished existed — own what you build, see what's done, and leave any time without losing the work.",
  },
  {
    signal: "Engineering background",
    detail:
      "Software engineer building production AI systems — RAG pipelines, document intelligence, workflow automation. Prior work at Sandia National Labs, Deloitte, and Sonoco across regulated and high-stakes environments.",
    relevance: "The infrastructure behind Assurgit — the citations engine, the SERP scraping, the schema generation, the monthly health reports — is production-grade automation, not a freelancer juggling tools.",
  },
  {
    signal: "How we work",
    detail:
      "US-based. Manager-only on your Google Business Profile. Strategy, audits, and review responses written by us — not handed to offshore labor at $5/hr. Content drafting is AI-assisted; we edit before publish.",
    relevance: "You always know who's doing the work, where the data lives, and what happens if you leave (free handoff, no fee, no fight).",
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
                src="/app-icon-1024.png"
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
              Local SEO is one of the most opaque corners of the marketing world. Owners get pitched the same vague packages, sign 6-month contracts, and end up with nothing they actually own. Assurgit was built to change exactly that — own what we build for you, see what&apos;s done, and walk away clean any time.
            </p>
            <StaggerContainer className="space-y-5">
              {credentials.map((cred) => (
                <MotionItem key={cred.signal}>
                <div className="flex gap-4 items-start">
                  <div className="min-w-[120px] text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider pt-0.5">
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
