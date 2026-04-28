"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input[type='button'], input[type='submit']";
const BASE_SIZE = 14;
const POINTER_SIZE = 40;
const SQUARE_RADIUS = 0;

export const CustomCursor = () => {
  const [isMorphedToElement, setIsMorphedToElement] = useState(false);
  const isMorphedRef = useRef(false);

  const targetX = useMotionValue(-100);
  const targetY = useMotionValue(-100);
  const targetWidth = useMotionValue(BASE_SIZE);
  const targetHeight = useMotionValue(BASE_SIZE);
  const targetRadius = useMotionValue(SQUARE_RADIUS);

  const mouseX = useSpring(targetX, { stiffness: 700, damping: 45, mass: 0.2 });
  const mouseY = useSpring(targetY, { stiffness: 700, damping: 45, mass: 0.2 });
  const cursorWidth = useSpring(targetWidth, { stiffness: 900, damping: 40, mass: 0.18 });
  const cursorHeight = useSpring(targetHeight, { stiffness: 900, damping: 40, mass: 0.18 });
  const cursorRadius = useSpring(targetRadius, { stiffness: 1200, damping: 45, mass: 0.12 });

  useEffect(() => {
    const updateMorphState = (next: boolean) => {
      if (isMorphedRef.current !== next) {
        isMorphedRef.current = next;
        setIsMorphedToElement(next);
      }
    };

    const updatePosition = (e: MouseEvent) => {
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const interactiveTarget = hoveredElement?.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;

      if (interactiveTarget) {
        updateMorphState(true);
        const rect = interactiveTarget.getBoundingClientRect();
        const computedRadius = Number.parseFloat(getComputedStyle(interactiveTarget).borderTopLeftRadius || "0");
        targetX.set(rect.left);
        targetY.set(rect.top);
        targetWidth.set(rect.width);
        targetHeight.set(rect.height);
        targetRadius.set(Number.isNaN(computedRadius) ? SQUARE_RADIUS : computedRadius);
        return;
      }

      updateMorphState(false);
      const isPointer = hoveredElement ? getComputedStyle(hoveredElement).cursor === "pointer" : false;
      const size = isPointer ? POINTER_SIZE : BASE_SIZE;

      targetX.set(e.clientX - size / 2);
      targetY.set(e.clientY - size / 2);
      targetWidth.set(size);
      targetHeight.set(size);
      targetRadius.set(SQUARE_RADIUS);
    };

    const resetPosition = () => {
      updateMorphState(false);
      targetX.set(-100);
      targetY.set(-100);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseout", resetPosition);
    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseout", resetPosition);
    };
  }, [targetX, targetY, targetWidth, targetHeight, targetRadius]);

  return (
    <motion.div
      className="fixed top-0 left-0 bg-white pointer-events-none z-[999] mix-blend-difference will-change-transform"
      style={{
        x: mouseX,
        y: mouseY,
        width: cursorWidth,
        height: cursorHeight,
        borderRadius: isMorphedToElement ? cursorRadius : SQUARE_RADIUS,
        mixBlendMode: isMorphedToElement ? "normal" : "difference",
      }}
    />
  );
};
