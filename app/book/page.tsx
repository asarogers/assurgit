import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import FounderSection from "@/components/marketing/FounderSection";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Book a Free Call",
  description:
    "Book a free call with Assurgit. We'll diagnose your platform needs, show you what your clone content could look like, and recommend your plan fit — Launch, Starter, Growth, or Scale.",
};

const whoThisIsFor = [
  "Service businesses that want consistent video presence without filming",
  "Coaches, consultants, loan officers, and advisors who need authority content",
  "Busy professionals who've tried DIY and it collapsed under time pressure",
  "Anyone who wants to know their plan fit before committing",
];

const whatWellDiagnose = [
  "Your platform reach and publishing needs",
  "Whether you need clone content only, or clone + infrastructure",
  "Your tier fit: Launch, Starter, Growth, or Scale",
];

const expectations = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "See what your clone content could look like",
    description: "Real examples of avatar content built from faces and voices like yours.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "Learn if you need clone-only or clone + infrastructure",
    description: "We'll map your visibility gaps and show where content alone isn't enough.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Get a plan recommendation",
    description: "Based on your economics, platform needs, and support level — Launch, Starter, Growth, or Scale.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: "Zero commitment",
    description: "No pressure, no pitch deck, no invoice. Just a conversation.",
  },
];

export default function BookPage() {
  const calUsername = process.env.NEXT_PUBLIC_CALCOM_USERNAME;
  const calSlug = process.env.NEXT_PUBLIC_CALCOM_EVENT_SLUG;
  const calUrl =
    calUsername && calSlug
      ? `https://cal.com/${calUsername}/${calSlug}?embed=true`
      : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          {/* Page header */}
          <div className="text-center mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 mb-4 tracking-tight">
              Book Your Free Call
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Pick a time. We&apos;ll show you what your AI video content looks like — before you spend a dollar.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Context + What to expect */}
            <div>
              {/* Who this is for */}
              <h2 className="text-xl font-bold text-gray-950 mb-4">Who this is for</h2>
              <ul className="space-y-2 mb-8">
                {whoThisIsFor.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* What we'll diagnose */}
              <h2 className="text-xl font-bold text-gray-950 mb-4">What we&apos;ll diagnose</h2>
              <ul className="space-y-2 mb-8">
                {whatWellDiagnose.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* What to expect */}
              <h2 className="text-xl font-bold text-gray-950 mb-4">What you&apos;ll leave with</h2>
              <div className="space-y-5">
                {expectations.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-gray-950 font-semibold text-sm mb-0.5">
                        {item.title}
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    After the call, you&apos;ll receive a summary email with the recommended plan and next steps. No invoice until you decide to move forward.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Cal.com embed */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {calUrl ? (
                <iframe
                  src={calUrl}
                  width="100%"
                  height="600"
                  style={{ border: "none" }}
                  title="Book a call with Assurgit"
                  className="w-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-96 p-8 text-center">
                  <svg
                    className="w-12 h-12 text-gray-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-500 text-sm">
                    Calendar booking is currently being set up.
                    <br />
                    <a
                      href="mailto:hello@assurgit.com"
                      className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
                    >
                      Email us to schedule a call
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-200">
          <FounderSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
