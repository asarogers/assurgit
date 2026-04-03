import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import FounderSection from "@/components/marketing/FounderSection";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "About",
  description:
    "Assurgit is an Online Presence Launch System for service businesses, built by Asa Rogers. Learn the story, the system, and the operating principles behind it.",
};

const operatingPrinciples = [
  {
    title: "Isolated client workflows",
    description:
      "Each client runs through a separate pipeline. One client's render issue or token failure does not stall another client's queue.",
  },
  {
    title: "Explicit state tracking",
    description:
      "Scripts, renders, delivery state, schedule state, and approval state are tracked explicitly — never managed ad hoc.",
  },
  {
    title: "Human QC as the trust layer",
    description:
      "Nothing is sent or published without human review. Automation lowers friction; it does not remove oversight.",
  },
  {
    title: "Smoke tests before handoff",
    description:
      "Every new platform connection is verified before it's handed to a client. No silent failures.",
  },
  {
    title: "Launch-first, automate-second",
    description:
      "We prove the process manually before recurring posting is automated. Automation should never outrun policy compliance or platform readiness.",
  },
];

const offerLayers = [
  {
    layer: "AI Clone Content System",
    promise: "Consistent short-form presence without constant filming",
    sold: "Flagship recurring offer",
  },
  {
    layer: "Presence Infrastructure",
    promise: "Better discoverability and repeatable visibility systems",
    sold: "Add-on or tier expansion",
  },
  {
    layer: "Website + Presence Launch",
    promise: "A stronger owned asset plus launch-ready visibility foundation",
    sold: "Project-based higher-ticket offer",
  },
  {
    layer: "Automation + Reporting",
    promise: "Lower friction and better retention at scale",
    sold: "Internal ops layer; selectively client-visible",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gray-950 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent mb-5">
              About Assurgit
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              A system, not an agency
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Assurgit is an Online Presence Launch System for service businesses, built around
              AI clone content and supporting visibility infrastructure.
            </p>
          </div>
        </section>

        {/* What Assurgit is */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-black text-gray-950 mb-6 tracking-tight">What Assurgit is</h2>
            <div className="prose prose-gray max-w-none text-gray-600 text-base leading-relaxed space-y-4">
              <p>
                Assurgit should be sold as one coherent system, not as a broad digital agency. The wedge
                is simple: clients get a scalable video presence without filming every week. Everything
                else — Google Business Profile work, directory setup, social setup, automation, GEO, and
                websites — supports that promise rather than replacing it.
              </p>
              <p>
                The hero offer is the AI Clone Content System. The expansion layer is Presence
                Infrastructure. The higher-ticket project offer is Website + Presence Launch.
              </p>
              <p>
                The memorable edge is not &ldquo;AI marketing.&rdquo; It&apos;s your face, your voice, no constant
                filming — with a system that compounds over time.
              </p>
            </div>

            {/* Offer layer table */}
            <div className="mt-12 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-950 text-white">
                    <th className="text-left py-3 px-4 font-semibold">Layer</th>
                    <th className="text-left py-3 px-4 font-semibold">Primary promise</th>
                    <th className="text-left py-3 px-4 font-semibold hidden sm:table-cell">How it&apos;s sold</th>
                  </tr>
                </thead>
                <tbody>
                  {offerLayers.map((row, i) => (
                    <tr key={row.layer} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-3 px-4 font-semibold text-gray-900">{row.layer}</td>
                      <td className="py-3 px-4 text-gray-600">{row.promise}</td>
                      <td className="py-3 px-4 text-gray-400 hidden sm:table-cell">{row.sold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Founder section */}
        <div className="bg-gray-50 border-t border-gray-200">
          <FounderSection />
        </div>

        {/* Why we built this */}
        <section className="py-16 md:py-24 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-black text-gray-950 mb-6 tracking-tight">Why we built this</h2>
            <div className="text-gray-600 text-base leading-relaxed space-y-4">
              <p>
                Every alternative leaves the real work on your plate. DIY collapses under time pressure.
                Editors still require filming. Self-serve avatar tools leave scripting, publishing, and
                quality on you. Full-service agencies are broad, expensive, and harder to understand.
              </p>
              <p>
                Assurgit was built to remove the operational burden entirely while preserving what makes
                the content worth watching: your face, your voice, and your expertise — not a generic
                avatar speaking someone else&apos;s words.
              </p>
              <p>
                The research pipeline, human QC layer, and memory loop are what separate this from
                &ldquo;AI video&rdquo; in the commodity sense. The system gets better over time, not worse.
              </p>
            </div>
          </div>
        </section>

        {/* Operating principles */}
        <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-black text-gray-950 mb-4 tracking-tight">
              How we operate
            </h2>
            <p className="text-gray-500 text-base mb-10">
              Operational reliability is a selling point even when it&apos;s invisible to the client.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {operatingPrinciples.map((p) => (
                <div key={p.title} className="bg-white border border-gray-200 rounded-2xl p-5">
                  <h3 className="font-bold text-gray-950 text-sm mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gray-950 border-t border-gray-800">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to see the system in action?</h2>
            <p className="text-gray-400 mb-8">
              Book a free call. We&apos;ll show you what your clone content could look like and recommend
              the right tier for your business.
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
