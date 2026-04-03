"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";

const personas = ["coaches", "consultants", "loan officers"];

const trustSignals = [
  "From $397/month",
  "5 videos every week",
  "Zero filming required",
  "No contracts",
  "Live in 5 days",
];

export default function Hero() {
  const [personaIndex, setPersonaIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Scroll progress over the hero section (0 = top, 1 = scrolled past)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Three-layer depth: orbs (back) move most, phone (mid) less, copy (front) least
  const orb1Y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -90]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 70]);
  const phoneY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -45]);
  const copyY  = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -20]);

  useEffect(() => {
    const id = setInterval(
      () => setPersonaIndex((i) => (i + 1) % personas.length),
      2500
    );
    return () => clearInterval(id);
  }, []);

  const currentPersona = personas[personaIndex];
  const captionPersona =
    currentPersona === "loan officers" ? "loan officer" : currentPersona.replace(/s$/, "");

  return (
    <section ref={sectionRef} className="relative bg-[#eff6ff] dark:bg-[#0a0f1e] min-h-screen flex items-center pt-24 pb-16 overflow-hidden">

      {/* Ambient orbs — visible in dark, subtle in light */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-100" aria-hidden="true">
        <motion.div style={{ y: orb1Y }} className="absolute top-[-10%] left-[-5%]">
          <div className="w-[600px] h-[600px] rounded-full bg-[#2563eb] blur-[130px] animate-orb" />
        </motion.div>
        <motion.div style={{ y: orb2Y }} className="absolute bottom-[-15%] right-[-5%]">
          <div className="w-[500px] h-[500px] rounded-full bg-[#1d4ed8] blur-[110px] animate-orb-2" />
        </motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Copy — slowest layer (front depth) ── */}
          <motion.div style={{ y: copyY }} className="text-center lg:text-left">

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563eb] dark:text-[#2563eb] mb-5"
            >
              AI Clone Content System
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-950 dark:text-white leading-[1.05] tracking-tight mb-4"
            >
              Your face.{" "}
              <br className="hidden sm:block" />
              Your voice.
            </motion.h1>

            {/* Rotating persona line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-baseline gap-3 justify-center lg:justify-start flex-wrap mb-6"
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-400 dark:text-white/50 leading-none tracking-tight">
                No filming for
              </span>
              <span
                className="relative inline-block overflow-hidden text-3xl sm:text-4xl lg:text-5xl font-black leading-none tracking-tight"
                style={{ minWidth: "clamp(160px, 22vw, 280px)", height: "1.2em" }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentPersona}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-110%", opacity: 0 }}
                    transition={{ duration: 0.38, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                  >
                    {currentPersona}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.45 }}
              className="text-slate-600 dark:text-slate-400 text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              We turn your expertise into 5 research-backed short-form videos every week — published to Instagram, TikTok, LinkedIn, and YouTube on autopilot.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 mb-5"
            >
              <Link
                href="/book"
                className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:-translate-y-1 glow-blue-btn text-center"
              >
                Book a Free Call
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto border border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 text-center"
              >
                See How It Works ↓
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.75 }}
              className="text-slate-600 dark:text-slate-500 text-sm mb-8 text-center lg:text-left"
            >
              Clients go live in 5 days.{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">No filming required after setup.</span>
            </motion.p>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.85 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2"
            >
              {trustSignals.map((signal) => (
                <span key={signal} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-500 text-xs font-medium">
                  <svg className="w-3.5 h-3.5 text-[#2563eb] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  {signal}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Product mock — mid layer ── */}
          <motion.div
            style={{ y: phoneY }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.7, ease: "easeOut" }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="animate-float relative w-[260px] sm:w-[290px]">

              {/* Phone frame */}
              <div
                className="relative bg-[#111827] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
                style={{ aspectRatio: "9/16" }}
              >
                {/* Top notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />

                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a]/60 to-[#0a0f1e]" />

                {/* Avatar silhouette */}
                <div className="absolute inset-x-0 top-[20%] bottom-[25%] flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/40 to-blue-700/40 blur-md" />
                  <div className="w-12 h-24 rounded-2xl bg-gradient-to-b from-blue-500/15 to-transparent mt-1" />
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 scale-150 rounded-full bg-[#2563eb] opacity-20 animate-pulse" />
                    <div className="relative w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-[#0a0f1e] ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Caption strip */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-10 pb-4 px-4">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={captionPersona}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white text-[11px] font-semibold leading-snug mb-3"
                    >
                      5 things every {captionPersona} needs to post this week
                    </motion.p>
                  </AnimatePresence>

                  {/* Platform icons */}
                  <div className="flex items-center gap-2">
                    {/* Instagram */}
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-md flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                    {/* TikTok */}
                    <div className="w-6 h-6 bg-black border border-white/20 rounded-md flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.35 6.35 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
                      </svg>
                    </div>
                    {/* LinkedIn */}
                    <div className="w-6 h-6 bg-[#0077b5] rounded-md flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    {/* YouTube */}
                    <div className="w-6 h-6 bg-[#ff0000] rounded-md flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                    <span className="text-white/40 text-[9px] ml-auto">auto-published</span>
                  </div>
                </div>

                {/* Live indicator */}
                <div className="absolute top-9 right-4 flex items-center gap-1 bg-black/60 rounded-full px-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[9px] text-white font-bold">LIVE</span>
                </div>
              </div>

              {/* Floating badge — weekly output */}
              <div className="absolute -left-10 top-[22%] bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-gray-100">
                <span className="text-lg">🎬</span>
                <div>
                  <p className="text-[10px] font-bold text-gray-900 leading-none">5 videos</p>
                  <p className="text-[9px] text-gray-500">this week</p>
                </div>
              </div>

              {/* Floating badge — zero filming */}
              <div className="absolute -right-8 bottom-[22%] bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-gray-100">
                <span className="text-lg">✅</span>
                <div>
                  <p className="text-[10px] font-bold text-gray-900 leading-none">0 hours</p>
                  <p className="text-[9px] text-gray-500">filming</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
