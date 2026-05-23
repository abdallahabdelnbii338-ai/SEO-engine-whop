import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/clerk-config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUpPage() {
  if (!isClerkConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Clerk setup required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-zinc-400">
            <p>
              Add your Clerk keys to <code className="text-zinc-200">.env.local</code>, then restart the
              dev server.
            </p>
            <Link href="https://dashboard.clerk.com/last-active?path=api-keys" target="_blank">
              <Button className="w-full">Get Clerk API keys</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full">
                Preview dashboard (dev)
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <SignUp
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
