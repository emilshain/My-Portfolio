"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Layers, ShieldCheck, Zap } from "lucide-react";

const projects = [
  {
    title: "CascadeNet",
    subtitle: "AI-Driven Flood Prediction",
    description: "Built a multi-stakeholder disaster coordination dashboard serving 5 government agencies. Featured interactive cascade visualization of real-time infrastructure failure propagation.",
    tech: ["React", "TypeScript", "GSAP", "Tailwind CSS", "FastAPI"],
    awards: ["1st Place — Hackathena 2026", "National Level"],
    icon: <Layers className="w-8 h-8 text-accent" />
  },
  {
    title: "Sentinel AI",
    subtitle: "ML Security Framework",
    description: "Monitoring dashboard visualizing behavioral divergence scores and trigger injection results for backdoor detection in pre-trained models. Interactive pipeline visualization for security analysts.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PyTorch", "Figma"],
    awards: ["2nd Place — BeachHack 7"],
    icon: <ShieldCheck className="w-8 h-8 text-accent" />
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="relative min-h-screen w-full py-24 px-6 md:px-24 flex flex-col justify-center overflow-hidden bg-[#050505]">
      <div className="max-w-6xl mx-auto w-full space-y-16">
        <div className="space-y-4">
          <span className="text-accent font-mono text-xs uppercase tracking-widest">Selected Works</span>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">Innovation Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all flex flex-col gap-6"
            >
              <div className="flex justify-between items-start">
                <div className="p-4 rounded-2xl bg-black/40 group-hover:scale-110 transition-transform">
                  {project.icon}
                </div>
                <div className="flex gap-2">
                  <a href="#" className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                    <Github className="w-4 h-4 text-white/60" />
                  </a>
                  <a href="#" className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                    <ExternalLink className="w-4 h-4 text-white/60" />
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  {project.title}
                </h3>
                <p className="text-accent font-mono text-xs uppercase tracking-tighter">{project.subtitle}</p>
                <p className="text-muted text-sm leading-relaxed mt-4">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-white/40 uppercase tracking-widest">
                    {t}
                  </span>
                ))}
              </div>

              {project.awards && (
                <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-accent" />
                  <span className="text-[10px] text-white/60 uppercase font-bold tracking-widest">{project.awards[0]}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
