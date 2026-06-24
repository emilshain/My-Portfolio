"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useMemo, useState, useRef, useEffect } from "react";

const ELogo3D = dynamic(() => import("../UI/ELogo3D").then(mod => ({ default: mod.ELogo3D })), {
  ssr: false
});

const achievements = [
  { title: "Hackathena 2026", result: "1st Place Winner" },
  { title: "Astrava 2026", result: "National Runner Up" },
  { title: "BeachHack 7", result: "2nd Place" },
  { title: "Fontober 2025", result: "Top 100 National" },
];

function AchievementStrip({
  achievement,
  direction = "left",
  rotation = 0
}: {
  achievement: { title: string; result: string };
  direction?: "left" | "right";
  rotation?: number;
}) {
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
        className="py-6 sm:py-10 md:py-16 px-4"
        animate={{ x: isHovered ? (isRtl ? 300 : -300) : 0 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut"
        }}
      >
        <span
          className="font-bold tracking-tighter text-white uppercase hover:text-black transition-colors duration-300 inline-block"
          style={{
            fontSize: "clamp(24px, 10vw, 120px)",
            fontWeight: 700
          }}
        >
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
}

export const ELogo3DSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Generate random rotations for each strip (memoized so they don't change on re-render)
  const rotations = useMemo(() => [
    (Math.random() - 0.5) * 4,  // -2 to 2 degrees
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 4,
  ], []);

  // Shared event handler for pointer tracking and strip hover detection
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if cursor is over strips (bottom area of section)
      const stripHeight = rect.height * 0.15; // Approximate strip area
      const isOverStrips = y > rect.height - stripHeight;

      // Dispatch custom event for 3D canvas to use
      section.dispatchEvent(
        new CustomEvent("mousemove3d", {
          detail: { x, y, clientX: e.clientX, clientY: e.clientY },
        })
      );

      // Handle strip hover
      if (isOverStrips) {
        const strips = section.querySelectorAll('div[class*="border-b"]');
        strips.forEach((strip) => {
          const stripRect = strip.getBoundingClientRect();
          if (
            e.clientY >= stripRect.top &&
            e.clientY <= stripRect.bottom &&
            e.clientX >= stripRect.left &&
            e.clientX <= stripRect.right
          ) {
            strip.classList.add("hovered");
          } else {
            strip.classList.remove("hovered");
          }
        });
      }
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Background achievement strips - full viewport height */}
      <div className="absolute inset-0 flex flex-col pointer-events-auto">
        <AchievementStrip
          achievement={achievements[0]}
          direction="left"
          rotation={rotations[0]}
        />
        <AchievementStrip
          achievement={achievements[1]}
          direction="right"
          rotation={rotations[1]}
        />
        <AchievementStrip
          achievement={achievements[2]}
          direction="left"
          rotation={rotations[2]}
        />
        <AchievementStrip
          achievement={achievements[3]}
          direction="right"
          rotation={rotations[3]}
        />
      </div>

      {/* 3D Model in foreground - pointer-auto allows canvas to respond to mouse */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1000px" }}>
        <div className="w-[120vw] h-[120vh] sm:w-[180vw] sm:h-[180vh] md:w-[220vw] md:h-[220vh] flex items-center justify-center pointer-events-auto">
          <ELogo3D />
        </div>
      </div>
    </section>
  );
};
