"use client";

import { motion } from "framer-motion";
import {
  Palette,
  SlidersHorizontal,
  Sparkles,
  Shield,
  Dice1,
  Globe,
  Plug,
  Gift,
  Languages,
} from "lucide-react";

const stats = [
  { value: "<15ms", label: "Load Time" },
  { value: "50M+", label: "Monthly Bets" },
  { value: "99.99%", label: "Uptime" },
  { value: "30+", label: "Markets" },
];

const capabilities = [
  {
    icon: Palette,
    title: "Deep Customization",
    description:
      "Colors, fonts, logos, and layouts — make every game look and feel native to your casino brand.",
  },
  {
    icon: SlidersHorizontal,
    title: "RTP Control",
    description:
      "Support for 99%, 98%, 97%, 96%, and 92% RTP. Set the edge that works for your business.",
  },
  {
    icon: Sparkles,
    title: "Animation Control",
    description:
      "Adjust animation easing, effects, and scale. Tune the player experience from subtle to dramatic.",
  },
  {
    icon: Shield,
    title: "ECVRF Provably Fair",
    description:
      "State-of-the-art provable fairness audited by GLI. Build unshakeable trust with your player base.",
  },
  {
    icon: Dice1,
    title: "Classic RNG",
    description:
      "Prefer a classic RNG setup? We support that too. Choose the fairness model that fits your regulatory needs.",
  },
  {
    icon: Globe,
    title: "Multi-Currency",
    description:
      "Full support for major fiat and crypto currencies. Let players bet in their preferred denomination.",
  },
  {
    icon: Plug,
    title: "Drop-In Integration",
    description:
      "Go direct via SDK and API, or through Hub88 and Softswiss. Live in days, not months.",
  },
  {
    icon: Gift,
    title: "Free Bets API",
    description:
      "Full free bet and bonus fund integration with your platform. Players use bonuses seamlessly in-game.",
  },
  {
    icon: Languages,
    title: "Multi-Language",
    description:
      "Localized for 30+ markets with full translation support out of the box. Reach players everywhere.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
} as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function Capabilities() {
  return (
    <>
      {/* ── About ─────────────────────────────────────── */}
      <section id="company" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-medium text-white/30 uppercase tracking-[0.2em] block mb-4">
              [ About Us ]
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] max-w-3xl leading-[1.1] mb-6">
              We craft original instant games for the world&apos;s biggest
              casinos.
            </h2>
            <p className="text-base text-white/45 max-w-2xl leading-relaxed">
              Founded by the team behind Shuffle.com — one of the world&apos;s
              top five crypto betting brands — Origami re-packages
              high-performance crypto-style originals for the broader online
              casino market. Our games have processed over $20 billion in
              betting volume.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────── */}
      <section className="py-12 border-y border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="text-center md:text-left"
              >
                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-xs text-white/35 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities Grid ─────────────────────────── */}
      <section id="quickstart" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="text-xs font-medium text-white/30 uppercase tracking-[0.2em] block mb-4">
              [ Operator Capabilities ]
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em]">
              Retention Unlocked
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  variants={item}
                  className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] transition-colors duration-300"
                >
                  <Icon
                    size={20}
                    className="text-white/40 mb-4"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-sm font-semibold mb-2">{cap.title}</h3>
                  <p className="text-xs text-white/35 leading-relaxed">
                    {cap.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
