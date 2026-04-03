"use client";

import { Badge }     from "@/components/ui/badge";
import { Instagram, Youtube } from "lucide-react";
import type { Project }       from "@/lib/db/schema";
import type { SocialAccount, ScheduledPost } from "@/lib/db/social-schema";

type ProjectWithAccounts = Project & { socialAccounts: SocialAccount[] };

interface Props {
  project:  ProjectWithAccounts;
  posts:    ScheduledPost[];
  selected: boolean;
  onSelect: () => void;
}

export function ProjectSocialRow({ project, posts, selected, onSelect }: Props) {
  const igAccount = project.socialAccounts.find((a) => a.platform === "instagram");
  const ytAccount = project.socialAccounts.find((a) => a.platform === "youtube");
  const pending   = posts.filter((p) => p.status === "scheduled" || p.status === "draft").length;

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left px-3 py-2.5 border-b transition-colors hover:bg-accent/50 ${
        selected ? "bg-accent" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium truncate">{project.name}</p>
          <p className="text-xs text-muted-foreground capitalize mt-0.5 truncate">
            {project.phase.replace(/_/g, " ")}
          </p>
        </div>
        {pending > 0 && (
          <Badge className="text-xs h-4 px-1.5 shrink-0">{pending}</Badge>
        )}
      </div>

      <div className="flex gap-1.5 mt-2">
        <span className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full ${
          igAccount
            ? "bg-pink-50 text-pink-600 dark:bg-pink-950 dark:text-pink-400"
            : "bg-muted text-muted-foreground"
        }`}>
          <Instagram className="h-2.5 w-2.5" />
          {igAccount ? `@${igAccount.accountName}` : "—"}
        </span>
        <span className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full ${
          ytAccount
            ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
            : "bg-muted text-muted-foreground"
        }`}>
          <Youtube className="h-2.5 w-2.5" />
          {ytAccount ? `@${ytAccount.accountName}` : "—"}
        </span>
      </div>
    </button>
  );
}
