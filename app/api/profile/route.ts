import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.legacyProfile.findUnique({
    where: { userId: session.user.id },
    include: { identityGoals: { orderBy: { order: "asc" } }, finalMessages: true },
  });

  return NextResponse.json({ profile });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { identityGoals, funeralWishes, finalMessages } = await req.json();

  const existing = await prisma.legacyProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!existing) {
    await prisma.legacyProfile.create({
      data: {
        userId: session.user.id,
        funeralWishes: funeralWishes ?? null,
        identityGoals: {
          create: (identityGoals ?? []).map((text: string, i: number) => ({ text, order: i })),
        },
        finalMessages: {
          create: (finalMessages ?? []).map(
            (m: { toName?: string; body: string; isPublic?: boolean }) => ({
              toName: m.toName ?? null,
              body: m.body,
              isPublic: m.isPublic ?? false,
            })
          ),
        },
      },
    });
  } else {
    // Replace identity goals
    await prisma.identityGoal.deleteMany({ where: { profileId: existing.id } });
    await prisma.finalMessage.deleteMany({ where: { profileId: existing.id } });

    await prisma.legacyProfile.update({
      where: { id: existing.id },
      data: {
        funeralWishes: funeralWishes ?? null,
        identityGoals: {
          create: (identityGoals ?? []).map((text: string, i: number) => ({ text, order: i })),
        },
        finalMessages: {
          create: (finalMessages ?? []).map(
            (m: { toName?: string; body: string; isPublic?: boolean }) => ({
              toName: m.toName ?? null,
              body: m.body,
              isPublic: m.isPublic ?? false,
            })
          ),
        },
      },
    });
  }

  // Return updated username for redirect
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  return NextResponse.json({ ok: true, username: user?.username });
}
