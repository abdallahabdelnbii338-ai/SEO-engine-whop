"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OutputCard } from "@/components/shared/output-card";
import { SaveGeneration } from "@/components/tools/save-generation";
import type { KeywordsSEOOutput } from "@/types";

interface KeywordsOutputProps {
  data: KeywordsSEOOutput;
  input: Record<string, string>;
}


export function KeywordsOutput({ data, input }: KeywordsOutputProps) {
  return (
    <div className="space-y-6">
      <SaveGeneration
        type="keywords"
        title={`${input.productName} Keywords`}
        input={input}
        output={data as unknown as Record<string, unknown>}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Quick wins</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.quickWins?.map((w, i) => (
                <li key={i} className="text-sm text-zinc-400 flex gap-2">
                  <span className="text-zinc-600">·</span> {w}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Long Term</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.longTerm?.map((w, i) => (
                <li key={i} className="text-sm text-zinc-300 flex gap-2">
                  <span className="text-zinc-600">→</span> {w}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-zinc-50 mb-4">Keywords</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {data.keywords?.map((kw, i) => (
            <Card key={i} className="hover:border-zinc-700/80 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-zinc-200">{kw.keyword}</p>
                  <Badge variant="outline">{kw.competition}</Badge>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">{kw.intent}</Badge>
                  <span className="text-xs text-zinc-500">Relevance: {kw.relevance}/10</span>
                </div>
                <p className="text-xs text-zinc-500 mt-2">→ {kw.suggestedPage}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-zinc-50 mb-4">Clusters</h3>
        <div className="space-y-3">
          {data.clusters?.map((cluster, i) => (
            <OutputCard
              key={i}
              title={cluster.name}
              content={cluster.keywords.join(", ")}
              subtitle={`${cluster.theme} · ${cluster.contentType} · ${cluster.priority} priority`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
