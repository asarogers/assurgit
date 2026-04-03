"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button }   from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateTimePicker } from "@/components/social/DateTimePicker";
import { toast } from "sonner";
import { CheckCircle2, CalendarClock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Card as CardType } from "@/lib/db/schema";
import type { SocialAccount } from "@/lib/db/social-schema";

interface Props {
  card:      CardType;
  open:      boolean;
  onOpenChange: (v: boolean) => void;
}

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  youtube:   "YouTube",
  reddit:    "Reddit",
  tiktok:    "TikTok",
};

const PLATFORM_ICONS: Record<string, string> = {
  instagram: "📸",
  youtube:   "▶️",
  reddit:    "🔴",
  tiktok:    "🎵",
};

function pad(n: number) { return n.toString().padStart(2, "0"); }
function defaultTime() {
  const d = new Date();
  d.setHours(d.getHours() + 1, 0, 0, 0);
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:00`;
}

export function ScheduleCardDialog({ card, open, onOpenChange }: Props) {
  const [accounts,    setAccounts]    = useState<SocialAccount[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [scheduling,  setScheduling]  = useState(false);
  const [sharedTime,  setSharedTime]  = useState(defaultTime);
  const [videoSrc,    setVideoSrc]    = useState<"draft"|"final">("final");
  const [scheduled,   setScheduled]   = useState<Record<string, boolean>>({});

  // Per-platform state
  const [enabled,      setEnabled]      = useState<Record<string, boolean>>({});
  const [overrideTime, setOverrideTime] = useState<Record<string, boolean>>({});
  const [times,        setTimes]        = useState<Record<string, string>>({});
  const [descs,        setDescs]        = useState<Record<string, string>>({});

  // Platform-specific extra fields
  const [ytTitle,      setYtTitle]      = useState(card.descYoutubeTitle ?? "");
  const [ytVisibility, setYtVisibility] = useState("public");
  const [redditTitle,  setRedditTitle]  = useState(card.descRedditTitle ?? "");
  const [subreddit,    setSubreddit]    = useState(card.descRedditSubreddit || "caregivers");
  const [igType,       setIgType]       = useState<"REEL"|"VIDEO"|"IMAGE">("REEL");
  const [ttPrivacy,    setTtPrivacy]    = useState("PUBLIC_TO_EVERYONE");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setScheduled({});
    // Load accounts
    fetch(`/api/social/accounts?projectId=${card.projectId}`)
      .then(r => r.json() as Promise<SocialAccount[]>)
      .then((accs) => {
        const supported = accs.filter(a => ["instagram","youtube","reddit","tiktok"].includes(a.platform));
        setAccounts(supported);
        // Init per-platform state
        const initEnabled: Record<string, boolean>  = {};
        const initTimes:   Record<string, string>   = {};
        const initDescs:   Record<string, string>   = {};
        for (const acc of supported) {
          initEnabled[acc.platform] = true;
          initTimes[acc.platform]   = defaultTime();
          initDescs[acc.platform]   = descForPlatform(acc.platform);
        }
        setEnabled(initEnabled);
        setTimes(initTimes);
        setDescs(initDescs);
        setOverrideTime({});
      })
      .finally(() => setLoading(false));
  }, [open, card.projectId]);

  function descForPlatform(platform: string): string {
    switch (platform) {
      case "instagram": return card.descInstagram ?? "";
      case "tiktok":    return card.descTiktok    ?? "";
      case "youtube":   return card.descYoutube   ?? "";
      case "reddit":    return card.descFacebook  ?? ""; // repurposed
      default:          return "";
    }
  }

  function timeForPlatform(platform: string): string {
    return overrideTime[platform] ? times[platform] : sharedTime;
  }

  function mediaUrl(): string {
    if (videoSrc === "final" && card.finalVideoPath) return card.finalVideoPath;
    if (card.videoPath) return card.videoPath;
    return card.finalVideoPath ?? "";
  }

  async function scheduleAll() {
    const toSchedule = accounts.filter(a => enabled[a.platform] && !scheduled[a.platform]);
    if (!toSchedule.length) { toast.error("No platforms selected"); return; }

    const url = mediaUrl();
    if (!url) { toast.error("No video available to schedule"); return; }

    setScheduling(true);
    const newScheduled = { ...scheduled };
    let successCount = 0;

    for (const acc of toSchedule) {
      const time = timeForPlatform(acc.platform);
      const scheduledFor = time ? new Date(time).getTime() : null;
      const body: Record<string, unknown> = {
        projectId:     card.projectId,
        socialAccountId: acc.id,
        mediaUrl:      url,
        scheduledFor,
        status:        scheduledFor ? "scheduled" : "draft",
      };

      switch (acc.platform) {
        case "instagram":
          body.caption   = descs[acc.platform];
          body.mediaType = igType;
          break;
        case "youtube":
          body.title       = ytTitle || `Card ${card.position}`;
          body.caption     = descs[acc.platform];
          body.mediaType   = "SHORT";
          body.visibility  = ytVisibility;
          break;
        case "reddit":
          body.title     = redditTitle || `Card ${card.position}`;
          body.caption   = descs[acc.platform];
          body.subreddit = subreddit;
          break;
        case "tiktok":
          body.caption  = descs[acc.platform];
          body.metadata = JSON.stringify({ privacyLevel: ttPrivacy, allowComment: true, allowDuet: true, allowStitch: true });
          break;
      }

      const res = await fetch("/api/social/posts", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });

      if (res.ok) {
        newScheduled[acc.platform] = true;
        successCount++;
      } else {
        const err = await res.json().catch(() => ({})) as any;
        toast.error(`${PLATFORM_LABELS[acc.platform]}: ${err.error ?? "Failed"}`);
      }
    }

    setScheduled(newScheduled);
    setScheduling(false);
    if (successCount > 0) toast.success(`Scheduled to ${successCount} platform${successCount > 1 ? "s" : ""}`);
  }

  const videoLabel = videoSrc === "final" && card.finalVideoPath
    ? "Final video"
    : card.videoPath
    ? "Draft video"
    : "No video";

  const allDone = accounts.length > 0 && accounts.every(a => !enabled[a.platform] || scheduled[a.platform]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4" />
            Schedule Card {card.position}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : accounts.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No social accounts connected to this project.<br />
            Connect accounts in the Social tab first.
          </div>
        ) : (
          <div className="space-y-4">

            {/* Video source */}
            <div className="flex items-center gap-3">
              <Label className="text-xs shrink-0">Video:</Label>
              <div className="flex gap-1">
                {(["final","draft"] as const).map(src => {
                  const hasVideo = src === "final" ? !!card.finalVideoPath : !!card.videoPath;
                  return (
                    <button key={src}
                      onClick={() => setVideoSrc(src)}
                      disabled={!hasVideo}
                      className={cn(
                        "text-xs px-2.5 py-1 rounded border transition-colors",
                        videoSrc === src
                          ? "bg-primary text-primary-foreground border-primary"
                          : hasVideo
                          ? "border-border hover:bg-muted"
                          : "border-border opacity-30 cursor-not-allowed"
                      )}
                    >
                      {src === "final" ? "Final" : "Draft"}
                      {!hasVideo && " (none)"}
                    </button>
                  );
                })}
              </div>
              <span className="text-xs text-muted-foreground ml-auto">{videoLabel}</span>
            </div>

            {/* Shared time */}
            <div className="space-y-1.5">
              <Label className="text-xs">Default time (all platforms)</Label>
              <DateTimePicker value={sharedTime} onChange={setSharedTime} />
            </div>

            {/* Platform tabs */}
            <Tabs defaultValue={accounts[0]?.platform}>
              <TabsList className="w-full">
                {accounts.map(acc => (
                  <TabsTrigger key={acc.platform} value={acc.platform} className="flex-1 gap-1.5 text-xs">
                    {scheduled[acc.platform]
                      ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      : <span>{PLATFORM_ICONS[acc.platform]}</span>
                    }
                    {PLATFORM_LABELS[acc.platform]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {accounts.map(acc => (
                <TabsContent key={acc.platform} value={acc.platform} className="space-y-3 pt-2">

                  {/* Enable toggle */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enabled[acc.platform] ?? true}
                        onChange={e => setEnabled(prev => ({ ...prev, [acc.platform]: e.target.checked }))}
                        className="rounded"
                      />
                      <span className="text-sm font-medium">Post to {PLATFORM_LABELS[acc.platform]}</span>
                    </label>
                    {scheduled[acc.platform] && (
                      <span className="text-xs text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Scheduled
                      </span>
                    )}
                  </div>

                  {enabled[acc.platform] && (
                    <>
                      {/* Override time */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-muted-foreground">
                          <input
                            type="checkbox"
                            checked={overrideTime[acc.platform] ?? false}
                            onChange={e => setOverrideTime(prev => ({ ...prev, [acc.platform]: e.target.checked }))}
                          />
                          Override time for this platform
                        </label>
                        {overrideTime[acc.platform] && (
                          <DateTimePicker
                            value={times[acc.platform] ?? sharedTime}
                            onChange={val => setTimes(prev => ({ ...prev, [acc.platform]: val }))}
                          />
                        )}
                      </div>

                      {/* Platform-specific fields */}
                      {acc.platform === "youtube" && (
                        <div className="space-y-2">
                          <div className="space-y-1">
                            <Label className="text-xs">Video title</Label>
                            <Input
                              value={ytTitle}
                              onChange={e => setYtTitle(e.target.value)}
                              placeholder={`Card ${card.position} — Well Prepped Life`}
                              className="text-sm h-8"
                              maxLength={100}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Visibility</Label>
                            <Select value={ytVisibility} onValueChange={v => setYtVisibility(v ?? "public")}>
                              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="unlisted">Unlisted</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      {acc.platform === "reddit" && (
                        <div className="space-y-2">
                          <div className="space-y-1">
                            <Label className="text-xs">Post title</Label>
                            <Input
                              value={redditTitle}
                              onChange={e => setRedditTitle(e.target.value)}
                              placeholder="Post title…"
                              className="text-sm h-8"
                              maxLength={300}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Subreddit</Label>
                            <Input
                              value={subreddit}
                              onChange={e => setSubreddit(e.target.value.replace(/^r\//, ""))}
                              placeholder="caregivers"
                              className="text-sm h-8"
                            />
                          </div>
                        </div>
                      )}

                      {acc.platform === "instagram" && (
                        <div className="space-y-1">
                          <Label className="text-xs">Media type</Label>
                          <div className="flex gap-1">
                            {(["REEL","VIDEO","IMAGE"] as const).map(t => (
                              <button key={t} onClick={() => setIgType(t)}
                                className={cn(
                                  "text-xs px-2 py-1 rounded border transition-colors",
                                  igType === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
                                )}
                              >{t}</button>
                            ))}
                          </div>
                        </div>
                      )}

                      {acc.platform === "tiktok" && (
                        <div className="space-y-1">
                          <Label className="text-xs">Privacy</Label>
                          <Select value={ttPrivacy} onValueChange={v => setTtPrivacy(v ?? "PUBLIC_TO_EVERYONE")}>
                            <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PUBLIC_TO_EVERYONE">Public</SelectItem>
                              <SelectItem value="FOLLOWER_OF_CREATOR">Followers only</SelectItem>
                              <SelectItem value="SELF_ONLY">Private</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Description */}
                      <div className="space-y-1">
                        <Label className="text-xs">
                          {acc.platform === "reddit" ? "Body" : acc.platform === "youtube" ? "Description" : "Caption"}
                        </Label>
                        <Textarea
                          value={descs[acc.platform] ?? ""}
                          onChange={e => setDescs(prev => ({ ...prev, [acc.platform]: e.target.value }))}
                          className="text-sm min-h-28 resize-none"
                          placeholder={`Write your ${acc.platform} caption…`}
                        />
                      </div>
                    </>
                  )}
                </TabsContent>
              ))}
            </Tabs>

            {/* Schedule button */}
            <div className="flex justify-end gap-2 pt-2 border-t">
              {allDone ? (
                <Button variant="outline" onClick={() => onOpenChange(false)}>Done</Button>
              ) : (
                <Button onClick={scheduleAll} disabled={scheduling} className="gap-2">
                  {scheduling && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  Schedule Selected
                </Button>
              )}
            </div>

          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
