"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge }   from "@/components/ui/badge";
import { Button }  from "@/components/ui/button";
import { Instagram, ChevronDown, ChevronUp, AlertTriangle, Loader2 } from "lucide-react";
import { toast }   from "sonner";
import { SchedulePostDialog }  from "./SchedulePostDialog";
import { ScheduledPostsList }  from "./ScheduledPostsList";
import type { Project }        from "@/lib/db/schema";
import type { SocialAccount, ScheduledPost } from "@/lib/db/social-schema";

type ProjectWithAccounts = Project & { socialAccounts: SocialAccount[] };

interface Props {
  project:       ProjectWithAccounts;
  initialPosts:  ScheduledPost[];
}

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export function ProjectSocialRow({ project, initialPosts }: Props) {
  const igAccount = project.socialAccounts.find((a) => a.platform === "instagram");

  const [posts,        setPosts]        = useState<ScheduledPost[]>(initialPosts);
  const [expanded,     setExpanded]     = useState(false);
  const [schedOpen,    setSchedOpen]    = useState(false);
  const [connecting,   setConnecting]   = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);

  const tokenExpiringSoon = igAccount && igAccount.tokenExpiresAt - Date.now() < SEVEN_DAYS;

  async function connectInstagram() {
    setConnecting(true);
    const res  = await fetch(`/api/social/instagram/connect?projectId=${project.id}`);
    const data = await res.json() as any;
    if (!res.ok) { toast.error(data.error ?? "Failed to start OAuth"); setConnecting(false); return; }
    window.location.href = data.url;
  }

  async function disconnectInstagram() {
    if (!igAccount) return;
    if (!confirm(`Disconnect @${igAccount.accountName}? Scheduled posts will be deleted.`)) return;
    setDisconnecting(true);
    await fetch("/api/social/instagram/disconnect", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ socialAccountId: igAccount.id }),
    });
    toast.success("Instagram disconnected");
    window.location.reload();
  }

  const totalPending = posts.filter((p) => p.status === "scheduled" || p.status === "draft").length;

  return (
    <Card className="transition-shadow hover:shadow-sm">
      <CardContent className="p-4">
        {/* Row header */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Business name */}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{project.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{project.phase.replace("_", " ")}</p>
          </div>

          {/* Instagram status */}
          <div className="flex items-center gap-2">
            {igAccount ? (
              <div className="flex items-center gap-1.5">
                {tokenExpiringSoon && (
                  <AlertTriangle className="h-3.5 w-3.5 text-yellow-500" />
                )}
                <div className="flex items-center gap-1 bg-muted rounded-full px-2.5 py-1">
                  <Instagram className="h-3 w-3" />
                  <span className="text-xs font-medium">@{igAccount.accountName}</span>
                  <Badge variant="outline" className="text-xs h-4 px-1.5 ml-0.5 text-green-600 border-green-600/30">
                    Connected
                  </Badge>
                </div>
                <Button
                  size="sm" variant="ghost"
                  className="h-7 text-xs text-muted-foreground hover:text-destructive"
                  onClick={disconnectInstagram}
                  disabled={disconnecting}
                >
                  {disconnecting ? <Loader2 className="h-3 w-3 animate-spin" /> : "Disconnect"}
                </Button>
              </div>
            ) : (
              <Button
                size="sm" variant="outline"
                className="h-7 text-xs gap-1.5"
                onClick={connectInstagram}
                disabled={connecting}
              >
                {connecting
                  ? <Loader2 className="h-3 w-3 animate-spin" />
                  : <Instagram className="h-3 w-3" />
                }
                {connecting ? "Redirecting…" : "Connect Instagram"}
              </Button>
            )}
          </div>

          {/* Actions */}
          {igAccount && (
            <Button
              size="sm"
              className="h-7 text-xs"
              onClick={() => setSchedOpen(true)}
            >
              + Schedule Post
            </Button>
          )}

          {/* Expand toggle */}
          <Button
            size="icon" variant="ghost"
            className="h-7 w-7 shrink-0"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded
              ? <ChevronUp className="h-3.5 w-3.5" />
              : <ChevronDown className="h-3.5 w-3.5" />
            }
          </Button>
        </div>

        {/* Pending badge summary */}
        {!expanded && totalPending > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            {totalPending} post{totalPending !== 1 ? "s" : ""} pending
          </p>
        )}

        {/* Expanded posts */}
        {expanded && (
          <ScheduledPostsList
            posts={posts}
            onDeleted={(id) => setPosts((prev) => prev.filter((p) => p.id !== id))}
          />
        )}
      </CardContent>

      {igAccount && (
        <SchedulePostDialog
          open={schedOpen}
          onOpenChange={setSchedOpen}
          projectId={project.id}
          account={igAccount}
          onCreated={(post) => setPosts((prev) => [post, ...prev])}
        />
      )}
    </Card>
  );
}
