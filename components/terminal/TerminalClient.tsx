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
import { toast }         from "sonner";
import { Menu, Trash2, Layers, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project, Card as CardType, ReviewSession } from "@/lib/db/schema";

type ProjectWithCards = Project & { cards: CardType[]; reviewSessions: ReviewSession[] };

const COUNT_PRESETS = [3, 5, 7, 10];
const DEFAULT_COUNT = 5;

interface Props {
  initialProjects: ProjectWithCards[];
}

export function TerminalClient({ initialProjects }: Props) {
  const [projects,    setProjects]    = useState<ProjectWithCards[]>(initialProjects);
  const [selectedId,  setSelectedId]  = useState<string | undefined>(initialProjects[0]?.id);
  const [createOpen,  setCreateOpen]  = useState(false);
  const [creating,    setCreating]    = useState(false);
  const [newName,     setNewName]     = useState("");
  const [cardCount,   setCardCount]   = useState(DEFAULT_COUNT);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer

  const project = projects.find(p => p.id === selectedId);

  // Auto-suggest next week name when opening dialog
  function openCreateDialog() {
    const nextWeek = projects.length + 1;
    setNewName(`Week ${nextWeek}`);
    setCardCount(DEFAULT_COUNT);
    setCreateOpen(true);
  }

  async function createProject() {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const res  = await fetch("/api/projects", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body:   JSON.stringify({ name: newName.trim(), cardCount }),
      });
      const data = await res.json() as ProjectWithCards;
      setProjects(prev => [{ ...data, reviewSessions: [] }, ...prev]);
      setSelectedId(data.id);
      setCreateOpen(false);
      setSidebarOpen(false);
      toast.success(`"${data.name}" created with ${cardCount} cards`);
    } finally {
      setCreating(false);
    }
  }

  async function deleteProject() {
    if (!project) return;
    if (!confirm(`Delete "${project.name}"? This cannot be undone.`)) return;
    await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
    const next = projects.filter(p => p.id !== project.id);
    setProjects(next);
    setSelectedId(next[0]?.id);
    toast.success("Batch deleted");
  }

  async function setPhase(phase: "transcript" | "final_video") {
    if (!project) return;
    const res  = await fetch(`/api/projects/${project.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ phase }),
    });
    const data = await res.json() as any;
    setProjects(prev => prev.map(p => p.id === data.id ? { ...p, ...data } : p));
  }

  function updateProject(updated: ProjectWithCards) {
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  }

  function updateCard(updated: CardType) {
    setProjects(prev =>
      prev.map(p =>
        p.id === updated.projectId
          ? { ...p, cards: p.cards.map(c => c.id === updated.id ? updated : c) }
          : p
      )
    );
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div className="h-screen flex overflow-hidden bg-background">

      {/* ── Sidebar (desktop always visible, mobile overlay) ────────── */}
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-30 w-60 transition-transform duration-200 md:static md:translate-x-0 md:z-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <WeekSidebar
          projects={projects}
          selectedId={selectedId}
          onSelect={id => { setSelectedId(id); setSidebarOpen(false); }}
          onNew={openCreateDialog}
          onLogout={logout}
        />
      </aside>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <div className="shrink-0 border-b bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-4 py-2.5">
            {/* Mobile sidebar toggle */}
            <Button
              variant="ghost" size="icon" className="md:hidden h-8 w-8"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-sm min-w-0">
              <Layers className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground hidden sm:inline">Batches</span>
              {project && (
                <>
                  <span className="text-muted-foreground/40 hidden sm:inline">/</span>
                  <span className="font-semibold truncate">{project.name}</span>
                  <Badge variant="outline" className="text-[10px] h-5 shrink-0">
                    {project.cards.length} cards
                  </Badge>
                </>
              )}
            </div>

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-1.5">
              <Button
                size="sm" variant="outline" className="h-7 text-xs"
                onClick={openCreateDialog}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                <span className="hidden sm:inline">New Batch</span>
              </Button>
              {project && (
                <Button
                  size="sm" variant="ghost"
                  className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                  onClick={deleteProject}
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
          {!project ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
              <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center">
                <Layers className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">No batch selected</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {projects.length === 0
                    ? "Create your first weekly batch to get started."
                    : "Select a batch from the sidebar."}
                </p>
                <Button onClick={openCreateDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Batch
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

              {/* Batch header + pipeline */}
              <div className="bg-card rounded-xl border p-4">
                <ProjectHeader
                  key={project.id}
                  project={project}
                  onUpdated={updateProject}
                  onPhase={setPhase}
                />
              </div>

              {/* Cards grid */}
              <div className={cn(
                "grid gap-4",
                project.cards.length <= 3  ? "grid-cols-1 sm:grid-cols-3"
                : project.cards.length <= 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              )}>
                {project.cards.map(card => (
                  <CardEditor
                    key={`${project.id}-${card.id}`}
                    card={card}
                    phase={project.phase}
                    onUpdated={updateCard}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Create batch dialog ──────────────────────────────────────── */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>New Batch</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 pt-2">
            {/* Name */}
            <div className="space-y-1.5">
              <Label>Batch Name</Label>
              <Input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && createProject()}
                placeholder="e.g. Week 1"
                autoFocus
              />
            </div>

            {/* Card count */}
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
              className="w-full" onClick={createProject}
              disabled={creating || !newName.trim()}
            >
              {creating ? "Creating…" : `Create Batch`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
