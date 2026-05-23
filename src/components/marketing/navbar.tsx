"use client";

import { AuthActions } from "@/components/marketing/clerk-auth-actions";
import { Logo } from "@/components/brand/logo";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Logo href="/" size="md" showWordmark />

        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-500">
          <a href="#features" className="hover:text-blue-300/90 transition-colors">
            Features
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <AuthActions layout="nav" />
        </div>
      </div>
    </header>
  );
}
