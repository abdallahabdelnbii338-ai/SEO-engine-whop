"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { GeneratorForm } from "@/components/tools/generator-form";
import { LandingOutput } from "@/components/tools/landing-output";
import { LoadingState } from "@/components/shared/loading-state";
import type { LandingSEOOutput } from "@/types";

const fields = [
  { name: "startupName", label: "Startup Name", type: "text" as const, placeholder: "LaunchOS", required: true },
  { name: "description", label: "Description", type: "textarea" as const, placeholder: "AI-powered SEO OS for SaaS founders...", required: true },
  { name: "targetAudience", label: "Target Audience", type: "text" as const, placeholder: "SaaS founders, indie hackers", required: true },
  { name: "targetKeyword", label: "Target Keyword", type: "text" as const, placeholder: "saas seo tool", required: true },
  { name: "competitors", label: "Competitors", type: "text" as const, placeholder: "Ahrefs, Semrush (optional)" },
];

export default function LandingSEOPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LandingSEOOutput | null>(null);
  const [input, setInput] = useState<Record<string, string>>({});

  async function handleSubmit(data: Record<string, string>) {
    setLoading(true);
    setInput(data);
    try {
      const res = await fetch("/api/generate/landing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Generation failed");
      setResult(json);
      toast.success("Landing page SEO generated!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <DashboardHeader
        title="Landing Page SEO"
        description="Generate headlines, meta tags, CTAs, and page structure optimized for SaaS conversions."
      />
      <div className="grid lg:grid-cols-[minmax(280px,320px)_1fr] gap-8">
        <GeneratorForm
          title="Startup Details"
          description="Tell us about your product and we'll craft SEO-ready copy."
          fields={fields}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <div>
          {loading && <LoadingState />}
          {!loading && result && <LandingOutput data={result} input={input} />}
          {!loading && !result && (
            <div className="flex items-center justify-center min-h-[280px] rounded-lg border border-dashed border-zinc-800 text-zinc-500 text-sm">
              Fill in your startup details and hit Generate
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
