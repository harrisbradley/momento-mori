import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { exportUserData, deleteUserAndData } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await exportUserData(session.user.id);

  return new NextResponse(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="memento-mori-export-${Date.now()}.json"`,
    },
  });
}

export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await deleteUserAndData(session.user.id);
  return NextResponse.json({ ok: true });
}
