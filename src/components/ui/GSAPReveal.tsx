"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TRevealVariant = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn" | "glowIn" | "slideReveal";

interface GSAPRevealProps {
  children: React.ReactNode;
  variant?: TRevealVariant;
  delay?: number;
  duration?: number;
  stagger?: number;       // stagger children if > 0
  className?: string;
  once?: boolean;
  start?: string;         // ScrollTrigger start e.g. "top 85%"
}

const fromVars: Record<TRevealVariant, gsap.TweenVars> = {
  fadeUp:      { opacity: 0, y: 50 },
  fadeLeft:    { opacity: 0, x: -50 },
  fadeRight:   { opacity: 0, x: 50 },
  scaleIn:     { opacity: 0, scale: 0.88 },
  glowIn:      { opacity: 0, y: 24, filter: "blur(12px)" },
  slideReveal: { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
};

const toVars: Record<TRevealVariant, gsap.TweenVars> = {
  fadeUp:      { opacity: 1, y: 0 },
  fadeLeft:    { opacity: 1, x: 0 },
  fadeRight:   { opacity: 1, x: 0 },
  scaleIn:     { opacity: 1, scale: 1 },
  glowIn:      { opacity: 1, y: 0, filter: "blur(0px)" },
  slideReveal: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
};

const GSAPReveal = ({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.9,
  stagger = 0,
  className,
  once = true,
  start = "top 88%",
}: GSAPRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger > 0 ? Array.from(el.children) : [el];

    // Set initial state
    gsap.set(targets, { ...fromVars[variant] });

    const tween = gsap.to(targets, {
      ...toVars[variant],
      duration,
      delay,
      stagger: stagger > 0 ? stagger : 0,
      ease: variant === "glowIn" ? "expo.out" : "power3.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? "play none none none" : "play none none reverse",
        onEnter: () => {
          // Brief violet glow flash on the wrapper
          gsap.fromTo(
            el,
            { boxShadow: "0 0 0px rgba(139,92,246,0)" },
            {
              boxShadow: "0 0 40px rgba(139,92,246,0.08)",
              duration: 0.4,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
            }
          );
        },
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el) st.kill();
      });
    };
  }, [variant, delay, duration, stagger, once, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default GSAPReveal;
