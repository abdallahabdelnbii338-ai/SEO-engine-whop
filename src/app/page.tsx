import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { CTASection } from "@/components/marketing/cta-section";
import { Footer } from "@/components/marketing/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 surface-accent">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
