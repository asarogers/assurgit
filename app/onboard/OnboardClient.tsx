"use client";

import { useState, useRef, useCallback } from "react";
import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge }    from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Building2, FolderOpen, Mic2, Link2,
  Upload, X, CheckCircle2, FileText, ImageIcon,
  Video, File, ChevronRight, Loader2,
} from "lucide-react";
import type { OnboardingSubmission, OnboardingFile } from "@/lib/db/schema";

// ─── Types ───────────────────────────────────────────────────────────────────

type UploadEntry = {
  id:       string;
  filename: string;
  fileUrl:  string;
  fileSize: number;
  category: string;
  uploading?: boolean;
  error?:    string;
};

const FILE_CATEGORIES = [
  { value: "brand_guide",    label: "Brand Guide"      },
  { value: "photos",         label: "Headshots / Photos" },
  { value: "existing",       label: "Existing Content" },
  { value: "inspiration",    label: "Inspiration"      },
  { value: "other",          label: "Other"            },
];

const VOICE_STYLES = [
  { value: "educational",    label: "Educational",    desc: "Teaching and informing"      },
  { value: "conversational", label: "Conversational", desc: "Like talking to a friend"    },
  { value: "professional",   label: "Professional",   desc: "Authority and expertise"     },
  { value: "inspirational",  label: "Inspirational",  desc: "Motivating and uplifting"    },
  { value: "entertaining",   label: "Entertaining",   desc: "Fun, playful, engaging"      },
];

const PLATFORMS = ["Instagram", "TikTok", "LinkedIn", "YouTube"];

