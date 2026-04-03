"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea }  from "@/components/ui/textarea";
import { Input }     from "@/components/ui/input";
import { Label }     from "@/components/ui/label";
import { Button }    from "@/components/ui/button";
import { Badge }     from "@/components/ui/badge";
import { toast }     from "sonner";
import {
  Upload, Video, CheckCircle2, XCircle, Clock, Trash2, CalendarClock, Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TRANSCRIPT_CHAR_LIMIT } from "@/lib/constants";
import type { Card as CardType } from "@/lib/db/schema";
import { ScheduleCardDialog } from "./ScheduleCardDialog";

interface Props {
  card:      CardType;
  phase:     "transcript" | "final_video";
  onUpdated: (card: CardType) => void;
}

const STATUS_CONFIG = {
  waiting:  { icon: Clock,        label: "Waiting",  color: "text-muted-foreground",                       bg: "bg-muted/60 hover:bg-muted"          },
  approved: { icon: CheckCircle2, label: "Approved", color: "text-emerald-600 dark:text-emerald-400",       bg: "bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60" },
  denied:   { icon: XCircle,      label: "Denied",   color: "text-destructive",                            bg: "bg-destructive/10 hover:bg-destructive/20" },
} as const;

export function CardEditor({ card, phase, onUpdated }: Props) {
  const [transcript,   setTranscript]   = useState(card.transcriptV1 ?? "");
  const [transcriptV2, setTranscriptV2] = useState(card.transcriptV2 ?? "");
  const [dragOver,     setDragOver]     = useState(false);
  const [uploading,    setUploading]    = useState(false);
  const [schedOpen,    setSchedOpen]    = useState(false);
  const [descIG,       setDescIG]       = useState(card.descInstagram    ?? "");
  const [descTT,       setDescTT]       = useState(card.descTiktok      ?? "");
  const [descYT,       setDescYT]       = useState(card.descYoutube     ?? "");
  const [descYTTitle,  setDescYTTitle]  = useState(card.descYoutubeTitle ?? "");
  const [descRD,       setDescRD]       = useState(card.descFacebook         ?? "");
  const [descRDTitle,  setDescRDTitle]  = useState(card.descRedditTitle      ?? "");
  const [descRDSub,    setDescRDSub]    = useState(card.descRedditSubreddit  ?? "");
  const [descTab,      setDescTab]      = useState("instagram");
  const descTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const inputRef   = useRef<HTMLInputElement>(null);
  const finalRef   = useRef<HTMLInputElement>(null);
  const t1Ref      = useRef<HTMLTextAreaElement>(null);
  const t2Ref      = useRef<HTMLTextAreaElement>(null);
  const saveTimer1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveTimer2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  function autoResize(el: HTMLTextAreaElement | null) {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  useEffect(() => { autoResize(t1Ref.current); }, [transcript]);
  useEffect(() => { autoResize(t2Ref.current); }, [transcriptV2]);

  async function deleteVideo() {
    const field = isFinalRef ? "finalVideoPath" : "videoPath";
    const res   = await fetch(`/api/cards/${card.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ [field]: null }),
    });
    onUpdated(await res.json() as CardType);
    toast.success("Video removed");
  }

  function saveDesc(field: "descInstagram"|"descTiktok"|"descYoutube"|"descYoutubeTitle"|"descFacebook"|"descRedditTitle"|"descRedditSubreddit", value: string) {
    if (descTimers.current[field]) clearTimeout(descTimers.current[field]);
    descTimers.current[field] = setTimeout(() => {
      fetch(`/api/cards/${card.id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body:   JSON.stringify({ [field]: value }),
      });
    }, 800);
  }

  async function saveTranscript(field: "transcriptV1" | "transcriptV2", value: string) {
    const res  = await fetch(`/api/cards/${card.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ [field]: value }),
    });
    onUpdated(await res.json() as CardType);
  }

  async function updateStatus(status: CardType["status"]) {
    if (status === card.status) return;
    const res  = await fetch(`/api/cards/${card.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ status }),
    });
    onUpdated(await res.json() as CardType);
    toast.success(`Card ${card.position} → ${status}`);
  }

  async function uploadVideo(file: File, isFinal = false) {
    setUploading(true);
    try {
      const res = await fetch(`/api/cards/${card.id}/video`, {
        method: "PUT",
        headers: {
          "Content-Type": file.type || "video/mp4",
          "X-Is-Final":   isFinal ? "true" : "false",
        },
        body: file,
      });
      if (res.ok) {
        const data = await res.json() as { path: string };
        onUpdated({ ...card, ...(isFinal ? { finalVideoPath: data.path } : { videoPath: data.path }) });
        toast.success("Video uploaded");
      } else {
        const body = await res.text().catch(() => "");
        toast.error(`Upload failed (${res.status}): ${body.slice(0, 120)}`);
      }
    } catch (err) {
      toast.error(`Upload failed: ${(err as Error).message}`);
    } finally {
      setUploading(false);
    }
  }

  const handleDrop = useCallback((e: React.DragEvent, isFinal = false) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadVideo(file, isFinal);
  }, [card.id]);

  async function downloadVideo() {
    if (!videoPath) return;
    try {
      const res  = await fetch(videoPath);
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `card-${card.position}${isFinalRef ? "-final" : ""}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Download failed");
    }
  }

  const videoPath   = phase === "final_video" ? (card.finalVideoPath ?? card.videoPath) : card.videoPath;
  const charPct     = Math.round((transcript.length / TRANSCRIPT_CHAR_LIMIT) * 100);
  const charWarning = charPct >= 90;
  const isFinalRef  = phase === "final_video";

  // Card completeness: has transcript + has video
  const hasTranscript = transcript.trim().length > 0;
  const hasVideo      = !!videoPath;

  return (
    <Card className={cn(
      "flex flex-col transition-shadow",
      card.status === "approved" && "ring-1 ring-emerald-500/30",
      card.status === "denied"   && "ring-1 ring-destructive/30",
    )}>
      <CardHeader className="pb-2 pt-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Card {card.position}</span>
            {/* Completeness dots */}
            <div className="flex items-center gap-1">
              <span className={cn("h-1.5 w-1.5 rounded-full", hasTranscript ? "bg-emerald-500" : "bg-muted-foreground/30")} title="Transcript" />
              <span className={cn("h-1.5 w-1.5 rounded-full", hasVideo ? "bg-emerald-500" : "bg-muted-foreground/30")} title="Video" />
            </div>
          </div>

          {/* Schedule button */}
          <button
            onClick={() => setSchedOpen(true)}
            title="Schedule this card"
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <CalendarClock className="h-3.5 w-3.5" />
          </button>

          {/* Status icon buttons */}
          <div className="flex items-center rounded-md border overflow-hidden">
            {(["waiting", "approved", "denied"] as const).map(s => {
              const cfg = STATUS_CONFIG[s];
              const Icon = cfg.icon;
              const isActive = card.status === s;
              return (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  title={cfg.label}
                  className={cn(
                    "px-2 py-1 transition-colors border-r last:border-r-0",
                    isActive ? cn(cfg.bg, cfg.color, "font-medium") : "hover:bg-muted text-muted-foreground/50 hover:text-muted-foreground"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              );
            })}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-4 pb-4 flex-1">

        {/* Video drop zone */}
        <div
          className={cn(
            "border-2 border-dashed rounded-lg overflow-hidden transition-colors",
            dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-muted-foreground/40"
          )}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => handleDrop(e, isFinalRef)}
        >
          {videoPath ? (
            <div className="relative">
              <video src={videoPath} controls className="w-full max-h-40 object-contain bg-black" />
              <div className="absolute top-1.5 right-1.5 flex gap-1">
                <button
                  onClick={downloadVideo}
                  title="Download video"
                  className="bg-black/60 hover:bg-black/80 text-white text-xs px-1.5 py-1 rounded flex items-center gap-1 backdrop-blur-sm"
                >
                  <Download className="h-3 w-3" />
                </button>
                <button
                  onClick={() => (isFinalRef ? finalRef : inputRef).current?.click()}
                  disabled={uploading}
                  title="Replace video"
                  className="bg-black/60 hover:bg-black/80 text-white text-xs px-1.5 py-1 rounded flex items-center gap-1 backdrop-blur-sm"
                >
                  <Upload className="h-3 w-3" />
                </button>
                <button
                  onClick={deleteVideo}
                  disabled={uploading}
                  title="Delete video"
                  className="bg-red-600/80 hover:bg-red-600 text-white text-xs px-1.5 py-1 rounded flex items-center gap-1 backdrop-blur-sm"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="w-full p-5 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => (isFinalRef ? finalRef : inputRef).current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <span className="text-sm animate-pulse">Uploading…</span>
              ) : (
                <>
                  <Video className="h-7 w-7 opacity-40" />
                  <span className="text-xs">Drop video or click to upload</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Hidden file inputs */}
        <Input ref={inputRef} type="file" accept="video/*" className="hidden"
          onChange={e => e.target.files?.[0] && uploadVideo(e.target.files[0])} />
        <Input ref={finalRef} type="file" accept="video/*" className="hidden"
          onChange={e => e.target.files?.[0] && uploadVideo(e.target.files[0], true)} />

        {/* Transcript V1 */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium">Transcript</Label>
            <div className="flex items-center gap-2">
              <div className="h-1 w-16 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    charWarning ? "bg-amber-400" : "bg-primary/60"
                  )}
                  style={{ width: `${charPct}%` }}
                />
              </div>
              <span className={cn("text-xs tabular-nums", charWarning ? "text-amber-500" : "text-muted-foreground")}>
                {transcript.length}/{TRANSCRIPT_CHAR_LIMIT}
              </span>
            </div>
          </div>
          <Textarea
            ref={t1Ref}
            value={transcript}
            onChange={e => {
              const val = e.target.value;
              setTranscript(val);
              autoResize(e.target);
              if (saveTimer1.current) clearTimeout(saveTimer1.current);
              saveTimer1.current = setTimeout(() => saveTranscript("transcriptV1", val), 800);
            }}
            onBlur={() => { if (saveTimer1.current) clearTimeout(saveTimer1.current); saveTranscript("transcriptV1", transcript); }}
            maxLength={TRANSCRIPT_CHAR_LIMIT}
            className="min-h-24 resize-none text-sm overflow-hidden"
            placeholder="~30 second script (150 wpm)"
          />
        </div>

        {/* Transcript V2 — shown when V1 is filled */}
        {phase === "transcript" && hasTranscript && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Label className="text-xs font-medium">Revised Transcript</Label>
              <Badge variant="secondary" className="text-[10px] h-4 px-1.5">Optional</Badge>
            </div>
            <Textarea
              ref={t2Ref}
              value={transcriptV2}
              onChange={e => {
                const val = e.target.value;
                setTranscriptV2(val);
                autoResize(e.target);
                if (saveTimer2.current) clearTimeout(saveTimer2.current);
                saveTimer2.current = setTimeout(() => saveTranscript("transcriptV2", val), 800);
              }}
              onBlur={() => { if (saveTimer2.current) clearTimeout(saveTimer2.current); saveTranscript("transcriptV2", transcriptV2); }}
              maxLength={TRANSCRIPT_CHAR_LIMIT}
              className="min-h-24 resize-none text-sm overflow-hidden"
              placeholder="Revised version shown alongside original during review"
            />
          </div>
        )}

        {/* Platform descriptions */}
        <div className="space-y-1.5 border-t pt-3">
          <Label className="text-xs font-medium">Platform Descriptions</Label>
          <div className="flex gap-1 flex-wrap">
            {(["instagram","tiktok","youtube","reddit"] as const).map(p => (
              <button key={p} onClick={() => setDescTab(p)}
                className={cn(
                  "text-[10px] px-2 py-0.5 rounded border transition-colors",
                  descTab === p ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted text-muted-foreground"
                )}
              >
                {p === "instagram" ? "Instagram" : p === "tiktok" ? "TikTok" : p === "youtube" ? "YouTube" : "Reddit"}
              </button>
            ))}
          </div>
          {descTab === "instagram" && (
            <Textarea value={descIG} onChange={e => { setDescIG(e.target.value); saveDesc("descInstagram", e.target.value); }}
              className="text-xs min-h-20 resize-none" placeholder="Instagram caption…" />
          )}
          {descTab === "tiktok" && (
            <Textarea value={descTT} onChange={e => { setDescTT(e.target.value); saveDesc("descTiktok", e.target.value); }}
              className="text-xs min-h-20 resize-none" placeholder="TikTok caption…" />
          )}
          {descTab === "youtube" && (
            <div className="space-y-1.5">
              <Input
                value={descYTTitle}
                onChange={e => { setDescYTTitle(e.target.value); saveDesc("descYoutubeTitle", e.target.value); }}
                className="text-xs h-7"
                placeholder="Video title (max 60 chars)…"
                maxLength={100}
              />
              <Textarea value={descYT} onChange={e => { setDescYT(e.target.value); saveDesc("descYoutube", e.target.value); }}
                className="text-xs min-h-20 resize-none" placeholder="YouTube description…" />
            </div>
          )}
          {descTab === "reddit" && (
            <div className="space-y-1.5">
              <Input
                value={descRDTitle}
                onChange={e => { setDescRDTitle(e.target.value); saveDesc("descRedditTitle", e.target.value); }}
                className="text-xs h-7"
                placeholder="Post title (max 300 chars)…"
                maxLength={300}
              />
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground shrink-0">r/</span>
                <Input
                  value={descRDSub}
                  onChange={e => { setDescRDSub(e.target.value.replace(/^r\//, "")); saveDesc("descRedditSubreddit", e.target.value.replace(/^r\//, "")); }}
                  className="text-xs h-7"
                  placeholder="subreddit"
                />
              </div>
              <Textarea value={descRD} onChange={e => { setDescRD(e.target.value); saveDesc("descFacebook", e.target.value); }}
                className="text-xs min-h-20 resize-none" placeholder="Reddit post body…" />
            </div>
          )}
        </div>

      </CardContent>

      <ScheduleCardDialog card={card} open={schedOpen} onOpenChange={setSchedOpen} />
    </Card>
  );
}
