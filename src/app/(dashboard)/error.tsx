"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center px-6">
      <h2 className="text-lg font-medium text-zinc-100">Workspace couldn&apos;t load</h2>
      <p className="text-sm text-zinc-500 mt-2 max-w-md leading-relaxed">
        This is usually a temporary auth or database issue. Try reloading, or sign out and back in.
      </p>
      <div className="flex gap-2 mt-6">
        <Button variant="accent" size="sm" onClick={() => reset()}>
          Reload
        </Button>
        <Button variant="secondary" size="sm" onClick={() => (window.location.href = "/")}>
          Home
        </Button>
      </div>
    </div>
  );
}
