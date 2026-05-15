"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const WORDS = ["visuals", "interfaces", "products", "identities"];

export const HeroTextOnly = () => {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.4 });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    if (isInView) {
      // Delay starting the cycle until after the primary animations (1.6s)
      timeout = setTimeout(() => {
        // Trigger first change immediately after animation finishes
        setIndex((prev) => (prev + 1) % WORDS.length);
        
        interval = setInterval(() => {
          setIndex((prev) => (prev + 1) % WORDS.length);
        }, 2000);
      }, 1600);
    }

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [isInView]);

  const currentWord = WORDS[index] || WORDS[0];

  return (
    <section id="hero-text" ref={sectionRef} className="relative min-h-screen w-full flex items-center justify-center bg-transparent px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-black uppercase leading-[0.85] text-center flex flex-col items-center">
          
          {/* Line 1: Designing */}
          <div className="overflow-hidden w-fit">
            <motion.span
              initial={{ x: "-120%", opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: "-120%", opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="block"
            >
              Designing
            </motion.span>
          </div>
 
          {/* Line 2: [Animated Word] that */}
          <div className="overflow-hidden w-fit">
            <motion.div
              initial={{ x: "120%", opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: "120%", opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="flex items-baseline gap-x-4 px-2"
            >
              <span className="relative inline-flex h-[0.85em] overflow-hidden align-baseline">
                {/* Reference span to maintain width naturally */}
                <span className="opacity-0 whitespace-nowrap">{currentWord}</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white block whitespace-nowrap absolute inset-0"
                  >
                    {currentWord}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span>that</span>
            </motion.div>
          </div>
 
          {/* Line 3: just */}
          <div className="overflow-hidden w-fit">
            <motion.span
              initial={{ x: "-120%", opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: "-120%", opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="block"
            >
              just
            </motion.span>
          </div>
 
          {/* Line 4: feel right. */}
          <div className="overflow-hidden w-fit">
            <motion.span
              initial={{ x: "120%", opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: "120%", opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="block"
            >
              feel right.
            </motion.span>
          </div>

        </h2>
      </div>
    </section>
  );
};
