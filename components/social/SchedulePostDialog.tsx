"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button }   from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast }    from "sonner";
import { Upload, X, Loader2, Users } from "lucide-react";
import { DateTimePicker } from "./DateTimePicker";
import type { SocialAccount } from "@/lib/db/social-schema";

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  youtube:   "YouTube",
  reddit:    "Reddit",
  tiktok:    "TikTok",
  facebook:  "Facebook",
};

interface SubredditResult {
  name:        string;
  title:       string;
  subscribers: number;
  description: string;
}

interface Props {
  open:            boolean;
  onOpenChange:    (v: boolean) => void;
  projectId:       string;
  account:         SocialAccount;
  accounts:        SocialAccount[];
  onAccountChange: (a: SocialAccount) => void;
  onCreated:       (post: any) => void;
}

function formatSubscribers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export function SchedulePostDialog({
  open, onOpenChange, projectId, account, accounts, onAccountChange, onCreated,
}: Props) {
  const platform = account.platform;

  // Shared
  const [scheduledFor, setScheduledFor] = useState("");
  const [saving,       setSaving]       = useState(false);
  const [uploading,    setUploading]    = useState(false);
  const [mediaUrl,     setMediaUrl]     = useState("");
  const [preview,      setPreview]      = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Instagram
  const [caption,   setCaption]   = useState("");
  const [mediaType, setMediaType] = useState<"IMAGE" | "VIDEO" | "REEL" | "SHORT">("IMAGE");

  // YouTube
  const [ytTitle,      setYtTitle]      = useState("");
  const [ytDesc,       setYtDesc]       = useState("");
  const [ytVisibility, setYtVisibility] = useState<"public" | "unlisted" | "private">("public");

  // Reddit
  const [redditTitle,  setRedditTitle]  = useState("");
  const [redditBody,   setRedditBody]   = useState("");
  const [subreddit,    setSubreddit]    = useState("");
  const [subQuery,     setSubQuery]     = useState("");
  const [subResults,   setSubResults]   = useState<SubredditResult[]>([]);
  const [subLoading,   setSubLoading]   = useState(false);
  const [subOpen,      setSubOpen]      = useState(false);

  // TikTok
  const [ttCaption,      setTtCaption]      = useState("");
  const [ttPrivacy,      setTtPrivacy]      = useState<"PUBLIC_TO_EVERYONE" | "FOLLOWER_OF_CREATOR" | "MUTUAL_FOLLOW_FRIENDS" | "SELF_ONLY">("PUBLIC_TO_EVERYONE");
  const [ttAllowComment, setTtAllowComment] = useState(true);
  const [ttAllowDuet,    setTtAllowDuet]    = useState(true);
  const [ttAllowStitch,  setTtAllowStitch]  = useState(true);

  // Reset all fields when account/platform changes
  useEffect(() => {
    setScheduledFor(""); setMediaUrl(""); setPreview(null);
    setCaption(""); setMediaType(platform === "youtube" ? "SHORT" : "IMAGE");
    setYtTitle(""); setYtDesc(""); setYtVisibility("public");
    setRedditTitle(""); setRedditBody(""); setSubreddit(""); setSubQuery("");
    setSubResults([]); setSubOpen(false);
    setTtCaption(""); setTtPrivacy("PUBLIC_TO_EVERYONE");
    setTtAllowComment(true); setTtAllowDuet(true); setTtAllowStitch(true);
  }, [account.id, platform]);

  // Debounced subreddit search — only fires when subreddit not yet confirmed
  useEffect(() => {
    if (platform !== "reddit" || subreddit) { setSubResults([]); setSubOpen(false); return; }
    const q = subQuery.trim();
    if (!q) { setSubResults([]); setSubOpen(false); return; }
    const timer = setTimeout(async () => {
      setSubLoading(true);
      try {
        const res = await fetch(`/api/social/reddit/subreddits?q=${encodeURIComponent(q)}&accountId=${encodeURIComponent(account.id)}`);
        if (res.ok) {
          const data = await res.json() as SubredditResult[];
          setSubResults(data);
          setSubOpen(data.length > 0);
        }
      } finally {
        setSubLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [subQuery, platform, subreddit]);

  async function validateMedia(file: File): Promise<string | null> {
    const isVideo = file.type.startsWith("video");
    const isImage = file.type.startsWith("image");

    if (platform === "instagram" && isImage) {
      const { width, height } = await new Promise<{ width: number; height: number }>((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.src = URL.createObjectURL(file);
      });
      const ratio = width / height;
      if (ratio < 0.79 || ratio > 1.92)
        return `Aspect ratio ${width}×${height} is outside Instagram's accepted range (4:5 portrait → 1.91:1 landscape).`;
    }

    if (platform === "instagram" && isVideo && (mediaType === "REEL" || mediaType === "VIDEO")) {
      const info = await new Promise<{ width: number; height: number; duration: number }>((resolve) => {
        const vid = document.createElement("video");
        vid.preload = "metadata";
        vid.onloadedmetadata = () => resolve({ width: vid.videoWidth, height: vid.videoHeight, duration: vid.duration });
        vid.src = URL.createObjectURL(file);
      });
      if (mediaType === "REEL") {
        if (Math.abs(info.width / info.height - 9 / 16) > 0.05)
          return `Reels must be 9:16 vertical (1080×1920). Your video is ${info.width}×${info.height}.`;
        if (info.duration < 3 || info.duration > 90)
          return `Reel duration must be 3–90 seconds. Yours is ${Math.round(info.duration)}s.`;
      }
    }

    if (platform === "youtube" && isVideo && mediaType === "SHORT") {
      const { duration } = await new Promise<{ duration: number }>((resolve) => {
        const vid = document.createElement("video");
        vid.preload = "metadata";
        vid.onloadedmetadata = () => resolve({ duration: vid.duration });
        vid.src = URL.createObjectURL(file);
      });
      if (duration > 180)
        return `YouTube Shorts must be ≤ 3 minutes. Your video is ${Math.round(duration)}s.`;
    }

    return null;
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const err = await validateMedia(file);
    if (err) {
      toast.error(err);
      if (fileRef.current) fileRef.current.value = "";
      setUploading(false);
      return;
    }

    const res  = await fetch("/api/media", {
      method:  "POST",
      headers: { "Content-Type": file.type },
      body:    file,
    });
    const data = await res.json() as any;
    if (!res.ok) { toast.error(data.error ?? "Upload failed"); setUploading(false); return; }

    setMediaUrl(data.url);
    setPreview(file.type.startsWith("image") ? URL.createObjectURL(file) : null);

    if (platform === "instagram") {
      if (file.type.startsWith("video")) setMediaType(mediaType === "REEL" ? "REEL" : "VIDEO");
      else setMediaType("IMAGE");
    }

    setUploading(false);
  }

  function clearMedia() {
    setMediaUrl(""); setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function submit(asDraft: boolean) {
    if (platform === "instagram") {
      if (!caption.trim())             { toast.error("Caption is required"); return; }
      if (!asDraft && !mediaUrl)       { toast.error("Upload a media file to schedule"); return; }
    } else if (platform === "youtube") {
      if (!ytTitle.trim())             { toast.error("Title is required"); return; }
      if (!asDraft && !mediaUrl)       { toast.error("Upload a video to schedule"); return; }
    } else if (platform === "reddit") {
      if (!redditTitle.trim())         { toast.error("Post title is required"); return; }
      if (!subreddit.trim())           { toast.error("Choose a subreddit to post in"); return; }
    } else if (platform === "tiktok") {
      if (!ttCaption.trim())           { toast.error("Caption is required"); return; }
      if (!asDraft && !mediaUrl)       { toast.error("Upload a video to schedule"); return; }
    }

    setSaving(true);
    const body: Record<string, unknown> = {
      projectId,
      socialAccountId: account.id,
      caption:      platform === "instagram" ? caption
                  : platform === "youtube"   ? ytDesc
                  : platform === "tiktok"    ? ttCaption
                  : redditBody,
      title:        platform === "youtube" ? ytTitle
                  : platform === "reddit"  ? redditTitle
                  : undefined,
      subreddit:    platform === "reddit" ? subreddit : undefined,
      visibility:   platform === "youtube" ? ytVisibility : undefined,
      metadata:     platform === "tiktok" ? {
                      privacyLevel:  ttPrivacy,
                      allowComment:  ttAllowComment,
                      allowDuet:     ttAllowDuet,
                      allowStitch:   ttAllowStitch,
                      contentPreviewConfirmed: true,
                    } : undefined,
      mediaUrl:     mediaUrl || undefined,
      mediaType:    (platform === "instagram" || platform === "youtube") ? mediaType : undefined,
      scheduledFor: (!asDraft && scheduledFor) ? new Date(scheduledFor).getTime() : undefined,
    };

    const res  = await fetch("/api/social/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json() as any;
    if (!res.ok) { toast.error(data.error ?? "Failed to save post"); setSaving(false); return; }

    toast.success(asDraft ? "Saved as draft" : "Post scheduled");
    onCreated(data);
    onOpenChange(false);
    setSaving(false);
  }

  // ── Media upload widget (shared across platforms) ─────────────────────────
  function MediaUpload({ required = false }: { required?: boolean }) {
    const accept = (platform === "youtube" || platform === "tiktok")
      ? "video/mp4,video/quicktime,video/webm"
      : "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime";
    const hint = (platform === "youtube" || platform === "tiktok")
      ? "MP4, MOV, WebM · Max 2GB"
      : "JPG, PNG, WebP, GIF, MP4 · Max 10MB image / 100MB video";

    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-xs">
            Media {required && <span className="text-destructive">*</span>}
            {!required && <span className="text-muted-foreground"> (optional)</span>}
          </Label>
          {platform === "instagram" && (
            <Select value={mediaType} onValueChange={(v) => setMediaType(v as any)}>
              <SelectTrigger className="h-6 text-xs w-28"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="IMAGE">Image</SelectItem>
                <SelectItem value="VIDEO">Video</SelectItem>
                <SelectItem value="REEL">Reel</SelectItem>
              </SelectContent>
            </Select>
          )}
          {platform === "youtube" && (
            <Select value={mediaType} onValueChange={(v) => setMediaType(v as any)}>
              <SelectTrigger className="h-6 text-xs w-28"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="SHORT">Short (≤3 min)</SelectItem>
                <SelectItem value="VIDEO">Long-form</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {platform === "instagram" && (mediaType === "REEL" || mediaType === "VIDEO") && (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            Reels require 9:16 vertical video (1080×1920) and must be 3–90 seconds.
          </p>
        )}
        {platform === "youtube" && mediaType === "SHORT" && (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            Shorts must be vertical (9:16) and ≤ 3 minutes to appear in the Shorts feed.
          </p>
        )}

        {mediaUrl ? (
          <div className="relative rounded-lg border overflow-hidden bg-muted">
            {preview
              ? <img src={preview} alt="preview" className="w-full max-h-48 object-cover" />
              : <div className="flex items-center gap-2 p-3">
                  <span className="text-xs text-muted-foreground truncate flex-1">{mediaUrl}</span>
                </div>
            }
            <button
              onClick={clearMedia}
              className="absolute top-1.5 right-1.5 rounded-full bg-black/60 p-0.5 hover:bg-black/80"
            >
              <X className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
          >
            {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Upload className="h-6 w-6" />}
            <span className="text-xs">{uploading ? "Uploading…" : "Click to upload"}</span>
            <span className="text-xs opacity-60">{hint}</span>
          </button>
        )}
        <input ref={fileRef} type="file" accept={accept} className="hidden" onChange={handleFile} />
      </div>
    );
  }

  // ── Schedule row (shared) ──────────────────────────────────────────────────
  function ScheduleRow() {
    return (
      <div className="space-y-1.5">
        <Label className="text-xs">Schedule Date &amp; Time</Label>
        <DateTimePicker value={scheduledFor} onChange={setScheduledFor} />
      </div>
    );
  }

  // ── Action buttons (shared) ───────────────────────────────────────────────
  function Actions() {
    return (
      <div className="flex gap-2 pt-2">
        <Button variant="outline" className="flex-1" onClick={() => submit(true)} disabled={saving || uploading}>
          Save Draft
        </Button>
        <Button className="flex-1" onClick={() => submit(false)} disabled={saving || uploading || !scheduledFor}>
          {saving ? <><Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />Saving…</> : "Schedule"}
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Post</DialogTitle>
        </DialogHeader>

        {/* Platform account selector */}
        {accounts.length > 1 ? (
          <div className="flex gap-1.5 flex-wrap">
            {accounts.map((a) => (
              <button
                key={a.id}
                onClick={() => onAccountChange(a)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  a.id === account.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-muted-foreground/30 text-muted-foreground hover:border-primary"
                }`}
              >
                {PLATFORM_LABELS[a.platform] ?? a.platform} · @{a.accountName}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            {PLATFORM_LABELS[account.platform] ?? account.platform} · @{account.accountName}
          </p>
        )}

        {/* ── INSTAGRAM ─────────────────────────────────────────────────── */}
        {platform === "instagram" && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Caption <span className="text-destructive">*</span></Label>
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write your caption…"
                className="min-h-28 resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">{caption.length} / 2,200</p>
            </div>
            <MediaUpload required />
            <ScheduleRow />
            <Actions />
          </div>
        )}

        {/* ── YOUTUBE ───────────────────────────────────────────────────── */}
        {platform === "youtube" && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Title <span className="text-destructive">*</span></Label>
              <Input
                value={ytTitle}
                onChange={(e) => setYtTitle(e.target.value.slice(0, 100))}
                placeholder="Video title…"
                className="h-9 text-sm"
              />
              <p className="text-xs text-muted-foreground text-right">{ytTitle.length} / 100</p>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Description</Label>
              <Textarea
                value={ytDesc}
                onChange={(e) => setYtDesc(e.target.value.slice(0, 5000))}
                placeholder="Describe your video… (optional)"
                className="min-h-24 resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">{ytDesc.length} / 5,000</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 space-y-1.5">
                <Label className="text-xs">Visibility</Label>
                <Select value={ytVisibility} onValueChange={(v) => setYtVisibility(v as any)}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <MediaUpload required />
            <ScheduleRow />
            <Actions />
          </div>
        )}

        {/* ── REDDIT ────────────────────────────────────────────────────── */}
        {platform === "reddit" && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Post Title <span className="text-destructive">*</span></Label>
              <Input
                value={redditTitle}
                onChange={(e) => setRedditTitle(e.target.value.slice(0, 300))}
                placeholder="An engaging title…"
                className="h-9 text-sm"
              />
              <p className="text-xs text-muted-foreground text-right">{redditTitle.length} / 300</p>
            </div>

            {/* Subreddit picker */}
            <div className="space-y-1.5 relative">
              <Label className="text-xs">Community (subreddit) <span className="text-destructive">*</span></Label>
              {subreddit ? (
                <div className="flex items-center justify-between h-9 px-3 rounded-md border bg-muted/50 text-sm">
                  <span className="font-medium">r/{subreddit}</span>
                  <button
                    onClick={() => { setSubreddit(""); setSubQuery(""); }}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground select-none">r/</span>
                  <Input
                    value={subQuery}
                    onChange={(e) => setSubQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && subQuery.trim()) {
                        e.preventDefault();
                        setSubreddit(subQuery.trim().replace(/^r\//, ""));
                        setSubQuery("");
                        setSubOpen(false);
                      }
                    }}
                    placeholder="Search or type name, press Enter…"
                    className="h-9 pl-7 text-sm"
                  />
                  {subLoading && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 animate-spin text-muted-foreground" />
                  )}
                </div>
              )}

              {/* Dropdown results */}
              {subOpen && subResults.length > 0 && (
                <div className="absolute z-50 left-0 right-0 mt-0.5 rounded-md border bg-popover shadow-md overflow-hidden">
                  {subResults.map((r) => (
                    <button
                      key={r.name}
                      onMouseDown={(e) => { e.preventDefault(); setSubreddit(r.name); setSubQuery(""); setSubOpen(false); }}
                      className="w-full flex items-start gap-3 px-3 py-2.5 text-left hover:bg-accent transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">r/{r.name}</p>
                        {r.description && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{r.description}</p>
                        )}
                      </div>
                      {r.subscribers > 0 && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 mt-0.5">
                          <Users className="h-3 w-3" />
                          {formatSubscribers(r.subscribers)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Note: make sure you have permission to post in this community.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Body <span className="text-muted-foreground">(optional)</span></Label>
              <Textarea
                value={redditBody}
                onChange={(e) => setRedditBody(e.target.value)}
                placeholder="Add more context, links, or discussion points…"
                className="min-h-24 resize-none"
              />
            </div>

            <MediaUpload />
            <ScheduleRow />
            <Actions />
          </div>
        )}

        {/* ── TIKTOK ────────────────────────────────────────────────────── */}
        {platform === "tiktok" && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Caption <span className="text-destructive">*</span></Label>
              <Textarea
                value={ttCaption}
                onChange={(e) => setTtCaption(e.target.value.slice(0, 2200))}
                placeholder="Write your caption…"
                className="min-h-24 resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">{ttCaption.length} / 2,200</p>
            </div>

            {/* Privacy */}
            <div className="space-y-1.5">
              <Label className="text-xs">Who can view</Label>
              <Select value={ttPrivacy} onValueChange={(v) => setTtPrivacy(v as any)}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="PUBLIC_TO_EVERYONE">Everyone</SelectItem>
                  <SelectItem value="FOLLOWER_OF_CREATOR">Followers only</SelectItem>
                  <SelectItem value="MUTUAL_FOLLOW_FRIENDS">Friends only</SelectItem>
                  <SelectItem value="SELF_ONLY">Only me (private)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interactions */}
            <div className="space-y-2">
              <Label className="text-xs">Allow interactions</Label>
              <div className="flex flex-wrap gap-2">
                {([
                  { label: "Comments", value: ttAllowComment, set: setTtAllowComment },
                  { label: "Duet",     value: ttAllowDuet,    set: setTtAllowDuet    },
                  { label: "Stitch",   value: ttAllowStitch,  set: setTtAllowStitch  },
                ] as const).map(({ label, value, set }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => set(!value)}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                      value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-muted-foreground/30 text-muted-foreground hover:border-primary"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-amber-600 dark:text-amber-400">
              TikTok requires 9:16 vertical video. Upload must be complete before scheduling.
            </p>
            <MediaUpload required />
            <ScheduleRow />
            <Actions />
          </div>
        )}

        {/* Fallback for other platforms not yet supported */}
        {platform !== "instagram" && platform !== "youtube" && platform !== "reddit" && platform !== "tiktok" && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Post scheduling for {PLATFORM_LABELS[platform] ?? platform} is coming soon.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
