"use client";

import { CustomCursor } from "@/components/UI/CustomCursor";
import { LoadingScreen } from "@/components/UI/LoadingScreen";
import { MobileNav } from "@/components/UI/MobileNav";
import { Hero } from "@/components/Sections/Hero";
import { HeroTextOnly } from "@/components/Sections/HeroTextOnly";
import { About } from "@/components/Sections/About";
import { ELogo3DSection } from "@/components/Sections/ELogo3DSection";
import { Works } from "@/components/Sections/Works";
import { Footer } from "@/components/Sections/Footer";
import { useState, useEffect, useRef, RefObject } from "react";
import Image from "next/image";
import { Typewriter } from "@/components/UI/Typewriter";
import { MaskedText } from "@/components/UI/MaskedText";
import { motion, useScroll, useTransform } from "framer-motion";

function ParallaxSection({ index, background, theme, children, pin, id }: { index: number; background: string; theme: string; children: React.ReactNode; pin?: boolean; id?: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isOdd = !isMobile && (pin ?? index % 2 === 1);
  const spacerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    if (!isOdd || !spacerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(spacerRef.current);
    return () => observer.disconnect();
  }, [isOdd]);

  useEffect(() => {
    if (!isOdd) return;
    setViewportHeight(window.innerHeight);
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);

    let resizeObserver: ResizeObserver | undefined;
    if (contentRef.current) {
      resizeObserver = new ResizeObserver(([entry]) => {
        setContentHeight(entry.target.scrollHeight);
      });
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    };
  }, [isOdd]);

  const extra = Math.max(0, contentHeight - viewportHeight);

  const { scrollYProgress } = useScroll(
    isOdd
      ? { target: spacerRef as RefObject<HTMLDivElement>, offset: ["start start", "end start"] }
      : {}
  );
  const y = useTransform(scrollYProgress, [0, 1], [0, -extra]);

  if (!isOdd) {
    return (
      <div
        id={id}
        className="parallax-section"
        style={{
          background,
          position: "relative",
          width: "100%",
          zIndex: 10
        }}
        data-theme={theme}
      >
        {children}
      </div>
    );
  }

  return (
    <>
      <div id={id} className="parallax-section" ref={spacerRef} style={{ width: "100%", height: `calc(100vh + ${extra}px)` }} />
      <div
        style={{
          background,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          zIndex: 5,
          opacity: active ? 1 : 0,
          pointerEvents: active ? "auto" : "none"
        }}
        className="overflow-hidden"
        data-theme={theme}
      >
        <motion.div ref={contentRef} style={{ y }}>
          {children}
        </motion.div>
      </div>
    </>
  );
}

export default function Home() {
  const [isDarkText, setIsDarkText] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isHero, setIsHero] = useState(true);
  const [isSecondPage, setIsSecondPage] = useState(false);
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

  const logoSize = useTransform(scrollY, [0, viewportHeight], ["10rem", "1.25rem"]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const sections = document.querySelectorAll(".parallax-section");
    
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -85% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setIsHero(id === "hero");
          setIsSecondPage(id === "hero-text");

          if (id === "hero") {
            setIsDarkText(true);
          } else if (id === "hero-text") {
            setIsDarkText(false);
          } else {
            const sectionIndex = Array.from(sections).indexOf(entry.target);
            const isOddPage = sectionIndex % 2 === 0;
            setIsDarkText(isOddPage);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      { root: null, threshold: 0.5 }
    );

    const footerNameElement = document.querySelector("#contact");
    if (footerNameElement) footerObserver.observe(footerNameElement);

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
    "#000000",
    "#f74507",
    "#ffffff",
    "#000000",
    "#f5f5f5",
    "#000000",
  ];

  const sections = [
    <Hero key="hero" />,
    <HeroTextOnly key="hero-text-only" />,
    <About key="about" />,
    <ELogo3DSection key="elogo-3d" />,
    <Works key="works" />,
    <Footer key="footer" />,
  ];

  return (
    <main className="relative selection:bg-accent/30 overflow-x-clip">
      <LoadingScreen />
      <CustomCursor />
      <MobileNav isDarkText={isDarkText} />

      {/* Top Left Logo & Title */}
      <div
        className={`fixed top-5 left-5 md:top-8 md:left-8 z-50 flex items-center gap-2.5 transition-colors duration-500 pointer-events-none ${
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
            style={{
              filter: isSecondPage ? "grayscale(100%) brightness(2)" : "none",
              transition: "filter 0.5s ease-in-out"
            }}
          />
        </motion.div>
        <button
          type="button"
          onClick={scrollToTop}
          className="pointer-events-auto text-lg sm:text-xl tracking-tighter text-left cursor-pointer uppercase"
          aria-label="Scroll to top"
        >
          <MaskedText 
            text="Emil Shain" 
            className="text-lg sm:text-xl tracking-tighter"
            reveal={!isFooterVisible && !isHero}
          />
        </button>
      </div>

      {/* Location & Time - Top Right (Desktop Only) */}
      <div
        className={`fixed top-8 right-8 z-50 transition-all duration-500 pointer-events-none hidden md:block ${
          isDarkText ? "text-black" : "text-white"
        } ${isFooterVisible ? "opacity-0 translate-y-[-10px]" : "opacity-100 translate-y-0"}`}
      >
        <div className="text-sm tracking-tighter flex gap-3 items-center uppercase">
          <span>Kerala, IN</span>
          <span>{currentTime} IST</span>
        </div>
      </div>

      {/* Desktop Navigation - Overlay */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 hidden md:flex justify-center pointer-events-none">
        <div className="flex justify-center gap-8 text-sm pointer-events-auto">
          {[
            { name: "About", href: "#about" },
            { name: "Projects", href: "#projects" },
            { name: "Contact", href: "#contact" }
          ].map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                if (item.href === '#contact') {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                } else {
                  const target = document.querySelector(item.href);
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`pointer-events-auto tracking-tighter uppercase ${
                isDarkText ? "text-black" : "text-white"
              }`}
            >
              <MaskedText 
                text={item.name} 
                className="tracking-tighter uppercase"
                reveal={!isFooterVisible}
                delay={index * 0.05}
              />
            </a>
          ))}
        </div>
      </nav>

      {/* Sections with Parallax */}
      <div className="relative z-10" ref={sectionsRef}>
        {sections.map((SectionComponent, idx) => {
          const sectionIds = ["hero", "hero-text", "about", "elogo", "projects", "contact"];
          return (
            <ParallaxSection
              key={idx}
              index={idx}
              id={sectionIds[idx]}
              background={backgrounds[idx]}
              theme={backgrounds[idx] === "#ffffff" || backgrounds[idx] === "#f5f5f5" ? "light" : "dark"}
              pin={idx === 3 ? false : undefined}
            >
              {SectionComponent}
            </ParallaxSection>
          );
        })}
      </div>
    </main>
  );
}
