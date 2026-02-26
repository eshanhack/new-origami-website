"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const brands = [
  {
    id: "shuffle",
    name: "Shuffle.com",
    logo: "/brands/shuffle.png",
    theme: "shuffle.css",
  },
  {
    id: "bitcasino",
    name: "Bitcasino",
    logo: "/brands/bitcasino.png",
    theme: "bitcasino.css",
  },
  {
    id: "cloudbet",
    name: "Cloudbet",
    logo: "/brands/cloudbet.png",
    theme: "cloudbet.css",
  },
  {
    id: "csgo500",
    name: "CSGO500",
    logo: "/brands/csgo500.png",
    theme: "csgo500.css",
  },
  {
    id: "metaspins",
    name: "Metaspins",
    logo: "/brands/metaspins.png",
    theme: "metaspins.css",
  },
];

interface HeroProps {
  activeBrand: string;
  onBrandChange: (brandId: string) => void;
}

function BrandLogo({
  brand,
  onError,
}: {
  brand: (typeof brands)[number];
  onError: () => void;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [brand.id]);

  if (failed) {
    return (
      <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight whitespace-nowrap">
        {brand.name}
      </span>
    );
  }

  return (
    <Image
      src={brand.logo}
      alt={brand.name}
      width={360}
      height={90}
      className="h-12 sm:h-16 md:h-20 w-auto object-contain"
      onError={() => {
        setFailed(true);
        onError();
      }}
      priority
      unoptimized
    />
  );
}

export function Hero({ activeBrand, onBrandChange }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [logoFailed, setLogoFailed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (paused) {
      const resume = setTimeout(() => setPaused(false), 8000);
      return () => clearTimeout(resume);
    }
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % brands.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    onBrandChange(brands[index].id);
  }, [index, onBrandChange]);

  const selectBrand = useCallback((i: number) => {
    setIndex(i);
    setPaused(true);
  }, []);

  const brand = brands[index];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-24 pb-16">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <h1 className="flex flex-col items-center gap-2 md:gap-3">
          <span className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#555] tracking-tight">
            We power
          </span>

          {/* Rotating brand */}
          <span className="relative block h-14 sm:h-18 md:h-24 w-full my-1 md:my-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={brand.id}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={() =>
                  selectBrand((index + 1) % brands.length)
                }
              >
                {logoFailed[brand.id] ? (
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight whitespace-nowrap">
                    {brand.name}
                  </span>
                ) : (
                  <BrandLogo
                    brand={brand}
                    onError={() =>
                      setLogoFailed((p) => ({ ...p, [brand.id]: true }))
                    }
                  />
                )}
              </motion.span>
            </AnimatePresence>
          </span>

          <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            originals
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 text-base md:text-lg text-[#777] max-w-xl mx-auto leading-relaxed"
        >
          World-class instant games—already played by thousands and generating
          hundreds of millions in revenue.
        </motion.p>
      </motion.div>

      {/* Brand selector pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 mt-14 flex flex-wrap items-center justify-center gap-2"
      >
        {brands.map((b, i) => (
          <button
            key={b.id}
            onClick={() => selectBrand(i)}
            className={cn(
              "px-4 py-2 text-xs font-medium rounded-full border transition-all duration-300",
              i === index
                ? "border-white/20 bg-white/[0.08] text-white"
                : "border-white/[0.06] text-[#555] hover:text-[#999] hover:border-white/10"
            )}
          >
            {b.name}
          </button>
        ))}
      </motion.div>
    </section>
  );
}
