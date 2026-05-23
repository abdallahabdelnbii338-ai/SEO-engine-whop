import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const authUser = await getAuthUser();

  try {
    const data = await getDashboardData(authUser.id);
    return NextResponse.json({
      ...data,
      generations: data.generations.map((g) => ({
        ...g,
        createdAt: g.createdAt.toISOString(),
      })),
      projects: data.projects.map((p) => ({
        ...p,
        updatedAt: p.updatedAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Dashboard overview API error:", error);
    return NextResponse.json({ error: "Failed to load dashboard" }, { status: 500 });
  }
}
