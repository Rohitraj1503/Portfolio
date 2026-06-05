"use client";

import { motion } from "framer-motion";
import { Sparkles, Milestone, Calendar, Award, Code } from "lucide-react";
import confetti from "canvas-confetti";

interface MilestoneItem {
  date: string;
  category: "HACKATHONS" | "PROJECTS" | "ACHIEVEMENTS" | "MILESTONES";
  title: string;
  subtitle: string;
  description: string;
  isProminent?: boolean;
  badge?: string;
  highlights?: string[];
}

export default function ExperienceTimeline() {
  const milestones: MilestoneItem[] = [
    {
      date: "APR 2026",
      category: "PROJECTS",
      title: "BOOKVERSE E-COMMERCE PLATFORM",
      subtitle: "Spring Boot, MySQL, HTML5, CSS3, JavaScript, REST APIs",
      description: "Developed a full-stack e-commerce platform for online book purchasing and inventory management. Built a scalable backend using Spring Boot and MySQL, implemented RESTful APIs for product, user, and order management, and designed a responsive user interface for seamless browsing and purchasing. Created an admin dashboard for inventory tracking, order monitoring, and sales management.",

    },
    {
      date: "FEB 2026",
      category: "PROJECTS",
      title: "Climate Risk Engine Deployment",
      subtitle: "Python, FastAPI & React Stack",
      description: "Launched the climate risk credit scoring dashboard. Completed the ML inference training, reducing latencies to under 35ms and integrating mapping frameworks.",
    },
    {
      date: "OCT 2025",
      category: "HACKATHONS",
      title: "Impact AI Thon Finals",
      subtitle: "Top 5 Placements",
      description: "Pitched a real-time air quality index and predictive emergency response grid. Built UI dashboards and optimized geofencing query algorithms.",
    },
    {
      date: "AUG 2025",
      category: "PROJECTS",
      title: "Quick Commerce Development",
      subtitle: "Supabase & Postgres integrations",
      description: "Completed the vendor catalog listings database layout. Integrated PostgreSQL triggers and websocket sync, supporting hyperlocal orders matching.",
    },
    {
      date: "MAY 2025",
      category: "HACKATHONS",
      title: "AMJ Nexathon Challenge",
      subtitle: "Top 10 National Finalist",
      description: "Competed in a 48-hour continuous coding hackathon, engineering a smart job scheduler dashboard that ranks telemetry alerts automatically.",
    },
    {
      date: "DEC 2024",
      category: "ACHIEVEMENTS",
      title: "Algorithmic Milestone Reached",
      subtitle: "300+ DSA Problems Solved",
      description: "Crossed 300 algorithm problems solved across LeetCode and HackerRank, validating proficiency in dynamic arrays, binary structures, and loops.",
    },
    {
      date: "AUG 2024",
      category: "MILESTONES",
      title: "B.Tech CSE Admission Core",
      subtitle: "SRM Institute of Science & Technology",
      description: "Commenced undergraduate studies in Computer Science Engineering. Established core programming competencies in object-oriented structures and logic.",
    },
  ];

  const triggerConfettiPulse = () => {
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.75 },
      colors: ["#FF6B00", "#FF8533", "#FFFFFF"],
    });
  };

  return (
    <div className="relative pl-6 md:pl-10">
      {/* Central vertical track */}
      <div className="absolute left-[29px] top-4 bottom-4 w-[2px] bg-white/10" />
      
      {/* Animated active glowing path */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "94%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        className="absolute left-[29px] top-4 w-[2px] bg-gradient-to-b from-primary via-orange-400 to-[#FF8533]/30 shadow-[0_0_10px_var(--primary)]"
      />

      <div className="space-y-12">
        {milestones.map((mil, idx) => {
          const isProminent = mil.isProminent;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
            >
              {/* Checkpoint Node circle */}
              <div className="absolute -left-[30px] md:relative md:left-0 z-10">
                <div className={`w-8 h-8 rounded-full bg-black border flex items-center justify-center relative ${
                  isProminent 
                    ? "border-primary shadow-[0_0_15px_rgba(255,107,0,0.6)]" 
                    : "border-primary shadow-[0_0_8px_rgba(255,107,0,0.3)]"
                }`}>
                  {isProminent && (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                      className="absolute inset-0 rounded-full border border-dashed border-primary"
                    />
                  )}
                  {mil.category === "HACKATHONS" ? (
                    <TrophyIcon className="w-3.5 h-3.5 text-primary" />
                  ) : mil.category === "PROJECTS" ? (
                    <Code className="w-3.5 h-3.5 text-primary" />
                  ) : mil.category === "ACHIEVEMENTS" ? (
                    <AwardIcon className="w-3.5 h-3.5 text-primary" />
                  ) : (
                    <Milestone className="w-3.5 h-3.5 text-primary" />
                  )}
                </div>
              </div>

              {/* Content Panel */}
              <motion.div 
                onMouseEnter={() => {
                  if (isProminent) triggerConfettiPulse();
                }}
                {...(isProminent ? {
                  animate: { y: [0, -4, 0] },
                  transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                } : {})}
                className={`flex-1 glass-panel p-5 rounded-xl border transition-colors duration-300 relative overflow-hidden group ${
                  isProminent
                    ? "bg-[#050505]/95 border-primary shadow-[0_0_20px_rgba(255,107,0,0.35)] hover:shadow-[0_0_35px_rgba(255,107,0,0.6)] scale-[1.02] md:scale-[1.03] select-text"
                    : "bg-black/75 border-white/5 hover:border-primary/20 select-text"
                }`}
              >
                {/* Prominent header effects */}
                {isProminent && (
                  <>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary pointer-events-none" />
                    <div className="hologram-scan" />
                  </>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 font-mono">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded">
                      {mil.category}
                    </span>
                    {mil.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-primary/20 border border-primary text-primary rounded font-bold uppercase tracking-wider animate-pulse">
                        {mil.badge}
                      </span>
                    )}
                    <h5 className={`font-display font-black text-sm tracking-wide uppercase ${isProminent ? "text-primary glow-text text-base" : "text-white"}`}>
                      {mil.title}
                    </h5>
                  </div>
                  <div className="text-[10px] text-white/40 flex items-center gap-1">
                    <Calendar size={10} />
                    <span className={isProminent ? "text-primary font-bold" : ""}>{mil.date}</span>
                  </div>
                </div>

                <div className={`text-[11px] font-mono mb-3 ${isProminent ? "text-white/80 font-bold tracking-wider" : "text-primary/75"}`}>{mil.subtitle}</div>
                
                <p className="text-white/60 text-xs font-sans leading-relaxed">
                  {mil.description}
                </p>

                {/* Highlights list for prominent cards */}
                {mil.highlights && (
                  <div className="mt-4 pt-4 border-t border-primary/20 space-y-2.5">
                    <span className="text-[9px] font-mono text-primary/80 font-bold block tracking-widest">UPLINK_SYSTEM_HIGHLIGHTS:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[10.5px] font-mono text-white/80">
                      {mil.highlights.map((high, i) => (
                        <div key={i} className="flex items-center gap-2 hover:text-primary transition-colors">
                          <span className="text-primary font-bold">»</span>
                          <span>{high}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Simple icons placeholders
function TrophyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
      <path d="M12 2a7.7 7.7 0 0 1 7.54 8H4.46A7.7 7.7 0 0 1 12 2z" />
    </svg>
  );
}

function AwardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}
