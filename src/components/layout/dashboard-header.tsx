interface DashboardHeaderProps {
  title: string;
  description?: string;
  meta?: React.ReactNode;
  action?: React.ReactNode;
}

export function DashboardHeader({ title, description, meta, action }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-10 pb-8 border-b border-zinc-800/80">
      <div className="space-y-1.5">
        <h1 className="text-xl font-semibold text-zinc-50 tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-zinc-500 max-w-lg leading-relaxed">{description}</p>
        )}
        {meta && <div className="flex flex-wrap items-center gap-2 pt-2">{meta}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
