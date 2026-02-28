"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
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

function OrigamiSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0c0c0c] z-10">
      <svg
        viewBox="0 0 1012 1012"
        className="w-10 h-10 text-white/20 animate-spin"
        style={{ animationDuration: "2.5s" }}
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M1012 389.086V32.289C1012 14.456 997.544 0 979.712 0H622.914a66.08 66.08 0 0 0-52.38 25.814l-51.702 67.432c-6.47 8.438-19.189 8.438-25.653 0L441.52 25.82C428.989 9.573 409.629 0 389.14 0H32.289C14.456 0 0 14.456 0 32.289v356.797a65.98 65.98 0 0 0 25.867 52.38L93.3 493.169c8.438 6.469 8.438 19.188 0 25.652L25.873 570.48C9.578 583.011.005 602.371.005 622.86v356.852c0 17.832 14.456 32.288 32.289 32.288h356.851c20.49 0 39.85-9.57 52.38-25.867l51.66-67.428c6.464-8.443 19.182-8.443 25.652 0l51.702 67.433a65.99 65.99 0 0 0 52.38 25.872h356.798c17.833 0 32.293-14.46 32.293-32.293V622.866c0-20.49-9.58-39.85-25.818-52.38l-67.427-51.66c-8.444-6.464-8.444-19.183 0-25.652l67.432-51.703a66.07 66.07 0 0 0 25.813-52.38zM594.573 594.519c-45.298 45.298-68.067 95.069-79.07 127.858-3.066 9.132-15.935 9.132-19 0-10.998-32.794-33.757-82.566-79.022-127.858-45.292-45.26-95.064-68.024-127.858-79.022-9.132-3.06-9.132-15.934 0-19 32.794-11.003 82.566-33.778 127.858-79.07s68.024-95.037 79.022-127.842c3.06-9.131 15.934-9.131 19 0 11.003 32.805 33.778 82.582 79.07 127.842 45.265 45.292 95.042 68.067 127.842 79.07 9.131 3.066 9.131 15.94 0 19-32.805 10.998-82.582 33.757-127.842 79.022"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

function PreloadedVideo({
  src,
  name,
  active,
  onReady,
}: {
  src: string;
  name: string;
  active: boolean;
  onReady: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const handleCanPlay = () => onReady();
    v.addEventListener("canplaythrough", handleCanPlay);
    return () => v.removeEventListener("canplaythrough", handleCanPlay);
  }, [onReady]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="auto"
      className={cn(
        "absolute inset-0 w-full h-full object-cover transition-opacity duration-100",
        active ? "opacity-100" : "opacity-0"
      )}
      aria-label={name}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

interface GameViewerProps {
  activeGame: string;
  onGameChange: (game: string) => void;
  activeBrand: string;
}

export function GameViewer({
  activeGame,
  onGameChange,
}: GameViewerProps) {
  const [readySet, setReadySet] = useState<Set<string>>(new Set());
  const allReady = readySet.size === games.length;
  const activeReady = readySet.has(activeGame);

  const markReady = useCallback((id: string) => {
    setReadySet((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  return (
    <section id="games" className="pb-6 md:pb-10 px-6">
      <div className="mx-auto max-w-[1400px]">
        {/* Game video display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="video-glow mx-auto rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0c0c] aspect-[64/33] max-h-[52vh]"
          style={{ maxWidth: "calc(52vh * 64 / 33)" }}
        >
          <div className="relative w-full h-full">
            {!activeReady && <OrigamiSpinner />}

            {games.map((game) => (
              <PreloadedVideo
                key={game.id}
                src={game.video}
                name={game.name}
                active={game.id === activeGame}
                onReady={() => markReady(game.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Game thumbnail cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-5 overflow-x-auto scrollbar-hide -mx-6 px-6 pt-5 pb-3"
        >
          <div className="flex gap-3 items-end justify-center">
            {games.map((game) => {
              const isActive = game.id === activeGame;
              const ready = readySet.has(game.id);
              return (
                <button
                  key={game.id}
                  onClick={() => onGameChange(game.id)}
                  className={cn(
                    "group relative flex-shrink-0 rounded-xl transition-all duration-300 text-center",
                    "w-[100px] sm:w-[115px] md:w-[130px]"
                  )}
                >
                  <div
                    className={cn(
                      "thumb-glow relative rounded-xl overflow-hidden transition-all duration-300 aspect-[5/7]",
                      isActive
                        ? "thumb-active thumb-floating"
                        : "group-hover:-translate-y-2"
                    )}
                  >
                    <Image
                      src={game.thumbnail}
                      alt={game.name}
                      fill
                      className="object-cover"
                      sizes="168px"
                    />
                    {!ready && !allReady && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/30 animate-pulse" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "block mt-2 text-[10px] font-medium tracking-[0.1em] uppercase transition-colors duration-200",
                      isActive ? "text-white/70" : "text-white/25"
                    )}
                  >
                    {game.name}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