function formatSize(bytes: number) {
  if (bytes < 1024)    return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function fileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (["jpg","jpeg","png","gif","webp"].includes(ext)) return <ImageIcon className="h-4 w-4 text-blue-400" />;
  if (["mp4","mov","avi","mkv"].includes(ext))          return <Video className="h-4 w-4 text-purple-400" />;
  if (["pdf"].includes(ext))                            return <FileText className="h-4 w-4 text-red-400" />;
  return <File className="h-4 w-4 text-gray-400" />;
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  number, icon, title, subtitle, complete, color, children,
}: {
  number: number; icon: React.ReactNode; title: string; subtitle: string;
  complete: boolean; color: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className={cn("px-6 py-5 border-b border-gray-100", color)}>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/80 flex items-center justify-center shrink-0 shadow-sm">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Step {number}</span>
              {complete && <CheckCircle2 className="h-4 w-4 text-white/80" />}
            </div>
            <h2 className="text-base font-bold text-white leading-tight">{title}</h2>
          </div>
        </div>
        <p className="text-sm text-white/70 mt-1.5 leading-relaxed">{subtitle}</p>
      </div>
      <div className="px-6 py-6 space-y-5">{children}</div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div>
        <label className="text-sm font-semibold text-gray-800">{label}</label>
        {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  token:               string;
  projectName:         string;
  initialSubmission:   OnboardingSubmission | null;
  initialFiles:        OnboardingFile[];
}

export function OnboardClient({ token, projectName, initialSubmission: init, initialFiles }: Props) {
  // Form state — pre-populate from existing submission
  const [businessName,   setBusinessName]   = useState(init?.businessName   ?? "");
  const [website,        setWebsite]        = useState(init?.website        ?? "");
  const [whatYouDo,      setWhatYouDo]      = useState(init?.whatYouDo      ?? "");
  const [targetAudience, setTargetAudience] = useState(init?.targetAudience ?? "");
  const [ctaGoal,        setCtaGoal]        = useState(init?.ctaGoal        ?? "");
  const [selPlatforms,   setSelPlatforms]   = useState<string[]>(
    init?.platforms ? init.platforms.split(",").filter(Boolean) : []
  );
  const [voiceStyle,     setVoiceStyle]     = useState(init?.voiceStyle     ?? "");
  const [voiceExamples,  setVoiceExamples]  = useState(init?.voiceExamples  ?? "");
  const [voiceAvoid,     setVoiceAvoid]     = useState(init?.voiceAvoid     ?? "");
  const [linkInstagram,  setLinkInstagram]  = useState(init?.linkInstagram  ?? "");
  const [linkTiktok,     setLinkTiktok]     = useState(init?.linkTiktok     ?? "");
  const [linkLinkedin,   setLinkLinkedin]   = useState(init?.linkLinkedin   ?? "");
  const [linkYoutube,    setLinkYoutube]    = useState(init?.linkYoutube    ?? "");
  const [linkOther,      setLinkOther]      = useState(init?.linkOther      ?? "");
  const [extraNotes,     setExtraNotes]     = useState(init?.extraNotes     ?? "");

  const [files,      setFiles]      = useState<UploadEntry[]>(
    initialFiles.map(f => ({ id: f.id, filename: f.filename, fileUrl: f.fileUrl, fileSize: f.fileSize ?? 0, category: f.category }))
  );
  const [dragOver,   setDragOver]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Section completion
  const sec1Done = businessName.trim().length > 0;
  const sec2Done = files.some(f => !f.uploading && !f.error);
  const sec3Done = voiceStyle.length > 0;
  const sec4Done = [linkInstagram, linkTiktok, linkLinkedin, linkYoutube, linkOther].some(l => l.trim());

  const allCoreComplete = sec1Done && sec3Done;

  function togglePlatform(p: string) {
    setSelPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }

  async function uploadFile(file: File, category = "other") {
    const tempId = `temp-${Date.now()}-${Math.random()}`;
    setFiles(prev => [...prev, { id: tempId, filename: file.name, fileUrl: "", fileSize: file.size, category, uploading: true }]);

    const form = new FormData();
    form.append("file", file);
    form.append("category", category);

    try {
      const res  = await fetch(`/api/onboard/file?token=${token}`, { method: "POST", body: form });
      const data = await res.json() as any;

      if (res.ok) {
        setFiles(prev => prev.map(f => f.id === tempId
          ? { id: data.id, filename: data.filename, fileUrl: data.fileUrl, fileSize: data.fileSize, category: data.category }
          : f
        ));
      } else {
        setFiles(prev => prev.map(f => f.id === tempId ? { ...f, uploading: false, error: data.error ?? "Upload failed" } : f));
      }
    } catch {
      setFiles(prev => prev.map(f => f.id === tempId ? { ...f, uploading: false, error: "Network error" } : f));
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    Array.from(e.dataTransfer.files).forEach(f => uploadFile(f));
  }, [token]);

  async function removeFile(id: string) {
    setFiles(prev => prev.filter(f => f.id !== id));
    await fetch(`/api/onboard/file/${id}?token=${token}`, { method: "DELETE" }).catch(() => {});
  }

  async function updateCategory(id: string, category: string) {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, category } : f));
    await fetch(`/api/onboard/file/${id}?token=${token}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    }).catch(() => {});
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await fetch(`/api/onboard/submit?token=${token}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName, website, whatYouDo, targetAudience, ctaGoal,
          platforms: selPlatforms.join(","),
          voiceStyle, voiceExamples, voiceAvoid,
          linkInstagram, linkTiktok, linkLinkedin, linkYoutube, linkOther,
          extraNotes,
        }),
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  }

  // ─── Success screen ───────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-black text-white mb-3">You're all set!</h1>
        <p className="text-gray-400 max-w-sm text-base leading-relaxed">
          We've received everything we need. Our team will review your submission and get started on your content shortly.
        </p>
        <p className="text-gray-600 text-sm mt-6">You can safely close this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="bg-gray-950 px-4 py-5">
        <div className="max-w-2xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <span className="font-black text-white text-lg tracking-tight">Assurgit</span>
            <span className="text-gray-600 text-sm">·</span>
            <span className="text-gray-400 text-sm">Client Onboarding</span>
          </div>

          {/* Welcome */}
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
            Let's set you up for success.
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
            This takes about <strong className="text-gray-300">5–10 minutes</strong> and helps us create content that
            truly represents your brand. Be as specific as you can — the more we know, the better your videos will be.
          </p>

          {/* Progress pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { label: "Business",  done: sec1Done  },
              { label: "Assets",    done: sec2Done  },
              { label: "Voice",     done: sec3Done  },
              { label: "Profiles",  done: sec4Done  },
            ].map((s, i) => (
              <div key={i} className={cn(
                "flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-colors",
                s.done
                  ? "bg-emerald-950/60 border-emerald-700 text-emerald-400"
                  : "bg-white/5 border-white/10 text-gray-500"
              )}>
                {s.done ? <CheckCircle2 className="h-3 w-3" /> : <span className="h-3 w-3 rounded-full bg-white/10 flex-shrink-0" />}
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form ───────────────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Section 1: Business */}
        <Section
          number={1} complete={sec1Done} color="bg-blue-600"
          icon={<Building2 className="h-5 w-5 text-blue-600" />}
          title="About Your Business"
          subtitle="Help us understand who you are and what you offer so every video speaks directly to your audience."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Business Name *" hint="What should we call your brand?">
              <Input
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                placeholder="e.g. Well Prepped Life"
                className="bg-gray-50 border-gray-200"
              />
            </Field>
            <Field label="Website" hint="Your main website or landing page">
              <Input
                value={website}
                onChange={e => setWebsite(e.target.value)}
                placeholder="https://yoursite.com"
                type="url"
                className="bg-gray-50 border-gray-200"
              />
            </Field>
          </div>

          <Field label="What does your business do?" hint="Describe what you offer and the problem you solve for people">
            <Textarea
              value={whatYouDo}
              onChange={e => setWhatYouDo(e.target.value)}
              placeholder="e.g. We help family caregivers prepare nutritious meals in bulk so they don't burn out managing their own family and a loved one's care at the same time."
              className="bg-gray-50 border-gray-200 min-h-24 resize-none"
            />
          </Field>

          <Field label="Who is your ideal customer?" hint="Age, situation, pain points, what they're struggling with">
            <Textarea
              value={targetAudience}
              onChange={e => setTargetAudience(e.target.value)}
              placeholder="e.g. Adults 35–60 caring for an aging parent while raising their own family. Often overwhelmed, time-strapped, and looking for practical solutions they can actually implement."
              className="bg-gray-50 border-gray-200 min-h-24 resize-none"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="What's your #1 call to action?" hint="What do you want viewers to do after watching?">
              <Input
                value={ctaGoal}
                onChange={e => setCtaGoal(e.target.value)}
                placeholder="e.g. Book a free strategy call"
                className="bg-gray-50 border-gray-200"
              />
            </Field>
            <Field label="Target platforms" hint="Which platforms are your priority?">
              <div className="flex flex-wrap gap-1.5 pt-1">
                {PLATFORMS.map(p => (
                  <button
                    key={p}
                    onClick={() => togglePlatform(p)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm border transition-colors",
                      selPlatforms.includes(p)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        </Section>

        {/* Section 2: Assets */}
        <Section
          number={2} complete={sec2Done} color="bg-violet-600"
          icon={<FolderOpen className="h-5 w-5 text-violet-600" />}
          title="Your Brand Assets"
          subtitle="Upload anything we should know about your brand — logos, photos, existing videos, guides, or inspiration."
        >
          {/* Drop zone */}
          <div
            className={cn(
              "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer",
              dragOver ? "border-violet-400 bg-violet-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
            )}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className={cn("h-8 w-8 mx-auto mb-3", dragOver ? "text-violet-500" : "text-gray-300")} />
            <p className="font-semibold text-gray-700 text-sm">Drop files here or click to browse</p>
            <p className="text-gray-400 text-xs mt-1">PDF, Word, PowerPoint, images, videos — up to 100MB each</p>
          </div>
          <input
            ref={fileInputRef} type="file" multiple className="hidden"
            onChange={e => Array.from(e.target.files ?? []).forEach(f => uploadFile(f))}
          />

          {/* File list */}
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map(f => (
                <div key={f.id} className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border transition-colors",
                  f.error ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-100"
                )}>
                  <div className="shrink-0">
                    {f.uploading ? <Loader2 className="h-4 w-4 text-violet-500 animate-spin" /> : fileIcon(f.filename)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{f.filename}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {f.uploading && <span className="text-xs text-violet-500">Uploading…</span>}
                      {f.error && <span className="text-xs text-red-500">{f.error}</span>}
                      {!f.uploading && !f.error && (
                        <>
                          <span className="text-xs text-gray-400">{formatSize(f.fileSize)}</span>
                          <span className="text-gray-200">·</span>
                          <select
                            value={f.category}
                            onChange={e => updateCategory(f.id, e.target.value)}
                            className="text-xs text-gray-500 bg-transparent border-0 outline-none cursor-pointer hover:text-gray-800 p-0"
                          >
                            {FILE_CATEGORIES.map(c => (
                              <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                          </select>
                        </>
                      )}
                    </div>
                  </div>
                  {!f.uploading && (
                    <button
                      onClick={() => removeFile(f.id)}
                      className="shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-gray-300 hover:text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {files.length === 0 && (
            <p className="text-center text-xs text-gray-400 -mt-1">
              Don't worry if you don't have everything — you can always send files directly via email later.
            </p>
          )}
        </Section>

        {/* Section 3: Voice */}
        <Section
          number={3} complete={sec3Done} color="bg-amber-500"
          icon={<Mic2 className="h-5 w-5 text-amber-500" />}
          title="Your Brand Voice"
          subtitle="How should your content sound? This shapes everything from word choice to tone."
        >
          <Field label="Pick your primary style *" hint="Choose the one that feels most like you">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
              {VOICE_STYLES.map(s => (
                <button
                  key={s.value}
                  onClick={() => setVoiceStyle(s.value)}
                  className={cn(
                    "text-left px-4 py-3 rounded-xl border transition-colors",
                    voiceStyle === s.value
                      ? "bg-amber-50 border-amber-400 ring-1 ring-amber-400"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  )}
                >
                  <p className={cn("text-sm font-semibold", voiceStyle === s.value ? "text-amber-700" : "text-gray-800")}>
                    {s.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
                </button>
              ))}
            </div>
          </Field>

          <Field
            label="Paste examples of content you love"
            hint="Scripts, captions, videos, or brands you admire — even from competitors is fine"
          >
            <Textarea
              value={voiceExamples}
              onChange={e => setVoiceExamples(e.target.value)}
              placeholder="e.g. I love how Mel Robbins speaks — direct, no fluff, but still warm. Here's a caption I liked: ..."
              className="bg-gray-50 border-gray-200 min-h-28 resize-none"
            />
          </Field>

          <Field
            label="What should we avoid?"
            hint="Topics, phrases, humor, or styles that don't fit your brand"
          >
            <Textarea
              value={voiceAvoid}
              onChange={e => setVoiceAvoid(e.target.value)}
              placeholder="e.g. Avoid medical advice. Don't use slang or trending memes. Never position caregiving as easy or quick."
              className="bg-gray-50 border-gray-200 min-h-20 resize-none"
            />
          </Field>
        </Section>

        {/* Section 4: Profiles */}
        <Section
          number={4} complete={sec4Done} color="bg-emerald-600"
          icon={<Link2 className="h-5 w-5 text-emerald-600" />}
          title="Your Social Profiles"
          subtitle="Optional but helpful — we'll study your existing content to match your style and audience."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Instagram">
              <Input value={linkInstagram} onChange={e => setLinkInstagram(e.target.value)}
                placeholder="@handle or full URL" className="bg-gray-50 border-gray-200" />
            </Field>
            <Field label="TikTok">
              <Input value={linkTiktok} onChange={e => setLinkTiktok(e.target.value)}
                placeholder="@handle or full URL" className="bg-gray-50 border-gray-200" />
            </Field>
            <Field label="LinkedIn">
              <Input value={linkLinkedin} onChange={e => setLinkLinkedin(e.target.value)}
                placeholder="Profile or company URL" className="bg-gray-50 border-gray-200" />
            </Field>
            <Field label="YouTube">
              <Input value={linkYoutube} onChange={e => setLinkYoutube(e.target.value)}
                placeholder="Channel URL" className="bg-gray-50 border-gray-200" />
            </Field>
          </div>

          <Field
            label="Competitor or inspiration accounts"
            hint="Links to accounts or websites you want us to study for content ideas"
          >
            <Textarea
              value={linkOther}
              onChange={e => setLinkOther(e.target.value)}
              placeholder="e.g. https://instagram.com/someaccount, https://tiktok.com/@someone"
              className="bg-gray-50 border-gray-200 min-h-16 resize-none"
            />
          </Field>
        </Section>

        {/* Anything else */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-6">
          <h3 className="text-base font-bold text-gray-800 mb-1">Anything else we should know?</h3>
          <p className="text-xs text-gray-400 mb-3">
            Upcoming launches, sensitivities, your content history, seasonal trends — anything at all.
          </p>
          <Textarea
            value={extraNotes}
            onChange={e => setExtraNotes(e.target.value)}
            placeholder="Add any extra context here..."
            className="bg-gray-50 border-gray-200 min-h-20 resize-none"
          />
        </div>

        {/* Submit */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-6 text-center">
          {!allCoreComplete && (
            <p className="text-sm text-amber-600 bg-amber-50 rounded-lg px-4 py-2.5 mb-4 text-left">
              <strong>Almost there!</strong> Please fill in your business name and select a voice style before submitting.
            </p>
          )}
          <Button
            size="lg"
            className="w-full sm:w-auto px-10 text-base font-semibold h-12 rounded-xl"
            onClick={handleSubmit}
            disabled={submitting || !allCoreComplete}
          >
            {submitting ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting…</>
            ) : (
              <>Submit My Onboarding <ChevronRight className="h-4 w-4 ml-1" /></>
            )}
          </Button>
          <p className="text-xs text-gray-400 mt-3">
            Your information is kept private and used only to create your content.
          </p>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
