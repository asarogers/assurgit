"use client";

import { useState, useCallback } from "react";
import { Badge }   from "@/components/ui/badge";
import { Button }  from "@/components/ui/button";
import { cn }      from "@/lib/utils";
import {
  CheckCircle2, Clock, XCircle, Copy, Check,
  ChevronDown, ChevronRight, Instagram, Youtube, Facebook,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface CardRow {
  id:                  string;
  projectId:           string;
  position:            number;
  status:              string;
  transcriptV1:        string | null;
  transcriptV2:        string | null;
  descInstagram:       string | null;
  descTiktok:          string | null;
  descFacebook:        string | null;
  descYoutube:         string | null;
  descYoutubeTitle:    string | null;
  descRedditTitle:     string | null;
  descRedditSubreddit: string | null;
}

interface ProjectRow {
  id:        string;
  name:      string;
  phase:     string;
  createdAt: number;
  cards:     CardRow[];
}

interface Props {
  projects: ProjectRow[];
}

// ── Platform definitions ──────────────────────────────────────────────────────

const PLATFORMS = [
  {
    key:   "v1"       as const,
    label: "Script V1",
    icon:  null,
    color: "bg-zinc-100 text-zinc-700 border-zinc-200",
    fields: (c: CardRow) => [{ label: null, value: c.transcriptV1 }],
  },
  {
    key:   "v2"       as const,
    label: "Script V2",
    icon:  null,
    color: "bg-zinc-100 text-zinc-700 border-zinc-200",
    fields: (c: CardRow) => [{ label: null, value: c.transcriptV2 }],
  },
  {
    key:   "instagram" as const,
    label: "Instagram",
    icon:  Instagram,
    color: "bg-pink-50 text-pink-700 border-pink-200",
    fields: (c: CardRow) => [{ label: "Caption", value: c.descInstagram }],
  },
  {
    key:   "tiktok"    as const,
    label: "TikTok",
    icon:  null,
    color: "bg-neutral-900 text-white border-neutral-700",
    fields: (c: CardRow) => [{ label: "Caption", value: c.descTiktok }],
  },
  {
    key:   "facebook"  as const,
    label: "Facebook",
    icon:  Facebook,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    fields: (c: CardRow) => [{ label: "Post", value: c.descFacebook }],
  },
  {
    key:   "youtube"   as const,
    label: "YouTube",
    icon:  Youtube,
    color: "bg-red-50 text-red-700 border-red-200",
    fields: (c: CardRow) => [
      { label: "Title",       value: c.descYoutubeTitle },
      { label: "Description", value: c.descYoutube },
    ],
  },
  {
    key:   "reddit"    as const,
    label: "Reddit",
    icon:  null,
    color: "bg-orange-50 text-orange-700 border-orange-200",
    fields: (c: CardRow) => [
      { label: "Subreddit", value: c.descRedditSubreddit ? `r/${c.descRedditSubreddit}` : null },
      { label: "Title",     value: c.descRedditTitle },
    ],
  },
] as const;

type PlatformKey = typeof PLATFORMS[number]["key"];

// ── Status helpers ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { icon: React.ElementType; label: string; cls: string }> = {
  waiting:  { icon: Clock,        label: "Waiting",  cls: "bg-zinc-100 text-zinc-600 border-zinc-200" },
  approved: { icon: CheckCircle2, label: "Approved", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  denied:   { icon: XCircle,      label: "Denied",   cls: "bg-red-50 text-red-700 border-red-200" },
};

// ── CopyButton ────────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="ml-auto shrink-0 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// ── ScriptBlock ───────────────────────────────────────────────────────────────

function ScriptBlock({ label, value }: { label: string | null; value: string | null }) {
  if (!value) {
    return (
      <div className="text-xs text-muted-foreground italic px-3 py-2">
        {label ? `${label}: ` : ""}No content
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
          <CopyButton text={value} />
        </div>
      )}
      {!label && (
        <div className="flex justify-end">
          <CopyButton text={value} />
        </div>
      )}
      <pre className="text-sm whitespace-pre-wrap font-sans bg-muted/40 rounded-md px-3 py-2.5 leading-relaxed border border-border/60">
        {value}
      </pre>
    </div>
  );
}

// ── PlatformTab ───────────────────────────────────────────────────────────────

