"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input }  from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast }  from "sonner";
import { ProjectSocialRow } from "./ProjectSocialRow";
import type { Project }      from "@/lib/db/schema";
import type { SocialAccount, ScheduledPost } from "@/lib/db/social-schema";

type ProjectWithAccounts = Project & { socialAccounts: SocialAccount[] };

interface Props {
  initialProjects: ProjectWithAccounts[];
  initialPosts:    Record<string, ScheduledPost[]>;
  adminEmail:      string;
}

export function SocialClient({ initialProjects, initialPosts, adminEmail }: Props) {
  const [search, setSearch] = useState("");
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

  const totalConnected = initialProjects.reduce(
    (sum, p) => sum + p.socialAccounts.length, 0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold">Social Accounts</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {initialProjects.length} projects · {totalConnected} connected account{totalConnected !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects…"
            className="pl-8 h-8 text-xs"
          />
        </div>
      </div>

      {/* Project list */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground text-sm">
          {search ? `No projects matching "${search}"` : "No projects yet."}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((project) => (
            <ProjectSocialRow
              key={project.id}
              project={project}
              initialPosts={initialPosts[project.id] ?? []}
              adminEmail={adminEmail}
            />
          ))}
        </div>
      )}
    </div>
  );
}
