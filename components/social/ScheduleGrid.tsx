"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Shuffle, Save, Plus, X, Loader2, Zap } from "lucide-react";
import { toast } from "sonner";
import type { PostingSchedule } from "@/lib/db/schedule-schema";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DOWS = [1, 2, 3, 4, 5] as const;

function getMonday(d = new Date()): string {
  const date = new Date(d);
  const day  = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  return date.toISOString().split("T")[0];
}

function shiftWeek(dateStr: string, n: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + n * 7);
  return d.toISOString().split("T")[0];
}

function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

function fmtDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// rows[i][dow] = time string — rows is an array of "row objects"
// Each row represents one posting slot across all days
type RowSet = string[][]; // rowSet[rowIndex][dowIndex 0-4] = time

function scheduleToRowSet(schedule: PostingSchedule[]): RowSet {
  const slots = schedule.filter((r) => r.platform === "all");

  // Build per-day sorted time arrays
  const byDow: string[][] = DOWS.map((dow) =>
    slots.filter((r) => r.dayOfWeek === dow).map((r) => r.time).sort()
  );

  // How many rows we need = max times in any day
  const rowCount = Math.max(0, ...byDow.map((t) => t.length));
  if (rowCount === 0) return [];

  // Transpose: rowSet[r][d] = byDow[d][r] ?? ""
  return Array.from({ length: rowCount }, (_, r) =>
    DOWS.map((_, d) => byDow[d][r] ?? "")
  );
}

interface Props {
  projectId: string;
}

