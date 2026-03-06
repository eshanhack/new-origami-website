"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Palette,
  PlugZap,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    icon: Boxes,
    title: "Choose the originals you want live",
    description:
      "Launch proven instant games like Dice, Mines, Plinko, Limbo, Keno, and Blackjack instead of starting from scratch.",
  },
  {
    icon: Palette,
    title: "Make them look native to your brand",
    description:
      "Origami customizes colors, fonts, logos, motion, and RTP so players feel like they are still inside your product.",
  },
  {
    icon: PlugZap,
    title: "Integrate direct or through aggregators",
    description:
      "Go live through Hub88 and SOFTSWISS, or integrate directly with SDKs and APIs when you want more control and better economics.",
  },
  {
    icon: Rocket,
    title: "Operate at scale from day one",
    description:
      "Fast game loads, provably fair options, multi-currency support, free bets, and multi-language coverage are already built in.",
  },
];

const controls = [
  "Branding: colors, fonts, logos, animations",
  "Economics: RTP, edge, bankroll behavior",
  "Distribution: direct, Hub88, SOFTSWISS",
  "Compliance: certified fairness and auditability",
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-white/[0.06] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-white/30">
              [ How Origami Works ]
            </span>
            <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-4xl lg:text-5xl">
              The fastest path to first-party-feeling originals.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/45">
              Origami is a B2B platform for launching branded instant casino
              games. We supply the game engine, performance, fairness, and
              operator tooling. You keep the player relationship, own the brand
              experience, and go live without years of internal game R&D.
            </p>

            <div className="mt-8 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                <ShieldCheck size={16} className="text-white/45" />
                What operators control
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {controls.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/[0.05] bg-black/20 px-4 py-3 text-sm leading-relaxed text-white/45"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white/[0.05] text-white/55">
                      <Icon size={18} strokeWidth={1.7} />
                    </div>
                    <div>
                      <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/25">
                        Step {index + 1}
                      </div>
                      <h3 className="text-base font-semibold text-white/88">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/42">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
