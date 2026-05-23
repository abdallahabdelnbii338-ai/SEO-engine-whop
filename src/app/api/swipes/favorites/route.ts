import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@/lib/auth";
import { databaseUnavailableResponse, getDb } from "@/lib/api-db";

const schema = z.object({ swipeId: z.string() });

export async function GET() {
  const authUser = await getAuthUser();

  const db = getDb();
  if (!db) return NextResponse.json([]);

  const favorites = await db.swipeFavorite.findMany({
    where: { userId: authUser.id },
    select: { swipeId: true },
  });

  return NextResponse.json(favorites.map((f) => f.swipeId));
}

export async function POST(req: Request) {
  const authUser = await getAuthUser();

  const db = getDb();
  if (!db) return databaseUnavailableResponse();

  const { swipeId } = schema.parse(await req.json());

  await db.swipeFavorite.upsert({
    where: { userId_swipeId: { userId: authUser.id, swipeId } },
    create: { userId: authUser.id, swipeId },
    update: {},
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const authUser = await getAuthUser();

  const db = getDb();
  if (!db) return databaseUnavailableResponse();

  const { swipeId } = schema.parse(await req.json());

  await db.swipeFavorite.deleteMany({
    where: { userId: authUser.id, swipeId },
  });

  return NextResponse.json({ success: true });
}
