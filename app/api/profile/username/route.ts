import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { findUserByUsername, updateUserUsername } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { success } = rateLimit(`username:${session.user.id}`, 10, 60 * 1000);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { username } = await req.json();
  if (!username || typeof username !== "string") {
    return NextResponse.json({ error: "Invalid username" }, { status: 400 });
  }

  const slug = username.toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 32);

  const existing = await findUserByUsername(slug);
  if (existing && existing.id !== session.user.id) {
    return NextResponse.json({ error: "Username taken" }, { status: 409 });
  }

  await updateUserUsername(session.user.id, slug);
  return NextResponse.json({ ok: true, username: slug });
}
