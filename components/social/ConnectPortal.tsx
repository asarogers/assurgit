"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";
import { Instagram, Youtube, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import type { SocialAccount } from "@/lib/db/social-schema";

interface Props {
  token:             string;
  projectId:         string;
  projectName:       string;
  connectedAccounts: SocialAccount[];
  flashConnected:    boolean;
  flashError:        string | null;
}

function RedditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <circle cx="10" cy="10" r="10" fill="#FF4500"/>
      <path d="M16.67 10a1.46 1.46 0 0 0-2.47-1 7.12 7.12 0 0 0-3.85-1.23l.65-3.07 2.13.45a1 1 0 1 0 .07-.52l-2.38-.5a.26.26 0 0 0-.31.2l-.73 3.44a7.14 7.14 0 0 0-3.89 1.23 1.46 1.46 0 1 0-1.61 2.39 2.87 2.87 0 0 0 0 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.87 2.87 0 0 0 0-.44 1.46 1.46 0 0 0 .64-1.39zm-9.4 1.06a1 1 0 1 1 1 1 1 1 0 0 1-1-1zm5.57 2.64a3.54 3.54 0 0 1-3.84 0 .26.26 0 0 1 .29-.43 3 3 0 0 0 3.26 0 .26.26 0 0 1 .29.43zm-.17-1.64a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" fill="white"/>
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

type Platform = "instagram" | "youtube" | "reddit" | "tiktok";

const PLATFORMS: { id: Platform; label: string; icon: React.ReactNode; description: string }[] = [
  { id: "instagram", label: "Instagram",  icon: <Instagram className="h-5 w-5" />,                      description: "Feed posts, Reels, and Stories" },
  { id: "youtube",   label: "YouTube",    icon: <Youtube className="h-5 w-5 text-red-500" />,           description: "Videos and Shorts" },
  { id: "reddit",    label: "Reddit",     icon: <RedditIcon className="h-5 w-5" />,                     description: "Posts to communities you choose" },
  { id: "tiktok",    label: "TikTok",     icon: <TikTokIcon className="h-5 w-5" />,                     description: "Short-form video content" },
];

export function ConnectPortal({ token, projectId, projectName, connectedAccounts, flashConnected, flashError }: Props) {
  const [connecting, setConnecting] = useState<Platform | null>(null);
  const [accounts,   setAccounts]   = useState<SocialAccount[]>(connectedAccounts);

  useEffect(() => {
    if (flashConnected) toast.success("Account connected successfully!");
    if (flashError)     toast.error(
      flashError === "oauth_denied"  ? "Authorization was cancelled." :
      flashError === "invalid_state" ? "Session expired — please try again." :
      decodeURIComponent(flashError)
    );
  }, []);

  async function connect(platform: Platform) {
    setConnecting(platform);
    const isZernio = platform === "reddit" || platform === "tiktok";
    const url = isZernio
      ? `/api/social/zernio/connect?platform=${platform}&projectId=${projectId}&connectToken=${encodeURIComponent(token)}`
      : `/api/social/${platform}/connect?projectId=${projectId}&connectToken=${encodeURIComponent(token)}`;

    const res  = await fetch(url);
    const data = await res.json() as any;
    if (!res.ok) {
      toast.error(data.error ?? "Failed to start authorization");
      setConnecting(null);
      return;
    }
    window.location.href = data.url;
  }

  const connectedPlatforms = new Set(accounts.map((a) => a.platform));
  const anyConnected = accounts.length > 0;
  const allConnected = PLATFORMS.every((p) => connectedPlatforms.has(p.id));

  return (
    <div className="min-h-screen bg-background flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-md space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Assurgit</p>
          <h1 className="text-xl font-semibold">{projectName}</h1>
          <p className="text-sm text-muted-foreground">
            Connect your social accounts so we can schedule and publish content on your behalf.
            You can disconnect at any time.
          </p>
        </div>

        {/* Platform cards */}
        <div className="space-y-3">
          {PLATFORMS.map(({ id, label, icon, description }) => {
            const account   = accounts.find((a) => a.platform === id);
            const isLoading = connecting === id;

            return (
              <div
                key={id}
                className="flex items-center justify-between gap-4 p-4 rounded-xl border bg-card"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0">{icon}</div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{label}</p>
                    {account ? (
                      <p className="text-xs text-muted-foreground truncate">@{account.accountName}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">{description}</p>
                    )}
                  </div>
                </div>

                {account ? (
                  <Badge variant="outline" className="shrink-0 text-xs text-green-600 border-green-600/30">
                    Connected
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0 h-8 text-xs"
                    onClick={() => connect(id)}
                    disabled={!!connecting}
                  >
                    {isLoading
                      ? <><Loader2 className="h-3 w-3 animate-spin mr-1.5" />Redirecting…</>
                      : "Connect"
                    }
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {/* Done state */}
        {allConnected && (
          <div className="flex flex-col items-center gap-3 pt-2 pb-2">
            <p className="text-sm font-medium text-green-600">All accounts connected ✓</p>
            <Button className="w-full gap-2" onClick={() => window.close()}>
              <X className="h-4 w-4" />
              Close this page
            </Button>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground pb-8">
          Your credentials are stored securely and only used to publish content you approve.{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
