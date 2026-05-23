import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/lib/db-config";
import { requirePrisma } from "@/lib/prisma";

export function databaseUnavailableResponse() {
  return NextResponse.json(
    {
      error:
        "Database not configured. Add Supabase DATABASE_URL and DIRECT_URL to .env.local, then run npx prisma db push.",
    },
    { status: 503 }
  );
}

export function getDb() {
  if (!isDatabaseConfigured()) return null;
  try {
    return requirePrisma();
  } catch {
    return null;
  }
}
