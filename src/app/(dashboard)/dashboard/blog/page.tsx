"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { GeneratorForm } from "@/components/tools/generator-form";
import { BlogOutput } from "@/components/tools/blog-output";
import { LoadingState } from "@/components/shared/loading-state";
import type { BlogSEOOutput } from "@/types";

const fields = [
  { name: "productName", label: "Product Name", type: "text" as const, placeholder: "LaunchOS", required: true },
  { name: "niche", label: "Niche", type: "text" as const, placeholder: "SaaS SEO tools", required: true },
  { name: "targetAudience", label: "Target Audience", type: "text" as const, placeholder: "Indie hackers, founders", required: true },
  { name: "seedKeywords", label: "Seed Keywords", type: "text" as const, placeholder: "startup seo, saas marketing" },
];

export default function BlogPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BlogSEOOutput | null>(null);
  const [input, setInput] = useState<Record<string, string>>({});

  async function handleSubmit(data: Record<string, string>) {
    setLoading(true);
    setInput(data);
    try {
      const res = await fetch("/api/generate/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Generation failed");
      setResult(json);
      toast.success("Blog strategy generated!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <DashboardHeader
        title="SaaS Blog Generator"
        description="Blog ideas with TOFU/MOFU/BOFU funnels, outlines, keyword clusters, and content calendar."
      />
      <div className="grid lg:grid-cols-[minmax(280px,320px)_1fr] gap-8">
        <GeneratorForm
          title="Content Strategy"
          description="Define your niche to generate a founder-ready blog playbook."
          fields={fields}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <div>
          {loading && <LoadingState message="Crafting your content strategy..." />}
          {!loading && result && <BlogOutput data={result} input={input} />}
          {!loading && !result && (
            <div className="flex items-center justify-center min-h-[280px] rounded-lg border border-dashed border-zinc-800 text-zinc-500 text-sm">
              Generate blog ideas with funnels and outlines
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
