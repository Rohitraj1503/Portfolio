"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useWebAudio } from "@/hooks/useWebAudio";

// Core Components
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import CyberBackground from "@/components/CyberBackground";
import Navbar from "@/components/Navbar";
import Terminal from "@/components/Terminal";
import ChatAssistant from "@/components/ChatAssistant";
import GodModeOverlay from "@/components/GodModeOverlay";

// Sections
import Hero from "@/components/Hero";
import AvatarPanel from "@/components/AvatarPanel";
import AboutTimeline from "@/components/AboutTimeline";
import SkillUniverse from "@/components/SkillUniverse";
import ProjectCenter from "@/components/ProjectCenter";
import AchievementVault from "@/components/AchievementVault";
import TechStackLogos from "@/components/TechStackLogos";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ResumeVault from "@/components/ResumeVault";

import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [isGodMode, setIsGodMode] = useState(false);
  const [godOverlayActive, setGodOverlayActive] = useState(false);

  // Hook 1: Listen for Konami Code sequence
  useKonamiCode(() => {
    handleTriggerGodMode();
  });

  // Hook 2: Web Audio ambient music
  const { isPlaying, toggleMusic } = useWebAudio();

  const handleTriggerGodMode = () => {
    if (isGodMode) return; // Only trigger once
    setIsGodMode(true);
    setGodOverlayActive(true);
    document.documentElement.classList.add("god-mode");
  };

  // Keyboard shortcut listener (Ctrl + K) for Command Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Intro Loading animation */}
      <AnimatePresence>
        {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      {/* Main UI layout shell */}
      {isLoaded && (
        <div className="relative flex flex-col flex-1 w-full min-h-screen">
          {/* Custom Canvas particle cursor */}
          <CustomCursor />

          {/* Three.js 3D Background */}
          <CyberBackground />

          {/* Floating Navigation Menu bar */}
          <Navbar
            onTerminalOpen={() => setTerminalOpen(true)}
            isPlaying={isPlaying}
            toggleMusic={toggleMusic}
            isGodMode={isGodMode}
          />

          <main className="flex-1 w-full max-w-7xl mx-auto px-6 space-y-32 py-12 relative z-10">
            {/* HERO SECTION */}
            <Hero
              onProjectsClick={() => handleScrollTo("projects")}
              onContactClick={() => handleScrollTo("contact")}
              onResumeClick={() => handleScrollTo("resume")}
            />

            {/* ABOUT & AVATAR SECTION */}
            <section id="about" className="scroll-mt-24">
              <div className="space-y-4 mb-12 text-center lg:text-left">
                <span className="text-[10px] font-mono text-primary tracking-[0.25em] block">
                  SYSTEM_PROFILE_DECRYPTED
                </span>
                <h2 className="text-4xl font-display font-black text-white uppercase tracking-wider">
                  ABOUT & story TIMELINE
                </h2>
                <div className="w-16 h-1 bg-primary mx-auto lg:mx-0 shadow-[0_0_8px_var(--primary)]" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-4">
                  <AvatarPanel />
                </div>
                <div className="lg:col-span-8">
                  <AboutTimeline />
                </div>
              </div>
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="scroll-mt-24">
              <div className="space-y-4 mb-12 text-center lg:text-left">
                <span className="text-[10px] font-mono text-primary tracking-[0.25em] block">
                  ORBITAL_COMPETENCY_GRID
                </span>
                <h2 className="text-4xl font-display font-black text-white uppercase tracking-wider">
                  SKILL UNIVERSE
                </h2>
                <div className="w-16 h-1 bg-primary mx-auto lg:mx-0 shadow-[0_0_8px_var(--primary)]" />
              </div>
              <SkillUniverse />
            </section>

            {/* PROJECT COMMAND CENTER */}
            <section id="projects" className="scroll-mt-24">
              <div className="space-y-4 mb-12 text-center lg:text-left">
                <span className="text-[10px] font-mono text-primary tracking-[0.25em] block">
                  INTEGRATIONS_COMMAND_CENTRAL
                </span>
                <h2 className="text-4xl font-display font-black text-white uppercase tracking-wider">
                  PROJECTS DASHBOARD
                </h2>
                <div className="w-16 h-1 bg-primary mx-auto lg:mx-0 shadow-[0_0_8px_var(--primary)]" />
              </div>
              <ProjectCenter />
            </section>

            {/* TECH STACK LOGOS MATRIX */}
            <section id="analytics" className="scroll-mt-24">
              <div className="space-y-4 mb-12 text-center lg:text-left">
                <span className="text-[10px] font-mono text-primary tracking-[0.25em] block">
                  FLOATING_COMPILER_GRID
                </span>
                <h2 className="text-4xl font-display font-black text-white uppercase tracking-wider">
                  TECH STACK MATRIX
                </h2>
                <div className="w-16 h-1 bg-primary mx-auto lg:mx-0 shadow-[0_0_8px_var(--primary)]" />
              </div>
              <TechStackLogos />
            </section>

            {/* ACHIEVEMENT VAULT */}
            <section className="scroll-mt-24">
              <div className="space-y-4 mb-12 text-center lg:text-left">
                <span className="text-[10px] font-mono text-primary tracking-[0.25em] block">
                  CERTIFIED_ACCOLADES_RECORD
                </span>
                <h2 className="text-4xl font-display font-black text-white uppercase tracking-wider">
                  ACHIEVEMENT VAULT
                </h2>
                <div className="w-16 h-1 bg-primary mx-auto lg:mx-0 shadow-[0_0_8px_var(--primary)]" />
              </div>
              <AchievementVault />
            </section>

            {/* EXPERIENCE TIMELINE */}
            <section id="experience" className="scroll-mt-24">
              <div className="space-y-4 mb-12 text-center lg:text-left">
                <span className="text-[10px] font-mono text-primary tracking-[0.25em] block">
                  OPERATIONS_DEPLOYMENT_RECORDS
                </span>
                <h2 className="text-4xl font-display font-black text-white uppercase tracking-wider">
                  EXPERIENCE TIMELINE
                </h2>
                <div className="w-16 h-1 bg-primary mx-auto lg:mx-0 shadow-[0_0_8px_var(--primary)]" />
              </div>
              <ExperienceTimeline />
            </section>

            {/* RESUME VAULT */}
            <section id="resume" className="scroll-mt-24">
              <div className="space-y-4 mb-12 text-center lg:text-left">
                <span className="text-[10px] font-mono text-primary tracking-[0.25em] block">
                  HOLOGRAPHIC_ENVELOPE_INSPECT
                </span>
                <h2 className="text-4xl font-display font-black text-white uppercase tracking-wider">
                  RESUME SECTION
                </h2>
                <div className="w-16 h-1 bg-primary mx-auto lg:mx-0 shadow-[0_0_8px_var(--primary)]" />
              </div>
              <ResumeVault />
            </section>



            {/* CONTACT SECTION */}
            <section id="contact" className="scroll-mt-24 pb-16">
              <div className="space-y-4 mb-12 text-center lg:text-left">
                <span className="text-[10px] font-mono text-primary tracking-[0.25em] block">
                  ESTABLISH_SOCKET_LINK
                </span>
                <h2 className="text-4xl font-display font-black text-white uppercase tracking-wider">
                  COMMUNICATION CENTER
                </h2>
                <div className="w-16 h-1 bg-primary mx-auto lg:mx-0 shadow-[0_0_8px_var(--primary)]" />
              </div>
              <ContactForm />
            </section>
          </main>

          {/* FOOTER */}
          <footer className="border-t border-[#FF6B00]/15 py-12 relative z-10 bg-black/60 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
              <div className="text-center md:text-left">
                <div className="text-white font-bold tracking-widest uppercase font-display text-sm mb-1">
                  ROHIT <span className="text-primary">RAJ</span>
                </div>
                <span className="text-white/40 block text-[10px]">
                  "Building the future one line of code at a time."
                </span>
              </div>

              <div className="flex gap-6 text-[10px] text-white/50">
                <a href="https://github.com/rohitraj" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GITHUB</a>
                <a href="https://linkedin.com/in/rohitraj" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LINKEDIN</a>
                <a href="mailto:rohitraj@gmail.com" className="hover:text-primary transition-colors">EMAIL</a>
              </div>

              <div className="text-[10px] text-white/30 text-center md:text-right">
                © {new Date().getFullYear()} ROHIT RAJ. ALL RIGHTS SECURED.
              </div>
            </div>
          </footer>

          {/* Bottom Right Floating AI JARVIS Chat Widget */}
          <ChatAssistant />

          {/* Ctrl+K Overlay terminal console */}
          <Terminal
            isOpen={terminalOpen}
            onClose={() => setTerminalOpen(false)}
            triggerGodMode={handleTriggerGodMode}
          />

          {/* Easter egg Konami God Mode Glitch alert overlays */}
          <GodModeOverlay
            isActive={godOverlayActive}
            onClose={() => setGodOverlayActive(false)}
          />
        </div>
      )}
    </>
  );
}
