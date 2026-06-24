"use client";

import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="relative min-h-screen w-full flex flex-col justify-center py-24 md:py-32 px-6 md:px-24">
      <div className="max-w-[1600px] w-full mx-auto space-y-24 md:space-y-32">
        

        {/* Line 1: Who you are */}
        <div className="relative">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11vw] md:text-[6.5vw] font-bold tracking-tighter leading-[0.85] text-black uppercase"
          >
            I&apos;m Emil — <br className="hidden md:block" />
            a designer and <br className="hidden md:block" />
            developer based <br className="hidden md:block" />
            in Kerala.
          </motion.h2>
        </div>

        {/* Two to three sentences of real context */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-start-6 md:col-span-7 lg:col-start-7 lg:col-span-6">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-3xl lg:text-4xl text-black/90 leading-[1.2] tracking-tight font-medium"
            >
              Been doing freelance design work for 4 years — covers, posters, brand identities, social content, video edits. Since 2025 I&apos;ve been building for the web too. Currently focusing on creating high-end digital experiences that bridge the gap between design and development.
            </motion.p>
            
          </div>
        </div>

      </div>
    </section>
  );
};
