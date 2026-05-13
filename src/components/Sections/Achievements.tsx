"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Award, Rocket } from "lucide-react";

const achievements = [
  {
    title: "1st Place — Hackathena 2026",
    organization: "National Level Hackathon",
    date: "Mar 2026",
    icon: <Trophy className="w-8 h-8 text-[#f74507]" />,
    description: "Won first place at Jyothi Engineering College for CascadeNet, an AI-driven disaster coordination platform."
  },
  {
    title: "2nd Runner Up — Astrava 2026",
    organization: "National Level Hackathon",
    date: "Mar 2026",
    icon: <Award className="w-8 h-8 text-[#f74507]" />,
    description: "Secured a top spot among 1,200+ registrations at Dr. Ambedkar Institute of Technology, Bengaluru."
  },
  {
    title: "2nd Place — BeachHack 7",
    organization: "Hack4Christ",
    date: "Feb 2025",
    icon: <Rocket className="w-8 h-8 text-[#f74507]" />,
    description: "Achieved second place in a 36-hour hackathon for Sentinel AI, an ML security framework."
  },
  {
    title: "Top 100 — Fontober 2026",
    organization: "Designare (National)",
    date: "Oct 2025",
    icon: <Star className="w-8 h-8 text-[#f74507]" />,
    description: "Recognized as a top designer in a national-level design challenge."
  }
];


export const Achievements = () => {
  return (
    <section id="achievements" className="relative min-h-screen w-full py-24 px-6 md:px-24 flex flex-col justify-center bg-white">
      <div className="max-w-5xl mx-auto w-full space-y-16">
        <div className="space-y-4">
          <span className="text-accent font-mono text-xs uppercase tracking-widest">Milestones</span>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-black">Recognition</h2>
        </div>

        <div className="space-y-8">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-8 p-8 rounded-3xl border border-black/5 bg-black/[0.02] hover:bg-black/[0.05] transition-all"
            >
              <div className="p-4 rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-xl md:text-2xl font-bold text-black">{item.title}</h3>
                <p className="text-black/60 text-sm md:text-base">{item.description}</p>
                <p className="text-accent/80 text-xs font-mono uppercase tracking-tighter font-semibold">{item.organization}</p>
              </div>
              <div className="text-right hidden md:block">
                <span className="text-black/40 font-mono text-sm">{item.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
