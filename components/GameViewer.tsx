"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const BASE_URL = "https://games.betorigami.com/";
const SESSION = "019ca168-222d-7a5d-aea3-b649849848ec";

const games = [
  {
    id: "DICE",
    name: "Dice",
    thumbnail: "https://i.imgur.com/Dc2g0E5.jpeg",
  },
  {
    id: "MINES",
    name: "Mines",
    thumbnail: "https://i.imgur.com/tJsKgqP.jpeg",
  },
  {
    id: "PLINKO",
    name: "Plinko",
    thumbnail: "https://i.imgur.com/c5Jmjjj.jpeg",
  },
  {
    id: "LIMBO",
    name: "Limbo",
    thumbnail: "https://i.imgur.com/H78MSp2.jpeg",
  },
  {
    id: "KENO",
    name: "Keno",
    thumbnail: "https://i.imgur.com/zAsVpFX.jpeg",
  },
  {
    id: "BLACKJACK",
    name: "Blackjack",
    thumbnail: "https://i.imgur.com/NpjNm77.jpeg",
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
    maxBet: "1000",
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

const brandThemes: Record<string, string> = {
  shuffle: "shuffle.css",
  bitcasino: "bitcasino.css",
  cloudbet: "cloudbet.css",
  csgo500: "csgo500.css",
  metaspins: "metaspins.css",
};

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
  const url = useMemo(() => buildUrl(activeGame, theme), [activeGame, theme]);

  return (
    <section id="games" className="pb-16 md:pb-24 px-6">
      <div className="mx-auto max-w-[1400px]">
        {/* Game iframe */}
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

        {/* Game thumbnail cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-2"
        >
          <div className="flex gap-4 w-max">
            {games.map((game) => {
              const active = game.id === activeGame;
              return (
                <button
                  key={game.id}
                  onClick={() => onGameChange(game.id)}
                  className={cn(
                    "group relative flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-300",
                    "w-[140px] h-[195px] sm:w-[155px] sm:h-[215px] md:w-[168px] md:h-[235px]",
                    active
                      ? "ring-2 ring-white/50 scale-[1.02] shadow-lg shadow-white/5"
                      : "opacity-85 hover:opacity-100 hover:scale-[1.03]"
                  )}
                >
                  <Image
                    src={game.thumbnail}
                    alt={game.name}
                    fill
                    className="object-cover"
                    sizes="168px"
                  />
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
