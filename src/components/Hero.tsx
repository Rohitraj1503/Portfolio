"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Code, Terminal as TerminalIcon } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

interface HeroProps {
  onProjectsClick: () => void;
  onContactClick: () => void;
  onResumeClick: () => void;
}

export default function Hero({ onProjectsClick, onContactClick, onResumeClick }: HeroProps) {
  const typingStrings = [
    "Full Stack Developer",
    "AI Enthusiast",
    "Hackathon Finalist",
    "Problem Solver",
  ];
  
  const [currentTextIdx, setCurrentTextIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeString = typingStrings[currentTextIdx];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeString.substring(0, currentText.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeString.substring(0, currentText.length + 1));
      }, 100);
    }

    if (!isDeleting && currentText === activeString) {
      // Pause at full string
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentTextIdx((prev) => (prev + 1) % typingStrings.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIdx]);

  const socials = [
    { icon: <GithubIcon size={18} />, href: "https://github.com/rohitraj", name: "GitHub" },
    { icon: <LinkedinIcon size={18} />, href: "https://linkedin.com/in/rohitraj", name: "LinkedIn" },
    { icon: <Mail size={18} />, href: "mailto:rohitraj@gmail.com", name: "Email" },
    { icon: <Code size={18} />, href: "https://leetcode.com/rohitraj", name: "LeetCode" },
    { icon: <TerminalIcon size={18} />, href: "https://hackerrank.com/rohitraj", name: "HackerRank" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden px-6">


      <div className="relative text-center z-10 max-w-4xl flex flex-col items-center">
        {/* Core HUD node decorative */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-16 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"
        />

        {/* Small Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-[10px] font-mono text-primary tracking-widest mb-6 flex items-center gap-1.5 glow-text"
        >
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
          SYSTEM PROTOCOL ONLINE
        </motion.div>

        {/* Rohit Raj Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl sm:text-8xl font-display font-black tracking-tight text-white mb-6 uppercase"
          style={{ letterSpacing: "-0.02em" }}
        >
          ROHIT <span className="text-primary glow-text">RAJ</span>
        </motion.h1>

        {/* Typing Subtitle */}
        <div className="h-8 mb-10 flex items-center justify-center font-mono text-base sm:text-xl text-white/70 tracking-wider">
          <span>{currentText}</span>
          <span className="w-[3px] h-5 bg-primary ml-1.5 animate-pulse" />
        </div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <button
            onClick={onProjectsClick}
            className="px-8 py-3.5 bg-primary text-black font-mono font-bold tracking-widest text-xs uppercase hover:bg-white hover:text-black border border-primary hover:border-white transition-all duration-300 shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] cursor-pointer"
          >
            VIEW PROJECTS
          </button>
          
          <button
            onClick={onResumeClick}
            className="px-8 py-3.5 bg-black/60 border border-primary/40 hover:border-primary text-white font-mono font-bold tracking-widest text-xs uppercase hover:bg-primary/10 transition-all duration-300 cursor-pointer"
          >
            RESUME VAULT
          </button>

          <button
            onClick={onContactClick}
            className="px-8 py-3.5 bg-transparent border border-white/20 hover:border-white text-white font-mono font-bold tracking-widest text-xs uppercase hover:bg-white/5 transition-all duration-300 cursor-pointer"
          >
            CONTACT ME
          </button>
        </motion.div>

        {/* Social Icons with Orange Trails */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-6"
        >
          {socials.map((soc, idx) => (
            <a
              key={idx}
              href={soc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-10 h-10 rounded bg-[#121212]/60 border border-white/10 hover:border-primary flex items-center justify-center text-white/50 hover:text-primary transition-all duration-300 group shadow-md"
              title={soc.name}
            >
              {/* Lightning Trail hover rings */}
              <span className="absolute inset-0 rounded border border-primary/0 group-hover:border-primary group-hover:scale-125 opacity-0 group-hover:opacity-40 transition-all duration-500 pointer-events-none" />
              <span className="absolute inset-0 rounded border border-primary/0 group-hover:border-primary group-hover:scale-150 opacity-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none" />
              {soc.icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Futuristic scanning grids overlay inside hero bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
}
