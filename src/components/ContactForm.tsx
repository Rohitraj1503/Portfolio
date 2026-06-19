"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal as TerminalIcon, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";
import { getAudioContext } from "@/utils/audioHelper";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [statusLogs, setStatusLogs] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const playTransmitSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.008, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);

      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    } catch {
      // Ignore
    }
  };

  const executeSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSuccess(false);
    setStatusLogs([
      "INITIALIZING INTEL_UPLINK PROTOCOL...",
      "ESTABLISHING SECURE CONNECTION ROUTE...",
    ]);
    playTransmitSound();

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatusLogs((prev) => [...prev, "ENCRYPTING TELEMETRY PACKET... OK"]);
      playTransmitSound();

      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatusLogs((prev) => [...prev, "DISPATCHING PAYLOAD GATEWAY..."]);
      playTransmitSound();

      const response = await fetch("https://formsubmit.co/ajax/rohitraj.codes@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatusLogs((prev) => [
          ...prev,
          "RESPONSE RECEIVED: STATUS 200 OK",
          "TRANSMISSION CONFIRMED BY MAIL GATEWAY",
        ]);
        playTransmitSound();
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        
        // Spawn success confetti
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#FF6B00", "#FFFFFF", "#FF8533"],
        });
      } else {
        throw new Error("HTTP response status error");
      }

    } catch (err) {
      setStatusLogs((prev) => [
        ...prev,
        "[ERR] SECURE SOCKET ACCESS DENIED.",
        "[ERR] TRANSMISSION ERROR: UNABLE TO CONNECT TO GATEWAY.",
      ]);
      playTransmitSound();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Input Fields Console */}
      <div className="col-span-1 lg:col-span-6">
        <form onSubmit={executeSend} className="space-y-4 font-mono text-xs">
          <div className="glass-panel bg-black/85 p-5 rounded-2xl border border-white/5 hover:border-primary/20 space-y-4">
            <div>
              <label className="text-white/40 block text-[10px] mb-1.5 uppercase font-bold">
                01. SENDER_IDENTIFICATION_NAME
              </label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isSubmitting || success}
                placeholder="INPUT FULL NAME"
                className="w-full bg-[#121212] border border-white/10 focus:border-primary p-3 rounded text-white focus:outline-none placeholder-white/10 select-text"
              />
            </div>

            <div>
              <label className="text-white/40 block text-[10px] mb-1.5 uppercase font-bold">
                02. TELEMETRY_RETURN_EMAIL
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting || success}
                placeholder="INPUT RETURN EMAIL ADDRESS"
                className="w-full bg-[#121212] border border-white/10 focus:border-primary p-3 rounded text-white focus:outline-none placeholder-white/10 select-text"
              />
            </div>

            <div>
              <label className="text-white/40 block text-[10px] mb-1.5 uppercase font-bold">
                03. UPLINK_MESSAGE_PAYLOAD
              </label>
              <textarea
                required
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                disabled={isSubmitting || success}
                placeholder="TYPE TELEMETRY MESSAGE DETAILS..."
                className="w-full bg-[#121212] border border-white/10 focus:border-primary p-3 rounded text-white focus:outline-none placeholder-white/10 h-32 resize-none select-text"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || success || !formData.name}
              className="w-full py-3.5 bg-primary text-black font-bold tracking-widest text-xs uppercase hover:bg-white hover:border-white transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send size={12} />
              <span>DISPATCH TELEMETRY</span>
            </button>
          </div>
        </form>
      </div>

      {/* Dynamic Telemetry Terminal Output */}
      <div className="col-span-1 lg:col-span-6 flex flex-col">
        <div className="flex-1 glass-panel bg-black/90 p-5 rounded-2xl border border-white/5 hover:border-primary/20 flex flex-col justify-between h-[360px] overflow-hidden">
          <div className="space-y-4 font-mono text-[10px]">
            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-white/40">
              <span className="flex items-center gap-1.5 text-primary">
                <TerminalIcon size={12} className="animate-pulse" /> SENDER_TRANSMIT_LOGS
              </span>
              <span>PORT_22_STREAM</span>
            </div>

            {/* Transmission logs list */}
            <div className="space-y-1.5 overflow-y-auto max-h-[220px]">
              {statusLogs.length === 0 ? (
                <div className="text-white/20 italic">&gt; Idle. Waiting for packet dispatch triggers...</div>
              ) : (
                statusLogs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={
                      log.includes("ERR") 
                        ? "text-red-400 font-bold" 
                        : log.includes("OK") || log.includes("CONFIRMED") 
                          ? "text-primary" 
                          : "text-white/60"
                    }
                  >
                    &gt; {log}
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Success telemetry overlays */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded flex items-center gap-3 font-mono text-[10px] text-emerald-400"
              >
                <ShieldCheck size={16} className="animate-bounce" />
                <div>
                  <span className="font-bold block">UPLINK_TRANSMITTED: OK</span>
                  <span>Rohit has been notified. Responding shortly.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-white/20 font-mono text-[9px] border-t border-white/5 pt-3 flex justify-between items-center">
            <span>GATEWAY_PROTOCOL: HTTPS</span>
            <span>DATA_REDUNDANCY: MULTI_NODE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
