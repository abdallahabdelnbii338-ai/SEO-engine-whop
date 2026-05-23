import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  href?: string;
  className?: string;
}

const sizes = {
  sm: { img: 28, text: "text-sm" },
  md: { img: 32, text: "text-sm" },
  lg: { img: 40, text: "text-base" },
};

export function Logo({ size = "md", showWordmark = true, href, className }: LogoProps) {
  const s = sizes[size];
  const content = (
    <span className={cn("flex items-center gap-2.5 min-w-0 group", className)}>
      <Image
        src="/logo.png"
        alt="LaunchOS"
        width={s.img}
        height={s.img}
        className="shrink-0 rounded-full"
        priority
      />
      {showWordmark && (
        <span className="min-w-0">
          <span
            className={cn(
              "block font-medium text-zinc-100 truncate group-hover:text-white transition-colors",
              s.text
            )}
          >
            LaunchOS
          </span>
          {size !== "sm" && (
            <span className="block text-[11px] text-zinc-500 truncate">SEO workspace</span>
          )}
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {content}
      </Link>
    );
  }

  return content;
}
