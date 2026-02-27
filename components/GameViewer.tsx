"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Dice5,
  Bomb,
  Triangle,
  TrendingUp,
  Grid3x3,
  Rocket,
  Bird,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BASE_URL = "https://games.betorigami.com/";
const SESSION = "019c99d1-bd01-7b42-a2bb-9647e70b4a18";

const brandThemes: Record<string, string> = {
  shuffle: "shuffle.css",
  bitcasino: "bitcasino.css",
  cloudbet: "cloudbet.css",
  csgo500: "csgo500.css",
  metaspins: "metaspins.css",
};

const brandLabels: Record<string, { name: string; color: string }> = {
  shuffle: { name: "SHUFFLE", color: "#7C5CFC" },
  bitcasino: { name: "BITCASINO", color: "#FF6B35" },
  cloudbet: { name: "CLOUDBET", color: "#00D4FF" },
  csgo500: { name: "CSGO500", color: "#F5C518" },
  metaspins: { name: "METASPINS", color: "#00FF88" },
};

const games = [
  {
    id: "DICE",
    name: "Dice",
    gradient: "from-green-400 via-emerald-500 to-green-700",
    icon: Dice5,
  },
  {
    id: "MINES",
    name: "Mines",
    gradient: "from-rose-400 via-red-500 to-rose-700",
    icon: Bomb,
  },
  {
    id: "PLINKO",
    name: "Plinko",
    gradient: "from-red-400 via-orange-500 to-red-600",
    icon: Triangle,
  },
  {
    id: "LIMBO",
    name: "Limbo",
    gradient: "from-amber-300 via-yellow-500 to-amber-600",
    icon: TrendingUp,
  },
  {
    id: "KENO",
    name: "Keno",
    gradient: "from-violet-400 via-purple-500 to-violet-700",
    icon: Grid3x3,
  },
  {
    id: "CRASH",
    name: "Crash",
    gradient: "from-orange-400 via-red-500 to-orange-700",
    icon: Rocket,
  },
  {
    id: "CHICKEN",
    name: "Chicken",
    gradient: "from-amber-300 via-orange-400 to-amber-600",
    icon: Bird,
  },
  {
    id: "HILO",
    name: "Hilo",
    gradient: "from-pink-400 via-fuchsia-500 to-pink-700",
    icon: Layers,
  },
];

function buildUrl(game: string, theme: string) {
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
  return `${BASE_URL}?settings=${encodeURIComponent(btoa(JSON.stringify(settings)))}&session=${SESSION}`;
}

interface GameViewerProps {
  activeGame: string;
  onGameChange: (game: string) => void;
  activeBrand: string;
}

export function GameViewer({
  activeGame,
  onGameChange,
  activeBrand,
}: GameViewerProps) {
  const theme = brandThemes[activeBrand] || "default.css";
  const label = brandLabels[activeBrand] || brandLabels.shuffle;
  const url = useMemo(() => buildUrl(activeGame, theme), [activeGame, theme]);

  return (
    <section id="games" className="pb-16 md:pb-24 px-6">
      <div className="mx-auto max-w-[1400px]">
        {/* ── Game iframe ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0c0c]"
        >
          <div className="aspect-[16/9] md:aspect-[2/1]">
            <iframe
              key={url}
              src={url}
              className="w-full h-full"
              title={activeGame}
              allow="autoplay; fullscreen"
            />
          </div>
        </motion.div>

        {/* ── Game thumbnail cards ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-2"
        >
          <div className="flex gap-4 w-max">
            {games.map((game) => {
              const Icon = game.icon;
              const active = game.id === activeGame;
              return (
                <button
                  key={game.id}
                  onClick={() => onGameChange(game.id)}
                  className={cn(
                    "group relative flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-300",
                    "w-[140px] h-[195px] sm:w-[155px] sm:h-[215px] md:w-[168px] md:h-[235px]",
                    `bg-gradient-to-br ${game.gradient}`,
                    active
                      ? "ring-2 ring-white/50 scale-[1.02] shadow-lg shadow-white/5"
                      : "opacity-85 hover:opacity-100 hover:scale-[1.03]"
                  )}
                >
                  {/* Brand badge */}
                  <div
                    className="absolute top-3 left-3 z-10 px-2 py-[3px] rounded text-[8px] sm:text-[9px] font-extrabold tracking-wider"
                    style={{
                      backgroundColor: label.color + "30",
                      color: label.color,
                    }}
                  >
                    {label.name}
                  </div>

                  {/* Game icon */}
                  <Icon
                    size={52}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] text-white/25 group-hover:text-white/40 transition-colors duration-300"
                    strokeWidth={1}
                  />

                  {/* Bottom gradient + game name */}
                  <div className="absolute inset-x-0 bottom-0 pt-12 pb-4 px-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <span className="text-[13px] sm:text-sm md:text-[15px] font-extrabold uppercase tracking-widest text-white drop-shadow-md">
                      {game.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
