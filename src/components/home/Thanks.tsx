"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Thanks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    const line = lineRef.current;
    if (!el || !line) return;

    // Infinite horizontal marquee
    gsap.to(el, {
      xPercent: -50,
      duration: 18,
      ease: "none",
      repeat: -1,
    });

    // Scan line across the bar
    gsap.fromTo(
      line,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 2.5, ease: "power2.inOut", repeat: -1, yoyo: true }
    );
  }, []);

  const label = "Thank you for visiting · Built with Next.js · Powered by AI tooling · ";

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden border-t border-zinc-800/60 bg-zinc-950/80 py-4"
    >
      {/* Scan line */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
      />

      {/* Marquee track — doubled for seamless loop */}
      <div ref={textRef} className="flex whitespace-nowrap will-change-transform">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-[11px] font-mono text-zinc-500 tracking-widest uppercase px-8"
          >
            {label}
            <span className="text-violet-500/60 mx-2">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Thanks;
