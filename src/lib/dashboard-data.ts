import { isDatabaseConfigured } from "@/lib/db-config";
import { requirePrisma } from "@/lib/prisma";

export type DashboardData = {
  generations: {
    id: string;
    type: string;
    title: string;
    createdAt: Date;
  }[];
  projects: {
    id: string;
    name: string;
    description: string | null;
    updatedAt: Date;
    _count: { generations: number };
  }[];
  generationCount: number;
  projectCount: number;
  toolsUsed: string[];
  favoriteSwipeIds: string[];
};

const EMPTY: DashboardData = {
  generations: [],
  projects: [],
  generationCount: 0,
  projectCount: 0,
  toolsUsed: [],
  favoriteSwipeIds: [],
};

export async function getDashboardData(userId: string): Promise<DashboardData> {
  if (!isDatabaseConfigured()) return EMPTY;

  try {
    const db = requirePrisma();

    const [generations, projects, generationCount, projectCount, typeCounts, favorites] =
      await Promise.all([
        db.generation.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
          take: 8,
          select: { id: true, type: true, title: true, createdAt: true },
        }),
        db.project.findMany({
          where: { userId },
          orderBy: { updatedAt: "desc" },
          take: 6,
          include: { _count: { select: { generations: true } } },
        }),
        db.generation.count({ where: { userId } }),
        db.project.count({ where: { userId } }),
        db.generation.groupBy({
          by: ["type"],
          where: { userId },
          _count: true,
        }),
        db.swipeFavorite.findMany({
          where: { userId },
          select: { swipeId: true },
          take: 6,
        }),
      ]);

    return {
      generations,
      projects,
      generationCount,
      projectCount,
      toolsUsed: typeCounts.map((t) => t.type),
      favoriteSwipeIds: favorites.map((f) => f.swipeId),
    };
  } catch (error) {
    console.error("getDashboardData failed:", error);
    return EMPTY;
  }
}
