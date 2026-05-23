"use client";

import { Progress } from "@/components/ui/progress";

interface SEOScoreProps {
  score: number;
  label?: string;
  className?: string;
}

/** Shown only when returned from AI generation — not a dashboard KPI. */
export function SEOScore({ score, label = "AI SEO score", className }: SEOScoreProps) {
  return (
    <div className={className}>
      <div className="flex items-end justify-between mb-2">
        <span className="text-xs text-zinc-500">{label}</span>
        <span className="text-2xl font-semibold text-zinc-100 tabular-nums">{score}</span>
      </div>
      <Progress value={score} />
      <p className="text-[11px] text-blue-400/40 mt-2">From this generation · not sitewide analytics</p>
    </div>
  );
}
