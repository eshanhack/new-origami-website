"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section
      id="contact"
      className="py-28 md:py-40 border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-medium text-white/30 uppercase tracking-[0.2em] block mb-6">
            [ Next Step ]
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.1] mb-10">
            See how Origami would fit
            <br />
            inside your casino
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/42">
            If you want to understand commercial fit, integration paths,
            customization scope, or rollout timelines, the fastest next step is
            a product walkthrough with the Origami team.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:hello@betorigami.com"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              Talk to Origami
              <ArrowRight size={16} />
            </a>
            <a
              href="https://docs.betorigami.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white/72 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              View documentation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
