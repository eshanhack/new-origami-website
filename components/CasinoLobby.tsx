"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const games = [
  { id: "DICE", name: "Dice", thumbnail: "https://i.imgur.com/Dc2g0E5.jpeg" },
  { id: "MINES", name: "Mines", thumbnail: "https://i.imgur.com/tJsKgqP.jpeg" },
  { id: "PLINKO", name: "Plinko", thumbnail: "https://i.imgur.com/c5Jmjjj.jpeg" },
  { id: "LIMBO", name: "Limbo", thumbnail: "https://i.imgur.com/H78MSp2.jpeg" },
  { id: "KENO", name: "Keno", thumbnail: "https://i.imgur.com/zAsVpFX.jpeg" },
  { id: "BLACKJACK", name: "Blackjack", thumbnail: "https://i.imgur.com/NpjNm77.jpeg" },
];

interface BrandConfig {
  name: string;
  accent: string;
  bgPrimary: string;
  bgSecondary: string;
  bgSidebar: string;
  logo: React.ReactNode;
  tabs: string[];
}

const brandConfigs: Record<string, BrandConfig> = {
  shuffle: {
    name: "Shuffle",
    accent: "#886CFF",
    bgPrimary: "#0F0F19",
    bgSecondary: "#161625",
    bgSidebar: "#0B0B14",
    logo: (
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 21 24" className="w-3 h-3.5" fill="none">
          <path d="M15.468 0H5.012C3.673 0 2.413.532 1.468 1.493A5.12 5.12 0 000 5.093v1.56c0 2.078 1.286 3.899 3.441 4.872l.86.358V6.73a1.99 1.99 0 01-.003-.078V5.091c0-.264.133-.436.211-.516.079-.08.248-.214.506-.214H15.47c.26 0 .43.133.508.214.079.08.21.252.21.514v3.423h4.295V5.091A5.12 5.12 0 0019.014 1.49 5.01 5.01 0 0015.468 0z" fill="#886CFF"/>
          <path d="M17.023 12.466l-.843-.351v5.189l.001.039v1.56c0 .264-.131.437-.211.518-.078.08-.248.215-.506.215H5.012a.74.74 0 01-.716-.727v-3.423H0v3.423C0 21.717 2.248 24 5.012 24h10.456a5.01 5.01 0 003.544-1.493 5.12 5.12 0 001.468-3.602v-1.56c0-2.097-1.291-3.921-3.457-4.879z" fill="#886CFF"/>
          <path d="M8.394 13.876c1.5 1.524 1.846 3.455 1.846 3.455s.225-1.243 1.089-2.521c.213-.316.462-.633.759-.934 1.5-1.525 3.401-1.877 3.401-1.877s-1.434-.266-2.797-1.337a6.48 6.48 0 01-.606-.539c-1.5-1.525-1.847-3.457-1.847-3.457s-.222 1.243-1.085 2.525c-.213.315-.464.632-.761.933-1.502 1.525-3.402 1.876-3.402 1.876s1.436.266 2.799 1.337c.204.163.408.34.605.54z" fill="#886CFF"/>
        </svg>
        <span className="text-[9px] font-bold text-white/90 tracking-wide">SHUFFLE</span>
      </div>
    ),
    tabs: ["Lobby", "Originals", "Slots", "Live Casino", "Table Games"],
  },
  bitcasino: {
    name: "Bitcasino",
    accent: "#FF6B35",
    bgPrimary: "#1A1A1A",
    bgSecondary: "#222222",
    bgSidebar: "#111111",
    logo: (
      <span className="text-[9px] font-bold text-white/90 tracking-wide">BITCASINO</span>
    ),
    tabs: ["Lobby", "Originals", "Slots", "Live Casino"],
  },
  cloudbet: {
    name: "Cloudbet",
    accent: "#00D4FF",
    bgPrimary: "#0D1117",
    bgSecondary: "#161B22",
    bgSidebar: "#090C10",
    logo: (
      <span className="text-[9px] font-bold text-white/90 tracking-wide">CLOUDBET</span>
    ),
    tabs: ["Casino", "Originals", "Slots", "Live"],
  },
  csgo500: {
    name: "CSGO500",
    accent: "#F5C518",
    bgPrimary: "#141414",
    bgSecondary: "#1C1C1C",
    bgSidebar: "#0E0E0E",
    logo: (
      <span className="text-[9px] font-bold text-white/90 tracking-wide">CSGO500</span>
    ),
    tabs: ["Home", "Originals", "Casino", "Battles"],
  },
  metaspins: {
    name: "Metaspins",
    accent: "#00FF88",
    bgPrimary: "#0A0E12",
    bgSecondary: "#111820",
    bgSidebar: "#070A0E",
    logo: (
      <span className="text-[9px] font-bold text-white/90 tracking-wide">METASPINS</span>
    ),
    tabs: ["Lobby", "Originals", "Slots", "Live Casino"],
  },
};

const sidebarItems = [
  { icon: "⌂", label: "Home" },
  { icon: "★", label: "Favourites" },
  { icon: "🕐", label: "Recent" },
  { icon: "🏆", label: "Challenges" },
];

