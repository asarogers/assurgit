"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input }  from "@/components/ui/input";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, LogOut, Instagram } from "lucide-react";
import { toast }  from "sonner";
import { ProjectSocialRow } from "./ProjectSocialRow";
import type { Project }      from "@/lib/db/schema";
import type { SocialAccount, ScheduledPost } from "@/lib/db/social-schema";

type ProjectWithAccounts = Project & { socialAccounts: SocialAccount[] };

interface Props {
  initialProjects: ProjectWithAccounts[];
  initialPosts:    Record<string, ScheduledPost[]>; // keyed by projectId
}

export function SocialClient({ initialProjects, initialPosts }: Props) {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const router       = useRouter();

  // Handle OAuth redirect feedback
  useEffect(() => {
    const connected = searchParams.get("connected");
    const error     = searchParams.get("error");
    if (connected === "1") {
      toast.success("Instagram account connected successfully");
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

  const connectedCount = initialProjects.filter(
    (p) => p.socialAccounts.some((a) => a.platform === "instagram")
  ).length;

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky top bar */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold tracking-tight">Social Media Terminal</span>
            <Badge variant="outline" className="text-xs hidden sm:flex gap-1">
              <Instagram className="h-3 w-3" />
              {connectedCount} / {initialProjects.length} connected
            </Badge>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search businesses…"
                className="pl-8 h-8 text-xs"
              />
            </div>
          </div>

          <Button size="sm" variant="ghost" onClick={logout}>
            <LogOut className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-3">
        {/* Stats bar */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pb-2">
          <span>{filtered.length} business{filtered.length !== 1 ? "es" : ""}</span>
          {search && <span>filtered from {initialProjects.length}</span>}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-sm">
            {search ? `No businesses matching "${search}"` : "No projects yet."}
          </div>
        ) : (
          filtered.map((project) => (
            <ProjectSocialRow
              key={project.id}
              project={project}
              initialPosts={initialPosts[project.id] ?? []}
            />
          ))
        )}
      </div>
    </div>
  );
}
