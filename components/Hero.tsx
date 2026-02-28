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
    <section className="relative pt-[76px] pb-5 md:pt-[88px] md:pb-6 px-6">
      <div className="hero-glow" />
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <h1 className="font-degular text-[28px] sm:text-4xl md:text-[48px] lg:text-[56px] font-bold tracking-[-0.02em] leading-[1.15] text-center">
          <span className="text-white/50">We power</span>{" "}
          <span className="inline-flex flex-col items-center align-baseline">
            <AnimatePresence mode="wait">
              <motion.button
                key={brand.id}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={handleClick}
                className="inline-flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ color: brand.color }}
              >
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={200}
                    height={40}
                    className="h-7 sm:h-8 md:h-10 lg:h-11 w-auto"
                  />
                ) : (
                  <span className="font-degular font-bold">{brand.name}</span>
                )}
              </motion.button>
            </AnimatePresence>
            <span className="relative w-full h-[2px] mt-1.5 rounded-full overflow-hidden bg-white/[0.04]">
              <motion.span
                key={progressKey}
                ref={progressRef}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ backgroundColor: brand.color, opacity: 0.7 }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: ROTATION_MS / 1000,
                  ease: "linear",
                }}
              />
            </span>
          </span>{" "}
          <span className="text-white/50">originals</span>
        </h1>
      </div>
    </section>
  );
}
