"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button }   from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast }    from "sonner";
import type { SocialAccount } from "@/lib/db/social-schema";

interface Props {
  open:          boolean;
  onOpenChange:  (v: boolean) => void;
  projectId:     string;
  account:       SocialAccount;
  onCreated:     (post: any) => void;
}

export function SchedulePostDialog({ open, onOpenChange, projectId, account, onCreated }: Props) {
  const [caption,      setCaption]      = useState("");
  const [mediaUrl,     setMediaUrl]     = useState("");
  const [mediaType,    setMediaType]    = useState<"IMAGE" | "VIDEO" | "REEL">("IMAGE");
  const [scheduledFor, setScheduledFor] = useState("");
  const [saving,       setSaving]       = useState(false);

  async function submit(asDraft: boolean) {
    if (!caption.trim()) { toast.error("Caption is required"); return; }
    setSaving(true);
    const res  = await fetch("/api/social/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId,
        socialAccountId: account.id,
        caption,
        mediaUrl:    mediaUrl || undefined,
        mediaType,
        scheduledFor: (!asDraft && scheduledFor) ? new Date(scheduledFor).getTime() : undefined,
      }),
    });
    const data = await res.json() as any;
    if (!res.ok) { toast.error(data.error ?? "Failed to save post"); setSaving(false); return; }
    toast.success(asDraft ? "Saved as draft" : "Post scheduled");
    onCreated(data);
    onOpenChange(false);
    setCaption(""); setMediaUrl(""); setScheduledFor("");
    setSaving(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Schedule Instagram Post</DialogTitle>
          <p className="text-xs text-muted-foreground">@{account.accountName}</p>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label className="text-xs">Caption</Label>
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write your caption…"
              className="min-h-28 resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">{caption.length} chars</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Media Type</Label>
              <Select value={mediaType} onValueChange={(v) => setMediaType(v as any)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IMAGE">Image</SelectItem>
                  <SelectItem value="VIDEO">Video</SelectItem>
                  <SelectItem value="REEL">Reel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Schedule Date & Time</Label>
              <Input
                type="datetime-local"
                className="h-8 text-xs"
                value={scheduledFor}
                onChange={(e) => setScheduledFor(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Media URL <span className="text-muted-foreground">(optional)</span></Label>
            <Input
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="https://…"
              className="h-8 text-xs"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <Button variant="outline" className="flex-1" onClick={() => submit(true)} disabled={saving}>
              Save Draft
            </Button>
            <Button className="flex-1" onClick={() => submit(false)} disabled={saving || !scheduledFor}>
              {saving ? "Saving…" : "Schedule"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
