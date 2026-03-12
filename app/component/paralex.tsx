"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxSection() {

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section ref={ref} className="relative h-[50%] overflow-hidden">

      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <img
          src="/header.jpg"
          alt="Parallax"
          className="w-full h-fuill object-cover"
        />

        <div className="absolute inset-0 bg-[var(--accent)]/60"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">

        <h1 className="text-5xl md:text-7xl font-bold text-white">
          Welcome to URBAN BITES
        </h1>

        <p className="mt-4 text-lg md:text-2xl text-white">
"Delicious bites, happy moments."      </p>

        <button className="mt-6 px-6 py-3 bg-[var(--golden)] text-white rounded-md">
     Order Now
        </button>

      </div>
    </section>
  );
}