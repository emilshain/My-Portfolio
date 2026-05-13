"use client";

import { motion } from "framer-motion";

const achievements = [
  {
    title: "1st Place — Hackathena 2026",
    organization: "National Level Hackathon",
    date: "Mar 2026",
    description: "Won first place at Jyothi Engineering College for CascadeNet, an AI-driven disaster coordination platform.",
    size: "large"
  },
  {
    title: "2nd Runner Up — Astrava 2026",
    organization: "National Level Hackathon",
    date: "Mar 2026",
    description: "Secured a top spot among 1,200+ registrations at Dr. Ambedkar Institute of Technology.",
    size: "small"
  },
  {
    title: "2nd Place — BeachHack 7",
    organization: "Hack4Christ",
    date: "Feb 2025",
    description: "Achieved second place for Sentinel AI, an ML security framework.",
    size: "small"
  },
  {
    title: "Top 100 — Fontober 2025",
    organization: "Designare (National)",
    date: "Oct 2025",
    description: "Recognized as a top designer in a national-level challenge.",
    size: "large"
  }
];

export const Achievements = () => {
  return (
    <section id="achievements" className="relative min-h-screen w-full py-32 px-6 md:px-24 bg-black">
      <div className="max-w-7xl mx-auto w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent font-mono text-sm uppercase tracking-[0.3em]"
            >
              Excellence & Impact
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter text-white uppercase leading-none"
            >
              Recognition
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted max-w-xs text-sm md:text-base leading-relaxed"
          >
            A curated selection of awards and milestones achieved through relentless innovation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`
                group relative p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] 
                hover:bg-white/[0.04] transition-all duration-500 overflow-hidden flex flex-col justify-between
                ${item.size === 'large' ? 'md:col-span-8 min-h-[350px]' : 'md:col-span-4 min-h-[350px]'}
              `}
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className={`font-bold text-white tracking-tight leading-tight ${item.size === 'large' ? 'text-3xl md:text-5xl' : 'text-2xl'}`}>
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm md:text-base leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-accent/60 text-xs font-mono uppercase tracking-widest">{item.organization}</span>
                <span className="text-muted/40 font-mono text-xs">{item.date}</span>
              </div>

              {/* Decorative Background Gradient */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-[100px] group-hover:bg-accent/10 transition-colors duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
