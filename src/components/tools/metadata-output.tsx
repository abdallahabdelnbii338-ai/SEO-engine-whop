"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutputCard } from "@/components/shared/output-card";
import { SaveGeneration } from "@/components/tools/save-generation";
import type { MetadataSEOOutput } from "@/types";

interface MetadataOutputProps {
  data: MetadataSEOOutput;
  input: Record<string, string>;
}

export function MetadataOutput({ data, input }: MetadataOutputProps) {
  return (
    <div className="space-y-6">
      <SaveGeneration
        type="metadata"
        title={`${input.pageName} Metadata`}
        input={input}
        output={data as unknown as Record<string, unknown>}
      />

      {data.bestPick && (
        <Card className="border-indigo-500/25 bg-indigo-500/[0.04] border-t-2 border-t-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              Best Pick <Badge>Recommended</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <OutputCard title="Title" content={data.bestPick.title} />
            <OutputCard title="Meta" content={data.bestPick.meta} />
            <OutputCard title="OG" content={data.bestPick.og} />
            <OutputCard title="Twitter" content={data.bestPick.twitter} />
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="titles">
        <TabsList>
          <TabsTrigger value="titles">Titles</TabsTrigger>
          <TabsTrigger value="meta">Meta</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
        </TabsList>

        <TabsContent value="titles" className="space-y-3">
          {data.seoTitles?.map((t, i) => (
            <OutputCard key={i} title={`SEO Title ${i + 1}`} content={t.text} subtitle={`${t.chars} chars · Score: ${t.score}`} />
          ))}
        </TabsContent>

        <TabsContent value="meta" className="space-y-3">
          {data.metaDescriptions?.map((m, i) => (
            <OutputCard key={i} title={`Meta ${i + 1}`} content={m.text} subtitle={`${m.chars} chars · Score: ${m.score}`} />
          ))}
        </TabsContent>

        <TabsContent value="social" className="space-y-3">
          {data.ogDescriptions?.map((o, i) => (
            <OutputCard key={i} title={`OG ${i + 1}`} content={o.text} subtitle={`${o.chars} chars`} />
          ))}
          {data.twitterCards?.map((t, i) => (
            <OutputCard key={i} title={`Twitter ${i + 1}`} content={t.text} subtitle={`${t.chars} chars`} />
          ))}
        </TabsContent>

        <TabsContent value="schema">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Schema: {data.schema?.type}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.schema?.suggestions?.map((s, i) => (
                <div key={i} className="p-3 rounded-lg bg-zinc-800/30 flex justify-between gap-4">
                  <div>
                    <code className="text-xs text-zinc-500 font-mono">{s.property}</code>
                    <p className="text-sm text-zinc-300 mt-1">{s.value}</p>
                  </div>
                  <p className="text-xs text-zinc-500 shrink-0">{s.note}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
