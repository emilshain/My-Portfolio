"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { DistortedHeroBackground } from "../Effects/DistortedPixels";
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
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % designations.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;
    const titleEl = titleRef.current;

    import("splitting").then(({ default: Splitting }) => {
      // Split text into characters
      Splitting({ target: titleEl });

    // Create colored duplicate for each character
    const chars = titleEl.querySelectorAll(".char");
    chars.forEach((char) => {
      const originalChar = char.textContent;

      // Create wrapper
      const wrapper = document.createElement("span");
      wrapper.className = "char-wrapper relative inline-block overflow-hidden";
      wrapper.style.display = "inline-block";

      // Create original text
      const original = document.createElement("span");
      original.textContent = originalChar;
      original.className = "char-original";
      original.style.display = "block";

      // Create colored duplicate
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

      // Replace char with wrapper
      char.parentNode?.replaceChild(wrapper, char);

      // Set initial positions through GSAP so it owns the transform cache
      gsap.set(original, { xPercent: 0 });
      gsap.set(colored, { xPercent: -100 });

      // Add hover animation
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
    });
    });
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0">
          <DistortedHeroBackground imagePath="/hero-background.png" />
        </div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-end items-center pb-12">
        <div className="flex flex-col items-end w-fit px-4" data-speed="0.1">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              ref={titleRef}
              className="text-[12vw] sm:text-[15vw] md:text-[18vw] font-bold tracking-tighter text-white leading-[1.1] uppercase select-none whitespace-nowrap text-right"
              data-splitting
            >
              Emil Shain
            </h1>
          </motion.div>

          <div className="relative mt-[-1vw] h-[1.2em] overflow-hidden w-full">
            <AnimatePresence>
              <motion.span
                key={designations[index]}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-accent font-sub text-lg md:text-xl font-bold uppercase block text-right absolute right-0 top-0 h-full flex items-center"
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
