"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
}

export const Magnetic = ({ children, strength = 0.5 }: MagneticProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const checkHover = () => {
      setCanHover(window.innerWidth >= 768 || window.matchMedia("(hover: hover)").matches);
    };
    checkHover();
    window.addEventListener("resize", checkHover);
    return () => window.removeEventListener("resize", checkHover);
  }, []);

  useEffect(() => {
    if (!canHover) return;

    const container = containerRef.current;
    const child = childRef.current;
    if (!container || !child) return;

    const xTo = gsap.quickTo(child, "x", {
      duration: 0.8,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(child, "y", {
      duration: 0.8,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = container.getBoundingClientRect();
      
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      const buttonWidth = width - 96;
      const buttonHeight = height - 96;
      
      if (!isHovered.current) {
        if (Math.abs(x) < buttonWidth / 2 && Math.abs(y) < buttonHeight / 2) {
          isHovered.current = true;
        }
      }

      if (isHovered.current) {
        xTo(x * strength);
        yTo(y * strength);
      }
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
      xTo(0);
      yTo(0);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, canHover]);

  if (!canHover) {
    return children;
  }

  return (
    <div ref={containerRef} className="relative inline-block p-12 -m-12">
      <div ref={childRef}>
        {children}
      </div>
    </div>
  );
};
