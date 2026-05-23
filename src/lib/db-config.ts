const PROJECT_REF = "baextjforbphiupqaolb";

export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL?.trim() ?? "";
  if (!url || url.length < 30) return false;
  if (url.startsWith("http://") || url.startsWith("https://")) return false;
  if (!url.startsWith("postgresql://")) return false;
  if (url.includes("localhost") || url.includes("127.0.0.1")) return false;
  if (
    url.includes("REPLACE_WITH") ||
    url.includes("[PASSWORD]") ||
    url.includes("[YOUR-PASSWORD]") ||
    url.includes("YOUR_DB_PASSWORD")
  ) {
    return false;
  }
  return true;
}

/** Example strings for Supabase project baextjforbphiupqaolb (replace YOUR_DB_PASSWORD). */
export const supabaseConnectionHelp = {
  projectRef: PROJECT_REF,
  databaseSettingsUrl: `https://supabase.com/dashboard/project/${PROJECT_REF}/settings/database`,
  databaseUrlTemplate: `postgresql://postgres.${PROJECT_REF}:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true`,
  directUrlTemplate: `postgresql://postgres.${PROJECT_REF}:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:5432/postgres`,
};
