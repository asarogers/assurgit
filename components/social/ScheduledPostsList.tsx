"use client";

import { useState } from "react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2 } from "lucide-react";
import { toast }  from "sonner";
import type { ScheduledPost } from "@/lib/db/social-schema";

const STATUS_COLORS: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  draft:     "secondary",
  scheduled: "default",
  published: "outline",
  failed:    "destructive",
};

interface Props {
  posts:     ScheduledPost[];
  onDeleted: (id: string) => void;
}

export function ScheduledPostsList({ posts, onDeleted }: Props) {
  const [deleting, setDeleting] = useState<string | null>(null);

  async function deletePost(id: string) {
    setDeleting(id);
    await fetch(`/api/social/posts/${id}`, { method: "DELETE" });
    toast.success("Post removed");
    onDeleted(id);
    setDeleting(null);
  }

  function PostRow({ post }: { post: ScheduledPost }) {
    return (
      <div className="flex items-start justify-between gap-3 py-2.5 border-b last:border-0">
        <div className="flex-1 min-w-0">
          <p className="text-xs truncate text-foreground">{post.caption || <span className="text-muted-foreground italic">No caption</span>}</p>
          {post.scheduledFor && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {new Date(post.scheduledFor).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
          )}
          {post.errorMessage && <p className="text-xs text-destructive mt-0.5">{post.errorMessage}</p>}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Badge variant={STATUS_COLORS[post.status]} className="text-xs capitalize">{post.status}</Badge>
          {post.status !== "published" && (
            <Button
              size="icon" variant="ghost"
              className="h-6 w-6 text-muted-foreground hover:text-destructive"
              disabled={deleting === post.id}
              onClick={() => deletePost(post.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  const byStatus = (s: string) => posts.filter((p) => p.status === s);

  return (
    <Tabs defaultValue="scheduled" className="mt-3">
      <TabsList className="h-7 text-xs">
        <TabsTrigger value="scheduled" className="text-xs px-2.5 h-6">Scheduled ({byStatus("scheduled").length})</TabsTrigger>
        <TabsTrigger value="draft"     className="text-xs px-2.5 h-6">Drafts ({byStatus("draft").length})</TabsTrigger>
        <TabsTrigger value="published" className="text-xs px-2.5 h-6">Published ({byStatus("published").length})</TabsTrigger>
        <TabsTrigger value="failed"    className="text-xs px-2.5 h-6">Failed ({byStatus("failed").length})</TabsTrigger>
      </TabsList>
      {["scheduled", "draft", "published", "failed"].map((s) => (
        <TabsContent key={s} value={s} className="mt-2">
          {byStatus(s).length === 0
            ? <p className="text-xs text-muted-foreground py-3 text-center">No {s} posts</p>
            : byStatus(s).map((p) => <PostRow key={p.id} post={p} />)
          }
        </TabsContent>
      ))}
    </Tabs>
  );
}
