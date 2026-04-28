"use client";

import { CustomCursor } from "@/components/UI/CustomCursor";
import { LoadingScreen } from "@/components/UI/LoadingScreen";
import { Hero } from "@/components/Sections/Hero";
import { About } from "@/components/Sections/About";
import { Skills } from "@/components/Sections/Skills";
import { Achievements } from "@/components/Sections/Achievements";
import { Projects } from "@/components/Sections/Projects";
import { Footer } from "@/components/Sections/Footer";


export default function Home() {
  return (
    <main className="relative bg-[#050505] overflow-x-hidden selection:bg-accent/30">
      <LoadingScreen />
      <CustomCursor />

      {/* Persistent Name Branding */}
      <h1
        className="fixed top-8 left-8 z-50 text-xl font-bold tracking-tighter text-white mix-blend-difference pointer-events-none"
      >
        Emil Shain
      </h1>

      {/* Navigation - Overlay */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-center pointer-events-none">
        <div className="flex justify-center gap-0 text-sm font-medium pointer-events-auto">
          {[
            { name: "About", href: "#about" },
            { name: "Work", href: "#projects" },
            { name: "Skills", href: "#skills" },
            { name: "Achievements", href: "#achievements" },
            { name: "Contact", href: "#contact" }
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="px-5 py-2.5 rounded-full uppercase tracking-widest text-[10px] text-white/70 hover:text-white bg-white/5 backdrop-blur-2xl hover:bg-white/15 transition-all duration-500 ease-out"
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>








      {/* Sections */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Footer />
      </div>
    </main>
  );
}
