"use client";

import { useState, useEffect }   from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button }                from "@/components/ui/button";
import { toast }                 from "sonner";
import { cn }                    from "@/lib/utils";
import { Share2, ChevronRight, ChevronDown, FolderOpen, LogOut, Menu } from "lucide-react";
import { ProjectSocialRow }      from "./ProjectSocialRow";
import { ProjectDetailPanel }    from "./ProjectDetailPanel";
import type { Project, Client }  from "@/lib/db/schema";
import type { ScheduledPost } from "@/lib/db/pg-schema";
import type { SocialAccount } from "@/lib/db/social-schema";

type ProjectWithAccounts  = Project & { socialAccounts: SocialAccount[] };
type ClientWithProjects   = Client & { projects: ProjectWithAccounts[] };

interface Props {
  initialClients: ClientWithProjects[];
  initialOrphans: ProjectWithAccounts[];
  initialPosts:   Record<string, ScheduledPost[]>;
  adminEmail:     string;
}

export function SocialClient({ initialClients, initialOrphans, initialPosts, adminEmail }: Props) {
  const [clients,           setClients]          = useState(initialClients);
  const [orphans]                                 = useState(initialOrphans);
  const [expandedClientIds, setExpandedClientIds] = useState<Set<string>>(
    () => new Set(initialClients.map(c => c.id))
  );
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    initialClients[0]?.projects[0]?.id ?? initialOrphans[0]?.id ?? null
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const searchParams = useSearchParams();
  const router       = useRouter();

  useEffect(() => {
    const connected = searchParams.get("connected");
    const error     = searchParams.get("error");
    if (connected === "1") {
      toast.success("Account connected successfully");
      router.replace("/social");
    } else if (error) {
      toast.error(
        error === "oauth_denied"  ? "OAuth was cancelled" :
        error === "invalid_state" ? "Invalid OAuth state — please try again" :
        decodeURIComponent(error)
      );
      router.replace("/social");
    }
  }, [searchParams, router]);

  // Flatten all projects for lookup
  const allProjects: ProjectWithAccounts[] = [
    ...clients.flatMap(c => c.projects),
    ...orphans,
  ];

  const selectedProject = allProjects.find(p => p.id === selectedProjectId) ?? null;

  const totalConnected = allProjects.reduce(
    (sum, p) => sum + p.socialAccounts.length,
    0
  );

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  function toggleClient(id: string) {
    setExpandedClientIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const totalProjects = allProjects.length;

  // ── Sidebar content ────────────────────────────────────────────────────────

  function Sidebar() {
    return (
      <div className="flex flex-col h-full bg-card border-r">

        {/* Header */}
        <div className="px-4 py-4 border-b">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center">
              <Share2 className="h-4 w-4 text-primary" />
            </div>
            <span className="font-bold text-sm tracking-tight">Social</span>
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{totalProjects}</span> projects ·{" "}
            <span className="font-medium text-emerald-600 dark:text-emerald-400">{totalConnected}</span> accounts connected
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {totalProjects === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8">
              No projects yet.
            </p>
          ) : (
            <>
              {/* Client groups */}
              {clients.map(client => {
                const isExpanded = expandedClientIds.has(client.id);
                return (
                  <div key={client.id}>
                    <div className={cn(
                      "flex items-center gap-1 px-2 py-1.5 rounded-lg group",
                      "hover:bg-muted/40"
                    )}>
                      <button
                        className="flex items-center gap-1.5 flex-1 min-w-0 text-left"
                        onClick={() => toggleClient(client.id)}
                      >
                        {isExpanded
                          ? <ChevronDown  className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
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
                    </div>

                    {isExpanded && (
                      <div className="ml-4 mt-0.5 space-y-0.5 border-l border-border/50 pl-2">
                        {client.projects.length === 0 ? (
                          <p className="text-[11px] text-muted-foreground px-2 py-1.5 italic">
                            No projects
                          </p>
                        ) : (
                          client.projects.map(project => (
                            <ProjectSocialRow
                              key={project.id}
                              project={project}
                              posts={initialPosts[project.id] ?? []}
                              isSelected={project.id === selectedProjectId}
                              indent
                              onClick={() => { setSelectedProjectId(project.id); setSidebarOpen(false); }}
                            />
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Orphan projects (no client) */}
              {orphans.length > 0 && (
                <>
                  {clients.length > 0 && (
                    <div className="px-3 pt-2 pb-0.5">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">
                        Unassigned
                      </span>
                    </div>
                  )}
                  {orphans.map(project => (
                    <ProjectSocialRow
                      key={project.id}
                      project={project}
                      posts={initialPosts[project.id] ?? []}
                      isSelected={project.id === selectedProjectId}
                      onClick={() => { setSelectedProjectId(project.id); setSidebarOpen(false); }}
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
            onClick={logout}
          >
            <LogOut className="h-3.5 w-3.5 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-background">

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-200 md:static md:translate-x-0 md:z-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar />
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b shrink-0">
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium truncate">
            {selectedProject?.name ?? "Social"}
          </span>
        </div>

        {selectedProject ? (
          <ProjectDetailPanel
            key={selectedProject.id}
            project={selectedProject}
            initialPosts={initialPosts[selectedProject.id] ?? []}
            adminEmail={adminEmail}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
            Select a project
          </div>
        )}
      </div>
    </div>
  );
}
