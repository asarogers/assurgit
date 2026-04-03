"use client";

import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { RefreshCw, Loader2, Eye, Heart, MessageCircle, Share2, BookmarkIcon, TrendingUp, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ScheduledPost, SocialAccount } from "@/lib/db/social-schema";

interface Props {
  projectId: string;
  open:      boolean;
  onOpenChange: (v: boolean) => void;
}

const PLATFORM_ICONS: Record<string, string> = {
  instagram: "📸",
  youtube:   "▶️",
  reddit:    "🔴",
  tiktok:    "🎵",
};

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  youtube:   "YouTube",
  reddit:    "Reddit",
  tiktok:    "TikTok",
};

const STATUS_STYLES: Record<string, string> = {
  published: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  scheduled: "bg-blue-500/10 text-blue-600 border-blue-200",
  failed:    "bg-red-500/10 text-red-600 border-red-200",
  draft:     "bg-muted text-muted-foreground border-border",
};

interface PostWithAccount {
  post:    ScheduledPost;
  account: SocialAccount;
}

function MetricChip({ icon, value, label }: { icon: React.ReactNode; value: number | string; label: string }) {
  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground" title={label}>
      <span className="text-muted-foreground/60">{icon}</span>
      <span className="font-medium text-foreground">{typeof value === "number" ? value.toLocaleString() : value}</span>
    </div>
  );
}

function PostRow({ item }: { item: PostWithAccount }) {
  const { post, account } = item;
  const metrics = post.metrics ? (() => { try { return JSON.parse(post.metrics!); } catch { return null; } })() : null;

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : null;
  const scheduledDate = post.scheduledFor
    ? new Date(post.scheduledFor).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : null;

  const lastSynced = metrics?.fetchedAt
    ? new Date(metrics.fetchedAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : null;

  const preview = post.title
    ? post.title
    : post.caption.slice(0, 80) + (post.caption.length > 80 ? "…" : "");

  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-0">
      {/* Platform badge */}
      <div className="text-lg shrink-0 mt-0.5">{PLATFORM_ICONS[account.platform] ?? "📌"}</div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-medium text-muted-foreground">{PLATFORM_LABELS[account.platform]}</span>
          <Badge
            variant="outline"
            className={cn("text-[10px] h-4 px-1.5 leading-none", STATUS_STYLES[post.status])}
          >
            {post.status}
          </Badge>
          {post.subreddit && (
            <span className="text-[10px] text-muted-foreground">r/{post.subreddit}</span>
          )}
        </div>

        <p className="text-sm truncate leading-snug mb-1">{preview || <span className="italic text-muted-foreground">No content</span>}</p>

        {/* Metrics row */}
        {metrics && post.status === "published" && (
          <div className="flex items-center gap-3 flex-wrap mt-1">
            {/* Instagram */}
            {account.platform === "instagram" && (
              <>
                {metrics.impressions != null && <MetricChip icon={<Eye className="h-3 w-3" />} value={metrics.impressions} label="Impressions" />}
                {metrics.reach       != null && <MetricChip icon={<TrendingUp className="h-3 w-3" />} value={metrics.reach} label="Reach" />}
                {metrics.likes       != null && <MetricChip icon={<Heart className="h-3 w-3" />} value={metrics.likes} label="Likes" />}
                {metrics.comments    != null && <MetricChip icon={<MessageCircle className="h-3 w-3" />} value={metrics.comments} label="Comments" />}
                {metrics.shares      != null && <MetricChip icon={<Share2 className="h-3 w-3" />} value={metrics.shares} label="Shares" />}
                {metrics.saved       != null && <MetricChip icon={<BookmarkIcon className="h-3 w-3" />} value={metrics.saved} label="Saves" />}
              </>
            )}
            {/* YouTube */}
            {account.platform === "youtube" && (
              <>
                {metrics.views    != null && <MetricChip icon={<Eye className="h-3 w-3" />} value={metrics.views} label="Views" />}
                {metrics.likes    != null && <MetricChip icon={<ThumbsUp className="h-3 w-3" />} value={metrics.likes} label="Likes" />}
                {metrics.comments != null && <MetricChip icon={<MessageCircle className="h-3 w-3" />} value={metrics.comments} label="Comments" />}
              </>
            )}
            {/* Reddit */}
            {account.platform === "reddit" && (
              <>
                {metrics.upvotes     != null && <MetricChip icon={<ThumbsUp className="h-3 w-3" />} value={metrics.upvotes} label="Upvotes" />}
                {metrics.comments    != null && <MetricChip icon={<MessageCircle className="h-3 w-3" />} value={metrics.comments} label="Comments" />}
                {metrics.upvoteRatio != null && <MetricChip icon={<TrendingUp className="h-3 w-3" />} value={`${Math.round(metrics.upvoteRatio * 100)}%`} label="Upvote ratio" />}
              </>
            )}
            {lastSynced && (
              <span className="text-[10px] text-muted-foreground/50 ml-auto">synced {lastSynced}</span>
            )}
          </div>
        )}

        {/* No metrics yet */}
        {!metrics && post.status === "published" && (
          <p className="text-[11px] text-muted-foreground/50 mt-1">
            {post.igMediaId ? "Metrics not synced yet" : "Post ID not captured — sync unavailable"}
          </p>
        )}

        {/* Date */}
        <p className="text-[11px] text-muted-foreground/50 mt-0.5">
          {publishedDate ? `Published ${publishedDate}` : scheduledDate ? `Scheduled ${scheduledDate}` : ""}
        </p>
      </div>
    </div>
  );
}

