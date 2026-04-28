"use client";

import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="relative min-h-screen w-full flex items-center justify-center py-24 px-6 md:px-24">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            Driven by <span className="text-accent">Curiosity</span> and Code.
          </h2>
          <div className="h-1 w-24 bg-accent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="space-y-6 text-muted text-lg leading-relaxed"
        >
          <p>
            I am a Frontend Developer and a <span className="text-white">B.Tech CSE Student</span> at Christ College of Engineering. Driven by the synergy of aesthetics and high-performance code, I specialize in bridging the gap between design and engineering to build interfaces that are as functional as they are beautiful.
          </p>
          <p>
            As a <span className="text-white">3× Hackathon Winner</span>, I have a proven track record of delivering end-to-end solutions — from initial Figma wireframes to full-scale React/Next.js production — under tight deadlines.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-white font-bold text-2xl">3×</p>
              <p className="text-xs uppercase tracking-widest text-accent">Hackathon Winner</p>
            </div>
            <div>
              <p className="text-white font-bold text-2xl">CSE</p>
              <p className="text-xs uppercase tracking-widest">B.Tech Student</p>
            </div>
          </div>


        </motion.div>


      </div>
    </section>
  );
};
