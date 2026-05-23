"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/shared/copy-button";
import { cn } from "@/lib/utils";

interface OutputCardProps {
  title: string;
  content: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export function OutputCard({ title, content, subtitle, className, children }: OutputCardProps) {
  return (
    <Card className={cn("group hover:border-zinc-700/80 hover:bg-zinc-900/50 transition-all duration-200", className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          {subtitle && <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>}
        </div>
        <CopyButton text={content} size="icon" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{content}</p>
        {children}
      </CardContent>
    </Card>
  );
}
