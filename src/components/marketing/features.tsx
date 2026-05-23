import { cn } from "@/lib/utils";
import {
  FileText,
  Layers,
  PenLine,
  Tags,
  Search,
  Library,
  FolderKanban,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    iconClass: "text-sky-400/80",
    dotClass: "bg-sky-500/60",
    title: "Landing page SEO",
    description: "Headlines, meta tags, CTAs, and structure — tuned for SaaS conversion.",
  },
  {
    icon: Layers,
    iconClass: "text-indigo-400/80",
    dotClass: "bg-indigo-500/60",
    title: "Programmatic SEO",
    description: "Comparison pages, listicles, and templates you can actually ship.",
  },
  {
    icon: PenLine,
    iconClass: "text-violet-400/70",
    dotClass: "bg-violet-500/50",
    title: "Blog generator",
    description: "Outlines and angles with funnel stage and search intent labels.",
  },
  {
    icon: Tags,
    iconClass: "text-emerald-400/80",
    dotClass: "bg-emerald-500/60",
    title: "Metadata",
    description: "Titles, descriptions, OG tags, and schema suggestions per page.",
  },
  {
    icon: Search,
    iconClass: "text-blue-400/80",
    dotClass: "bg-blue-500/60",
    title: "Keyword engine",
    description: "Lightweight clustering — not another enterprise SEO suite.",
  },
  {
    icon: Library,
    iconClass: "text-amber-400/70",
    dotClass: "bg-amber-500/50",
    title: "Swipe vault",
    description: "Proven formulas and structures you can copy in one click.",
  },
  {
    icon: FolderKanban,
    iconClass: "text-teal-400/80",
    dotClass: "bg-teal-500/60",
    title: "Projects",
    description: "Organize generations by startup. Reopen, review, export.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-6 border-b border-zinc-800/80">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 max-w-xl">
          <h2 className="text-2xl font-semibold text-zinc-50 tracking-tight">
            Everything you need to ship SEO
          </h2>
          <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
            Focused tools instead of a bloated dashboard. Each generator does one job well.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800/80 rounded-lg overflow-hidden border border-zinc-800/80">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLast = index === features.length - 1;
            return (
              <div
                key={feature.title}
                className={cn(
                  "bg-zinc-950/90 p-6 hover:bg-zinc-900/40 transition-colors duration-200 group",
                  isLast && "sm:col-span-2 lg:col-span-3"
                )}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={cn("h-1 w-1 rounded-full", feature.dotClass)} />
                  <Icon className={cn("h-4 w-4", feature.iconClass)} strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-medium text-zinc-200 group-hover:text-zinc-50 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-500 mt-2 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
