"use client";

import { motion } from "framer-motion";

const achievements = [
  { title: "Hackathena 2026", result: "1st Place Winner" },
  { title: "Astrava 2026", result: "National Runner Up" },
  { title: "BeachHack 7", result: "2nd Place" },
  { title: "Fontober 2025", result: "Top 100 National" },
  { title: "CascadeNet", result: "Innovation Award" },
];

export const Achievements = () => {
  // Duplicate for infinite scroll
  const items = [...achievements, ...achievements, ...achievements];

  return (
    <section id="achievements" className="relative w-full py-12 overflow-hidden bg-black border-y border-white/5">
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div 
          className="flex gap-20 items-center"
          animate={{ x: [0, -1200] }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 group">
              <span className="text-2xl md:text-4xl font-bold tracking-tighter text-white/40 group-hover:text-white transition-colors duration-500 uppercase">
                {item.title}
              </span>
              <span className="bg-accent text-white text-[10px] px-3 py-1 font-bold uppercase tracking-widest">
                {item.result}
              </span>
              <span className="text-white/10 text-4xl font-thin mx-4">—</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
