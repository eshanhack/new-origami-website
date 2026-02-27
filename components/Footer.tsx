"use client";

const sections: Record<string, { label: string; href: string }[]> = {
  Origami: [
    { label: "Games", href: "#games" },
    { label: "Company", href: "#company" },
    { label: "Partners", href: "#" },
    { label: "Quickstart", href: "#quickstart" },
    { label: "Press", href: "#press" },
  ],
  Resources: [
    { label: "Live Demo", href: "#games" },
    { label: "Features", href: "#quickstart" },
    { label: "Brand Assets", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
  Socials: [
    { label: "X / Twitter", href: "https://x.com/betorigami" },
    { label: "Instagram", href: "#" },
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
            <p className="mt-3 text-[11px] text-white/25 leading-relaxed">
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
