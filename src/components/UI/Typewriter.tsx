"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterProps {
  text: string;
  isUntyping: boolean;
  className?: string;
  delay?: number;
  speed?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  isUntyping,
  className = "",
  delay = 0,
  speed = 0.05,
}) => {
  const [displayedText, setDisplayedText] = useState(isUntyping ? "" : text);

  useEffect(() => {
    let active = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const runAnimation = async () => {
      if (delay > 0 && active) {
        await new Promise((resolve) => {
          timeoutId = setTimeout(resolve, delay * 1000);
        });
      }

      if (!active) return;

      if (isUntyping) {
        // Untyping logic: Start from current length down to 0
        const startLen = displayedText.length;
        for (let i = startLen; i >= 0; i--) {
          if (!active) break;
          await new Promise((resolve) => {
            timeoutId = setTimeout(() => {
              if (active) setDisplayedText(text.slice(0, i));
              resolve(null);
            }, speed * 1000);
          });
        }
      } else {
        // Typing logic: Start from current length up to text.length
        const startLen = displayedText.length;
        for (let i = startLen; i <= text.length; i++) {
          if (!active) break;
          await new Promise((resolve) => {
            timeoutId = setTimeout(() => {
              if (active) setDisplayedText(text.slice(0, i));
              resolve(null);
            }, speed * 1000);
          });
        }
      }
    };

    runAnimation();

    return () => {
      active = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isUntyping, text, delay, speed]);

  return (
    <span className={className}>
      {displayedText}
    </span>
  );
};
