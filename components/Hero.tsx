"use client";

import { motion } from "framer-motion";
import {
  Grid3x3,
  Dice5,
  Bomb,
  TrendingUp,
  Triangle,
  Rocket,
  Layers,
  Bird,
} from "lucide-react";

const games = [
  { name: "Keno", gradient: "from-cyan-400 to-blue-600", icon: Grid3x3 },
  { name: "Plinko", gradient: "from-purple-500 to-violet-600", icon: Triangle },
  { name: "Limbo", gradient: "from-emerald-500 to-teal-600", icon: TrendingUp },
  { name: "Dice", gradient: "from-blue-500 to-indigo-600", icon: Dice5 },
  { name: "Mines", gradient: "from-rose-500 to-red-600", icon: Bomb },
  { name: "Crash", gradient: "from-orange-500 to-amber-600", icon: Rocket },
  { name: "Hilo", gradient: "from-pink-500 to-fuchsia-600", icon: Layers },
  { name: "Chicken", gradient: "from-amber-400 to-yellow-600", icon: Bird },
];

export function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl leading-[1.08]">
            Original instant games moulded to fit your online casino brand
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/50 max-w-2xl leading-relaxed">
            Origami crafts world-class original instant games—already played by
            thousands and generating hundreds of millions in revenue.
          </p>
        </motion.div>

        {/* Game preview label bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-14 mb-6 flex items-center gap-4"
        >
          <span className="text-sm text-white/40 whitespace-nowrap">
            Instant Casino Games
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-sm text-white/30 whitespace-nowrap">
            Game Previews
          </span>
        </motion.div>

        {/* Horizontal game cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="overflow-x-auto scrollbar-hide -mx-6 px-6 pb-4"
        >
          <div className="flex gap-4 w-max">
            {games.map((game) => {
              const Icon = game.icon;
              return (
                <a
                  key={game.name}
                  href="#games"
                  className={`group relative w-36 h-48 md:w-44 md:h-56 rounded-2xl bg-gradient-to-br ${game.gradient} flex flex-col items-center justify-end p-4 flex-shrink-0 overflow-hidden transition-transform duration-300 hover:scale-[1.03]`}
                >
                  <Icon
                    size={36}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-white/25 group-hover:text-white/40 transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                  <span className="relative text-[11px] font-bold uppercase tracking-widest text-white/90">
                    {game.name}
                  </span>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
