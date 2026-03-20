"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ExternalLink, Check, } from "lucide-react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

type Tool = {
  id: string;
  name: string;
  tagline: string;
  website: string;
  category: string;
  priceLabel: string;
  priceRange: string;
  description: string;
  scores: {
    overall: number;
    avatarQuality: number;
    voiceQuality: number;
    easeOfUse: number;
    scriptQuality: number;
    publishingAutomation: number;
    valueForMoney: number;
  };
  features: {
    customAvatar: boolean;
    voiceClone: boolean;
    scriptWriting: boolean;
    autoPublishing: boolean;
    humanQC: boolean;
    researchPipeline: boolean;
    strategyCall: boolean;
  };
  platforms: string[];
  bestFor: string;
  verdict: string;
  isAssurgit?: boolean;
};

const ALL_TOOLS: Tool[] = [
  {
    id: "assurgit",
    name: "Assurgit",
    tagline: "Fully Managed AI Video Service",
    website: "https://assurgit.com",
    category: "Done-For-You",
    priceLabel: "From $1,997/mo",
    priceRange: "agency",
    description:
      "The only fully done-for-you AI video service. Assurgit builds your personal avatar and voice clone, writes research-backed scripts, renders videos, does human QC, and publishes to all 4 platforms weekly. You never film.",
    scores: {
      overall: 9.8,
      avatarQuality: 9.5,
      voiceQuality: 9.5,
      easeOfUse: 10,
      scriptQuality: 10,
      publishingAutomation: 10,
      valueForMoney: 9.0,
    },
    features: {
      customAvatar: true,
      voiceClone: true,
      scriptWriting: true,
      autoPublishing: true,
      humanQC: true,
      researchPipeline: true,
      strategyCall: true,
    },
    platforms: ["Instagram", "TikTok", "LinkedIn", "YouTube"],
    bestFor:
      "Businesses and personal brands who want 5 videos/week without any involvement",
    verdict:
      "The only service that handles the full pipeline — avatar, scripts, rendering, QC, and publishing. Not a tool; a system.",
    isAssurgit: true,
  },
  {
    id: "heygen",
    name: "HeyGen",
    tagline: "AI Video Generation Platform",
    website: "https://heygen.com",
    category: "Avatar Video",
    priceLabel: "$29–$399/mo",
    priceRange: "under100",
    description:
      "Industry-leading AI avatar video platform. Custom avatar training from a short video. High-quality rendering. No script writing, no publishing — a tool, not a service.",
    scores: {
      overall: 8.2,
      avatarQuality: 9.5,
      voiceQuality: 9.0,
      easeOfUse: 8.0,
      scriptQuality: 1.0,
      publishingAutomation: 1.0,
      valueForMoney: 7.5,
    },
    features: {
      customAvatar: true,
      voiceClone: true,
      scriptWriting: false,
      autoPublishing: false,
      humanQC: false,
      researchPipeline: false,
      strategyCall: false,
    },
    platforms: ["Download only"],
    bestFor:
      "Tech-comfortable creators who will handle scripting and publishing themselves",
    verdict:
      "Best avatar quality in the DIY category. The render engine Assurgit and other agencies use under the hood.",
  },
  {
    id: "synthesia",
    name: "Synthesia",
    tagline: "Enterprise AI Video Platform",
    website: "https://synthesia.io",
    category: "Avatar Video",
    priceLabel: "$30–$100/mo (enterprise custom)",
    priceRange: "under100",
    description:
      "Enterprise-focused avatar video platform. Strong stock avatar library. Custom avatars on higher plans. L&D and corporate training focus. No publishing, no scripts.",
    scores: {
      overall: 7.5,
      avatarQuality: 8.0,
      voiceQuality: 7.5,
      easeOfUse: 8.5,
      scriptQuality: 1.0,
      publishingAutomation: 1.0,
      valueForMoney: 6.5,
    },
    features: {
      customAvatar: true,
      voiceClone: false,
      scriptWriting: false,
      autoPublishing: false,
      humanQC: false,
      researchPipeline: false,
      strategyCall: false,
    },
    platforms: ["Download only"],
    bestFor: "Enterprise teams creating training and internal communications content",
    verdict:
      "Excellent for L&D and corporate use cases. Overkill for social media content.",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    tagline: "AI Voice Cloning",
    website: "https://elevenlabs.io",
    category: "Voice Cloning",
    priceLabel: "$5–$330/mo",
    priceRange: "under100",
    description:
      "Industry-best voice cloning. Not a video tool — pairs with other platforms. Essential component of a DIY AI video stack.",
    scores: {
      overall: 8.5,
      avatarQuality: 1.0,
      voiceQuality: 10.0,
      easeOfUse: 8.0,
      scriptQuality: 1.0,
      publishingAutomation: 1.0,
      valueForMoney: 9.0,
    },
    features: {
      customAvatar: false,
      voiceClone: true,
      scriptWriting: false,
      autoPublishing: false,
      humanQC: false,
      researchPipeline: false,
      strategyCall: false,
    },
    platforms: ["API / Download only"],
    bestFor: "Developers building custom AI voice pipelines",
    verdict:
      "Best voice cloning quality available. A component, not a complete solution.",
  },
  {
    id: "runway",
    name: "Runway",
    tagline: "AI Creative Video Studio",
    website: "https://runwayml.com",
    category: "Video Generation",
    priceLabel: "$15–$95/mo",
    priceRange: "under100",
    description:
      "Professional AI video generation and editing. Text-to-video, image-to-video, AI editing tools. Creative/cinematic focus. No avatar, no publishing.",
    scores: {
      overall: 7.8,
      avatarQuality: 3.0,
      voiceQuality: 3.0,
      easeOfUse: 6.5,
      scriptQuality: 1.0,
      publishingAutomation: 1.0,
      valueForMoney: 7.0,
    },
    features: {
      customAvatar: false,
      voiceClone: false,
      scriptWriting: false,
      autoPublishing: false,
      humanQC: false,
      researchPipeline: false,
      strategyCall: false,
    },
    platforms: ["Download only"],
    bestFor:
      "Filmmakers, creatives, and brands producing cinematic short content",
    verdict:
      "Industry leader in generative video quality. Wrong tool for business talking-head content.",
  },
  {
    id: "kling",
    name: "Kling AI",
    tagline: "Text & Image to Video Generator",
    website: "https://klingai.com",
    category: "Video Generation",
    priceLabel: "Free – $66/mo",
    priceRange: "free",
    description:
      "High-quality text-to-video and image-to-video generation. Cinematic quality improving fast. No avatar, no voice, no publishing. Creative/experimental.",
    scores: {
      overall: 7.5,
      avatarQuality: 2.0,
      voiceQuality: 1.0,
      easeOfUse: 7.0,
      scriptQuality: 1.0,
      publishingAutomation: 1.0,
      valueForMoney: 8.0,
    },
    features: {
      customAvatar: false,
      voiceClone: false,
      scriptWriting: false,
      autoPublishing: false,
      humanQC: false,
      researchPipeline: false,
      strategyCall: false,
    },
    platforms: ["Download only"],
    bestFor:
      "Creative agencies and filmmakers needing generative B-roll and visual content",
    verdict:
      "Rapidly improving video generation quality. Wrong category for business social content.",
  },
  {
    id: "creatify",
    name: "Creatify",
    tagline: "AI Video Ads Generator",
    website: "https://creatify.ai",
    category: "Video Generation",
    priceLabel: "$39–$99/mo",
    priceRange: "under100",
    description:
      "Specialized in AI video ads for e-commerce products. URL-to-video technology. Good for paid ads. Limited for organic content. Not avatar-based.",
    scores: {
      overall: 7.0,
      avatarQuality: 5.0,
      voiceQuality: 6.5,
      easeOfUse: 8.5,
      scriptQuality: 5.0,
      publishingAutomation: 3.0,
      valueForMoney: 7.5,
    },
    features: {
      customAvatar: false,
      voiceClone: false,
      scriptWriting: true,
      autoPublishing: false,
      humanQC: false,
      researchPipeline: false,
      strategyCall: false,
    },
    platforms: ["Download only"],
    bestFor: "E-commerce brands running paid video ads",
    verdict:
      "Strong for product ad creation. Not designed for personal brand or organic content.",
  },
  {
    id: "pika",
    name: "Pika",
    tagline: "AI Video Generation",
    website: "https://pika.art",
    category: "Video Generation",
    priceLabel: "$8–$70/mo",
    priceRange: "under100",
    description:
      "Text and image to video generation with strong motion quality. Creative tool for visual content. No avatar, no voice cloning, no publishing.",
    scores: {
      overall: 7.0,
      avatarQuality: 1.0,
      voiceQuality: 1.0,
      easeOfUse: 8.0,
      scriptQuality: 1.0,
      publishingAutomation: 1.0,
      valueForMoney: 7.5,
    },
    features: {
      customAvatar: false,
      voiceClone: false,
      scriptWriting: false,
      autoPublishing: false,
      humanQC: false,
      researchPipeline: false,
      strategyCall: false,
    },
    platforms: ["Download only"],
    bestFor: "Creative agencies producing visual-forward content",
    verdict:
      "Great for B-roll and motion graphics. Not designed for talking-head business content.",
  },
  {
    id: "descript",
    name: "Descript",
    tagline: "AI Video Editing Platform",
    website: "https://descript.com",
    category: "Editing",
    priceLabel: "$12–$24/mo",
    priceRange: "under100",
    description:
      "Script-based video editing. AI filler word removal, green screen, voice clone for overdubs. Still requires filming. Strong for podcast and talking head editing.",
    scores: {
      overall: 7.2,
      avatarQuality: 4.0,
      voiceQuality: 7.5,
      easeOfUse: 8.5,
      scriptQuality: 1.0,
      publishingAutomation: 2.0,
      valueForMoney: 8.5,
    },
    features: {
      customAvatar: false,
      voiceClone: true,
      scriptWriting: false,
      autoPublishing: false,
      humanQC: false,
      researchPipeline: false,
      strategyCall: false,
    },
    platforms: ["Download only"],
    bestFor:
      "Content creators who film themselves and want faster editing",
    verdict:
      "Best AI editing tool for people who still film. Doesn't solve the filming problem.",
  },
  {
    id: "opus-clip",
    name: "Opus Clip",
    tagline: "AI Short-Form Video Repurposer",
    website: "https://opus.pro",
    category: "Editing",
    priceLabel: "$19–$149/mo",
    priceRange: "under100",
    description:
      "Automatically clips long videos into short-form highlights. Good at identifying viral moments. Requires source video. No creation, only repurposing.",
    scores: {
      overall: 7.0,
      avatarQuality: 1.0,
      voiceQuality: 1.0,
      easeOfUse: 9.0,
      scriptQuality: 1.0,
      publishingAutomation: 5.0,
      valueForMoney: 8.0,
    },
    features: {
      customAvatar: false,
      voiceClone: false,
      scriptWriting: false,
      autoPublishing: true,
      humanQC: false,
      researchPipeline: false,
      strategyCall: false,
    },
    platforms: ["Instagram", "TikTok", "YouTube"],
    bestFor:
      "Podcasters and long-form creators who want to repurpose existing content",
    verdict:
      "Best-in-class for repurposing. Useless if you don't already have long-form content.",
  },
  {
    id: "invideo",
    name: "InVideo AI",
    tagline: "AI Text-to-Video Creator",
    website: "https://invideo.io",
    category: "Video Generation",
    priceLabel: "$25–$60/mo",
    priceRange: "under100",
    description:
      "Text prompt to video with stock footage, AI voiceover, and captions. Template-heavy. Not your face or voice. Good for faceless content channels.",
    scores: {
      overall: 6.5,
      avatarQuality: 2.0,
      voiceQuality: 6.0,
      easeOfUse: 9.0,
      scriptQuality: 5.0,
      publishingAutomation: 2.0,
      valueForMoney: 7.5,
    },
    features: {
      customAvatar: false,
      voiceClone: false,
      scriptWriting: true,
      autoPublishing: false,
      humanQC: false,
      researchPipeline: false,
      strategyCall: false,
    },
    platforms: ["Download only"],
    bestFor:
      "Faceless YouTube channels and brands that don't want to appear on camera",
    verdict:
      "Good for faceless content. Not suitable for personal brand video.",
  },
  {
    id: "did",
    name: "D-ID",
    tagline: "AI Talking Avatars",
    website: "https://d-id.com",
    category: "Avatar Video",
    priceLabel: "$6–$96/mo",
    priceRange: "under100",
    description:
      "Image-to-talking-avatar video. Upload a photo, add audio or text, get a talking head video. Lower quality than HeyGen. Basic plans affordable.",
    scores: {
      overall: 6.0,
      avatarQuality: 6.0,
      voiceQuality: 6.0,
      easeOfUse: 8.0,
      scriptQuality: 1.0,
      publishingAutomation: 1.0,
      valueForMoney: 6.5,
    },
    features: {
      customAvatar: true,
      voiceClone: false,
      scriptWriting: false,
      autoPublishing: false,
      humanQC: false,
      researchPipeline: false,
      strategyCall: false,
    },
    platforms: ["Download only"],
    bestFor:
      "Low-budget experimenters who want to test AI avatar video before committing",
    verdict:
      "Lowest cost entry point for avatar video. Quality gap vs. HeyGen is significant.",
  },
  {
    id: "pictory",
    name: "Pictory",
    tagline: "Script-to-Video AI",
    website: "https://pictory.ai",
    category: "Video Generation",
    priceLabel: "$23–$47/mo",
    priceRange: "under100",
    description:
      "Convert scripts and blog posts into videos with stock footage and AI voiceover. Batch processing. Faceless content only. Limited to stock media.",
    scores: {
      overall: 6.0,
      avatarQuality: 1.0,
      voiceQuality: 6.0,
      easeOfUse: 8.5,
      scriptQuality: 3.0,
      publishingAutomation: 2.0,
      valueForMoney: 7.0,
    },
    features: {
      customAvatar: false,
      voiceClone: false,
      scriptWriting: false,
      autoPublishing: false,
      humanQC: false,
      researchPipeline: false,
      strategyCall: false,
    },
    platforms: ["Download only"],
    bestFor: "Bloggers repurposing text content into faceless video",
    verdict:
      "Solid for blog-to-video repurposing. No personal brand application.",
  },
];

