"use client";

import { motion } from "framer-motion";

export const HeroTextOnly = () => {
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
          <span className="text-accent">things</span> that <br />
          feel right.
        </h2>
      </motion.div>
    </section>
  );
};
