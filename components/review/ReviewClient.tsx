"use client";

import { useState } from "react";
import { Button }   from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DenyCounter }  from "./DenyCounter";
import { ReviewCard }   from "./ReviewCard";
import { toast }        from "sonner";
import { CheckCheck, CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Card as CardType } from "@/lib/db/schema";

interface ReviewSession {
  id:          string;
  deniesLeft:  number;
  expiresAt:   number;
  completedAt: number | null;
}

interface Props {
  token:         string;
  projectName:   string;
  phase:         "transcript" | "final_video";
  cards:         CardType[];
  session:       ReviewSession;
}

export function ReviewClient({ token, projectName, phase, cards: initialCards, session: initialSession }: Props) {
  const [cards,   setCards]   = useState<CardType[]>(initialCards);
  const [session, setSession] = useState(initialSession);

  const [deniedIds,   setDeniedIds]   = useState<Set<string>>(
    () => new Set(initialCards.filter(c => c.status === "denied").map(c => c.id))
  );
  const [approvedIds, setApprovedIds] = useState<Set<string>>(
    () => new Set(initialCards.filter(c => c.status === "approved").map(c => c.id))
  );

  const [denyDialogOpen, setDenyDialogOpen] = useState(false);
  const [doneDialogOpen, setDoneDialogOpen] = useState(false);
  const [approving,      setApproving]      = useState(false);

  const hoursLeft     = Math.max(0, Math.floor((session.expiresAt - Date.now()) / 3_600_000));
  const pendingCards  = cards.filter(c => !deniedIds.has(c.id) && !approvedIds.has(c.id));
  const totalApproved = approvedIds.size;
  const totalDenied   = deniedIds.size;
  const totalPending  = pendingCards.length;
  const totalActed    = totalApproved + totalDenied;
  const progress      = Math.round((totalActed / cards.length) * 100);
  const allActedUpon  = totalPending === 0;

  async function handleDeny(cardId: string) {
    const res  = await fetch(`/api/review/deny?token=${token}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ cardId }),
    });
    const data = await res.json() as any;
    if (!res.ok) { toast.error(data.error ?? "Failed to deny"); return; }
    setDeniedIds(prev => new Set([...prev, cardId]));
    setSession(s => ({ ...s, deniesLeft: data.deniesLeft }));
    setDenyDialogOpen(true);
  }

  async function handleApprove() {
    setApproving(true);
    const res = await fetch(`/api/review/approve?token=${token}`, { method: "POST" });
    if (res.ok) {
      setApprovedIds(prev => new Set([...prev, ...pendingCards.map(c => c.id)]));
      setDoneDialogOpen(true);
    } else {
      toast.error("Failed to submit");
    }
    setApproving(false);
  }

  // ── Already completed ──────────────────────────────────────────────────────
  if (session.completedAt) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center gap-5">
        <div className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
          <CheckCheck className="h-10 w-10 text-emerald-600" />
        </div>
        <div className="space-y-2">
          <p className="font-bold text-xl">All done!</p>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            Thanks for reviewing <strong>{projectName}</strong>. You can safely close this page.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm mt-1">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <CheckCircle2 className="h-4 w-4" /> {totalApproved} approved
          </span>
          {totalDenied > 0 && (
            <span className="flex items-center gap-1.5 text-amber-600 font-medium">
              <XCircle className="h-4 w-4" /> {totalDenied} flagged
            </span>
          )}
        </div>
      </div>
    );
  }

  const approveLabel = totalPending === cards.length
    ? `Approve All ${totalPending > 1 ? `(${totalPending})` : ""}`
    : totalPending > 0
    ? `Approve Remaining (${totalPending})`
    : "Submit Review";

  const allDenied = totalPending === 0 && totalDenied === cards.length;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">

        {/* ── Sticky Header ─────────────────────────────────────────────────── */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/60">
          <div className="px-4 pt-4 pb-3 max-w-6xl mx-auto space-y-3">

            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="font-bold text-base leading-tight truncate">{projectName}</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {phase === "final_video" ? "Final review" : "Transcript review"}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <DenyCounter deniesLeft={session.deniesLeft} />
                <span className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full border",
                  hoursLeft < 12
                    ? "border-destructive/50 text-destructive bg-destructive/5"
                    : "border-border text-muted-foreground"
                )}>
                  {hoursLeft}h left
                </span>
              </div>
            </div>

            {/* Stats pill row */}
            <div className="flex items-center gap-2">
              {totalApproved > 0 && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="h-3 w-3" /> {totalApproved}
                </span>
              )}
              {totalDenied > 0 && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-full">
                  <XCircle className="h-3 w-3" /> {totalDenied}
                </span>
              )}
              {totalPending > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                  <Clock className="h-3 w-3" /> {totalPending} pending
                </span>
              )}
              <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                {totalActed}/{cards.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500 ease-out",
                  progress === 100 ? "bg-emerald-500" : "bg-primary"
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Card list ─────────────────────────────────────────────────────── */}
        <div className="px-4 py-5 pb-36 max-w-6xl mx-auto">
          <div className={cn(
            "grid gap-4",
            cards.length <= 2 ? "grid-cols-1 sm:grid-cols-2"
          : cards.length === 3 ? "grid-cols-1 sm:grid-cols-3"
          : cards.length === 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          : cards.length <= 6 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}>
          {[...cards].sort((a, b) => {
            const aApproved = approvedIds.has(a.id) ? 1 : 0;
            const bApproved = approvedIds.has(b.id) ? 1 : 0;
            return aApproved - bApproved || a.position - b.position;
          }).map((card, i, arr) => (
            <div key={card.id} className="flex flex-col">
              <ReviewCard
                card={card}
                token={token}
                phase={phase}
                index={arr.filter(c => !approvedIds.has(c.id)).indexOf(card) + 1}
                total={cards.length}
                deniesLeft={session.deniesLeft}
                denied={deniedIds.has(card.id)}
                approved={approvedIds.has(card.id)}
                onDeny={handleDeny}
                onUpdated={updated => setCards(prev => prev.map(c => c.id === updated.id ? updated : c))}
              />
            </div>
          ))}
          </div>

          {allDenied && (
            <div className="flex flex-col items-center gap-2 py-10 text-center">
              <AlertCircle className="h-8 w-8 text-amber-500 opacity-60" />
              <p className="text-sm text-muted-foreground max-w-xs">
                All cards flagged for revision. The team will send updated content shortly.
              </p>
            </div>
          )}
        </div>

        {/* ── Sticky Footer CTA ─────────────────────────────────────────────── */}
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-md border-t border-border/60">
          <div className="px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] max-w-6xl mx-auto space-y-2">
            {totalPending > 0 && (
              <p className="text-xs text-center text-muted-foreground">
                {totalPending === cards.length
                  ? "Review each card below, then approve or request revisions"
                  : `${totalPending} card${totalPending !== 1 ? "s" : ""} still need your review`}
              </p>
            )}
            <Button
              className={cn(
                "w-full h-14 text-base font-semibold rounded-xl transition-all",
                allDenied && "opacity-50"
              )}
              onClick={handleApprove}
              disabled={approving || allDenied}
            >
              <CheckCheck className="h-5 w-5 mr-2" />
              {approving ? "Submitting…" : approveLabel}
            </Button>
          </div>
        </div>

        {/* ── Deny dialog ───────────────────────────────────────────────────── */}
        <Dialog open={denyDialogOpen} onOpenChange={setDenyDialogOpen}>
          <DialogContent className="max-w-sm mx-4 rounded-2xl">
            <div className="flex justify-center pt-1 pb-2">
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <DialogHeader className="text-center">
              <DialogTitle>Revision Requested</DialogTitle>
              <DialogDescription className="text-center">
                The team has been notified and will send a revised version.
                {session.deniesLeft > 0
                  ? ` You have ${session.deniesLeft} revision request${session.deniesLeft !== 1 ? "s" : ""} remaining.`
                  : " You've reached the revision limit."}
              </DialogDescription>
            </DialogHeader>
            <Button className="w-full h-12 rounded-xl mt-1" onClick={() => setDenyDialogOpen(false)}>
              Got it
            </Button>
          </DialogContent>
        </Dialog>

        {/* ── Done dialog ───────────────────────────────────────────────────── */}
        <Dialog open={doneDialogOpen} onOpenChange={setDoneDialogOpen}>
          <DialogContent className="max-w-sm mx-4 rounded-2xl">
            <div className="flex justify-center pt-1 pb-2">
              <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
                <CheckCheck className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <DialogHeader className="text-center">
              <DialogTitle className="text-xl">
                {totalDenied > 0 ? "Review Submitted" : "All Approved!"}
              </DialogTitle>
              <DialogDescription className="text-center leading-relaxed">
                {totalDenied > 0
                  ? `${totalApproved} card${totalApproved !== 1 ? "s" : ""} approved · ${totalDenied} flagged for revision. The team will be in touch.`
                  : "Every card approved. The team will move forward with production."}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>
    </TooltipProvider>
  );
}
