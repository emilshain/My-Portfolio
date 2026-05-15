"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { Typewriter } from "@/components/UI/Typewriter";
import { MaskedText } from "@/components/UI/MaskedText";
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
  const isInView = useInView(footerRef, { once: false, amount: 0.1 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative flex h-screen w-full flex-col justify-between px-6 pt-0 pb-0 md:px-16 overflow-hidden"
    >
      {/* Top Section */}
      <div className="flex w-full flex-col lg:flex-row justify-between items-start mt-8 relative z-10 flex-grow">
        
        {/* Left: Contact */}
        <div className="flex flex-col mb-16 lg:mb-0 lg:w-1/3">
          <div className="text-white/40 text-sm mb-6 h-5">
            <MaskedText text="Contact" delay={0.05} className="text-white/40 text-sm" />
          </div>
          <a href="mailto:emilshain.official@gmail.com" className="text-3xl md:text-5xl lg:text-4xl xl:text-5xl font-medium tracking-tight hover:text-accent transition-colors duration-300">
            <MaskedText text="emilshain.official@gmail.com" className="inline-flex" delay={0.1} />
          </a>
          <a href="tel:+919633285499" className="text-3xl md:text-5xl lg:text-4xl xl:text-5xl font-medium tracking-tight mt-4 hover:text-accent transition-colors duration-300">
            <MaskedText text="+91 96332 85499" className="inline-flex" delay={0.2} />
          </a>
        </div>

        {/* Center: Graphic */}
        <div className="hidden lg:flex absolute left-1/2 top-10 -translate-x-1/2 items-center justify-center pointer-events-auto">
          <div className="w-24 h-24 relative logo-spin">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right: Links */}
        <div className="flex gap-16 md:gap-24 lg:w-1/3 lg:justify-end">
          {/* Pages */}
          <div className="flex flex-col">
            <div className="text-white/40 text-sm mb-6 h-5">
              <MaskedText text="Pages" reveal={isInView} delay={0.1} className="text-white/40 text-sm" />
            </div>
            <div className="flex flex-col gap-3">
              {['About', 'Projects', 'Contact'].map((item, index) => (
                <a 
                  href={`#${item.toLowerCase()}`} 
                  key={item} 
                  className="text-lg text-white/80"
                >
                  <MaskedText 
                    text={item} 
                    className="text-lg text-white/80 hover:text-white"
                    reveal={isInView}
                    delay={0.2 + index * 0.05}
                  />
                </a>
              ))}
            </div>
          </div>
          
          {/* Socials */}
          <div className="flex flex-col">
            <span className="text-white/40 text-sm mb-6">Socials</span>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link, index) => (
                <a 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  key={link.name} 
                  className="text-lg text-white/80"
                >
                  <MaskedText 
                    text={link.name} 
                    className="text-lg text-white/80 hover:text-white"
                    delay={index * 0.05}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col w-full mt-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center w-full py-4 border-t border-white/10">
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
        <div className="relative w-screen left-1/2 -translate-x-1/2 px-0 pt-0 pb-0 overflow-visible" ref={nameRef}>
          <h2 
            className="text-[18vw] font-bold leading-none tracking-tighter text-white text-center select-none whitespace-nowrap uppercase w-full"
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
