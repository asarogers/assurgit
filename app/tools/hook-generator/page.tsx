"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Copy, Check, Loader2 } from "lucide-react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

const NICHES = [
  "Coaching",
  "Consulting",
  "Real Estate",
  "SaaS / Tech",
  "E-commerce",
  "Finance & Wealth",
  "Fitness & Health",
  "Marketing Agency",
  "Law & Legal",
  "Restaurant & Food",
  "Other",
];

const PLATFORMS = ["LinkedIn", "TikTok", "Instagram", "YouTube"];

type Hook = {
  style: string;
  text: string;
};

const STYLE_COLORS: Record<string, string> = {
  Curiosity: "bg-blue-100 text-blue-700",
  Authority: "bg-purple-100 text-purple-700",
  "Pain Point": "bg-red-100 text-red-700",
  Story: "bg-orange-100 text-orange-700",
  "Data / Statistic": "bg-green-100 text-green-700",
  Contrarian: "bg-yellow-100 text-yellow-700",
  "Before & After": "bg-teal-100 text-teal-700",
  "Direct Challenge": "bg-pink-100 text-pink-700",
};

export default function HookGeneratorPage() {
  const [niche, setNiche] = useState("Coaching");
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("LinkedIn");
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim() || loading) return;
    setLoading(true);
    setError("");
    setHooks([]);

    try {
      const res = await fetch("/api/hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, topic: topic.trim(), platform }),
      });

      const data = await res.json() as any;

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setHooks(data.hooks || []);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyHook = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = async () => {
    const allText = hooks
      .map((h) => `[${h.style}]\n${h.text}`)
      .join("\n\n");
    await navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-100 mb-4">
              <Zap className="w-3 h-3" />
              Free Tool
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              AI Video Hook Generator
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Generate 8 high-converting video hooks for any topic in seconds.
              Pick your niche, describe your topic, choose a platform — get
              hooks in every style.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
            <div className="space-y-6">
              {/* Row 1: Niche + Platform */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Niche */}
                <div>
                  <label
                    htmlFor="niche"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Niche
                  </label>
                  <select
                    id="niche"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {NICHES.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Platform */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {PLATFORMS.map((p) => (
                      <button
                        key={p}
                        onClick={() => setPlatform(p)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          platform === p
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Topic */}
              <div>
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  What&apos;s your video about?
                </label>
                <textarea
                  id="topic"
                  rows={3}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Why most coaches undercharge for their services"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading || !topic.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Hooks"
                )}
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Results */}
          {hooks.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900">
                  Your 8 Hooks
                </h2>
                <button
                  onClick={copyAll}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
                >
                  {copiedAll ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      Copied all
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy all
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hooks.map((hook, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
                  >
                    <div>
                      <span
                        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${
                          STYLE_COLORS[hook.style] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {hook.style}
                      </span>
                      <p className="text-gray-800 text-base leading-relaxed">
                        {hook.text}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => copyHook(hook.text, index)}
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-500" />
                            <span className="text-green-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 bg-indigo-50 rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Want 7 full scripts like these every week?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xl mx-auto mb-6">
                  Assurgit takes these hooks and builds complete,
                  research-backed scripts in your voice — then renders and
                  publishes the videos for you.
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
                >
                  See How It Works
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
