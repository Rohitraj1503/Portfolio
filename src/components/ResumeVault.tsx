"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Eye, Sparkles, BookOpen, GraduationCap, Cpu, ShieldCheck } from "lucide-react";

export default function ResumeVault() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePageFlip = () => {
    setIsFlipped(!isFlipped);
    setCurrentPage((prev) => (prev === 1 ? 2 : 1));
    playFlipSound();
  };

  const playFlipSound = () => {
    try {
      const ctxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!ctxClass) return;
      const ctx = new ctxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.005, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Action Controller Panel */}
      <div className="col-span-1 lg:col-span-5 space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-primary tracking-[0.25em] block">
            SECURE_VAULT_DECRYPTION
          </span>
          <h3 className="text-3xl font-display font-black text-white uppercase tracking-wider">
            RESUME VAULT
          </h3>
          <p className="text-white/60 text-xs font-sans leading-relaxed">
            Access Rohit Raj's certified professional credentials. View details online, download standard PDF formats, or trigger the holographic preview container.
          </p>
        </div>

        <div className="flex flex-col gap-3 font-mono">
          <a
            href="/rohitraj_cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 hover:border-primary rounded-xl text-xs text-white hover:bg-primary/20 transition-all cursor-pointer group"
          >
            <span className="flex items-center gap-3">
              <Eye size={16} className="text-primary" />
              <span>VIEW DIGITAL RESUME</span>
            </span>
            <span className="text-[10px] text-primary group-hover:translate-x-1 transition-transform">→</span>
          </a>

          <a
            href="/rohitraj_cv.pdf"
            download="Rohit_Raj_Resume.pdf"
            className="flex items-center justify-between p-4 bg-black/40 border border-white/10 hover:border-primary rounded-xl text-xs text-white hover:bg-white/5 transition-all cursor-pointer group"
          >
            <span className="flex items-center gap-3">
              <Download size={16} className="text-primary" />
              <span>DOWNLOAD PDF FORMAT</span>
            </span>
            <span className="text-[10px] text-white/40 group-hover:text-primary transition-colors">[PDF 142KB]</span>
          </a>

          <button
            onClick={handlePageFlip}
            className="flex items-center justify-between p-4 bg-black/40 border border-white/10 hover:border-primary rounded-xl text-xs text-white hover:bg-white/5 transition-all cursor-pointer text-left group"
          >
            <span className="flex items-center gap-3">
              <FileText size={16} className="text-primary" />
              <span>FLIP HOLO PREVIEW</span>
            </span>
            <span className="text-[10px] text-primary/75 animate-pulse font-bold">PAGE_{currentPage}/2</span>
          </button>
        </div>

        <div className="text-[10px] font-mono text-white/30 flex items-center gap-1.5 pointer-events-none">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span>VAULT SHA256 TELEMETRY VERIFIED</span>
        </div>
      </div>

      {/* 3D Holographic Flip Previewer Container */}
      <div className="col-span-1 lg:col-span-7 flex justify-center items-center h-[520px] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.04)_0%,transparent_70%)] pointer-events-none" />

        {/* 3D perspective wrapper card */}
        <div className="w-full max-w-sm h-[460px]" style={{ perspective: 1200 }}>
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-full h-full cursor-pointer select-text selection:bg-primary selection:text-black"
            onClick={handlePageFlip}
          >
            {/* Front Page (Page 1) */}
            <div 
              style={{ backfaceVisibility: "hidden" }}
              className="absolute inset-0 glass-panel bg-black/95 p-6 rounded-2xl border border-primary/20 hover:border-primary flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              <div className="hologram-scan" />
              
              <div className="space-y-4 font-mono text-[10px]">
                {/* Header */}
                <div className="border-b border-primary/25 pb-3">
                  <div className="flex justify-between items-center text-primary font-bold">
                    <span>ROHIT RAJ</span>
                    <span>PAGE_01_CORE</span>
                  </div>
                  <span className="text-[8px] text-white/30">B.Tech Computer Science Engineering</span>
                </div>

                {/* Section Education */}
                <div className="space-y-1">
                  <span className="text-primary font-semibold tracking-wider flex items-center gap-1">
                    <GraduationCap size={10} /> 01. EDUCATION_DEGREES
                  </span>
                  <div className="bg-white/5 border border-white/5 p-2 rounded">
                    <div className="font-bold text-white text-[9px] flex justify-between">
                      <span>SRM Institute of Science & Tech</span>
                      <span>2024 - 2028</span>
                    </div>
                    <p className="text-white/60">B.Tech in Computer Science Engineering</p>
                    <p className="text-primary/95 font-semibold">CGPA: 8.65 / 10.0</p>
                  </div>
                </div>

                {/* Section Skills */}
                <div className="space-y-1.5">
                  <span className="text-primary font-semibold tracking-wider flex items-center gap-1">
                    <Cpu size={10} /> 02. CORE_SKILLSETS
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-white/80">
                    <div className="space-y-0.5">
                      <span className="text-white/40 block text-[8px] font-bold">LANGUAGES:</span>
                      <span>C++, Python, JS, TS</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-white/40 block text-[8px] font-bold">FRAMEWORKS:</span>
                      <span>FastAPI, React, Spring Boot</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-white/40 block text-[8px] font-bold">DATABASE:</span>
                      <span>MySQL, PostgreSQL, Supabase</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-white/40 block text-[8px] font-bold">UTILITIES:</span>
                      <span>Git, GitHub, Postman, ML</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Page footer */}
              <div className="border-t border-white/5 pt-3 font-mono text-[8px] text-white/30 flex justify-between">
                <span>[CLICK PREVIEW TO FLIP PAGE]</span>
                <span>ROHIT_RAJ_RESUME_v1</span>
              </div>
            </div>

            {/* Back Page (Page 2) */}
            <div 
              style={{ 
                backfaceVisibility: "hidden", 
                transform: "rotateY(180deg)" 
              }}
              className="absolute inset-0 glass-panel bg-black/95 p-6 rounded-2xl border border-primary/20 hover:border-primary flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              <div className="hologram-scan" />

              <div className="space-y-4 font-mono text-[10px]">
                {/* Header */}
                <div className="border-b border-primary/25 pb-3">
                  <div className="flex justify-between items-center text-primary font-bold">
                    <span>ROHIT RAJ</span>
                    <span>PAGE_02_PROJECTS</span>
                  </div>
                  <span className="text-[8px] text-white/30">Systems & Implementations Logs</span>
                </div>

                {/* Section Projects */}
                <div className="space-y-2">
                  <span className="text-primary font-semibold tracking-wider flex items-center gap-1">
                    <BookOpen size={10} /> 03. CORE_INTEGRATIONS
                  </span>
                  
                  <div className="bg-white/5 p-2 rounded border border-white/5 space-y-1">
                    <div className="font-bold text-white text-[9px]">Climate Risk Credit Scoring</div>
                    <p className="text-white/60 leading-normal">
                      Built FastAPI web server with custom Scikit-learn predictive algorithms evaluating underlying underwriting risk matrices.
                    </p>
                  </div>

                  <div className="bg-white/5 p-2 rounded border border-white/5 space-y-1">
                    <div className="font-bold text-white text-[9px]">BookVerse (Spring Boot)</div>
                    <p className="text-white/60 leading-normal">
                      Integrated JPA repositories and relational tables safeguarding ACID transactions on purchase gateways.
                    </p>
                  </div>
                </div>

                {/* Section Achievements */}
                <div className="space-y-1">
                  <span className="text-primary font-semibold tracking-wider flex items-center gap-1">
                    <Sparkles size={10} /> 04. ACCOLADE_VALUATION
                  </span>
                  <ul className="list-disc list-inside text-white/70 space-y-0.5">
                    <li>300+ DSA Problems Solved</li>
                    <li>Top 10 Finalist – AMJ Nexathon</li>
                    <li>Top 5 Finalist – Impact AI Thon</li>
                  </ul>
                </div>
              </div>

              {/* Page footer */}
              <div className="border-t border-white/5 pt-3 font-mono text-[8px] text-white/30 flex justify-between">
                <span>[CLICK PREVIEW TO FLIP PAGE]</span>
                <span>ROHIT_RAJ_RESUME_v2</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
