"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const layers = [
  {
    id: "frame",
    label: "Frame Color",
    description:
      "Set the outer frame to match your casino's primary brand color. Supports any hex, RGB, or HSL value via the API.",
    color: "#6366f1",
    bg: "rgba(99, 102, 241, 0.07)",
    glow: "rgba(99, 102, 241, 0.18)",
  },
  {
    id: "header",
    label: "Casino Logo",
    description:
      "Replace the default header with your casino's logo. Players see your brand, not ours. Supports SVG, PNG, and WebP up to 200 KB.",
    color: "#ec4899",
    bg: "rgba(236, 72, 153, 0.07)",
    glow: "rgba(236, 72, 153, 0.18)",
  },
  {
    id: "board",
    label: "Game Board",
    description:
      "Customize the game board — grid colors, tile styles, active states, and win animations. Full control over the core gameplay visual.",
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.07)",
    glow: "rgba(16, 185, 129, 0.18)",
  },
  {
    id: "controls",
    label: "Bet Controls",
    description:
      "Style bet buttons, input fields, sliders, and quick-action controls. Match your existing UI kit for a seamless player experience.",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.07)",
    glow: "rgba(245, 158, 11, 0.18)",
  },
  {
    id: "typography",
    label: "Typography",
    description:
      "Override fonts, sizes, weights, and text colors globally. Bring your own typeface via CDN or self-hosted files for complete brand consistency.",
    color: "#06b6d4",
    bg: "rgba(6, 182, 212, 0.07)",
    glow: "rgba(6, 182, 212, 0.18)",
  },
  {
    id: "footer",
    label: "Footer Logo",
    description:
      "Add your 'Powered by' branding, regulatory badges, or responsible gaming disclaimers in the footer area of every game instance.",
    color: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.07)",
    glow: "rgba(139, 92, 246, 0.18)",
  },
];

function LayerVisual({
  layer,
  isHovered,
}: {
  layer: (typeof layers)[number];
  isHovered: boolean;
}) {
  const opacity = isHovered ? 0.35 : 0.1;
  const transition = "opacity 0.4s";

  switch (layer.id) {
    case "frame":
      return (
        <div
          className="absolute inset-3 rounded-lg border-2"
          style={{
            borderColor: layer.color,
            opacity: isHovered ? 0.4 : 0.12,
            transition,
          }}
        />
      );
    case "header":
      return (
        <div
          className="absolute top-5 left-5 right-5 h-10 rounded-md"
          style={{ background: layer.color, opacity, transition }}
        />
      );
    case "board":
      return (
        <div className="absolute inset-12 grid grid-cols-3 grid-rows-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, j) => (
            <div
              key={j}
              className="rounded-sm"
              style={{ background: layer.color, opacity, transition }}
            />
          ))}
        </div>
      );
    case "controls":
      return (
        <div className="absolute bottom-12 left-5 right-5 flex gap-2">
          <div
            className="flex-1 h-8 rounded-md"
            style={{ background: layer.color, opacity, transition }}
          />
          <div
            className="w-14 h-8 rounded-md"
            style={{ background: layer.color, opacity, transition }}
          />
        </div>
      );
    case "typography":
      return (
        <div className="absolute top-20 left-5 right-5 space-y-2">
          <div
            className="h-4 w-3/5 rounded"
            style={{ background: layer.color, opacity, transition }}
          />
          <div
            className="h-3 w-2/5 rounded"
            style={{
              background: layer.color,
              opacity: opacity * 0.7,
              transition,
            }}
          />
        </div>
      );
    case "footer":
      return (
        <div className="absolute bottom-5 left-5 right-5 flex justify-center">
          <div
            className="h-5 w-20 rounded"
            style={{ background: layer.color, opacity, transition }}
          />
        </div>
      );
    default:
      return null;
  }
}

export function CustomizationLayers() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeLayer = layers.find((l) => l.id === hoveredId);

  return (
    <section id="integration" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ── Left: Info Panel ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium text-[#555] uppercase tracking-[0.2em] block mb-4">
              Customization
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-[1.1]">
              100% flexibility, change whatever you want
            </h2>
            <p className="text-[#777] text-base md:text-lg leading-relaxed mb-10">
              Every visual element of your Origami games is configurable. Your
              players won&apos;t be able to tell they&apos;re playing
              third-party games.
            </p>

            {/* Dynamic hover info */}
            <div className="min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredId || "default"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.015]"
                >
                  {activeLayer ? (
                    <>
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: activeLayer.color }}
                        />
                        <h3 className="text-base font-semibold">
                          {activeLayer.label}
                        </h3>
                      </div>
                      <p className="text-[#888] text-sm leading-relaxed">
                        {activeLayer.description}
                      </p>
                    </>
                  ) : (
                    <p className="text-[#555] text-sm leading-relaxed">
                      Hover over the exploded layers to explore customization
                      options →
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile: clickable layer list */}
            <div className="lg:hidden mt-8 space-y-2">
              {layers.map((layer) => {
                const isOpen = hoveredId === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() =>
                      setHoveredId(isOpen ? null : layer.id)
                    }
                    className="w-full p-4 rounded-xl border text-left transition-all duration-300"
                    style={{
                      borderColor: isOpen
                        ? layer.color
                        : "rgba(255,255,255,0.06)",
                      background: isOpen ? layer.bg : "transparent",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: layer.color }}
                      />
                      <span className="text-sm font-medium">
                        {layer.label}
                      </span>
                    </div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                            marginTop: 8,
                          }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="text-xs text-[#888] leading-relaxed overflow-hidden"
                        >
                          {layer.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ── Right: 3D Exploded View (desktop) ─────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden lg:flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            <div
              className="relative"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(55deg) rotateZ(-25deg)",
                width: "300px",
                height: "400px",
              }}
            >
              {layers.map((layer, i) => {
                const isHovered = hoveredId === layer.id;
                const baseZ = i * 35;
                const z = isHovered ? baseZ + 45 : baseZ;

                return (
                  <div
                    key={layer.id}
                    className="absolute inset-0 rounded-xl cursor-pointer"
                    style={{
                      transform: `translateZ(${z}px)`,
                      background: layer.bg,
                      border: `1.5px solid ${isHovered ? layer.color : "rgba(255,255,255,0.04)"}`,
                      boxShadow: isHovered
                        ? `0 0 30px ${layer.glow}, 0 25px 50px rgba(0,0,0,0.4)`
                        : "0 2px 20px rgba(0,0,0,0.12)",
                      transition:
                        "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    onMouseEnter={() => setHoveredId(layer.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <LayerVisual layer={layer} isHovered={isHovered} />

                    <div className="absolute bottom-3.5 left-4 right-4">
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.15em]"
                        style={{
                          color: isHovered
                            ? layer.color
                            : "rgba(255,255,255,0.2)",
                          transition: "color 0.3s",
                        }}
                      >
                        {layer.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
