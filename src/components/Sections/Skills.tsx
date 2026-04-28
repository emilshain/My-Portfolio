"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Globe, Cpu, Layers, Zap } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: <Palette className="w-6 h-6 text-accent" />,
    skills: ["React.js", "Next.js", "TypeScript", "GSAP", "Tailwind CSS", "Responsive Design"],
  },
  {
    title: "Design",
    icon: <Code2 className="w-6 h-6 text-accent" />,
    skills: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Motion Design", "Prototyping"],
  },
  {
    title: "Engineering",
    icon: <Cpu className="w-6 h-6 text-accent" />,
    skills: ["Python", "C", "FastAPI", "Git / GitHub", "UI/UX Architecture"],
  },
  {
    title: "Project Focus",
    icon: <Globe className="w-6 h-6 text-accent" />,
    skills: ["End-to-End Execution", "Rapid Prototyping", "Data Visualization", "ML Integration"],
  },
];


export const Skills = () => {
  return (
    <section id="skills" className="relative min-h-screen w-full py-24 px-6 md:px-24 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">Capabilities</h2>
          <p className="text-muted max-w-2xl mx-auto">
            A comprehensive toolkit designed for building modern, high-performance web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors group"
            >
              <div className="mb-6 p-3 rounded-2xl bg-black/40 w-fit group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-muted text-sm flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-accent" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
