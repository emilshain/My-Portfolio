"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const achievements = [
  { title: "Hackathena 2026", result: "1st Place Winner" },
  { title: "Astrava 2026", result: "National Runner Up" },
  { title: "BeachHack 7", result: "2nd Place" },
  { title: "Fontober 2025", result: "Top 100 National" },
  { title: "CascadeNet", result: "Innovation Award" },
];

function AchievementStrip({ achievement }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full flex items-center justify-between gap-3 px-3 sm:px-4 md:px-6 py-1 md:py-2 bg-black border-b border-white/5 hover:bg-white/5 transition-colors overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white/60 hover:text-white transition-colors uppercase whitespace-nowrap"
        animate={{ x: isHovered ? -20 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {achievement.title}
      </motion.span>
      <span className="bg-accent text-white text-[8px] sm:text-[9px] md:text-[10px] px-1.5 sm:px-2 md:px-3 py-0.5 md:py-1 font-bold uppercase tracking-wider flex-shrink-0">
        {achievement.result}
      </span>
    </div>
  );
}

export const Achievements = () => {
  return (
    <section id="achievements" className="w-full bg-black border-y border-white/5">
      {achievements.map((achievement, idx) => (
        <AchievementStrip key={idx} achievement={achievement} />
      ))}
    </section>
  );
};
