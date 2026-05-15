"use client";

import { CustomCursor } from "@/components/UI/CustomCursor";
import { LoadingScreen } from "@/components/UI/LoadingScreen";
import { Hero } from "@/components/Sections/Hero";
import { HeroTextOnly } from "@/components/Sections/HeroTextOnly";
import { About } from "@/components/Sections/About";
import { Achievements } from "@/components/Sections/Achievements";
import { Works } from "@/components/Sections/Works";
import { Footer } from "@/components/Sections/Footer";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Typewriter } from "@/components/UI/Typewriter";
import { MaskedText } from "@/components/UI/MaskedText";
import { motion, useScroll, useTransform } from "framer-motion";



export default function Home() {
  const [isDarkText, setIsDarkText] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isHero, setIsHero] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const sectionsRef = useRef<HTMLDivElement>(null);
  
  const [viewportHeight, setViewportHeight] = useState(800);
  const { scrollY } = useScroll();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setViewportHeight(window.innerHeight);
      const handleResize = () => setViewportHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Map scroll from 0 to window height (hero view) to logo size
  // 10rem = 160px, 1.25rem = 20px (~w-[1.1em])
  const logoSize = useTransform(scrollY, [0, viewportHeight], ["10rem", "1.25rem"]);

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
          setIsHero(id === "hero");
          
          // Check if section should have dark text (white/orange background sections)
          if (id === "about" || id === "projects" || id === "hero-text") {
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

    // Live Indian Time Update
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
    const timeInterval = setInterval(updateTime, 1000);

    return () => {
      observer.disconnect();
      footerObserver.disconnect();
      clearInterval(timeInterval);
    };
  }, []);

  const backgrounds = [
    "#000000",      // Hero
    "#f74507",      // HeroTextOnly (Orange Accent)
    "#ffffff",      // About (White)
    "#000000",      // Achievements (Strip)
    "#f5f5f5",      // Works (Off-white)
    "#000000",      // Footer (Dark)
  ];

  const sections = [
    <Hero key="hero" />,
    <HeroTextOnly key="hero-text-only" />,
    <About key="about" />,
    <Achievements key="achievements" />,
    <Works key="works" />,
    <Footer key="footer" />,
  ];

  return (
    <main className="relative selection:bg-accent/30 overflow-x-clip">
      <LoadingScreen />
      <CustomCursor />

      <div
        className={`fixed top-8 left-8 z-50 flex items-center gap-2.5 transition-colors duration-500 pointer-events-none ${
          isDarkText ? "text-black" : "text-white"
        }`}
      >
        <motion.div 
          style={{ width: logoSize, height: logoSize }}
          className={`relative transition-opacity duration-500 ease-in-out ${isFooterVisible ? 'opacity-0' : 'opacity-100'}`}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </motion.div>
        <button
          type="button"
          onClick={scrollToTop}
          className="pointer-events-auto text-xl font-bold tracking-tighter text-left cursor-pointer uppercase"
          aria-label="Scroll to top"
        >
          <MaskedText 
            text="Emil Shain" 
            className="text-xl font-bold tracking-tighter"
            reveal={!isFooterVisible && !isHero}
          />
        </button>
      </div>

      {/* Location & Time - Top Right */}
      <div
        className={`fixed top-8 right-8 z-50 transition-all duration-500 pointer-events-none ${
          isDarkText ? "text-black" : "text-white"
        } ${isFooterVisible ? "opacity-0 translate-y-[-10px]" : "opacity-100 translate-y-0"}`}
      >
        <div className="text-sm font-bold tracking-tighter flex gap-3 items-center uppercase">
          <span>Kerala, IN</span>
          <span>{currentTime} IST</span>
        </div>
      </div>

      {/* Navigation - Overlay */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-center pointer-events-none">
        <div className="flex justify-center gap-8 text-sm font-medium pointer-events-auto">
          {[
            { name: "About", href: "#about" },
            { name: "Projects", href: "#projects" },
            { name: "Contact", href: "#contact" }
          ].map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={`pointer-events-auto font-bold tracking-tighter uppercase ${
                isDarkText ? "text-black" : "text-white"
              }`}
            >
              <MaskedText 
                text={item.name} 
                className="font-bold tracking-tighter uppercase"
                reveal={!isFooterVisible}
                delay={index * 0.05}
              />
            </a>
          ))}
        </div>
      </nav>








      {/* Sections */}
      <div className="relative z-10" ref={sectionsRef}>
        {sections.map((SectionComponent, idx) => (
          <div
            key={idx}
            style={{ background: backgrounds[idx] }}
            className="relative w-full"
            data-theme={backgrounds[idx] === "#ffffff" || backgrounds[idx] === "#f5f5f5" ? "light" : "dark"}
          >
            {SectionComponent}
          </div>
        ))}
      </div>
    </main>
  );
}
