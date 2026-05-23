import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { DatabaseSetupBanner } from "@/components/shared/database-setup-banner";
import { isClerkConfigured } from "@/lib/clerk-config";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (isClerkConfigured) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");
  }
  return (
    <div className="min-h-screen surface-accent">
      <DatabaseSetupBanner />
      <Sidebar />
      <main className="pl-[220px] min-h-screen">
        <div className="px-8 py-10 max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
