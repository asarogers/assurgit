import { createOwnerSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json() as { password: string };

  if (password !== process.env.OWNER_PASSWORD) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await createOwnerSession();

  const res = NextResponse.json({ ok: true });
  res.cookies.set("owner_session", token, {
    httpOnly: true,
    sameSite: "lax",
    path:     "/",
    maxAge:   60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
