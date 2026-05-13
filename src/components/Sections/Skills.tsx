"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Globe, Cpu, Layers, Zap } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: <Palette className="w-6 h-6" />,
    skills: ["React.js", "Next.js", "TypeScript", "GSAP", "Tailwind CSS", "Responsive Design"],
  },
  {
    title: "Design",
    icon: <Code2 className="w-6 h-6" />,
    skills: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Motion Design", "Prototyping"],
  },
  {
    title: "Engineering",
    icon: <Cpu className="w-6 h-6" />,
    skills: ["Python", "C", "FastAPI", "Git / GitHub", "UI/UX Architecture"],
  },
  {
    title: "Project Focus",
    icon: <Globe className="w-6 h-6" />,
    skills: ["End-to-End Execution", "Rapid Prototyping", "Data Visualization", "ML Integration"],
  },
];


export const Skills = () => {
  return (
    <section id="skills" className="relative min-h-screen w-full py-32 px-6 md:px-24 flex flex-col justify-center bg-accent">
      <div className="max-w-6xl mx-auto w-full space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">Capabilities</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
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
              className="p-8 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all group"
            >
              <div className="mb-6 p-3 rounded-2xl bg-black/20 w-fit group-hover:scale-110 transition-transform">
                <div className="text-white">
                  {category.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-white/60 text-sm flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-white" />
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
