"use client";

import { motion } from "framer-motion";
import { MaskedText } from "@/components/UI/MaskedText";
import { Magnetic } from "@/components/UI/Magnetic";

import { useState, useEffect } from "react";

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
    { name: "Posters", id: "posters", limit: 3, height: "h-[45vh] md:h-[55vh]" },
    { name: "Identity", id: "branding", limit: 2, height: "h-[50vh] md:h-[65vh]" },
    { name: "UI / UX", id: "ui", limit: 1, height: "h-[60vh] md:h-[80vh]" }
  ];

  if (loading) return null;

  return (
    <section id="projects" className="relative w-full pt-8 pb-32 bg-[#f5f5f5]" data-theme="light">
      <div className="w-full space-y-24">
        
        {/* Main Header */}
        <div className="w-full overflow-hidden">
          <h2 className="text-[11.5vw] font-bold tracking-tighter text-black uppercase leading-[0.8] w-full text-center whitespace-nowrap">
            Selected Works
          </h2>
        </div>

        {/* Categories Map */}
        <div className="space-y-24">
          {categories.map((cat) => (
            <div key={cat.id} className="w-full px-4">
              {/* Row for this category */}
              <div className={`flex flex-col md:flex-row gap-4 justify-center ${cat.height}`}>
                {workData[cat.id]?.slice(0, cat.limit).map((imagePath, idx) => (
                  <motion.div
                    key={imagePath}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group cursor-pointer relative h-full"
                  >
                    <div className="bg-zinc-900/5 h-full relative overflow-hidden">
                      <img 
                        src={imagePath} 
                        alt="Work"
                        className="h-full w-auto block transition-all duration-700"
                      />
                      
                      {/* Sliding Strip Overlay */}
                      <div className="absolute bottom-0 left-0 w-full bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1] z-20 py-4 px-6 flex justify-between items-center">
                         <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                           View Case Study
                         </span>
                         <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
                           ↗
                         </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="flex justify-center pt-12 px-4">
          <Magnetic strength={0.3}>
            <button className="border border-black/20 px-12 py-4 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-500 font-bold text-black cursor-pointer">
              See All Works
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};
