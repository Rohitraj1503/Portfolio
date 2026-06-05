"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareCode, X, Bot, CornerDownLeft } from "lucide-react";

interface Message {
  sender: "user" | "jarvis";
  text: string;
}

const INITIAL_RESPONSE = "Online. Jarvis core sequence active. How can I assist your engineering evaluation of Rohit Raj today?";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "jarvis", text: INITIAL_RESPONSE },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickQuestions = [
    { label: "Who is Rohit?", text: "Who is Rohit Raj?" },
    { label: "Show projects", text: "What projects has he built?" },
    { label: "Show skills", text: "What is his tech stack?" },
    { label: "Show achievements", text: "Display hackathon achievements" },
    { label: "Get resume", text: "Where can I view his resume?" },
  ];

  const playChatBeep = (freq = 700, vol = 0.005) => {
    try {
      const ctxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!ctxClass) return;
      const ctx = new ctxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (isTyping || !text.trim()) return;
    playChatBeep(800);

    const newUserMessage: Message = { sender: "user", text };
    const updatedMessages = [...messages, newUserMessage];

    // Add user message immediately
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      if (!response.ok) {
        throw new Error("Telemetry response status error");
      }

      const data = await response.json();
      const reply = data.reply || "Telemetry query returned an empty packet.";

      setMessages((prev) => [...prev, { sender: "jarvis", text: reply }]);
      playChatBeep(900, 0.01);
    } catch (err) {
      console.error("Chat transmission error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "jarvis",
          text: "SYSTEM WARNING: Telemetry transmission failure. Secure uplink to Jarvis mainframe interrupted. Please re-engage.",
        },
      ]);
      playChatBeep(400, 0.02);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-9999">
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            playChatBeep(600, 0.015);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-14 h-14 bg-black border border-[#FF6B00]/40 rounded-full flex items-center justify-center text-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.25)] hover:border-[#FF6B00] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] transition-all cursor-pointer"
        >
          {/* Pulsing ring */}
          <div className="absolute inset-0 border border-[#FF6B00]/20 rounded-full animate-ping opacity-60 pointer-events-none" />
          {isOpen ? <X size={22} /> : <MessageSquareCode size={24} />}
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-96 h-[480px] glass-panel bg-black/95 rounded-lg border border-[#FF6B00]/30 shadow-2xl flex flex-col z-9999 overflow-hidden font-mono text-xs"
          >
            {/* Header */}
            <div className="bg-[#121212] border-b border-[#FF6B00]/20 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-[#FF6B00] animate-bounce" />
                <div>
                  <div className="text-white font-bold font-display tracking-wider">JARVIS_INTELLIGENCE</div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    ONLINE
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col scrollbar-thin">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`max-w-[85%] rounded p-2.5 ${
                    m.sender === "user"
                      ? "bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-white self-end rounded-br-none"
                      : "bg-[#121212]/80 border border-white/5 text-white/90 self-start rounded-bl-none"
                  } whitespace-pre-line`}
                >
                  {m.text}
                </div>
              ))}
              {isTyping && (
                <div className="bg-[#121212]/80 border border-white/5 text-white/40 self-start rounded p-2.5 rounded-bl-none flex items-center gap-1.5">
                  <span className="text-[10px]">Jarvis compiling</span>
                  <div className="flex gap-0.5">
                    <div className="w-1 h-1 bg-[#FF6B00] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1 h-1 bg-[#FF6B00] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1 h-1 bg-[#FF6B00] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips */}
            <div className="p-3 bg-[#0a0a0a]/50 border-t border-[#FF6B00]/10 flex flex-wrap gap-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  disabled={isTyping}
                  onClick={() => handleSendMessage(q.text)}
                  className="px-2 py-1 bg-black hover:bg-[#FF6B00]/10 border border-[#FF6B00]/20 hover:border-[#FF6B00] rounded text-[10px] text-white/60 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-3 bg-[#121212] border-t border-[#FF6B00]/20 flex items-center gap-2">
              <input
                type="text"
                disabled={isTyping}
                placeholder="Ask something else..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim()) {
                    handleSendMessage(e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
                className="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder-white/30"
              />
              <CornerDownLeft size={14} className="text-[#FF6B00]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
