"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, ChevronDown, Instagram, AlertCircle, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface Project { id: string; name: string; token: string; }
interface Props { projects: Project[]; }

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button onClick={copy} className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {label ?? "Copy"}
    </button>
  );
}

function Step({ num, title, last, children }: { num: number | "✓"; title: string; last?: boolean; children: React.ReactNode }) {
  const isDone = num === "✓";
  return (
    <div className="flex gap-4">
      <div className="shrink-0 flex flex-col items-center">
        <div className={`h-7 w-7 rounded-full text-white text-xs font-bold flex items-center justify-center ${isDone ? "bg-green-600" : "bg-indigo-600"}`}>
          {isDone ? <Check className="h-4 w-4" /> : num}
        </div>
        {!last && <div className="w-px flex-1 bg-border mt-2" />}
      </div>
      <div className={`${last ? "pb-1" : "pb-8"} flex-1 min-w-0`}>
        <p className="text-sm font-semibold text-foreground mb-2">{title}</p>
        <div className="text-sm text-muted-foreground space-y-2">{children}</div>
      </div>
    </div>
  );
}

function CodeBlock({ children, copyText }: { children: React.ReactNode; copyText?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-muted/50 border rounded-lg px-3 py-2 mt-1">
      <code className="text-xs text-foreground font-mono break-all">{children}</code>
      {copyText && <CopyButton text={copyText} />}
    </div>
  );
}

function Note({ color = "amber", children }: { color?: "amber" | "blue"; children: React.ReactNode }) {
  const styles = color === "amber"
    ? "bg-amber-500/5 border-amber-500/20 text-amber-300"
    : "bg-blue-500/5 border-blue-500/20 text-blue-300";
  return (
    <div className={`mt-2 p-3 rounded-lg border ${styles}`}>
      <div className="text-xs space-y-1">{children}</div>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b flex items-center gap-2.5">
        <div className="h-7 w-7 rounded-lg bg-indigo-600/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-indigo-400" />
        </div>
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      <div className="px-5 py-5">{children}</div>
    </div>
  );
}

