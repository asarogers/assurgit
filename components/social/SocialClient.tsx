"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input }  from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast }  from "sonner";
import { ProjectSocialRow }   from "./ProjectSocialRow";
import { ProjectDetailPanel } from "./ProjectDetailPanel";
import type { Project }       from "@/lib/db/schema";
import type { SocialAccount, ScheduledPost } from "@/lib/db/social-schema";

type ProjectWithAccounts = Project & { socialAccounts: SocialAccount[] };

interface Props {
  initialProjects: ProjectWithAccounts[];
  initialPosts:    Record<string, ScheduledPost[]>;
  adminEmail:      string;
}

export function SocialClient({ initialProjects, initialPosts, adminEmail }: Props) {
  const [search,     setSearch]     = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(
    initialProjects[0]?.id ?? null
  );
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

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return initialProjects;
    return initialProjects.filter((p) => p.name.toLowerCase().includes(q));
  }, [search, initialProjects]);

  const selectedProject = initialProjects.find((p) => p.id === selectedId) ?? null;

  const totalConnected = initialProjects.reduce(
    (sum, p) => sum + p.socialAccounts.filter(
      (a) => a.platform === "instagram" || a.platform === "youtube"
    ).length,
    0
  );

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* ── Left: project list ──────────────────────────────────── */}
      <div className="w-64 shrink-0 border-r flex flex-col">
        <div className="p-3 border-b space-y-2.5">
          <div>
            <h1 className="text-sm font-semibold">Social</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {initialProjects.length} projects · {totalConnected} connected
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="pl-8 h-8 text-xs"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-center py-10 text-xs text-muted-foreground">
              {search ? `No results for "${search}"` : "No projects yet."}
            </p>
          ) : (
            filtered.map((project) => (
              <ProjectSocialRow
                key={project.id}
                project={project}
                posts={initialPosts[project.id] ?? []}
                selected={project.id === selectedId}
                onSelect={() => setSelectedId(project.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* ── Right: detail + composer + posts ────────────────────── */}
      <div className="flex-1 min-w-0 overflow-hidden">
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
