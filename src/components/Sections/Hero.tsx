"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense, useRef } from "react";
import { DistortedHeroBackground } from "../Effects/DistortedPixels";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const designations = [
  "Graphic Designer",
  "Identity Designer",
  "Video Editor",
  "Frontend Developer"
];

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % designations.length);
    }, 3000);

    const ctx = gsap.context(() => {
      // Any other Hero-specific GSAP logic can go here
    }, heroRef);

    return () => {
      clearInterval(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0">
          <DistortedHeroBackground imagePath="/hero-background.png" />
        </div>
      </div>

      <div ref={contentRef} className="relative z-10 w-full h-full flex flex-col justify-end items-center pb-12">
        <div className="flex flex-col items-end w-fit px-4" data-speed="0.1">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[18vw] font-bold tracking-tighter text-white leading-[1.1] uppercase select-none whitespace-nowrap drop-shadow-2xl text-right flex justify-end">
              {"Emil Shain".split("").map((char, i) => (
                <motion.span
                  key={i}
                  whileHover="hover"
                  initial="initial"
                  className="relative inline-grid grid-cols-1 grid-rows-1 overflow-visible"
                  style={{ clipPath: 'inset(0)' }}
                >
                  <motion.span
                    variants={{
                      initial: { x: 0 },
                      hover: { x: "100%" }
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative col-start-1 row-start-1"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                  <motion.span
                    variants={{
                      initial: { x: "-100%" },
                      hover: { x: 0 }
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 text-accent col-start-1 row-start-1 flex items-center justify-center whitespace-nowrap"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <div className="relative mt-[-1vw] h-[1.2em] overflow-hidden w-full">
            <AnimatePresence>
              <motion.span
                key={designations[index]}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-accent font-sub text-lg md:text-xl font-bold uppercase block text-right absolute right-0 top-0 h-full flex items-center"
              >
                {designations[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
