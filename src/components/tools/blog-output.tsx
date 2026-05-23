"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OutputCard } from "@/components/shared/output-card";
import { SaveGeneration } from "@/components/tools/save-generation";
import type { BlogSEOOutput } from "@/types";
import { cn } from "@/lib/utils";

interface BlogOutputProps {
  data: BlogSEOOutput;
  input: Record<string, string>;
}

const funnelColors: Record<string, string> = {
  TOFU: "border-sky-500/25 bg-sky-500/10 text-sky-300/90",
  MOFU: "border-indigo-500/25 bg-indigo-500/10 text-indigo-300/90",
  BOFU: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300/90",
};

export function BlogOutput({ data, input }: BlogOutputProps) {
  return (
    <div className="space-y-6">
      <SaveGeneration
        type="blog"
        title={`${input.productName} Blog Strategy`}
        input={input}
        output={data as unknown as Record<string, unknown>}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-50">Blog Ideas</h3>
        {data.ideas?.map((idea, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <CardTitle className="text-base leading-snug">{idea.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <span className={cn("text-xs px-2 py-0.5 rounded-lg border", funnelColors[idea.funnel])}>
                    {idea.funnel}
                  </span>
                  <Badge variant="outline">{idea.difficulty}</Badge>
                  <Badge variant="outline">{idea.searchIntent}</Badge>
                </div>
              </div>
              <p className="text-xs text-zinc-500">/{idea.slug} · {idea.targetKeyword}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-zinc-300 italic">&ldquo;{idea.intro}&rdquo;</p>
              <p className="text-sm text-indigo-400/70">Angle: {idea.angle}</p>
              <div className="space-y-2">
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Outline</p>
                {idea.outline?.map((section, j) => (
                  <div key={j} className="p-3 rounded-lg bg-zinc-800/30">
                    <p className="text-sm font-medium text-zinc-200">{section.heading}</p>
                    <ul className="mt-1 space-y-0.5">
                      {section.points?.map((p, k) => (
                        <li key={k} className="text-xs text-zinc-400">• {p}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.keywordClusters?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-zinc-50 mb-4">Keyword Clusters</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {data.keywordClusters.map((cluster, i) => (
              <OutputCard
                key={i}
                title={cluster.cluster}
                content={cluster.keywords.join(", ")}
                subtitle={`Intent: ${cluster.intent}`}
              />
            ))}
          </div>
        </div>
      )}

      {data.contentCalendar?.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base">4-Week Content Calendar</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {data.contentCalendar.map((week) => (
              <div key={week.week} className="flex items-center gap-4 p-2 rounded-lg bg-zinc-800/30">
                <span className="text-xs font-mono text-violet-400/50 w-12">W{week.week}</span>
                <span className="text-sm text-zinc-300 flex-1">{week.topic}</span>
                <Badge variant="secondary">{week.funnel}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