export function ScheduleGrid({ projectId }: Props) {
  const today = getMonday();
  const [weekOf,      setWeekOf]      = useState(today);
  const [rows,        setRows]        = useState<RowSet>([]);
  const [loading,     setLoading]     = useState(false);
  const [saving,      setSaving]      = useState(false);
  const [randomizing, setRandomizing] = useState(false);
  const [postingNow,  setPostingNow]  = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/schedule?projectId=${projectId}&weekOf=${weekOf}`);
    if (res.ok) {
      const { schedule } = await res.json() as { weekOf: string; schedule: PostingSchedule[] };
      setRows(scheduleToRowSet(schedule));
    }
    setLoading(false);
  }, [projectId, weekOf]);

  useEffect(() => { load(); }, [load]);

  async function randomize() {
    if (rows.length === 0) { toast.error("Add at least one row first"); return; }
    setRandomizing(true);
    const slotsPerDay           = rows.length;
    const timezoneOffsetMinutes = new Date().getTimezoneOffset();
    const res = await fetch("/api/schedule", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ projectId, platform: "all", weekOf, slotsPerDay, timezoneOffsetMinutes }),
    });
    if (res.ok) {
      const { schedule } = await res.json() as { weekOf: string; schedule: PostingSchedule[] };
      setRows(scheduleToRowSet(schedule));
      toast.success("Week randomized");
    } else {
      toast.error("Failed to randomize");
    }
    setRandomizing(false);
  }

  async function save() {
    setSaving(true);
    // Convert rowSet back to per-day times
    const days = DOWS.map((dow, d) => ({
      dayOfWeek: dow,
      times: rows.map((row) => row[d]).filter(Boolean),
    }));
    const res = await fetch("/api/schedule", {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ projectId, platform: "all", weekOf, days }),
    });
    if (res.ok) {
      toast.success("Schedule saved");
    } else {
      toast.error("Failed to save");
    }
    setSaving(false);
  }

  function addRow() {
    setRows((prev) => [...prev, DOWS.map(() => "")]);
  }

  function removeRow(rowIdx: number) {
    setRows((prev) => prev.filter((_, i) => i !== rowIdx));
  }

  async function postNow() {
    setPostingNow(true);
    const res = await fetch("/api/schedule", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ projectId, postNow: true, rowCount: rows.length, postNowTime: (() => { const d = new Date(Date.now() + 2 * 60 * 1000); return `${d.getHours().toString().padStart(2,"0")}:${d.getMinutes().toString().padStart(2,"0")}`; })() }),
    });
    if (res.ok) {
      const { posted, slots, time, message } = await res.json() as { posted: number; slots: number; time?: string; message?: string };
      if (slots === 0) {
        toast.info(message ?? "No slots configured for today");
      } else {
        // Fill today's column in the first empty row with the scheduled time
        if (time) {
          const jsDow    = new Date().getDay();
          const todayDow = jsDow === 0 ? 7 : jsDow;
          const dowIdx   = todayDow - 1; // 0=Mon..4=Fri
          setRows((prev) => {
            const next = prev.map((row) => [...row]);
            const emptyRowIdx = next.findIndex((row) => !row[dowIdx]);
            if (emptyRowIdx !== -1) next[emptyRowIdx][dowIdx] = time;
            return next;
          });
        }
        // Fire post-all.py via local trigger server
        fetch("http://127.0.0.1:7799/run", { method: "POST" }).catch(() => {});
        toast.success(`${posted} YouTube post${posted !== 1 ? "s" : ""} queued · local platforms firing now`);
      }
    } else {
      toast.error("Failed to queue posts");
    }
    setPostingNow(false);
  }

  function updateCell(rowIdx: number, dowIdx: number, value: string) {
    setRows((prev) => prev.map((row, r) =>
      r === rowIdx ? row.map((t, d) => (d === dowIdx ? value : t)) : row
    ));
  }

  return (
    <div className="border-b px-5 py-3 shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setWeekOf(shiftWeek(weekOf, -1))}
            className="p-0.5 rounded hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <span className="text-xs font-medium tabular-nums select-none">
            {fmtDate(weekOf)} – {fmtDate(addDays(weekOf, 4))}
          </span>
          <button
            onClick={() => setWeekOf(shiftWeek(weekOf, 1))}
            className="p-0.5 rounded hover:bg-muted transition-colors"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
          {weekOf !== today && (
            <button
              onClick={() => setWeekOf(today)}
              className="ml-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Today
            </button>
          )}
        </div>
        <div className="flex gap-1.5">
          <Button
            size="sm" variant="outline" className="h-6 text-xs gap-1 px-2"
            onClick={randomize} disabled={randomizing || saving || postingNow}
          >
            {randomizing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Shuffle className="h-3 w-3" />}
            Randomize
          </Button>
          <Button
            size="sm" variant="outline" className="h-6 text-xs gap-1 px-2 text-amber-600 border-amber-600/40 hover:bg-amber-50 dark:hover:bg-amber-950/30"
            onClick={postNow} disabled={postingNow || saving || randomizing}
          >
            {postingNow ? <Loader2 className="h-3 w-3 animate-spin" /> : <Zap className="h-3 w-3" />}
            Post Now
          </Button>
          <Button
            size="sm" className="h-6 text-xs gap-1 px-2"
            onClick={save} disabled={saving || randomizing || postingNow}
          >
            {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
            Save
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-3">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-1">
          {/* Column headers */}
          <div className="grid gap-2" style={{ gridTemplateColumns: "1.25rem repeat(5, 1fr)" }}>
            <div />
            {DAYS.map((d) => (
              <p key={d} className="text-xs text-center text-muted-foreground font-medium">{d}</p>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="grid gap-2 items-center" style={{ gridTemplateColumns: "1.25rem repeat(5, 1fr)" }}>
              <button
                onClick={() => removeRow(rowIdx)}
                className="text-muted-foreground hover:text-destructive transition-colors"
                title="Remove row"
              >
                <X className="h-3 w-3" />
              </button>
              {row.map((time, dowIdx) => (
                <Input
                  key={dowIdx}
                  type="time"
                  value={time}
                  onChange={(e) => updateCell(rowIdx, dowIdx, e.target.value)}
                  className="h-7 text-xs px-1.5 text-center"
                />
              ))}
            </div>
          ))}

          {/* Add row button */}
          <div className="grid gap-2" style={{ gridTemplateColumns: "1.25rem repeat(5, 1fr)" }}>
            <div />
            <div className="col-span-5">
              <button
                onClick={addRow}
                className="w-full flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors py-1 border border-dashed rounded hover:border-foreground/30"
              >
                <Plus className="h-3 w-3" /> Add row
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
