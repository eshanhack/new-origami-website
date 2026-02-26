"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { GameViewer } from "@/components/GameViewer";
import { CustomizationLayers } from "@/components/CustomizationLayers";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [activeBrand, setActiveBrand] = useState("default");
  const [activeGame, setActiveGame] = useState("KENO");

  return (
    <main className="relative min-h-screen">
      <Header />
      <Hero activeBrand={activeBrand} onBrandChange={setActiveBrand} />
      <GameViewer
        activeGame={activeGame}
        onGameChange={setActiveGame}
        activeBrand={activeBrand}
      />
      <CustomizationLayers />
      <Footer />
    </main>
  );
}
