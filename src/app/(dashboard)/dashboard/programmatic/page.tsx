"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { GeneratorForm } from "@/components/tools/generator-form";
import { ProgrammaticOutput } from "@/components/tools/programmatic-output";
import { LoadingState } from "@/components/shared/loading-state";
import type { ProgrammaticSEOOutput } from "@/types";

const fields = [
  { name: "productName", label: "Product Name", type: "text" as const, placeholder: "LaunchOS", required: true },
  { name: "category", label: "Category", type: "text" as const, placeholder: "SEO tools for SaaS", required: true },
  { name: "competitors", label: "Competitors", type: "text" as const, placeholder: "Ahrefs, Semrush" },
  { name: "useCases", label: "Use Cases", type: "textarea" as const, placeholder: "Landing page SEO, blog generation..." },
  { name: "integrations", label: "Integrations", type: "text" as const, placeholder: "Notion, Slack, Zapier" },
];

export default function ProgrammaticPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProgrammaticSEOOutput | null>(null);
  const [input, setInput] = useState<Record<string, string>>({});

  async function handleSubmit(data: Record<string, string>) {
    setLoading(true);
    setInput(data);
    try {
      const res = await fetch("/api/generate/programmatic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Generation failed");
      setResult(json);
      toast.success("Programmatic SEO pages generated!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <DashboardHeader
        title="Programmatic SEO"
        description="Scale your SEO with comparison pages, listicles, integrations, and template-based structures."
      />
      <div className="grid lg:grid-cols-[minmax(280px,320px)_1fr] gap-8">
        <GeneratorForm
          title="Product Context"
          description="Define your product to generate scalable SEO page ideas."
          fields={fields}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <div>
          {loading && <LoadingState />}
          {!loading && result && <ProgrammaticOutput data={result} input={input} />}
          {!loading && !result && (
            <div className="flex items-center justify-center min-h-[280px] rounded-lg border border-dashed border-zinc-800 text-zinc-500 text-sm">
              Generate comparison pages, listicles, and more
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
