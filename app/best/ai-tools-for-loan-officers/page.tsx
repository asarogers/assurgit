import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Best AI Tools for Loan Officers in 2026 (Ranked by Category)",
  description:
    "The best AI tools for loan officers in 2026 — video content, CRM automation, lead generation, and more. Ranked by what actually moves the needle for mortgage professionals.",
  openGraph: {
    title: "Best AI Tools for Loan Officers in 2026",
    description:
      "Which AI tools do loan officers actually use to grow their business? Ranked by category: video content, lead gen, CRM, and client education.",
    type: "article",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Best AI Tools for Loan Officers 2026",
  "description": "Ranked list of the best AI tools for loan officers and mortgage professionals in 2026.",
  "numberOfItems": 6,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Assurgit — AI Video Content",
      "url": "https://assurgit.com",
      "description": "Done-for-you AI video content for loan officers. 5 buyer education videos per week, published to all platforms automatically. Starting at $397/month."
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Total Expert — CRM",
      "url": "https://totalexpert.com",
      "description": "Mortgage-specific CRM with AI automation for lead nurturing, referral partner management, and compliance-aware communications."
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Mortgage Coach — Proposal Tool",
      "url": "https://www.mortgagecoach.com",
      "description": "AI-powered Total Cost Analysis tool for loan officers. Visualizes loan comparisons and helps present options to buyers."
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Floify — Loan Automation",
      "url": "https://floify.com",
      "description": "Automated loan application and document collection platform. Reduces manual back-and-forth with borrowers."
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "ChatGPT / Claude — Content Drafting",
      "url": "https://openai.com",
      "description": "General-purpose AI writing assistants. Useful for drafting emails, social posts, and scripts — but require significant time investment to use effectively."
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Jasper — Marketing Copy",
      "url": "https://jasper.ai",
      "description": "AI marketing copy tool. Useful for writing ads, landing pages, and email sequences — though not mortgage-specific."
    },
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What AI tools do successful loan officers use?",
      "acceptedAnswer": { "@type": "Answer", "text": "The most impactful AI tools for loan officers fall into three categories: (1) Content and visibility tools — like Assurgit for video content — that build authority and generate inbound leads; (2) CRM and automation tools — like Total Expert — that manage referral relationships and nurture leads at scale; and (3) Presentation tools — like Mortgage Coach — that help convert consultations into closed loans." }
    },
    {
      "@type": "Question",
      "name": "Can AI tools help loan officers get more referrals from real estate agents?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, particularly video content tools. Real estate agents refer to loan officers they trust and who keep their clients educated. Consistent educational video content — market updates, buyer process explainers, loan product comparisons — positions you as the knowledgeable professional agents want to recommend. Assurgit clients who publish consistently report stronger referral relationships because agents see them as the visible expert in their market." }
    },
    {
      "@type": "Question",
      "name": "Is AI-generated content compliant for mortgage professionals?",
      "acceptedAnswer": { "@type": "Answer", "text": "Content compliance depends on what you publish and your state and employer guidelines. Assurgit writes educational content — not specific rate quotes or lending commitments — and every script comes to you for review before rendering. You are the compliance checkpoint. We work within your content guidelines, and many loan officers on our platform use the review window to ensure NMLS and employer requirements are met." }
    },
    {
      "@type": "Question",
      "name": "What's the best AI tool for loan officers who want more clients?",
      "acceptedAnswer": { "@type": "Answer", "text": "For top-of-funnel visibility and lead generation, Assurgit is purpose-built for loan officers who want to build authority through consistent video content. For mid-funnel CRM and referral management, Total Expert is the mortgage industry standard. The two tools solve different problems — Assurgit brings people into your orbit, Total Expert helps you convert and retain them." }
    },
  ]
};

