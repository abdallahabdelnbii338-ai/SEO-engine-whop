import { NextResponse } from "next/server";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { getAuthUser } from "@/lib/auth";
import { databaseUnavailableResponse, getDb } from "@/lib/api-db";

const schema = z.object({
  type: z.enum(["landing", "programmatic", "blog", "metadata", "keywords"]),
  title: z.string().min(1),
  input: z.record(z.string(), z.unknown()),
  output: z.record(z.string(), z.unknown()),
  projectId: z.string().optional(),
});

export async function GET(req: Request) {
  const authUser = await getAuthUser();
  if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  if (!db) return databaseUnavailableResponse();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const generations = await db.generation.findMany({
    where: {
      userId: authUser.id,
      ...(type ? { type } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { project: { select: { name: true } } },
  });

  return NextResponse.json(generations);
}

export async function POST(req: Request) {
  const authUser = await getAuthUser();
  if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  if (!db) return databaseUnavailableResponse();

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const generation = await db.generation.create({
      data: {
        userId: authUser.id,
        type: data.type,
        title: data.title,
        input: data.input as Prisma.InputJsonValue,
        output: data.output as Prisma.InputJsonValue,
        projectId: data.projectId,
      },
    });

    return NextResponse.json(generation);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to save generation" }, { status: 500 });
  }
}
