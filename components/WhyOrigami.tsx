"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  TrendingUp,
  Zap,
  Shield,
  Smartphone,
  Lock,
  Headphones,
  Globe,
} from "lucide-react";

const reasons = [
  {
    icon: TrendingUp,
    title: "Proven Scalability",
    stat: "$20B",
    statSuffix: "+",
    description: "In annualized bets processed across our network",
    accent: "from-violet-500/20 to-violet-500/0",
    accentBorder: "group-hover:border-violet-500/30",
  },
  {
    icon: Zap,
    title: "Ultra-Low Latency",
    stat: "<50",
    statSuffix: "ms",
    description: "Response times — faster than a blink",
    accent: "from-amber-500/20 to-amber-500/0",
    accentBorder: "group-hover:border-amber-500/30",
  },
  {
    icon: Shield,
    title: "Ironclad Reliability",
    stat: "99.9",
    statSuffix: "%",
    description: "Uptime with auto-scaling infrastructure",
    accent: "from-emerald-500/20 to-emerald-500/0",
    accentBorder: "group-hover:border-emerald-500/30",
  },
  {
    icon: Smartphone,
    title: "Emerging Market Ready",
    stat: "3G",
    statSuffix: "",
    description: "Lightning fast on low-end devices and slow networks",
    accent: "from-sky-500/20 to-sky-500/0",
    accentBorder: "group-hover:border-sky-500/30",
  },
  {
    icon: Lock,
    title: "Provably Fair",
    stat: "ECVRF",
    statSuffix: "",
    description: "Unriggable, cryptographic outcomes — audited by GLI",
    accent: "from-rose-500/20 to-rose-500/0",
    accentBorder: "group-hover:border-rose-500/30",
  },
  {
    icon: Headphones,
    title: "World-Class Support",
    stat: "B2C",
    statSuffix: "",
    description: "Level support in a B2B world — your success is ours",
    accent: "from-fuchsia-500/20 to-fuchsia-500/0",
    accentBorder: "group-hover:border-fuchsia-500/30",
  },
  {
    icon: Globe,
    title: "Global Compliance",
    stat: "30+",
    statSuffix: "",
    description: "Markets — certified and licensed worldwide",
    accent: "from-teal-500/20 to-teal-500/0",
    accentBorder: "group-hover:border-teal-500/30",
  },
];

function AnimatedStat({
  value,
  suffix,
  inView,
}: {
  value: string;
  suffix: string;
  inView: boolean;
}) {
  const numericMatch = value.match(/^([<$]?)(\d+\.?\d*)(.*)/);
  const [display, setDisplay] = useState(numericMatch ? "0" : value);

  const animate = useCallback(() => {
    if (!numericMatch) {
      setDisplay(value);
      return;
    }

    const prefix = numericMatch[1];
    const target = parseFloat(numericMatch[2]);
    const extra = numericMatch[3];
    const isDecimal = numericMatch[2].includes(".");
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (isDecimal) {
        setDisplay(`${prefix}${current.toFixed(1)}${extra}`);
      } else {
        setDisplay(`${prefix}${Math.round(current)}${extra}`);
      }

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [numericMatch, value]);

  useEffect(() => {
    if (inView) animate();
  }, [inView, animate]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
} as const;

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function WhyOrigami() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-medium text-white/30 uppercase tracking-[0.2em] block mb-4">
            [ The Origami Advantage ]
          </span>
          <h2 className="font-degular text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Why Origami?
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={cardVariant}
                className={`group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.015] overflow-hidden transition-all duration-500 hover:bg-white/[0.04] ${reason.accentBorder}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${reason.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <Icon
                    size={18}
                    className="text-white/30 mb-4 group-hover:text-white/60 transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                  <p className="font-degular text-3xl md:text-4xl font-bold tracking-tight mb-1 tabular-nums">
                    <AnimatedStat
                      value={reason.stat}
                      suffix={reason.statSuffix}
                      inView={inView}
                    />
                  </p>
                  <h3 className="text-sm font-semibold text-white/80 mb-1.5">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-white/35 leading-relaxed group-hover:text-white/50 transition-colors duration-300">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
