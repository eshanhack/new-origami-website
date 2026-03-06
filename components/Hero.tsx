"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROTATION_MS = 60000;

const brands = [
  {
    id: "shuffle",
    name: "SHUFFLE",
    color: "#7C5CFC",
    logo: "/brands/shuffle.svg",
  },
  {
    id: "bitcasino",
    name: "BITCASINO",
    color: "#FF6B35",
    logo: "/brands/bitcasino.svg",
  },
  {
    id: "cloudbet",
    name: "CLOUDBET",
    color: "#DFFD51",
    logo: "/brands/cloudbet.webp",
  },
  {
    id: "csgo500",
    name: "CSGO500",
    color: "#FE617C",
    logo: "/brands/csgo500.png",
  },
  {
    id: "metaspins",
    name: "METASPINS",
    color: "#BE20FF",
    logo: "/brands/metaspins.svg",
  },
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
    <section className="relative px-6 pb-10 pt-28 md:pb-12 md:pt-32">
      <div className="hero-glow" />
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-[1040px] text-center">
          <span className="mb-5 inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">
            Original instant games for online casino operators
          </span>

          <h1 className="text-[30px] font-normal leading-[1.1] tracking-[-0.03em] text-white sm:text-[38px] md:text-[52px] lg:text-[66px]">
            Launch branded originals that look, feel, and perform like
            first-party product.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/48 sm:text-base md:text-[17px]">
            Origami helps operators launch battle-tested instant casino games
            with native branding, ultra-fast performance, and flexible
            integration paths. We handle the game engine, fairness, and
            operator tooling so your team can focus on distribution, brand, and
            growth.
          </p>

          <div className="mt-8 text-lg font-normal leading-relaxed text-white sm:text-xl md:text-2xl lg:text-[28px]">
            We power{" "}
            <span className="mx-1 inline-flex flex-col items-center align-middle">
              <AnimatePresence mode="wait">
                <motion.button
                  key={brand.id}
                  initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onClick={handleClick}
                  className="inline-flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80"
                  style={{ color: brand.color }}
                >
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-5 w-auto sm:h-5 md:h-6 lg:h-7"
                    />
                  ) : (
                    <span className="font-medium">{brand.name}</span>
                  )}
                </motion.button>
              </AnimatePresence>
              <span className="relative mt-2.5 h-px w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.span
                  key={progressKey}
                  ref={progressRef}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ backgroundColor: brand.color, opacity: 0.5 }}
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
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#games"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              Explore the live product
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/72 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              See how Origami works
            </a>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-3 text-left sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/28">
                What it is
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/52">
                A B2B platform for launching branded instant casino games
                without building your own originals team from zero.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/28">
                How it works
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/52">
                We provide the game engine, fairness, APIs, and integrations.
                You choose branding, RTP, distribution, and rollout strategy.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/28">
                Why it matters
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/52">
                Operators get faster launches, stronger retention, and games
                that feel native to the casino instead of white-label add-ons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
