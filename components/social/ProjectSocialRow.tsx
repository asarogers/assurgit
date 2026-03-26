"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge }   from "@/components/ui/badge";
import { Button }  from "@/components/ui/button";
import { Input }   from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Instagram, Youtube, ChevronDown, ChevronUp, AlertTriangle, Loader2, Plus, Mail, Send } from "lucide-react";
import { toast }   from "sonner";
import { SchedulePostDialog }  from "./SchedulePostDialog";
import { ScheduledPostsList }  from "./ScheduledPostsList";
import type { Project }        from "@/lib/db/schema";
import type { SocialAccount, ScheduledPost } from "@/lib/db/social-schema";

type ProjectWithAccounts = Project & { socialAccounts: SocialAccount[] };

interface Props {
  project:      ProjectWithAccounts;
  initialPosts: ScheduledPost[];
  adminEmail:   string;
}

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

function RedditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" fill="#FF4500"/>
      <path d="M16.67 10a1.46 1.46 0 0 0-2.47-1 7.12 7.12 0 0 0-3.85-1.23l.65-3.07 2.13.45a1 1 0 1 0 .07-.52l-2.38-.5a.26.26 0 0 0-.31.2l-.73 3.44a7.14 7.14 0 0 0-3.89 1.23 1.46 1.46 0 1 0-1.61 2.39 2.87 2.87 0 0 0 0 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.87 2.87 0 0 0 0-.44 1.46 1.46 0 0 0 .64-1.39zm-9.4 1.06a1 1 0 1 1 1 1 1 1 0 0 1-1-1zm5.57 2.64a3.54 3.54 0 0 1-3.84 0 .26.26 0 0 1 .29-.43 3 3 0 0 0 3.26 0 .26.26 0 0 1 .29.43zm-.17-1.64a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" fill="white"/>
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  instagram: <Instagram className="h-3.5 w-3.5" />,
  youtube:   <Youtube className="h-3.5 w-3.5 text-red-500" />,
  reddit:    <RedditIcon className="h-3.5 w-3.5" />,
  tiktok:    <TikTokIcon className="h-3.5 w-3.5" />,
};

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  youtube:   "YouTube",
  reddit:    "Reddit",
  tiktok:    "TikTok",
  facebook:  "Facebook",
};

