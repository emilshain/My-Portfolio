"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-background.png"
          alt="Portrait background"
          fill
          priority
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center pt-32 pb-0">
        <div className="text-center space-y-4 px-6 mt-12 md:mt-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-accent font-mono text-xs uppercase tracking-[0.4em] block"
          >
            Creative Developer
          </motion.span>
          
          <motion.p
            className="max-w-lg mx-auto text-muted text-sm md:text-base leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            3× Hackathon Winner specializing in immersive frontend engineering and UI/UX design. Transforming complex ideas into production-ready digital experiences.
          </motion.p>
        </div>

        <motion.div
          className="w-full px-4 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[14vw] md:text-[18vw] font-bold tracking-tighter text-accent leading-[0.8] text-center w-full uppercase select-none whitespace-nowrap">
            Emil Shain
          </h1>

        </motion.div>
      </div>

    </section>
  );
};
