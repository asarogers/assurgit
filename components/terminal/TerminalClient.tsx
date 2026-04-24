"use client";

import { useState } from "react";
import { Button }   from "@/components/ui/button";
import { Badge }    from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label }    from "@/components/ui/label";
import { Input }    from "@/components/ui/input";
import { WeekSidebar }   from "./WeekSidebar";
import { ProjectHeader } from "./ProjectHeader";
import { CardEditor }    from "./CardEditor";
import { MetricsPanel }  from "./MetricsPanel";
import { ProjectNav }    from "./ProjectNav";
import { toast }         from "sonner";
import { Menu, Trash2, Layers, Plus, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project, Card as CardType, ReviewSession, Client } from "@/lib/db/schema";

type BatchWithCards   = Project & { cards: CardType[]; reviewSessions: ReviewSession[] };
type ClientWithBatches = Client & { projects: BatchWithCards[] };

const COUNT_PRESETS = [3, 5, 7, 10];
const DEFAULT_COUNT = 5;

interface Props {
  initialClients: ClientWithBatches[];
  initialOrphans: BatchWithCards[];
}

export function TerminalClient({ initialClients, initialOrphans }: Props) {
  const [clients,          setClients]          = useState<ClientWithBatches[]>(initialClients);
  const [orphans,          setOrphans]          = useState<BatchWithCards[]>(initialOrphans);
  const [selectedClientId, setSelectedClientId] = useState<string | undefined>(
    initialClients[0]?.id
  );
  const [selectedBatchId,  setSelectedBatchId]  = useState<string | undefined>(
    initialClients[0]?.projects[0]?.id ?? initialOrphans[0]?.id
  );
  const [expandedClientIds, setExpandedClientIds] = useState<Set<string>>(
    () => new Set(initialClients.map(c => c.id))
  );

  // Create-client dialog
  const [clientDialogOpen, setClientDialogOpen] = useState(false);
  const [clientName,        setClientName]       = useState("");
  const [creatingClient,    setCreatingClient]   = useState(false);

  // Create-batch dialog
  const [batchDialogOpen, setBatchDialogOpen] = useState(false);
  const [batchName,        setBatchName]       = useState("");
  const [cardCount,        setCardCount]       = useState(DEFAULT_COUNT);
  const [creatingBatch,    setCreatingBatch]   = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [metricsOpen, setMetricsOpen] = useState(false);

  // Resolve current selection
  const selectedClient = clients.find(c => c.id === selectedClientId);
  const clientBatches  = selectedClient?.projects ?? [];
  const batch =
    clientBatches.find(b => b.id === selectedBatchId) ??
    orphans.find(b => b.id === selectedBatchId);

  const batchIndex = clientBatches.findIndex(b => b.id === selectedBatchId);

  function goToPrev() {
    if (batchIndex > 0) setSelectedBatchId(clientBatches[batchIndex - 1].id);
  }
  function goToNext() {
    if (batchIndex < clientBatches.length - 1)
      setSelectedBatchId(clientBatches[batchIndex + 1].id);
  }

  // ── Client CRUD ──────────────────────────────────────────────────────────────

  function openClientDialog() {
    setClientName("");
    setClientDialogOpen(true);
  }

  async function createClient() {
    if (!clientName.trim()) return;
    setCreatingClient(true);
    try {
      const res  = await fetch("/api/clients", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body:   JSON.stringify({ name: clientName.trim() }),
      });
      const data = await res.json() as ClientWithBatches;
      const newClient = { ...data, projects: data.projects ?? [] };
      setClients(prev => [newClient, ...prev]);
      setSelectedClientId(newClient.id);
      setSelectedBatchId(undefined);
      setExpandedClientIds(prev => new Set([...prev, newClient.id]));
      setClientDialogOpen(false);
      toast.success(`"${newClient.name}" created`);
    } finally {
      setCreatingClient(false);
    }
  }

  async function deleteClient(clientId: string) {
    const target = clients.find(c => c.id === clientId);
    if (!target) return;
    if (!confirm(`Delete project "${target.name}" and all its batches? This cannot be undone.`))
      return;
    await fetch(`/api/clients/${clientId}`, { method: "DELETE" });
    const next = clients.filter(c => c.id !== clientId);
    setClients(next);
    if (selectedClientId === clientId) {
      setSelectedClientId(next[0]?.id);
      setSelectedBatchId(next[0]?.projects[0]?.id);
    }
    toast.success("Project deleted");
  }

  // ── Batch CRUD ───────────────────────────────────────────────────────────────

  // The client to use when creating a batch — selected client, or first available
  const batchTargetClientId = selectedClientId ?? clients[0]?.id;
  const batchTargetClient   = clients.find(c => c.id === batchTargetClientId);

  function openBatchDialog() {
    const nextNum = (batchTargetClient?.projects.length ?? 0) + 1;
    setBatchName(`Week ${nextNum}`);
    setCardCount(DEFAULT_COUNT);
    setBatchDialogOpen(true);
  }

  async function createBatch() {
    if (!batchName.trim()) return;
    setCreatingBatch(true);
    try {
      const res  = await fetch("/api/projects", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body:   JSON.stringify({
          name:     batchName.trim(),
          cardCount,
          clientId: batchTargetClientId ?? null,
        }),
      });
      const data = await res.json() as BatchWithCards;
      const newBatch = { ...data, reviewSessions: data.reviewSessions ?? [] };

      if (batchTargetClientId) {
        setClients(prev => prev.map(c =>
          c.id === batchTargetClientId
            ? { ...c, projects: [newBatch, ...c.projects] }
            : c
        ));
        setSelectedClientId(batchTargetClientId);
      } else {
        setOrphans(prev => [newBatch, ...prev]);
      }

      setSelectedBatchId(newBatch.id);
      setBatchDialogOpen(false);
      setSidebarOpen(false);
      toast.success(`"${newBatch.name}" created with ${cardCount} cards`);
    } finally {
      setCreatingBatch(false);
    }
  }

  async function deleteBatchById(batchId: string, ownerClientId: string | undefined) {
    const name = ownerClientId
      ? clients.find(c => c.id === ownerClientId)?.projects.find(b => b.id === batchId)?.name
      : orphans.find(b => b.id === batchId)?.name;
    if (!confirm(`Delete batch "${name ?? batchId}"? This cannot be undone.`)) return;

    await fetch(`/api/projects/${batchId}`, { method: "DELETE" });

    if (ownerClientId) {
      setClients(prev => prev.map(c =>
        c.id === ownerClientId
          ? { ...c, projects: c.projects.filter(b => b.id !== batchId) }
          : c
      ));
      if (selectedBatchId === batchId) {
        const remaining = clients
          .find(c => c.id === ownerClientId)
          ?.projects.filter(b => b.id !== batchId) ?? [];
        setSelectedBatchId(remaining[0]?.id);
      }
    } else {
      const next = orphans.filter(b => b.id !== batchId);
      setOrphans(next);
      if (selectedBatchId === batchId) setSelectedBatchId(next[0]?.id);
    }
    toast.success("Batch deleted");
  }

  async function deleteBatch() {
    if (!batch) return;
    await deleteBatchById(batch.id, selectedClientId);
  }

  // ── Card/project update helpers ──────────────────────────────────────────────

  async function setPhase(phase: "transcript" | "final_video") {
    if (!batch) return;
    const res  = await fetch(`/api/projects/${batch.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ phase }),
    });
    const data = await res.json() as any;
    patchBatch(data);
  }

  function updateProject(updated: BatchWithCards) { patchBatch(updated); }

  function patchBatch(updated: BatchWithCards) {
    setClients(prev => prev.map(c => ({
      ...c,
      projects: c.projects.map(b => b.id === updated.id ? { ...b, ...updated } : b),
    })));
    setOrphans(prev => prev.map(b => b.id === updated.id ? { ...b, ...updated } : b));
  }

  function updateCard(updated: CardType) {
    setClients(prev => prev.map(c => ({
      ...c,
      projects: c.projects.map(b =>
        b.id === updated.projectId
          ? { ...b, cards: b.cards.map(card => card.id === updated.id ? updated : card) }
          : b
      ),
    })));
    setOrphans(prev => prev.map(b =>
      b.id === updated.projectId
        ? { ...b, cards: b.cards.map(card => card.id === updated.id ? updated : card) }
        : b
    ));
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  const totalBatches  = clients.reduce((s, c) => s + c.projects.length, 0) + orphans.length;
  const hasAnything   = clients.length > 0 || orphans.length > 0;

  return (
    <div className="h-screen flex overflow-hidden bg-background">

      {/* ── Mobile backdrop ─────────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-200 md:static md:translate-x-0 md:z-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <WeekSidebar
          clients={clients}
          orphans={orphans}
          selectedClientId={selectedClientId}
          selectedBatchId={selectedBatchId}
          expandedClientIds={expandedClientIds}
          onToggleClient={id => setExpandedClientIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
          })}
          onSelectBatch={(batchId, clientId) => {
            setSelectedBatchId(batchId);
            setSelectedClientId(clientId);
            setSidebarOpen(false);
          }}
          onNewClient={openClientDialog}
          onDeleteClient={deleteClient}
          onDeleteBatch={deleteBatchById}
          onLogout={logout}
        />
      </aside>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <div className="shrink-0 border-b bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-4 py-2.5">
            <Button
              variant="ghost" size="icon" className="md:hidden h-8 w-8"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>

            {/* Breadcrumb */}
            <div className="flex-1 flex items-center gap-1.5 text-sm min-w-0">
              <Layers className="h-4 w-4 text-muted-foreground shrink-0" />
              {selectedClient ? (
                <span className="font-semibold shrink-0">{selectedClient.name}</span>
              ) : (
                <span className="text-muted-foreground">Select a project</span>
              )}
              {batch && (
                <>
                  <span className="text-muted-foreground/40 shrink-0">/</span>
                  <span className="text-muted-foreground shrink-0">{batch.name}</span>
                  <Badge variant="outline" className="text-[10px] h-5 shrink-0">
                    {batch.cards.length} cards
                  </Badge>
                </>
              )}
            </div>

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-1.5">
              {batch && (
                <Button
                  size="sm" variant="outline" className="h-7 text-xs gap-1"
                  onClick={() => setMetricsOpen(true)}
                  title="View post performance"
                >
                  <BarChart2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Metrics</span>
                </Button>
              )}
              {clientBatches.length > 1 && (
                <ProjectNav
                  current={batchIndex}
                  total={clientBatches.length}
                  onPrev={goToPrev}
                  onNext={goToNext}
                />
              )}
              <Button
                size="sm" variant="outline" className="h-7 text-xs"
                onClick={openBatchDialog}
                disabled={clients.length === 0 && orphans.length === 0 && !selectedClientId}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                <span className="hidden sm:inline">New Batch</span>
              </Button>
              {batch && (
                <Button
                  size="sm" variant="ghost"
                  className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                  onClick={deleteBatch}
                  title="Delete batch"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {!batch ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
              <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center">
                <Layers className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">No batch selected</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {!hasAnything
                    ? "Create a project to get started."
                    : selectedClient
                    ? "Create a batch inside this project."
                    : "Select a batch from the sidebar."}
                </p>
                {!hasAnything ? (
                  <Button onClick={openClientDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Project
                  </Button>
                ) : selectedClient ? (
                  <Button onClick={openBatchDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Batch
                  </Button>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
              <div className="bg-card rounded-xl border p-4">
                <ProjectHeader
                  key={batch.id}
                  project={batch}
                  onUpdated={updateProject}
                  onPhase={setPhase}
                />
              </div>
              <div className={cn(
                "grid gap-4",
                batch.cards.length <= 3  ? "grid-cols-1 sm:grid-cols-3"
                : batch.cards.length <= 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              )}>
                {batch.cards.map(card => (
                  <CardEditor
                    key={`${batch.id}-${card.id}`}
                    card={card}
                    phase={batch.phase}
                    onUpdated={updateCard}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Metrics panel ─────────────────────────────────────────────── */}
      {batch && (
        <MetricsPanel
          projectId={batch.id}
          open={metricsOpen}
          onOpenChange={setMetricsOpen}
        />
      )}

      {/* ── Create Project dialog ────────────────────────────────────── */}
      <Dialog open={clientDialogOpen} onOpenChange={setClientDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 pt-2">
            <div className="space-y-1.5">
              <Label>Project Name</Label>
              <Input
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && createClient()}
                placeholder="e.g. wellpreppedlife"
                autoFocus
              />
            </div>
            <Button
              className="w-full" onClick={createClient}
              disabled={creatingClient || !clientName.trim()}
            >
              {creatingClient ? "Creating…" : "Create Project"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Create Batch dialog ──────────────────────────────────────── */}
      <Dialog open={batchDialogOpen} onOpenChange={setBatchDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              New Batch
              {selectedClient && (
                <span className="text-muted-foreground font-normal ml-1.5 text-sm">
                  in {selectedClient.name}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 pt-2">
            <div className="space-y-1.5">
              <Label>Batch Name</Label>
              <Input
                value={batchName}
                onChange={e => setBatchName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && createBatch()}
                placeholder="e.g. Week 1"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label>Number of Cards</Label>
              <div className="flex items-center gap-2">
                {COUNT_PRESETS.map(n => (
                  <button
                    key={n}
                    onClick={() => setCardCount(n)}
                    className={cn(
                      "flex-1 py-2 rounded-lg border text-sm font-medium transition-colors",
                      cardCount === n
                        ? "bg-primary text-primary-foreground border-primary"
                        : "hover:bg-muted border-border text-muted-foreground"
                    )}
                  >
                    {n}
                  </button>
                ))}
                <Input
                  type="number"
                  min={1} max={20}
                  value={cardCount}
                  onChange={e => {
                    const v = parseInt(e.target.value);
                    if (!isNaN(v) && v >= 1 && v <= 20) setCardCount(v);
                  }}
                  className="w-16 text-center"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {cardCount} card{cardCount !== 1 ? "s" : ""} · ~{cardCount * 30}s of content
              </p>
            </div>

            <Button
              className="w-full" onClick={createBatch}
              disabled={creatingBatch || !batchName.trim()}
            >
              {creatingBatch ? "Creating…" : "Create Batch"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
