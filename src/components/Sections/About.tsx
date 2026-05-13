"use client";

import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="relative min-h-screen w-full flex items-center justify-center py-24 px-6 md:px-24 bg-white">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <span className="text-accent font-mono text-xs uppercase tracking-widest block">About Me</span>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-black uppercase leading-[0.85]">
            Passion <br /> & Code.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="space-y-8 text-black/70 text-lg leading-relaxed md:pt-12"
        >
          <div className="space-y-6">
            <p>
              I am a Frontend Developer and a <span className="text-black font-semibold">B.Tech CSE Student</span> at Christ College of Engineering. Driven by the synergy of aesthetics and high-performance code, I specialize in bridging the gap between design and engineering.
            </p>
            <p>
              As a <span className="text-black font-semibold">3× Hackathon Winner</span>, I have a proven track record of delivering end-to-end solutions — from initial Figma wireframes to full-scale production.
            </p>
          </div>

          <div className="pt-8 grid grid-cols-2 gap-8 border-t border-black/10">
            <div>
              <p className="text-black font-bold text-4xl">3×</p>
              <p className="text-xs uppercase tracking-widest text-accent mt-1">Hackathon Winner</p>
            </div>
            <div>
              <p className="text-black font-bold text-4xl">CSE</p>
              <p className="text-xs uppercase tracking-widest text-black/40 mt-1">B.Tech Student</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