export function ProjectSocialRow({ project, initialPosts, adminEmail }: Props) {
  const igAccount      = project.socialAccounts.find((a) => a.platform === "instagram");
  const ytAccount      = project.socialAccounts.find((a) => a.platform === "youtube");
  const redditAccount  = project.socialAccounts.find((a) => a.platform === "reddit");
  const tiktokAccount  = project.socialAccounts.find((a) => a.platform === "tiktok");

  const connectedAccounts = project.socialAccounts.filter((a) =>
    ["instagram", "youtube", "reddit", "tiktok"].includes(a.platform)
  );

  const [posts,            setPosts]            = useState<ScheduledPost[]>(initialPosts);
  const [expanded,         setExpanded]         = useState(false);
  const [schedOpen,        setSchedOpen]        = useState(false);
  const [schedAccount,     setSchedAccount]     = useState<SocialAccount | null>(null);
  const [connectingIg,      setConnectingIg]      = useState(false);
  const [connectingYt,      setConnectingYt]      = useState(false);
  const [connectingReddit,  setConnectingReddit]  = useState(false);
  const [connectingTiktok,  setConnectingTiktok]  = useState(false);
  const [emailDialogOpen,   setEmailDialogOpen]   = useState(false);
  const [emailInput,        setEmailInput]        = useState("");
  const [sendingEmail,      setSendingEmail]      = useState(false);
  const [disconnecting,    setDisconnecting]    = useState<string | null>(null);

  const tokenExpiringSoon = igAccount && igAccount.tokenExpiresAt - Date.now() < SEVEN_DAYS;

  // Build suggestion list: client email first (if set), then admin email — deduplicated
  const emailSuggestions = [project.clientEmail, adminEmail]
    .filter((e): e is string => !!e?.trim())
    .filter((e, i, arr) => arr.indexOf(e) === i);

  async function sendConnectEmail(email: string) {
    setSendingEmail(true);
    const res  = await fetch(`/api/projects/${project.id}/send-connect`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email }),
    });
    const data = await res.json() as any;
    if (!res.ok) {
      toast.error(data.error ?? "Failed to send email");
    } else {
      toast.success(`Authorization email sent to ${email}`);
      setEmailDialogOpen(false);
      setEmailInput("");
    }
    setSendingEmail(false);
  }
  const totalPending = posts.filter((p) => p.status === "scheduled" || p.status === "draft").length;

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/social/posts?projectId=${project.id}`);
      if (res.ok) setPosts(await res.json());
    }, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, [project.id]);

  async function connectPlatform(platform: "instagram" | "youtube" | "reddit" | "tiktok") {
    const setConnecting = platform === "instagram" ? setConnectingIg
      : platform === "youtube"    ? setConnectingYt
      : platform === "tiktok"     ? setConnectingTiktok
      : setConnectingReddit;

    setConnecting(true);
    const url = platform === "reddit"
      ? `/api/social/zernio/connect?platform=reddit&projectId=${project.id}`
      : `/api/social/${platform}/connect?projectId=${project.id}`;

    const res  = await fetch(url);
    const data = await res.json() as any;
    if (!res.ok) { toast.error(data.error ?? "Failed to start OAuth"); setConnecting(false); return; }
    window.location.href = data.url;
  }

  async function disconnectAccount(account: SocialAccount) {
    if (!confirm(`Disconnect @${account.accountName}? Scheduled posts will be deleted.`)) return;
    setDisconnecting(account.id);
    await fetch("/api/social/instagram/disconnect", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ socialAccountId: account.id }),
    });
    toast.success(`${PLATFORM_LABELS[account.platform] ?? account.platform} disconnected`);
    window.location.reload();
  }

  return (
    <Card className="transition-shadow hover:shadow-sm">
      <CardContent className="p-0">
        {/* Project header */}
        <div className="px-4 pt-4 pb-3 border-b flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-sm truncate">{project.name}</h3>
            <p className="text-xs text-muted-foreground capitalize mt-0.5">
              {project.phase.replace(/_/g, " ")}
              {totalPending > 0 && (
                <span className="ml-2 text-primary font-medium">
                  · {totalPending} pending
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Button
              size="icon" variant="ghost" className="h-7 w-7"
              title="Send social authorization email"
              onClick={() => { setEmailInput(project.clientEmail ?? ""); setEmailDialogOpen(true); }}
            >
              <Mail className="h-3.5 w-3.5" />
            </Button>
            {connectedAccounts.length > 0 && (
              <Button
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={() => { setSchedAccount(connectedAccounts[0]); setSchedOpen(true); }}
              >
                <Plus className="h-3 w-3" />
                Schedule
              </Button>
            )}
            <Button
              size="icon" variant="ghost" className="h-7 w-7"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </Button>
          </div>
        </div>

        {/* Platform connections */}
        <div className="px-4 py-3 flex flex-wrap gap-2">
          {/* Instagram */}
          {igAccount ? (
            <div className="flex items-center gap-1.5 bg-muted rounded-full pl-2 pr-1 py-1">
              {tokenExpiringSoon && <AlertTriangle className="h-3 w-3 text-yellow-500" />}
              <Instagram className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">@{igAccount.accountName}</span>
              <Badge variant="outline" className="text-xs h-4 px-1.5 text-green-600 border-green-600/30">live</Badge>
              <button
                onClick={() => disconnectAccount(igAccount)}
                disabled={disconnecting === igAccount.id}
                className="text-xs text-muted-foreground hover:text-destructive px-1.5 transition-colors"
              >
                {disconnecting === igAccount.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "×"}
              </button>
            </div>
          ) : (
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5 rounded-full"
              onClick={() => connectPlatform("instagram")} disabled={connectingIg}>
              {connectingIg ? <Loader2 className="h-3 w-3 animate-spin" /> : <Instagram className="h-3 w-3" />}
              {connectingIg ? "Redirecting…" : "Connect Instagram"}
            </Button>
          )}

          {/* YouTube */}
          {ytAccount ? (
            <div className="flex items-center gap-1.5 bg-muted rounded-full pl-2 pr-1 py-1">
              <Youtube className="h-3.5 w-3.5 text-red-500" />
              <span className="text-xs font-medium">@{ytAccount.accountName}</span>
              <Badge variant="outline" className="text-xs h-4 px-1.5 text-green-600 border-green-600/30">live</Badge>
              <button
                onClick={() => disconnectAccount(ytAccount)}
                disabled={disconnecting === ytAccount.id}
                className="text-xs text-muted-foreground hover:text-destructive px-1.5 transition-colors"
              >
                {disconnecting === ytAccount.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "×"}
              </button>
            </div>
          ) : (
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5 rounded-full"
              onClick={() => connectPlatform("youtube")} disabled={connectingYt}>
              {connectingYt ? <Loader2 className="h-3 w-3 animate-spin" /> : <Youtube className="h-3 w-3 text-red-500" />}
              {connectingYt ? "Redirecting…" : "Connect YouTube"}
            </Button>
          )}

          {/* Reddit */}
          {redditAccount ? (
            <div className="flex items-center gap-1.5 bg-muted rounded-full pl-2 pr-1 py-1">
              <RedditIcon className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">@{redditAccount.accountName}</span>
              <Badge variant="outline" className="text-xs h-4 px-1.5 text-green-600 border-green-600/30">live</Badge>
              <button
                onClick={() => disconnectAccount(redditAccount)}
                disabled={disconnecting === redditAccount.id}
                className="text-xs text-muted-foreground hover:text-destructive px-1.5 transition-colors"
              >
                {disconnecting === redditAccount.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "×"}
              </button>
            </div>
          ) : (
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5 rounded-full"
              onClick={() => connectPlatform("reddit")} disabled={connectingReddit}>
              {connectingReddit ? <Loader2 className="h-3 w-3 animate-spin" /> : <RedditIcon className="h-3 w-3" />}
              {connectingReddit ? "Redirecting…" : "Connect Reddit"}
            </Button>
          )}

          {/* TikTok */}
          {tiktokAccount ? (
            <div className="flex items-center gap-1.5 bg-muted rounded-full pl-2 pr-1 py-1">
              <TikTokIcon className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">@{tiktokAccount.accountName}</span>
              <Badge variant="outline" className="text-xs h-4 px-1.5 text-green-600 border-green-600/30">live</Badge>
              <button
                onClick={() => disconnectAccount(tiktokAccount)}
                disabled={disconnecting === tiktokAccount.id}
                className="text-xs text-muted-foreground hover:text-destructive px-1.5 transition-colors"
              >
                {disconnecting === tiktokAccount.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "×"}
              </button>
            </div>
          ) : (
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5 rounded-full"
              onClick={() => connectPlatform("tiktok")} disabled={connectingTiktok}>
              {connectingTiktok ? <Loader2 className="h-3 w-3 animate-spin" /> : <TikTokIcon className="h-3 w-3" />}
              {connectingTiktok ? "Redirecting…" : "Connect TikTok"}
            </Button>
          )}
        </div>

        {/* Expanded posts */}
        {expanded && (
          <div className="border-t px-4 py-3">
            <ScheduledPostsList
              posts={posts}
              onDeleted={(id) => setPosts((prev) => prev.filter((p) => p.id !== id))}
            />
          </div>
        )}
      </CardContent>

      {/* Send auth email dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Send Authorization Email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-1">
            <p className="text-xs text-muted-foreground">
              The recipient will receive a link to connect their social accounts for <strong>{project.name}</strong>.
            </p>

            {/* Suggestion chips */}
            {emailSuggestions.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground font-medium">Suggestions</p>
                <div className="flex flex-wrap gap-1.5">
                  {emailSuggestions.map((email) => (
                    <button
                      key={email}
                      onClick={() => setEmailInput(email)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                        emailInput === email
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-muted-foreground/30 text-muted-foreground hover:border-primary"
                      }`}
                    >
                      {email}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Free-text input */}
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground font-medium">Or enter an email</p>
              <Input
                type="email"
                placeholder="client@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="h-8 text-sm"
                onKeyDown={(e) => { if (e.key === "Enter" && emailInput.trim()) sendConnectEmail(emailInput.trim()); }}
              />
            </div>

            <Button
              className="w-full gap-1.5"
              onClick={() => sendConnectEmail(emailInput.trim())}
              disabled={sendingEmail || !emailInput.trim()}
            >
              {sendingEmail
                ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Sending…</>
                : <><Send className="h-3.5 w-3.5" />Send Link</>
              }
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {schedAccount && (
        <SchedulePostDialog
          open={schedOpen}
          onOpenChange={setSchedOpen}
          projectId={project.id}
          account={schedAccount}
          accounts={connectedAccounts}
          onAccountChange={setSchedAccount}
          onCreated={(post) => setPosts((prev) => [post, ...prev])}
        />
      )}
    </Card>
  );
}
