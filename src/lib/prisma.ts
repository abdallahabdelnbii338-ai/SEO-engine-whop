import { PrismaClient } from "@prisma/client";
import { isDatabaseConfigured } from "@/lib/db-config";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

function getPrisma(): PrismaClient | null {
  if (!isDatabaseConfigured()) {
    globalForPrisma.prisma = undefined;
    return null;
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }

  return globalForPrisma.prisma;
}

export const prisma = getPrisma();

export function requirePrisma(): PrismaClient {
  const client = getPrisma();
  if (!client) {
    throw new Error("DATABASE_NOT_CONFIGURED");
  }
  return client;
}

export async function ensureUser(
  userId: string,
  email?: string | null,
  name?: string | null
) {
  const client = getPrisma();
  if (!client) return null;

  try {
    return await client.user.upsert({
      where: { id: userId },
      create: { id: userId, email: email ?? undefined, name: name ?? undefined },
      update: {
        email: email ?? undefined,
        name: name ?? undefined,
      },
    });
  } catch (error) {
    console.error("ensureUser failed:", error);
    return null;
  }
}
