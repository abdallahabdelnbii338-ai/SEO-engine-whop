"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutputCard } from "@/components/shared/output-card";
import { SEOScore } from "@/components/shared/seo-score";
import { SaveGeneration } from "@/components/tools/save-generation";
import type { ProgrammaticSEOOutput } from "@/types";

interface ProgrammaticOutputProps {
  data: ProgrammaticSEOOutput;
  input: Record<string, string>;
}

function PageList({
  items,
  render,
}: {
  items: { title: string; slug: string }[];
  render: (item: (typeof items)[0] & Record<string, unknown>, i: number) => React.ReactNode;
}) {
  return <div className="space-y-3">{items?.map((item, i) => render(item as (typeof items)[0] & Record<string, unknown>, i))}</div>;
}

export function ProgrammaticOutput({ data, input }: ProgrammaticOutputProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Card className="flex-1 max-w-sm">
          <CardContent className="pt-6">
            <SEOScore score={data.scalabilityScore} label="Scalability Score" />
          </CardContent>
        </Card>
        <SaveGeneration
          type="programmatic"
          title={`${input.productName} Programmatic SEO`}
          input={input}
          output={data as unknown as Record<string, unknown>}
        />
      </div>

      {data.priorityOrder?.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Priority Order</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {data.priorityOrder.map((p, i) => (
              <Badge key={p} variant={i === 0 ? "default" : "secondary"}>
                {i + 1}. {p}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="comparisons">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="comparisons">Comparisons</TabsTrigger>
          <TabsTrigger value="listicles">Listicles</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="usecases">Use Cases</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="comparisons">
          <PageList
            items={data.comparisonPages}
            render={(page, i) => (
              <OutputCard
                key={i}
                title={page.title as string}
                content={(page.outline as string[])?.join("\n• ")}
                subtitle={`/${page.slug} · ${page.targetKeyword}`}
              />
            )}
          />
        </TabsContent>

        <TabsContent value="listicles">
          <PageList
            items={data.listiclePages}
            render={(page, i) => (
              <OutputCard
                key={i}
                title={page.title as string}
                content={(page.items as string[])?.map((item) => `• ${item}`).join("\n")}
                subtitle={`/${page.slug}`}
              />
            )}
          />
        </TabsContent>

        <TabsContent value="integrations">
          <PageList
            items={data.integrationPages}
            render={(page, i) => (
              <OutputCard key={i} title={page.title as string} content={page.valueProp as string} subtitle={page.integration as string} />
            )}
          />
        </TabsContent>

        <TabsContent value="usecases">
          <PageList
            items={data.useCasePages}
            render={(page, i) => (
              <OutputCard
                key={i}
                title={page.title as string}
                content={`Pain: ${page.painPoint}\n\nSolution: ${page.solution}`}
                subtitle={`Audience: ${page.audience}`}
              />
            )}
          />
        </TabsContent>

        <TabsContent value="templates">
          <div className="space-y-3">
            {data.templates?.map((t, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base">{t.name}</CardTitle>
                  <code className="text-xs text-zinc-500 font-mono">{t.urlPattern}</code>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400 mb-2">Variables: {t.variables.join(", ")}</p>
                  <p className="text-sm text-zinc-300">{t.example}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
