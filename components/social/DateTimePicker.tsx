"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarDays, Clock, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  value: string; // "YYYY-MM-DDTHH:MM"
  onChange: (value: string) => void;
}

/* ── helpers ───────────────────────────────────────────────────── */

function pad(n: number) { return n.toString().padStart(2, "0"); }

function toLocal(dt: Date): string {
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
}

function parseValue(v: string): { date: Date | null; time: string } {
  if (!v) return { date: null, time: "" };
  const [datePart, timePart] = v.split("T");
  if (!datePart) return { date: null, time: "" };
  const [y, mo, d] = datePart.split("-").map(Number);
  const date = new Date(y, mo - 1, d);
  return { date, time: timePart ?? "" };
}

function dayLabel(d: Date, today: Date): string {
  const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

const HOURS = Array.from({ length: 24 }, (_, h) => {
  const ampm = h >= 12 ? "PM" : "AM";
  const dh   = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return { label: `${dh}${ampm}`, value: h };
});

const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

/* ── mini calendar helpers ─────────────────────────────────────── */

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

/* ── component ─────────────────────────────────────────────────── */

export function DateTimePicker({ value, onChange }: Props) {
  const [open, setOpen]             = useState(false);
  const [showCal, setShowCal]       = useState(false);
  const [calYear,  setCalYear]      = useState(() => new Date().getFullYear());
  const [calMonth, setCalMonth]     = useState(() => new Date().getMonth());
  const [minInput, setMinInput]     = useState<string | null>(null); // null = grid mode
  const minInputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { date: selDate, time: selTime } = parseValue(value);

  /* close on outside click */
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const selHour = selTime ? parseInt(selTime.split(":")[0], 10) : null;
  const selMin  = selTime ? parseInt(selTime.split(":")[1], 10) : null;

  /* scroll selected hour into view */
  const hourRowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open && selHour !== null && hourRowRef.current) {
      const el = hourRowRef.current.querySelector(`[data-hour="${selHour}"]`);
      el?.scrollIntoView({ block: "nearest", inline: "center" });
    }
  }, [open, selHour]);

  function selectDate(d: Date) {
    const timeStr = selTime || "09:00";
    const dt = new Date(d);
    const [h, m] = timeStr.split(":").map(Number);
    dt.setHours(h, m, 0, 0);
    onChange(toLocal(dt));
    setShowCal(false);
  }

  function selectHour(h: number) {
    const base = selDate ?? today;
    const dt   = new Date(base);
    dt.setHours(h, selMin ?? 0, 0, 0);
    onChange(toLocal(dt));
  }

  function selectMinute(m: number) {
    const base = selDate ?? today;
    const dt   = new Date(base);
    dt.setHours(selHour ?? 9, m, 0, 0);
    onChange(toLocal(dt));
    if (selDate) setOpen(false);
  }

  function commitMinInput() {
    const v = parseInt(minInput ?? "", 10);
    if (!isNaN(v) && v >= 0 && v <= 59) selectMinute(v);
    setMinInput(null);
  }

  /* quick day strip — next 14 days */
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d;
  });

  /* trigger label */
  const triggerLabel = (() => {
    if (!value || !selDate) return "Pick date & time";
    const dStr = selDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    if (!selTime) return dStr;
    const [h, m] = selTime.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const dh = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${dStr} · ${dh}:${pad(m)} ${ampm}`;
  })();

  /* calendar grid */
  function CalendarGrid() {
    const daysInMonth   = getDaysInMonth(calYear, calMonth);
    const firstDow      = getFirstDayOfWeek(calYear, calMonth);
    const cells: (number | null)[] = [
      ...Array(firstDow).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    // pad to full weeks
    while (cells.length % 7 !== 0) cells.push(null);

    return (
      <div className="p-3">
        {/* month nav */}
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => { const d = new Date(calYear, calMonth - 1); setCalYear(d.getFullYear()); setCalMonth(d.getMonth()); }}
            className="p-1 rounded hover:bg-muted transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs font-semibold">
            {new Date(calYear, calMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </span>
          <button onClick={() => { const d = new Date(calYear, calMonth + 1); setCalYear(d.getFullYear()); setCalMonth(d.getMonth()); }}
            className="p-1 rounded hover:bg-muted transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        {/* day-of-week headers */}
        <div className="grid grid-cols-7 mb-1">
          {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
            <div key={d} className="text-center text-[10px] text-muted-foreground font-medium py-1">{d}</div>
          ))}
        </div>
        {/* day cells */}
        <div className="grid grid-cols-7 gap-0.5">
          {cells.map((day, i) => {
            if (!day) return <div key={i} />;
            const cellDate = new Date(calYear, calMonth, day);
            const isPast = cellDate < today;
            const isSel  = selDate ? isSameDay(cellDate, selDate) : false;
            const isTod  = isSameDay(cellDate, today);
            return (
              <button key={i}
                disabled={isPast}
                onClick={() => selectDate(cellDate)}
                className={`h-7 w-full rounded text-xs font-medium transition-colors
                  ${isSel  ? "bg-indigo-600 text-white" : ""}
                  ${isTod && !isSel ? "ring-1 ring-indigo-500 text-indigo-400" : ""}
                  ${isPast ? "opacity-25 cursor-not-allowed" : !isSel ? "hover:bg-muted" : ""}
                `}>
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      {/* trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 h-9 w-full px-3 text-sm border rounded-lg bg-background hover:bg-muted transition-colors text-left
          ${open ? "ring-1 ring-indigo-500 border-indigo-500" : ""}
          ${!value ? "text-muted-foreground" : "text-foreground"}
        `}
      >
        <CalendarDays className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <span className="flex-1 truncate">{triggerLabel}</span>
        {value && (
          <span
            role="button"
            onClick={(e) => { e.stopPropagation(); onChange(""); }}
            className="text-muted-foreground hover:text-foreground text-xs px-1"
          >✕</span>
        )}
      </button>

      {/* popover */}
      {open && (
        <div className="absolute z-50 top-10 left-0 w-72 bg-popover border rounded-xl shadow-xl overflow-hidden">

          {showCal ? (
            <>
              <CalendarGrid />
              <div className="px-3 pb-3">
                <button onClick={() => setShowCal(false)}
                  className="w-full text-xs text-muted-foreground hover:text-foreground py-1.5 border border-dashed rounded-lg transition-colors">
                  ← Back to quick pick
                </button>
              </div>
            </>
          ) : (
            <>
              {/* day strip */}
              <div className="p-2 border-b">
                <div className="flex gap-1 overflow-x-auto scrollbar-none pb-0.5">
                  {days.map((d, i) => {
                    const isSel = selDate ? isSameDay(d, selDate) : false;
                    return (
                      <button key={i}
                        onClick={() => selectDate(d)}
                        className={`shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors
                          ${isSel ? "bg-indigo-600 text-white" : "hover:bg-muted text-foreground"}`}>
                        {dayLabel(d, today)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* time picker — always visible */}
          <div className="border-t">
            {/* hour row */}
            <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Hour</span>
            </div>
            <div ref={hourRowRef} className="flex gap-1 overflow-x-auto scrollbar-none px-2 pb-2">
              {HOURS.map(({ label, value: h }) => (
                <button key={h}
                  data-hour={h}
                  onClick={() => selectHour(h)}
                  className={`shrink-0 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap
                    ${selHour === h ? "bg-indigo-600 text-white" : "hover:bg-muted text-foreground"}`}>
                  {label}
                </button>
              ))}
            </div>
            {/* minute row */}
            <div className="flex items-center gap-1.5 px-3 pb-1">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Minute</span>
              <span className="text-[10px] text-muted-foreground ml-auto pr-0.5">double-click to type</span>
            </div>
            {minInput !== null ? (
              <div className="px-2 pb-3 flex items-center gap-2">
                <input
                  ref={minInputRef}
                  type="number"
                  min={0}
                  max={59}
                  value={minInput}
                  onChange={(e) => setMinInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitMinInput();
                    if (e.key === "Escape") setMinInput(null);
                  }}
                  onBlur={commitMinInput}
                  autoFocus
                  className="w-16 h-8 rounded-lg border bg-background text-sm font-medium text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="0–59"
                />
                <span className="text-xs text-muted-foreground">Press Enter to apply</span>
              </div>
            ) : (
              <div className="grid grid-cols-6 gap-1 px-2 pb-3">
                {MINUTES.map((m) => (
                  <button key={m}
                    onClick={() => selectMinute(m)}
                    onDoubleClick={() => { setMinInput(pad(m)); setTimeout(() => minInputRef.current?.select(), 0); }}
                    className={`py-1.5 rounded-lg text-xs font-medium transition-colors
                      ${selMin === m ? "bg-indigo-600 text-white" : "hover:bg-muted text-foreground"}`}>
                    :{pad(m)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* footer */}
          {!showCal && (
            <div className="border-t px-3 py-2">
              <button onClick={() => { setCalYear(new Date().getFullYear()); setCalMonth(new Date().getMonth()); setShowCal(true); }}
                className="w-full text-xs text-muted-foreground hover:text-foreground py-1 transition-colors flex items-center justify-center gap-1">
                <CalendarDays className="h-3 w-3" /> Pick a specific date
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