function PlatformTabs({
  card,
  active,
  onSelect,
}: {
  card:     CardRow;
  active:   PlatformKey;
  onSelect: (k: PlatformKey) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-4">
      {PLATFORMS.map(({ key, label, icon: Icon, color }) => {
        const fields     = PLATFORMS.find(p => p.key === key)!.fields(card);
        const hasContent = fields.some(f => f.value);
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border transition-all",
              active === key
                ? color + " ring-2 ring-offset-1 ring-current/30 shadow-sm"
                : "bg-background text-muted-foreground border-border hover:bg-muted/60",
              !hasContent && "opacity-40",
            )}
          >
            {Icon && <Icon className="h-3 w-3" />}
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ── CardRow ───────────────────────────────────────────────────────────────────

function CardItem({ card }: { card: CardRow }) {
  const [expanded,        setExpanded]        = useState(false);
  const [activePlatform,  setActivePlatform]  = useState<PlatformKey>("v1");

  const statusCfg = STATUS_CONFIG[card.status] ?? STATUS_CONFIG.waiting;
  const StatusIcon = statusCfg.icon;

  // First line of V1 for preview
  const preview = card.transcriptV1?.split("\n")[0]?.slice(0, 120) ?? "No transcript";

  const activePlatformDef = PLATFORMS.find(p => p.key === activePlatform)!;
  const activeFields      = activePlatformDef.fields(card);

  return (
    <div className={cn(
      "border rounded-xl transition-all duration-200",
      expanded ? "border-border shadow-sm" : "border-border/60 hover:border-border",
    )}>
      {/* Card header row */}
      <button
        className="w-full flex items-start gap-3 px-4 py-3.5 text-left"
        onClick={() => setExpanded(e => !e)}
      >
        {/* Position badge */}
        <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
          {card.position}
        </span>

        {/* Preview */}
        <span className="flex-1 text-sm text-foreground/80 leading-snug line-clamp-2 min-w-0">
          {preview}
        </span>

        {/* Status */}
        <span className={cn(
          "shrink-0 inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border",
          statusCfg.cls,
        )}>
          <StatusIcon className="h-3 w-3" />
          {statusCfg.label}
        </span>

        {/* Chevron */}
        <span className="shrink-0 text-muted-foreground">
          {expanded
            ? <ChevronDown className="h-4 w-4" />
            : <ChevronRight className="h-4 w-4" />}
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-border/60 px-4 py-4 space-y-3">
          <PlatformTabs
            card={card}
            active={activePlatform}
            onSelect={setActivePlatform}
          />

          <div className="space-y-3">
            {activeFields.map((f, i) => (
              <ScriptBlock key={i} label={f.label ?? null} value={f.value ?? null} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── ProjectPanel ──────────────────────────────────────────────────────────────

function ProjectPanel({ project }: { project: ProjectRow }) {
  const filled    = project.cards.filter(c =>
    c.descInstagram || c.descTiktok || c.descFacebook || c.descYoutube
  ).length;

  return (
    <div className="space-y-2">
      {/* Project stats bar */}
      <div className="flex items-center gap-3 px-1 mb-4 text-sm text-muted-foreground">
        <span>{project.cards.length} scripts</span>
        <span>·</span>
        <span>{filled} with platform copy</span>
        <span>·</span>
        <Badge variant="outline" className="text-xs capitalize">{project.phase}</Badge>
      </div>

      {project.cards.length === 0 ? (
        <div className="text-sm text-muted-foreground italic px-4 py-8 text-center">
          No scripts yet.
        </div>
      ) : (
        <div className="space-y-2">
          {project.cards.map(card => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── DatabaseClient ────────────────────────────────────────────────────────────

export function DatabaseClient({ projects }: Props) {
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id ?? null);

  const activeProject = projects.find(p => p.id === activeProjectId) ?? null;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-border/60 bg-background/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-4">
          <span className="text-sm font-semibold text-foreground">Database</span>
          <span className="text-muted-foreground/40">·</span>

          {/* Project tabs */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {projects.map(p => (
              <button
                key={p.id}
                onClick={() => setActiveProjectId(p.id)}
                className={cn(
                  "shrink-0 px-3 py-1.5 rounded-md text-sm transition-colors",
                  activeProjectId === p.id
                    ? "bg-foreground text-background font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
              >
                {p.name}
              </button>
            ))}
          </div>

          <span className="ml-auto text-xs text-muted-foreground">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {activeProject ? (
          <ProjectPanel project={activeProject} />
        ) : (
          <div className="text-center text-muted-foreground py-20 text-sm">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
}
