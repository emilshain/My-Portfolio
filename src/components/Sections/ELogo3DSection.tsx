"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ELogo3D = dynamic(() => import("../UI/ELogo3D").then(mod => ({ default: mod.ELogo3D })), {
  ssr: false
});

const achievements = [
  { title: "Hackathena 2026", result: "1st Place Winner", tags: ["1st Place", "National"] },
  { title: "Astrava 2026", result: "National Runner Up", tags: ["2nd Runner Up", "National"] },
  { title: "BeachHack 7", result: "2nd Place", tags: ["2nd Place", "HACK4CHRIST"] },
  { title: "Fontober 2025", result: "Top 100 National", tags: ["Top 100", "Designare"] },
];

export const ELogo3DSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const lines = lineRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!section || !container || lines.length === 0) return;

    const getLineMaxScroll = (line: HTMLSpanElement) => Math.max(0, line.scrollWidth - window.innerWidth);
    const getOverallMaxScroll = () => Math.max(...lines.map(getLineMaxScroll));

    // Each line travels its own distance but all reach the end together
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "elogo3d-pin",
        trigger: section,
        start: "top top",
        end: () => "+=" + getOverallMaxScroll(),
        scrub: true,
        pin: true,
        pinType: "transform",
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    lines.forEach((line) => {
      tl.to(line, { x: () => -getLineMaxScroll(line), ease: "none" }, 0);
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      section.dispatchEvent(
        new CustomEvent("mousemove3d", {
          detail: { x, y, clientX: e.clientX, clientY: e.clientY },
        })
      );
    };

    section.addEventListener("mousemove", handleMouseMove);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Pinned horizontal scroll lines, each at its own speed */}
      <div ref={containerRef} className="h-full flex flex-col justify-center">
        {achievements.map((a, i) => (
          <span
            key={i}
            ref={(el) => { lineRefs.current[i] = el; }}
            className="text-[10vw] sm:text-[12vw] md:text-[14vw] font-bold tracking-tighter text-white leading-[0.9] uppercase whitespace-nowrap"
            style={{ willChange: "transform" }}
          >
            {a.title}
            {a.tags && a.tags.length > 0 ? ` • ${a.tags.join(" • ")}` : ""}
          </span>
        ))}
      </div>

      {/* 3D Model in foreground */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1000px" }}>
        <div className="w-[80vw] h-[80vh] sm:w-[100vw] sm:h-[100vh] md:w-[120vw] md:h-[120vh] flex items-center justify-center pointer-events-auto">
          <ELogo3D />
        </div>
      </div>
    </section>
  );
};
