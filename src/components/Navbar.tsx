"use client";

import { useEffect, useState } from "react";
import { Terminal as TerminalIcon, Volume2, VolumeX, Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onTerminalOpen: () => void;
  isPlaying: boolean;
  toggleMusic: () => void;
  isGodMode: boolean;
}

export default function Navbar({ onTerminalOpen, isPlaying, toggleMusic, isGodMode }: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      // Change background opacity when scrolled
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "ABOUT", id: "about" },
    { label: "SKILLS", id: "skills" },
    { label: "PROJECTS", id: "projects" },
    { label: "ANALYTICS", id: "analytics" },
    { label: "EXPERIENCE", id: "experience" },
    { label: "CONTACT", id: "contact" },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-3" 
            : "bg-transparent py-5"
        }`}
      >
        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-[#121212] w-full">
          <div 
            className="h-full bg-gradient-to-r from-primary to-orange-400 shadow-[0_0_10px_var(--primary)] transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer clickable"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="font-display font-black tracking-widest text-lg text-primary glow-text">
              ROHIT RAJ
            </span>
            {isGodMode && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[9px] font-mono px-1.5 py-0.5 bg-primary/20 border border-primary text-primary rounded"
              >
                GOD_MODE
              </motion.span>
            )}
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="text-white/60 hover:text-primary hover:glow-text transition-all cursor-pointer relative py-1"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Utilities */}
          <div className="flex items-center gap-4">
            {/* Terminal Shortcut Button */}
            <button
              onClick={onTerminalOpen}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-black/60 hover:bg-primary/10 border border-primary/20 hover:border-primary rounded text-[10px] font-mono text-white/70 hover:text-white transition-all cursor-pointer"
            >
              <TerminalIcon size={12} className="text-primary" />
              <span>TERMINAL</span>
              <kbd className="opacity-40 text-[9px] bg-white/10 px-1 rounded">Ctrl+K</kbd>
            </button>

            {/* Music Mode Synth Toggle */}
            <button
              onClick={toggleMusic}
              className="relative w-8 h-8 flex items-center justify-center bg-black/40 border border-white/10 hover:border-primary/50 rounded-full text-white/75 hover:text-primary transition-all cursor-pointer"
              title="Toggle Cyber Synth Ambient Sound"
            >
              {isPlaying ? (
                <>
                  <Volume2 size={16} className="text-primary animate-pulse" />
                  {/* Bouncing audio indicator bars */}
                  <span className="absolute -bottom-1 flex items-end gap-[1.5px] h-3">
                    <span className="w-[1.5px] bg-primary animate-[bounce_0.8s_infinite_alternate]" style={{ animationDelay: "0.1s" }} />
                    <span className="w-[1.5px] bg-primary animate-[bounce_0.6s_infinite_alternate]" style={{ animationDelay: "0.3s" }} />
                    <span className="w-[1.5px] bg-primary animate-[bounce_1s_infinite_alternate]" style={{ animationDelay: "0.5s" }} />
                  </span>
                </>
              ) : (
                <VolumeX size={16} className="opacity-50" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-primary transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 bg-[#050505]/95 border-b border-primary/20 backdrop-blur-lg z-45 py-6 px-6 md:hidden flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="text-left py-2 font-mono text-sm tracking-wider hover:text-primary"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onTerminalOpen();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-black border border-primary/30 rounded font-mono text-xs text-primary"
            >
              <TerminalIcon size={14} />
              <span>LAUNCH TERMINAL</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
