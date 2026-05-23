"use client";

import Link from "next/link";
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clerkPublishableKey } from "@/lib/clerk-config";

const clerkEnabled = clerkPublishableKey.length > 0;

interface AuthActionsProps {
  layout?: "nav" | "hero" | "cta";
}

function DashboardLink({
  size = "default",
  variant,
  fullWidth,
  children,
}: {
  size?: "default" | "lg" | "sm";
  variant?: "default" | "outline";
  fullWidth?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href="/dashboard" className={fullWidth ? "w-full block" : undefined}>
      <Button size={size} variant={variant} className={fullWidth ? "w-full gap-2" : "gap-2"}>
        {children}
      </Button>
    </Link>
  );
}

export function AuthActions({ layout = "nav" }: AuthActionsProps) {
  if (!clerkEnabled) {
    if (layout === "hero") {
      return (
        <>
          <Link href="/dashboard">
            <Button size="lg">Open workspace</Button>
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
          <Button size="lg" className="gap-2">
            Open workspace <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      );
    }
    return (
      <>
        <Link href="/sign-in">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button size="sm">Open workspace</Button>
        </Link>
      </>
    );
  }

  if (layout === "hero") {
    return (
      <>
        <Show when="signed-out">
          <SignUpButton mode="modal">
            <Button variant="accent" size="lg">Get started — free</Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <DashboardLink size="lg">
            Open workspace <ArrowRight className="h-4 w-4" />
          </DashboardLink>
        </Show>
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
      <>
        <Show when="signed-out">
          <SignUpButton mode="modal">
            <Button variant="accent" size="lg" className="gap-2">
              Get started <ArrowRight className="h-4 w-4" />
            </Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <DashboardLink size="lg">
            Open workspace <ArrowRight className="h-4 w-4" />
          </DashboardLink>
        </Show>
      </>
    );
  }

  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button size="sm">Get started</Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <Link href="/dashboard">
          <Button size="sm">Dashboard</Button>
        </Link>
      </Show>
    </>
  );
}
