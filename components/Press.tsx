"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    date: "2025",
    title: "Origami is now live on Softswiss",
    description:
      "Operators can now launch premium original casino games through SOFTSWISS, built for full brand ownership and operational flexibility.",
    href: "https://betorigami.com/blog/softswiss",
  },
  {
    date: "2025",
    title: "500 Casino Goes Live with Origami",
    description:
      "500 Casino, one of the largest crypto brands globally, has integrated with Origami to drive higher GGR and boost user acquisition.",
    href: "https://betorigami.com/blog/500Casino",
  },
  {
    date: "2025",
    title: "Rivalry Goes Live with Origami",
    description:
      "Rivalry, a TSX-listed modern iGaming operator, is now live with Origami's suite of original house games.",
    href: "https://betorigami.com/blog/rivalry",
  },
  {
    date: "2025",
    title: "Origami is now live on Hub88",
    description:
      "Origami is officially live on Hub88, one of the most trusted and fastest-growing iGaming aggregators in the industry.",
    href: "https://betorigami.com/blog/hub88",
  },
  {
    date: "2025",
    title: "Shuffle Games creators launch Origami",
    description:
      "Former Shuffle.com executives launch Origami, bringing battle-tested instant games with $20bn+ in betting volume to the broader market.",
    href: "https://betorigami.com/blog/launch",
  },
];

export function Press() {
  return (
    <section id="press" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-medium text-white/30 uppercase tracking-[0.2em] block mb-4">
            [ In the Press ]
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Highlights
          </h2>
        </motion.div>

        <div className="space-y-4">
          {articles.map((article, i) => (
            <motion.a
              key={article.title}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-8 p-6 rounded-2xl border border-white/[0.06] hover:bg-white/[0.02] transition-colors duration-300"
            >
              <span className="text-xs text-white/25 font-medium md:w-16 flex-shrink-0 pt-0.5">
                [{article.date}]
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold group-hover:text-white transition-colors mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-white/35 leading-relaxed">
                  {article.description}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/25 group-hover:text-white/50 transition-colors flex-shrink-0 md:pt-1">
                Read More
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
