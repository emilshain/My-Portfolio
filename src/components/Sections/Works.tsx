"use client";

import { motion } from "framer-motion";
import { MaskedText } from "@/components/UI/MaskedText";
import { Magnetic } from "@/components/UI/Magnetic";

import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";

// Natural aspect ratio (width / height) of an image, measured once it loads
const useImageAspect = (src: string): number | null => {
  const [aspect, setAspect] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled && img.naturalWidth && img.naturalHeight) {
        setAspect(img.naturalWidth / img.naturalHeight);
      }
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return aspect;
};

// Width of the row container, kept in sync on resize so heights can be computed from it
const useElementWidth = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(el.getBoundingClientRect().width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
};

// One category row. On desktop every work shares a row height derived from the
// works' real aspect ratios so the row fits the available width exactly (no
// hardcoded viewport height). On mobile the works stack naturally at full width.
const WorkRow = ({ paths, limit, fallbackHeight }: { paths: string[]; limit: number; fallbackHeight: string }) => {
  const images = paths.slice(0, limit);
  const { ref, width } = useElementWidth();
  const aspects = images.map((path) => useImageAspect(path));

  const GAP = 16; // matches gap-4
  const totalGap = Math.max(0, images.length - 1) * GAP;
  const knownAspects = aspects.filter((a): a is number => a !== null);
  const sumAspects = knownAspects.length > 0 ? knownAspects.reduce((sum, a) => sum + a, 0) : images.length * 1.5;
  const rowHeight = width > 0 && sumAspects > 0 ? Math.max(1, (width - totalGap) / sumAspects) : null;

  // Disable the framer-motion entrance and the sliding strip overlay on mobile so the
  // works section has no interactive or animated effects and renders the same everywhere.
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row gap-4 justify-center h-auto md:h-[var(--row-height)]"
      style={{ "--row-height": rowHeight ? `${rowHeight}px` : fallbackHeight } as CSSProperties}
    >
      {images.map((imagePath, idx) => (
        <motion.div
          key={imagePath}
          initial={isMobile ? {} : { opacity: 0, scale: 0.95 }}
          animate={isMobile ? {} : { opacity: 1, scale: 1 }}
          transition={isMobile ? undefined : { duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="group cursor-pointer relative h-full w-full md:w-auto md:flex-none"
        >
          <div className="bg-zinc-900/5 h-full relative overflow-hidden">
            <img
              src={imagePath}
              alt="Work"
              className="w-full h-auto md:h-full md:w-auto block transition-all duration-700"
            />

            {/* Sliding Strip Overlay - Hidden on mobile view */}
            <div className="hidden md:flex absolute bottom-0 left-0 w-full bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1] z-20 py-4 px-6 justify-between items-center">
              <span className="text-white text-[10px] uppercase tracking-widest">
                View Case Study
              </span>
              <span className="text-white/50 text-[10px] uppercase tracking-widest">
                ↗
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const Works = () => {
  const [workData, setWorkData] = useState<{ [key: string]: string[] }>({
    posters: [],
    branding: [],
    ui: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('/api/works');
        const data = await response.json();
        setWorkData(data);
      } catch (error) {
        console.error("Error fetching works:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, []);

  const categories = [
    { name: "Posters", id: "posters", limit: 3, fallbackHeight: "55vh" },
    { name: "Identity", id: "branding", limit: 2, fallbackHeight: "65vh" },
    { name: "UI / UX", id: "ui", limit: 1, fallbackHeight: "80vh" }
  ];

  if (loading) return null;

  return (
    <section id="projects" className="relative w-full pt-8 pb-32 bg-[#f5f5f5]" data-theme="light">
      <div className="w-full">
        
        {/* Main Header */}
        <div className="w-full overflow-hidden">
          <h2 className="text-[9.5vw] md:text-[11.5vw] tracking-tighter text-black uppercase leading-[0.8] w-full text-center whitespace-nowrap">
            Selected Works
          </h2>
          <div className="mt-6 w-full h-px bg-black" />
        </div>

        {/* Categories Map - only render rows for categories that actually have works,
            so empty categories don't leave dead vertical space before the CTA */}
        <div className="mt-8 space-y-24">
          {categories.filter((cat) => (workData[cat.id] ?? []).length > 0).map((cat) => (
            <div key={cat.id} className="w-full px-4">
              {/* Row for this category - height derives from the displayed works */}
              <WorkRow paths={workData[cat.id] ?? []} limit={cat.limit} fallbackHeight={cat.fallbackHeight} />
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="flex justify-center pt-12 px-4">
          <Magnetic strength={0.3}>
            <button className="border border-black/20 px-12 py-4 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-500 text-black cursor-pointer">
              See All Works
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};
