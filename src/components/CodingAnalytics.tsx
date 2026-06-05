"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, Shield, Zap, Flame, Briefcase, Trophy } from "lucide-react";

// Reusable Animated Counter component
interface CounterProps {
  value: number;
  suffix?: string;
}

function Counter({ value, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1500; // milliseconds
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * (end - start) + start);
      
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display font-black text-3xl sm:text-4xl text-white glow-text">
      {count}
      {suffix}
    </span>
  );
}

export default function CodingAnalytics() {
  const stats = [
    {
      label: "GITHUB CONTRIBUTIONS",
      value: 842,
      suffix: "+",
      desc: "Commits & deployments in 2025-2026",
      icon: <GitBranch className="w-5 h-5 text-primary" />,
    },
    {
      label: "LEETCODE SOLVED",
      value: 240,
      suffix: "+",
      desc: "Algorithmic problems resolved",
      icon: <Shield className="w-5 h-5 text-primary" />,
    },
    {
      label: "HACKERRANK STATS",
      value: 62,
      suffix: " badge",
      desc: "Verified C++ & DSA problems",
      icon: <Trophy className="w-5 h-5 text-primary" />,
    },
    {
      label: "CODING STREAK",
      value: 120,
      suffix: " Days",
      desc: "Consecutive daily telemetry updates",
      icon: <Flame className="w-5 h-5 text-primary animate-bounce" />,
    },
    {
      label: "PROJECTS ENGINEERED",
      value: 8,
      suffix: " Live",
      desc: "Web services & automation scripts",
      icon: <Briefcase className="w-5 h-5 text-primary" />,
    },
    {
      label: "HACKATHONS DEPLOYED",
      value: 5,
      suffix: " Finals",
      desc: "Competitive engineering trials",
      icon: <Zap className="w-5 h-5 text-primary" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: idx * 0.08 }}
          className="glass-panel bg-black/80 p-5 rounded-2xl border border-white/5 hover:border-primary/30 flex items-start gap-4 transition-all duration-300 relative overflow-hidden"
        >
          {/* Neon highlights */}
          <div className="absolute top-0 left-0 w-[4px] h-full bg-primary" />
          
          <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
            {stat.icon}
          </div>
          
          <div className="space-y-1 font-mono flex-1">
            <span className="text-[10px] text-white/40 block font-bold tracking-wider">
              {stat.label}
            </span>
            <div className="py-0.5">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-[10px] text-white/50">{stat.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
