import { Sidebar } from "@/components/layout/sidebar";
import { DatabaseSetupBanner } from "@/components/shared/database-setup-banner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
