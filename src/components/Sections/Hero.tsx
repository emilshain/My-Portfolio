"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { DistortedHeroBackground } from "../Effects/DistortedPixels";

const designations = [
  "Graphic Designer",
  "Identity Designer",
  "Video Editor",
  "Frontend Developer"
];

export const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % designations.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DistortedHeroBackground imagePath="/hero-background.png" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-end items-center pb-6 md:pb-10">
        <div className="text-center w-full mb-2 md:mb-4">
          <motion.div
            className="w-full px-4 overflow-clip"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[12vw] md:text-[15vw] font-bold tracking-tighter text-white leading-[0.8] text-center w-full uppercase select-none whitespace-nowrap drop-shadow-2xl">
              Emil Shain
            </h1>
          </motion.div>

          <div className="mt-3 md:mt-4 h-10 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={designations[index]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-accent font-mono text-lg md:text-xl font-bold uppercase tracking-[0.3em] block"
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
