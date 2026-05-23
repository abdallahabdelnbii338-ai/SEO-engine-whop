import { auth } from "@clerk/nextjs/server";
import { isDatabaseConfigured } from "@/lib/db-config";
import { ensureUser } from "@/lib/prisma";

export async function getAuthUser() {
  let userId: string | null = null;
  try {
    ({ userId } = await auth());
  } catch (error) {
    console.error("Clerk auth() failed:", error);
    return null;
  }
  if (!userId) return null;

  if (isDatabaseConfigured()) {
    try {
      await ensureUser(userId);
    } catch (error) {
      console.error("ensureUser failed:", error);
    }
  }

  return { id: userId };
}
