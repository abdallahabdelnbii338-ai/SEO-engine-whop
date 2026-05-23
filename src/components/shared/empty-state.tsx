import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
  accent?: "blue" | "indigo" | "emerald" | "violet";
}

const accentStyles = {
  blue: "border-blue-500/15 bg-blue-500/[0.03] [&_svg]:text-blue-400/70",
  indigo: "border-indigo-500/15 bg-indigo-500/[0.03] [&_svg]:text-indigo-400/70",
  emerald: "border-emerald-500/15 bg-emerald-500/[0.03] [&_svg]:text-emerald-400/70",
  violet: "border-violet-500/15 bg-violet-500/[0.03] [&_svg]:text-violet-400/70",
};

const iconBoxStyles = {
  blue: "border-blue-500/20 bg-blue-500/10",
  indigo: "border-indigo-500/20 bg-indigo-500/10",
  emerald: "border-emerald-500/20 bg-emerald-500/10",
  violet: "border-violet-500/20 bg-violet-500/10",
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  className,
  accent = "blue",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-6 rounded-lg border border-dashed",
        accentStyles[accent],
        className
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-md border mb-4",
          iconBoxStyles[accent]
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-medium text-zinc-200">{title}</h3>
      <p className="text-sm text-zinc-500 mt-1 max-w-sm leading-relaxed">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="mt-5">
          <Button variant="accent" size="sm">
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}
