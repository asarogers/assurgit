"use client";

import { useState, useEffect, useRef } from "react";
import { Button }   from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { Badge }    from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Instagram, Youtube, Loader2, Upload, X, Mail, Send, AlertTriangle } from "lucide-react";
import { toast }  from "sonner";
import { DateTimePicker }     from "./DateTimePicker";
import { ScheduledPostsList } from "./ScheduledPostsList";
import { ScheduleGrid }       from "./ScheduleGrid";
import type { Project }       from "@/lib/db/schema";
import type { SocialAccount, ScheduledPost } from "@/lib/db/social-schema";

type ProjectWithAccounts = Project & { socialAccounts: SocialAccount[] };
type Platform = "instagram" | "youtube";

const DOW_SHORT: Record<number, string> = { 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri" };

function getMonday(d = new Date()): string {
  const date = new Date(d);
  const day  = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  return date.toISOString().split("T")[0];
}

function pad2(n: number) { return n.toString().padStart(2, "0"); }

function slotToDatetime(dayOfWeek: number, time: string): string {
  const now = new Date();
  const currentDow = now.getDay() === 0 ? 7 : now.getDay();
  const daysAhead  = dayOfWeek - currentDow;
  const target     = new Date(now);
  target.setDate(target.getDate() + daysAhead);
  const [h, m] = time.split(":").map(Number);
  target.setHours(h, m, 0, 0);
  return `${target.getFullYear()}-${pad2(target.getMonth()+1)}-${pad2(target.getDate())}T${pad2(h)}:${pad2(m)}`;
}

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

interface Props {
  project:      ProjectWithAccounts;
  initialPosts: ScheduledPost[];
  adminEmail:   string;
}

export function ProjectDetailPanel({ project, initialPosts, adminEmail }: Props) {
  const igAccount = project.socialAccounts.find((a) => a.platform === "instagram");
  const ytAccount = project.socialAccounts.find((a) => a.platform === "youtube");

  // ── Connection state ────────────────────────────────────────────────────────
  const [connectingIg,  setConnectingIg]  = useState(false);
  const [connectingYt,  setConnectingYt]  = useState(false);
  const [disconnecting, setDisconnecting] = useState<string | null>(null);

  // ── Email dialog ────────────────────────────────────────────────────────────
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailInput,      setEmailInput]      = useState("");
  const [sendingEmail,    setSendingEmail]    = useState(false);

  // ── Posts ───────────────────────────────────────────────────────────────────
  const [posts, setPosts] = useState<ScheduledPost[]>(initialPosts);

  // ── Week schedule slots (for quick-pick in composer) ────────────────────────
  const [weekSlots, setWeekSlots] = useState<{ dayOfWeek: number; time: string }[]>([]);

  // ── Composer ─────────────────────────────────────────────────────────────────
  const [activePlatform, setActivePlatform] = useState<Platform>(
    igAccount ? "instagram" : "youtube"
  );
  const [scheduledFor, setScheduledFor] = useState("");
  const [saving,       setSaving]       = useState(false);
  const [uploading,    setUploading]    = useState(false);
  const [mediaUrl,     setMediaUrl]     = useState("");
  const [preview,      setPreview]      = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Instagram
  const [caption,   setCaption]   = useState("");
  const [mediaType, setMediaType] = useState<"IMAGE" | "VIDEO" | "REEL">("IMAGE");

  // YouTube
  const [ytTitle,      setYtTitle]      = useState("");
  const [ytDesc,       setYtDesc]       = useState("");
  const [ytVisibility, setYtVisibility] = useState<"public" | "unlisted" | "private">("public");
  const [ytMediaType,  setYtMediaType]  = useState<"SHORT" | "VIDEO">("SHORT");

  const igExpiringSoon = igAccount && igAccount.tokenExpiresAt - Date.now() < SEVEN_DAYS;

  // Reset composer when platform changes
  useEffect(() => {
    setScheduledFor(""); setMediaUrl(""); setPreview(null);
    setCaption(""); setMediaType("IMAGE");
    setYtTitle(""); setYtDesc(""); setYtVisibility("public"); setYtMediaType("SHORT");
  }, [activePlatform]);

  // Fetch week slots for quick-pick
  useEffect(() => {
    const weekOf = getMonday();
    fetch(`/api/schedule?projectId=${project.id}&weekOf=${weekOf}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data: unknown) => {
        if (!data || typeof data !== "object") return;
        const { schedule } = data as { schedule: { platform: string; dayOfWeek: number; time: string }[] };
        const slots = schedule
          .filter((r) => r.platform === "all")
          .map(({ dayOfWeek, time }) => ({ dayOfWeek, time }))
          .sort((a, b) => a.dayOfWeek - b.dayOfWeek || a.time.localeCompare(b.time));
        setWeekSlots(slots);
      })
      .catch(() => {});
  }, [project.id]);

  // Poll posts every 2 minutes
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/social/posts?projectId=${project.id}`);
      if (res.ok) setPosts(await res.json());
    }, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, [project.id]);

  const emailSuggestions = [project.clientEmail, adminEmail]
    .filter((e): e is string => !!e?.trim())
    .filter((e, i, arr) => arr.indexOf(e) === i);

  // ── Actions ─────────────────────────────────────────────────────────────────

  async function connectPlatform(platform: Platform) {
    const setConnecting = platform === "instagram" ? setConnectingIg : setConnectingYt;
    setConnecting(true);
    const res  = await fetch(`/api/social/${platform}/connect?projectId=${project.id}`);
    const data = await res.json() as any;
    if (!res.ok) { toast.error(data.error ?? "Failed to start OAuth"); setConnecting(false); return; }
    window.location.href = data.url;
  }

  async function disconnectAccount(account: SocialAccount) {
    if (!confirm(`Disconnect @${account.accountName}? Scheduled posts will be deleted.`)) return;
    setDisconnecting(account.id);
    await fetch("/api/social/instagram/disconnect", {
      method:  "DELETE",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ socialAccountId: account.id }),
    });
    toast.success(`${account.platform === "instagram" ? "Instagram" : "YouTube"} disconnected`);
    window.location.reload();
  }

  async function sendConnectEmail(email: string) {
    setSendingEmail(true);
    const res  = await fetch(`/api/projects/${project.id}/send-connect`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email }),
    });
    const data = await res.json() as any;
    if (!res.ok) {
      toast.error(data.error ?? "Failed to send email");
    } else {
      toast.success(`Authorization email sent to ${email}`);
      setEmailDialogOpen(false);
      setEmailInput("");
    }
    setSendingEmail(false);
  }

  async function validateMedia(file: File): Promise<string | null> {
    const isVideo = file.type.startsWith("video");
    const isImage = file.type.startsWith("image");

    if (activePlatform === "instagram" && isImage) {
      const { width, height } = await new Promise<{ width: number; height: number }>((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.src = URL.createObjectURL(file);
      });
      const ratio = width / height;
      if (ratio < 0.79 || ratio > 1.92)
        return `Aspect ratio ${width}×${height} is outside Instagram's accepted range (4:5 → 1.91:1).`;
    }

    if (activePlatform === "instagram" && isVideo && (mediaType === "REEL" || mediaType === "VIDEO")) {
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

    if (activePlatform === "youtube" && isVideo && ytMediaType === "SHORT") {
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
    if (activePlatform === "instagram" && file.type.startsWith("video"))
      setMediaType(mediaType === "REEL" ? "REEL" : "VIDEO");
    setUploading(false);
  }

  function clearMedia() {
    setMediaUrl(""); setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function submit(asDraft: boolean) {
    const account = activePlatform === "instagram" ? igAccount : ytAccount;
    if (!account) { toast.error("No account connected"); return; }

    if (activePlatform === "instagram") {
      if (!caption.trim())       { toast.error("Caption is required"); return; }
      if (!asDraft && !mediaUrl) { toast.error("Upload a media file to schedule"); return; }
    } else {
      if (!ytTitle.trim())       { toast.error("Title is required"); return; }
      if (!asDraft && !mediaUrl) { toast.error("Upload a video to schedule"); return; }
    }

    setSaving(true);
    const body: Record<string, unknown> = {
      projectId:       project.id,
      socialAccountId: account.id,
      caption:         activePlatform === "instagram" ? caption : ytDesc,
      title:           activePlatform === "youtube"   ? ytTitle : undefined,
      visibility:      activePlatform === "youtube"   ? ytVisibility : undefined,
      mediaUrl:        mediaUrl || undefined,
      mediaType:       activePlatform === "instagram" ? mediaType : ytMediaType,
      scheduledFor:    (!asDraft && scheduledFor) ? new Date(scheduledFor).getTime() : undefined,
    };

    const res  = await fetch("/api/social/posts", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body),
    });
    const data = await res.json() as any;
    if (!res.ok) { toast.error(data.error ?? "Failed to save post"); setSaving(false); return; }

    toast.success(asDraft ? "Saved as draft" : "Post scheduled");
    setPosts((prev) => [data, ...prev]);
    setCaption(""); setYtTitle(""); setYtDesc(""); setMediaUrl(""); setPreview(null); setScheduledFor("");
    if (fileRef.current) fileRef.current.value = "";
    setSaving(false);
  }

  const hasAccounts   = !!(igAccount || ytAccount);
  const activeAccount = activePlatform === "instagram" ? igAccount : ytAccount;
  const accept        = activePlatform === "youtube"
    ? "video/mp4,video/quicktime,video/webm"
    : "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime";

  const hint = activePlatform === "youtube"
    ? "MP4, MOV, WebM · Max 2GB"
    : "JPG, PNG, WebP, GIF, MP4 · Max 10MB image / 100MB video";

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full">

      {/* Project header */}
      <div className="px-5 py-3.5 border-b flex items-center justify-between gap-4 shrink-0">
        <div>
          <h2 className="font-semibold text-sm">{project.name}</h2>
          <p className="text-xs text-muted-foreground capitalize mt-0.5">
            {project.phase.replace(/_/g, " ")}
          </p>
        </div>
        <Button
          size="icon" variant="ghost" className="h-7 w-7 shrink-0"
          title="Send social authorization email"
          onClick={() => { setEmailInput(project.clientEmail ?? ""); setEmailDialogOpen(true); }}
        >
          <Mail className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Unified weekly schedule — shared across all platforms */}
      <ScheduleGrid projectId={project.id} />

      {/* Body: composer + posts side by side */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* ── Composer ────────────────────────────────────────────── */}
        <div className="w-80 shrink-0 border-r overflow-y-auto">
          <div className="p-4 space-y-4">

            {/* Account pills */}
            <div className="flex flex-wrap gap-1.5">
              {igAccount ? (
                <div className="flex items-center gap-1.5 bg-muted rounded-full pl-2 pr-1 py-1">
                  {igExpiringSoon && <AlertTriangle className="h-3 w-3 text-yellow-500" />}
                  <Instagram className="h-3 w-3" />
                  <span className="text-xs font-medium">@{igAccount.accountName}</span>
                  <Badge variant="outline" className="text-xs h-4 px-1.5 text-green-600 border-green-600/30">live</Badge>
                  <button
                    onClick={() => disconnectAccount(igAccount)}
                    disabled={disconnecting === igAccount.id}
                    className="text-xs text-muted-foreground hover:text-destructive px-1.5 transition-colors"
                  >
                    {disconnecting === igAccount.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "×"}
                  </button>
                </div>
              ) : (
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5 rounded-full"
                  onClick={() => connectPlatform("instagram")} disabled={connectingIg}>
                  {connectingIg ? <Loader2 className="h-3 w-3 animate-spin" /> : <Instagram className="h-3 w-3" />}
                  {connectingIg ? "Redirecting…" : "Connect Instagram"}
                </Button>
              )}

              {ytAccount ? (
                <div className="flex items-center gap-1.5 bg-muted rounded-full pl-2 pr-1 py-1">
                  <Youtube className="h-3 w-3 text-red-500" />
                  <span className="text-xs font-medium">@{ytAccount.accountName}</span>
                  <Badge variant="outline" className="text-xs h-4 px-1.5 text-green-600 border-green-600/30">live</Badge>
                  <button
                    onClick={() => disconnectAccount(ytAccount)}
                    disabled={disconnecting === ytAccount.id}
                    className="text-xs text-muted-foreground hover:text-destructive px-1.5 transition-colors"
                  >
                    {disconnecting === ytAccount.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "×"}
                  </button>
                </div>
              ) : (
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5 rounded-full"
                  onClick={() => connectPlatform("youtube")} disabled={connectingYt}>
                  {connectingYt ? <Loader2 className="h-3 w-3 animate-spin" /> : <Youtube className="h-3 w-3 text-red-500" />}
                  {connectingYt ? "Redirecting…" : "Connect YouTube"}
                </Button>
              )}
            </div>

            {/* Locally managed + coming soon platforms */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {(["reddit", "gbp", "tiktok", "facebook", "twitter"] as const).map((p) => {
                const labels: Record<string, string> = {
                  reddit: "Reddit", gbp: "GBP", tiktok: "TikTok",
                  facebook: "Facebook", twitter: "Twitter",
                };
                return (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                  >
                    {labels[p]}
                    <span className="text-[9px] px-1 py-px rounded-sm bg-muted-foreground/20 leading-tight">local</span>
                  </span>
                );
              })}
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground/50">
                LinkedIn
                <span className="text-[9px] px-1 py-px rounded-sm bg-muted-foreground/10 leading-tight">soon</span>
              </span>
            </div>

            {!hasAccounts ? (
              <p className="text-xs text-muted-foreground py-6 text-center">
                Connect an account above to start scheduling posts.
              </p>
            ) : (
              <>
                {/* Platform toggle */}
                {igAccount && ytAccount && (
                  <div className="flex gap-0.5 p-0.5 bg-muted rounded-lg">
                    {(["instagram", "youtube"] as Platform[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => setActivePlatform(p)}
                        className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-md transition-colors font-medium ${
                          activePlatform === p
                            ? "bg-background shadow-sm text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {p === "instagram"
                          ? <><Instagram className="h-3.5 w-3.5" /> Instagram</>
                          : <><Youtube   className="h-3.5 w-3.5 text-red-500" /> YouTube</>
                        }
                      </button>
                    ))}
                  </div>
                )}

                {/* Only one platform connected — show a label */}
                {!(igAccount && ytAccount) && activeAccount && (
                  <p className="text-xs text-muted-foreground">
                    {activePlatform === "instagram" ? "Instagram" : "YouTube"} · @{activeAccount.accountName}
                  </p>
                )}

                {/* ── Instagram form ─────────────────────────── */}
                {activePlatform === "instagram" && igAccount && (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Caption <span className="text-destructive">*</span></Label>
                        <Select value={mediaType} onValueChange={(v) => setMediaType(v as any)}>
                          <SelectTrigger className="h-6 text-xs w-24"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="IMAGE">Image</SelectItem>
                            <SelectItem value="VIDEO">Video</SelectItem>
                            <SelectItem value="REEL">Reel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Write your caption…"
                        className="min-h-28 resize-none text-sm"
                      />
                      <p className="text-xs text-muted-foreground text-right">{caption.length} / 2,200</p>
                    </div>
                    {(mediaType === "REEL" || mediaType === "VIDEO") && (
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        Reels require 9:16 vertical video (1080×1920) and must be 3–90 seconds.
                      </p>
                    )}
                    <MediaUpload hint={hint} accept={accept} />
                    <ScheduleRow />
                    <PostActions />
                  </div>
                )}

                {/* ── YouTube form ───────────────────────────── */}
                {activePlatform === "youtube" && ytAccount && (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Title <span className="text-destructive">*</span></Label>
                        <Select value={ytMediaType} onValueChange={(v) => setYtMediaType(v as any)}>
                          <SelectTrigger className="h-6 text-xs w-28"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SHORT">Short (≤3 min)</SelectItem>
                            <SelectItem value="VIDEO">Long-form</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
                        className="min-h-20 resize-none text-sm"
                      />
                      <p className="text-xs text-muted-foreground text-right">{ytDesc.length} / 5,000</p>
                    </div>
                    <div className="space-y-1.5">
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
                    {ytMediaType === "SHORT" && (
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        Shorts must be vertical (9:16) and ≤ 3 minutes.
                      </p>
                    )}
                    <MediaUpload hint={hint} accept={accept} />
                    <ScheduleRow />
                    <PostActions />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* ── Posts list ──────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 overflow-y-auto p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Posts</p>
          <ScheduledPostsList
            posts={posts}
            accounts={project.socialAccounts}
            onDeleted={(id) => setPosts((prev) => prev.filter((p) => p.id !== id))}
          />
        </div>
      </div>

      {/* ── Email dialog ──────────────────────────────────────────── */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Send Authorization Email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-1">
            <p className="text-xs text-muted-foreground">
              The recipient will receive a link to connect their social accounts for{" "}
              <strong>{project.name}</strong>.
            </p>
            {emailSuggestions.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground font-medium">Suggestions</p>
                <div className="flex flex-wrap gap-1.5">
                  {emailSuggestions.map((email) => (
                    <button
                      key={email}
                      onClick={() => setEmailInput(email)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                        emailInput === email
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-muted-foreground/30 text-muted-foreground hover:border-primary"
                      }`}
                    >
                      {email}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground font-medium">Or enter an email</p>
              <Input
                type="email"
                placeholder="client@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="h-8 text-sm"
                onKeyDown={(e) => { if (e.key === "Enter" && emailInput.trim()) sendConnectEmail(emailInput.trim()); }}
              />
            </div>
            <Button
              className="w-full gap-1.5"
              onClick={() => sendConnectEmail(emailInput.trim())}
              disabled={sendingEmail || !emailInput.trim()}
            >
              {sendingEmail
                ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Sending…</>
                : <><Send className="h-3.5 w-3.5" />Send Link</>
              }
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hidden file input shared across both platform forms */}
      <input ref={fileRef} type="file" accept={accept} className="hidden" onChange={handleFile} />
    </div>
  );

  // ── Render helpers ──────────────────────────────────────────────────────────

  function MediaUpload({ hint, accept: _accept }: { hint: string; accept: string }) {
    return (
      <div className="space-y-1.5">
        <Label className="text-xs">
          Media <span className="text-destructive">*</span>
        </Label>
        {mediaUrl ? (
          <div className="relative rounded-lg border overflow-hidden bg-muted">
            {preview
              ? <img src={preview} alt="preview" className="w-full max-h-40 object-cover" />
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
            className="w-full border-2 border-dashed rounded-lg p-5 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
          >
            {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
            <span className="text-xs">{uploading ? "Uploading…" : "Click to upload"}</span>
            <span className="text-xs opacity-60">{hint}</span>
          </button>
        )}
      </div>
    );
  }

  function ScheduleRow() {
    const now        = new Date();
    const currentDow = now.getDay() === 0 ? 7 : now.getDay();
    const currentMin = now.getHours() * 60 + now.getMinutes();

    const upcoming = weekSlots.filter((s) => {
      if (s.dayOfWeek > currentDow) return true;
      if (s.dayOfWeek < currentDow) return false;
      const [h, m] = s.time.split(":").map(Number);
      return h * 60 + m > currentMin + 15; // at least 15m from now
    });

    return (
      <div className="space-y-1.5">
        <Label className="text-xs">Schedule Date &amp; Time</Label>
        <DateTimePicker value={scheduledFor} onChange={setScheduledFor} />
        {upcoming.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {upcoming.map((s) => {
              const dt    = slotToDatetime(s.dayOfWeek, s.time);
              const label = `${DOW_SHORT[s.dayOfWeek]} ${s.time}`;
              return (
                <button
                  key={`${s.dayOfWeek}-${s.time}`}
                  type="button"
                  onClick={() => setScheduledFor(dt)}
                  className={`text-xs px-1.5 py-0.5 rounded border transition-colors ${
                    scheduledFor === dt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  function PostActions() {
    return (
      <div className="flex gap-2 pt-1">
        <Button
          variant="outline" className="flex-1 h-8 text-xs"
          onClick={() => submit(true)} disabled={saving || uploading}
        >
          Save Draft
        </Button>
        <Button
          className="flex-1 h-8 text-xs"
          onClick={() => submit(false)} disabled={saving || uploading || !scheduledFor}
        >
          {saving
            ? <><Loader2 className="h-3 w-3 animate-spin mr-1" />Saving…</>
            : "Schedule"
          }
        </Button>
      </div>
    );
  }
}
