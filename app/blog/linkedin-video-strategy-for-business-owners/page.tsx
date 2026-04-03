import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "LinkedIn Video Strategy for Business Owners in 2026 (Without Filming)",
  description:
    "LinkedIn's algorithm is prioritizing video harder than ever. Here's how business owners are showing up every week on LinkedIn without picking up a camera.",
  openGraph: {
    title: "LinkedIn Video Strategy for Business Owners in 2026 (Without Filming)",
    description:
      "LinkedIn's algorithm is prioritizing video harder than ever. Here's how business owners are showing up every week on LinkedIn without picking up a camera.",
    type: "article",
  },
};

export default function LinkedInVideoStrategyPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Article Header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors mb-8 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="bg-brand-accent/20 text-brand-accent text-xs font-semibold px-3 py-1 rounded-full border border-brand-accent/30">
              LinkedIn
            </span>
            <span className="text-gray-500 text-xs">8 min read</span>
            <span className="text-gray-500 text-xs">March 2026</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            LinkedIn Video Strategy for Business Owners in 2026 (Without Picking Up a Camera)
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            LinkedIn quietly became the best platform for B2B video. The algorithm is rewarding it heavily, the audience is actively watching, and most of your competitors still aren&apos;t doing it consistently. That window won&apos;t stay open forever.
          </p>
        </div>

        {/* Article Body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Section 1 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            Why LinkedIn Video Is Different in 2026
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            LinkedIn has always been a text platform at its core — long-form posts, thought leadership essays, the occasional carousel. Video was treated as an afterthought for years. That changed.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            In 2024, LinkedIn rolled out a TikTok-style vertical video feed. In 2025, they started aggressively boosting video content in the main feed — giving native video posts reach that written posts hadn&apos;t seen since 2019. In 2026, video is the single fastest way to grow a LinkedIn audience from scratch.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            The difference between LinkedIn and Instagram or TikTok: the people watching your videos can actually buy from you. A 500-view LinkedIn video can generate more qualified leads than a 50,000-view TikTok. The platform routes your content to professional decision-makers in your industry — by default.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            What the LinkedIn Algorithm Actually Rewards in 2026
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            The LinkedIn algorithm has three levers it responds to: dwell time, early engagement, and posting frequency. Video dominates all three.
          </p>

          <div className="space-y-4 mb-6">
            {[
              {
                label: "Dwell time",
                detail: "Video keeps people on the post longer than text. LinkedIn tracks how long someone watches before scrolling — longer watch time = more distribution.",
              },
              {
                label: "Early engagement",
                detail: "The first 60–90 minutes after posting determine reach. A video that generates 10 comments in the first hour gets pushed to second- and third-degree connections automatically.",
              },
              {
                label: "Posting frequency",
                detail: "LinkedIn rewards accounts that post consistently. Three to five times per week outperforms accounts that post once or twice, regardless of content quality. The algorithm interprets consistency as authority.",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="bg-brand-accent/20 text-brand-accent font-bold text-xs px-2 py-1 rounded-md flex-shrink-0 mt-0.5 whitespace-nowrap">{item.label}</span>
                <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">
            Notice that none of those three things require high production value. They require showing up — consistently, with something worth watching.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            The Four Video Formats That Perform Best on LinkedIn
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            Not all video works equally well. LinkedIn&apos;s B2B audience responds to content that teaches, challenges, or makes them look smart for sharing it. Here are the four formats with the highest consistent performance:
          </p>

          <div className="space-y-6 mb-8">
            {[
              {
                num: "01",
                title: "The Contrarian Take",
                length: "45–90 seconds",
                hook: "\"Everyone says X. Here's why that's wrong.\"",
                why: "Disagreement triggers comments. Comments trigger reach. This format generates more engagement per view than any other on LinkedIn.",
              },
              {
                num: "02",
                title: "The Industry Insight",
                length: "60–120 seconds",
                hook: "\"What I'm seeing happen in [your niche] right now.\"",
                why: "Professional audiences follow you for insider knowledge. Sharing what you're observing in your market positions you as a practitioner, not a commentator.",
              },
              {
                num: "03",
                title: "The Process Breakdown",
                length: "90–150 seconds",
                hook: "\"Here's exactly how we [did X] for a client last week.\"",
                why: "Specificity is the credibility signal on LinkedIn. Anyone can share opinions. Showing real work — even briefly — separates you from 95% of creators.",
              },
              {
                num: "04",
                title: "The Direct Question",
                length: "30–60 seconds",
                hook: "\"Quick question for [audience]. What's your approach to X?\"",
                why: "Short, direct questions with a clear ask generate comment velocity fast. They work especially well when posted early in the week (Monday–Tuesday).",
              },
            ].map((item) => (
              <div key={item.num} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-brand-accent font-black text-sm font-mono">{item.num}</span>
                    <h3 className="text-white font-bold text-lg mt-0.5">{item.title}</h3>
                  </div>
                  <span className="text-gray-500 text-xs border border-gray-700 px-2 py-1 rounded-md whitespace-nowrap">{item.length}</span>
                </div>
                <p className="text-brand-accent text-sm font-mono mb-3 italic">{item.hook}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.why}</p>
              </div>
            ))}
          </div>

          {/* Section 4 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            The Real Problem: Knowing What Works Doesn&apos;t Help You Post It
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            Most business owners reading this already know they should be posting video on LinkedIn. The problem isn&apos;t awareness — it&apos;s execution.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            To post three to five LinkedIn videos a week, you need to:
          </p>

          <ul className="space-y-2 mb-6">
            {[
              "Decide what to talk about (based on what your audience actually cares about, not just what you feel like saying)",
              "Write a script that works on video — different from writing a post",
              "Film it (or record it, or find some way to produce it)",
              "Edit, caption, and format it for LinkedIn's vertical feed",
              "Pick the right posting time and actually publish it",
              "Do this again tomorrow, and the day after that, and every week for the next six months",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                <svg className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <p className="text-gray-300 leading-relaxed mb-4">
            That last one is where everyone breaks. Not because they run out of ideas. Because they run out of time, energy, or both — and the system collapses.
          </p>

          {/* Section 5 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            How Business Owners Are Posting Consistently Without Filming
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            The shift happening right now: business owners are separating their knowledge from their presence. You have the expertise. Someone else handles everything that turns it into published video.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            With AI avatar and voice clone technology, a 30-minute setup session produces a digital version of you that can deliver scripts in your voice, with your face, with your mannerisms — indefinitely. The research, the scripting, the rendering, the captioning, the publishing: all delegated.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            What you get back isn&apos;t just time. It&apos;s the compounding effect of showing up on LinkedIn every single week — whether you&apos;re traveling, in back-to-back client calls, or taking a month off. The system doesn&apos;t need you to film anything.
          </p>

          {/* Stat block */}
          <div className="grid sm:grid-cols-3 gap-4 my-10">
            {[
              { stat: "5×", label: "more reach for video vs. text posts on LinkedIn in 2026" },
              { stat: "6 mo", label: "average time to see compounding audience growth from consistent video" },
              { stat: "30 min", label: "total setup time to create your AI avatar and voice clone" },
            ].map((item) => (
              <div key={item.stat} className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
                <p className="text-3xl font-black text-brand-accent mb-1">{item.stat}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Section 6 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            What a LinkedIn Video Week Looks Like With Assurgit
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            Here&apos;s the weekly rhythm for a business owner using Assurgit for LinkedIn:
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                day: "Monday",
                detail: "Two videos go live. Typically a contrarian take and a process breakdown — timed for peak LinkedIn engagement (8–10am in your timezone).",
              },
              {
                day: "Wednesday",
                detail: "One industry insight video posts. Mid-week is when LinkedIn's professional audience is most active and receptive to learning content.",
              },
              {
                day: "Friday",
                detail: "Two videos close the week — often a direct question format and a lighter take. Friday content gets lower immediate engagement but strong weekend reach.",
              },
              {
                day: "Every Monday",
                detail: "You receive five scripts for optional review. Read them, approve them, or skip review entirely — they auto-publish either way.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="bg-brand-accent/20 text-brand-accent font-bold text-xs px-2 py-1 rounded-md flex-shrink-0 min-w-[76px] text-center mt-0.5">{item.day}</span>
                <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">
            Over six months, that&apos;s over 120 LinkedIn videos in your avatar and voice — building authority, attracting inbound, and compounding in the algorithm while you&apos;re running your business.
          </p>

          {/* Closing CTA */}
          <div className="mt-14 bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to show up on LinkedIn every week without filming?
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
              Book a call and we&apos;ll show you what your LinkedIn presence could look like in 90 days — with your face, your voice, and zero filming required.
            </p>
            <Link
              href="/book"
              className="inline-block bg-brand-accent hover:bg-brand-accent-hov text-white font-semibold px-10 py-4 rounded-lg transition-colors"
            >
              Book a Free Call
            </Link>
          </div>

        </article>
      </main>

      <Footer />
    </div>
  );
}
