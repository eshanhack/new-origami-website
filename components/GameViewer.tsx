"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

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

interface GameViewerProps {
  activeGame: string;
  onGameChange: (game: string) => void;
  activeBrand: string;
}

export function GameViewer({
  activeGame,
  onGameChange,
}: GameViewerProps) {
  const currentGame = games.find((g) => g.id === activeGame) ?? games[0];

  return (
    <section id="games" className="pb-16 md:pb-24 px-6">
      <div className="mx-auto max-w-[1400px]">
        {/* Game display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0c0c]"
        >
          <div className="relative aspect-[16/9] md:aspect-[2/1]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGame.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={currentGame.thumbnail}
                  alt={currentGame.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1400px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <span className="text-white/50 text-xs font-mono tracking-widest uppercase">
                    Now playing
                  </span>
                  <h2 className="text-white text-2xl md:text-4xl font-bold mt-1">
                    {currentGame.name}
                  </h2>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Game thumbnail cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-2"
        >
          <div className="flex gap-4 w-max items-end">
            {games.map((game) => {
              const isActive = game.id === activeGame;
              return (
                <button
                  key={game.id}
                  onClick={() => onGameChange(game.id)}
                  className={cn(
                    "thumb-glow group relative flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-300",
                    "w-[140px] h-[195px] sm:w-[155px] sm:h-[215px] md:w-[168px] md:h-[235px]",
                    isActive
                      ? "thumb-active -translate-y-3"
                      : "hover:-translate-y-1.5"
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
