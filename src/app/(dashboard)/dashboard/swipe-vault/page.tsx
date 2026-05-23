"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Star, StarOff } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/shared/copy-button";
import { SWIPE_ITEMS, SWIPE_CATEGORIES } from "@/lib/swipes/data";
import { cn } from "@/lib/utils";
import type { SwipeCategory } from "@/types";

export default function SwipeVaultPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/swipes/favorites")
      .then((r) => r.json())
      .then((ids: string[]) => setFavorites(new Set(ids)))
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    return SWIPE_ITEMS.filter((item) => {
      const matchCategory = category === "all" || item.category === category;
      const matchSearch =
        !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.content.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.includes(search.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [search, category]);

  async function toggleFavorite(swipeId: string) {
    const isFav = favorites.has(swipeId);
    const method = isFav ? "DELETE" : "POST";

    try {
      await fetch("/api/swipes/favorites", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ swipeId }),
      });

      setFavorites((prev) => {
        const next = new Set(prev);
        if (isFav) next.delete(swipeId);
        else next.add(swipeId);
        return next;
      });
      toast.success(isFav ? "Removed from favorites" : "Added to favorites");
    } catch {
      toast.error("Failed to update favorite");
    }
  }

  return (
    <div>
      <DashboardHeader
        title="SEO Swipe Vault"
        description="Battle-tested formulas, structures, and copy you can steal for your startup."
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search swipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {SWIPE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
                category === cat.id
                  ? "bg-blue-500/10 text-blue-300/90 border-blue-500/25"
                  : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card className="h-full hover:border-zinc-700 transition-colors">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <Badge variant="secondary" className="mb-2 capitalize">
                    {item.category}
                  </Badge>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  {item.formula && (
                    <code className="text-xs text-zinc-500 mt-1 block font-mono">{item.formula}</code>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
                    aria-label="Toggle favorite"
                  >
                    {favorites.has(item.id) ? (
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ) : (
                      <StarOff className="h-4 w-4 text-zinc-500" />
                    )}
                  </button>
                  <CopyButton text={item.content} size="icon" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-300 leading-relaxed">{item.content}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-zinc-500 py-12">No swipes match your search.</p>
      )}
    </div>
  );
}
