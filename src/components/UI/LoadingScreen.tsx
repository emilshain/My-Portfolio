"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-[var(--background)]"
          initial={{ y: "0%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.25, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            className="text-xl font-bold tracking-tighter"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3, ease: "easeOut" }}
          >
            Emil Shain
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
