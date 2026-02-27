"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const BASE_URL = "https://games.betorigami.com/";
const SESSION = "019c99d1-bd01-7b42-a2bb-9647e70b4a18";

const games = [
  {
    id: "KENO",
    name: "Keno",
    type: "Instant Game",
    description:
      "Pick your lucky numbers and watch the draw unfold. Classic keno with up to 40x multipliers and configurable house edge.",
    maxWin: "40x",
    rtp: "92% – 99%",
    loadTime: "<15ms",
  },
  {
    id: "DICE",
    name: "Dice",
    type: "Instant Game",
    description:
      "Classic high-low prediction game with configurable multipliers. The crypto-casino staple, perfected for mainstream operators.",
    maxWin: "99x",
    rtp: "92% – 99%",
    loadTime: "<15ms",
  },
  {
    id: "MINES",
    name: "Mines",
    type: "Instant Game",
    description:
      "Navigate the grid, avoid mines, and cash out with increasing multipliers. Suspense-driven gameplay that hooks players.",
    maxWin: "100x",
    rtp: "92% – 99%",
    loadTime: "<15ms",
  },
  {
    id: "LIMBO",
    name: "Limbo",
    type: "Instant Game",
    description:
      "Set your target multiplier and test your luck. Simple, addictive, and endlessly replayable with blazing-fast rounds.",
    maxWin: "1,000x",
    rtp: "92% – 99%",
    loadTime: "<15ms",
  },
  {
    id: "PLINKO",
    name: "Plinko",
    type: "Instant Game",
    description:
      "Drop the ball through a field of pegs and watch it bounce to a prize multiplier. Physics-based fun with real stakes.",
    maxWin: "1,000x",
    rtp: "92% – 99%",
    loadTime: "<15ms",
  },
  {
    id: "CRASH",
    name: "Crash",
    type: "Instant Game",
    description:
      "Ride the multiplier curve and cash out before it crashes. Timing is everything in this high-tension social game.",
    maxWin: "Uncapped",
    rtp: "92% – 99%",
    loadTime: "<15ms",
  },
  {
    id: "CHICKEN",
    name: "Chicken",
    type: "Instant Game",
    description:
      "Reveal tiles to find chickens and avoid bones. Cash out anytime — the longer you play, the higher the reward.",
    maxWin: "100x",
    rtp: "92% – 99%",
    loadTime: "<15ms",
  },
];

function buildUrl(game: string) {
  const settings = {
    game,
    environment: "HUB88_DEV",
    theme: "default.css",
    seasonTheme: "DEFAULT",
    logoUrl: null,
    footerPosition: "BELOW",
    language: "en",
    minBet: "0.01",
    maxBet: "500",
    maxPayout: "350000",
    edge: 2,
    currency: "USD",
    currencyDecimals: 2,
    lobbyUrl: "https://betorigami.com",
    depositUrl: "https://betorigami.com",
    requiresFullScreen: false,
    showCurrencyAsText: false,
  };
  return `${BASE_URL}?settings=${encodeURIComponent(btoa(JSON.stringify(settings)))}&session=${SESSION}`;
}

export function GameShowcase() {
  const [activeId, setActiveId] = useState("KENO");
  const game = games.find((g) => g.id === activeId)!;
  const url = useMemo(() => buildUrl(activeId), [activeId]);

  return (
    <section id="games" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-medium text-white/30 uppercase tracking-[0.2em] block mb-4">
            [ Our Games ]
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            First of its Kind
          </h2>
        </motion.div>

        {/* Game tabs */}
        <div className="mt-8 overflow-x-auto scrollbar-hide -mx-6 px-6">
          <div className="flex gap-1 w-max border-b border-white/[0.06] pb-px">
            {games.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveId(g.id)}
                className={cn(
                  "px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all duration-200 whitespace-nowrap",
                  activeId === g.id
                    ? "text-white bg-white/[0.06]"
                    : "text-white/35 hover:text-white/60"
                )}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {/* Game viewer + details */}
        <div className="mt-8 grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Iframe */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-black"
          >
            <div className="aspect-[16/10]">
              <iframe
                key={url}
                src={url}
                className="w-full h-full"
                title={game.name}
                allow="autoplay; fullscreen"
              />
            </div>
          </motion.div>

          {/* Details panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col"
            >
              {/* Badges */}
              <div className="flex items-center gap-2 mb-5">
                <span className="px-3 py-1 rounded-full border border-white/[0.08] text-xs text-white/50">
                  {game.type}
                </span>
                <span className="px-3 py-1 rounded-full border border-white/[0.08] text-xs text-white/50">
                  Mobile
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-3">{game.name}</h3>
              <p className="text-sm text-white/45 leading-relaxed mb-8">
                {game.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8 pt-6 border-t border-white/[0.06]">
                <div>
                  <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">
                    Max Win
                  </p>
                  <p className="text-lg font-bold">{game.maxWin}</p>
                </div>
                <div>
                  <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">
                    Effective RTP
                  </p>
                  <p className="text-lg font-bold">{game.rtp}</p>
                </div>
                <div>
                  <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">
                    Load Time
                  </p>
                  <p className="text-lg font-bold">{game.loadTime}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-auto">
                <a
                  href="#games"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] text-sm text-white/50 hover:text-white hover:border-white/20 transition-colors"
                >
                  <FileText size={14} />
                  Documentation
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
