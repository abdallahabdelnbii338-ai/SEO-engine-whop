"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { GeneratorForm } from "@/components/tools/generator-form";
import { MetadataOutput } from "@/components/tools/metadata-output";
import { LoadingState } from "@/components/shared/loading-state";
import type { MetadataSEOOutput } from "@/types";

const fields = [
  { name: "pageName", label: "Page Name", type: "text" as const, placeholder: "Pricing Page", required: true },
  { name: "pageType", label: "Page Type", type: "text" as const, placeholder: "pricing, feature, blog", required: true },
  { name: "description", label: "Page Description", type: "textarea" as const, placeholder: "What this page is about...", required: true },
  { name: "targetKeyword", label: "Target Keyword", type: "text" as const, placeholder: "saas pricing", required: true },
  { name: "brandVoice", label: "Brand Voice", type: "text" as const, placeholder: "modern, confident, founder-friendly" },
];

export default function MetadataPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MetadataSEOOutput | null>(null);
  const [input, setInput] = useState<Record<string, string>>({});

  async function handleSubmit(data: Record<string, string>) {
    setLoading(true);
    setInput(data);
    try {
      const res = await fetch("/api/generate/metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Generation failed");
      setResult(json);
      toast.success("Metadata generated!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <DashboardHeader
        title="Metadata Generator"
        description="SEO titles, meta descriptions, OG tags, Twitter cards, and schema suggestions."
      />
      <div className="grid lg:grid-cols-[minmax(280px,320px)_1fr] gap-8">
        <GeneratorForm
          title="Page Details"
          description="Optimize metadata for any page in your SaaS."
          fields={fields}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <div>
          {loading && <LoadingState />}
          {!loading && result && <MetadataOutput data={result} input={input} />}
          {!loading && !result && (
            <div className="flex items-center justify-center min-h-[280px] rounded-lg border border-dashed border-zinc-800 text-zinc-500 text-sm">
              Generate optimized metadata for your pages
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
