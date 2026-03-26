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
  Upload, Video, CheckCircle2, XCircle, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TRANSCRIPT_CHAR_LIMIT } from "@/lib/constants";
import type { Card as CardType } from "@/lib/db/schema";

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
  const inputRef  = useRef<HTMLInputElement>(null);
  const finalRef  = useRef<HTMLInputElement>(null);
  const t1Ref     = useRef<HTMLTextAreaElement>(null);
  const t2Ref     = useRef<HTMLTextAreaElement>(null);

  function autoResize(el: HTMLTextAreaElement | null) {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  useEffect(() => { autoResize(t1Ref.current); }, [transcript]);
  useEffect(() => { autoResize(t2Ref.current); }, [transcriptV2]);

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
    const form = new FormData();
    form.append("video", file);
    if (isFinal) form.append("final", "true");
    const res  = await fetch(`/api/cards/${card.id}/video`, { method: "POST", body: form });
    const data = await res.json() as any;
    if (res.ok) {
      onUpdated({ ...card, ...(isFinal ? { finalVideoPath: data.path } : { videoPath: data.path }) });
      toast.success("Video uploaded");
    } else {
      toast.error("Upload failed");
    }
    setUploading(false);
  }

  const handleDrop = useCallback((e: React.DragEvent, isFinal = false) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadVideo(file, isFinal);
  }, [card.id]);

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
            <div className="relative group">
              <video src={videoPath} controls className="w-full max-h-40 object-contain bg-black" />
              <button
                onClick={() => (isFinalRef ? finalRef : inputRef).current?.click()}
                disabled={uploading}
                className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
              >
                <span className="bg-white/90 text-black text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
                  <Upload className="h-3 w-3" /> Replace
                </span>
              </button>
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
            onChange={e => { setTranscript(e.target.value); autoResize(e.target); }}
            onBlur={() => saveTranscript("transcriptV1", transcript)}
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
              onChange={e => { setTranscriptV2(e.target.value); autoResize(e.target); }}
              onBlur={() => saveTranscript("transcriptV2", transcriptV2)}
              maxLength={TRANSCRIPT_CHAR_LIMIT}
              className="min-h-24 resize-none text-sm overflow-hidden"
              placeholder="Revised version shown alongside original during review"
            />
          </div>
        )}

      </CardContent>
    </Card>
  );
}
