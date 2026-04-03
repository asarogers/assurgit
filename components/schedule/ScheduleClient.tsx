"use client";

import { useState, useEffect } from "react";

type Project = { id: string; name: string };
type ScheduleRow = {
  id: string; projectId: string; platform: string;
  dayOfWeek: number; time1: string; time2: string; weekOf: string;
};
type GbpScheduleRow = {
  id: string; projectId: string;
  dayOfWeek: number; time1: string; time2: string; weekOf: string;
};
type Card = {
  id: string; position: number; status: string;
  descInstagram: string; videoPath: string | null; finalVideoPath: string | null;
};
type GbpQueueItem = {
  id: string; type: "service" | "blog"; slug: string; title: string;
  body: string; url: string; status: "pending" | "posted"; postedAt: number | null; position: number;
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function getMonday(d: Date): string {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  return date.toISOString().split("T")[0];
}

function addWeeks(dateStr: string, weeks: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + weeks * 7);
  return d.toISOString().split("T")[0];
}

function fmt(t: string) {
  const [h, m] = t.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${h12}:${m} ${ampm}`;
}

export function ScheduleClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(initialProjects[0]?.id || "");
  const [weekOf, setWeekOf] = useState(getMonday(new Date()));
  const [tab, setTab] = useState<"instagram" | "google">("instagram");

  // Instagram state
  const [schedule, setSchedule] = useState<ScheduleRow[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  // GBP state
  const [gbpSchedule, setGbpSchedule] = useState<GbpScheduleRow[]>([]);
  const [gbpQueue, setGbpQueue] = useState<GbpQueueItem[]>([]);
  const [gbpLoading, setGbpLoading] = useState(false);
  const [gbpGenerating, setGbpGenerating] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);

  const fetchInstagram = async () => {
    if (!selectedProject) return;
    setLoading(true);
    const [sched, cardsRes] = await Promise.all([
      fetch(`/api/schedule?projectId=${selectedProject}&weekOf=${weekOf}`).then(r => r.json()) as Promise<{ schedule?: ScheduleRow[] }>,
      fetch(`/api/schedule/cards?projectId=${selectedProject}`).then(r => r.json()) as Promise<Card[]>,
    ]);
    setSchedule(sched.schedule || []);
    setCards(Array.isArray(cardsRes) ? cardsRes : []);
    setLoading(false);
  };

  const fetchGbp = async () => {
    if (!selectedProject) return;
    setGbpLoading(true);
    const [sched, queue] = await Promise.all([
      fetch(`/api/gbp-schedule?projectId=${selectedProject}&weekOf=${weekOf}`).then(r => r.json()) as Promise<{ schedule?: GbpScheduleRow[] }>,
      fetch(`/api/gbp-queue?projectId=${selectedProject}`).then(r => r.json()) as Promise<{ queue?: GbpQueueItem[] }>,
    ]);
    setGbpSchedule(sched.schedule || []);
    setGbpQueue(queue.queue || []);
    setGbpLoading(false);
  };

  useEffect(() => {
    if (tab === "instagram") fetchInstagram();
    else fetchGbp();
  }, [selectedProject, weekOf, tab]);

  // ---- Instagram actions ----
  const generate = async () => {
    setGenerating(true);
    const res = await fetch("/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: selectedProject, weekOf }),
    });
    const data = await res.json() as { schedule?: ScheduleRow[] };
    setSchedule(data.schedule || []);
    setGenerating(false);
  };

  const clearWeek = async () => {
    await fetch(`/api/schedule?projectId=${selectedProject}&weekOf=${weekOf}`, { method: "DELETE" });
    setSchedule([]);
  };

  // ---- GBP actions ----
  const generateGbp = async () => {
    setGbpGenerating(true);
    const res = await fetch("/api/gbp-schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: selectedProject, weekOf }),
    });
    const data = await res.json() as { schedule?: GbpScheduleRow[] };
    setGbpSchedule(data.schedule || []);
    setGbpGenerating(false);
  };

  const clearGbpWeek = async () => {
    await fetch(`/api/gbp-schedule?projectId=${selectedProject}&weekOf=${weekOf}`, { method: "DELETE" });
    setGbpSchedule([]);
  };

  const syncQueue = async () => {
    setSyncing(true);
    setSyncResult(null);
    const res = await fetch("/api/gbp-queue/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await res.json() as { added?: number };
    setSyncResult(`Added ${data.added ?? 0} new items`);
    await fetchGbp();
    setSyncing(false);
  };

  // Helpers
  const getRowForDay = (dow: number) => schedule.find((r) => r.dayOfWeek === dow);
  const getGbpRowForDay = (dow: number) => gbpSchedule.find((r) => r.dayOfWeek === dow);
  const getCardForSlot = (i: number) => cards[i] || null;

  // Next 2 pending GBP items for a given slot index (0-based across the week)
  const pendingQueue = gbpQueue.filter(q => q.status === "pending");
  const postedQueue  = gbpQueue.filter(q => q.status === "posted");
  const getGbpItemForSlot = (slotIndex: number) => pendingQueue[slotIndex] || null;

  const selectedName = projects.find((p) => p.id === selectedProject)?.name || "";

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 sm:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black mb-2">Posting Schedule</h1>
        <p className="text-gray-400 mb-6">Random posting times, Mon–Fri, 2x/day, 6+ hours apart.</p>

        {/* Controls row */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <button onClick={() => setWeekOf(addWeeks(weekOf, -1))} className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm">← Prev</button>
            <span className="text-sm text-gray-300 px-2">Week of {weekOf}</span>
            <button onClick={() => setWeekOf(addWeeks(weekOf, 1))} className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm">Next →</button>
          </div>

          {/* Platform tabs */}
          <div className="flex gap-1 bg-gray-900 border border-gray-700 rounded-lg p-1 ml-auto">
            <button
              onClick={() => setTab("instagram")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${tab === "instagram" ? "bg-pink-900/60 text-pink-300" : "text-gray-400 hover:text-white"}`}
            >Instagram</button>
            <button
              onClick={() => setTab("google")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${tab === "google" ? "bg-blue-900/60 text-blue-300" : "text-gray-400 hover:text-white"}`}
            >Google Posts</button>
          </div>
        </div>

        {/* ===== INSTAGRAM TAB ===== */}
        {tab === "instagram" && (
          <>
            <div className="flex gap-3 mb-8">
              <button onClick={generate} disabled={generating} className="bg-brand-accent hover:bg-brand-accent-hov text-white font-semibold px-5 py-2.5 rounded-lg text-sm disabled:opacity-50">
                {generating ? "Generating..." : "Generate Random Times"}
              </button>
              <button onClick={clearWeek} className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-5 py-2.5 rounded-lg text-sm">Clear Week</button>
            </div>

            {loading ? <p className="text-gray-500">Loading...</p> : schedule.length === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
                <p className="text-gray-400 mb-2">No Instagram schedule for this week.</p>
                <p className="text-gray-500 text-sm">Click &quot;Generate Random Times&quot; to create one.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {DAYS.map((day, i) => {
                  const row = getRowForDay(i + 1);
                  if (!row) return null;
                  const [h1, m1] = row.time1.split(":").map(Number);
                  const [h2, m2] = row.time2.split(":").map(Number);
                  const gap = ((h2 * 60 + m2) - (h1 * 60 + m1)) / 60;
                  const card1 = getCardForSlot(i * 2);
                  const card2 = getCardForSlot(i * 2 + 1);

                  return (
                    <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold">{day}</h3>
                        <span className="text-gray-500 text-xs">{gap.toFixed(1)}h apart</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[{ time: row.time1, card: card1, color: "blue" }, { time: row.time2, card: card2, color: "purple" }].map(({ time, card, color }) => (
                          <div key={time} className="bg-gray-800/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`bg-${color}-900/40 text-${color}-300 px-2.5 py-1 rounded-md text-xs font-mono`}>{fmt(time)}</span>
                              {card && <span className="text-gray-500 text-xs">Card {card.position}</span>}
                            </div>
                            {card ? (
                              <div className="flex gap-3">
                                {(card.finalVideoPath || card.videoPath) && (
                                  <video src={card.finalVideoPath || card.videoPath || undefined} className="w-20 h-20 rounded object-cover bg-black flex-shrink-0" muted playsInline preload="metadata" />
                                )}
                                <p className="text-gray-300 text-xs leading-relaxed line-clamp-4">{card.descInstagram || "No caption"}</p>
                              </div>
                            ) : <p className="text-gray-600 text-xs italic">No card assigned</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {cards.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">Approved Cards ({cards.length})</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cards.map((card) => (
                    <div key={card.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                      <span className="bg-green-900/40 text-green-300 px-2 py-0.5 rounded text-xs font-mono mb-2 inline-block">#{card.position}</span>
                      <div className="flex gap-3">
                        {(card.finalVideoPath || card.videoPath) && (
                          <video src={card.finalVideoPath || card.videoPath || undefined} className="w-20 h-20 rounded object-cover bg-black flex-shrink-0" muted playsInline preload="metadata" />
                        )}
                        <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">{card.descInstagram || "No caption"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-gray-600 text-xs mt-6">{selectedName} · Instagram · Times are randomized and unique per day.</p>
          </>
        )}

        {/* ===== GOOGLE POSTS TAB ===== */}
        {tab === "google" && (
          <>
            <div className="flex gap-3 mb-8 flex-wrap">
              <button onClick={generateGbp} disabled={gbpGenerating} className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm disabled:opacity-50">
                {gbpGenerating ? "Generating..." : "Generate Random Times"}
              </button>
              <button onClick={clearGbpWeek} className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-5 py-2.5 rounded-lg text-sm">Clear Week</button>
              <button onClick={syncQueue} disabled={syncing} className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-5 py-2.5 rounded-lg text-sm disabled:opacity-50 ml-auto">
                {syncing ? "Syncing..." : "Sync Queue from Website"}
              </button>
              {syncResult && <span className="text-green-400 text-sm self-center">{syncResult}</span>}
            </div>

            {/* Queue stats */}
            <div className="flex gap-4 mb-6">
              <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-center">
                <div className="text-2xl font-bold text-white">{pendingQueue.length}</div>
                <div className="text-xs text-gray-400 mt-0.5">Pending</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-center">
                <div className="text-2xl font-bold text-green-400">{postedQueue.length}</div>
                <div className="text-xs text-gray-400 mt-0.5">Posted</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-center">
                <div className="text-2xl font-bold text-blue-300">{gbpQueue.filter(q => q.type === "service").length}</div>
                <div className="text-xs text-gray-400 mt-0.5">Services</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-center">
                <div className="text-2xl font-bold text-purple-300">{gbpQueue.filter(q => q.type === "blog").length}</div>
                <div className="text-xs text-gray-400 mt-0.5">Blogs</div>
              </div>
            </div>

            {gbpLoading ? <p className="text-gray-500">Loading...</p> : gbpSchedule.length === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
                <p className="text-gray-400 mb-2">No Google Posts schedule for this week.</p>
                <p className="text-gray-500 text-sm">Click &quot;Generate Random Times&quot; to create one.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {DAYS.map((day, i) => {
                  const row = getGbpRowForDay(i + 1);
                  if (!row) return null;
                  const [h1, m1] = row.time1.split(":").map(Number);
                  const [h2, m2] = row.time2.split(":").map(Number);
                  const gap = ((h2 * 60 + m2) - (h1 * 60 + m1)) / 60;
                  const item1 = getGbpItemForSlot(i * 2);
                  const item2 = getGbpItemForSlot(i * 2 + 1);

                  return (
                    <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold">{day}</h3>
                        <span className="text-gray-500 text-xs">{gap.toFixed(1)}h apart</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {([{ time: row.time1, item: item1, color: "blue" }, { time: row.time2, item: item2, color: "teal" }] as const).map(({ time, item, color }) => (
                          <div key={time} className={`bg-gray-800/50 rounded-lg p-4`}>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`bg-${color}-900/40 text-${color}-300 px-2.5 py-1 rounded-md text-xs font-mono`}>{fmt(time)}</span>
                              {item && (
                                <span className={`text-xs px-2 py-0.5 rounded-full ${item.type === "service" ? "bg-blue-900/30 text-blue-400" : "bg-purple-900/30 text-purple-400"}`}>
                                  {item.type}
                                </span>
                              )}
                            </div>
                            {item ? (
                              <div>
                                <p className="text-white text-xs font-medium mb-1 truncate">{item.title}</p>
                                <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{item.body}</p>
                                <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-400 text-xs mt-1 inline-block hover:underline truncate max-w-full">{item.url}</a>
                              </div>
                            ) : <p className="text-gray-600 text-xs italic">Queue empty</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Full queue */}
            {gbpQueue.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">Full Queue ({gbpQueue.length} items)</h2>
                <div className="space-y-2">
                  {gbpQueue.map((item) => (
                    <div key={item.id} className={`flex items-start gap-3 bg-gray-900 border rounded-lg p-3 ${item.status === "posted" ? "border-green-900/40 opacity-60" : "border-gray-800"}`}>
                      <span className={`mt-0.5 text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${item.type === "service" ? "bg-blue-900/30 text-blue-400" : "bg-purple-900/30 text-purple-400"}`}>
                        {item.type}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-white font-medium truncate">{item.title}</p>
                        <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-blue-400 truncate block">{item.url}</a>
                      </div>
                      <span className={`text-xs flex-shrink-0 ${item.status === "posted" ? "text-green-400" : "text-gray-500"}`}>
                        {item.status === "posted" ? `✓ ${item.postedAt ? new Date(item.postedAt).toLocaleDateString() : "posted"}` : "pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-gray-600 text-xs mt-6">{selectedName} · Google Business Profile · Services first, then blogs.</p>
          </>
        )}
      </div>
    </div>
  );
}
