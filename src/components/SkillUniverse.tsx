"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Orbit, Sparkles, Star, Layers, Cpu, Code2 } from "lucide-react";

interface SkillNode {
  name: string;
  category: "Language" | "Backend" | "Frontend" | "Database" | "Tools" | "AI";
  level: string;
  experience: string;
  projects: string[];
  techs: string[];
  orbitRadius: number; // orbit distance
  speed: number; // orbiting speed
  angleOffset: number; // initial position
}

export default function SkillUniverse() {
  const skills: SkillNode[] = [
    {
      name: "C++",
      category: "Language",
      level: "Expert",
      experience: "2+ Years (Competitive)",
      projects: ["300+ DSA Algorithms Library", "Low-latency systems prototypes"],
      techs: ["STL", "Data Structures", "OOP", "Pointers"],
      orbitRadius: 75,
      speed: 0.15,
      angleOffset: 0,
    },
    {
      name: "Python",
      category: "Language",
      level: "Advanced",
      experience: "2 Years",
      projects: ["Climate Risk Scoring AI", "Hyperlocal Commerce Core"],
      techs: ["Pandas", "NumPy", "Scikit-Learn", "FastAPI"],
      orbitRadius: 105,
      speed: -0.12,
      angleOffset: 45,
    },
    {
      name: "JavaScript",
      category: "Language",
      level: "Advanced",
      experience: "2 Years",
      projects: ["Nexathon Interactive HUD", "Hologram Portals"],
      techs: ["ES6+", "Asynchronous JS", "DOM Manipulation"],
      orbitRadius: 105,
      speed: 0.09,
      angleOffset: 180,
    },
    {
      name: "React",
      category: "Frontend",
      level: "Advanced",
      experience: "2 Years",
      projects: ["Climate Risk scoring dashboard", "Vite cyber terminal"],
      techs: ["React Hooks", "Next.js", "Context API", "Tailwind CSS"],
      orbitRadius: 140,
      speed: 0.07,
      angleOffset: 90,
    },
    {
      name: "FastAPI",
      category: "Backend",
      level: "Advanced",
      experience: "1 Year",
      projects: ["Climate Credit Scoring backend", "Secure Token telemetry"],
      techs: ["Pydantic", "Uvicorn", "Async Handlers", "OAuth2"],
      orbitRadius: 140,
      speed: -0.06,
      angleOffset: 270,
    },
    {
      name: "Node.js",
      category: "Backend",
      level: "Advanced",
      experience: "1.5 Years",
      projects: ["Real-time Commerce Gateway", "Websocket alerts"],
      techs: ["Express.js", "npm", "REST APIs", "Node Clusters"],
      orbitRadius: 180,
      speed: 0.05,
      angleOffset: 30,
    },
    {
      name: "Express.js",
      category: "Backend",
      level: "Advanced",
      experience: "1.5 Years",
      projects: ["Microservices aggregator", "Telemetry logger"],
      techs: ["Middleware", "Router API", "JWT Auth"],
      orbitRadius: 180,
      speed: -0.04,
      angleOffset: 150,
    },
    {
      name: "Spring Boot",
      category: "Backend",
      level: "Intermediate",
      experience: "1 Year",
      projects: ["BookVerse Purchases engine"],
      techs: ["Java", "Hibernate JPA", "Spring Security", "Maven"],
      orbitRadius: 215,
      speed: 0.03,
      angleOffset: 0,
    },
    {
      name: "MySQL",
      category: "Database",
      level: "Advanced",
      experience: "1.5 Years",
      projects: ["BookVerse transactional database", "Auth Tables schemas"],
      techs: ["Indexes", "Joins", "Triggers", "Normalization"],
      orbitRadius: 215,
      speed: -0.025,
      angleOffset: 120,
    },
    {
      name: "Git",
      category: "Tools",
      level: "Advanced",
      experience: "2.5 Years",
      projects: ["Collaborative development environments"],
      techs: ["Branching strategy", "Merge conflicts resolution", "Actions CI/CD"],
      orbitRadius: 250,
      speed: 0.02,
      angleOffset: 60,
    },
    {
      name: "GitHub",
      category: "Tools",
      level: "Advanced",
      experience: "2.5 Years",
      projects: ["Open-source contributions", "Automation workflows"],
      techs: ["GitHub Actions", "Pull Requests", "Markdown documentation"],
      orbitRadius: 250,
      speed: -0.018,
      angleOffset: 240,
    },
    {
      name: "Postman",
      category: "Tools",
      level: "Advanced",
      experience: "2 Years",
      projects: ["FastAPI integration tests", "Microservice health audits"],
      techs: ["Collections runner", "API documentation validations", "Env variables"],
      orbitRadius: 280,
      speed: 0.015,
      angleOffset: 180,
    },
    {
      name: "Machine Learning",
      category: "AI",
      level: "Intermediate",
      experience: "1 Year",
      projects: ["Climate Risk scoring predictive algorithms"],
      techs: ["TensorFlow", "Scikit-Learn", "Regression Models", "Data Prep"],
      orbitRadius: 280,
      speed: -0.012,
      angleOffset: 300,
    },
  ];

  const [selectedSkill, setSelectedSkill] = useState<SkillNode>(skills[0]);
  const [angles, setAngles] = useState<number[]>(skills.map(s => s.angleOffset));

  // Simulating orbit rotation angle updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAngles((prevAngles) =>
        prevAngles.map((angle, idx) => (angle + skills[idx].speed) % 360)
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const getSkillColor = (name: string): string => {
    switch (name) {
      case "C++": return "#00599C";
      case "Python": return "#3776AB";
      case "JavaScript": return "#F7DF1E";
      case "React": return "#61DAFB";
      case "FastAPI": return "#059669";
      case "Node.js": return "#339933";
      case "Express.js": return "#828282";
      case "Spring Boot": return "#6DB33F";
      case "MySQL": return "#00758F";
      case "Git": return "#F05032";
      case "GitHub": return "#FFFFFF";
      case "Postman": return "#FF6C37";
      case "Machine Learning": return "#FF6B00";
      default: return "#FF6B00";
    }
  };

  const getSkillIcon = (name: string) => {
    const sizeClass = "w-5.5 h-5.5";
    switch (name) {
      case "C++":
        return (
          <svg viewBox="0 0 24 24" className={sizeClass}>
            <path fill="currentColor" d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8l7.2 3.6v7.2L12 19.2l-7.2-3.6V8.4L12 4.8zm-2.4 4.8v4.8h4.8v-1.2h-3.6V9.6H9.6zm3.6 0v1.2h2.4v1.2h-2.4v1.2h2.4v1.2H12V9.6h3.6V9.6z" />
          </svg>
        );
      case "Python":
        return (
          <svg viewBox="0 0 24 24" className={sizeClass}>
            <path fill="currentColor" d="M12.002 2c-2.76 0-5 2.24-5 5h3v1h-4c-1.66 0-3 1.34-3 3v4c0 1.66 1.34 3 3 3h1.5v-1.5c0-1.38 1.12-2.5 2.5-2.5h4c1.38 0 2.5-1.12 2.5-2.5V7.5c0-2.76-2.24-5-5-5zm-2.5 2a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm2.5 18c2.76 0 5-2.24 5-5h-3v-1h4c1.66 0 3-1.34 3-3v-4c0-1.66-1.34-3-3-3H16.5v1.5c0 1.38-1.12 2.5-2.5 2.5h-4c-1.38 0-2.5 1.12-2.5 2.5v4.5c0 2.76 2.24 5 5 5zm2.5-3.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
          </svg>
        );
      case "JavaScript":
        return (
          <svg viewBox="0 0 24 24" className={sizeClass}>
            <path fill="currentColor" d="M3 3h18v18H3V3zm13.5 11.5c-.75-.4-1.25-.8-1.5-1.25-.25-.4-.35-.9-.35-1.5h-1.6c0 1.05.25 1.85.75 2.45.5.6 1.25 1.05 2.2 1.3.85.25 1.55.5 2 .7.45.2.75.45.9.8.15.35.25.75.25 1.25 0 .7-.25 1.25-.75 1.65-.5.4-1.25.6-2.25.6-1.05 0-1.8-.25-2.3-.7-.5-.45-.85-1.1-1.05-1.95h-1.6c.2 1.35.75 2.35 1.6 3 1 .65 2.25 1 3.75 1 1.65 0 2.9-.4 3.75-1.2.85-.8 1.25-1.8 1.25-3.05 0-.95-.2-1.7-.65-2.2-.45-.5-1.15-.95-2.1-1.25-.8-.25-1.4-.45-1.85-.65zM7.5 11.8h1.6V17c0 .65.15 1.15.4 1.45.25.3.65.45 1.2.45.55 0 .95-.1 1.2-.35.25-.25.4-.6.4-1.1v-5.65h1.6V17c0 1.05-.3 1.85-.95 2.4-.65.55-1.55.8-2.65.8-1.15 0-2.05-.3-2.65-.95-.6-.65-.95-1.55-.95-2.7v-4.75z" />
          </svg>
        );
      case "React":
        return (
          <svg viewBox="0 0 24 24" className={sizeClass}>
            <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(30 12 12)" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(90 12 12)" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(150 12 12)" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        );
      case "FastAPI":
        return (
          <svg viewBox="0 0 24 24" className={sizeClass}>
            <path fill="currentColor" d="M12 2L2 7v10l10 5 10-5V7L12 2zm-1 14.5v-3.5H8l5-6.5v3.5h3l-5 6.5z" />
          </svg>
        );
      case "Node.js":
        return (
          <svg viewBox="0 0 24 24" className={sizeClass}>
            <path fill="currentColor" d="M12 2L3 7.2v9.6l9 5.2 9-5.2V7.2L12 2zm3.6 13.6c-.4.8-1 1.4-1.8 1.8l-1.8-3h3.6zm-5.4-3V9.6l3 1.8-3 1.2zm5.4-3.6l-1.8 3-1.8-3h3.6zm-1.8-1.2c.8.4 1.4 1 1.8 1.8H12l1.8-3.6z" />
          </svg>
        );
      case "Express.js":
        return (
          <div className="font-bold text-[9px] uppercase tracking-tighter">Exp</div>
        );
      case "Spring Boot":
        return (
          <svg viewBox="0 0 24 24" className={sizeClass}>
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5l-3.5-3.5 1.4-1.4 2.1 2.1 5.6-5.6 1.4 1.4-7 7z" />
          </svg>
        );
      case "MySQL":
        return (
          <svg viewBox="0 0 24 24" className={sizeClass}>
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.2 12.8c-.8.8-1.8 1.2-3.2 1.2H10v-4h2c1.4 0 2.4.4 3.2 1.2.8.8 1.2 1.8 1.2 3.2v-1.6zm-3.2-6.8H10v2h2c1.1 0 2-.3 2.6-1 .6-.7.9-1.5.9-2.5 0-1-.3-1.8-.9-2.5-.6-.7-1.5-1-2.6-1z" />
          </svg>
        );
      case "Git":
        return (
          <svg viewBox="0 0 24 24" className={sizeClass}>
            <path fill="currentColor" d="M22.6 11.4L12.6 1.4c-.8-.8-2-.8-2.8 0L8.6 2.6l3.1 3.1c.8-.3 1.8-.1 2.5.6.7.7.9 1.8.6 2.6l3.1 3.1c.8-.3 1.8-.1 2.5.6.9.9.9 2.4 0 3.3-.9.9-2.4.9-3.3 0-.7-.7-.9-1.8-.6-2.5l-3.1-3.1c-.3.3-.7.5-1.2.6v6.2c.6.3 1 .9 1 1.6 0 1.1-.9 2-2 2s-2-.9-2-2c0-.7.4-1.3 1-1.6V10.4c-.6-.3-1-.9-1-1.6 0-.7.4-1.3 1-1.6l-3.1-3.1L1.4 10c-.8.8-.8 2 0 2.8l10 10c.8.8 2 .8 2.8 0l8.4-8.4c.8-.8.8-2 0-2.8z" />
          </svg>
        );
      case "GitHub":
        return (
          <svg viewBox="0 0 24 24" className={sizeClass}>
            <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
        );
      case "Postman":
        return (
          <svg viewBox="0 0 24 24" className={sizeClass}>
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
          </svg>
        );
      case "Machine Learning":
        return (
          <svg viewBox="0 0 24 24" className={sizeClass}>
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v3zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v3z" />
          </svg>
        );
      default:
        return <div className="font-bold text-[8px] uppercase tracking-tighter">{name.substring(0, 3)}</div>;
    }
  };

  const playClickBeep = () => {
    try {
      const ctxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!ctxClass) return;
      const ctx = new ctxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.005, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* 3D Orbit Universe Canvas column */}
      <div className="col-span-1 lg:col-span-7 flex justify-center items-center relative h-[480px] sm:h-[600px] border border-white/5 bg-black/40 rounded-3xl overflow-hidden glass-panel">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Core Star representing Rohit's Core */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative w-14 h-14 bg-primary rounded-full flex items-center justify-center z-10 shadow-[0_0_35px_rgba(255,107,0,0.6)] border border-white/20 cursor-pointer"
          onClick={() => {
            playClickBeep();
            setSelectedSkill(skills[0]);
          }}
        >
          <Cpu className="text-black w-6 h-6" />
        </motion.div>

        {/* Orbit track rings */}
        {[75, 105, 140, 180, 215, 250, 280].map((radius, i) => (
          <div
            key={i}
            className="absolute border border-white/5 rounded-full pointer-events-none"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
            }}
          />
        ))}

        {/* Orbit planets */}
        {skills.map((skill, idx) => {
          const angleRad = (angles[idx] * Math.PI) / 180;
          const x = Math.cos(angleRad) * skill.orbitRadius;
          const y = Math.sin(angleRad) * skill.orbitRadius;

          const isSelected = selectedSkill.name === skill.name;
          const techColor = getSkillColor(skill.name);

          return (
            <motion.button
              key={skill.name}
              onClick={() => {
                playClickBeep();
                setSelectedSkill(skill);
              }}
              className={`absolute w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer z-10`}
              style={{
                transform: `translate(${x}px, ${y}px) scale(${isSelected ? 1.25 : 1})`,
                borderColor: isSelected ? "#FFFFFF" : `${techColor}66`,
                boxShadow: isSelected 
                  ? `0 0 20px ${techColor}` 
                  : `0 0 5px ${techColor}22`,
                color: isSelected ? "#000000" : techColor,
                backgroundColor: isSelected ? techColor : "rgba(10, 10, 10, 0.85)",
              }}
              title={skill.name}
            >
              {getSkillIcon(skill.name)}
            </motion.button>
          );
        })}

        <div className="absolute bottom-4 left-6 text-[10px] font-mono text-white/30 flex items-center gap-1.5 pointer-events-none">
          <Orbit size={12} className="animate-spin text-primary" />
          <span>DRAG/CLICK NODES FOR DETAILS</span>
        </div>
      </div>

      {/* Holographic Detail HUD Column */}
      <div className="col-span-1 lg:col-span-5 h-full">
        <motion.div
          key={selectedSkill.name}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel bg-black/85 p-6 rounded-3xl border border-primary/20 hover:border-primary flex flex-col justify-between h-[480px] sm:h-[600px] relative overflow-hidden"
        >
          {/* Scanning lines */}
          <div className="hologram-scan" />

          {/* Content */}
          <div className="space-y-6 font-mono">
            {/* Header readouts */}
            <div className="flex items-center justify-between border-b border-primary/20 pb-4">
              <div>
                <span className="text-[10px] text-white/30 block">SELECTED_SYS_NODE</span>
                <h4 className="text-2xl font-display font-black tracking-wider text-white uppercase glow-text">
                  {selectedSkill.name}
                </h4>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-primary/10 border border-primary/30 text-primary rounded">
                {selectedSkill.category}
              </span>
            </div>

            {/* Experience */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-white/40 block flex items-center gap-1">
                <Star size={10} className="text-primary" /> EXPERIENCE_DECADES
              </span>
              <p className="text-sm font-semibold text-white/90">{selectedSkill.experience}</p>
            </div>

            {/* Competency Level */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-white/40 block flex items-center gap-1">
                <Layers size={10} className="text-primary" /> COMPETENCY_RANKING
              </span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div
                      key={s}
                      className={`w-3 h-1.5 rounded-sm ${
                        selectedSkill.level === "Expert"
                          ? "bg-primary shadow-[0_0_5px_var(--primary)]"
                          : selectedSkill.level === "Advanced" && s <= 4
                            ? "bg-primary shadow-[0_0_5px_var(--primary)]"
                            : selectedSkill.level === "Intermediate" && s <= 3
                              ? "bg-primary shadow-[0_0_5px_var(--primary)]"
                              : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-primary font-bold">{selectedSkill.level}</span>
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <span className="text-[10px] text-white/40 block flex items-center gap-1">
                <Code2 size={10} className="text-primary" /> RELATED_TELEMETRIES
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedSkill.techs.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] px-2 py-1 bg-white/5 border border-white/10 rounded text-white/70 hover:border-primary/40 hover:text-white transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Sample projects built */}
            <div className="space-y-2">
              <span className="text-[10px] text-white/40 block flex items-center gap-1">
                <Sparkles size={10} className="text-primary" /> COMPILED_INTEGRATIONS
              </span>
              <ul className="space-y-1.5 text-xs text-white/80 list-disc list-inside">
                {selectedSkill.projects.map((proj, idx) => (
                  <li key={idx} className="hover:text-primary transition-colors">
                    {proj}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer diagnostics */}
          <div className="border-t border-white/5 pt-4 text-[10px] text-white/30 flex justify-between items-center">
            <span>JARVIS.SKILL_INDEX: ONLINE</span>
            <span>NODE_HEALTH: 100%</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
