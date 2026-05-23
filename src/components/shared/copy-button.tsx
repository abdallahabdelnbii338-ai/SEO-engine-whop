"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import { toast } from "sonner";

interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: "default" | "ghost" | "outline" | "secondary";
  size?: "default" | "sm" | "icon";
}

export function CopyButton({ text, label = "Copy", variant = "ghost", size = "sm" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Failed to copy");
    }
  }

  if (size === "icon") {
    return (
      <Button variant={variant} size="icon" onClick={handleCopy} aria-label="Copy">
        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
      </Button>
    );
  }

  return (
    <Button variant={variant} size={size} onClick={handleCopy}>
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {label}
    </Button>
  );
}
