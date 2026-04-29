"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";

const personas = ["handymen", "salons", "barbers", "meal-prep services", "personal trainers", "chiropractors"];

const trustSignals = [
  "From $189/month",
  "$97 deposit to start",
  "You own everything",
  "Month-to-month after term",
  "Live in 1–2 weeks",
  "No per-lead fee, ever",
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
              Local Presence System
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 dark:text-white leading-[1.05] tracking-tight mb-4"
            >
              Get found and booked{" "}
              <br className="hidden sm:block" />
              on Google. Done for you.
            </motion.h1>

            {/* Rotating persona line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-baseline gap-3 justify-center lg:justify-start flex-wrap mb-6"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-400 dark:text-white/50 leading-none tracking-tight">
                Built for
              </span>
              <span
                className="relative inline-block overflow-hidden text-2xl sm:text-3xl lg:text-4xl font-black leading-none tracking-tight"
                style={{ minWidth: "clamp(220px, 30vw, 360px)", height: "1.2em" }}
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
              A done-for-you site, Google Business Profile, and local SEO — without the $1,500/mo retainer, the 6-month contract, or the &ldquo;we did some stuff this month&rdquo; report.
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
                Book a 15-min Intake Call
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
              Site goes live in 1–2 weeks.{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">You own the code, content, GBP, and domain — day one.</span>
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

          {/* ── RIGHT: Local-SEO mock — mid layer ── */}
          <motion.div
            style={{ y: phoneY }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.7, ease: "easeOut" }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="animate-float relative w-[280px] sm:w-[320px]">

              {/* Phone frame — Google Maps result mock */}
              <div
                className="relative bg-white rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden"
                style={{ aspectRatio: "9/16" }}
              >
                {/* Top notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-30" />

                {/* Map background — stylized */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0e3] via-[#dde7d8] to-[#cfe0c8]">
                  {/* Streets */}
                  <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 320 568" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 120 L320 80" stroke="#fff" strokeWidth="6" />
                    <path d="M0 220 L320 200" stroke="#fff" strokeWidth="4" />
                    <path d="M0 350 L320 360" stroke="#fff" strokeWidth="5" />
                    <path d="M80 0 L60 568" stroke="#fff" strokeWidth="4" />
                    <path d="M200 0 L220 568" stroke="#fff" strokeWidth="6" />
                    <path d="M260 0 L280 568" stroke="#fff" strokeWidth="3" />
                  </svg>
                  {/* Water blob */}
                  <div className="absolute top-[12%] right-[-10%] w-32 h-24 rounded-[50%] bg-blue-200/70 blur-sm" />
                </div>

                {/* Search bar overlay */}
                <div className="absolute top-12 left-3 right-3 bg-white rounded-full shadow-lg flex items-center gap-2 px-4 py-2.5 z-20">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 11h-2.06A6.99 6.99 0 0013 5.06V3h-2v2.06A6.99 6.99 0 005.06 11H3v2h2.06A6.99 6.99 0 0011 18.94V21h2v-2.06A6.99 6.99 0 0018.94 13H21v-2zm-9 6c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                  </svg>
                  <span className="text-[11px] text-gray-700 font-medium truncate">barber near me</span>
                </div>

                {/* Map pins */}
                <div className="absolute top-[28%] left-[28%] z-10" aria-hidden="true">
                  <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-md" />
                </div>
                <div className="absolute top-[42%] right-[22%] z-10" aria-hidden="true">
                  <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-md" />
                </div>
                {/* The featured pin — YOUR business */}
                <div className="absolute top-[33%] left-1/2 -translate-x-1/2 z-20">
                  <div className="relative">
                    <div className="absolute inset-0 scale-[2.5] rounded-full bg-[#2563eb] opacity-30 animate-pulse" />
                    <div className="relative w-9 h-9 rounded-full bg-[#2563eb] border-[3px] border-white shadow-xl flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">YOU</span>
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#2563eb] rotate-45" />
                  </div>
                </div>

                {/* Local 3-pack card overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-white pt-4 pb-5 px-4 rounded-t-3xl shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
                  {/* Drag handle */}
                  <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />

                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Top 3 in Maps</p>

                  {/* Result row 1 — featured */}
                  <div className="flex items-start gap-2.5 pb-3 mb-2 border-b border-gray-100">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">1</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={currentPersona}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-[11px] font-bold text-gray-900 leading-tight truncate"
                        >
                          Your {currentPersona === "salons" ? "salon" : currentPersona === "barbers" ? "barbershop" : currentPersona.replace(/s$/, "")}
                        </motion.p>
                      </AnimatePresence>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[9px] text-amber-500 font-bold">★ 4.9</span>
                        <span className="text-[9px] text-gray-400">(132)</span>
                        <span className="text-[9px] text-emerald-600 font-semibold">· Open</span>
                      </div>
                    </div>
                  </div>

                  {/* Result row 2 — competitor */}
                  <div className="flex items-start gap-2.5 pb-2 mb-1 opacity-60">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-[10px] font-black">2</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-gray-700 leading-tight truncate">Westside competitor</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[9px] text-amber-500 font-bold">★ 4.4</span>
                        <span className="text-[9px] text-gray-400">(48)</span>
                      </div>
                    </div>
                  </div>

                  {/* Result row 3 — competitor */}
                  <div className="flex items-start gap-2.5 opacity-50">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-[10px] font-black">3</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-gray-700 leading-tight truncate">Downtown competitor</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[9px] text-amber-500 font-bold">★ 4.2</span>
                        <span className="text-[9px] text-gray-400">(31)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge — rank improvement */}
              <div className="absolute -left-12 top-[24%] bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-gray-100">
                <span className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] font-bold text-gray-900 leading-none">Now ranking</p>
                  <p className="text-[10px] text-emerald-600 font-black">#1 in Maps</p>
                </div>
              </div>

              {/* Floating badge — GBP managed */}
              <div className="absolute -right-10 bottom-[28%] bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-gray-100">
                <span className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] font-bold text-gray-900 leading-none">GBP managed</p>
                  <p className="text-[9px] text-gray-500">You stay Owner</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
