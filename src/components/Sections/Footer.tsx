"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, ArrowUp, ExternalLink } from "lucide-react";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/emilshain", icon: <Github className="w-5 h-5" /> },
  { name: "LinkedIn", href: "https://linkedin.com/in/emilshain", icon: <Linkedin className="w-5 h-5" /> },
  { name: "Twitter", href: "https://twitter.com/emilshain", icon: <Twitter className="w-5 h-5" /> },
  { name: "Email", href: "mailto:emilshain.official@gmail.com", icon: <Mail className="w-5 h-5" /> },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative w-full py-24 px-6 md:px-24 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              Let&apos;s build something <span className="text-accent">extraordinary</span>.
            </h2>
            <p className="text-muted max-w-md text-lg">
              Currently available for new opportunities and collaborations. Reach out if you have a project in mind.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-accent hover:border-accent transition-all duration-300"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-muted font-mono">Navigation</h4>
            <ul className="space-y-4">
              {["About", "Achievements", "Projects", "Skills"].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    {item}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-muted font-mono">Contact</h4>
            <div className="space-y-4">
              <p className="text-white/60">Thrissur, Kerala, India</p>
              <a href="mailto:emilshain.official@gmail.com" className="text-accent hover:underline block">emilshain.official@gmail.com</a>
              <p className="text-white/40 text-sm">+91 96332 85499</p>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-muted text-xs font-mono">
          © {new Date().getFullYear()} EMIL SHAIN. ALL RIGHTS RESERVED.
        </p>
        
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors"
        >
          Back to top
          <div className="p-2 rounded-full border border-white/10 group-hover:bg-white/10 transition-colors">
            <ArrowUp className="w-4 h-4" />
          </div>
        </button>
      </div>
    </footer>
  );
};
