"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Games", href: "#games" },
  { label: "Quickstart", href: "#quickstart" },
  { label: "Company", href: "#company" },
  { label: "Press", href: "#press" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav" : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-base font-semibold tracking-tight">
          Origami
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-[13px] text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <a
            href="#contact"
            className="text-[13px] text-white/50 hover:text-white transition-colors"
          >
            Contact
          </a>
          <a
            href="#games"
            className="px-4 py-1.5 text-[13px] font-medium text-black bg-white rounded-full hover:bg-white/90 transition-colors"
          >
            Live Demo
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white/60 hover:text-white transition-colors"
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/[0.06]"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/[0.06]">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="text-sm text-white/50"
                >
                  Contact
                </a>
                <a
                  href="#games"
                  onClick={() => setOpen(false)}
                  className="px-4 py-1.5 text-sm font-medium text-black bg-white rounded-full"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
