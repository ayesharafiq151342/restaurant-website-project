"use client";

import { motion } from "framer-motion";

export default function FoodGridHero() {
  const images = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    "/image4.jpg",
    "/image5.jpg",
    "/images6.jpg",
    "/images7.jpg",
    "/images8.jpg",
    "/images9.jpg",
    "/images10.jpg",
    "/images11.jpg",
    "/images12.jpg",
  ];

  return (
    <section className="relative w-full">

      {/* Top Shape */}
      <div className="w-full h-24 bg-[var(--accent)] rounded-b-[50%]"></div>

      {/* Images Grid */}
      <div className="grid grid-cols-6">
        {images.map((img, i) => (
          <div key={i} className="relative h-[220px] overflow-hidden">

            {/* Image */}
            <motion.img
              src={img}
              alt=""
              className="w-full h-full object-cover"
              animate={{
                scale: [1, 1.05, 1],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: i * 0.2, // stagger images slightly
              }}
            />

            {/* Animated Overlay */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              animate={{
                backgroundColor: [
                  "rgba(255,255,255,0.4)", // start white-ish
                  "rgb(183, 183, 183,0.9)",       // transition to black
                  "rgb(59, 53, 41,0.5)"  // back to white
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.3, // stagger overlays
              }}
            />

          </div>
        ))}
      </div>

      {/* Floating Side Icons */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
        <button className="bg-[var(--primary)] p-3 text-white">🛒</button>
        <button className="bg-[var(--primary)] p-3 text-white">📷</button>
        <button className="bg-[var(--primary)] p-3 text-white">💼</button>
      </div>

    </section>
  );
}