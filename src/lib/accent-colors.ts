/** Muted accent tokens — use sparingly, never full-saturation */

export const toolAccents = {
  landing: {
    icon: "text-sky-400/90",
    iconBg: "bg-sky-500/10 border-sky-500/20",
    badge: "border-sky-500/25 bg-sky-500/10 text-sky-300/90",
    hover: "hover:border-sky-500/25 hover:bg-sky-500/[0.04]",
  },
  programmatic: {
    icon: "text-indigo-400/90",
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    badge: "border-indigo-500/25 bg-indigo-500/10 text-indigo-300/90",
    hover: "hover:border-indigo-500/25 hover:bg-indigo-500/[0.04]",
  },
  blog: {
    icon: "text-violet-400/80",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    badge: "border-violet-500/25 bg-violet-500/10 text-violet-300/90",
    hover: "hover:border-violet-500/25 hover:bg-violet-500/[0.04]",
  },
  metadata: {
    icon: "text-emerald-400/90",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    badge: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300/90",
    hover: "hover:border-emerald-500/25 hover:bg-emerald-500/[0.04]",
  },
  keywords: {
    icon: "text-blue-400/90",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    badge: "border-blue-500/25 bg-blue-500/10 text-blue-300/90",
    hover: "hover:border-blue-500/25 hover:bg-blue-500/[0.04]",
  },
  swipes: {
    icon: "text-amber-400/80",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    badge: "border-amber-500/25 bg-amber-500/10 text-amber-300/90",
    hover: "hover:border-amber-500/25 hover:bg-amber-500/[0.04]",
  },
  projects: {
    icon: "text-teal-400/90",
    iconBg: "bg-teal-500/10 border-teal-500/20",
    badge: "border-teal-500/25 bg-teal-500/10 text-teal-300/90",
    hover: "hover:border-teal-500/25 hover:bg-teal-500/[0.04]",
  },
} as const;

export type ToolAccentKey = keyof typeof toolAccents;

export const metaAccents = {
  generations: "border-sky-500/20 bg-sky-500/5 text-sky-300",
  projects: "border-teal-500/20 bg-teal-500/5 text-teal-300",
  tools: "border-indigo-500/20 bg-indigo-500/5 text-indigo-300",
} as const;

export const navAccents: Record<string, { active: string; icon: string }> = {
  "/dashboard": { active: "bg-zinc-900/80 border border-zinc-800/80", icon: "text-zinc-300" },
  "/dashboard/landing": { active: "bg-sky-500/10 border border-sky-500/15", icon: "text-sky-400/90" },
  "/dashboard/programmatic": { active: "bg-indigo-500/10 border border-indigo-500/15", icon: "text-indigo-400/90" },
  "/dashboard/blog": { active: "bg-violet-500/10 border border-violet-500/15", icon: "text-violet-400/80" },
  "/dashboard/metadata": { active: "bg-emerald-500/10 border border-emerald-500/15", icon: "text-emerald-400/90" },
  "/dashboard/keywords": { active: "bg-blue-500/10 border border-blue-500/15", icon: "text-blue-400/90" },
  "/dashboard/swipe-vault": { active: "bg-amber-500/10 border border-amber-500/15", icon: "text-amber-400/80" },
  "/dashboard/projects": { active: "bg-teal-500/10 border border-teal-500/15", icon: "text-teal-400/90" },
};
