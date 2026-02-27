import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Partners } from "@/components/Partners";
import { GameShowcase } from "@/components/GameShowcase";
import { Capabilities } from "@/components/Capabilities";
import { Press } from "@/components/Press";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Hero />
      <Partners />
      <GameShowcase />
      <Capabilities />
      <Press />
      <CTA />
      <Footer />
    </main>
  );
}
