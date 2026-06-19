"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Zap, Terminal } from "lucide-react";
import confetti from "canvas-confetti";
import { getAudioContext } from "@/utils/audioHelper";

interface GodModeOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

export default function GodModeOverlay({ isActive, onClose }: GodModeOverlayProps) {
  useEffect(() => {
    if (isActive) {
      // Trigger sound sirens or sweeps
      playAlarmSound();

      // Trigger massive green success confetti bursts
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#00FF66", "#00FFCC", "#FFFFFF"],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#00FF66", "#00FFCC", "#FFFFFF"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();

      // Auto close overlay after 3.2s
      const timer = setTimeout(onClose, 3200);
      return () => clearTimeout(timer);
    }
  }, [isActive, onClose]);

  const playAlarmSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      // Siren sweep
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(800, now + 0.5);
      osc.frequency.linearRampToValueAtTime(300, now + 1.0);
      osc.frequency.linearRampToValueAtTime(800, now + 1.5);
      osc.frequency.linearRampToValueAtTime(200, now + 2.0);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.linearRampToValueAtTime(0.015, now + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 2.3);

      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    } catch {
      // Ignore
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#020b05]/95 z-99999 flex flex-col items-center justify-center font-mono overflow-hidden scanline"
        >
          {/* Glitching grids background */}
          <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

          {/* Hologram details */}
          <div className="absolute top-8 left-8 text-[9px] text-[#00FF66]/40 select-none">
            <div>OVERRIDE_PORT_ID: X-779</div>
            <div>STATUS: ACCESS_BYPASS</div>
          </div>

          <div className="absolute bottom-8 right-8 text-[9px] text-[#00FF66]/40 select-none text-right">
            <div>JARVIS_COGNIZANCE: ELEVATED</div>
            <div>THEME_MATRIX: CONFIGURED</div>
          </div>

          <div className="relative text-center max-w-md px-6 z-10 space-y-6">
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-20 h-20 border-2 border-[#00FF66] text-[#00FF66] rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_#00FF66]"
            >
              <ShieldAlert size={36} />
            </motion.div>

            <div className="space-y-2">
              <h2 
                className="text-2xl sm:text-3xl font-display font-black text-[#00FF66] glow-text glitch-effect"
                data-text="GOD MODE INITIATED"
              >
                GOD MODE INITIATED
              </h2>
              <span className="text-[10px] text-white/50 tracking-[0.2em] block">
                DEVELOPER SYSTEM BYPASS COMPLETE
              </span>
            </div>

            {/* Matrix telemetry data logs */}
            <div className="bg-[#031408] border border-[#00FF66]/30 p-4 rounded text-left text-[9px] text-[#00FF66]/70 h-32 overflow-hidden space-y-1">
              <div>&gt; BYPASSING CORE PORTFOLIO CONTROLLER... SUCCESS</div>
              <div>&gt; INJECTING HYPER-NEON COLOR THEMES... SUCCESS</div>
              <div>&gt; UNLOCKING GRID ENERGY WAVE AMPLITUDES... SUCCESS</div>
              <div>&gt; TELEMETRY OVERRIDES CONNECTED... SUCCESS</div>
              <div className="text-white animate-pulse">&gt; WELCOME DEVELOPER GOD. ROAMING FREE.</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
