"use client";

import { motion } from "framer-motion";

const achievements = [
  { title: "Hackathena 2026", result: "1st Place Winner" },
  { title: "Astrava 2026", result: "National Runner Up" },
  { title: "BeachHack 7", result: "2nd Place" },
  { title: "Fontober 2025", result: "Top 100 National" },
  { title: "CascadeNet", result: "Innovation Award" },
];

function AchievementStrip({ direction = "left", duration = 25 }) {
  const items = [...achievements, ...achievements, ...achievements];
  const isRtl = direction === "right";

  return (
    <div className="flex whitespace-nowrap overflow-hidden py-6">
      <motion.div
        className="flex gap-20 items-center"
        animate={{ x: isRtl ? [0, 1200] : [0, -1200] }}
        transition={{
          duration,
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
  );
}

export const Achievements = () => {
  return (
    <section id="achievements" className="relative w-full overflow-hidden bg-black border-y border-white/5">
      <AchievementStrip direction="left" duration={25} />
      <AchievementStrip direction="right" duration={30} />
      <AchievementStrip direction="left" duration={28} />
      <AchievementStrip direction="right" duration={32} />
      <AchievementStrip direction="left" duration={26} />
    </section>
  );
};
