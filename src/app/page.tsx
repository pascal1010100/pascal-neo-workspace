import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedModules from "@/components/FeaturedModules";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <FeaturedModules />
    </main>
  );
}