export function GuideClient({ projects }: Props) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0] ?? null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const connectUrl = selectedProject
    ? `https://assurgit.com/connect?token=${selectedProject.token}`
    : "";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold">Setup Guide</h1>
        <p className="text-xs text-muted-foreground mt-0.5">How to onboard a client and connect their Instagram</p>
      </div>

      {/* Dev mode warning */}
      <div className="flex gap-3 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
        <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-amber-300">App is in Development Mode</p>
          <p className="text-xs text-muted-foreground">
            Until the Meta app is approved and set to Live, every client must be added as a Tester
            in the Meta Developer Dashboard before they can connect their Instagram.
            Once approved, skip straight to Step 3.
          </p>
          <a href="https://developers.facebook.com/apps" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 mt-1">
            Open Meta Developer Dashboard <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Section 1: Full flow */}
      <Section icon={Instagram} title="Connecting a Client's Instagram — Full Flow">
        <div>

          <Step num={1} title="Add them as a Tester in Meta Developer Dashboard">
            <p>Go to your app → left sidebar → <strong className="text-foreground">Roles</strong> → <strong className="text-foreground">Testers</strong> → click <strong className="text-foreground">Add Testers</strong>. Enter their Facebook username or profile URL.</p>
            <a href="https://developers.facebook.com/apps" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 mt-1">
              developers.facebook.com/apps <ExternalLink className="h-3 w-3" />
            </a>
            <Note color="amber">
              <p className="font-medium">They need a Facebook account linked to their Instagram.</p>
              <p className="text-muted-foreground mt-0.5">In the Instagram app: Settings → Account → Linked Accounts → Facebook</p>
            </Note>
          </Step>

          <Step num={2} title="They switch Instagram to a Professional or Creator account">
            <p>Personal accounts <strong className="text-foreground">cannot</strong> connect to third-party apps. They need to upgrade to a Creator or Business account first.</p>
            <p className="mt-1">Send them this link — it opens the upgrade flow directly in Instagram:</p>
            <CodeBlock copyText="https://www.instagram.com/accounts/convert_to_professional_account/">
              instagram.com/accounts/convert_to_professional_account/
            </CodeBlock>
            <p className="mt-2 text-xs">Or in the Instagram app: <strong className="text-foreground">Settings → Account → Switch to Professional Account</strong></p>
          </Step>

          <Step num={3} title="They accept the tester invite on Instagram">
            <p>Send them this link — it opens the Apps & Websites page on Instagram where the pending tester invite shows up:</p>
            <CodeBlock copyText="https://www.instagram.com/accounts/manage_access/">
              instagram.com/accounts/manage_access/
            </CodeBlock>
            <p className="mt-2">They should see <strong className="text-foreground">Assurgit</strong> listed under <strong className="text-foreground">Tester Invites</strong>. They click <strong className="text-foreground">Accept</strong>.</p>
            <Note color="blue">
              <p className="font-medium text-blue-300">If it doesn't show up immediately</p>
              <p className="text-muted-foreground mt-0.5">The invite can take a few minutes to appear. Have them refresh the page. They must have already completed Step 2 (Professional account) before accepting.</p>
            </Note>
          </Step>

          <Step num={4} title="Send them their Connect link">
            <p>Select their project and send the personalized link below. They click <strong className="text-foreground">Connect</strong> next to Instagram and go through the authorization flow.</p>

            <div className="mt-3 relative">
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center justify-between gap-2 w-full h-9 px-3 text-sm border rounded-lg bg-background hover:bg-muted transition-colors"
              >
                <span className="truncate">{selectedProject?.name ?? "Select a project…"}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              </button>
              {dropdownOpen && (
                <div className="absolute top-10 left-0 z-20 w-full bg-popover border rounded-lg shadow-lg py-1 max-h-48 overflow-y-auto">
                  {projects.map((p) => (
                    <button key={p.id}
                      onClick={() => { setSelectedProject(p); setDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors truncate ${selectedProject?.id === p.id ? "font-semibold" : ""}`}>
                      {p.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedProject && (
              <div className="mt-2 space-y-1.5">
                <CodeBlock copyText={connectUrl}>{connectUrl}</CodeBlock>
                <p className="text-xs text-muted-foreground">Unique to this project. Send via email, DM, or any messenger.</p>
              </div>
            )}
          </Step>

          <Step num="✓" title="They're connected" last>
            <p>Their Instagram account will appear in the <strong className="text-foreground">Social</strong> tab under their project. You can now schedule and publish posts on their behalf.</p>
          </Step>

        </div>
      </Section>

      {/* Section 2: Going live */}
      <Section icon={BookOpen} title="Going Live — Removing the Tester Requirement">
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>Once the Meta app passes review and is set to <strong className="text-foreground">Live mode</strong>, clients skip Steps 1–3 entirely and just use their connect link.</p>

          <p className="font-medium text-foreground">Checklist before submitting for review:</p>
          <ul className="space-y-2 pl-1">
            {[
              { done: true,  text: "Privacy Policy published at assurgit.com/privacy" },
              { done: true,  text: "Data Deletion Callback URL: assurgit.com/api/social/data-deletion" },
              { done: true,  text: "Privacy Policy link visible on the /connect page" },
              { done: false, text: "INSTAGRAM_APP_SECRET set as Cloudflare secret (wrangler secret put INSTAGRAM_APP_SECRET)" },
              { done: false, text: "Meta Business Verification completed at business.facebook.com/settings" },
              { done: false, text: "Screencast recorded: OAuth flow + a post being published to Instagram" },
              { done: false, text: "App icon uploaded (1024×1024 PNG) in Meta App Dashboard → Settings → Basic" },
              { done: false, text: "Permissions submitted for review: instagram_basic, instagram_content_publish, instagram_manage_insights" },
            ].map(({ done, text }, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className={`mt-0.5 h-4 w-4 rounded shrink-0 flex items-center justify-center border ${done ? "bg-green-600/20 border-green-600/40" : "border-muted-foreground/30"}`}>
                  {done && <Check className="h-2.5 w-2.5 text-green-400" />}
                </div>
                <span className={done ? "text-foreground" : ""}>{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 p-3 rounded-lg bg-muted/40 border">
            <p className="text-xs font-medium text-foreground mb-1">Meta App Description — copy into the review form</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Assurgit is a professional social media content scheduling and publishing platform for businesses. It enables agency operators to connect client social media accounts via OAuth and schedule AI-generated video content for automated publishing at predefined times. All content is reviewed and approved by the client before any post is published. We request only the minimum permissions required: instagram_content_publish to publish posts, instagram_basic to display the connected account, and instagram_manage_insights to show post performance in the analytics dashboard. No user data is stored beyond access tokens, which are deleted immediately upon disconnection.
            </p>
            <div className="mt-2">
              <CopyButton
                text="Assurgit is a professional social media content scheduling and publishing platform for businesses. It enables agency operators to connect client social media accounts via OAuth and schedule AI-generated video content for automated publishing at predefined times. All content is reviewed and approved by the client before any post is published. We request only the minimum permissions required: instagram_content_publish to publish posts, instagram_basic to display the connected account, and instagram_manage_insights to show post performance in the analytics dashboard. No user data is stored beyond access tokens, which are deleted immediately upon disconnection."
                label="Copy description"
              />
            </div>
          </div>
        </div>
      </Section>

    </div>
  );
}
