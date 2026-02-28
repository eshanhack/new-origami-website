"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ROTATION_MS = 15000;

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
  const [progressKey, setProgressKey] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  const brand = brands[index];

  const advance = useCallback(() => {
    setIndex((prev) => {
      const next = (prev + 1) % brands.length;
      onBrandChange(brands[next].id);
      return next;
    });
    setProgressKey((k) => k + 1);
  }, [onBrandChange]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(advance, ROTATION_MS);
    return () => clearInterval(timer);
  }, [paused, advance]);

  useEffect(() => {
    const i = brands.findIndex((b) => b.id === activeBrand);
    if (i !== -1 && i !== index) {
      setIndex(i);
      setProgressKey((k) => k + 1);
    }
  }, [activeBrand]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = () => {
    setPaused(true);
    advance();
    setTimeout(() => setPaused(false), ROTATION_MS);
  };

  return (
    <section className="pt-20 pb-4 md:pt-24 md:pb-5 px-6">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="font-degular text-[22px] sm:text-3xl md:text-[38px] lg:text-[44px] font-bold tracking-tight leading-snug text-center">
          We power{" "}
          <span className="inline-flex flex-col items-center align-baseline">
            <AnimatePresence mode="wait">
              <motion.button
                key={brand.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={handleClick}
                className="inline-flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
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
            </AnimatePresence>
            <span className="relative w-full h-[2px] mt-1 rounded-full overflow-hidden bg-white/[0.06]">
              <motion.span
                key={progressKey}
                ref={progressRef}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ backgroundColor: brand.color }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: ROTATION_MS / 1000,
                  ease: "linear",
                }}
              />
            </span>
          </span>{" "}
          originals
        </h1>
      </div>
    </section>
  );
}
