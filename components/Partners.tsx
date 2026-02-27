"use client";

import { motion } from "framer-motion";

const partners = [
  "Hub88",
  "Softswiss",
  "Shuffle",
  "Bitcasino",
  "Sportsbet.io",
  "500 Casino",
  "Rivalry",
  "SpinBet",
  "Cloudbet",
  "Menace",
];

function MarqueeRow({
  items,
  duration,
}: {
  items: string[];
  duration: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div
        className="flex shrink-0 animate-marquee gap-3"
        style={{ "--duration": `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex-shrink-0 px-5 py-2 rounded-full border border-white/[0.08] text-sm text-white/35 whitespace-nowrap hover:text-white/60 hover:border-white/15 transition-colors duration-300 cursor-default"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Partners() {
  const row1 = partners;
  const row2 = [...partners].reverse();
  const row3 = [...partners.slice(5), ...partners.slice(0, 5)];

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-medium text-white/30 uppercase tracking-[0.2em] block mb-4">
            [ Our Partners ]
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              <span className="text-white/40">10+</span> Live Operators
            </h2>
            <a
              href="#contact"
              className="text-sm text-white/40 hover:text-white transition-colors underline underline-offset-4 decoration-white/20"
            >
              Contact Sales
            </a>
          </div>
        </motion.div>
      </div>

      <div className="space-y-3">
        <MarqueeRow items={row1} duration={35} />
        <MarqueeRow items={row2} duration={48} />
        <MarqueeRow items={row3} duration={40} />
      </div>
    </section>
  );
}
