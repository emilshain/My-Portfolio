"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, [data-cursor]";
const BASE_SIZE = 14;
const POINTER_SIZE = 40;
const MORPH_PADDING = 16;

export const CustomCursor = () => {
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);

  const targetX = useMotionValue(-100);
  const targetY = useMotionValue(-100);
  const targetWidth = useMotionValue(BASE_SIZE);
  const targetHeight = useMotionValue(BASE_SIZE);
  const targetRadius = useMotionValue(BASE_SIZE / 2);

  const mouseX = useSpring(targetX, { stiffness: 600, damping: 40, mass: 0.2 });
  const mouseY = useSpring(targetY, { stiffness: 600, damping: 40, mass: 0.2 });
  const cursorWidth = useSpring(targetWidth, { stiffness: 800, damping: 40, mass: 0.2 });
  const cursorHeight = useSpring(targetHeight, { stiffness: 800, damping: 40, mass: 0.2 });
  const cursorRadius = useSpring(targetRadius, { stiffness: 1000, damping: 50, mass: 0.1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (activeElement) {
        const rect = activeElement.getBoundingClientRect();
        const slack = 4;
        const offsetX = (e.clientX - (rect.left + rect.width / 2)) / rect.width * slack;
        const offsetY = (e.clientY - (rect.top + rect.height / 2)) / rect.height * slack;
        
        targetX.set(rect.left - MORPH_PADDING / 2 + offsetX);
        targetY.set(rect.top - MORPH_PADDING / 2 + offsetY);
        targetWidth.set(rect.width + MORPH_PADDING);
        targetHeight.set(rect.height + MORPH_PADDING);
        targetRadius.set(0);
      } else {
        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
        const isPointer = hoveredElement ? window.getComputedStyle(hoveredElement).cursor === "pointer" : false;
        const size = isPointer ? POINTER_SIZE : BASE_SIZE;

        targetX.set(e.clientX - size / 2);
        targetY.set(e.clientY - size / 2);
        targetWidth.set(size);
        targetHeight.set(size);
        targetRadius.set(size / 2);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (target) {
        setActiveElement(target);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (target && target === activeElement) {
        setActiveElement(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [activeElement, targetX, targetY, targetWidth, targetHeight, targetRadius]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[999] bg-white will-change-transform mix-blend-difference"
      style={{
        x: mouseX,
        y: mouseY,
        width: cursorWidth,
        height: cursorHeight,
        borderRadius: cursorRadius,
      }}
    />
  );
};
