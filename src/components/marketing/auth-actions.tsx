import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthActionsProps {
  layout?: "nav" | "hero" | "cta";
}

export function AuthActions({ layout = "nav" }: AuthActionsProps) {
  if (layout === "hero") {
    return (
      <>
        <Link href="/dashboard">
          <Button variant="accent" size="lg" className="gap-2">
            Open workspace <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="#features">
          <Button variant="outline" size="lg">
            See features
          </Button>
        </Link>
      </>
    );
  }

  if (layout === "cta") {
    return (
      <Link href="/dashboard">
        <Button variant="accent" size="lg" className="gap-2">
          Open workspace <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    );
  }

  return (
    <Link href="/dashboard">
      <Button size="sm">Open workspace</Button>
    </Link>
  );
}
