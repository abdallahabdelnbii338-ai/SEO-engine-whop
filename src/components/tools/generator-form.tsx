"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "textarea";
  placeholder: string;
  required?: boolean;
}

interface GeneratorFormProps {
  title: string;
  description: string;
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  loading?: boolean;
}

export function GeneratorForm({
  title,
  description,
  fields,
  onSubmit,
  loading = false,
}: GeneratorFormProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, ""]))
  );

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleReset() {
    setValues(Object.fromEntries(fields.map((f) => [f.name, ""])));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(values);
  }

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-zinc-500">{description}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-1.5">
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  placeholder={field.placeholder}
                  value={values[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                  rows={3}
                />
              ) : (
                <Input
                  id={field.name}
                  placeholder={field.placeholder}
                  value={values[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                />
              )}
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <Button type="submit" variant="accent" className="flex-1" disabled={loading}>
              {loading ? "Generating…" : "Generate"}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset} disabled={loading}>
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
