"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, FolderKanban, FileText } from "lucide-react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRelativeDate } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  _count: { generations: number };
}

interface Generation {
  id: string;
  type: string;
  title: string;
  createdAt: string;
  output: Record<string, unknown>;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  async function loadData() {
    const [projRes, genRes] = await Promise.all([
      fetch("/api/projects"),
      fetch("/api/generations?limit=50"),
    ]);
    const projData = await projRes.json();
    const genData = await genRes.json();
    setProjects(projData);
    setGenerations(genData);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function createProject() {
    if (!name.trim()) return;
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      if (!res.ok) throw new Error("Failed to create");
      toast.success("Project created");
      setName("");
      setDescription("");
      setShowForm(false);
      loadData();
    } catch {
      toast.error("Failed to create project");
    }
  }

  async function deleteProject(id: string) {
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      toast.success("Project deleted");
      if (selectedProject === id) setSelectedProject(null);
      loadData();
    } catch {
      toast.error("Failed to delete");
    }
  }

  const filteredGenerations = selectedProject
    ? generations.filter((g) => (g as Generation & { projectId?: string }).projectId === selectedProject)
    : generations;

  return (
    <div>
      <DashboardHeader
        title="Saved Projects"
        description="Organize your SEO generations by startup project."
        action={
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4" /> New Project
          </Button>
        }
      />

      {showForm && (
        <Card className="mb-6">
          <CardContent className="pt-6 space-y-4">
            <Input placeholder="Project name" value={name} onChange={(e) => setName(e.target.value)} />
            <Textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
            <div className="flex gap-2">
              <Button onClick={createProject}>Create</Button>
              <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Projects</h3>
          {loading ? (
            <p className="text-sm text-zinc-500">Loading...</p>
          ) : projects.length === 0 ? (
            <p className="text-sm text-zinc-500">No projects yet</p>
          ) : (
            projects.map((p) => (
              <Card
                key={p.id}
                className={`cursor-pointer transition-colors ${
                  selectedProject === p.id ? "border-zinc-600 bg-zinc-900/50" : "hover:border-zinc-700"
                }`}
                onClick={() => setSelectedProject(selectedProject === p.id ? null : p.id)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <FolderKanban className="h-5 w-5 text-zinc-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-zinc-200 truncate">{p.name}</p>
                    <p className="text-xs text-zinc-500">{p._count.generations} generations</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProject(p.id);
                    }}
                    className="p-1 hover:text-red-400 text-zinc-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">
            {selectedProject ? "Project Generations" : "All Generations"}
          </h3>
          <Card>
            <CardContent className="p-0">
              {filteredGenerations.length === 0 ? (
                <p className="text-sm text-zinc-500 p-8 text-center">No saved generations yet</p>
              ) : (
                <div className="divide-y divide-zinc-800/60">
                  {filteredGenerations.map((g) => (
                    <div key={g.id} className="p-4 hover:bg-zinc-800/20">
                      <div className="flex items-start gap-3">
                        <FileText className="h-4 w-4 text-zinc-500 mt-1 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-zinc-200">{g.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{g.type}</Badge>
                            <span className="text-xs text-zinc-500">{formatRelativeDate(g.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
