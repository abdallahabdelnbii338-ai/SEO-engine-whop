"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { GenerationType } from "@/types";

interface SaveGenerationProps {
  type: GenerationType;
  title: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  projectId?: string;
}

export function SaveGeneration({ type, title, input, output, projectId }: SaveGenerationProps) {
  const [saving, setSaving] = useState(false);
  const [customTitle, setCustomTitle] = useState(title);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          title: customTitle,
          input,
          output,
          projectId,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save");
      }

      toast.success("Generation saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        value={customTitle}
        onChange={(e) => setCustomTitle(e.target.value)}
        className="max-w-xs h-9"
        placeholder="Generation title"
      />
      <Button variant="secondary" size="sm" onClick={handleSave} disabled={saving}>
        <Save className="h-4 w-4" />
        {saving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
