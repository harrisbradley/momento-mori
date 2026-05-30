import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getProfileByUserId, upsertProfile, getUserById } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await getProfileByUserId(session.user.id);
  return NextResponse.json({ profile });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { success } = rateLimit(`profile:${session.user.id}`, 10, 60 * 1000);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { identityGoals, funeralWishes, finalMessages } = await req.json();

  await upsertProfile(session.user.id, {
    funeralWishes,
    identityGoals,
    finalMessages,
  });

  // Return updated username for redirect
  const user = await getUserById(session.user.id);
  return NextResponse.json({
    ok: true,
    username: (user as Record<string, unknown>)?.username ?? null,
  });
}
