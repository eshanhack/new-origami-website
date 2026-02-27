"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const brands = [
  {
    id: "shuffle",
    name: "SHUFFLE",
    color: "#7C5CFC",
    logo: "https://i.imgur.com/UzEEQwC.png",
  },
  { id: "bitcasino", name: "BITCASINO", color: "#FF6B35", logo: null },
  { id: "cloudbet", name: "CLOUDBET", color: "#00D4FF", logo: null },
  { id: "csgo500", name: "CSGO500", color: "#F5C518", logo: null },
  { id: "metaspins", name: "METASPINS", color: "#00FF88", logo: null },
];

interface HeroProps {
  activeBrand: string;
  onBrandChange: (brand: string) => void;
}

export function Hero({ activeBrand, onBrandChange }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const brand = brands[index];

  const advance = useCallback(() => {
    setIndex((prev) => {
      const next = (prev + 1) % brands.length;
      onBrandChange(brands[next].id);
      return next;
    });
  }, [onBrandChange]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(advance, 3000);
    return () => clearInterval(timer);
  }, [paused, advance]);

  useEffect(() => {
    const i = brands.findIndex((b) => b.id === activeBrand);
    if (i !== -1 && i !== index) setIndex(i);
  }, [activeBrand]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = () => {
    setPaused(true);
    advance();
    setTimeout(() => setPaused(false), 6000);
  };

  return (
    <section className="pt-28 pb-8 md:pt-32 md:pb-12 px-6">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="font-mono text-[22px] sm:text-3xl md:text-[38px] lg:text-[44px] font-bold tracking-tight leading-snug">
          We power{" "}
          <AnimatePresence mode="wait">
            <motion.button
              key={brand.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              onClick={handleClick}
              className="inline-flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity align-baseline"
              style={{ color: brand.color }}
            >
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={160}
                  height={32}
                  className="h-6 sm:h-7 md:h-8 w-auto"
                />
              ) : (
                <span className="font-mono font-bold">{brand.name}</span>
              )}
            </motion.button>
          </AnimatePresence>{" "}
          originals
        </h1>
      </div>
    </section>
  );
}
