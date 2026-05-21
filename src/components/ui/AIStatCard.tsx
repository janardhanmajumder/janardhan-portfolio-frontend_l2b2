"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AIStatCardProps {
  content: number;
  suffix: string;
  status: string;
  color: "violet" | "cyan" | "fuchsia";
  index: number;
}

const colorMap = {
  violet:  { text: "text-violet-400",  border: "border-violet-500/40",  glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]",  bar: "from-violet-500 via-fuchsia-400 to-violet-500" },
  cyan:    { text: "text-cyan-400",    border: "border-cyan-500/40",    glow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]",   bar: "from-cyan-500 via-sky-400 to-cyan-500" },
  fuchsia: { text: "text-fuchsia-400", border: "border-fuchsia-500/40", glow: "hover:shadow-[0_0_30px_rgba(217,70,239,0.2)]",   bar: "from-fuchsia-500 via-pink-400 to-fuchsia-500" },
};

const AIStatCard = ({ content, suffix, status, color, index }: AIStatCardProps) => {
  const numRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const c = colorMap[color];

  useEffect(() => {
    const el = numRef.current;
    const card = cardRef.current;
    if (!el || !card) return;

    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: content,
          duration: 1.8,
          delay: index * 0.15,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString();
          },
        });
        // Card entrance
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: index * 0.15, ease: "power3.out" }
        );
      },
    });
  }, [content, index]);

  return (
    <div
      ref={cardRef}
      style={{ opacity: 0 }}
      className={`group w-full bg-zinc-900/30 backdrop-blur-md border ${c.border} shadow-xl rounded-2xl overflow-hidden hover:-translate-y-2 ${c.glow} transition-all duration-500 cursor-default`}
    >
      <div className="space-y-3 px-8 pt-8 pb-7 bg-zinc-950/20 h-36 relative">
        {/* Background number watermark */}
        <span className={`absolute right-4 top-2 text-6xl font-black ${c.text} opacity-5 font-heading select-none`}>
          {content}
        </span>
        <h1 className={`text-3xl font-bold font-heading text-white group-hover:${c.text} transition-colors`}>
          <span ref={numRef}>0</span>
          <span>{suffix}</span>
        </h1>
        <h4 className="text-sm tracking-wider uppercase text-zinc-400">{status}</h4>
      </div>
      {/* Animated bottom bar */}
      <div className={`w-full h-[3px] bg-gradient-to-r ${c.bar} bg-[length:200%_100%] animate-[shimmerBar_2s_linear_infinite]`} />
    </div>
  );
};

export default AIStatCard;
