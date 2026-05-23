"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { GeneratorForm } from "@/components/tools/generator-form";
import { KeywordsOutput } from "@/components/tools/keywords-output";
import { LoadingState } from "@/components/shared/loading-state";
import type { KeywordsSEOOutput } from "@/types";

const fields = [
  { name: "productName", label: "Product Name", type: "text" as const, placeholder: "LaunchOS", required: true },
  { name: "niche", label: "Niche", type: "text" as const, placeholder: "SaaS SEO", required: true },
  { name: "targetAudience", label: "Target Audience", type: "text" as const, placeholder: "Founders, indie hackers", required: true },
  { name: "competitors", label: "Competitors", type: "text" as const, placeholder: "Ahrefs, Semrush" },
];

export default function KeywordsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<KeywordsSEOOutput | null>(null);
  const [input, setInput] = useState<Record<string, string>>({});

  async function handleSubmit(data: Record<string, string>) {
    setLoading(true);
    setInput(data);
    try {
      const res = await fetch("/api/generate/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Generation failed");
      setResult(json);
      toast.success("Keywords generated!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <DashboardHeader
        title="Keyword Engine"
        description="Lightweight keyword research with clustering and intent — built for founders, not agencies."
      />
      <div className="grid lg:grid-cols-[minmax(280px,320px)_1fr] gap-8">
        <GeneratorForm
          title="Keyword Context"
          description="Get startup-focused keywords without enterprise SEO bloat."
          fields={fields}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <div>
          {loading && <LoadingState message="Finding your keyword opportunities..." />}
          {!loading && result && <KeywordsOutput data={result} input={input} />}
          {!loading && !result && (
            <div className="flex items-center justify-center min-h-[280px] rounded-lg border border-dashed border-zinc-800 text-zinc-500 text-sm">
              Discover low-competition keywords for your startup
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
