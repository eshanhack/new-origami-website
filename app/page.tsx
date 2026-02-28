"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { GameViewer } from "@/components/GameViewer";
import { Partners } from "@/components/Partners";
import { WhyOrigami } from "@/components/WhyOrigami";
import { Capabilities } from "@/components/Capabilities";
import { Press } from "@/components/Press";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [activeBrand, setActiveBrand] = useState("shuffle");
  const [activeGame, setActiveGame] = useState("MINES");

  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Hero activeBrand={activeBrand} onBrandChange={setActiveBrand} />
      <GameViewer
        activeGame={activeGame}
        onGameChange={setActiveGame}
        activeBrand={activeBrand}
      />
      <Partners />
      <WhyOrigami />
      <Capabilities />
      <Press />
      <CTA />
      <Footer />
    </main>
  );
}
