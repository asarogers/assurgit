import { getDb } from "@/lib/db";
import { gbpSchedule } from "@/lib/db/gbp-schema";
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

function randomTime(minHour: number, maxHour: number): string {
  const hour = minHour + Math.floor(Math.random() * (maxHour - minHour));
  const minute = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

// GET — fetch GBP schedule for a project + week
export async function GET(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  const weekOf = searchParams.get("weekOf") || getMonday(new Date());

  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  const db = getDb();
  const rows = await db.select().from(gbpSchedule)
    .where(and(eq(gbpSchedule.projectId, projectId), eq(gbpSchedule.weekOf, weekOf)));

  return Response.json({ weekOf, schedule: rows });
}

// POST — generate random GBP schedule for a project + week
export async function POST(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { projectId, weekOf: requestedWeek } = await req.json() as {
    projectId: string;
    weekOf?: string;
  };

  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  const weekOf = requestedWeek || getMonday(new Date());
  const db = getDb();

  await db.delete(gbpSchedule).where(
    and(eq(gbpSchedule.projectId, projectId), eq(gbpSchedule.weekOf, weekOf))
  );

  const rows = [];
  for (let dow = 1; dow <= 5; dow++) {
    // Morning: 7am-12pm, Afternoon: 2pm-7pm (guaranteed 6h+ apart)
    const t1 = randomTime(7, 12);
    const t2 = randomTime(14, 19);
    const row = {
      id: nanoid(),
      projectId,
      dayOfWeek: dow,
      time1: t1,
      time2: t2,
      weekOf,
      createdAt: Date.now(),
    };
    await db.insert(gbpSchedule).values(row);
    rows.push(row);
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

  const db = getDb();
  await db.delete(gbpSchedule).where(
    and(eq(gbpSchedule.projectId, projectId), eq(gbpSchedule.weekOf, weekOf))
  );

  return Response.json({ deleted: true });
}
