"use client";

import { cn }        from "@/lib/utils";
import { Badge }     from "@/components/ui/badge";
import { Instagram, Youtube, Trash2 } from "lucide-react";
import type { Project }       from "@/lib/db/pg-schema";
import type { ScheduledPost } from "@/lib/db/pg-schema";
import type { SocialAccount } from "@/lib/db/social-schema";

type ProjectWithAccounts = Project & { socialAccounts: SocialAccount[] };

interface Props {
  project:    ProjectWithAccounts;
  posts:      ScheduledPost[];
  isSelected: boolean;
  indent?:    boolean;
  onClick:    () => void;
  onDelete?:  () => void;
}

export function ProjectSocialRow({ project, posts, isSelected, indent, onClick, onDelete }: Props) {
  const igAccount = project.socialAccounts.find(a => a.platform === "instagram");
  const ytAccount = project.socialAccounts.find(a => a.platform === "youtube");
  const tkAccount = project.socialAccounts.find(a => a.platform === "tiktok");
  const pending   = posts.filter(p => p.status === "scheduled" || p.status === "draft").length;

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
            {project.name}
          </span>
          {pending > 0 && (
            <Badge className="text-[10px] h-4 px-1.5 leading-none shrink-0">{pending}</Badge>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={cn(
            "inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded-full",
            igAccount
              ? "bg-pink-50 text-pink-600 dark:bg-pink-950 dark:text-pink-400"
              : "bg-muted text-muted-foreground"
          )}>
            <Instagram className="h-2.5 w-2.5" />
            {igAccount ? `@${igAccount.accountName}` : "—"}
          </span>

          <span className={cn(
            "inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded-full",
            ytAccount
              ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
              : "bg-muted text-muted-foreground"
          )}>
            <Youtube className="h-2.5 w-2.5" />
            {ytAccount ? `@${ytAccount.accountName}` : "—"}
          </span>

          {tkAccount && (
            <span className="inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded-full bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
              TT @{tkAccount.accountName}
            </span>
          )}
        </div>
      </button>

      {onDelete && (
        <button
          onClick={e => { e.stopPropagation(); onDelete(); }}
          className="absolute top-2 right-1.5 h-5 w-5 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
          title="Delete project"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
