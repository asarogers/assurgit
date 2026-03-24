"use client";

import { useState } from "react";
import { Button }   from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge }    from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label }    from "@/components/ui/label";
import { Input }    from "@/components/ui/input";
import { ProjectNav }    from "./ProjectNav";
import { ProjectHeader } from "./ProjectHeader";
import { CardEditor }    from "./CardEditor";
import { toast }         from "sonner";
import { Plus, Trash2, LogOut } from "lucide-react";
import type { Project, Card as CardType } from "@/lib/db/schema";

type ProjectWithCards = Project & { cards: CardType[] };

interface Props {
  initialProjects: ProjectWithCards[];
}

export function TerminalClient({ initialProjects }: Props) {
  const [projects,   setProjects]   = useState<ProjectWithCards[]>(initialProjects);
  const [index,      setIndex]      = useState(0);
  const [creating,   setCreating]   = useState(false);
  const [newName,    setNewName]    = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const project = projects[index] as ProjectWithCards | undefined;

  async function createProject() {
    if (!newName.trim()) return;
    setCreating(true);
    const res  = await fetch("/api/projects", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ name: newName.trim() }),
    });
    const data = await res.json() as any;
    setProjects((prev) => [data, ...prev]);
    setIndex(0);
    setNewName("");
    setCreateOpen(false);
    toast.success("Project created");
    setCreating(false);
  }

  async function deleteProject() {
    if (!project) return;
    if (!confirm(`Delete "${project.name}"? This cannot be undone.`)) return;
    await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
    const next = projects.filter((p) => p.id !== project.id);
    setProjects(next);
    setIndex(Math.max(0, index - 1));
    toast.success("Project deleted");
  }

  async function setPhase(phase: "transcript" | "final_video") {
    if (!project) return;
    const res  = await fetch(`/api/projects/${project.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ phase }),
    });
    const data = await res.json() as any;
    setProjects((prev) => prev.map((p) => (p.id === data.id ? { ...p, ...data } : p)));
    toast.success(`Phase set to ${phase === "final_video" ? "Final Video" : "Transcript"}`);
  }

  function updateCard(updated: CardType) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === updated.projectId
          ? { ...p, cards: p.cards.map((c) => (c.id === updated.id ? updated : c)) }
          : p
      )
    );
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold tracking-tight">
              Content Control Terminal
            </span>
            <Badge variant="outline" className="text-xs hidden sm:flex">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => setCreateOpen(true)}>
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              New
            </Button>

            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <Label>Project Name</Label>
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && createProject()}
                      placeholder="e.g. March Campaign"
                    />
                  </div>
                  <Button className="w-full" onClick={createProject} disabled={creating || !newName.trim()}>
                    {creating ? "Creating…" : "Create Project"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="ghost" onClick={logout}>
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {projects.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center text-muted-foreground">
              No projects yet. Create one to get started.
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Project navigation + header */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <ProjectNav
                  current={index}
                  total={projects.length}
                  onPrev={() => setIndex((i) => Math.max(0, i - 1))}
                  onNext={() => setIndex((i) => Math.min(projects.length - 1, i + 1))}
                />
                <div className="flex items-center gap-2">
                  <Select
                    value={project?.phase}
                    onValueChange={(v) => setPhase(v as "transcript" | "final_video")}
                  >
                    <SelectTrigger className="h-8 text-xs w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transcript">Transcript</SelectItem>
                      <SelectItem value="final_video">Final Video</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm" variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={deleteProject}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {project && (
                <ProjectHeader
                  key={project.id}
                  project={project}
                  onUpdated={(p) =>
                    setProjects((prev) =>
                      prev.map((x) => (x.id === p.id ? { ...x, ...p } : x))
                    )
                  }
                />
              )}
            </div>

            {/* Cards grid */}
            {project && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.cards.map((card) => (
                  <CardEditor
                    key={`${project.id}-${card.id}`}
                    card={card}
                    phase={project.phase}
                    onUpdated={updateCard}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
