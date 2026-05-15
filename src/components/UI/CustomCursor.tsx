"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, [data-cursor]";
const BASE_SIZE = 12;
const POINTER_SIZE = 24; // Smaller pointer size

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springOptions);
  const cursorY = useSpring(mouseY, springOptions);
  
  const size = useSpring(BASE_SIZE, springOptions);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(INTERACTIVE_SELECTOR);
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    size.set(isHovered ? POINTER_SIZE : BASE_SIZE);
  }, [isHovered, size]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[999] bg-white will-change-transform mix-blend-difference rounded-full"
      style={{
        x: cursorX,
        y: cursorY,
        width: size,
        height: size,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
};
