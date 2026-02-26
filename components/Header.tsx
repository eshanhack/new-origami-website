"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Games", href: "#games" },
  { label: "Integration", href: "#integration" },
  { label: "Provably Fair", href: "#fairness" },
  { label: "Bankroll", href: "#bankroll" },
];

function OrigamiLogo() {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className="flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 2L30 16L16 30L2 16L16 2Z"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M16 8L24 16L16 24L8 16L16 8Z"
            stroke="white"
            strokeWidth="1"
            fill="rgba(255,255,255,0.06)"
          />
        </svg>
        <span className="text-base font-semibold tracking-tight">Origami</span>
      </div>
    );
  }

  return (
    <Image
      src="/logo.png"
      alt="Origami"
      width={120}
      height={32}
      className="h-7 w-auto"
      onError={() => setImgError(true)}
      priority
    />
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass" : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex-shrink-0">
          <OrigamiLogo />
        </a>

        <div className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => (
            <a
              key={tab.href}
              href={tab.href}
              className="px-4 py-2 text-[13px] text-[#777] hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
            >
              {tab.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="px-5 py-2 text-[13px] font-medium bg-white text-black rounded-full hover:bg-white/90 transition-colors duration-200"
          >
            Talk to Us
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#777] hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#050505]/95 backdrop-blur-xl border-t border-white/[0.06]"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {tabs.map((tab) => (
                <a
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm text-[#777] hover:text-white transition-colors"
                >
                  {tab.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 py-2.5 text-center text-sm font-medium bg-white text-black rounded-full"
              >
                Talk to Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
