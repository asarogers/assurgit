"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube, RefreshCw, TrendingUp, TrendingDown, Minus, CheckCircle2, XCircle, Clock, FileEdit, Eye, ThumbsUp, MessageCircle, ChevronDown } from "lucide-react";
import { toast } from "sonner";

// ── Platform config ──────────────────────────────────────────────────────────
const PLATFORM_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  instagram: { label: "Instagram", color: "#E1306C", bg: "bg-[#E1306C]/10",  icon: <Instagram className="h-3.5 w-3.5" style={{ color: "#E1306C" }} /> },
  youtube:   { label: "YouTube",   color: "#FF0000", bg: "bg-[#FF0000]/10",  icon: <Youtube   className="h-3.5 w-3.5" style={{ color: "#FF0000" }} /> },
  reddit:    { label: "Reddit",    color: "#FF4500", bg: "bg-[#FF4500]/10",  icon: <RedditIcon className="h-3.5 w-3.5" style={{ color: "#FF4500" }} /> },
  tiktok:    { label: "TikTok",    color: "#000000", bg: "bg-black/10",      icon: <TikTokIcon className="h-3.5 w-3.5" /> },
};

function RedditIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 20 20" fill="currentColor">
      <circle cx="10" cy="10" r="10" fill="#FF4500"/>
      <path d="M16.67 10a1.46 1.46 0 0 0-2.47-1 7.12 7.12 0 0 0-3.85-1.23l.65-3.07 2.13.45a1 1 0 1 0 .07-.52l-2.38-.5a.26.26 0 0 0-.31.2l-.73 3.44a7.14 7.14 0 0 0-3.89 1.23 1.46 1.46 0 1 0-1.61 2.39 2.87 2.87 0 0 0 0 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.87 2.87 0 0 0 0-.44 1.46 1.46 0 0 0 .64-1.39zm-9.4 1.06a1 1 0 1 1 1 1 1 1 0 0 1-1-1zm5.57 2.64a3.54 3.54 0 0 1-3.84 0 .26.26 0 0 1 .29-.43 3 3 0 0 0 3.26 0 .26.26 0 0 1 .29.43zm-.17-1.64a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" fill="white"/>
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

// ── Types ────────────────────────────────────────────────────────────────────
interface Kpis {
  totalPublished: number; totalFailed: number; totalScheduled: number; totalDraft: number;
  totalConnectedAccounts: number; successRate: number;
  publishedThisPeriod: number; publishedPrevPeriod: number;
}
interface PlatformStat { platform: string; published: number; failed: number; scheduled: number; accounts: number; successRate: number; }
interface ProjectStat { id: string; name: string; clientEmail: string | null; platforms: string[]; published: number; failed: number; scheduled: number; successRate: number; lastPublishedAt: number | null; }
interface RecentPost { id: string; platform: string; accountName: string; projectName: string; caption: string; title: string | null; subreddit: string | null; publishedAt: number; mediaType: string; igMediaId: string | null; metrics: string | null; }
interface VideoPost { id: string; projectId: string; projectName: string; platform: string; accountName: string; title: string | null; caption: string; publishedAt: number; views: number | null; likes: number | null; comments: number | null; }
interface ClientItem { id: string; name: string; }
interface Props { period: string; kpis: Kpis; activityDays: { date: string; count: number }[]; platforms: PlatformStat[]; projectStats: ProjectStat[]; recentPosts: RecentPost[]; videoPosts: VideoPost[]; clientList: ClientItem[]; }

// ── Helper: donut SVG ────────────────────────────────────────────────────────
function DonutChart({ value, size = 80 }: { value: number; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  const color = value >= 90 ? "#22c55e" : value >= 70 ? "#f59e0b" : "#ef4444";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset="0" style={{ transition: "stroke-dasharray 0.6s ease" }} />
    </svg>
  );
}

// ── Helper: activity intensity ───────────────────────────────────────────────
function intensityClass(count: number): string {
  if (count === 0) return "bg-muted/50";
  if (count === 1) return "bg-primary/25";
  if (count <= 3)  return "bg-primary/50";
  if (count <= 6)  return "bg-primary/75";
  return "bg-primary";
}