const tools = [
  {
    rank: 1,
    name: "Assurgit",
    category: "Video Content & Authority Building",
    isUs: true,
    price: "From $397/month",
    whatItDoes: "Builds your AI avatar and voice clone, writes research-backed scripts for your market, and publishes 5 buyer/agent education videos per week across Instagram, TikTok, LinkedIn, and YouTube.",
    bestFor: "Loan officers who want to build local authority and generate inbound leads through consistent educational content",
    timeRequired: "~30 min/week (optional script review)",
    verdict: "The highest-leverage AI tool for most loan officers. Content is the top-of-funnel. If buyers and agents aren't finding you before they're ready to transact, the best CRM in the world won't help. Assurgit solves the visibility problem.",
    proofPoint: "WellPreparedLife grew 50% in their first week — the same pipeline applies to any professional service",
    stars: 5,
  },
  {
    rank: 2,
    name: "Total Expert",
    category: "Mortgage CRM & Referral Management",
    isUs: false,
    price: "Custom pricing (enterprise)",
    whatItDoes: "Mortgage-specific CRM with AI-powered lead nurturing, referral partner tracking, compliance-aware email sequences, and automated follow-up for borrowers and agents.",
    bestFor: "Loan officers managing large referral networks and long-term borrower relationships",
    timeRequired: "Ongoing management — significant setup and configuration required",
    verdict: "The industry standard for mortgage CRM. Powerful for managing existing relationships at scale, but doesn't help with initial visibility or lead generation.",
    proofPoint: null,
    stars: 4,
  },
  {
    rank: 3,
    name: "Mortgage Coach",
    category: "Loan Presentation & Conversion",
    isUs: false,
    price: "$150–400/month",
    whatItDoes: "Creates visual Total Cost Analysis presentations that help borrowers understand and compare loan options. AI-powered personalization for each borrower's scenario.",
    bestFor: "Loan officers looking to increase consultation-to-application conversion rates",
    timeRequired: "Setup per client — used in consultations",
    verdict: "Excellent for closing more of the leads you already have. Not a lead generation tool — works best when combined with visibility-building tools like Assurgit.",
    proofPoint: null,
    stars: 4,
  },
  {
    rank: 4,
    name: "Floify",
    category: "Loan Automation & Document Collection",
    isUs: false,
    price: "$79–199/month",
    whatItDoes: "Automated loan application portal and document collection. AI-assisted borrower communication reduces manual follow-up and speeds up the loan process.",
    bestFor: "Loan officers handling high volume who need to streamline the application and documentation process",
    timeRequired: "Setup + ongoing borrower onboarding",
    verdict: "Strong operational tool for efficiency. Reduces the administrative drag in loan processing, but doesn't help with business development or visibility.",
    proofPoint: null,
    stars: 3,
  },
  {
    rank: 5,
    name: "ChatGPT / Claude",
    category: "General AI Writing Assistant",
    isUs: false,
    price: "$20/month",
    whatItDoes: "General-purpose AI that can draft emails, social posts, scripts, and marketing copy with prompting. Not mortgage-specific — requires significant prompting and editing for professional use.",
    bestFor: "Loan officers who want to draft content themselves and are willing to invest time in prompting and editing",
    timeRequired: "3–5+ hours/week to use effectively for content creation",
    verdict: "Useful for ad-hoc writing tasks. Not a complete content strategy — you're still doing most of the work. A significant upgrade from writing from scratch, but not hands-off.",
    proofPoint: null,
    stars: 3,
  },
  {
    rank: 6,
    name: "Jasper",
    category: "AI Marketing Copy",
    isUs: false,
    price: "$39–99/month",
    whatItDoes: "AI tool for generating marketing copy, ads, social posts, and email sequences. Not mortgage-specific.",
    bestFor: "Loan officers with marketing budgets and time to write and edit AI-generated content",
    timeRequired: "Moderate — still requires significant editing and strategy",
    verdict: "Decent for written content at scale. Doesn't produce video or handle publishing. Requires human effort to use effectively.",
    proofPoint: null,
    stars: 2,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-4 h-4 ${i <= n ? "text-yellow-400" : "text-gray-700"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function AIToolsForLoanOfficersPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-yellow-500/20 text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-500/30">Best Of</span>
            <span className="text-gray-500 text-xs">Updated March 2026 · By Asa Rogers, Founder of Assurgit</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
            Best AI Tools for Loan Officers in 2026: What Actually Moves the Needle
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Most &ldquo;best AI tools&rdquo; lists for loan officers are generic. This one focuses on tools that solve real problems loan officers face: building visibility with buyers and agents, converting consultations into applications, and managing referral relationships at scale. Here&apos;s what&apos;s worth using in 2026.
          </p>

          <div className="bg-amber-600/10 border border-amber-500/30 rounded-xl p-5 text-sm">
            <p className="text-amber-400 font-semibold mb-1">The framework we used:</p>
            <p className="text-gray-400">Loan officer growth problems fall into three buckets: visibility (do people know you exist?), conversion (do consultations turn into applications?), and operations (can you handle volume efficiently?). The best tools solve one of these clearly — not all three poorly.</p>
          </div>
        </div>

        {/* Tool list */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10 mb-16">
          {tools.map((tool) => (
            <div key={tool.name} className={`border rounded-2xl overflow-hidden ${tool.isUs ? "border-indigo-500/50" : "border-gray-800"}`}>
              <div className={`px-6 py-5 flex items-start justify-between gap-4 ${tool.isUs ? "bg-indigo-600/10" : "bg-gray-900"}`}>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-gray-500 text-sm font-bold">#{tool.rank}</span>
                    <h3 className="text-xl font-black text-white">{tool.name}</h3>
                    {tool.isUs && <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full font-semibold">This Site</span>}
                  </div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider">{tool.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <Stars n={tool.stars} />
                  <p className="text-gray-400 font-bold text-sm mt-1">{tool.price}</p>
                </div>
              </div>

              <div className="px-6 py-5 bg-gray-950">
                {tool.proofPoint && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3 mb-4 text-sm text-emerald-400">
                    📈 <strong>Proven result:</strong> {tool.proofPoint}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm mb-5">
                  {[
                    ["What it does", tool.whatItDoes],
                    ["Best for", tool.bestFor],
                    ["Time required", tool.timeRequired],
                  ].map(([label, val]) => (
                    <div key={String(label)} className="flex gap-2 sm:col-span-2">
                      <span className="text-gray-600 shrink-0 w-28">{label}:</span>
                      <span className="text-gray-300">{String(val)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-800 pt-4">
                  <p className="text-sm font-semibold text-white mb-1">Verdict</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{tool.verdict}</p>
                </div>

                {tool.isUs && (
                  <div className="mt-4 flex gap-3">
                    <Link href="/book" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors">
                      Book a Free Call
                    </Link>
                    <Link href="/for/loan-officers" className="border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold px-5 py-2 rounded-lg text-sm transition-colors">
                      See Loan Officer Page
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 mb-8">
          <h2 className="text-2xl font-black text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((q, i) => (
              <details key={i} className="bg-gray-900 border border-gray-800 rounded-xl group">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <span className="text-white font-medium text-sm">{q.name}</span>
                  <svg className="w-4 h-4 text-gray-500 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/loan-officers" className="text-indigo-400 hover:underline">AI Video for Loan Officers</Link>
            <Link href="/for/mortgage-brokers" className="text-indigo-400 hover:underline">AI Video for Mortgage Brokers</Link>
            <Link href="/for/real-estate-agents" className="text-indigo-400 hover:underline">AI Video for Real Estate Agents</Link>
            <Link href="/pricing" className="text-indigo-400 hover:underline">Pricing — from $397/mo</Link>
            <Link href="/" className="text-indigo-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
