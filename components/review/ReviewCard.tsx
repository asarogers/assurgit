"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea }  from "@/components/ui/textarea";
import { Button }    from "@/components/ui/button";
import { Badge }     from "@/components/ui/badge";
import { TranscriptDiff }    from "./TranscriptDiff";
import { SocialDescriptions } from "./SocialDescriptions";
import { toast }              from "sonner";
import { ThumbsDown, Video }  from "lucide-react";
import { TRANSCRIPT_CHAR_LIMIT } from "@/lib/constants";
import type { Card as CardType } from "@/lib/db/schema";

interface Props {
  card:        CardType;
  token:       string;
  phase:       "transcript" | "final_video";
  deniesLeft:  number;
  denied:      boolean;
  onDeny:      (cardId: string) => void;
  onUpdated:   (card: CardType) => void;
}

export function ReviewCard({
  card, token, phase, deniesLeft, denied, onDeny, onUpdated
}: Props) {
  const [transcript, setTranscript] = useState(card.transcriptV1 ?? "");
  const [saving,     setSaving]     = useState(false);

  if (denied) return null;

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

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Card {card.position}</CardTitle>
          {phase === "final_video" && (
            <Badge variant="secondary" className="text-xs">Final</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* Video hero */}
        {videoSrc ? (
          <video
            src={videoSrc}
            controls
            className="w-full rounded-lg max-h-56 object-contain bg-black"
          />
        ) : (
          <div className="rounded-lg bg-muted h-40 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <Video className="h-8 w-8" />
            <span className="text-sm">Video coming soon</span>
          </div>
        )}

        {/* Transcript diff (revision round) */}
        {card.transcriptV2 && card.transcriptV1 ? (
          <TranscriptDiff v1={card.transcriptV1} v2={card.transcriptV2} />
        ) : (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Transcript</span>
              <span className="text-xs text-muted-foreground">
                {transcript.length} / {TRANSCRIPT_CHAR_LIMIT}
              </span>
            </div>
            <Textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              onBlur={saveTranscript}
              maxLength={TRANSCRIPT_CHAR_LIMIT}
              disabled={phase === "final_video"}
              className="min-h-32"
              placeholder="Transcript"
            />
            {saving && <p className="text-xs text-muted-foreground">Saving…</p>}
          </div>
        )}

        {/* Social descriptions (final phase only) */}
        {phase === "final_video" && (
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
        )}

        {/* Deny button */}
        {phase === "transcript" && (
          <Button
            variant="destructive"
            className="w-full"
            disabled={deniesLeft === 0}
            onClick={() => onDeny(card.id)}
          >
            <ThumbsDown className="h-4 w-4 mr-2" />
            Deny
            {deniesLeft === 0 && " (limit reached)"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
