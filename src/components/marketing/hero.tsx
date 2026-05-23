"use client";

import { AuthActions } from "@/components/marketing/clerk-auth-actions";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 border-b border-zinc-800/80 surface-accent overflow-hidden">
      <div className="max-w-3xl mx-auto relative">
        <p className="inline-flex items-center gap-2 text-sm text-blue-400/80 mb-6 border border-blue-500/15 bg-blue-500/5 rounded-full px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          Free · Built for SaaS founders
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-zinc-50 tracking-tight leading-[1.1] mb-6">
          SEO workspace
          <br />
          <span className="text-zinc-500">without the agency overhead.</span>
        </h1>

        <p className="text-lg text-zinc-400 max-w-xl leading-relaxed mb-10">
          LaunchOS helps you ship landing page SEO, programmatic pages, and blog outlines —
          structured, saveable, and founder-focused.
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-3">
          <AuthActions layout="hero" />
        </div>

        <dl className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-zinc-800/80">
          <div>
            <dt className="text-xs text-zinc-600 uppercase tracking-wider">Tools</dt>
            <dd className="text-sm text-zinc-300 mt-1">8 focused generators</dd>
          </div>
          <div>
            <dt className="text-xs text-emerald-500/60 uppercase tracking-wider">Access</dt>
            <dd className="text-sm text-zinc-300 mt-1">Free to use</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-xs text-indigo-400/50 uppercase tracking-wider">Built for</dt>
            <dd className="text-sm text-zinc-300 mt-1">Indie hackers & AI startups</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
