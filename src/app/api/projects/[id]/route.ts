import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { databaseUnavailableResponse, getDb } from "@/lib/api-db";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authUser = await getAuthUser();
  if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  if (!db) return databaseUnavailableResponse();

  const { id } = await params;

  const project = await db.project.findFirst({
    where: { id, userId: authUser.id },
  });

  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
