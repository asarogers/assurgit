import Link from "next/link";
import { BarChart3 } from "lucide-react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata = {
  title: "Free Tools for Video Content Creators | Assurgit",
  description:
    "Free AI tools built by Assurgit to help you get more from video content. AI video tool rankings and more.",
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

          {/* Tool Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
