import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-zinc-700 bg-zinc-800/60 text-zinc-300",
        outline: "border-zinc-800 text-zinc-500",
        sky: "border-sky-500/25 bg-sky-500/10 text-sky-300/90",
        indigo: "border-indigo-500/25 bg-indigo-500/10 text-indigo-300/90",
        emerald: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300/90",
        violet: "border-violet-500/25 bg-violet-500/10 text-violet-300/90",
        blue: "border-blue-500/25 bg-blue-500/10 text-blue-300/90",
        teal: "border-teal-500/25 bg-teal-500/10 text-teal-300/90",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
