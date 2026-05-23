"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutputCard } from "@/components/shared/output-card";
import { SEOScore } from "@/components/shared/seo-score";
import { SaveGeneration } from "@/components/tools/save-generation";
import type { LandingSEOOutput } from "@/types";

interface LandingOutputProps {
  data: LandingSEOOutput;
  input: Record<string, string>;
}

export function LandingOutput({ data, input }: LandingOutputProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Card className="flex-1 max-w-sm">
          <CardContent className="pt-6">
            <SEOScore score={data.seoScore} />
          </CardContent>
        </Card>
        <SaveGeneration
          type="landing"
          title={`${input.startupName} Landing SEO`}
          input={input}
          output={data as unknown as Record<string, unknown>}
        />
      </div>

      <Tabs defaultValue="headlines">
        <TabsList>
          <TabsTrigger value="headlines">Headlines</TabsTrigger>
          <TabsTrigger value="meta">Meta</TabsTrigger>
          <TabsTrigger value="ctas">CTAs</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="headlines" className="space-y-3">
          {data.headlines?.map((h, i) => (
            <OutputCard key={i} title={h.type} content={h.text} subtitle={`Type: ${h.type}`} />
          ))}
        </TabsContent>

        <TabsContent value="meta" className="space-y-3">
          {data.titleTags?.map((t, i) => (
            <OutputCard key={i} title={`Title Tag ${i + 1}`} content={t.text} subtitle={`${t.chars} characters`} />
          ))}
          {data.metaDescriptions?.map((m, i) => (
            <OutputCard key={i} title={`Meta Description ${i + 1}`} content={m.text} subtitle={`${m.chars} characters`} />
          ))}
        </TabsContent>

        <TabsContent value="ctas" className="space-y-3">
          {data.ctas?.map((c, i) => (
            <OutputCard key={i} title={c.placement} content={c.text} />
          ))}
        </TabsContent>

        <TabsContent value="features" className="space-y-3">
          {data.featurePageCopy?.map((f, i) => (
            <OutputCard
              key={i}
              title={f.feature}
              content={`${f.headline}\n\n${f.description}`}
              subtitle={`Keyword: ${f.keyword}`}
            />
          ))}
        </TabsContent>

        <TabsContent value="structure">
          <Card>
            <CardHeader>
              <CardTitle>Page Structure</CardTitle>
              <Badge variant="secondary">{data.pageStructure?.recommendedWordCount} words recommended</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.pageStructure?.sections?.map((s, i) => (
                <div key={i} className="p-4 rounded-xl bg-zinc-800/30 border border-zinc-800/60">
                  <p className="font-medium text-zinc-200">{s.name}</p>
                  <p className="text-sm text-zinc-400 mt-1">{s.purpose}</p>
                  <p className="text-sm text-zinc-500 mt-2 font-mono text-xs">H2: {s.h2}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {s.keywords?.map((k) => (
                      <Badge key={k} variant="outline">{k}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          {data.tips?.length > 0 && (
            <Card className="mt-4">
              <CardHeader><CardTitle className="text-base">Pro Tips</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {data.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex gap-2">
                      <span className="text-blue-400/50">→</span> {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
