"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
  hue: number; // 260=violet, 185=cyan
}

interface Hotspot {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  phase: number;
  speed: number;
}

const AIAmbientCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let hotspots: Hotspot[] = [];
    let scanY = 0;
    let width = 0;
    let height = 0;
    let frame = 0;

    // ── Sizing ──────────────────────────────────────────────────────────────
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = document.documentElement.scrollHeight;
      createHotspots();
    };

    // ── Hotspots (large glowing nodes) ──────────────────────────────────────
    const createHotspots = () => {
      hotspots = [];
      const count = Math.floor(width / 300);
      for (let i = 0; i < count; i++) {
        hotspots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 60 + 40,
          alpha: Math.random() * 0.06 + 0.02,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.004 + 0.002,
        });
      }
    };

    // ── Particles ────────────────────────────────────────────────────────────
    const createParticles = () => {
      particles = [];
      const count = Math.floor((width * height) / 22000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          radius: Math.random() * 1.4 + 0.4,
          alpha: Math.random() * 0.45 + 0.08,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.01 + 0.004,
          hue: Math.random() > 0.5 ? 260 : 185,
        });
      }
    };

    // ── Grid ─────────────────────────────────────────────────────────────────
    const drawGrid = () => {
      const gridSize = 72;
      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        const distToMouse = Math.abs(x - mouseRef.current.x);
        const glow = Math.max(0, 1 - distToMouse / 200);
        ctx.strokeStyle = `rgba(139,92,246,${0.022 + glow * 0.04})`;
        ctx.lineWidth = 0.5 + glow * 0.5;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        const distToMouse = Math.abs(y - (mouseRef.current.y + window.scrollY));
        const glow = Math.max(0, 1 - distToMouse / 200);
        ctx.strokeStyle = `rgba(139,92,246,${0.022 + glow * 0.04})`;
        ctx.lineWidth = 0.5 + glow * 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    // ── Hotspot glows ────────────────────────────────────────────────────────
    const drawHotspots = () => {
      for (const h of hotspots) {
        h.phase += h.speed;
        const a = h.alpha * (0.5 + 0.5 * Math.sin(h.phase));
        const grad = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, h.radius);
        grad.addColorStop(0, `rgba(139,92,246,${a})`);
        grad.addColorStop(0.5, `rgba(139,92,246,${a * 0.3})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(h.x, h.y, h.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // ── Connections ──────────────────────────────────────────────────────────
    const drawConnections = () => {
      const maxDist = 130;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y + window.scrollY;

      for (let i = 0; i < particles.length; i++) {
        // Mouse attraction — pull particles gently toward cursor
        const dxm = mx - particles[i].x;
        const dym = my - particles[i].y;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < 180 && dm > 0) {
          const force = (180 - dm) / 180 * 0.0012;
          particles[i].vx += dxm * force;
          particles[i].vy += dym * force;
        }

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const t = 1 - dist / maxDist;
            // Brighten lines near mouse
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const dxMid = midX - mx;
            const dyMid = midY - my;
            const distMid = Math.sqrt(dxMid * dxMid + dyMid * dyMid);
            const mouseBright = Math.max(0, 1 - distMid / 250) * 0.12;

            const opacity = t * 0.07 + mouseBright;
            // Blend hue between the two particles
            const hue = (particles[i].hue + particles[j].hue) / 2;
            ctx.strokeStyle = `hsla(${hue},80%,70%,${opacity})`;
            ctx.lineWidth = 0.4 + t * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // ── Scan line ────────────────────────────────────────────────────────────
    const drawScanLine = () => {
      const scrollTop = window.scrollY;
      const viewH = window.innerHeight;
      // Only draw scan line within the visible viewport
      const visibleScanY = scrollTop + (scanY % viewH);
      const grad = ctx.createLinearGradient(0, visibleScanY - 40, 0, visibleScanY + 2);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(1, "rgba(139,92,246,0.04)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, visibleScanY - 40, width, 42);
      scanY += 0.8;
      if (scanY > viewH) scanY = 0;
    };

    // ── Main loop ────────────────────────────────────────────────────────────
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      drawGrid();
      drawHotspots();
      drawConnections();
      drawScanLine();

      for (const p of particles) {
        p.pulse += p.pulseSpeed;
        const pulsedAlpha = p.alpha * (0.55 + 0.45 * Math.sin(p.pulse));

        // Glow near mouse
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - (mouseRef.current.y + window.scrollY);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseGlow = dist < 150 ? (1 - dist / 150) * 0.5 : 0;
        const finalAlpha = Math.min(1, pulsedAlpha + mouseGlow);
        const finalRadius = p.radius + mouseGlow * 1.5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, finalRadius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,75%,${finalAlpha})`;
        ctx.fill();

        // Clamp velocity to prevent runaway
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.6) {
          p.vx = (p.vx / speed) * 0.6;
          p.vy = (p.vy / speed) * 0.6;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }

      animId = requestAnimationFrame(animate);
    };

    // ── Mouse tracking ───────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", () => { resize(); createParticles(); });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", () => { resize(); createParticles(); });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.7 }}
    />
  );
};

export default AIAmbientCanvas;
