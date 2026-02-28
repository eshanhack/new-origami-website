"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const games = [
  {
    id: "DICE",
    name: "Dice",
    thumbnail: "https://i.imgur.com/Dc2g0E5.jpeg",
    video: "/videos/dice.mp4",
  },
  {
    id: "MINES",
    name: "Mines",
    thumbnail: "https://i.imgur.com/tJsKgqP.jpeg",
    video: "/videos/mines.mp4",
  },
  {
    id: "PLINKO",
    name: "Plinko",
    thumbnail: "https://i.imgur.com/c5Jmjjj.jpeg",
    video: "/videos/plinko.mp4",
  },
  {
    id: "LIMBO",
    name: "Limbo",
    thumbnail: "https://i.imgur.com/H78MSp2.jpeg",
    video: "/videos/limbo.mp4",
  },
  {
    id: "KENO",
    name: "Keno",
    thumbnail: "https://i.imgur.com/zAsVpFX.jpeg",
    video: "/videos/keno.mp4",
  },
  {
    id: "BLACKJACK",
    name: "Blackjack",
    thumbnail: "https://i.imgur.com/NpjNm77.jpeg",
    video: "/videos/blackjack.mp4",
  },
];

interface GameViewerProps {
  activeGame: string;
  onGameChange: (game: string) => void;
  activeBrand: string;
}

function GameVideo({ src, name }: { src: string; name: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
  }, [src]);

  return (
    <video
      ref={ref}
      key={src}
      muted
      loop
      playsInline
      autoPlay
      className="absolute inset-0 w-full h-full object-cover"
      aria-label={name}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function GameViewer({
  activeGame,
  onGameChange,
}: GameViewerProps) {
  const currentGame = games.find((g) => g.id === activeGame) ?? games[0];

  return (
    <section id="games" className="pb-6 md:pb-10 px-6">
      <div className="mx-auto max-w-[1400px]">
        {/* Game video display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0c0c] aspect-[64/33] max-h-[52vh]"
          style={{ maxWidth: "calc(52vh * 64 / 33)" }}
        >
          <div className="relative w-full h-full">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentGame.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="absolute inset-0"
              >
                <GameVideo src={currentGame.video} name={currentGame.name} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Game thumbnail cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 overflow-x-auto scrollbar-hide -mx-6 px-6 pt-5 pb-3"
        >
          <div className="flex gap-3 items-end justify-center">
            {games.map((game) => {
              const isActive = game.id === activeGame;
              return (
                <button
                  key={game.id}
                  onClick={() => onGameChange(game.id)}
                  className={cn(
                    "thumb-glow group relative flex-shrink-0 rounded-xl transition-all duration-300",
                    "w-[100px] h-[140px] sm:w-[115px] sm:h-[160px] md:w-[130px] md:h-[182px]",
                    isActive
                      ? "thumb-active thumb-floating"
                      : "hover:-translate-y-2"
                  )}
                >
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <Image
                      src={game.thumbnail}
                      alt={game.name}
                      fill
                      className="object-cover"
                      sizes="168px"
                    />
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
