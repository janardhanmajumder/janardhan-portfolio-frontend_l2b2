"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AIGlowCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const trail = trailRef.current;
    if (!dot || !ring || !trail) return;

    // Hide default cursor on desktop
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      // Dot snaps instantly
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "none",
      });
      // Ring follows with lag
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: "power2.out",
      });
      // Trail follows even slower
      gsap.to(trail, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.9,
        ease: "power1.out",
      });
    };

    // Scale up on interactive elements
    const onEnter = () => {
      gsap.to(ring, { scale: 2.2, borderColor: "rgba(34,211,238,0.6)", duration: 0.25 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(139,92,246,0.35)", duration: 0.25 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea, label");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMove);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Core dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9999,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(167,139,250,1)",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 8px 2px rgba(167,139,250,0.7)",
          willChange: "transform",
        }}
      />

      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9998,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(139,92,246,0.35)",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Slow ambient trail */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9997,
          width: 80,
          height: 80,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 65%)",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default AIGlowCursor;
