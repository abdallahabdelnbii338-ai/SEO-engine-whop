"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { navAccents } from "@/lib/accent-colors";
import {
  LayoutDashboard,
  FileText,
  Layers,
  PenLine,
  Tags,
  Search,
  Library,
  FolderKanban,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/landing", label: "Landing SEO", icon: FileText },
  { href: "/dashboard/programmatic", label: "Programmatic", icon: Layers },
  { href: "/dashboard/blog", label: "Blog", icon: PenLine },
  { href: "/dashboard/metadata", label: "Metadata", icon: Tags },
  { href: "/dashboard/keywords", label: "Keywords", icon: Search },
  { href: "/dashboard/swipe-vault", label: "Swipe vault", icon: Library },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[220px] flex-col border-r border-zinc-800/80 bg-zinc-950/95 backdrop-blur-sm">
      <div className="flex h-14 items-center px-4 border-b border-zinc-800/80">
        <Logo href="/dashboard" size="md" />
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-0.5">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          const accent = navAccents[item.href] ?? navAccents["/dashboard"];

          return (
            <Link key={item.href} href={item.href} className="group">
              <span
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-all duration-200 border border-transparent",
                  active
                    ? cn("font-medium text-zinc-100", accent.active)
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50 hover:border-zinc-800/50"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    active ? accent.icon : "text-zinc-600 group-hover:text-zinc-500"
                  )}
                  strokeWidth={1.75}
                />
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-800/80 p-3 flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-[10px] text-zinc-500">
          LO
        </div>
        <p className="text-[11px] text-emerald-500/70 truncate">Free · Founder workspace</p>
      </div>
    </aside>
  );
}
