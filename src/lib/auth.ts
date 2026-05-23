import { auth, currentUser } from "@clerk/nextjs/server";
import { isDatabaseConfigured } from "@/lib/db-config";
import { ensureUser } from "@/lib/prisma";

export async function getAuthUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();

  if (isDatabaseConfigured()) {
    try {
      await ensureUser(
        userId,
        user?.emailAddresses[0]?.emailAddress,
        user?.firstName ? `${user.firstName} ${user.lastName ?? ""}`.trim() : user?.username
      );
    } catch (error) {
      console.error("ensureUser failed:", error);
    }
  }

  return { id: userId, user };
}
