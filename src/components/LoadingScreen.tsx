"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAudioContext } from "@/utils/audioHelper";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("boot"); // boot, system, ready

  useEffect(() => {
    // Increment progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setPhase("ready");
            setTimeout(onComplete, 1200);
          }, 800);
          return 100;
        }
        // Telemetry audio tick simulation using Web Audio
        if (prev % 10 === 0) {
          playTickSound();
        }
        const step = Math.floor(Math.random() * 8) + 2;
        return Math.min(prev + step, 100);
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete]);

  const playTickSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1500, ctx.currentTime);
      gain.gain.setValueAtTime(0.005, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);

      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    } catch {
      // Ignore audio block errors
    }
  };

  const playCompleteSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.setValueAtTime(1760, ctx.currentTime + 0.1); // A6
      
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(440, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
      
      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc2.start();
      osc.stop(ctx.currentTime + 0.6);
      osc2.stop(ctx.currentTime + 0.6);

      let endedCount = 0;
      const handleEnded = () => {
        endedCount++;
        if (endedCount === 2) {
          osc.disconnect();
          osc2.disconnect();
          gain.disconnect();
        }
      };
      osc.onended = handleEnded;
      osc2.onended = handleEnded;
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    if (phase === "ready") {
      playCompleteSound();
    }
  }, [phase]);

  return (
    <div className="fixed inset-0 bg-[#050505] z-9999 flex flex-col items-center justify-center overflow-hidden">
      {/* Laser-like Grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      
      {/* Lightning strikes from the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[50vh] bg-gradient-to-b from-[#FF6B00] via-[#FF8533] to-transparent lightning-bolt opacity-0 pointer-events-none" style={{ filter: "drop-shadow(0 0 15px #FF6B00)" }} />
      <div className="absolute top-0 left-1/3 w-[1px] h-[40vh] bg-gradient-to-b from-[#FF6B00] to-transparent lightning-bolt opacity-0 pointer-events-none" style={{ animationDelay: "1.2s", filter: "drop-shadow(0 0 8px #FF6B00)" }} />
      <div className="absolute top-0 left-2/3 w-[1px] h-[60vh] bg-gradient-to-b from-[#FF6B00] to-transparent lightning-bolt opacity-0 pointer-events-none" style={{ animationDelay: "2.8s", filter: "drop-shadow(0 0 10px #FF6B00)" }} />

      <div className="relative flex flex-col items-center z-10 w-full max-w-lg px-6">
        {/* Hologram Box Ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-28 h-28 border border-[#FF6B00]/40 flex items-center justify-center rounded-full mb-8"
          style={{ boxShadow: "0 0 30px rgba(255,107,0,0.15), inset 0 0 20px rgba(255,107,0,0.1)" }}
        >
          {/* Outer rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute inset-0 border-t border-b border-dashed border-[#FF6B00] rounded-full"
          />
          {/* Inner rotating ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute inset-2 border-l border-r border-[#FF6B00]/60 rounded-full"
          />
          <span className="font-display text-[#FF6B00] text-3xl font-bold tracking-widest glow-text">RR</span>
        </motion.div>

        {/* Loading status panel */}
        <div className="w-full text-center font-mono">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-sm font-semibold tracking-[0.25em] mb-4 uppercase flex items-center justify-center gap-2"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            INITIALIZING ROHIT RAJ SYSTEM
          </motion.h2>

          {/* Bar container */}
          <div className="relative h-1 bg-[#121212] border border-[#FF6B00]/20 rounded-full overflow-hidden w-full mb-3">
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#FF6B00] to-[#FF8533] shadow-[0_0_10px_#FF6B00]"
              style={{ width: `${progress}%` }}
            />
            {/* Hologram sweep scanline */}
            <div className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[pulse_1s_infinite]" style={{ left: `${progress - 5}%` }} />
          </div>

          <div className="flex justify-between items-center text-xs text-white/50 tracking-wider">
            <span className="text-left font-display">SYSTEM_STATE: {progress < 30 ? "MEM_INIT" : progress < 70 ? "THREE_SYS_INIT" : progress < 100 ? "CORE_LOADED" : "ONLINE"}</span>
            <span className="text-[#FF6B00] font-bold text-sm font-display glow-text">{progress}%</span>
          </div>

          {/* Subtext telemetry feedback logs */}
          <div className="mt-8 h-12 overflow-hidden text-[10px] text-white/30 text-left font-mono border-t border-[#FF6B00]/10 pt-2 flex flex-col justify-end">
            {progress > 10 && <div>&gt; CONNECTING DB CORE NETWORK... SECURE</div>}
            {progress > 40 && <div>&gt; INJECTING THREEJS VERTEX MATRIX DATA... OK</div>}
            {progress > 70 && <div>&gt; SYNCING JARVIS AI INTELLIGENCE INTERFACE... COMPLETE</div>}
            {progress === 100 && <div className="text-[#FF6B00]">&gt; ENCRYPTED HANDSHAKE CONFIRMED. REDIRECTING...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