export function MetricsPanel({ projectId, open, onOpenChange }: Props) {
  const [items,   setItems]   = useState<PostWithAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [filter,  setFilter]  = useState<string>("all");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [postsRes, accsRes] = await Promise.all([
        fetch(`/api/social/posts?projectId=${projectId}`),
        fetch(`/api/social/accounts?projectId=${projectId}`),
      ]);
      const posts    = await postsRes.json() as ScheduledPost[];
      const accounts = await accsRes.json() as SocialAccount[];
      const accsById = Object.fromEntries(accounts.map(a => [a.id, a]));
      const merged = posts
        .filter(p => accsById[p.socialAccountId])
        .map(p => ({ post: p, account: accsById[p.socialAccountId] }))
        .sort((a, b) => {
          // published first, then by publishedAt desc
          if (a.post.status === "published" && b.post.status !== "published") return -1;
          if (b.post.status === "published" && a.post.status !== "published") return  1;
          return (b.post.publishedAt ?? b.post.scheduledFor ?? 0) - (a.post.publishedAt ?? a.post.scheduledFor ?? 0);
        });
      setItems(merged);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => { if (open) load(); }, [open, load]);

  async function syncMetrics() {
    setSyncing(true);
    try {
      const res  = await fetch("/api/social/insights/sync", { method: "POST" });
      const data = await res.json() as { synced: number };
      toast.success(`Synced ${data.synced} post${data.synced !== 1 ? "s" : ""}`);
      await load();
    } catch {
      toast.error("Sync failed");
    } finally {
      setSyncing(false);
    }
  }

  const platforms = ["all", ...Array.from(new Set(items.map(i => i.account.platform)))];
  const visible   = filter === "all" ? items : items.filter(i => i.account.platform === filter);
  const published = items.filter(i => i.post.status === "published").length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-base">
              📊 Post Performance
            </span>
            <Button
              size="sm" variant="outline" className="h-7 text-xs gap-1.5"
              onClick={syncMetrics} disabled={syncing || published === 0}
            >
              {syncing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
              Sync
            </Button>
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex-1 flex items-center justify-center py-12">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No posts scheduled for this batch yet.
          </div>
        ) : (
          <>
            {/* Platform filter pills */}
            {platforms.length > 2 && (
              <div className="shrink-0 flex gap-1.5 flex-wrap pb-1">
                {platforms.map(p => (
                  <button
                    key={p}
                    onClick={() => setFilter(p)}
                    className={cn(
                      "text-xs px-2.5 py-1 rounded-full border transition-colors",
                      filter === p
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:bg-muted text-muted-foreground"
                    )}
                  >
                    {p === "all" ? `All (${items.length})` : `${PLATFORM_ICONS[p] ?? ""} ${PLATFORM_LABELS[p] ?? p}`}
                  </button>
                ))}
              </div>
            )}

            {/* Posts list */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {visible.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">No posts for this platform.</p>
              ) : (
                visible.map(item => <PostRow key={item.post.id} item={item} />)
              )}
            </div>

            <p className="shrink-0 text-[11px] text-muted-foreground/50 pt-2 border-t">
              {published} published · {items.length - published} pending
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
