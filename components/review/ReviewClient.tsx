"use client";

import { useState } from "react";
import { Button }   from "@/components/ui/button";
import { Badge }    from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DenyCounter }  from "./DenyCounter";
import { ReviewCard }   from "./ReviewCard";
import { toast }        from "sonner";
import { CheckCheck }   from "lucide-react";
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
  const [cards,         setCards]         = useState<CardType[]>(initialCards);
  const [session,       setSession]       = useState(initialSession);
  const [deniedIds,     setDeniedIds]     = useState<Set<string>>(new Set());
  const [denyDialogOpen, setDenyDialogOpen] = useState(false);
  const [doneDialogOpen, setDoneDialogOpen] = useState(false);
  const [approving,     setApproving]     = useState(false);

  const timeLeft = session.expiresAt - Date.now();
  const hoursLeft = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60)));

  async function handleDeny(cardId: string) {
    const res = await fetch(`/api/review/deny?token=${token}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ cardId }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error ?? "Failed to deny");
      return;
    }
    setDeniedIds((prev) => new Set([...prev, cardId]));
    setSession((s) => ({ ...s, deniesLeft: data.deniesLeft }));
    setDenyDialogOpen(true);
  }

  async function handleApprove() {
    setApproving(true);
    const res = await fetch(`/api/review/approve?token=${token}`, { method: "POST" });
    if (res.ok) {
      setDoneDialogOpen(true);
    } else {
      toast.error("Failed to approve");
    }
    setApproving(false);
  }

  const allDenied     = cards.every((c) => deniedIds.has(c.id));
  const anyDenied     = deniedIds.size > 0;
  const approveLabel  = anyDenied ? "Accept Remaining" : "Approve All";

  if (session.completedAt) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-2">
          <CheckCheck className="h-12 w-12 mx-auto text-green-500" />
          <p className="font-semibold text-lg">Already submitted</p>
          <p className="text-muted-foreground text-sm">Thank you for reviewing this content.</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">{projectName}</p>
              <p className="text-xs text-muted-foreground">
                {phase === "final_video" ? "Final review" : "Transcript review"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <DenyCounter deniesLeft={session.deniesLeft} />
              <Badge variant={hoursLeft < 12 ? "destructive" : "outline"} className="text-xs hidden sm:flex">
                {hoursLeft}h left
              </Badge>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="max-w-5xl mx-auto px-4 py-6 pb-28 grid grid-cols-6 gap-4">
          {cards.map((card, i) => (
            <div key={card.id} className={
              i < 3 ? "col-span-2" :
              i === 3 ? "col-span-2 col-start-2" :
              "col-span-2"
            }>
            <ReviewCard
              key={card.id}
              card={card}
              token={token}
              phase={phase}
              deniesLeft={session.deniesLeft}
              denied={deniedIds.has(card.id)}
              onDeny={handleDeny}
              onUpdated={(updated) =>
                setCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
              }
            />
            </div>
          ))}

          {allDenied && (
            <p className="text-center text-muted-foreground text-sm py-4">
              All cards have been denied. The owner will send revised content.
            </p>
          )}
        </div>

        {/* Sticky footer */}
        {!allDenied && (
          <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur p-4">
            <div className="max-w-5xl mx-auto">
              <Button
                className="w-full"
                size="lg"
                onClick={handleApprove}
                disabled={approving}
              >
                <CheckCheck className="h-4 w-4 mr-2" />
                {approving ? "Submitting…" : approveLabel}
              </Button>
            </div>
          </div>
        )}

        {/* Deny dialog */}
        <Dialog open={denyDialogOpen} onOpenChange={setDenyDialogOpen}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Card Denied</DialogTitle>
              <DialogDescription>
                The owner will be notified and will send a revised transcript for this card.
                {session.deniesLeft > 0
                  ? ` You have ${session.deniesLeft} denial${session.deniesLeft !== 1 ? "s" : ""} remaining.`
                  : " You have no denials remaining."}
              </DialogDescription>
            </DialogHeader>
            <Button className="w-full" onClick={() => setDenyDialogOpen(false)}>
              Got it
            </Button>
          </DialogContent>
        </Dialog>

        {/* Completion dialog */}
        <Dialog open={doneDialogOpen} onOpenChange={setDoneDialogOpen}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>
                {anyDenied ? "Partial Approval Submitted" : "All Approved!"}
              </DialogTitle>
              <DialogDescription>
                {anyDenied
                  ? "Your approved cards have been accepted. The owner will revise the denied cards and may send you a new review link."
                  : "Thank you for reviewing the content. The owner has been notified of your approval."}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center pt-2">
              <CheckCheck className="h-10 w-10 text-green-500" />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
