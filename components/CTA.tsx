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
            [ The New Standard for Instant Casino Games ]
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-10">
            Add Origami Originals
            <br />
            To Your Casino
          </h2>
          <a
            href="mailto:hello@betorigami.com"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Contact us
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
