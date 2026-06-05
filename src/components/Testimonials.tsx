"use client";

import { motion } from "framer-motion";
import { MessageSquare, Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Dr. Anjali Sharma",
      role: "Professor, CSE Dept.",
      company: "SRM Institute of Science & Tech",
      quote: "Rohit demonstrates stellar intellectual rigor in algorithms analysis. Maintaining an 8.65 CGPA while engineering production-ready microservices highlights both his consistency and execution capacity under pressure.",
      rating: 5,
    },
    {
      name: "Vikram Malhotra",
      role: "Lead Architect & Mentor",
      company: "AMJ Nexathon Challenge",
      quote: "Rohit is a hackathon execution engine. During Nexathon, he integrated FastAPI microservice endpoints and automated queue dispatch triggers in under 48 hours. His systems architectural knowledge is remarkable.",
      rating: 5,
    },
    {
      name: "Sanya Goel",
      role: "Full Stack Engineer",
      company: "BookVerse Team Partner",
      quote: "Working alongside Rohit was a masterclass in relational schema design. He designed MySQL ACID transactional gates preventing database stock race conditions, resolving our indexing bottlenecks perfectly.",
      rating: 5,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((test, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="glass-panel bg-black/80 p-6 rounded-2xl border border-white/5 hover:border-primary/30 flex flex-col justify-between relative overflow-hidden group"
        >
          {/* Hologram scanline */}
          <div className="hologram-scan" />
          
          <div className="space-y-4">
            {/* Header quote icon */}
            <div className="flex justify-between items-center">
              <Quote className="text-primary w-6 h-6 rotate-180 opacity-60" />
              <div className="flex gap-0.5">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} size={10} className="fill-primary text-primary" />
                ))}
              </div>
            </div>

            {/* Quote content */}
            <p className="text-white/70 text-xs font-sans leading-relaxed italic">
              "{test.quote}"
            </p>
          </div>

          {/* User details */}
          <div className="border-t border-white/5 pt-4 mt-6 flex items-center gap-3 font-mono">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
              {test.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="text-white font-bold block text-[10px] uppercase tracking-wide">
                {test.name}
              </span>
              <span className="text-white/40 text-[9px] block">
                {test.role} @ {test.company}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
