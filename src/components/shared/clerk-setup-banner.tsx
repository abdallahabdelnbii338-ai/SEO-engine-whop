import Link from "next/link";
import { isClerkConfigured } from "@/lib/clerk-config";

export function ClerkSetupBanner() {
  if (isClerkConfigured) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-2.5 text-center text-sm text-amber-200">
      Clerk is not configured. Add{" "}
      <code className="text-amber-100 bg-amber-500/20 px-1 rounded">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and{" "}
      <code className="text-amber-100 bg-amber-500/20 px-1 rounded">CLERK_SECRET_KEY</code> to{" "}
      <code className="text-amber-100 bg-amber-500/20 px-1 rounded">.env.local</code>, then restart the dev server.{" "}
      <Link
        href="https://dashboard.clerk.com/last-active?path=api-keys"
        className="underline hover:text-amber-50"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get API keys
      </Link>
    </div>
  );
}
