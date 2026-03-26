"use client";

import { useState } from "react";
import { Input }  from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label }  from "@/components/ui/label";
import { toast }  from "sonner";
import {
  Copy, Send, RefreshCw, CheckCircle2, XCircle, Clock,
  FileText, Mail, Clapperboard, Rocket, ChevronRight, ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project, Card as CardType, ReviewSession } from "@/lib/db/schema";

type ProjectWithCards = Project & { cards: CardType[]; reviewSessions: ReviewSession[] };

// ─── Pipeline ────────────────────────────────────────────────────────────────

type PipelineStage = "draft" | "ready" | "in_review" | "approved" | "final";

function getPipelineStage(project: ProjectWithCards): PipelineStage {
  const { cards, phase, reviewSessions } = project;
  const hasTranscripts = cards.some(c => (c.transcriptV1 ?? "").trim().length > 0);
  const allApproved    = cards.length > 0 && cards.every(c => c.status === "approved");
  const anyReviewed    = cards.some(c => c.status !== "waiting");
  const hasSentSession = reviewSessions.length > 0;

  if (phase === "final_video") return "final";
  if (allApproved)             return "approved";
  if (anyReviewed || hasSentSession) return "in_review";
  if (hasTranscripts)          return "ready";
  return "draft";
}

const STAGES: { id: PipelineStage; label: string; icon: React.ReactNode }[] = [
  { id: "draft",     label: "Drafting",   icon: <FileText    className="h-3.5 w-3.5" /> },
  { id: "ready",     label: "Ready",      icon: <Mail        className="h-3.5 w-3.5" /> },
  { id: "in_review", label: "In Review",  icon: <Clock       className="h-3.5 w-3.5" /> },
  { id: "approved",  label: "Approved",   icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  { id: "final",     label: "Final Video", icon: <Clapperboard className="h-3.5 w-3.5" /> },
];

const STAGE_ORDER = STAGES.map(s => s.id);

function PipelineStrip({ project }: { project: ProjectWithCards }) {
  const current = getPipelineStage(project);
  const currentIdx = STAGE_ORDER.indexOf(current);

  return (
    <div className="flex items-center gap-0 text-xs overflow-x-auto pb-0.5">
      {STAGES.map((stage, i) => {
        const isDone    = i < currentIdx;
        const isActive  = i === currentIdx;
        const isPending = i > currentIdx;

        return (
          <div key={stage.id} className="flex items-center shrink-0">
            <div className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors",
              isDone   ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-400"
            : isActive ? "bg-primary/10 border-primary/30 text-primary font-semibold"
            : "bg-transparent border-muted text-muted-foreground/50"
            )}>
              {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : stage.icon}
              <span>{stage.label}</span>
            </div>
            {i < STAGES.length - 1 && (
              <ChevronRight className={cn(
                "h-3.5 w-3.5 mx-0.5",
                i < currentIdx ? "text-emerald-400" : "text-muted-foreground/30"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  project:   ProjectWithCards;
  onUpdated: (p: ProjectWithCards) => void;
  onPhase:   (phase: "transcript" | "final_video") => void;
}

export function ProjectHeader({ project, onUpdated, onPhase }: Props) {
  const [name,      setName]      = useState(project.name);
  const [email,     setEmail]     = useState(project.clientEmail ?? "");
  const [reviewUrl, setReviewUrl] = useState<string | null>(null);
  const [sendOpen,  setSendOpen]  = useState(false);
  const [sending,   setSending]   = useState(false);
  const [regen,     setRegen]     = useState(false);

  // keep local name in sync when project switches
  if (name !== project.name && document.activeElement?.id !== "batch-name-input") {
    setName(project.name);
  }

  const cards    = project.cards;
  const approved = cards.filter(c => c.status === "approved").length;
  const denied   = cards.filter(c => c.status === "denied").length;
  const waiting  = cards.filter(c => c.status === "waiting").length;

  async function saveName() {
    if (name.trim() === project.name) return;
    const res  = await fetch(`/api/projects/${project.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ name: name.trim() }),
    });
    const data = await res.json() as any;
    onUpdated({ ...project, ...data });
    toast.success("Renamed");
  }

  async function generateToken() {
    setRegen(true);
    const res  = await fetch(`/api/projects/${project.id}/token`, { method: "POST" });
    const data = await res.json() as any;
    setReviewUrl(data.reviewUrl);
    onUpdated({ ...project, token: data.token });
    toast.success("New review link generated");
    setRegen(false);
  }

  async function sendLink() {
    if (!email) return;
    setSending(true);
    try {
      const res  = await fetch(`/api/projects/${project.id}/send`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body:   JSON.stringify({ email }),
      });
      const data = await res.json() as any;
      if (res.ok) {
        setReviewUrl(data.reviewUrl);
        onUpdated({ ...project, clientEmail: email });
        toast.success(`Review link sent to ${email}`);
        setSendOpen(false);
      } else {
        toast.error(data.error ?? "Failed to send");
      }
    } catch {
      toast.error("Network error");
    }
    setSending(false);
  }

  const appUrl     = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const currentUrl = reviewUrl ?? `${appUrl}/review?token=${project.token}`;

  return (
    <div className="space-y-3">
      {/* Top row: name + phase + actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Name */}
        <Input
          id="batch-name-input"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={saveName}
          onKeyDown={e => e.key === "Enter" && saveName()}
          className="text-base font-bold h-9 max-w-xs border-transparent bg-transparent px-0 focus:border-border focus:bg-background focus:px-3 transition-all"
        />

        {/* Phase toggle pills */}
        <div className="flex items-center rounded-lg border overflow-hidden text-xs shrink-0">
          <button
            onClick={() => onPhase("transcript")}
            className={cn(
              "px-3 py-1.5 transition-colors",
              project.phase === "transcript"
                ? "bg-primary text-primary-foreground font-medium"
                : "hover:bg-muted text-muted-foreground"
            )}
          >
            Transcript
          </button>
          <button
            onClick={() => onPhase("final_video")}
            className={cn(
              "px-3 py-1.5 border-l transition-colors",
              project.phase === "final_video"
                ? "bg-primary text-primary-foreground font-medium"
                : "hover:bg-muted text-muted-foreground"
            )}
          >
            Final Video
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 sm:ml-auto text-xs">
          {approved > 0 && (
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" /> {approved}
            </span>
          )}
          {denied > 0 && (
            <span className="flex items-center gap-1 text-destructive font-medium">
              <XCircle className="h-3.5 w-3.5" /> {denied}
            </span>
          )}
          {waiting > 0 && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {waiting}
            </span>
          )}
          <span className="text-muted-foreground">/ {cards.length}</span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            variant="outline" size="sm" onClick={generateToken} disabled={regen}
            title="Generate new review link"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", regen && "animate-spin")} />
          </Button>
          <Button
            variant="outline" size="sm"
            onClick={() => { navigator.clipboard.writeText(currentUrl); toast.success("Review link copied"); }}
            title="Copy review link"
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline" size="sm"
            onClick={() => {
              const onboardUrl = `${window.location.origin}/onboard?token=${project.token}`;
              navigator.clipboard.writeText(onboardUrl);
              toast.success("Onboarding link copied");
            }}
            title="Copy onboarding link for client"
          >
            <ClipboardList className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" onClick={() => setSendOpen(true)}>
            <Send className="h-3.5 w-3.5 mr-1.5" />
            Send
          </Button>
        </div>
      </div>

      {/* Client email quick bar */}
      {project.clientEmail && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-1.5">
          <Mail className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{project.clientEmail}</span>
          <button
            className="ml-auto hover:text-foreground transition-colors"
            onClick={() => { navigator.clipboard.writeText(project.clientEmail!); toast.success("Email copied"); }}
          >
            <Copy className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Pipeline strip */}
      <PipelineStrip project={project} />

      {/* Send dialog */}
      <Dialog open={sendOpen} onOpenChange={setSendOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Send Review Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="send-email">Recipient Email</Label>
              <Input
                id="send-email"
                type="email"
                placeholder="client@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendLink()}
              />
            </div>
            <Button className="w-full" onClick={sendLink} disabled={sending || !email}>
              {sending ? "Sending…" : "Send Link"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
