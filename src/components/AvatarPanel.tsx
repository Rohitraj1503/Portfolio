"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, BookOpen, GraduationCap, Cpu } from "lucide-react";

export default function AvatarPanel() {
  return (
    <div className="relative group max-w-md mx-auto">
      {/* Dynamic glow card wrapper */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-[#FF8533] rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
      
      {/* Interactive Main HUD frame */}
      <div className="relative glass-panel bg-black/95 p-6 rounded-2xl border border-primary/40 flex flex-col items-center shadow-lg">
        {/* Avatar Image Frame wrapper */}
        <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
          {/* External rotating frame circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            className="absolute inset-0 border border-dashed border-primary/40 rounded-full"
          />
          {/* Internal reversed rotating frame circle */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute inset-2 border-2 border-double border-primary/20 rounded-full"
          />
          
          {/* Core hologram profile image - cleared of green/orange filters and scanning grid lines */}
          <div className="absolute inset-3 rounded-full overflow-hidden border-2 border-primary/60 transition-all duration-300">
            <Image
              src="/profile.jpg"
              alt="Rohit Raj Avatar"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </div>

        {/* Readout parameters */}
        <div className="w-full text-center space-y-4 font-mono">
          <div>
            <h3 className="text-xl font-display font-black tracking-widest text-white uppercase glow-text">
              ROHIT RAJ
            </h3>
            <span className="text-[9px] text-white/60 tracking-[0.25em]">CORE_IDENTIFIER: RR_865</span>
          </div>

          <div className="border-y border-primary/20 py-3.5 space-y-3.5 text-left text-xs">
            <div className="flex items-center gap-3">
              <GraduationCap className="text-primary w-4 h-4" />
              <div>
                <span className="text-primary font-bold block text-[10px] tracking-wider">DEGREE</span>
                <span className="text-white font-bold text-sm block">B.Tech CSE (Computer Science)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BookOpen className="text-primary w-4 h-4" />
              <div>
                <span className="text-primary font-bold block text-[10px] tracking-wider">INSTITUTION</span>
                <span className="text-white font-bold text-sm block">SRM Institute of Science & Tech</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="text-primary w-4 h-4 animate-pulse" />
              <div>
                <span className="text-primary font-bold block text-[10px] tracking-wider">ACADEMIC_EVALUATION</span>
                <span className="text-primary font-black text-base block glow-text">CGPA: 8.65 / 10.0</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Cpu className="text-primary w-4 h-4" />
              <div>
                <span className="text-primary font-bold block text-[10px] tracking-wider">SYSTEM_FOCUS</span>
                <span className="text-white font-bold text-sm block">Full Stack Web & AI Systems</span>
              </div>
            </div>
          </div>

          {/* Telemetry ping node */}
          <div className="text-[10px] text-emerald-400 flex items-center justify-center gap-1.5 pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>INTELLIGENCE LINK_ESTABLISHED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
