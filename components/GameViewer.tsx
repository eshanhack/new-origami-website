"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CasinoLobby } from "./CasinoLobby";

const LIVE_DEMO_EXCLUDED = new Set(["BLACKJACK"]);

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

const BRAND_FRAMES: Record<
  string,
  {
    accent: string;
    chromeBg: string;
    surfaceBg: string;
    footerBg: string;
    outline: string;
    label: string;
    logo: string;
  }
> = {
  shuffle: {
    accent: "#886CFF",
    chromeBg: "linear-gradient(180deg, #121224 0%, #0c0d17 100%)",
    surfaceBg: "#090a12",
    footerBg: "rgba(17, 18, 31, 0.92)",
    outline: "rgba(136, 108, 255, 0.2)",
    label: "SHUFFLE.COM",
    logo: "/brands/shuffle.svg",
  },
  bitcasino: {
    accent: "#F2590D",
    chromeBg: "linear-gradient(180deg, #181513 0%, #11100f 100%)",
    surfaceBg: "#0b0b0c",
    footerBg: "rgba(28, 18, 12, 0.92)",
    outline: "rgba(242, 89, 13, 0.22)",
    label: "BITCASINO.IO",
    logo: "/brands/bitcasino-footer.svg",
  },
  cloudbet: {
    accent: "#DFFD51",
    chromeBg: "linear-gradient(180deg, #171714 0%, #11110f 100%)",
    surfaceBg: "#0a0a09",
    footerBg: "rgba(22, 22, 18, 0.94)",
    outline: "rgba(223, 253, 81, 0.22)",
    label: "CLOUDBET.COM",
    logo: "/brands/cloudbet-footer.svg",
  },
  csgo500: {
    accent: "#FE617C",
    chromeBg: "linear-gradient(180deg, #1a1217 0%, #110d10 100%)",
    surfaceBg: "#09080a",
    footerBg: "rgba(24, 14, 18, 0.94)",
    outline: "rgba(254, 97, 124, 0.22)",
    label: "CSGO500.COM",
    logo: "/brands/csgo500-footer.svg",
  },
  metaspins: {
    accent: "#BE20FF",
    chromeBg: "linear-gradient(180deg, #17101f 0%, #100b16 100%)",
    surfaceBg: "#09070d",
    footerBg: "rgba(18, 12, 24, 0.94)",
    outline: "rgba(190, 32, 255, 0.22)",
    label: "METASPINS.COM",
    logo: "/brands/metaspins-footer.svg",
  },
};

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

function FallbackVideo({
  src,
  name,
  active,
}: {
  src: string;
  name: string;
  active: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

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
        "absolute inset-0 w-full h-full object-cover transition-opacity duration-200",
        active ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-label={name}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

async function fetchGameSession(game: string, brand: string): Promise<string> {
  const res = await fetch("/api/game-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ game, brand }),
  });
  if (!res.ok) throw new Error(`Session failed: ${res.status}`);
  const data = await res.json();
  return data.url;
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
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const requestId = useRef(0);

  const isLiveDemo = !LIVE_DEMO_EXCLUDED.has(activeGame);
  const brandFrame = BRAND_FRAMES[activeBrand] || BRAND_FRAMES.shuffle;

  const loadSession = useCallback(async (game: string, brand: string) => {
    if (LIVE_DEMO_EXCLUDED.has(game)) {
      setIframeUrl(null);
      setLoading(false);
      setError(false);
      return;
    }

    const thisRequest = ++requestId.current;
    setLoading(true);
    setError(false);
    setIframeUrl(null);

    try {
      const url = await fetchGameSession(game, brand);
      if (requestId.current !== thisRequest) return;
      setIframeUrl(url);
      setIframeKey((k) => k + 1);
    } catch {
      if (requestId.current !== thisRequest) return;
      setError(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSession(activeGame, activeBrand);
  }, [activeGame, activeBrand, loadSession]);

  const handleIframeLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const handleRetry = useCallback(() => {
    loadSession(activeGame, activeBrand);
  }, [activeGame, activeBrand, loadSession]);

  return (
    <section id="games" className="pb-6 md:pb-10 px-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-stretch">
          {/* Game display — left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full lg:w-[58%] flex-shrink-0 overflow-hidden rounded-[28px] border"
            style={{
              background: brandFrame.chromeBg,
              borderColor: brandFrame.outline,
              boxShadow: `0 20px 60px rgba(0, 0, 0, 0.45), 0 0 48px ${brandFrame.accent}14`,
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-24"
              style={{
                background: `radial-gradient(ellipse at top, ${brandFrame.accent}16 0%, transparent 68%)`,
              }}
            />

            <div className="relative z-10">
              <div
                className="flex items-center justify-between border-b px-4 py-3"
                style={{ borderColor: brandFrame.outline }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em]"
                    style={{
                      backgroundColor: `${brandFrame.accent}18`,
                      color: brandFrame.accent,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: brandFrame.accent }}
                    />
                    {isLiveDemo ? "Live demo" : "Video preview"}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                    Brand-matched frame
                  </span>
                </div>

                <span
                  className="text-[10px] font-medium uppercase tracking-[0.18em]"
                  style={{ color: brandFrame.accent }}
                >
                  {brandFrame.label}
                </span>
              </div>

              <div className="p-3">
                <div
                  className="relative overflow-hidden rounded-[20px] border"
                  style={{
                    borderColor: brandFrame.outline,
                    backgroundColor: brandFrame.surfaceBg,
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${brandFrame.accent}90, transparent)`,
                    }}
                  />

                  <div className="relative w-full aspect-[64/33]">
                    {/* Spinner while loading */}
                    {loading && <OrigamiSpinner />}

                    {/* Error state with retry */}
                    {error && !loading && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0c0c0c]">
                        <span className="text-sm text-white/40">
                          Failed to load demo
                        </span>
                        <button
                          onClick={handleRetry}
                          className="rounded-full px-4 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/[0.12]"
                          style={{ backgroundColor: `${brandFrame.accent}20` }}
                        >
                          Retry
                        </button>
                      </div>
                    )}

                    {/* Live iframe for supported games */}
                    {isLiveDemo && iframeUrl && (
                      <iframe
                        key={iframeKey}
                        src={iframeUrl}
                        className={cn(
                          "absolute inset-0 w-full h-full border-0 transition-opacity duration-300",
                          loading ? "opacity-0" : "opacity-100"
                        )}
                        onLoad={handleIframeLoad}
                        allow="autoplay"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      />
                    )}

                    {/* Video fallback for excluded games */}
                    {!isLiveDemo &&
                      games
                        .filter((g) => LIVE_DEMO_EXCLUDED.has(g.id))
                        .map((game) => (
                          <FallbackVideo
                            key={game.id}
                            src={game.video}
                            name={game.name}
                            active={game.id === activeGame}
                          />
                        ))}
                  </div>
                </div>
              </div>

              <div
                className="flex items-center justify-between border-t px-4 py-3"
                style={{
                  borderColor: brandFrame.outline,
                  background: brandFrame.footerBg,
                }}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={brandFrame.logo}
                    alt={brandFrame.label}
                    className="h-4 w-auto opacity-90"
                  />
                  <span className="text-[10px] uppercase tracking-[0.16em] text-white/32">
                    Styled to match partner brand
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: brandFrame.accent }}
                  />
                  <span className="text-[10px] uppercase tracking-[0.16em] text-white/42">
                    Demo session
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Casino lobby mockup — right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:block flex-1 min-w-0"
          >
            <CasinoLobby
              activeBrand={activeBrand}
              activeGame={activeGame}
              onGameChange={onGameChange}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
