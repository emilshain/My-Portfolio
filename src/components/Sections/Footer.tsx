"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { Typewriter } from "@/components/UI/Typewriter";
import { useInView } from "framer-motion";
import { useRef } from "react";


const socialLinks = [
  { name: "GitHub", href: "https://github.com/emilshain" },
  { name: "LinkedIn", href: "https://linkedin.com/in/emilshain" },
  { name: "Behance", href: "https://www.behance.net/emilshain" },
  { name: "X", href: "https://x.com/emilshain" },
];

export const Footer = () => {
  const footerRef = useRef(null);
  const nameRef = useRef(null);
  const isInView = useInView(nameRef, { once: false, amount: 0.5 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative flex min-h-screen w-full flex-col justify-between bg-[#050505] px-6 pt-24 pb-0 md:px-16"
    >
      {/* Top Section */}
      <div className="flex w-full flex-col lg:flex-row justify-between items-start mt-12 relative z-10 flex-grow">
        
        {/* Left: Contact */}
        <div className="flex flex-col mb-16 lg:mb-0 lg:w-1/3">
          <span className="text-white/40 text-sm mb-6 tracking-wide">Contact</span>
          <a href="mailto:emilshain.official@gmail.com" className="text-3xl md:text-5xl lg:text-4xl xl:text-5xl font-medium tracking-tight hover:text-accent transition-colors duration-300">
            emilshain.official@gmail.com
          </a>
          <a href="tel:+919633285499" className="text-3xl md:text-5xl lg:text-4xl xl:text-5xl font-medium tracking-tight mt-4 hover:text-accent transition-colors duration-300">
            +91 96332 85499
          </a>
        </div>

        {/* Center: Graphic */}
        <div className="hidden lg:flex absolute left-1/2 top-10 -translate-x-1/2 items-center justify-center pointer-events-none">
          <motion.div 
            className="w-24 h-24 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>

        {/* Right: Links */}
        <div className="flex gap-16 md:gap-24 lg:w-1/3 lg:justify-end">
          {/* Pages */}
          <div className="flex flex-col">
            <span className="text-white/40 text-sm mb-6 tracking-wide">Pages</span>
            <div className="flex flex-col gap-3">
              {['Home', 'About', 'Skills', 'Achievements'].map((item, index) => (
                <a 
                  href={`#${item.toLowerCase()}`} 
                  key={item} 
                  className="text-lg text-white/80 hover:text-white hover:underline underline-offset-4 decoration-accent transition-all"
                >
                  <Typewriter 
                    text={item} 
                    isUntyping={!isInView} 
                    speed={0.02} 
                    delay={index * 0.05} 
                  />
                </a>
              ))}
            </div>
          </div>
          
          {/* Socials */}
          <div className="flex flex-col">
            <span className="text-white/40 text-sm mb-6 tracking-wide">Socials</span>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  key={link.name} 
                  className="text-lg text-white/80 hover:text-white hover:underline underline-offset-4 decoration-accent transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col w-full mt-auto relative z-10 pt-16">
        <div className="flex flex-col md:flex-row justify-between items-center w-full py-6 border-t border-white/10">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Emil Shain
          </p>
          <button 
            onClick={scrollToTop} 
            className="mt-4 md:mt-0 bg-white/5 hover:bg-white/10 px-6 py-2 rounded-full text-sm text-white/80 transition-colors border border-white/10 flex items-center gap-2"
          >
            Back to top <ArrowUp className="w-4 h-4" />
          </button>
        </div>
        
        {/* Huge Name */}
        <div className="w-full mt-8 -mx-6 md:-mx-16 px-0 overflow-clip" ref={nameRef}>
          <h2 
            data-cursor="morph"
            className="text-[14vw] md:text-[16vw] font-bold leading-[0.9] tracking-tighter text-white text-center select-none whitespace-nowrap uppercase w-full"
          >
            <Typewriter 
              text="Emil Shain" 
              isUntyping={!isInView} 
              speed={0.02} 
              delay={0}
            />
          </h2>
        </div>
      </div>
    </footer>
  );
};
