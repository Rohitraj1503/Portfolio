"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, Volume2 } from "lucide-react";
import { getAudioContext } from "@/utils/audioHelper";

interface LogoNode {
  name: string;
  color: string;
  glowColor: string;
  svg: React.ReactNode;
}

export default function TechStackLogos() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const isHoveredRef = useRef(false);

  // Sound effects helper
  const playClickSound = (freq = 600, duration = 0.08) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.004, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration + 0.02);

      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    } catch {
      // Ignored
    }
  };

  // SVGs of all 12 technologies
  const techStack: LogoNode[] = [
    {
      name: "C++",
      color: "#00599C",
      glowColor: "rgba(0, 89, 156, 0.4)",
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8l7.2 3.6v7.2L12 19.2l-7.2-3.6V8.4L12 4.8zm-2.4 4.8v4.8h4.8v-1.2h-3.6V9.6H9.6zm3.6 0v1.2h2.4v1.2h-2.4v1.2h2.4v1.2H12V9.6h3.6V9.6z" />
        </svg>
      ),
    },
    {
      name: "Python",
      color: "#3776AB",
      glowColor: "rgba(55, 118, 171, 0.4)",
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12.002 2c-2.76 0-5 2.24-5 5h3v1h-4c-1.66 0-3 1.34-3 3v4c0 1.66 1.34 3 3 3h1.5v-1.5c0-1.38 1.12-2.5 2.5-2.5h4c1.38 0 2.5-1.12 2.5-2.5V7.5c0-2.76-2.24-5-5-5zm-2.5 2a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm2.5 18c2.76 0 5-2.24 5-5h-3v-1h4c1.66 0 3-1.34 3-3v-4c0-1.66-1.34-3-3-3H16.5v1.5c0 1.38-1.12 2.5-2.5 2.5h-4c-1.38 0-2.5 1.12-2.5 2.5v4.5c0 2.76 2.24 5 5 5zm2.5-3.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
        </svg>
      ),
    },
    {
      name: "JavaScript",
      color: "#F7DF1E",
      glowColor: "rgba(247, 223, 30, 0.4)",
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M3 3h18v18H3V3zm13.5 11.5c-.75-.4-1.25-.8-1.5-1.25-.25-.4-.35-.9-.35-1.5h-1.6c0 1.05.25 1.85.75 2.45.5.6 1.25 1.05 2.2 1.3.85.25 1.55.5 2 .7.45.2.75.45.9.8.15.35.25.75.25 1.25 0 .7-.25 1.25-.75 1.65-.5.4-1.25.6-2.25.6-1.05 0-1.8-.25-2.3-.7-.5-.45-.85-1.1-1.05-1.95h-1.6c.2 1.35.75 2.35 1.6 3 1 .65 2.25 1 3.75 1 1.65 0 2.9-.4 3.75-1.2.85-.8 1.25-1.8 1.25-3.05 0-.95-.2-1.7-.65-2.2-.45-.5-1.15-.95-2.1-1.25-.8-.25-1.4-.45-1.85-.65zM7.5 11.8h1.6V17c0 .65.15 1.15.4 1.45.25.3.65.45 1.2.45.55 0 .95-.1 1.2-.35.25-.25.4-.6.4-1.1v-5.65h1.6V17c0 1.05-.3 1.85-.95 2.4-.65.55-1.55.8-2.65.8-1.15 0-2.05-.3-2.65-.95-.6-.65-.95-1.55-.95-2.7v-4.75z" />
        </svg>
      ),
    },
    {
      name: "React",
      color: "#61DAFB",
      glowColor: "rgba(97, 218, 251, 0.4)",
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1.5-12.5l5.2 3-5.2 3v-6zm.5 1.73v2.54l2.2-1.27-2.2-1.27z" />
          <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(30 12 12)" stroke="currentColor" strokeWidth="1" fill="none" />
          <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(90 12 12)" stroke="currentColor" strokeWidth="1" fill="none" />
          <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(150 12 12)" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      ),
    },
    {
      name: "FastAPI",
      color: "#059669",
      glowColor: "rgba(5, 150, 105, 0.4)",
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm-1 14.5v-3.5H8l5-6.5v3.5h3l-5 6.5z" />
        </svg>
      ),
    },
    {
      name: "Node.js",
      color: "#339933",
      glowColor: "rgba(51, 153, 51, 0.4)",
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2L3 7.2v9.6l9 5.2 9-5.2V7.2L12 2zm3.6 13.6c-.4.8-1 1.4-1.8 1.8l-1.8-3h3.6zm-5.4-3V9.6l3 1.8-3 1.2zm5.4-3.6l-1.8 3-1.8-3h3.6zm-1.8-1.2c.8.4 1.4 1 1.8 1.8H12l1.8-3.6z" />
        </svg>
      ),
    },
    {
      name: "Spring",
      color: "#6DB33F",
      glowColor: "rgba(109, 179, 63, 0.4)",
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5l-3.5-3.5 1.4-1.4 2.1 2.1 5.6-5.6 1.4 1.4-7 7z" />
        </svg>
      ),
    },
    {
      name: "MySQL",
      color: "#00758F",
      glowColor: "rgba(0, 117, 143, 0.4)",
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.2 12.8c-.8.8-1.8 1.2-3.2 1.2H10v-4h2c1.4 0 2.4.4 3.2 1.2.8.8 1.2 1.8 1.2 3.2v-1.6zm-3.2-6.8H10v2h2c1.1 0 2-.3 2.6-1 .6-.7.9-1.5.9-2.5 0-1-.3-1.8-.9-2.5-.6-.7-1.5-1-2.6-1z" />
        </svg>
      ),
    },
    {
      name: "Git",
      color: "#F05032",
      glowColor: "rgba(240, 80, 50, 0.4)",
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M22.6 11.4L12.6 1.4c-.8-.8-2-.8-2.8 0L8.6 2.6l3.1 3.1c.8-.3 1.8-.1 2.5.6.7.7.9 1.8.6 2.6l3.1 3.1c.8-.3 1.8-.1 2.5.6.9.9.9 2.4 0 3.3-.9.9-2.4.9-3.3 0-.7-.7-.9-1.8-.6-2.5l-3.1-3.1c-.3.3-.7.5-1.2.6v6.2c.6.3 1 .9 1 1.6 0 1.1-.9 2-2 2s-2-.9-2-2c0-.7.4-1.3 1-1.6V10.4c-.6-.3-1-.9-1-1.6 0-.7.4-1.3 1-1.6l-3.1-3.1L1.4 10c-.8.8-.8 2 0 2.8l10 10c.8.8 2 .8 2.8 0l8.4-8.4c.8-.8.8-2 0-2.8z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      color: "#FFFFFF",
      glowColor: "rgba(255, 255, 255, 0.3)",
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
    },
    {
      name: "Postman",
      color: "#FF6C37",
      glowColor: "rgba(255, 108, 55, 0.4)",
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
        </svg>
      ),
    },
    {
      name: "ML",
      color: "#FF6B00",
      glowColor: "rgba(255, 107, 0, 0.4)",
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v3zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v3z" />
        </svg>
      ),
    },
  ];

  interface PathPoint {
    x: number;
    y: number;
    angle: number;
  }

  useEffect(() => {
    if (!containerRef.current) return;

    let pathPoints: PathPoint[] = [];

    // Responsive S-curve coordinates
    const updatePathPoints = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const y1 = height * 0.2;
      const y2 = height * 0.5;
      const y3 = height * 0.8;

      const padding = 100;
      const startX = -150;
      const endX = width + 150;

      const newPath: PathPoint[] = [];

      // Row 1 LTR
      const segment1Len = (width - padding) - startX;
      for (let d = 0; d < segment1Len; d += 1) {
        newPath.push({ x: startX + d, y: y1, angle: 0 });
      }

      // Curve 1: Right bend down
      const r1 = (y2 - y1) / 2;
      const cx1 = width - padding;
      const cy1 = y1 + r1;
      const curve1Len = Math.PI * r1;
      const steps1 = Math.round(curve1Len);
      for (let i = 0; i < steps1; i++) {
        const t = -Math.PI / 2 + (Math.PI * i) / steps1;
        const x = cx1 + Math.cos(t) * r1;
        const y = cy1 + Math.sin(t) * r1;
        newPath.push({ x, y, angle: (t + Math.PI / 2) * (180 / Math.PI) });
      }

      // Row 2 RTL
      const xStart2 = width - padding;
      const xEnd2 = padding;
      const segment2Len = xStart2 - xEnd2;
      for (let d = 0; d < segment2Len; d += 1) {
        newPath.push({ x: xStart2 - d, y: y2, angle: 180 });
      }

      // Curve 2: Left bend down
      const r2 = (y3 - y2) / 2;
      const cx2 = padding;
      const cy2 = y2 + r2;
      const curve2Len = Math.PI * r2;
      const steps2 = Math.round(curve2Len);
      for (let i = 0; i < steps2; i++) {
        const t = Math.PI / 2 + (Math.PI * i) / steps2;
        const x = cx2 + Math.cos(t) * r2;
        const y = cy2 + Math.sin(t) * r2;
        newPath.push({ x, y, angle: (t + Math.PI / 2) * (180 / Math.PI) });
      }

      // Row 3 LTR
      const xStart3 = padding;
      const xEnd3 = endX;
      const segment3Len = xEnd3 - xStart3;
      for (let d = 0; d < segment3Len; d += 1) {
        newPath.push({ x: xStart3 + d, y: y3, angle: 0 });
      }

      pathPoints = newPath;
    };

    updatePathPoints();

    // 60 FPS animation ticker loop
    let startOffset = 0;
    let animationFrameId: number;

    const animateSnakeTrain = () => {
      if (pathPoints.length === 0) {
        animationFrameId = requestAnimationFrame(animateSnakeTrain);
        return;
      }

      // Pace speed: slow down when hovered
      const currentSpeed = isHoveredRef.current ? 0.25 : 1.5;
      startOffset = (startOffset + currentSpeed) % pathPoints.length;

      // Spacing: set close together (e.g. 76px spacing) to form a linked snake chain
      const spacing = 76;

      techStack.forEach((_, idx) => {
        const cardEl = cardsRef.current[idx];
        const innerEl = cardEl?.querySelector(".inner-content") as HTMLElement;

        if (cardEl) {
          // Snake following math: index offset goes backwards from head (idx 0) to tail (idx 11)
          const index = Math.floor((startOffset - idx * spacing + pathPoints.length * 2) % pathPoints.length);
          const point = pathPoints[index];

          if (point) {
            // Taper segment scales: head is largest, tail gets slightly smaller
            const scaleFactor = 1 - idx * 0.025;
            
            // Apply coordinates + tangents + scale to card chassis
            cardEl.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) rotate(${point.angle}deg) scale(${scaleFactor})`;
            
            // Counter-rotate the inner elements so they remain upright
            if (innerEl) {
              innerEl.style.transform = `rotate(${-point.angle}deg)`;
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(animateSnakeTrain);
    };

    animateSnakeTrain();

    const handleResize = () => {
      updatePathPoints();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* Decorative neon corner overlays */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-primary/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-primary/20 pointer-events-none" />

      {/* Main Grid Container panel */}
      <div
        ref={containerRef}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
        className="w-full h-[450px] relative border border-white/5 bg-black/40 rounded-3xl overflow-hidden glass-panel select-none"
      >
        {/* Radar aesthetics grids */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

        {/* Floating circular HTML cards representing snake segments */}
        {techStack.map((tech, idx) => {
          const isHead = idx === 0;
          return (
            <div
              key={tech.name}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              onClick={() => playClickSound(400 + idx * 40)}
              className="absolute left-0 top-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full border flex flex-col items-center justify-center p-2 backdrop-blur-md cursor-pointer transition-all duration-300 transform select-none hover:shadow-lg z-10"
              style={{
                borderColor: isHead ? "var(--primary)" : `${tech.color}44`,
                background: `rgba(10, 10, 10, 0.85)`,
                boxShadow: isHead 
                  ? `0 0 15px var(--primary), inset 0 0 8px var(--primary)` 
                  : `0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 8px ${tech.color}11`,
              }}
            >
              {/* Inner-content holds icons and text, counter-rotated in JS ticker loop */}
              <div className="inner-content flex flex-col items-center justify-center gap-0.5 select-none pointer-events-none">
                <div 
                  className="text-white"
                  style={{
                    color: isHead ? "var(--primary)" : tech.color,
                  }}
                >
                  {tech.svg}
                </div>
                <span className="font-mono text-[7px] sm:text-[8px] font-bold text-white/50 tracking-tighter uppercase">
                  {tech.name}
                </span>
                {isHead && (
                  <span className="text-[6px] text-primary font-bold tracking-widest absolute -top-4 font-mono uppercase bg-black/80 px-1 border border-primary rounded-sm">
                    Head
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Telemetry prompts */}
        <div className="absolute bottom-4 left-6 text-[10px] font-mono text-white/30 flex items-center gap-1.5 pointer-events-none z-10">
          <Activity size={12} className="animate-pulse text-primary" />
          <span>SNAKE_SEQUENCE: HOVER TO DECOMPRESS SPEED</span>
          <Volume2 size={10} className="ml-2 text-white/20" />
          <span>CLICK SEGMENTS FOR SYNTH AUDIO</span>
        </div>
      </div>
    </div>
  );
}
