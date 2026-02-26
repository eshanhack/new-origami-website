"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Case Studies", href: "#" },
    { label: "Customization", href: "#integration" },
    { label: "Integration", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  Company: [
    { label: "Careers", href: "#" },
    { label: "Support", href: "#" },
    { label: "Contact", href: "#contact" },
    { label: "Brand Guidelines", href: "#" },
  ],
  Socials: [
    { label: "X / Twitter", href: "https://x.com/betorigami" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/betorigami" },
    { label: "Blog", href: "#" },
  ],
};

function FooterLogo() {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className="flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 2L30 16L16 30L2 16L16 2Z"
            stroke="#555"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M16 8L24 16L16 24L8 16L16 8Z"
            stroke="#555"
            strokeWidth="1"
            fill="rgba(255,255,255,0.03)"
          />
        </svg>
        <span className="text-sm font-semibold text-[#555]">Origami</span>
      </div>
    );
  }

  return (
    <Image
      src="/logo.png"
      alt="Origami"
      width={100}
      height={28}
      className="h-6 w-auto opacity-50"
      onError={() => setImgError(true)}
    />
  );
}

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/[0.05]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10"
        >
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <FooterLogo />
            <p className="text-xs text-[#444] mt-4 leading-relaxed max-w-xs">
              Original instant games moulded to fit your online casino brand.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-[#666] uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#555] hover:text-[#999] transition-colors duration-200"
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#333]">
            &copy; {new Date().getFullYear()} Origami. All rights reserved.
          </p>
          <p className="text-[11px] text-[#333]">
            Built with love in Melbourne
          </p>
        </div>
      </div>
    </footer>
  );
}
