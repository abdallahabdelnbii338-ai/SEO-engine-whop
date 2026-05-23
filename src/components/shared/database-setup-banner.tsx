import Link from "next/link";
import { isDatabaseConfigured, supabaseConnectionHelp } from "@/lib/db-config";

export function DatabaseSetupBanner() {
  if (isDatabaseConfigured()) return null;

  const url = process.env.DATABASE_URL?.trim() ?? "";
  const needsPassword =
    url.includes("[YOUR-PASSWORD]") ||
    url.includes("YOUR_DB_PASSWORD") ||
    url.includes("REPLACE_WITH");

  return (
    <div className="bg-orange-500/10 border-b border-orange-500/30 px-4 py-3 text-center text-sm text-orange-200">
      <p>
        <strong>Database:</strong>{" "}
        {needsPassword
          ? "Replace YOUR_DB_PASSWORD in .env.local with your Supabase database password."
          : "Add valid Supabase Postgres URLs to .env.local (not the https:// project URL)."}
      </p>
      <p className="mt-1 text-xs text-orange-300/90">
        Supabase → Project Settings → Database → Connect → copy URI (Transaction + Direct).{" "}
        <Link
          href={supabaseConnectionHelp.databaseSettingsUrl}
          className="underline hover:text-orange-50"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open your database settings
        </Link>
        {" · "}
        Then run <code className="bg-orange-500/20 px-1 rounded">npx prisma db push</code> and restart{" "}
        <code className="bg-orange-500/20 px-1 rounded">npm run dev</code>
      </p>
    </div>
  );
}
