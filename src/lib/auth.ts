import { isDatabaseConfigured } from "@/lib/db-config";
import { ensureUser } from "@/lib/prisma";

/**
 * MVP: no Clerk — Whop gates access on embed. All app data uses one workspace user.
 * Re-enable per-user auth when adding Clerk + proxy.ts again.
 */
export const MVP_USER_ID = process.env.MVP_USER_ID?.trim() || "mvp-public-workspace";

export type AuthUser = { id: string };

export async function getAuthUser(): Promise<AuthUser> {
  if (isDatabaseConfigured()) {
    try {
      await ensureUser(MVP_USER_ID);
    } catch (error) {
      console.error("ensureUser failed:", error);
    }
  }
  return { id: MVP_USER_ID };
}
