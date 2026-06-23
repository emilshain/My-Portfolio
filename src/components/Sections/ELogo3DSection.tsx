"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const ELogo3D = dynamic(() => import("../UI/ELogo3D").then(mod => ({ default: mod.ELogo3D })), {
  ssr: false
});

const achievements = [
  { title: "Hackathena 2026", result: "1st Place Winner" },
  { title: "Astrava 2026", result: "National Runner Up" },
  { title: "BeachHack 7", result: "2nd Place" },
  { title: "Fontober 2025", result: "Top 100 National" },
];

function AchievementStrip({ achievement, direction = "left", rotation = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const isRtl = direction === "right";
  const text = `${achievement.title} • ${achievement.result}`;
  const repeatedText = Array(6).fill(text).join("   •   ");

  return (
    <div
      className="flex-1 flex whitespace-nowrap overflow-hidden w-full bg-black/40 cursor-pointer transition-colors duration-300 hover:bg-white pointer-events-auto"
      style={{ transform: `rotate(${rotation}deg)` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="py-16 px-4"
        animate={{ x: isHovered ? (isRtl ? 300 : -300) : 0 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut"
        }}
      >
        <span
          className="font-bold tracking-tighter text-white uppercase hover:text-black transition-colors duration-300 inline-block"
          style={{ fontSize: "120px", fontWeight: 700 }}
        >
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
}

export const ELogo3DSection = () => {
  // Generate random rotations for each strip (memoized so they don't change on re-render)
  const rotations = useMemo(() => [
    (Math.random() - 0.5) * 4,  // -2 to 2 degrees
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 4,
  ], []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background achievement strips - full viewport height */}
      <div className="absolute inset-0 flex flex-col pointer-events-auto">
        <AchievementStrip
          achievement={achievements[0]}
          direction="left"
          duration={25}
          rotation={rotations[0]}
        />
        <AchievementStrip
          achievement={achievements[1]}
          direction="right"
          duration={30}
          rotation={rotations[1]}
        />
        <AchievementStrip
          achievement={achievements[2]}
          direction="left"
          duration={28}
          rotation={rotations[2]}
        />
        <AchievementStrip
          achievement={achievements[3]}
          direction="right"
          duration={32}
          rotation={rotations[3]}
        />
      </div>

      {/* 3D Model in foreground */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1000px" }}>
        <div className="w-[150vw] h-[150vh] flex items-center justify-center pointer-events-auto">
          <ELogo3D />
        </div>
      </div>
    </section>
  );
};
