import { getPgDb } from "@/lib/db/pg";
import { gbpSchedule } from "@/lib/db/pg-schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";

function getMonday(d: Date): string {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  return date.toISOString().split("T")[0];
}

/**
 * Generate N random, evenly-spaced posting times within a day window.
 * Window: 7:00 – 20:00 (780 minutes). Each time is randomised within its
 * equal-width segment so slots are spread out and never closer than ~1 hour.
 */
function generateTimes(n: number): string[] {
  if (n <= 0) return [];
  const START = 7 * 60;   // 7:00 in minutes
  const END   = 20 * 60;  // 20:00 in minutes
  const window = END - START;
  const segSize = Math.floor(window / n);

  const times: string[] = [];
  for (let i = 0; i < n; i++) {
    const segStart = START + i * segSize;
    // Pick randomly within the segment, keeping at least 10 min from the edge
    const margin = Math.min(10, Math.floor(segSize * 0.1));
    const lo = segStart + margin;
    const hi = segStart + segSize - margin;
    const mins = lo + Math.floor(Math.random() * (hi - lo));
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    times.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
  }
  return times;
}

// GET — fetch GBP schedule for a project + week
export async function GET(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  const weekOf = searchParams.get("weekOf") || getMonday(new Date());

  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  const db = getPgDb();
  const rows = await db.select().from(gbpSchedule)
    .where(and(eq(gbpSchedule.projectId, projectId), eq(gbpSchedule.weekOf, weekOf)));

  return Response.json({ weekOf, schedule: rows });
}

// POST — generate random GBP schedule for a project + week
// Body: { projectId, weekOf?, dayCounts: { "1": 2, "2": 3, ... } }
// dayCounts keys are dayOfWeek (1=Mon–5=Fri), values are posts per day.
// Missing days default to 2.
export async function POST(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { projectId, weekOf: requestedWeek, dayCounts } = await req.json() as {
    projectId: string;
    weekOf?: string;
    dayCounts?: Record<string, number>;
  };

  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  const weekOf = requestedWeek || getMonday(new Date());
  const db = getPgDb();

  await db.delete(gbpSchedule).where(
    and(eq(gbpSchedule.projectId, projectId), eq(gbpSchedule.weekOf, weekOf))
  );

  const rows = [];
  for (let dow = 1; dow <= 5; dow++) {
    const count = dayCounts?.[String(dow)] ?? 2;
    const times = generateTimes(count);
    const row = {
      id: nanoid(),
      projectId,
      dayOfWeek: dow,
      times: JSON.stringify(times),
      weekOf,
      createdAt: Date.now(),
    };
    await db.insert(gbpSchedule).values(row);
    rows.push({ ...row, times });
  }

  return Response.json({ weekOf, schedule: rows });
}

// DELETE — clear GBP schedule for a project + week
export async function DELETE(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  const weekOf = searchParams.get("weekOf") || getMonday(new Date());

  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  const db = getPgDb();
  await db.delete(gbpSchedule).where(
    and(eq(gbpSchedule.projectId, projectId), eq(gbpSchedule.weekOf, weekOf))
  );

  return Response.json({ deleted: true });
}
