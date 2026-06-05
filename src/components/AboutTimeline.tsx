"use client";

import { motion } from "framer-motion";
import { Milestone, Search, Cpu, Rocket } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: string;
}

export default function AboutTimeline() {
  const events: TimelineEvent[] = [
    {
      year: "2024",
      title: "DSA Initiation Core",
      description: "Laid down fundamental algorithmic foundations. Solved 300+ data structures and algorithms challenges in C++ on LeetCode and HackerRank, mastering structural analysis, graph traversals, and dynamic programming.",
      icon: <Search className="w-5 h-5 text-primary" />,
      status: "COMPLETED",
    },
    {
      year: "2025",
      title: "Hackathon Deployment",
      description: "Stepped into competitive engineering. Participated in multiple national hackathons, emerging as a Top 10 Finalist in AMJ Nexathon and a Top 5 Finalist in Impact AI Thon, designing live-saving software prototypes.",
      icon: <Milestone className="w-5 h-5 text-primary" />,
      status: "COMPLETED",
    },
    {
      year: "2026",
      title: "AI Integration Solutions",
      description: "Developing production-grade Full Stack web systems with AI-driven models. Harnessing FastAPI, Spring Boot, React, and Machine Learning pipelines to build predictive engines, real-time analytics hubs, and API integrations.",
      icon: <Cpu className="w-5 h-5 text-primary" />,
      status: "IN_PROGRESS",
    },
    {
      year: "FUTURE",
      title: "Top Product Career",
      description: "Seeking to build high-performance systems and robust microservices at a world-class technology company. Aiming to solve complex architectural challenges and scale distributed applications.",
      icon: <Rocket className="w-5 h-5 text-primary" />,
      status: "SCHEDULED",
    },
  ];

  return (
    <div className="relative pl-6 md:pl-10">
      {/* Vertical glowing path background */}
      <div className="absolute left-[29px] top-4 bottom-4 w-[2px] bg-white/10" />
      
      {/* Animated active orange timeline progress tracker path */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "94%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2.0, ease: "easeInOut" }}
        className="absolute left-[29px] top-4 w-[2px] bg-gradient-to-b from-primary via-orange-400 to-[#FF8533]/30 shadow-[0_0_10px_var(--primary)]"
      />

      <div className="space-y-12">
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
          >
            {/* Holographic Glowing Checkpoint Node */}
            <div className="absolute -left-[30px] md:relative md:left-0 z-10 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.25 }}
                className="w-8 h-8 rounded-full bg-black border-2 border-primary flex items-center justify-center shadow-[0_0_10px_var(--primary)]"
              >
                {/* Ping wave for current node */}
                {event.status === "IN_PROGRESS" && (
                  <div className="absolute inset-0 rounded-full border border-primary animate-ping" />
                )}
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              </motion.div>
            </div>

            {/* Event Description Card */}
            <div className="flex-1 glass-panel bg-black/75 p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                    {event.icon}
                  </div>
                  <div>
                    <span className="font-display font-black text-sm tracking-wider text-white uppercase">{event.title}</span>
                    <span className="block text-[10px] font-mono text-white/40">{event.year} TELEMETRY</span>
                  </div>
                </div>
                
                <span 
                  className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                    event.status === "COMPLETED" 
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : event.status === "IN_PROGRESS"
                        ? "bg-primary/10 border-primary/30 text-primary animate-pulse"
                        : "bg-white/5 border-white/10 text-white/40"
                  }`}
                >
                  {event.status}
                </span>
              </div>
              <p className="text-white/70 text-xs font-sans leading-relaxed">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
