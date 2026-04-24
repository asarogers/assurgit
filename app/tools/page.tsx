import Link from "next/link";
import { BarChart3, Search, Trophy } from "lucide-react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata = {
  openGraph: {
  url: "https://assurgit.com/tools",
  images: [{ url: "https://assurgit.com/opengraph-image.png", width: 1024, height: 1024, alt: "Assurgit" }],
  },
  title: "Free Tools for Video Content Creators | Assurgit",
  description:
    "Free AI tools built by Assurgit to help you get more from video content. AI video tool rankings and more.",
  alternates: {
    canonical: 'https://assurgit.com/tools',
  },
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Free Tools for Video Content Creators
            </h1>
            <p className="text-gray-500 text-lg">
              Built by Assurgit to help you get more from video content.
            </p>
          </div>

          {/* Intro Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Video Tools Matter</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              In today's digital landscape, video content is more important than ever. It captures attention, conveys messages quickly, and builds engagement across platforms. However, creating high-quality video content can be time-consuming and resource-intensive.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              At Assurgit, we believe everyone deserves access to powerful tools that help them create better video content without breaking the bank. That's why we've developed a suite of free AI-powered tools designed specifically for creators like you.
            </p>
          </div>

          {/* Tool Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {/* SEO Audit */}
            <Link
              href="/tools/seo-audit"
              className="group bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-md hover:border-green-200 transition-all flex flex-col gap-4"
            >
              <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <Search className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  Free SEO Audit
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Paste any URL and get a full AI-powered SEO audit in under a
                  minute. Checks meta tags, broken links, structured data,
                  content quality, and more.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">
                  Free · No sign-up needed
                </span>
                <span className="text-green-600 text-sm font-semibold group-hover:translate-x-0.5 transition-transform">
                  Run audit →
                </span>
              </div>
            </Link>

            {/* AI Tool Rankings */}
            <Link
              href="/tools/ai-video-tools"
              className="group bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col gap-4"
            >
              <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">
                  AI Video Tool Rankings 2026
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  The most comprehensive ranking of every AI video tool. Compare
                  avatar quality, voice cloning, publishing automation, and
                  value across 13 tools.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">
                  Free · Updated monthly
                </span>
                <span className="text-indigo-600 text-sm font-semibold group-hover:translate-x-0.5 transition-transform">
                  See Rankings →
                </span>
              </div>
            </Link>

            {/* SEO Leaderboard */}
            <Link
              href="/tools/seo-leaderboard"
              className="group bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-md hover:border-amber-200 transition-all flex flex-col gap-4"
            >
              <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                <Trophy className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                  SEO Leaderboard
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  See which sites score highest on SEO health. Rankings updated
                  automatically after every full-site audit.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">
                  Live · Auto-updated
                </span>
                <span className="text-amber-600 text-sm font-semibold group-hover:translate-x-0.5 transition-transform">
                  View rankings →
                </span>
              </div>
            </Link>

          </div>

          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Use Assurgit Tools?</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-indigo-500 text-lg font-medium">✓</span>
                <p className="text-gray-600">Save time with automated video creation and editing processes.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-indigo-500 text-lg font-medium">✓</span>
                <p className="text-gray-600">Enhance your creativity with AI-powered script generation and voice-over suggestions.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-indigo-500 text-lg font-medium">✓</span>
                <p className="text-gray-600">Improve your video production quality with advanced editing tools and effects.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-indigo-500 text-lg font-medium">✓</span>
                <p className="text-gray-600">Boost engagement with personalized content recommendations based on your audience.</p>
              </li>
            </ul>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details>
                <summary className="px-4 py-2 bg-white rounded-lg cursor-pointer hover:bg-gray-50">
                  What types of video content can I create with these tools?
                </summary>
                <p className="text-gray-600 mt-2">
                  Our tools support a variety of content types, including social media posts, marketing videos, training materials, and entertainment content. Whether you're creating short clips or long-form videos, our AI-powered solutions are designed to help you succeed.
                </p>
              </details>

              <details>
                <summary className="px-4 py-2 bg-white rounded-lg cursor-pointer hover:bg-gray-50">
                  Do I need any technical skills to use these tools?
                </summary>
                <p className="text-gray-600 mt-2">
                  No! Our tools are designed with ease of use in mind. Even if you have no prior experience, you can create professional-looking videos with just a few clicks.
                </p>
              </details>

              <details>
                <summary className="px-4 py-2 bg-white rounded-lg cursor-pointer hover:bg-gray-50">
                  How do the AI tools improve my video production process?
                </summary>
                <p className="text-gray-600 mt-2">
                  Our AI-powered tools automate time-consuming tasks like script writing, voice-over creation, and video editing. This allows you to focus on your creative vision while letting the technology handle the technical aspects.
                </p>
              </details>

              <details>
                <summary className="px-4 py-2 bg-white rounded-lg cursor-pointer hover:bg-gray-50">
                  Are there any limitations to using these free tools?
                </summary>
                <p className="text-gray-600 mt-2">
                  While our tools are completely free to use, we do offer premium features for users who want even more advanced functionality. However, the core features of each tool are available at no cost.
                </p>
              </details>

            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}