import { headers } from "next/headers";
import { isDatabaseConfigured } from "@/lib/db-config";
import { ensureUser } from "@/lib/prisma";

/**
 * Resolves the current user for API routes and server components.
 * Whop Website Embed can pass `x-whop-user-token` (wire up Whop SDK later).
 * Until then, uses a per-browser cookie or a shared workspace user id.
 */
export async function getAuthUser(): Promise<{ id: string } | null> {
  const headerStore = await headers();
  const whopUserId = headerStore.get("x-whop-user-id")?.trim();
  const workspaceUserId =
    whopUserId || process.env.WORKSPACE_USER_ID?.trim() || "workspace-user";

  if (!workspaceUserId) return null;

  if (isDatabaseConfigured()) {
    try {
      await ensureUser(workspaceUserId);
    } catch (error) {
      console.error("ensureUser failed:", error);
    }
  }

  return { id: workspaceUserId };
}