const USE_CASE_FILTERS = [
  "All",
  "Avatar Video",
  "Video Generation",
  "Voice Cloning",
  "Editing",
  "Done-For-You",
];

const PRICE_FILTERS = [
  { label: "All", value: "all" },
  { label: "Free", value: "free" },
  { label: "Under $100/mo", value: "under100" },
  { label: "$100–$500/mo", value: "100to500" },
  { label: "$500+/mo", value: "500plus" },
  { label: "Custom/Agency", value: "agency" },
];

const SORT_OPTIONS = [
  { label: "Overall Score", value: "overall" },
  { label: "Price (Low to High)", value: "price" },
  { label: "Avatar Quality", value: "avatarQuality" },
  { label: "Ease of Use", value: "easeOfUse" },
];

const PRICE_ORDER: Record<string, number> = {
  free: 0,
  under100: 1,
  "100to500": 2,
  "500plus": 3,
  agency: 4,
};

const FEATURE_LABELS: { key: keyof Tool["features"]; label: string }[] = [
  { key: "customAvatar", label: "Custom Avatar" },
  { key: "voiceClone", label: "Voice Clone" },
  { key: "scriptWriting", label: "Scripts Included" },
  { key: "autoPublishing", label: "Auto Publishing" },
  { key: "humanQC", label: "Human QC" },
  { key: "researchPipeline", label: "Research Pipeline" },
  { key: "strategyCall", label: "Strategy Call" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Done-For-You": "bg-indigo-100 text-indigo-700",
  "Avatar Video": "bg-purple-100 text-purple-700",
  "Video Generation": "bg-blue-100 text-blue-700",
  "Voice Cloning": "bg-teal-100 text-teal-700",
  Editing: "bg-orange-100 text-orange-700",
};

function ScoreBar({ label, score }: { label: string; score: number }) {
  const pct = (score / 10) * 100;
  const color =
    score >= 8
      ? "bg-green-500"
      : score >= 5
      ? "bg-yellow-400"
      : "bg-red-400";

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-36 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-700 w-6 text-right">
        {score}
      </span>
    </div>
  );
}

