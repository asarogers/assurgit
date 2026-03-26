"use client";

import { useState } from "react";
import { Textarea }  from "@/components/ui/textarea";
import { Button }    from "@/components/ui/button";
import { TranscriptDiff }    from "./TranscriptDiff";
import { SocialDescriptions } from "./SocialDescriptions";
import { toast }              from "sonner";
import { ThumbsDown, Video, CheckCircle2, Clock, RotateCcw } from "lucide-react";
import { TRANSCRIPT_CHAR_LIMIT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Card as CardType } from "@/lib/db/schema";

interface Props {
  card:        CardType;
  token:       string;
  phase:       "transcript" | "final_video";
  index:       number;
  total:       number;
  deniesLeft:  number;
  denied:      boolean;
  approved:    boolean;
  onDeny:      (cardId: string) => void;
  onUpdated:   (card: CardType) => void;
}

export function ReviewCard({
  card, token, phase, index, total, deniesLeft, denied, approved, onDeny, onUpdated
}: Props) {
  const [transcript, setTranscript] = useState(card.transcriptV1 ?? "");
  const [saving,     setSaving]     = useState(false);

  async function saveTranscript() {
    if (transcript === card.transcriptV1) return;
    setSaving(true);
    const res = await fetch(`/api/review/descriptions?token=${token}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ cardId: card.id, transcriptV1: transcript }),
    });
    if (!res.ok) toast.error("Failed to save transcript");
    setSaving(false);
  }

  const videoSrc = phase === "final_video"
    ? (card.finalVideoPath ?? card.videoPath)
    : card.videoPath;

  // ── Approved ───────────────────────────────────────────────────────────────
  if (approved) {
    return (
      <div className="flex flex-col h-full rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/60 dark:bg-emerald-950/20 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-100 dark:border-emerald-900/40 shrink-0">
          <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
            Card {card.position}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="h-3.5 w-3.5" /> Approved
          </span>
        </div>

        <div className="flex flex-col flex-1 min-h-0 p-4 gap-3">
          {/* Video — fixed ratio */}
          {videoSrc ? (
            <video src={videoSrc} controls className="w-full rounded-xl aspect-video object-contain bg-black shrink-0" />
          ) : (
            <div className="rounded-xl bg-emerald-100/60 dark:bg-emerald-950/30 aspect-video flex flex-col items-center justify-center gap-2 text-emerald-600 dark:text-emerald-500 shrink-0">
              <Video className="h-7 w-7 opacity-40" />
              <span className="text-xs font-medium opacity-70">Video coming soon</span>
            </div>
          )}

          {/* Transcript — scrolls if long */}
          <div className="flex-1 min-h-0 overflow-y-auto bg-emerald-100/60 dark:bg-emerald-950/30 rounded-xl px-4 py-3">
            <p className="text-sm text-emerald-800 dark:text-emerald-300 whitespace-pre-wrap leading-relaxed">
              {card.transcriptV1}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Denied ─────────────────────────────────────────────────────────────────
  if (denied) {
    return (
      <div className="flex flex-col h-full rounded-2xl border border-amber-200 dark:border-amber-800/50 bg-amber-50/40 dark:bg-amber-950/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-amber-100 dark:border-amber-900/30 shrink-0">
          <span className="text-sm font-semibold text-muted-foreground">Card {card.position}</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2.5 py-1 rounded-full">
            <RotateCcw className="h-3 w-3" /> Revision Requested
          </span>
        </div>

        <div className="flex flex-col flex-1 min-h-0 p-4 gap-3">
          {/* Video placeholder — keeps same structure */}
          <div className="rounded-xl bg-amber-100/40 dark:bg-amber-950/20 aspect-video flex flex-col items-center justify-center gap-2 text-amber-500 shrink-0">
            <Video className="h-6 w-6 opacity-30" />
            <span className="text-xs opacity-50">Pending transcript approval</span>
          </div>

          {/* Message — fills remaining space */}
          <div className="flex-1 min-h-0 flex items-center justify-center rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 px-4 py-3">
            <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed text-center">
              You've requested a revision on this card. The team will send an updated version soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Active ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-muted/30 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Card {card.position}</span>
          <span className="text-xs text-muted-foreground">of {total}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {phase === "final_video" && (
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              Final
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            <Clock className="h-3 w-3" /> Pending
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 min-h-0 p-4 gap-4">

        {/* Video — fixed ratio, never grows */}
        {videoSrc ? (
          <video
            src={videoSrc}
            controls
            className="w-full rounded-xl aspect-video object-contain bg-black shrink-0"
          />
        ) : (
          <div className="rounded-xl bg-muted aspect-video flex flex-col items-center justify-center gap-2 text-muted-foreground shrink-0">
            <Video className="h-6 w-6 opacity-30" />
            <span className="text-xs opacity-50">Pending transcript approval</span>
          </div>
        )}

        {/* Transcript — grows to fill, scrolls if overflow */}
        <div className="flex flex-col flex-1 min-h-0 gap-2">
          {card.transcriptV2 && card.transcriptV1 ? (
            <div className="flex-1 min-h-0 overflow-y-auto">
              <TranscriptDiff v1={card.transcriptV1} v2={card.transcriptV2} />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between shrink-0">
                <span className="text-xs font-medium text-muted-foreground">Transcript</span>
                <span className={cn(
                  "text-xs tabular-nums",
                  transcript.length > TRANSCRIPT_CHAR_LIMIT * 0.9
                    ? "text-amber-500 font-medium"
                    : "text-muted-foreground"
                )}>
                  {transcript.length}/{TRANSCRIPT_CHAR_LIMIT}
                </span>
              </div>
              <Textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                onBlur={saveTranscript}
                maxLength={TRANSCRIPT_CHAR_LIMIT}
                disabled={phase === "final_video"}
                className="flex-1 min-h-0 resize-none text-sm leading-relaxed rounded-xl"
                placeholder="Transcript will appear here…"
              />
              {saving && (
                <p className="text-xs text-muted-foreground animate-pulse text-right shrink-0">Saving…</p>
              )}
            </>
          )}
        </div>

        {/* Social descriptions */}
        {phase === "final_video" && (
          <div className="shrink-0">
            <SocialDescriptions
              cardId={card.id}
              token={token}
              initial={{
                descInstagram: card.descInstagram ?? "",
                descTiktok:    card.descTiktok    ?? "",
                descFacebook:  card.descFacebook  ?? "",
                descYoutube:   card.descYoutube   ?? "",
              }}
              onUpdated={(d) => onUpdated({ ...card, ...d })}
            />
          </div>
        )}

        {/* Deny / revision button — always pinned at bottom */}
        {phase === "transcript" && (
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "w-full h-12 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/5 hover:border-destructive transition-colors shrink-0",
              deniesLeft === 0 && "opacity-40 cursor-not-allowed"
            )}
            disabled={deniesLeft === 0}
            onClick={() => onDeny(card.id)}
          >
            <ThumbsDown className="h-4 w-4 mr-2" />
            {deniesLeft === 0 ? "Revision limit reached" : "Request Revision"}
          </Button>
        )}
      </div>
    </div>
  );
}
