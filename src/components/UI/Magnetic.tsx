"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
}

export const Magnetic = ({ children, strength = 0.5 }: MagneticProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  useEffect(() => {
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
      
      // Calculate distance from center
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      // We only start the magnet effect if we've actually hovered the button area
      // The container has p-12, so the button is smaller than the container.
      // Button width is roughly container width - 96px (p-12 * 2 * 4? no, p-12 is 48px).
      // Let's just check if mouse is within a tighter central region
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
  }, [strength]);

  return (
    <div ref={containerRef} className="relative inline-block p-12 -m-12">
      <div ref={childRef}>
        {children}
      </div>
    </div>
  );
};