export default function AIVideoToolsPage() {
  const [useCase, setUseCase] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("overall");

  const filtered = useMemo(() => {
    let list = [...ALL_TOOLS];

    if (useCase !== "All") {
      list = list.filter((t) => t.category === useCase);
    }

    if (priceFilter !== "all") {
      list = list.filter((t) => t.priceRange === priceFilter);
    }

    list.sort((a, b) => {
      if (sortBy === "price") {
        return PRICE_ORDER[a.priceRange] - PRICE_ORDER[b.priceRange];
      }
      if (sortBy === "overall") {
        return b.scores.overall - a.scores.overall;
      }
      if (sortBy === "avatarQuality") {
        return b.scores.avatarQuality - a.scores.avatarQuality;
      }
      if (sortBy === "easeOfUse") {
        return b.scores.easeOfUse - a.scores.easeOfUse;
      }
      return 0;
    });

    return list;
  }, [useCase, priceFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              AI Video Tool Rankings 2026
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl leading-relaxed mb-2">
              The most comprehensive comparison of every AI video tool — ranked
              by what actually matters for businesses. Updated monthly.
            </p>
            <p className="text-gray-400 text-sm">
              Last updated: March 2026 &middot; 13 tools reviewed
            </p>
          </div>

          {/* Filter Bar */}
          <div className="sticky top-16 z-40 bg-white border-b border-gray-200 py-3 mb-8 -mx-4 px-4">
            <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center">
              {/* Use Case */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide shrink-0">
                  Use Case:
                </span>
                {USE_CASE_FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setUseCase(f)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                      useCase === f
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide shrink-0">
                  Price:
                </span>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {PRICE_FILTERS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide shrink-0">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-xs text-gray-400 ml-auto">
                Showing {filtered.length} of 13 tools
              </span>
            </div>
          </div>

          {/* Tool List */}
          <div className="space-y-5">
            {filtered.map((tool, idx) => {
              const rank =
                ALL_TOOLS.sort((a, b) => b.scores.overall - a.scores.overall).findIndex(
                  (t) => t.id === tool.id
                ) + 1;

              return (
                <div
                  key={tool.id}
                  className={`bg-white rounded-2xl border p-6 sm:p-8 ${
                    tool.isAssurgit
                      ? "border-indigo-300 shadow-md shadow-indigo-100"
                      : "border-gray-200 shadow-sm"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Rank */}
                    <div className="shrink-0 flex sm:flex-col items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          rank === 1
                            ? "bg-yellow-400 text-yellow-900"
                            : rank === 2
                            ? "bg-gray-300 text-gray-700"
                            : rank === 3
                            ? "bg-amber-600 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        #{rank}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Top row */}
                      <div className="flex flex-wrap items-start gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h2 className="text-xl font-bold text-gray-900">
                              {tool.name}
                            </h2>
                            <span
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                CATEGORY_COLORS[tool.category] ||
                                "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {tool.isAssurgit ? "Our Service" : tool.category}
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm">
                            {tool.tagline}
                          </p>
                        </div>

                        {/* Score */}
                        <div className="text-right shrink-0">
                          <div className="text-2xl font-black text-gray-900">
                            {tool.scores.overall}
                            <span className="text-sm font-normal text-gray-400">
                              {" "}
                              / 10
                            </span>
                          </div>
                          <div className="text-xs text-gray-400">
                            Overall Score
                          </div>
                          <div className="text-xs font-semibold text-gray-600 mt-1">
                            {tool.priceLabel}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {tool.description}
                      </p>

                      {/* Score Bars */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        <ScoreBar
                          label="Avatar Quality"
                          score={tool.scores.avatarQuality}
                        />
                        <ScoreBar
                          label="Voice Quality"
                          score={tool.scores.voiceQuality}
                        />
                        <ScoreBar
                          label="Script Quality"
                          score={tool.scores.scriptQuality}
                        />
                        <ScoreBar
                          label="Publishing Automation"
                          score={tool.scores.publishingAutomation}
                        />
                      </div>

                      {/* Feature Chips */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {FEATURE_LABELS.map(({ key, label }) => (
                          <span
                            key={key}
                            className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
                              tool.features[key]
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-gray-50 text-gray-400 border border-gray-200"
                            }`}
                          >
                            {tool.features[key] ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <span className="w-3 h-3 inline-flex items-center justify-center text-gray-300">
                                ✗
                              </span>
                            )}
                            {label}
                          </span>
                        ))}
                      </div>

                      {/* Best For + Verdict */}
                      <div className="mb-4 space-y-1">
                        <p className="text-xs text-gray-500">
                          <span className="font-semibold text-gray-700">
                            Best for:
                          </span>{" "}
                          {tool.bestFor}
                        </p>
                        <p className="text-sm text-gray-500 italic">
                          &ldquo;{tool.verdict}&rdquo;
                        </p>
                      </div>

                      {/* Platforms */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-xs text-gray-400">
                          Publishes to:
                        </span>
                        {tool.platforms.map((p) => (
                          <span
                            key={p}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                          >
                            {p}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div>
                        {tool.isAssurgit ? (
                          <Link
                            href="/book"
                            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
                          >
                            Get Started →
                          </Link>
                        ) : (
                          <a
                            href={tool.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
                          >
                            Visit Site
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No tools match your filters.</p>
              <button
                onClick={() => {
                  setUseCase("All");
                  setPriceFilter("all");
                }}
                className="mt-3 text-indigo-600 text-sm hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-8 sm:p-10 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Looking for a fully managed solution?
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6">
              Assurgit is the only service in this list that handles
              everything — avatar, scripts, rendering, QC, and publishing —
              without you lifting a finger.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3 rounded-lg text-sm transition-colors"
            >
              Book a Free Call
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