interface CasinoLobbyProps {
  activeBrand: string;
  activeGame: string;
  onGameChange: (game: string) => void;
}

export function CasinoLobby({ activeBrand, activeGame, onGameChange }: CasinoLobbyProps) {
  const config = brandConfigs[activeBrand] || brandConfigs.shuffle;

  return (
    <div className="h-full flex flex-col">
      {/* "As seen on" label */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[9px] font-medium text-white/30 uppercase tracking-[0.15em]">
          As seen on
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={activeBrand}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 4 }}
            transition={{ duration: 0.2 }}
            className="text-[9px] font-semibold uppercase tracking-[0.15em]"
            style={{ color: config.accent }}
          >
            {config.name}.com
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex-1 flex flex-col rounded-xl overflow-hidden border border-white/[0.06]">
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06]"
        style={{ background: config.bgSidebar }}
      >
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 mx-2 px-2 py-0.5 rounded bg-white/[0.05] text-[7px] text-white/25 font-mono truncate">
          {config.name.toLowerCase()}.com
        </div>
      </div>

      {/* Casino body */}
      <div className="flex flex-1 min-h-0" style={{ background: config.bgPrimary }}>
        {/* Sidebar */}
        <div
          className="hidden sm:flex flex-col w-10 flex-shrink-0 border-r border-white/[0.04] py-2 gap-1.5 items-center"
          style={{ background: config.bgSidebar }}
        >
          <div className="mb-2 w-5 h-5 rounded-md flex items-center justify-center" style={{ background: config.accent + "20" }}>
            <span className="text-[8px]" style={{ color: config.accent }}>⬥</span>
          </div>
          {sidebarItems.map((item) => (
            <div
              key={item.label}
              className="w-6 h-6 rounded flex items-center justify-center text-[8px] text-white/20 hover:text-white/40 transition-colors"
              title={item.label}
            >
              {item.icon}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
          {/* Header bar with logo + search */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.04]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBrand}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {config.logo}
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center gap-1">
              <div className="px-2 py-0.5 rounded bg-white/[0.06] text-[6px] text-white/20">
                🔍 Search
              </div>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-0.5 px-3 py-1.5 border-b border-white/[0.04] overflow-x-auto scrollbar-hide">
            {config.tabs.map((tab, i) => (
              <span
                key={tab}
                className={cn(
                  "px-2 py-0.5 rounded text-[7px] font-medium whitespace-nowrap transition-colors",
                  i === 1
                    ? "text-white/90"
                    : "text-white/25"
                )}
                style={i === 1 ? { background: config.accent + "18", color: config.accent } : undefined}
              >
                {tab}
              </span>
            ))}
          </div>

          {/* Originals section */}
          <div className="flex-1 min-h-0 px-3 pt-2.5 pb-2 overflow-hidden">
            {/* Section header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] font-bold text-white/70 uppercase tracking-wider">Originals</span>
                <span className="text-[7px] text-white/25">—</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeBrand}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-[7px] text-white/30"
                  >
                    {config.name} Games
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-[6px] text-white/20">View all →</span>
            </div>

            {/* Game cards row */}
            <div className="relative">
              <div className="relative flex gap-1.5 overflow-hidden">
                {games.map((game) => {
                  const isActive = game.id === activeGame;
                  return (
                    <button
                      key={game.id}
                      onClick={() => onGameChange(game.id)}
                      className={cn(
                        "relative flex-1 min-w-0 rounded-lg transition-all duration-300 group",
                        isActive ? "z-10 scale-105" : "opacity-60 hover:opacity-90"
                      )}
                    >
                      {/* Accent glow behind selected card */}
                      {isActive && (
                        <div
                          className="absolute -inset-1 rounded-xl blur-md animate-pulse"
                          style={{
                            background: `radial-gradient(circle, ${config.accent}50, ${config.accent}10)`,
                            animationDuration: "2.5s",
                          }}
                        />
                      )}

                      <div
                        className="relative aspect-[3/4] rounded-lg overflow-hidden"
                        style={{
                          boxShadow: isActive
                            ? `0 0 20px ${config.accent}50, 0 0 40px ${config.accent}20, inset 0 0 20px ${config.accent}10`
                            : "none",
                          border: isActive
                            ? `2px solid ${config.accent}`
                            : "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <Image
                          src={game.thumbnail}
                          alt={game.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="100px"
                        />

                        {/* Now playing badge */}
                        {isActive && (
                          <div
                            className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full backdrop-blur-sm"
                            style={{ background: config.accent + "CC" }}
                          >
                            <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                            <span className="text-[5px] font-bold text-white uppercase tracking-wider leading-none">Live</span>
                          </div>
                        )}

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pt-4 pb-1 px-1">
                          <span className="text-[6px] sm:text-[7px] font-bold text-white/90 block text-center leading-tight">
                            {game.name}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Placeholder slots row */}
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[8px] font-bold text-white/40 uppercase tracking-wider">Slots</span>
                <span className="text-[6px] text-white/15">View all →</span>
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 aspect-[3/4] rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${config.bgSecondary}, ${config.bgSidebar})`,
                      border: "1px solid rgba(255,255,255,0.03)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
