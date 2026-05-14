"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "3×", label: "Hackathon Winner" },
  { value: "5+", label: "Agencies Reached" },
  { value: "36hr", label: "Longest Build Sprint" },
];

export const About = () => {
  return (
    <section id="about" className="relative min-h-screen w-full flex items-center justify-center py-24 px-6 md:px-24">
      <div className="max-w-5xl w-full space-y-20">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
          data-speed="0.1"
        >
          <span className="text-accent font-sub text-xs uppercase block">The Story</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight">
            I build things that matter<br />
            <span className="text-accent">under pressure</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 text-muted text-lg leading-relaxed"
          >
            <p>
              I&apos;m a <span className="text-white">B.Tech CSE student</span> at Christ College of Engineering, Thrissur — but my real classroom has been the hackathon floor. From 10pm Friday to Sunday morning, shipping full-stack products with real users in mind.
            </p>
            <p>
              I sit at the intersection of design and engineering. I&apos;m as comfortable in <span className="text-white">Figma</span> as I am in a <span className="text-white">Next.js</span> codebase — and I think that&apos;s rare. Great products need someone who can hold both sides of that conversation.
            </p>
            <p>
              When I&apos;m not competing, I&apos;m building: refining my craft, learning what I don&apos;t know, and finding new ways to make interfaces feel alive.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="space-y-8"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="flex items-center gap-6 pb-8 border-b border-white/5 last:border-0 last:pb-0"
              >
                <span className="text-5xl font-bold text-accent tabular-nums">{stat.value}</span>
                <span className="text-sm uppercase text-white/50 font-sub">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
