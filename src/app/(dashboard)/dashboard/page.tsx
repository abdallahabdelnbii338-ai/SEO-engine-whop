export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  FileText,
  Layers,
  PenLine,
  Tags,
  Search,
  Library,
  FolderKanban,
  ArrowUpRight,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { BadgeProps } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { EmptyState } from "@/components/shared/empty-state";
import { getAuthUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard-data";
import { toolAccents, metaAccents, type ToolAccentKey } from "@/lib/accent-colors";
import { SWIPE_ITEMS } from "@/lib/swipes/data";
import { formatRelativeDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const TOOL_LABELS: Record<string, string> = {
  landing: "Landing SEO",
  programmatic: "Programmatic",
  blog: "Blog",
  metadata: "Metadata",
  keywords: "Keywords",
};

const TYPE_BADGE: Record<string, BadgeProps["variant"]> = {
  landing: "sky",
  programmatic: "indigo",
  blog: "violet",
  metadata: "emerald",
  keywords: "blue",
};

const quickActions: {
  href: string;
  label: string;
  description: string;
  icon: typeof FileText;
  accent: ToolAccentKey;
}[] = [
  { href: "/dashboard/landing", label: "Landing SEO", description: "Headlines, meta, page structure", icon: FileText, accent: "landing" },
  { href: "/dashboard/programmatic", label: "Programmatic", description: "Comparison & scale pages", icon: Layers, accent: "programmatic" },
  { href: "/dashboard/blog", label: "Blog", description: "Ideas, outlines, clusters", icon: PenLine, accent: "blog" },
  { href: "/dashboard/metadata", label: "Metadata", description: "Titles, OG, schema", icon: Tags, accent: "metadata" },
  { href: "/dashboard/keywords", label: "Keywords", description: "Lightweight research", icon: Search, accent: "keywords" },
  { href: "/dashboard/swipe-vault", label: "Swipe vault", description: "Formulas & structures", icon: Library, accent: "swipes" },
];

export default async function DashboardPage() {
  const authUser = await getAuthUser();
  if (!authUser) return null;

  const data = await getDashboardData(authUser.id);
  const isEmpty =
    data.generationCount === 0 && data.projectCount === 0 && data.favoriteSwipeIds.length === 0;

  const favoriteSwipes = SWIPE_ITEMS.filter((s) => data.favoriteSwipeIds.includes(s.id));

  const metaItems: { label: string; value: string; accent: keyof typeof metaAccents }[] = [];
  if (data.generationCount > 0) {
    metaItems.push({ label: "Generations", value: String(data.generationCount), accent: "generations" });
  }
  if (data.projectCount > 0) {
    metaItems.push({ label: "Projects", value: String(data.projectCount), accent: "projects" });
  }
  if (data.toolsUsed.length > 0) {
    metaItems.push({
      label: "Tools used",
      value: data.toolsUsed.map((t) => TOOL_LABELS[t] ?? t).join(", "),
      accent: "tools",
    });
  }

  return (
    <div>
      <DashboardHeader
        title="Overview"
        description="An elegant SEO workspace for your startup. Everything here is pulled from your saved work — nothing estimated."
        meta={
          metaItems.length > 0 ? (
            <>
              {metaItems.map((item) => (
                <span
                  key={item.label}
                  className={cn(
                    "inline-flex items-center gap-1.5 text-xs border rounded-md px-2.5 py-1",
                    metaAccents[item.accent]
                  )}
                >
                  <span className="text-zinc-500">{item.label}</span>
                  <span className="font-medium tabular-nums">{item.value}</span>
                </span>
              ))}
            </>
          ) : undefined
        }
        action={
          <Link href="/dashboard/landing">
            <Button variant="accent" size="sm">
              <Sparkles className="h-3.5 w-3.5" />
              New generation
            </Button>
          </Link>
        }
      />

      {isEmpty ? (
        <EmptyState
          icon={FileText}
          title="No SEO work yet"
          description="Create your first landing page optimization, blog outline, or keyword map. Your generations and projects will show up here."
          actionLabel="Start with landing SEO"
          actionHref="/dashboard/landing"
          accent="indigo"
          className="mb-10"
        />
      ) : null}

      <section className="mb-10">
        <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
          Tools
        </h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const a = toolAccents[action.accent];
            return (
              <Link key={action.href} href={action.href}>
                <div
                  className={cn(
                    "group flex items-start gap-3 rounded-lg border border-zinc-800/90 bg-zinc-900/25 px-4 py-3.5 transition-all duration-200",
                    a.hover
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border mt-0.5",
                      a.iconBg
                    )}
                  >
                    <Icon className={cn("h-4 w-4", a.icon)} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-200 group-hover:text-zinc-50">
                      {action.label}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">{action.description}</p>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-blue-400/70 opacity-0 group-hover:opacity-100 transition-all shrink-0 mt-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        <Card className="border-t-2 border-t-sky-500/30">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md border border-sky-500/20 bg-sky-500/10 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-sky-400/90" strokeWidth={1.75} />
              </div>
              <div>
                <CardTitle>Recent activity</CardTitle>
                {data.generationCount > 0 && (
                  <p className="text-xs text-sky-400/60 mt-0.5 tabular-nums">
                    {data.generationCount} total
                  </p>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {data.generations.length === 0 ? (
              <EmptyState
                icon={Sparkles}
                title="No generations yet"
                description="Your recent SEO generations will appear here after you run a tool."
                actionLabel="Generate landing SEO"
                actionHref="/dashboard/landing"
                accent="sky"
                className="py-8"
              />
            ) : (
              <ul className="divide-y divide-zinc-800/60 -mx-1">
                {data.generations.map((g) => (
                  <li key={g.id} className="px-1 py-3 first:pt-0 last:pb-0 hover:bg-zinc-800/20 rounded-md transition-colors">
                    <p className="text-sm text-zinc-200 leading-snug">{g.title}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant={TYPE_BADGE[g.type] ?? "outline"}>
                        {TOOL_LABELS[g.type] ?? g.type}
                      </Badge>
                      <span className="text-xs text-zinc-600">{formatRelativeDate(g.createdAt)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="border-t-2 border-t-teal-500/30">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md border border-teal-500/20 bg-teal-500/10 flex items-center justify-center">
                <FolderKanban className="h-4 w-4 text-teal-400/90" strokeWidth={1.75} />
              </div>
              <div>
                <CardTitle>Saved projects</CardTitle>
                {data.projectCount > 0 && (
                  <p className="text-xs text-teal-400/60 mt-0.5 tabular-nums">
                    {data.projectCount} total
                  </p>
                )}
              </div>
            </div>
            <Link href="/dashboard/projects">
              <Button variant="ghost" size="sm" className="h-8 text-zinc-500 hover:text-teal-300/90">
                Manage
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            {data.projects.length === 0 ? (
              <EmptyState
                icon={FolderKanban}
                title="No projects yet"
                description="Group generations by startup or product so you can find and export work later."
                actionLabel="Create a project"
                actionHref="/dashboard/projects"
                accent="emerald"
                className="py-8"
              />
            ) : (
              <ul className="space-y-1">
                {data.projects.map((p) => (
                  <li key={p.id}>
                    <Link
                      href="/dashboard/projects"
                      className="flex items-center justify-between rounded-md px-2 py-2.5 -mx-2 hover:bg-teal-500/[0.06] transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm text-zinc-200 truncate">{p.name}</p>
                        <p className="text-xs text-zinc-600 mt-0.5">
                          {p._count.generations === 0
                            ? "No generations"
                            : `${p._count.generations} generation${p._count.generations === 1 ? "" : "s"}`}
                        </p>
                      </div>
                      <span className="text-xs text-zinc-600 shrink-0 ml-2">
                        {formatRelativeDate(p.updatedAt)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-t-2 border-t-amber-500/25">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md border border-amber-500/20 bg-amber-500/10 flex items-center justify-center">
              <Star className="h-4 w-4 text-amber-400/80" strokeWidth={1.75} />
            </div>
            <CardTitle>Saved swipes</CardTitle>
          </div>
          <Link href="/dashboard/swipe-vault">
            <Button variant="ghost" size="sm" className="h-8 text-zinc-500 hover:text-amber-300/90">
              Browse vault
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="pt-0">
          {favoriteSwipes.length === 0 ? (
            <EmptyState
              icon={Star}
              title="No saved swipes"
              description="Favorite formulas and structures from the swipe vault to reuse them quickly."
              actionLabel="Open swipe vault"
              actionHref="/dashboard/swipe-vault"
              accent="violet"
              className="py-8"
            />
          ) : (
            <ul className="grid sm:grid-cols-2 gap-2">
              {favoriteSwipes.map((swipe) => (
                <li
                  key={swipe.id}
                  className="rounded-md border border-zinc-800/90 bg-zinc-900/25 px-3 py-3 hover:border-amber-500/20 hover:bg-amber-500/[0.03] transition-colors"
                >
                  <p className="text-xs text-amber-400/50 capitalize mb-1">{swipe.category}</p>
                  <p className="text-sm text-zinc-300 leading-snug line-clamp-2">{swipe.content}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