// ── Helper: trend indicator ──────────────────────────────────────────────────
function Trend({ current, previous }: { current: number; previous: number }) {
  if (previous === 0 && current === 0) return <span className="text-xs text-muted-foreground">—</span>;
  const pct = previous === 0 ? 100 : Math.round(((current - previous) / previous) * 100);
  if (pct > 0)  return <span className="flex items-center gap-0.5 text-xs text-green-600"><TrendingUp className="h-3 w-3" />+{pct}%</span>;
  if (pct < 0)  return <span className="flex items-center gap-0.5 text-xs text-destructive"><TrendingDown className="h-3 w-3" />{pct}%</span>;
  return <span className="flex items-center gap-0.5 text-xs text-muted-foreground"><Minus className="h-3 w-3" />0%</span>;
}

// ── Helper: format relative time ─────────────────────────────────────────────
function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 60)   return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)   return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30)   return `${d}d ago`;
  const mo = Math.floor(d / 30);
  return `${mo}mo ago`;
}

// ── Main component ───────────────────────────────────────────────────────────
function fmtNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function AnalyticsDashboard({ period, kpis, activityDays, platforms, projectStats, recentPosts, videoPosts, clientList }: Props) {
  const router   = useRouter();
  const pathname = usePathname();
  const [syncing, setSyncing] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>("all");
  const [clientMenuOpen, setClientMenuOpen] = useState(false);

  async function syncInsights() {
    setSyncing(true);
    try {
      const res  = await fetch("/api/social/insights/sync", { method: "POST" });
      const data = await res.json() as any;
      if (res.ok) toast.success(`Synced ${data.synced} post${data.synced !== 1 ? "s" : ""}`);
      else toast.error(data.error ?? "Sync failed");
    } finally {
      setSyncing(false);
      router.refresh();
    }
  }

  const totalPlatformPosts = platforms.reduce((s, p) => s + p.published, 0);
  const PERIODS = [
    { key: "7",   label: "7 days" },
    { key: "30",  label: "30 days" },
    { key: "90",  label: "90 days" },
    { key: "all", label: "All time" },
  ];

  // Day labels for calendar
  const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-lg font-semibold">Analytics</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Performance across all clients and platforms</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Period tabs */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            {PERIODS.map(({ key, label }) => (
              <button key={key} onClick={() => router.push(`${pathname}?period=${key}`)}
                className={`text-xs px-3 py-1 rounded-md transition-colors ${period === key || (key === "30" && period === "30") ? "bg-background shadow-sm font-medium" : "text-muted-foreground hover:text-foreground"}`}>
                {label}
              </button>
            ))}
          </div>
          <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs" onClick={syncInsights} disabled={syncing}>
            <RefreshCw className={`h-3 w-3 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Syncing…" : "Sync Insights"}
          </Button>
        </div>
      </div>

      {/* ── KPI Row ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Published */}
        <div className="bg-card border rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Published</p>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-3xl font-bold tracking-tight">{kpis.totalPublished}</p>
          <Trend current={kpis.publishedThisPeriod} previous={kpis.publishedPrevPeriod} />
        </div>

        {/* Success Rate */}
        <div className="bg-card border rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Success Rate</p>
            <div className="relative flex items-center justify-center" style={{ width: 32, height: 32 }}>
              <DonutChart value={kpis.successRate} size={32} />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight">{kpis.successRate}%</p>
          <p className="text-xs text-muted-foreground">{kpis.totalFailed} failed</p>
        </div>

        {/* Accounts */}
        <div className="bg-card border rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Connected</p>
            <div className="flex -space-x-1">
              {["instagram", "youtube", "reddit", "tiktok"].slice(0, 3).map((p) => (
                <div key={p} className={`h-5 w-5 rounded-full border-2 border-background flex items-center justify-center ${PLATFORM_CONFIG[p]?.bg ?? "bg-muted"}`}>
                  {PLATFORM_CONFIG[p]?.icon}
                </div>
              ))}
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight">{kpis.totalConnectedAccounts}</p>
          <p className="text-xs text-muted-foreground">accounts across platforms</p>
        </div>

        {/* Queue */}
        <div className="bg-card border rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Queued</p>
            <Clock className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-3xl font-bold tracking-tight">{kpis.totalScheduled}</p>
          <p className="text-xs text-muted-foreground">{kpis.totalDraft} draft{kpis.totalDraft !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* ── Activity Calendar + Platform Mix ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Activity Calendar — takes 2/3 */}
        <div className="lg:col-span-2 bg-card border rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Publishing Activity</h2>
            <p className="text-xs text-muted-foreground">Last 12 weeks</p>
          </div>
          <div className="overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {/* Day labels */}
              <div className="flex flex-col gap-1 pr-1">
                {DAY_LABELS.map((d, i) => (
                  <div key={d} className={`h-[13px] flex items-center ${i % 2 === 0 ? "invisible" : ""}`}>
                    <span className="text-[9px] text-muted-foreground w-6">{d}</span>
                  </div>
                ))}
              </div>
              {/* Weeks */}
              {Array.from({ length: 12 }, (_, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }, (_, dayIdx) => {
                    const cellIdx = weekIdx * 7 + dayIdx;
                    const day = activityDays[cellIdx];
                    return (
                      <div key={dayIdx}
                        title={day ? `${day.date}: ${day.count} post${day.count !== 1 ? "s" : ""}` : ""}
                        className={`h-[13px] w-[13px] rounded-sm transition-colors ${day ? intensityClass(day.count) : "bg-muted/50"}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>Less</span>
            {[0,1,2,3,4].map((level) => (
              <div key={level} className={`h-3 w-3 rounded-sm ${["bg-muted/50","bg-primary/25","bg-primary/50","bg-primary/75","bg-primary"][level]}`} />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* Platform Mix — takes 1/3 */}
        <div className="bg-card border rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold">Platform Mix</h2>
          {totalPlatformPosts === 0 ? (
            <div className="flex-1 flex items-center justify-center py-8">
              <p className="text-xs text-muted-foreground text-center">No published posts yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Stacked bar */}
              <div className="flex h-3 rounded-full overflow-hidden gap-px">
                {platforms.filter(p => p.published > 0).map((p) => {
                  const pct = Math.max(1, Math.round((p.published / totalPlatformPosts) * 100));
                  const cfg = PLATFORM_CONFIG[p.platform];
                  return <div key={p.platform} style={{ width: `${pct}%`, backgroundColor: cfg?.color ?? "#888" }} title={`${cfg?.label ?? p.platform}: ${p.published}`} />;
                })}
              </div>
              {/* Platform rows */}
              <div className="space-y-2.5 pt-1">
                {platforms.map((p) => {
                  const cfg = PLATFORM_CONFIG[p.platform];
                  const pct = totalPlatformPosts > 0 ? Math.round((p.published / totalPlatformPosts) * 100) : 0;
                  return (
                    <div key={p.platform} className="flex items-center gap-2.5">
                      <div className={`h-6 w-6 rounded-md flex items-center justify-center shrink-0 ${cfg?.bg ?? "bg-muted"}`}>
                        {cfg?.icon ?? <span className="text-[10px]">{p.platform[0].toUpperCase()}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-medium">{cfg?.label ?? p.platform}</span>
                          <span className="text-xs text-muted-foreground">{p.published}</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: cfg?.color ?? "#888" }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Platform Performance Detail ────────────────────────────────── */}
      {platforms.length > 0 && (
        <div className="bg-card border rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold">Platform Performance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {platforms.map((p) => {
              const cfg = PLATFORM_CONFIG[p.platform];
              return (
                <div key={p.platform} className="space-y-3 p-4 rounded-lg border bg-muted/20">
                  <div className="flex items-center gap-2">
                    <div className={`h-7 w-7 rounded-lg flex items-center justify-center ${cfg?.bg ?? "bg-muted"}`}>
                      {cfg?.icon ?? <span className="text-xs">{p.platform[0].toUpperCase()}</span>}
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{cfg?.label ?? p.platform}</p>
                      <p className="text-[10px] text-muted-foreground">{p.accounts} account{p.accounts !== 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-base font-bold text-green-600">{p.published}</p>
                      <p className="text-[10px] text-muted-foreground">Published</p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-destructive">{p.failed}</p>
                      <p className="text-[10px] text-muted-foreground">Failed</p>
                    </div>
                    <div>
                      <p className="text-base font-bold">{p.successRate}%</p>
                      <p className="text-[10px] text-muted-foreground">Rate</p>
                    </div>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${p.successRate}%`, backgroundColor: cfg?.color ?? "#888" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Project Leaderboard ────────────────────────────────────────── */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h2 className="text-sm font-semibold">Client Projects</h2>
          <p className="text-xs text-muted-foreground">{projectStats.length} projects</p>
        </div>
        {projectStats.every(p => p.published === 0 && p.failed === 0 && p.scheduled === 0) ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">No activity in this period</p>
          </div>
        ) : (
          <div className="divide-y">
            {projectStats.map((project, i) => (
              <div key={project.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                {/* Rank */}
                <span className="text-xs font-mono text-muted-foreground w-5 shrink-0">#{i + 1}</span>
                {/* Project info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{project.name}</p>
                  {project.clientEmail && (
                    <p className="text-xs text-muted-foreground truncate">{project.clientEmail}</p>
                  )}
                </div>
                {/* Platform badges */}
                <div className="flex items-center gap-1 shrink-0">
                  {project.platforms.map((plt) => {
                    const cfg = PLATFORM_CONFIG[plt];
                    return (
                      <div key={plt} className={`h-5 w-5 rounded flex items-center justify-center ${cfg?.bg ?? "bg-muted"}`} title={cfg?.label ?? plt}>
                        {cfg ? <span className="scale-75">{cfg.icon}</span> : <span className="text-[9px]">{plt[0].toUpperCase()}</span>}
                      </div>
                    );
                  })}
                  {project.platforms.length === 0 && <span className="text-xs text-muted-foreground italic">no platforms</span>}
                </div>
                {/* Stats */}
                <div className="hidden sm:flex items-center gap-4 shrink-0 text-right">
                  <div className="w-12">
                    <p className="text-sm font-semibold">{project.published}</p>
                    <p className="text-[10px] text-muted-foreground">published</p>
                  </div>
                  {project.failed > 0 && (
                    <div className="w-10">
                      <p className="text-sm font-semibold text-destructive">{project.failed}</p>
                      <p className="text-[10px] text-muted-foreground">failed</p>
                    </div>
                  )}
                  <div className="w-12">
                    <p className="text-sm font-semibold">{project.successRate}%</p>
                    <p className="text-[10px] text-muted-foreground">success</p>
                  </div>
                </div>
                {/* Last published */}
                {project.lastPublishedAt && (
                  <span className="hidden md:block text-xs text-muted-foreground shrink-0 w-16 text-right">
                    {timeAgo(project.lastPublishedAt)}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Recent Published Posts ─────────────────────────────────────── */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h2 className="text-sm font-semibold">Recent Posts</h2>
          <p className="text-xs text-muted-foreground">{recentPosts.length} published</p>
        </div>
        {recentPosts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">No published posts yet</p>
            <p className="text-xs text-muted-foreground mt-1">Schedule your first post from the Social page</p>
          </div>
        ) : (
          <div className="divide-y">
            {recentPosts.map((post) => {
              const cfg = PLATFORM_CONFIG[post.platform];
              let metrics: Record<string, number> | null = null;
              try { if (post.metrics) metrics = JSON.parse(post.metrics); } catch {}
              const headline = post.title ?? post.caption;
              const sub      = post.title ? post.caption : null;

              return (
                <div key={post.id} className="px-5 py-3.5 flex items-start gap-3 hover:bg-muted/30 transition-colors">
                  {/* Platform icon */}
                  <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${cfg?.bg ?? "bg-muted"}`}>
                    {cfg?.icon ?? <span className="text-xs">{post.platform[0].toUpperCase()}</span>}
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <p className="text-xs font-medium truncate">{headline || <span className="italic text-muted-foreground">No content</span>}</p>
                    {sub && <p className="text-xs text-muted-foreground truncate">{sub}</p>}
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-0.5">
                      <span>{post.projectName}</span>
                      <span>·</span>
                      <span>@{post.accountName}</span>
                      {post.subreddit && <><span>·</span><span>r/{post.subreddit}</span></>}
                    </div>
                  </div>
                  {/* Metrics if available */}
                  {metrics && (
                    <div className="hidden md:flex items-center gap-3 shrink-0 text-right">
                      {metrics.impressions != null && (
                        <div>
                          <p className="text-xs font-semibold">{metrics.impressions >= 1000 ? `${(metrics.impressions/1000).toFixed(1)}K` : metrics.impressions}</p>
                          <p className="text-[10px] text-muted-foreground">impr.</p>
                        </div>
                      )}
                      {metrics.views != null && (
                        <div>
                          <p className="text-xs font-semibold">{metrics.views >= 1000 ? `${(metrics.views/1000).toFixed(1)}K` : metrics.views}</p>
                          <p className="text-[10px] text-muted-foreground">views</p>
                        </div>
                      )}
                      {(metrics.likes != null) && (
                        <div>
                          <p className="text-xs font-semibold">{metrics.likes}</p>
                          <p className="text-[10px] text-muted-foreground">likes</p>
                        </div>
                      )}
                      {(metrics.comments != null) && (
                        <div>
                          <p className="text-xs font-semibold">{metrics.comments}</p>
                          <p className="text-[10px] text-muted-foreground">comments</p>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Time */}
                  <span className="text-xs text-muted-foreground shrink-0 pt-0.5">{timeAgo(post.publishedAt)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Video Performance ──────────────────────────────────────────── */}
      {(() => {
        const filtered = selectedClient === "all"
          ? videoPosts
          : videoPosts.filter((v) => v.projectId === selectedClient);
        const totalViews = filtered.reduce((s, v) => s + (v.views ?? 0), 0);
        const selectedName = selectedClient === "all"
          ? "All Clients"
          : clientList.find((c) => c.id === selectedClient)?.name ?? "All Clients";

        return (
          <div className="bg-card border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-sm font-semibold">Video Performance</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} video{filtered.length !== 1 ? "s" : ""} with data</p>
                </div>
                {/* Total views pill */}
                <div className="flex items-center gap-1.5 bg-primary/10 text-primary rounded-full px-3 py-1">
                  <Eye className="h-3.5 w-3.5" />
                  <span className="text-sm font-bold">{fmtNum(totalViews)}</span>
                  <span className="text-xs opacity-70">total views</span>
                </div>
              </div>

              {/* Client filter */}
              <div className="relative">
                <button
                  onClick={() => setClientMenuOpen((o) => !o)}
                  className="flex items-center gap-1.5 h-8 px-3 text-xs border rounded-lg bg-background hover:bg-muted transition-colors"
                >
                  <span className="max-w-[140px] truncate">{selectedName}</span>
                  <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
                </button>
                {clientMenuOpen && (
                  <div className="absolute right-0 top-9 z-20 min-w-[180px] bg-popover border rounded-lg shadow-lg py-1 overflow-hidden">
                    <button
                      onClick={() => { setSelectedClient("all"); setClientMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-muted transition-colors ${selectedClient === "all" ? "font-semibold" : ""}`}
                    >
                      All Clients
                    </button>
                    {clientList.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => { setSelectedClient(c.id); setClientMenuOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-muted transition-colors truncate ${selectedClient === c.id ? "font-semibold" : ""}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Body */}
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <Eye className="h-8 w-8 mx-auto text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">No view data yet</p>
                <p className="text-xs text-muted-foreground mt-1">Click "Sync Insights" to pull metrics from connected platforms</p>
              </div>
            ) : (
              <div className="divide-y">
                {filtered.map((v, i) => {
                  const cfg = PLATFORM_CONFIG[v.platform];
                  const headline = v.title ?? v.caption;
                  const barPct = totalViews > 0 ? Math.max(2, Math.round(((v.views ?? 0) / totalViews) * 100)) : 0;
                  return (
                    <div key={v.id} className="px-5 py-3.5 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        {/* Rank */}
                        <span className="text-xs font-mono text-muted-foreground w-5 shrink-0 text-right">#{i + 1}</span>
                        {/* Platform icon */}
                        <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${cfg?.bg ?? "bg-muted"}`}>
                          {cfg?.icon ?? <span className="text-xs">{v.platform[0].toUpperCase()}</span>}
                        </div>
                        {/* Content */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-center gap-3 justify-between">
                            <p className="text-xs font-medium truncate">{headline || <span className="italic text-muted-foreground">Untitled</span>}</p>
                            <div className="flex items-center gap-3 shrink-0">
                              {/* Views */}
                              <div className="flex items-center gap-1 text-primary font-bold">
                                <Eye className="h-3 w-3" />
                                <span className="text-sm">{fmtNum(v.views ?? 0)}</span>
                              </div>
                              {/* Likes */}
                              {v.likes !== null && (
                                <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                                  <ThumbsUp className="h-3 w-3" />
                                  <span>{fmtNum(v.likes)}</span>
                                </div>
                              )}
                              {/* Comments */}
                              {v.comments !== null && (
                                <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                                  <MessageCircle className="h-3 w-3" />
                                  <span>{fmtNum(v.comments)}</span>
                                </div>
                              )}
                              {/* Time */}
                              <span className="hidden md:block text-xs text-muted-foreground w-14 text-right">{timeAgo(v.publishedAt)}</span>
                            </div>
                          </div>
                          {/* Sub info + bar */}
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                            <span>{v.projectName}</span>
                            <span>·</span>
                            <span>@{v.accountName}</span>
                          </div>
                          {/* View share bar */}
                          <div className="h-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${barPct}%`, backgroundColor: cfg?.color ?? "hsl(var(--primary))" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

    </div>
  );
}
