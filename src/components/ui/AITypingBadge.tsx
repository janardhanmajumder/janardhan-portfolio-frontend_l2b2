"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const phrases = [
  "Building intelligent web experiences",
  "Powered by modern AI tooling",
  "Full-Stack · NestJS · Next.js · AWS",
  "Exploring system design & scalability",
];

const AITypingBadge = () => {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Typing logic
  useEffect(() => {
    const current = phrases[phraseIdx];
    if (typing) {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          36
        );
      } else {
        timeoutRef.current = setTimeout(() => setTyping(false), 2400);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          16
        );
      } else {
        setPhraseIdx((i) => (i + 1) % phrases.length);
        setTyping(true);
      }
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, typing, phraseIdx]);

  // Shimmer border animation via GSAP
  useEffect(() => {
    const el = badgeRef.current;
    if (!el) return;
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(el, {
      boxShadow: "0 0 12px rgba(139,92,246,0.5), 0 0 24px rgba(139,92,246,0.15)",
      duration: 1.4,
      ease: "sine.inOut",
    }).to(el, {
      boxShadow: "0 0 4px rgba(34,211,238,0.3), 0 0 12px rgba(34,211,238,0.08)",
      duration: 1.4,
      ease: "sine.inOut",
    });
    return () => { tl.kill(); };
  }, []);

  return (
    <div
      ref={badgeRef}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-violet-500/30 bg-zinc-950/60 backdrop-blur-md"
    >
      {/* Animated AI indicator */}
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-50" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-br from-violet-400 to-cyan-400" />
      </span>

      {/* Label */}
      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
        AI
      </span>

      {/* Divider */}
      <span className="w-px h-3 bg-zinc-700" />

      {/* Typed text */}
      <span className="text-[11px] font-mono text-violet-300 tracking-wide min-w-[200px] sm:min-w-[240px]">
        {displayed}
        <span className="text-cyan-400 animate-pulse">▋</span>
      </span>
    </div>
  );
};

export default AITypingBadge;
