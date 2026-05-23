"use client";

import { AuthActions } from "@/components/marketing/auth-actions";

export function CTASection() {
  return (
    <section className="py-20 px-6 border-t border-zinc-800/80 surface-accent">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-zinc-50 tracking-tight mb-3">
          Start your SEO workspace
        </h2>
        <p className="text-sm text-zinc-500 mb-8 max-w-md mx-auto leading-relaxed">
          Free for founders. No credit card. Open a tool and generate your first campaign.
        </p>
        <div className="flex justify-center">
          <AuthActions layout="cta" />
        </div>
      </div>
    </section>
  );
}
