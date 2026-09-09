"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { DistortedHeroBackground, ProceduralGrainCanvas, useIsMobile } from "../Effects/DistortedPixels";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

      <div className="relative z-10 w-full h-full flex flex-col justify-end items-end px-6 sm:px-10 pb-4 sm:pb-6">
        <div className="flex flex-col items-end w-fit" data-speed="0.1">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-[11vw] sm:text-[12vw] md:text-[13vw] tracking-tighter text-white leading-[0.8] uppercase select-none text-right"
            >
              <span className="block">Emil</span>
              <span className="block">Shain</span>
            </h1>
          </motion.div>

        </div>
      </div>

      <div className="absolute left-6 sm:left-10 bottom-4 sm:bottom-6 z-10" data-speed="0.1">
        <div className="relative w-[14rem] sm:w-[18rem] h-[1.2em] overflow-hidden">
          <AnimatePresence>
            <motion.span
              key={designations[index]}
              initial={isNonInteractiveHandset ? {} : { y: "100%" }}
              animate={isNonInteractiveHandset ? {} : { y: 0 }}
              exit={isNonInteractiveHandset ? {} : { y: "-100%" }}
              transition={isNonInteractiveHandset ? undefined : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-white font-sub text-lg sm:text-xl md:text-2xl uppercase block absolute left-0 top-0 h-full flex items-center"
            >
              {designations[index]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
