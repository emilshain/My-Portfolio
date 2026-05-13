"use client";

import { CustomCursor } from "@/components/UI/CustomCursor";
import { LoadingScreen } from "@/components/UI/LoadingScreen";
import { Hero } from "@/components/Sections/Hero";
import { HeroTextOnly } from "@/components/Sections/HeroTextOnly";
import { About } from "@/components/Sections/About";
import { Skills } from "@/components/Sections/Skills";
import { Achievements } from "@/components/Sections/Achievements";
import { Projects } from "@/components/Sections/Projects";
import { Footer } from "@/components/Sections/Footer";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Typewriter } from "@/components/UI/Typewriter";



export default function Home() {
  const [isDarkText, setIsDarkText] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section, footer");
    
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -85% 0px", // Trigger when the top of the section hits the upper part of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          // Check if section should have dark text (white background sections)
          if (id === "about" || id === "achievements") {
            setIsDarkText(true);
          } else {
            setIsDarkText(false);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    // Dedicated observer for footer name to trigger seamless navbar transition
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      { root: null, threshold: 0.5 }
    );

    const footerNameElement = document.querySelector("#contact h2");
    if (footerNameElement) footerObserver.observe(footerNameElement);

    return () => {
      observer.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  return (
    <main className="relative bg-[#050505] selection:bg-accent/30 overflow-x-clip">
      <LoadingScreen />
      <CustomCursor />

      <div
        className={`fixed top-8 left-8 z-50 flex items-center gap-2.5 transition-colors duration-500 pointer-events-none ${
          isDarkText ? "text-black" : "text-white"
        }`}
      >
        <div className={`relative w-[1.1em] h-[1.1em] transition-opacity duration-300 ${isFooterVisible ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>
        <button
          type="button"
          onClick={scrollToTop}
          className="pointer-events-auto text-xl font-bold tracking-tighter text-left cursor-pointer"
          aria-label="Scroll to top"
        >
          <Typewriter 
            text="Emil Shain" 
            isUntyping={isFooterVisible} 
            speed={0.02}
            delay={0}
          />
        </button>
      </div>

      {/* Navigation - Overlay */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-center pointer-events-none">
        <div className="flex justify-center gap-8 text-sm font-medium pointer-events-auto">
          {[
            { name: "About", href: "#about" },
            { name: "Achievements", href: "#achievements" },
            { name: "Projects", href: "#projects" },
            { name: "Skills", href: "#skills" },
            { name: "Contact", href: "#contact" }
          ].map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={`uppercase tracking-widest text-[10px] transition-colors duration-500 ease-out hover:opacity-50 ${
                isDarkText ? "text-black" : "text-white"
              }`}
            >
              <Typewriter 
                text={item.name} 
                isUntyping={isFooterVisible} 
                speed={0.02}
                delay={index * 0.05}
              />
            </a>
          ))}
        </div>
      </nav>








      {/* Sections */}
      <div className="relative z-10" ref={sectionsRef}>
        <Hero />
        <HeroTextOnly />
        <About />
        <Achievements />
        <Projects />
        <Skills />
        <Footer />
      </div>
    </main>
  );
}
