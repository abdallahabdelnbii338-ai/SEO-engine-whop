import { Logo } from "@/components/brand/logo";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
        <Logo href="/" size="sm" showWordmark className="opacity-80 hover:opacity-100 transition-opacity" />
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
