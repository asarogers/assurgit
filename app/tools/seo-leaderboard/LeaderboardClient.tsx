"use client";

import { useEffect, useState } from "react";

interface SiteEntry {
  domain: string;
  url: string;
  score: number;
  total_pages: number;
  errors_count: number;
  warnings_count: number;
  pages_with_errors: number;
  last_audit: string;
  scope?: string;
  llm?: boolean;
  follow_links?: boolean;
}

type Tab = "all" | "standard" | "ai" | "follow";

const TABS: { id: Tab; label: string }[] = [
  { id: "all",      label: "All" },
  { id: "standard", label: "Standard" },
  { id: "ai",       label: "AI Analysis" },
  { id: "follow",   label: "Follow Links" },
];

function filterSites(sites: SiteEntry[], tab: Tab): SiteEntry[] {
  switch (tab) {
    case "standard": return sites.filter(s => !s.llm && !s.follow_links);
    case "ai":       return sites.filter(s => s.llm);
    case "follow":   return sites.filter(s => s.follow_links);
    default:         return sites;
  }
}

function timeAgo(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (d < 60) return d + "s ago";
  if (d < 3600) return Math.floor(d / 60) + "m ago";
  if (d < 86400) return Math.floor(d / 3600) + "h ago";
  return Math.floor(d / 86400) + "d ago";
}

function scoreColor(score: number) {
  if (score >= 80) return { text: "text-green-700", bg: "bg-green-50", bar: "bg-green-500" };
  if (score >= 50) return { text: "text-amber-700", bg: "bg-amber-50", bar: "bg-amber-500" };
  return { text: "text-red-700", bg: "bg-red-50", bar: "bg-red-500" };
}

const RANK_STYLES = ["text-yellow-500", "text-gray-400", "text-amber-600"];

export default function LeaderboardClient() {
  const [sites, setSites]     = useState<SiteEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [tab, setTab]         = useState<Tab>("all");

  useEffect(() => {
    fetch("https://audit.assurgit.com/api/leaderboard")
      .then((r) => r.json())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((d: any) => { setSites(d.sites || []); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse h-24" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-400">
        Could not load leaderboard data.
      </div>
    );
  }

  const filtered = filterSites(sites, tab);

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {TABS.map((t) => {
          const count = filterSites(sites, t.id).length;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                tab === t.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
              <span className={`ml-1.5 text-xs font-normal ${tab === t.id ? "text-gray-400" : "text-gray-400"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* List */}
      {!filtered.length ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-400">
          No sites audited with this configuration yet.{" "}
          <a href="/tools/seo-audit" className="text-green-600 hover:underline">
            Run an audit →
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((site, i) => {
            const c = scoreColor(site.score);
            return (
              <div
                key={site.domain}
                className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 flex items-center gap-4 sm:gap-6 shadow-sm"
              >
                {/* Rank */}
                <span className={`text-xl font-black w-7 text-center flex-shrink-0 ${RANK_STYLES[i] ?? "text-gray-300"}`}>
                  {i + 1}
                </span>

                {/* Score circle */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${c.bg}`}>
                  <span className={`text-lg font-black ${c.text}`}>{site.score}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-gray-900 hover:text-green-700 transition-colors block truncate"
                  >
                    {site.domain}
                  </a>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-xs text-gray-400">
                    <span>{site.total_pages} {site.scope === "page" ? "page" : "pages"}</span>
                    {site.errors_count > 0 && (
                      <span className="text-red-500 font-semibold">{site.errors_count} errors</span>
                    )}
                    {site.warnings_count > 0 && (
                      <span className="text-amber-600 font-semibold">{site.warnings_count} warnings</span>
                    )}
                    {site.llm && (
                      <span className="text-purple-500 font-semibold">AI</span>
                    )}
                    {site.follow_links && (
                      <span className="text-blue-500 font-semibold">Follow links</span>
                    )}
                    <span>audited {timeAgo(site.last_audit)}</span>
                  </div>
                  {/* Score bar */}
                  <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden w-full max-w-xs">
                    <div
                      className={`h-full rounded-full ${c.bar} transition-all`}
                      style={{ width: `${site.score}%` }}
                    />
                  </div>
                </div>

                {/* Score label */}
                <div className="hidden sm:block text-right flex-shrink-0">
                  <span className={`text-2xl font-black ${c.text}`}>{site.score}</span>
                  <span className="text-gray-300 text-sm">/100</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
