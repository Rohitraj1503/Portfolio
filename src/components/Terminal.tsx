"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles } from "lucide-react";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerGodMode: () => void;
}

const COMMANDS = [
  { cmd: "/projects", desc: "View advanced project portfolio dashboard", target: "projects" },
  { cmd: "/skills", desc: "Open the 3D Skill Universe planet orbit", target: "skills" },
  { cmd: "/resume", desc: "Display digital resume vault options", target: "resume" },
  { cmd: "/contact", desc: "Initiate contact communication uplink", target: "contact" },
  { cmd: "/about", desc: "Access B.Tech CSE storytelling timeline", target: "about" },
  { cmd: "/godmode", desc: "Unlock Developer God Mode (Konami cheat override)", target: "godmode" },
];

export default function Terminal({ isOpen, onClose, triggerGodMode }: TerminalProps) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState(COMMANDS);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "ROHIT_SYSTEM v2060.0.1 Terminal Initialized.",
    "Type / and press Enter to execute telemetry scrolls.",
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const historyEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      playTerminalBeep(600, 0.05);
    }
  }, [isOpen]);

  useEffect(() => {
    // Filter suggestions based on input
    const filter = inputValue.trim().toLowerCase();
    if (!filter) {
      setSuggestions(COMMANDS);
    } else {
      setSuggestions(COMMANDS.filter((c) => c.cmd.startsWith(filter)));
    }
  }, [inputValue]);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const playTerminalBeep = (freq = 800, duration = 0.05) => {
    try {
      const ctxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!ctxClass) return;
      const ctx = new ctxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.008, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration + 0.01);
    } catch {
      // Ignore
    }
  };

  const handleCommandRun = (commandText: string) => {
    const cleanCmd = commandText.trim().toLowerCase();
    
    // Add to history
    setTerminalHistory((prev) => [...prev, `> ${commandText}`]);

    const commandMatch = COMMANDS.find((c) => c.cmd === cleanCmd);

    if (cleanCmd === "/godmode") {
      setTerminalHistory((prev) => [...prev, "[OK] Developer God Mode system bypass activated!"]);
      playTerminalBeep(1200, 0.3);
      triggerGodMode();
      setTimeout(onClose, 800);
    } else if (commandMatch && commandMatch.target) {
      setTerminalHistory((prev) => [...prev, `[OK] Teleporting to #${commandMatch.target}...`]);
      playTerminalBeep(900, 0.15);
      
      const el = document.getElementById(commandMatch.target);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          onClose();
        }, 300);
      } else {
        setTerminalHistory((prev) => [...prev, `[ERR] Target anchor #${commandMatch.target} not rendered.`]);
      }
    } else {
      setTerminalHistory((prev) => [
        ...prev,
        `[ERR] Command '${commandText}' not recognized. Use tab or select suggestions.`,
      ]);
      playTerminalBeep(300, 0.25);
    }

    setInputValue("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-99999 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-lg glass-panel bg-black/90 rounded-lg overflow-hidden border border-[#FF6B00]/40 flex flex-col h-[400px]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="bg-[#121212] border-b border-[#FF6B00]/20 px-4 py-2 flex items-center justify-between text-xs font-mono text-white/50">
            <div className="flex items-center gap-2 text-[#FF6B00]">
              <TerminalIcon size={14} className="animate-pulse" />
              <span className="font-bold tracking-wider font-display glow-text">JARVIS COMMAND MATRIX</span>
            </div>
            <div>[ESC] to abort</div>
          </div>

          {/* Terminal History */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-white/80 space-y-2 select-text selection:bg-[#FF6B00] selection:text-black">
            {terminalHistory.map((line, idx) => (
              <div 
                key={idx} 
                className={
                  line.startsWith(">") 
                    ? "text-white/60 font-semibold" 
                    : line.includes("[ERR]") 
                      ? "text-red-500 font-bold" 
                      : line.includes("[OK]") 
                        ? "text-[#FF6B00] font-bold" 
                        : "text-white/40"
                }
              >
                {line}
              </div>
            ))}
            <div ref={historyEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="px-4 py-2 bg-[#0d0d0d] border-t border-[#FF6B00]/10 flex flex-wrap gap-2 max-h-[85px] overflow-y-auto">
            {suggestions.map((c) => (
              <button
                key={c.cmd}
                onClick={() => {
                  playTerminalBeep(700, 0.04);
                  handleCommandRun(c.cmd);
                }}
                className="text-[10px] font-mono px-2 py-1 bg-black rounded border border-[#FF6B00]/20 hover:border-[#FF6B00] hover:bg-[#FF6B00]/10 text-white/70 hover:text-white flex items-center gap-1 transition-all"
              >
                <span className="text-[#FF6B00]">{c.cmd}</span>
                <span className="opacity-50">({c.desc})</span>
              </button>
            ))}
          </div>

          {/* Command Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputValue.trim()) {
                handleCommandRun(inputValue);
              }
            }}
            className="bg-[#121212] border-t border-[#FF6B00]/20 p-3 flex items-center gap-2"
          >
            <span className="text-[#FF6B00] font-mono text-sm font-bold animate-pulse">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                playTerminalBeep(550, 0.02);
              }}
              placeholder="Type slash commands /projects, /skills, /resume..."
              className="flex-1 bg-transparent text-white border-none outline-none font-mono text-sm placeholder-white/20 select-text"
            />
            <button
              type="submit"
              className="p-1 bg-[#FF6B00]/20 hover:bg-[#FF6B00]/40 border border-[#FF6B00]/30 rounded text-white flex items-center justify-center transition-all"
            >
              <CornerDownLeft size={14} />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
