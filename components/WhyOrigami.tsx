"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

const reasons = [
  {
    stat: "$20B+",
    title: "Proven Scalability",
    description: "Annualized bets processed across our network",
    bar: 95,
    color: "#7C5CFC",
  },
  {
    stat: "<50ms",
    title: "Ultra-Low Latency",
    description: "Response times — faster than a blink",
    bar: 98,
    color: "#F59E0B",
  },
  {
    stat: "99.9%",
    title: "Ironclad Reliability",
    description: "Uptime with auto-scaling infrastructure",
    bar: 99,
    color: "#10B981",
  },
  {
    stat: "3G Ready",
    title: "Emerging Market Ready",
    description: "Lightning fast on low-end devices and slow networks",
    bar: 85,
    color: "#0EA5E9",
  },
  {
    stat: "ECVRF",
    title: "Provably Fair",
    description: "Unriggable, cryptographic outcomes — audited by GLI",
    bar: 100,
    color: "#F43F5E",
  },
  {
    stat: "24/7",
    title: "World-Class Support",
    description: "B2C-level support in a B2B world",
    bar: 90,
    color: "#D946EF",
  },
  {
    stat: "30+",
    title: "Global Compliance",
    description: "Markets — certified and licensed worldwide",
    bar: 80,
    color: "#14B8A6",
  },
];

function CountUp({ target, inView }: { target: string; inView: boolean }) {
  const numMatch = target.match(/^([^0-9]*)(\d+\.?\d*)([^0-9]*)$/);
  const motionVal = useMotionValue(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView || done || !numMatch) return;
    const end = parseFloat(numMatch[2]);
    const controls = animate(motionVal, end, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => setDone(true),
    });
    return controls.stop;
  }, [inView, done, motionVal, numMatch]);

  const display = useTransform(motionVal, (v) => {
    if (!numMatch) return target;
    const num = numMatch[2].includes(".") ? v.toFixed(1) : Math.round(v).toString();
    return `${numMatch[1]}${num}${numMatch[3]}`;
  });

  if (!numMatch) return <>{target}</>;

  return <motion.span>{display}</motion.span>;
}

function ReasonRow({
  reason,
  index,
  inView,
}: {
  reason: (typeof reasons)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      {/* Row content */}
      <div className="relative grid grid-cols-[1fr] md:grid-cols-[200px_1fr_280px] items-center gap-4 md:gap-8 py-7 md:py-8 cursor-default">
        {/* Stat */}
        <div className="relative">
          <p
            className="text-4xl sm:text-5xl md:text-[56px] font-extrabold tracking-[-0.04em] leading-none transition-colors duration-500"
            style={{ color: hovered ? reason.color : "white" }}
          >
            <CountUp target={reason.stat} inView={inView} />
          </p>
        </div>

        {/* Animated bar */}
        <div className="relative h-[2px] rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ backgroundColor: reason.color }}
            initial={{ width: "0%" }}
            animate={inView ? { width: `${reason.bar}%` } : {}}
            transition={{
              duration: 1.4,
              delay: index * 0.12 + 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
          {/* Glow pulse on hover */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full blur-sm"
            style={{ backgroundColor: reason.color }}
            initial={{ width: "0%", opacity: 0 }}
            animate={
              hovered
                ? { width: `${reason.bar}%`, opacity: 0.6 }
                : inView
                  ? { width: `${reason.bar}%`, opacity: 0 }
                  : {}
            }
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Title + description */}
        <div className="md:text-right">
          <h3 className="text-sm font-semibold text-white/90 mb-0.5 transition-colors duration-300 group-hover:text-white">
            {reason.title}
          </h3>
          <p className="text-xs text-white/30 leading-relaxed transition-colors duration-300 group-hover:text-white/50">
            {reason.description}
          </p>
        </div>
      </div>

      {/* Glow backdrop on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-x-6 inset-y-0 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, ${reason.color}08 0%, transparent 70%)`,
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Bottom separator */}
      <div className="h-px bg-white/[0.06]" />
    </motion.div>
  );
}

export function WhyOrigami() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <span className="text-xs font-medium text-white/30 uppercase tracking-[0.2em] block mb-4">
            [ The Origami Advantage ]
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] max-w-2xl leading-[1.05]">
            Built for scale.
            <br />
            <span className="text-white/30">Designed for trust.</span>
          </h2>
        </motion.div>

        <div ref={ref} className="h-px bg-white/[0.06] mb-0" />

        {reasons.map((reason, i) => (
          <ReasonRow key={reason.title} reason={reason} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
