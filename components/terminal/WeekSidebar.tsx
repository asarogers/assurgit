"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, Plus, LogOut, Layers } from "lucide-react";
import type { Project, Card as CardType, ReviewSession } from "@/lib/db/schema";

type ProjectWithCards = Project & { cards: CardType[]; reviewSessions: ReviewSession[] };

function relativeDate(ms: number) {
  const diff = Date.now() - ms;
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7)  return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function BatchItem({
  project,
  isSelected,
  onClick,
}: {
  project: ProjectWithCards;
  isSelected: boolean;
  onClick: () => void;
}) {
  const total    = project.cards.length;
  const approved = project.cards.filter(c => c.status === "approved").length;
  const denied   = project.cards.filter(c => c.status === "denied").length;
  const waiting  = total - approved - denied;
  const allDone  = total > 0 && approved + denied === total && approved > 0;
  const progress = total > 0 ? (approved / total) * 100 : 0;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2.5 rounded-lg transition-all border",
        isSelected
          ? "bg-primary/10 border-primary/30 shadow-sm"
          : "hover:bg-muted/60 border-transparent"
      )}
    >
      {/* Name row */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className={cn(
          "text-sm font-semibold truncate flex-1",
          isSelected ? "text-primary" : "text-foreground"
        )}>
          {project.name}
        </span>
        {allDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />}
        <Badge
          variant={project.phase === "final_video" ? "default" : "outline"}
          className="text-[10px] h-4 px-1.5 leading-none shrink-0"
        >
          {project.phase === "final_video" ? "Final" : "Draft"}
        </Badge>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted rounded-full overflow-hidden mb-1.5">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            allDone ? "bg-emerald-500" : isSelected ? "bg-primary" : "bg-primary/60"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        {approved > 0 && (
          <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-2.5 w-2.5" />
            {approved}
          </span>
        )}
        {denied > 0 && (
          <span className="flex items-center gap-0.5 text-destructive">
            <XCircle className="h-2.5 w-2.5" />
            {denied}
          </span>
        )}
        {waiting > 0 && (
          <span className="flex items-center gap-0.5">
            <Clock className="h-2.5 w-2.5" />
            {waiting}
          </span>
        )}
        <span className="ml-auto opacity-60">{relativeDate(project.createdAt)}</span>
      </div>
    </button>
  );
}

interface Props {
  projects:   ProjectWithCards[];
  selectedId: string | undefined;
  onSelect:   (id: string) => void;
  onNew:      () => void;
  onLogout:   () => void;
}

export function WeekSidebar({ projects, selectedId, onSelect, onNew, onLogout }: Props) {
  const totalCards    = projects.reduce((s, p) => s + p.cards.length, 0);
  const totalApproved = projects.reduce(
    (s, p) => s + p.cards.filter(c => c.status === "approved").length, 0
  );

  return (
    <div className="flex flex-col h-full bg-card border-r">
      {/* Header */}
      <div className="px-4 py-4 border-b">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center">
            <Layers className="h-4 w-4 text-primary" />
          </div>
          <span className="font-bold text-sm tracking-tight">Content Control</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{projects.length}</span> batches ·{" "}
            <span className="font-medium text-emerald-600 dark:text-emerald-400">{totalApproved}</span>
            /{totalCards} approved
          </div>
          <Button size="sm" variant="outline" className="h-7 text-xs px-2" onClick={onNew}>
            <Plus className="h-3.5 w-3.5 mr-1" />
            New
          </Button>
        </div>
      </div>

      {/* Batch list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {projects.length === 0 ? (
          <div className="px-3 py-8 text-center text-xs text-muted-foreground">
            No batches yet.<br />
            <button onClick={onNew} className="text-primary hover:underline mt-1 inline-block">
              Create your first batch →
            </button>
          </div>
        ) : (
          projects.map(p => (
            <BatchItem
              key={p.id}
              project={p}
              isSelected={p.id === selectedId}
              onClick={() => onSelect(p.id)}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t">
        <Button
          size="sm" variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground text-xs"
          onClick={onLogout}
        >
          <LogOut className="h-3.5 w-3.5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
