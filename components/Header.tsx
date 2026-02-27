"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "GAMES", href: "#games" },
  { label: "CUSTOMISATION", href: "#quickstart" },
  { label: "INTEGRATION", href: "#quickstart" },
  { label: "PROVABLY FAIR", href: "#company" },
  { label: "BANKROLL", href: "#contact" },
];

function OrigamiLogo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path d="M16 2L30 16L16 30L2 16Z" stroke="white" strokeWidth="1.5" />
      <path d="M16 2L2 16L16 16Z" fill="white" fillOpacity="0.12" />
      <path d="M16 2L30 16L16 16Z" fill="white" fillOpacity="0.28" />
      <path d="M30 16L16 30L16 16Z" fill="white" fillOpacity="0.45" />
      <path d="M2 16L16 16L16 30Z" fill="white" fillOpacity="0.08" />
    </svg>
  );
}

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
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-[1400px] px-6 lg:px-10 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
          <OrigamiLogo />
          <span className="text-[15px] font-semibold tracking-tight">
            Origami
          </span>
        </a>

        {/* Desktop nav — center */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3.5 py-2 text-[11px] font-medium text-white/45 hover:text-white tracking-[0.14em] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop contact — right */}
        <a
          href="#contact"
          className="hidden lg:inline-flex px-5 py-2 text-[11px] font-medium text-white/60 tracking-[0.14em] border border-white/20 rounded-full hover:border-white/40 hover:text-white transition-all flex-shrink-0"
        >
          CONTACT
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white/60 hover:text-white transition-colors"
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/[0.06]"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-[11px] font-medium text-white/45 hover:text-white tracking-[0.14em] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex justify-center px-5 py-2.5 text-[11px] font-medium text-white/60 tracking-[0.14em] border border-white/20 rounded-full"
              >
                CONTACT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
