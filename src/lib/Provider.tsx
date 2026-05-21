"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

const AIAmbientCanvas = dynamic(() => import("@/components/ui/AIAmbientCanvas"), { ssr: false });
const AIGlowCursor = dynamic(() => import("@/components/ui/AIGlowCursor"), { ssr: false });

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({ once: true, duration: 700 });

    // Keep ScrollTrigger in sync with page scroll
    ScrollTrigger.refresh();
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="relative">
      <AIAmbientCanvas />
      <AIGlowCursor />
      <Toaster />
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
