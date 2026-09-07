"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface MobileNavProps {
  isDarkText?: boolean;
}

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/emilshain" },
  { name: "LinkedIn", href: "https://linkedin.com/in/emilshain" },
  { name: "Behance", href: "https://www.behance.net/emilshain" },
  { name: "X", href: "https://x.com/emilshain" },
];

export const MobileNav = ({ isDarkText = false }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      if (href === "#contact") {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      } else {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 300);
  };

  return (
    <div className="md:hidden">
      {/* Floating Hamburger Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        className={`fixed top-5 right-5 sm:top-6 sm:right-6 z-[60] p-3 rounded-full backdrop-blur-md transition-colors duration-300 pointer-events-auto cursor-pointer ${
          isOpen
            ? "bg-white text-black shadow-lg"
            : isDarkText
            ? "bg-black/10 text-black border border-black/10"
            : "bg-white/10 text-white border border-white/10"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Full Page Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#050505] text-white flex flex-col justify-between p-6 sm:p-8 pt-20 overflow-y-auto"
          >
            {/* Header info inside menu */}
            <div className="flex justify-between items-center pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <span className="tracking-tighter text-lg uppercase">Emil Shain</span>
              </div>
              <div className="text-xs font-mono text-white/50 uppercase">
                Kerala, IN • {currentTime}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-6 my-auto py-8">
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                Navigation
              </span>
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                >
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.href)}
                    className="text-4xl sm:text-5xl tracking-tighter uppercase text-left hover:text-accent transition-colors flex items-center justify-between w-full group cursor-pointer"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Footer / Contact Details inside Mobile Menu */}
            <div className="flex flex-col gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-2">
                  Direct Contact
                </span>
                <a
                  href="mailto:emilshain.official@gmail.com"
                  className="text-sm hover:text-accent transition-colors block text-white/90"
                >
                  emilshain.official@gmail.com
                </a>
                <a
                  href="tel:+919633285499"
                  className="text-sm hover:text-accent transition-colors block text-white/70 mt-1"
                >
                  +91 96332 85499
                </a>
              </div>

              <div>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-2">
                  Socials
                </span>
                <div className="flex flex-wrap gap-4 text-xs uppercase tracking-wider">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
