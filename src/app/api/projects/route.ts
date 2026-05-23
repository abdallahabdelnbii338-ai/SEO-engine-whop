import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@/lib/auth";
import { databaseUnavailableResponse, getDb } from "@/lib/api-db";

const createSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
});

export async function GET() {
  const authUser = await getAuthUser();

  const db = getDb();
  if (!db) return databaseUnavailableResponse();

  const projects = await db.project.findMany({
    where: { userId: authUser.id },
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { generations: true } },
    },
  });

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const authUser = await getAuthUser();

  const db = getDb();
  if (!db) return databaseUnavailableResponse();

  try {
    const body = await req.json();
    const data = createSchema.parse(body);

    const project = await db.project.create({
      data: {
        userId: authUser.id,
        name: data.name,
        description: data.description,
      },
    });

    return NextResponse.json(project);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
