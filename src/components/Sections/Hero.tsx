"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { DistortedHeroBackground, ProceduralGrainCanvas, useIsMobile } from "../Effects/DistortedPixels";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "splitting/dist/splitting.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const designations = [
  "Graphic Designer",
  "Identity Designer",
  "Video Editor",
  "Frontend Developer"
];

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoProgressRef = useRef(0);
  const isMobile = useIsMobile();
  const isMobileMarkup = isMobile;
  const isNonInteractiveHandset = isMobile;

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % designations.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Scrub the hero video playback according to scroll position on desktop only (no
  // interactive distortion effect on mobile).
  useEffect(() => {
    if (!isNonInteractiveHandset && !heroRef.current || typeof window === "undefined") return;

    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        videoProgressRef.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isNonInteractiveHandset]);

  useEffect(() => {
    if (!isDesktop || !titleRef.current) return;
    const titleEl = titleRef.current;

    import("splitting").then(({ default: Splitting }) => {
      // Split text into characters
      Splitting({ target: titleEl });

      // Create colored duplicate for each character (skip on mobile — no hover-driven swap).
      const chars = titleEl.querySelectorAll(".char");
      chars.forEach((char, charIdx) => {
        const originalChar = char.textContent;

        if (isNonInteractiveHandset) {
          // Mobile: keep the title plain — no colored overlay, no split.
          return;
        }
        const wrapper = document.createElement("span");
        wrapper.className = "char-wrapper relative inline-block overflow-hidden leading-[1.2]";
        wrapper.style.display = "inline-block";

        const original = document.createElement("span");
        original.textContent = originalChar;
        original.className = "char-original";
        original.style.display = "block";

        const colored = document.createElement("span");
        colored.textContent = originalChar;
        colored.className = "char-colored";
        colored.style.display = "block";
        colored.style.color = "#f74507";
        colored.style.position = "absolute";
        colored.style.left = "0";
        colored.style.top = "0";

        wrapper.appendChild(original);
        wrapper.appendChild(colored);

        char.parentNode?.replaceChild(wrapper, char);

        gsap.set(original, { xPercent: 0 });
        gsap.set(colored, { xPercent: -100 });

        wrapper.addEventListener("mouseenter", () => {
          gsap.to(original, {
            xPercent: 100,
            duration: 0.4,
            ease: "power2.inOut"
          });
          gsap.to(colored, {
            xPercent: 0,
            duration: 0.4,
            ease: "power2.inOut"
          });
        });

        wrapper.addEventListener("mouseleave", () => {
          gsap.to(original, {
            xPercent: 0,
            duration: 0.4,
            ease: "power2.inOut"
          });
          gsap.to(colored, {
            xPercent: -100,
            duration: 0.4,
            ease: "power2.inOut"
          });
        });
        
        // On mobile, keep the title readable without the colored overlay swap.
        if (isNonInteractiveHandset) {
          const coloredClone = colored.cloneNode(true);
          wrapper.appendChild(coloredClone);
          (coloredClone as HTMLSpanElement).style.color = "inherit";
        }
      });
    });
  }, [isDesktop]);

  return (
    <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0">
          {isDesktop ? (
            <DistortedHeroBackground imagePath="/hero-videobg.mp4" progressRef={videoProgressRef} />
          ) : (
            <div className="relative w-full h-full">
              <video
                src="/hero-videobg.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-[0.85]"
              />
              <ProceduralGrainCanvas />
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-end items-center pb-12 sm:pb-16">
        <div className="flex flex-col items-end w-fit px-4" data-speed="0.1">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              ref={titleRef}
              className="text-[13vw] sm:text-[15vw] md:text-[18vw] tracking-tighter text-white leading-[1.1] uppercase select-none whitespace-nowrap text-right"
              data-splitting={isDesktop ? "" : undefined}
            >
              Emil Shain
            </h1>
          </motion.div>

          <div className="relative mt-[-1vw] h-[1.2em] overflow-hidden w-full">
            <AnimatePresence>
              <motion.span
                key={designations[index]}
                initial={isNonInteractiveHandset ? {} : { y: "100%" }}
                animate={isNonInteractiveHandset ? {} : { y: 0 }}
                exit={isNonInteractiveHandset ? {} : { y: "-100%" }}
                transition={isNonInteractiveHandset ? undefined : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-accent font-sub text-base sm:text-lg md:text-xl uppercase block text-right absolute right-0 top-0 h-full flex items-center"
              >
                {designations[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
