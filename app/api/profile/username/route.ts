import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { username } = await req.json();
  if (!username || typeof username !== "string") {
    return NextResponse.json({ error: "Invalid username" }, { status: 400 });
  }

  const slug = username.toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 32);

  const existing = await prisma.user.findUnique({ where: { username: slug } });
  if (existing && existing.id !== session.user.id) {
    return NextResponse.json({ error: "Username taken" }, { status: 409 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { username: slug },
  });

  return NextResponse.json({ ok: true, username: slug });
}
