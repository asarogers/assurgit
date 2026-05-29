"use client";

import { useState, useTransition } from "react";
import { submitIntake, type IntakeResult } from "./actions";

export default function IntakeForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<IntakeResult | null>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const r = await submitIntake(formData);
      setResult(r);
    });
  }

  if (result?.ok) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-900 p-6">
        <p className="text-emerald-900 dark:text-emerald-300 font-bold text-lg mb-2">
          Got it — we&rsquo;ll be in touch within 24 hours.
        </p>
        <p className="text-emerald-800 dark:text-emerald-400/90 text-sm leading-relaxed">
          {result.tier === "high-intent" ? (
            <>You named a platform <em>and</em> a deadline — that&rsquo;s the kind of thing we move fast on. Expect an email from a real person (not a sequence) with a custom mockup or audit attached.</>
          ) : result.tier === "warm" ? (
            <>We&rsquo;ll review what you&rsquo;ve tried and reply with a quick read on whether we can help and what tier fits. If it&rsquo;s a clear no, we&rsquo;ll tell you so.</>
          ) : (
            <>Thanks for reaching out. We&rsquo;ll send a few resources you might find useful, and reply within a few days.</>
          )}
        </p>
        <p className="text-emerald-700 dark:text-emerald-400/70 text-xs mt-4">
          Want to skip the wait? Use the calendar on the right to grab a 15-min slot.
        </p>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label htmlFor="business" className="block text-sm font-bold text-gray-900 dark:text-white mb-1.5">
          Your business name + city
        </label>
        <input
          id="business"
          name="business"
          type="text"
          required
          placeholder="e.g. Bay Area Plumbing — San Jose, CA"
          className="w-full h-12 px-4 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-bold text-gray-900 dark:text-white mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@yourbusiness.com"
          className="w-full h-12 px-4 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="tried" className="block text-sm font-bold text-gray-900 dark:text-white mb-1.5">
          What have you already tried?
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-1.5">
          Wix, Squarespace, an agency, a freelancer, nothing yet — be honest, it shapes our reply.
        </p>
        <textarea
          id="tried"
          name="tried"
          required
          rows={4}
          placeholder="e.g. I&rsquo;ve been on Wix for 2 years and I&rsquo;m on page 3 of Google. Tried an agency for $1,800/mo — they showed me reports but my phone didn&rsquo;t ring."
          className="w-full px-4 py-3 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent resize-y"
        />
      </div>

      <div>
        <label htmlFor="deadline" className="block text-sm font-bold text-gray-900 dark:text-white mb-1.5">
          Is there a date you need this live by? <span className="font-normal text-gray-500">(optional)</span>
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-1.5">
          Grand opening, lease signing, seasonal push — anything that pins a date.
        </p>
        <input
          id="deadline"
          name="deadline"
          type="text"
          placeholder="e.g. Spring 2026 grand opening, or June 15"
          className="w-full h-12 px-4 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
        />
      </div>

      {result && !result.ok && (
        <p className="text-sm text-red-600 dark:text-red-400 font-medium">{result.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full h-14 bg-[#2563eb] hover:bg-[#1d4ed8] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-base rounded-xl transition-all duration-200 hover:-translate-y-0.5 glow-blue-btn"
      >
        {pending ? "Sending…" : "Send it — reply within 24 hours →"}
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
        We answer real emails from real humans. No drip sequences.
      </p>
    </form>
  );
}
