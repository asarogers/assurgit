import { getDb } from "@/lib/db";
import { postingSchedule } from "@/lib/db/schedule-schema";
import { scheduledPosts, socialAccounts } from "@/lib/db/social-schema";
import { gbpSchedule } from "@/lib/db/gbp-schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { eq, and, inArray, asc } from "drizzle-orm";
import { nanoid } from "nanoid";

function getMonday(d: Date): string {
  const date = new Date(d);
  const day  = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  return date.toISOString().split("T")[0];
}

function randomTime(minHour: number, maxHour: number): string {
  const hour   = minHour + Math.floor(Math.random() * (maxHour - minHour));
  const minute = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

function generateWeekSlots(
  projectId: string, platform: string, weekOf: string, slotsPerDay: number
): typeof postingSchedule.$inferInsert[] {
  const rows: typeof postingSchedule.$inferInsert[] = [];

  for (let dow = 1; dow <= 5; dow++) {
    const usedHours: number[] = [];

    // First half of day slots (7am–12pm), second half (1pm–8pm)
    const windows = [
      { min: 7,  max: 12 },
      { min: 14, max: 20 },
    ];

    for (let i = 0; i < slotsPerDay; i++) {
      const { min, max } = windows[i % windows.length];
      let time: string;
      let attempts = 0;
      do {
        time = randomTime(min, max);
        attempts++;
      } while (usedHours.includes(parseInt(time)) && attempts < 50);
      usedHours.push(parseInt(time));

      rows.push({
        id:        nanoid(),
        projectId,
        platform,
        dayOfWeek: dow,
        time,
        weekOf,
        createdAt: Date.now(),
      });
    }
  }

  return rows;
}

// Convert weekOf (Monday YYYY-MM-DD) + dayOfWeek (1=Mon) + time (HH:MM) to UTC ms
// timezoneOffsetMinutes = client's Date.getTimezoneOffset() (+420 for PDT)
function slotToUtcMs(weekOf: string, dayOfWeek: number, time: string, tzOffsetMinutes: number): number {
  const [h, m]    = time.split(":").map(Number);
  const monday    = new Date(weekOf + "T00:00:00Z");
  const dayOffset = dayOfWeek - 1; // Mon=0, Fri=4
  // local midnight of that day in ms
  const localMidnightMs = monday.getTime() + dayOffset * 86400000 + tzOffsetMinutes * 60000;
  return localMidnightMs + h * 3600000 + m * 60000;
}

async function clearWeek(db: ReturnType<typeof getDb>, projectId: string, platform: string, weekOf: string) {
  await db.delete(postingSchedule).where(and(
    eq(postingSchedule.projectId, projectId),
    eq(postingSchedule.platform,  platform),
    eq(postingSchedule.weekOf,    weekOf),
  ));
}

// GET — fetch schedule for a project + week
export async function GET(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  const weekOf    = searchParams.get("weekOf") || getMonday(new Date());

  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  const db   = getDb();
  const rows = await db.select().from(postingSchedule)
    .where(and(
      eq(postingSchedule.projectId, projectId),
      eq(postingSchedule.weekOf,    weekOf),
    ));

  return Response.json({ weekOf, schedule: rows });
}

// POST — generate random schedule (slotsPerDay defaults to 2)
export async function POST(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const {
    projectId,
    platform               = "all",
    weekOf:                requestedWeek,
    slotsPerDay            = 2,
    timezoneOffsetMinutes  = 0,
    postNow                = false,
    rowCount,
    postNowTime,
  } = await req.json() as {
    projectId:               string;
    platform?:               string;
    weekOf?:                 string;
    slotsPerDay?:            number;
    timezoneOffsetMinutes?:  number;
    postNow?:                boolean;
    rowCount?:               number;
    postNowTime?:            string;
  };

  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  // "Post Now" — insert a posting_schedule slot for now+2min AND set YouTube scheduledFor=now
  if (postNow) {
    const db       = getDb();
    const now      = Date.now();
    const weekOf   = getMonday(new Date());
    const jsDow    = new Date().getDay();
    const todayDow = jsDow === 0 ? 7 : jsDow;

    // Use rowCount from UI if provided, otherwise fall back to DB query
    let slotCount = rowCount ?? 0;
    if (!rowCount) {
      const todaySlots = await db.select().from(postingSchedule)
        .where(and(
          eq(postingSchedule.projectId, projectId),
          eq(postingSchedule.platform,  "all"),
          eq(postingSchedule.weekOf,    weekOf),
          eq(postingSchedule.dayOfWeek, todayDow),
        ));
      slotCount = todaySlots.length;
    }

    if (slotCount === 0) {
      return Response.json({ posted: 0, slots: 0, message: "No slots configured for today" });
    }

    // Insert a posting_schedule row for now+2min so cron.py picks it up
    // Use client-provided time (already in local timezone) or fall back to server UTC
    const time = postNowTime ?? (() => {
      const d = new Date(now + 2 * 60 * 1000);
      return `${d.getUTCHours().toString().padStart(2, "0")}:${d.getUTCMinutes().toString().padStart(2, "0")}`;
    })();
    await db.insert(postingSchedule).values({
      id:        nanoid(),
      projectId,
      platform:  "all",
      dayOfWeek: todayDow,
      time,
      weekOf,
      createdAt: now,
    });

    // Schedule that many YouTube posts for right now (Cloudflare cron picks them up)
    const pending = await db
      .select({ post: scheduledPosts })
      .from(scheduledPosts)
      .innerJoin(socialAccounts, eq(scheduledPosts.socialAccountId, socialAccounts.id))
      .where(and(
        eq(scheduledPosts.projectId, projectId),
        inArray(scheduledPosts.status, ["draft", "scheduled"]),
        eq(socialAccounts.platform, "youtube"),
      ))
      .orderBy(asc(scheduledPosts.createdAt))
      .limit(slotCount);

    for (const { post } of pending) {
      await db.update(scheduledPosts)
        .set({ scheduledFor: now, status: "scheduled", updatedAt: now })
        .where(eq(scheduledPosts.id, post.id));
    }
    return Response.json({ posted: pending.length, slots: slotCount, time });
  }

  if (slotsPerDay === 0) return Response.json({ weekOf: requestedWeek ?? getMonday(new Date()), schedule: [] });

  const weekOf = requestedWeek || getMonday(new Date());
  const db     = getDb();

  await clearWeek(db, projectId, platform, weekOf);

  const rows = generateWeekSlots(projectId, platform, weekOf, slotsPerDay);
  for (const row of rows) {
    await db.insert(postingSchedule).values(row);
  }

  // Auto-schedule any draft/pending IG+YT posts for this project
  const pendingPosts = await db
    .select({ post: scheduledPosts, account: socialAccounts })
    .from(scheduledPosts)
    .innerJoin(socialAccounts, eq(scheduledPosts.socialAccountId, socialAccounts.id))
    .where(and(
      eq(scheduledPosts.projectId, projectId),
      inArray(scheduledPosts.status, ["draft", "scheduled"]),
      inArray(socialAccounts.platform, ["instagram", "youtube"]),
    ));

  if (pendingPosts.length > 0) {
    const sortedSlots = [...rows].sort((a, b) =>
      a.dayOfWeek - b.dayOfWeek || a.time.localeCompare(b.time)
    );
    for (let i = 0; i < pendingPosts.length; i++) {
      const slot         = sortedSlots[i % sortedSlots.length];
      const scheduledFor = slotToUtcMs(weekOf, slot.dayOfWeek, slot.time, timezoneOffsetMinutes);
      await db.update(scheduledPosts)
        .set({ scheduledFor, status: "scheduled", updatedAt: Date.now() })
        .where(eq(scheduledPosts.id, pendingPosts[i].post.id));
    }
  }

  // Also populate gbp_schedule — first 2 slots per day, used by google-post/cron.py
  await db.delete(gbpSchedule).where(and(
    eq(gbpSchedule.projectId, projectId),
    eq(gbpSchedule.weekOf,    weekOf),
  ));
  const byDay = new Map<number, string[]>();
  for (const row of rows) {
    if (!byDay.has(row.dayOfWeek)) byDay.set(row.dayOfWeek, []);
    byDay.get(row.dayOfWeek)!.push(row.time);
  }
  for (const [dow, times] of byDay) {
    const sorted = [...times].sort();
    await db.insert(gbpSchedule).values({
      id:        nanoid(),
      projectId,
      dayOfWeek: dow,
      time1:     sorted[0],
      time2:     sorted[1] ?? sorted[0],
      weekOf,
      createdAt: Date.now(),
    });
  }

  return Response.json({ weekOf, schedule: rows });
}

// PUT — save manually edited schedule
// Body: { projectId, platform?, weekOf, days: { dayOfWeek, times: string[] }[] }
export async function PUT(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const {
    projectId,
    platform = "all",
    weekOf,
    days,
  } = await req.json() as {
    projectId: string;
    platform?: string;
    weekOf:    string;
    days:      { dayOfWeek: number; times: string[] }[];
  };

  if (!projectId || !weekOf || !Array.isArray(days))
    return Response.json({ error: "projectId, weekOf, and days required" }, { status: 400 });

  const db = getDb();
  await clearWeek(db, projectId, platform, weekOf);

  for (const { dayOfWeek, times } of days) {
    for (const time of times) {
      if (!time) continue;
      await db.insert(postingSchedule).values({
        id:        nanoid(),
        projectId,
        platform,
        dayOfWeek,
        time,
        weekOf,
        createdAt: Date.now(),
      });
    }
  }

  return Response.json({ ok: true });
}

// DELETE — clear schedule for a project + week
export async function DELETE(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  const weekOf    = searchParams.get("weekOf") || getMonday(new Date());

  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  const db = getDb();
  await db.delete(postingSchedule).where(and(
    eq(postingSchedule.projectId, projectId),
    eq(postingSchedule.weekOf,    weekOf),
  ));

  return Response.json({ deleted: true });
}
