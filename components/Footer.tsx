"use client";

const sections: Record<string, { label: string; href: string }[]> = {
  Origami: [
    { label: "Live Product", href: "#games" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Why Origami", href: "#company" },
    { label: "Capabilities", href: "#quickstart" },
    { label: "Launches", href: "#press" },
  ],
  Resources: [
    { label: "Live Demo", href: "#games" },
    { label: "Documentation", href: "https://docs.betorigami.com/" },
    { label: "Softswiss Launch", href: "https://betorigami.com/blog/softswiss" },
    { label: "Hub88 Launch", href: "https://betorigami.com/blog/hub88" },
    { label: "Contact", href: "#contact" },
  ],
  Socials: [
    { label: "X / Twitter", href: "https://x.com/betorigami" },
    { label: "Blog", href: "https://betorigami.com/blog" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/betorigami",
    },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <span className="text-sm font-semibold">Origami</span>
            <p className="mt-3 max-w-[220px] text-[11px] leading-relaxed text-white/25">
              Branded instant casino games for operators who want originals
              that feel native, load fast, and scale cleanly.
            </p>
            <p className="mt-4 text-[11px] text-white/20 leading-relaxed">
              © {new Date().getFullYear()} Origami
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(sections).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-white/50 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-white/25 hover:text-white/60 transition-colors"
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
        </div>
      </div>
    </footer>
  );
}
