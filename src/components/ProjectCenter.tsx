"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, ChevronLeft, ChevronRight, Activity, Cpu, Sparkles } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  techs: string[];
  features: string[];
  github: string;
  live: string;
  image: string;
  metrics: { label: string; value: string; progress: number }[];
  details: string;
}

export default function ProjectCenter() {
  const projects: Project[] = [
    {
      id: "climate",
      title: "Climate Risk Credit Scoring",
      subtitle: "AI Climate Telemetry Engine",
      category: "MACHINE LEARNING / FINTECH",
      techs: ["Python", "FastAPI", "React", "ML Scikit-Learn", "Leaflet GIS"],
      features: [
        "Predictive scoring using weather models and macroeconomics",
        "Geospatial mapping tracking climate-sensitive asset sectors",
        "Real-time scoring sandbox simulation console for underwriters",
      ],
      github: "https://github.com/rohitraj/climate-credit-scoring",
      live: "#",
      image: "/climate_hud.png",
      metrics: [
        { label: "MODEL_ACCURACY", value: "94.2% ROC", progress: 94 },
        { label: "INFERENCE_LATENCY", value: "32ms", progress: 85 },
        { label: "TELEMETRY_FEEDS", value: "14 DataStreams", progress: 70 },
      ],
      details: "An AI-powered risk evaluation pipeline translating geospatial risk data into financial risk matrices. Underwriters enter latitude coordinates to pull historical drought index, flooding cycles, and heat wave coefficients to determine credit health.",
    },
    {
      id: "bookverse",
      title: "BookVerse Platform",
      subtitle: "Transactional E-Commerce Engine",
      category: "FULL STACK / DB SYSTEMS",
      techs: ["Spring Boot", "MySQL", "Java", "Hibernate JPA", "JWT Auth"],
      features: [
        "Spring Security role-based token credentials verification",
        "Optimized ACID schemas preventing stock race conditions",
        "Unified admin console monitoring real-time transaction reports",
      ],
      github: "https://github.com/rohitraj/bookverse",
      live: "#",
      image: "/bookverse_hud.png",
      metrics: [
        { label: "TRANSACTION_INTEGRITY", value: "100% ACID", progress: 100 },
        { label: "QUERY_EXECUTION", value: "1.2ms Avg", progress: 92 },
        { label: "API_RELIABILITY", value: "99.98% Uptime", progress: 99 },
      ],
      details: "A high-performance transaction system engineered in Java. Utilizes row-level locks and transactional boundaries to secure payment gateways, purchase completions, and inventories.",
    },
    {
      id: "commerce",
      title: "Hyperlocal Quick Commerce",
      subtitle: "Real-time Order Logistics Hub",
      category: "LOGISTICS / DATABASE",
      techs: ["Python", "Supabase", "React Native", "PostgreSQL", "Websockets"],
      features: [
        "Geofencing courier allocation based on proximity and load",
        "Real-time WebSocket alerts sync driver and merchant screens",
        "Optimized address mapping via PostGIS extension queries",
      ],
      github: "https://github.com/rohitraj/quick-commerce",
      live: "#",
      image: "/commerce_hud.png",
      metrics: [
        { label: "LOGISTICS_MATCHING", value: "<4.5s", progress: 88 },
        { label: "SYNC_LATENCY", value: "8ms Websocket", progress: 95 },
        { label: "DATABASE_EFFICIENCY", value: "O(log N)", progress: 90 },
      ],
      details: "A low-latency on-demand delivery architecture. Coordinates dispatch triggers and tracks delivery path points between restaurants, courier agents, and customer screens using lightweight coordinate updates.",
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const activeProj = projects[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % projects.length);
    playDashboardBeep();
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + projects.length) % projects.length);
    playDashboardBeep();
  };

  const playDashboardBeep = () => {
    try {
      const ctxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!ctxClass) return;
      const ctx = new ctxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      gain.gain.setValueAtTime(0.005, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Sidebar Navigation */}
      <div className="col-span-1 lg:col-span-4 flex flex-col gap-4 justify-between">
        <div className="space-y-4">
          <div className="font-mono text-[10px] text-white/30 tracking-widest border-b border-primary/20 pb-2">
            PROJECT_REGISTRY ({projects.length})
          </div>

          <div className="space-y-3">
            {projects.map((proj, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    setActiveIdx(idx);
                    playDashboardBeep();
                  }}
                  className={`w-full text-left p-4 rounded-xl border font-mono transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                    isActive
                      ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(255,107,0,0.2)] text-white"
                      : "bg-black/50 hover:bg-white/5 border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  {/* Hologram sweep on active */}
                  {isActive && <div className="hologram-scan" />}
                  
                  <div className="text-[10px] text-primary/70 font-semibold mb-1 group-hover:text-primary transition-colors">
                    {proj.category}
                  </div>
                  <h4 className="font-display font-black text-sm tracking-wide mb-1 uppercase">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] opacity-60 line-clamp-1">{proj.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>


      </div>

      {/* Main Preview HUD Inspector */}
      <div className="col-span-1 lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProj.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="glass-panel bg-black/90 p-6 rounded-2xl border border-primary/20 hover:border-primary flex flex-col justify-between h-full relative overflow-hidden"
          >
            {/* HUD border highlights */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-primary/40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-primary/40 pointer-events-none" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-4 border-b border-primary/10 pb-4 mb-5">
                <div>
                  <span className="text-[9px] font-mono text-primary tracking-[0.2em]">{activeProj.category}</span>
                  <h3 className="text-xl sm:text-2xl font-display font-black tracking-wider text-white uppercase mt-1">
                    {activeProj.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeProj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-black hover:bg-primary/20 border border-primary/30 hover:border-primary rounded text-white transition-all"
                    title="Source Code"
                  >
                    <GithubIcon size={16} />
                  </a>
                  <a
                    href={activeProj.live}
                    className="p-2 bg-primary text-black border border-primary hover:bg-white hover:border-white hover:text-black rounded transition-all"
                    title="Live Simulation"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Screenshots Carousel representation */}
              <div className="relative h-48 sm:h-64 w-full rounded-xl overflow-hidden mb-6 border border-white/5 group-hover:border-primary/30 transition-all shadow-md">
                <Image
                  src={activeProj.image}
                  alt={activeProj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Simulated HUD overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Energy telemetry nodes */}
                <div className="absolute top-3 left-3 bg-black/60 border border-primary/30 px-2 py-0.5 rounded text-[8px] font-mono text-primary flex items-center gap-1">
                  <Activity size={10} className="animate-pulse" />
                  <span>HUD_TELEMETRY: SYNCHRONIZED</span>
                </div>

                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-1 bg-black/60 hover:bg-primary border border-white/10 hover:border-primary rounded-full text-white hover:text-black transition-all cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-1 bg-black/60 hover:bg-primary border border-white/10 hover:border-primary rounded-full text-white hover:text-black transition-all cursor-pointer"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Description & Features */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                <div className="md:col-span-7 space-y-4">
                  <p className="text-white/70 text-xs font-sans leading-relaxed">
                    {activeProj.details}
                  </p>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-white/40 block">INTEGRATED_FUNCTIONS:</span>
                    <ul className="space-y-1.5">
                      {activeProj.features.map((feat, i) => (
                        <li key={i} className="text-xs text-white/80 flex items-start gap-2">
                          <span className="text-primary mt-1 font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Animated metrics panel */}
                <div className="md:col-span-5 bg-black/50 border border-white/5 rounded-xl p-4 space-y-4">
                  <span className="text-[9px] font-mono text-white/40 block flex items-center gap-1">
                    <Activity size={10} className="text-primary animate-pulse" /> PERFORMANCE_AUDIT
                  </span>

                  <div className="space-y-3 font-mono">
                    {activeProj.metrics.map((met, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-white/60">{met.label}</span>
                          <span className="text-primary font-bold">{met.value}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${met.progress}%` }}
                            transition={{ duration: 1.0, delay: 0.2 }}
                            className="h-full bg-primary"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Chips Footer */}
            <div className="border-t border-white/5 pt-4 flex flex-wrap items-center gap-2">
              <span className="text-[9px] font-mono text-white/30 mr-2 flex items-center gap-1">
                <Sparkles size={10} /> COMPILED_WITH:
              </span>
              {activeProj.techs.map((tech) => (
                <span
                  key={tech}
                  className="text-[9px] font-mono px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
