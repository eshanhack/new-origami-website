"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Bird,
  Dice5,
  Bomb,
  Triangle,
  TrendingUp,
  Grid3x3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { brands } from "@/components/Hero";

const BASE_URL = "https://games.betorigami.com/";
const SESSION_ID = "019c99d1-bd01-7b42-a2bb-9647e70b4a18";

const games = [
  {
    id: "CHICKEN",
    name: "Chicken",
    gradient: "from-amber-400 to-orange-500",
    icon: Bird,
  },
  {
    id: "DICE",
    name: "Dice",
    gradient: "from-blue-500 to-indigo-600",
    icon: Dice5,
  },
  {
    id: "MINES",
    name: "Mines",
    gradient: "from-rose-500 to-red-600",
    icon: Bomb,
  },
  {
    id: "PLINKO",
    name: "Plinko",
    gradient: "from-purple-500 to-violet-600",
    icon: Triangle,
  },
  {
    id: "LIMBO",
    name: "Limbo",
    gradient: "from-emerald-500 to-teal-600",
    icon: TrendingUp,
  },
  {
    id: "KENO",
    name: "Keno",
    gradient: "from-cyan-400 to-blue-600",
    icon: Grid3x3,
  },
];

function buildGameUrl(game: string, theme: string): string {
  const settings = {
    game,
    environment: "HUB88_DEV",
    theme,
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

  const encoded = btoa(JSON.stringify(settings));
  return `${BASE_URL}?settings=${encodeURIComponent(encoded)}&session=${SESSION_ID}`;
}

interface GameViewerProps {
  activeGame: string;
  onGameChange: (gameId: string) => void;
  activeBrand: string;
}

export function GameViewer({
  activeGame,
  onGameChange,
  activeBrand,
}: GameViewerProps) {
  const theme = useMemo(() => {
    const brand = brands.find((b) => b.id === activeBrand);
    return brand?.theme || "default.css";
  }, [activeBrand]);

  const gameUrl = useMemo(
    () => buildGameUrl(activeGame, theme),
    [activeGame, theme]
  );

  return (
    <section id="games" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Iframe container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-black shadow-2xl shadow-black/60"
        >
          <div className="aspect-[16/10]">
            <iframe
              key={gameUrl}
              src={gameUrl}
              className="w-full h-full"
              title={`${activeGame} game`}
              allow="autoplay; fullscreen"
            />
          </div>
        </motion.div>

        {/* Game thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-6"
        >
          {games.map((game) => {
            const isActive = activeGame === game.id;
            const Icon = game.icon;

            return (
              <motion.button
                key={game.id}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onGameChange(game.id)}
                className={cn(
                  "relative rounded-xl overflow-hidden aspect-[4/5] flex flex-col items-center justify-end p-3 transition-shadow duration-300",
                  `bg-gradient-to-br ${game.gradient}`,
                  isActive
                    ? "ring-2 ring-white ring-offset-2 ring-offset-[#050505] shadow-lg"
                    : "opacity-80 hover:opacity-100"
                )}
              >
                <Icon
                  size={30}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] text-white/70"
                  strokeWidth={1.5}
                />
                <span className="relative text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">
                  {game.name}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
