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



export default function Home() {
  const [isDarkText, setIsDarkText] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);

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

    return () => observer.disconnect();
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
        <div className="relative w-6 h-6">
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-xl font-bold tracking-tighter">
          Emil Shain
        </h1>
      </div>

      {/* Navigation - Overlay */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-center pointer-events-none">
        <div className="flex justify-center gap-8 text-sm font-medium pointer-events-auto">
          {[
            { name: "About", href: "#about" },
            { name: "Skills", href: "#skills" },
            { name: "Achievements", href: "#achievements" },
            { name: "Contact", href: "#contact" }
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`uppercase tracking-widest text-[10px] transition-colors duration-500 ease-out hover:opacity-50 ${
                isDarkText ? "text-black" : "text-white"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>








      {/* Sections */}
      <div className="relative z-10" ref={sectionsRef}>
        <Hero />
        <HeroTextOnly />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Footer />
      </div>
    </main>
  );
}
