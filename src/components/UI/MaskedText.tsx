"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MaskedTextProps {
  text: string;
  className?: string;
  reveal?: boolean;
  delay?: number;
}

export const MaskedText: React.FC<MaskedTextProps> = ({ text, className = "", reveal, delay = 0 }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const chars = containerRef.current?.querySelectorAll(".content-span");
    if (!chars || chars.length === 0) return;

    if (reveal === undefined) {
      // Automatic Scroll-Triggered Reveal (True Typewriter)
      const ctx = gsap.context(() => {
        gsap.fromTo(chars, 
          { opacity: 0, yPercent: 0 },
          { 
            opacity: 1, 
            stagger: 0.05, 
            duration: 0.01, 
            delay: delay,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 98%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true
            }
          }
        );
      }, containerRef);
      return () => ctx.revert();
    } else {
      // Manual Reveal/Hide (True Typewriter)
      if (reveal) {
        gsap.fromTo(chars, 
          { opacity: 0, yPercent: 0 },
          { 
            opacity: 1, 
            stagger: 0.05, 
            duration: 0.01, 
            delay: delay,
            overwrite: "auto"
          }
        );
      } else {
        gsap.to(Array.from(chars).reverse(), {
          opacity: 0,
          stagger: 0.04, // Slightly slower untyping for clarity
          duration: 0.01,
          overwrite: "auto"
        });
      }
    }
  }, [reveal, delay, text]);

  const handleMouseEnter = () => {
    const chars = containerRef.current?.querySelectorAll(".content-span");
    if (chars) {
      gsap.to(chars, {
        yPercent: -100,
        stagger: 0.02,
        duration: 0.5,
        ease: "expo.out",
        overwrite: "auto"
      });
    }
  };
  
  const handleMouseLeave = () => {
    const chars = containerRef.current?.querySelectorAll(".content-span");
    if (chars) {
      gsap.to(chars, {
        yPercent: 0,
        stagger: 0.02,
        duration: 0.5,
        ease: "expo.out",
        overwrite: "auto"
      });
    }
  };

  return (
    <span 
      ref={containerRef} 
      className={`inline-flex items-center relative z-10 pointer-events-auto ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text.split("").map((char, i) => (
        <span 
          key={i} 
          className="masking-span relative overflow-hidden inline-block"
        >
          <span 
            className="content-span relative block" 
            data-char={char === " " ? "\u00A0" : char}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
};
