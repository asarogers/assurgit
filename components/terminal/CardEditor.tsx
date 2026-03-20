"use client";

import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea }  from "@/components/ui/textarea";
import { Input }     from "@/components/ui/input";
import { Label }     from "@/components/ui/label";
import { Button }    from "@/components/ui/button";
import { Badge }     from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { toast }      from "sonner";
import { Upload, Video } from "lucide-react";
import { TRANSCRIPT_CHAR_LIMIT } from "@/lib/constants";
import type { Card as CardType } from "@/lib/db/schema";

interface Props {
  card:        CardType;
  phase:       "transcript" | "final_video";
  onUpdated:   (card: CardType) => void;
}

export function CardEditor({ card, phase, onUpdated }: Props) {
  const [transcript, setTranscript] = useState(card.transcriptV1 ?? "");
  const [transcriptV2, setTranscriptV2] = useState(card.transcriptV2 ?? "");
  const [dragOver,   setDragOver]   = useState(false);
  const [uploading,  setUploading]  = useState(false);
  const inputRef  = useRef<HTMLInputElement>(null);
  const finalRef  = useRef<HTMLInputElement>(null);

  async function saveTranscript(field: "transcriptV1" | "transcriptV2", value: string) {
    const res = await fetch(`/api/cards/${card.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ [field]: value }),
    });
    const data = await res.json();
    onUpdated(data);
  }

  async function updateStatus(status: string | null) {
    if (!status) return;
    const res = await fetch(`/api/cards/${card.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ status }),
    });
    const data = await res.json();
    onUpdated(data);
    toast.success(`Status set to ${status}`);
  }

  async function uploadVideo(file: File, isFinal = false) {
    setUploading(true);
    const form = new FormData();
    form.append("video", file);
    if (isFinal) form.append("final", "true");

    const res  = await fetch(`/api/cards/${card.id}/video`, { method: "POST", body: form });
    const data = await res.json();

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

  const videoPath = phase === "final_video" ? (card.finalVideoPath ?? card.videoPath) : card.videoPath;
  const label     = phase === "final_video" ? `Card ${card.position} — Final Video` : `Card ${card.position}`;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{label}</CardTitle>
          <StatusBadge status={card.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">

        {/* Video drop zone */}
        <div
          className={`border-2 border-dashed rounded-lg overflow-hidden transition-colors ${
            dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => handleDrop(e, phase === "final_video")}
        >
          {videoPath ? (
            <video src={videoPath} controls className="w-full max-h-48 object-contain bg-black" />
          ) : (
            <button
              type="button"
              className="w-full p-6 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => (phase === "final_video" ? finalRef : inputRef).current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <span className="text-sm">Uploading…</span>
              ) : (
                <>
                  <Video className="h-8 w-8" />
                  <span className="text-sm">Drop video or click to upload</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Hidden file inputs */}
        <Input
          ref={inputRef} type="file" accept="video/*" className="hidden"
          onChange={(e) => e.target.files?.[0] && uploadVideo(e.target.files[0])}
        />
        <Input
          ref={finalRef} type="file" accept="video/*" className="hidden"
          onChange={(e) => e.target.files?.[0] && uploadVideo(e.target.files[0], true)}
        />

        {videoPath && (
          <Button
            variant="outline" size="sm" className="w-full"
            onClick={() => (phase === "final_video" ? finalRef : inputRef).current?.click()}
            disabled={uploading}
          >
            <Upload className="h-3.5 w-3.5 mr-1.5" />
            Replace Video
          </Button>
        )}

        {/* Transcript V1 */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Transcript</Label>
            <span className="text-xs text-muted-foreground">
              {transcript.length} / {TRANSCRIPT_CHAR_LIMIT}
            </span>
          </div>
          <Textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onBlur={() => saveTranscript("transcriptV1", transcript)}
            maxLength={TRANSCRIPT_CHAR_LIMIT}
            className="min-h-32"
            placeholder="Enter transcript (~30 second script)"
          />
        </div>

        {/* Transcript V2 (revision) — shown when project has previously been reviewed */}
        {phase === "transcript" && card.transcriptV1 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Label className="text-xs">Revised Transcript</Label>
                <Badge variant="secondary" className="text-xs">Optional</Badge>
              </div>
              <span className="text-xs text-muted-foreground">
                {transcriptV2.length} / {TRANSCRIPT_CHAR_LIMIT}
              </span>
            </div>
            <Textarea
              value={transcriptV2}
              onChange={(e) => setTranscriptV2(e.target.value)}
              onBlur={() => saveTranscript("transcriptV2", transcriptV2)}
              maxLength={TRANSCRIPT_CHAR_LIMIT}
              className="min-h-32"
              placeholder="Enter revised transcript (shown alongside original)"
            />
          </div>
        )}

        {/* Status override */}
        <div className="space-y-1">
          <Label className="text-xs">Override Status</Label>
          <Select value={card.status} onValueChange={updateStatus}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="waiting">Waiting</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="denied">Denied</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </CardContent>
    </Card>
  );
}
