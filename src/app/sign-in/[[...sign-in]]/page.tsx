import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/clerk-config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  if (!isClerkConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Clerk setup required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-zinc-400">
            <p>
              Add your Clerk keys to <code className="text-zinc-200">.env.local</code> in the project
              root, then restart <code className="text-zinc-200">npm run dev</code>.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-zinc-300">
              <li>
                Open{" "}
                <a
                  href="https://dashboard.clerk.com/last-active?path=api-keys"
                  className="text-zinc-300 underline hover:text-zinc-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Clerk API Keys
                </a>
              </li>
              <li>Copy Publishable Key → <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code></li>
              <li>Copy Secret Key → <code>CLERK_SECRET_KEY</code></li>
            </ol>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Back to home
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="w-full">Preview dashboard (dev)</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-mesh p-4">
      <SignIn
        appearance={{
          variables: {
            colorBackground: "#18181b",
            colorInputBackground: "#27272a",
            colorPrimary: "#7c3aed",
            colorText: "#fafafa",
            borderRadius: "0.75rem",
          },
          elements: {
            card: "shadow-2xl border border-zinc-800",
          },
        }}
      />
    </div>
  );
}
