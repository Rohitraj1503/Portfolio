"use client";

import { motion } from "framer-motion";
import { Award, Code2 } from "lucide-react";

interface AchievementCard {
  title: string;
  subtitle: string;
  metric: string;
  description: string;
  icon: React.ReactNode;
}

export default function AchievementVault() {
  const achievements: AchievementCard[] = [
    {
      title: "Algorithmic Operations",
      subtitle: "LEETCODE & HACKERRANK",
      metric: "300+ DSA Solved",
      description: "Successfully solved over 300 data structures and algorithms challenges. Specialized in tree traversals, matrices optimization, dynamic grids, and binary searches.",
      icon: <Code2 className="w-6 h-6 text-primary" />,
    },
    {
      title: "Skills Telemetry verification",
      subtitle: "HACKERRANK CERTIFIED",
      metric: "3★ Coder Rating",
      description: "Awarded three-star badge validation on HackerRank for excellence in C++ programming and data structures challenges. Demonstrated strong problem-solving proficiency.",
      icon: <Award className="w-6 h-6 text-primary" />,
    },
    {
      title: "AMJ Nexathon Placements",
      subtitle: "NATIONAL STACK HACKATHON",
      metric: "Top 10 Finalist",
      description: "Engineered an intelligent smart job scheduler application using React and FastAPI. Ranked among the Top 10 national finalists out of hundreds of entries.",
      icon: <Code2 className="w-6 h-6 text-primary" />,
    },
    {
      title: "Impact AI Thon Placement",
      subtitle: "ENVIRONMENTAL INTELLIGENCE",
      metric: "Top 5 Finalist",
      description: "Constructed an environmental predictive risk index analyzing weather fluctuations. Emerged as a Top 5 Finalist for deployment readiness and societal impact.",
      icon: <Award className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {achievements.map((ach, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          whileHover={{ y: -8 }}
          className="relative group cursor-pointer"
        >
          {/* Card neon border glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-orange-400 rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500" />
          
          <div className="relative glass-panel bg-black/85 p-6 rounded-xl border border-white/5 group-hover:border-primary transition-all duration-300 h-full flex flex-col justify-between overflow-hidden">
            {/* Hologram sweep scanline */}
            <div className="hologram-scan" />
            
            <div className="space-y-4">
              {/* Header icon + titles */}
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-primary/10 rounded-lg border border-primary/20">
                  {ach.icon}
                </div>
                <span className="text-[9px] font-mono text-white/30 tracking-wider">
                  ACH_CORE_{idx + 1}
                </span>
              </div>

              {/* Title & category */}
              <div>
                <span className="text-[9px] font-mono text-primary tracking-[0.25em] block mb-1">
                  {ach.subtitle}
                </span>
                <h4 className="font-display font-black text-sm tracking-wide text-white uppercase group-hover:text-primary transition-colors">
                  {ach.title}
                </h4>
              </div>

              {/* Core stat/metric display */}
              <div className="text-xl sm:text-2xl font-display font-black text-white glow-text py-2 border-y border-white/5">
                {ach.metric}
              </div>

              {/* Description */}
              <p className="text-white/60 text-xs font-sans leading-relaxed">
                {ach.description}
              </p>
            </div>

            {/* Diagnostic metrics */}
            <div className="mt-6 flex justify-between items-center text-[9px] font-mono text-white/20 border-t border-white/5 pt-3">
              <span>STATUS: VAULT_SECURE</span>
              <span>VERIFIED: ✓</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
