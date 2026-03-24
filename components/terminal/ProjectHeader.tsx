"use client";

import { useState } from "react";
import { Input }    from "@/components/ui/input";
import { Button }   from "@/components/ui/button";
import { Badge }    from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label }    from "@/components/ui/label";
import { toast }    from "sonner";
import { Copy, Send, RefreshCw } from "lucide-react";
import type { Project } from "@/lib/db/schema";

interface Props {
  project:   Project;
  onUpdated: (p: Project) => void;
}

export function ProjectHeader({ project, onUpdated }: Props) {
  const [name,       setName]       = useState(project.name);
  const [email,      setEmail]      = useState("");
  const [reviewUrl,  setReviewUrl]  = useState<string | null>(null);
  const [sendOpen,   setSendOpen]   = useState(false);
  const [sending,    setSending]    = useState(false);
  const [regen,      setRegen]      = useState(false);

  async function saveName() {
    if (name === project.name) return;
    const res  = await fetch(`/api/projects/${project.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ name }),
    });
    const data = await res.json() as any;
    onUpdated(data);
    toast.success("Project renamed");
  }

  async function generateToken() {
    setRegen(true);
    const res  = await fetch(`/api/projects/${project.id}/token`, { method: "POST" });
    const data = await res.json() as any;
    setReviewUrl(data.reviewUrl);
    onUpdated({ ...project, token: data.token });
    toast.success("New review link generated");
    setRegen(false);
  }

  async function sendLink() {
    if (!email) return;
    setSending(true);
    try {
      const res = await fetch(`/api/projects/${project.id}/send`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body:   JSON.stringify({ email }),
      });
      const data = await res.json() as any;
      if (res.ok) {
        setReviewUrl(data.reviewUrl);
        toast.success("Review link sent to " + email);
        setSendOpen(false);
      } else {
        toast.error(data.error ?? "Failed to send");
      }
    } catch (err) {
      toast.error("Network error — could not reach server");
      console.error(err);
    }
    setSending(false);
  }

  const appUrl    = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const currentUrl = `${appUrl}/review?token=${project.token}`;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 flex-1">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={saveName}
          onKeyDown={(e) => e.key === "Enter" && saveName()}
          className="text-base font-semibold max-w-xs"
        />
        <Badge variant="outline" className="capitalize hidden sm:flex">
          {project.phase === "final_video" ? "Final Video" : "Transcript"}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={generateToken}
          disabled={regen}
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          New Link
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            navigator.clipboard.writeText(reviewUrl ?? currentUrl);
            toast.success("Copied to clipboard");
          }}
        >
          <Copy className="h-3.5 w-3.5 mr-1.5" />
          Copy Link
        </Button>

        <Button size="sm" onClick={() => setSendOpen(true)}>
          <Send className="h-3.5 w-3.5 mr-1.5" />
          Send
        </Button>

        <Dialog open={sendOpen} onOpenChange={setSendOpen}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Send Review Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="email">Recipient Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="client@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendLink()}
                />
              </div>
              <Button className="w-full" onClick={sendLink} disabled={sending || !email}>
                {sending ? "Sending…" : "Send Link"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

