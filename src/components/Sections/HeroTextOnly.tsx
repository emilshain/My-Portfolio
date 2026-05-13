"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const WORDS = ["visuals", "interfaces", "products", "identities"];

export const HeroTextOnly = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const currentWord = WORDS[index] || WORDS[0];

  return (
    <section id="hero-text" className="relative h-screen w-full flex items-center justify-center bg-transparent px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto flex flex-col items-center text-center"
      >
        <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white uppercase leading-[0.85] text-center">
          Designing <br />
          <span className="inline-flex flex-wrap justify-center items-baseline gap-x-4">
            <span className="relative inline-flex h-[0.85em] overflow-hidden align-baseline">
              {/* Reference span to maintain width naturally */}
              <span className="opacity-0 whitespace-nowrap">{currentWord}</span>
              <AnimatePresence>
                <motion.span
                  key={currentWord}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-accent block whitespace-nowrap absolute inset-0"
                >
                  {currentWord}
                </motion.span>
              </AnimatePresence>
            </span>
            <span>that</span>
          </span>
          <br />
          just <br />feel right.
        </h2>
      </motion.div>
    </section>
  );
};
