"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, XCircle, Clock, Plus, LogOut, Layers,
  ChevronRight, ChevronDown, Trash2, FolderOpen,
} from "lucide-react";
import type { Project, Card as CardType, ReviewSession, Client } from "@/lib/db/schema";

type BatchWithCards    = Project & { cards: CardType[]; reviewSessions: ReviewSession[] };
type ClientWithBatches = Client & { projects: BatchWithCards[] };

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
  batch,
  isSelected,
  indent,
  onClick,
  onDelete,
}: {
  batch:      BatchWithCards;
  isSelected: boolean;
  indent?:    boolean;
  onClick:    () => void;
  onDelete?:  () => void;
}) {
  const total    = batch.cards.length;
  const approved = batch.cards.filter(c => c.status === "approved").length;
  const denied   = batch.cards.filter(c => c.status === "denied").length;
  const waiting  = total - approved - denied;
  const allDone  = total > 0 && approved + denied === total && approved > 0;
  const progress = total > 0 ? (approved / total) * 100 : 0;

  return (
    <div className={cn(
      "group relative w-full rounded-lg border transition-all",
      isSelected ? "bg-primary/10 border-primary/30 shadow-sm" : "hover:bg-muted/60 border-transparent"
    )}>
      <button
        onClick={onClick}
        className={cn("w-full text-left py-2", indent ? "px-2 pr-7" : "px-3 pr-7")}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className={cn(
            "text-sm font-semibold truncate flex-1",
            isSelected ? "text-primary" : "text-foreground"
          )}>
            {batch.name}
          </span>
          {allDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />}
          <Badge
            variant={batch.phase === "final_video" ? "default" : "outline"}
            className="text-[10px] h-4 px-1.5 leading-none shrink-0"
          >
            {batch.phase === "final_video" ? "Final" : "Draft"}
          </Badge>
        </div>

        <div className="h-1 bg-muted rounded-full overflow-hidden mb-1.5">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              allDone ? "bg-emerald-500" : isSelected ? "bg-primary" : "bg-primary/60"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>

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
          <span className="ml-auto opacity-60">{relativeDate(batch.createdAt)}</span>
        </div>
      </button>

      {onDelete && (
        <button
          onClick={e => { e.stopPropagation(); onDelete(); }}
          className="absolute top-2 right-1.5 h-5 w-5 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
          title="Delete batch"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

interface Props {
  clients:           ClientWithBatches[];
  orphans:           BatchWithCards[];
  selectedClientId:  string | undefined;
  selectedBatchId:   string | undefined;
  expandedClientIds: Set<string>;
  onToggleClient:    (id: string) => void;
  onSelectBatch:     (batchId: string, clientId: string | undefined) => void;
  onNewClient:       () => void;
  onDeleteClient:    (id: string) => void;
  onDeleteBatch:     (batchId: string, clientId: string | undefined) => void;
  onLogout:          () => void;
}

export function WeekSidebar({
  clients,
  orphans,
  selectedClientId,
  selectedBatchId,
  expandedClientIds,
  onToggleClient,
  onSelectBatch,
  onNewClient,
  onDeleteClient,
  onDeleteBatch,
  onLogout,
}: Props) {
  const totalBatches  = clients.reduce((s, c) => s + c.projects.length, 0) + orphans.length;
  const totalCards    = clients.reduce((s, c) => s + c.projects.reduce((ss, b) => ss + b.cards.length, 0), 0)
                      + orphans.reduce((s, b) => s + b.cards.length, 0);
  const totalApproved = clients.reduce((s, c) => s + c.projects.reduce(
    (ss, b) => ss + b.cards.filter(card => card.status === "approved").length, 0), 0)
    + orphans.reduce((s, b) => s + b.cards.filter(c => c.status === "approved").length, 0);

  const hasAnything = clients.length > 0 || orphans.length > 0;

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
            <span className="font-medium text-foreground">{totalBatches}</span> batches ·{" "}
            <span className="font-medium text-emerald-600 dark:text-emerald-400">{totalApproved}</span>
            /{totalCards} approved
          </div>
          <Button size="sm" variant="outline" className="h-7 text-xs px-2" onClick={onNewClient}>
            <Plus className="h-3.5 w-3.5 mr-1" />
            New Project
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {!hasAnything ? (
          <div className="px-3 py-8 text-center text-xs text-muted-foreground">
            No projects yet.<br />
            <button onClick={onNewClient} className="text-primary hover:underline mt-1 inline-block">
              Create your first project →
            </button>
          </div>
        ) : (
          <>
            {/* Client rows */}
            {clients.map(client => {
              const isExpanded = expandedClientIds.has(client.id);
              return (
                <div key={client.id}>
                  {/* Client header row */}
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-1.5 rounded-lg group",
                    selectedClientId === client.id && !selectedBatchId
                      ? "bg-muted/80"
                      : "hover:bg-muted/40"
                  )}>
                    <button
                      className="flex items-center gap-1.5 flex-1 min-w-0 text-left"
                      onClick={() => onToggleClient(client.id)}
                    >
                      {isExpanded
                        ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      }
                      <FolderOpen className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-xs font-semibold truncate text-foreground">
                        {client.name}
                      </span>
                      {client.projects.length > 0 && (
                        <span className="text-[10px] text-muted-foreground shrink-0">
                          {client.projects.length}
                        </span>
                      )}
                    </button>
                    <button
                      className="h-5 w-5 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all shrink-0"
                      onClick={e => { e.stopPropagation(); onDeleteClient(client.id); }}
                      title="Delete project"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Expanded batches */}
                  {isExpanded && (
                    <div className="ml-4 mt-0.5 space-y-0.5 border-l border-border/50 pl-2">
                      {client.projects.length === 0 ? (
                        <p className="text-[11px] text-muted-foreground px-2 py-1.5 italic">
                          No batches
                        </p>
                      ) : (
                        client.projects.map(batch => (
                          <BatchItem
                            key={batch.id}
                            batch={batch}
                            isSelected={batch.id === selectedBatchId}
                            indent
                            onClick={() => onSelectBatch(batch.id, client.id)}
                            onDelete={() => onDeleteBatch(batch.id, client.id)}
                          />
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Orphan batches (legacy) */}
            {orphans.length > 0 && (
              <>
                {clients.length > 0 && (
                  <div className="px-3 pt-2 pb-0.5">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">
                      Unassigned
                    </span>
                  </div>
                )}
                {orphans.map(batch => (
                  <BatchItem
                    key={batch.id}
                    batch={batch}
                    isSelected={batch.id === selectedBatchId}
                    onClick={() => onSelectBatch(batch.id, undefined)}
                    onDelete={() => onDeleteBatch(batch.id, undefined)}
                  />
                ))}
              </>
            )}
          </>
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
