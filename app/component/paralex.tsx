"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const reviews = [
  {
    quote:
      "If you like unconventional pizza, this place is for you. Picturesque patio on a pedestrian square in the summer.",
    author: "The Guardian",
    site: "website-example.com",
  },
  {
    quote:
      "Amazing food experience with fresh ingredients and fast service.",
    author: "Food Magazine",
    site: "website-example.com",
  },
  {
    quote:
      "One of the best modern food spots with a cozy atmosphere.",
    author: "Urban Bites",
    site: "website-example.com",
  },
];

export default function ParallaxSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="relative w-full h-[350px] sm:h-[450px] md:h-[600px] xl:h-screen flex items-center justify-center text-center overflow-hidden">

      {/* Background */}
      <Image
        src="/PALR.jpg"
        alt="Background"
        fill
        className="object-cover "
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-10 z-20 hover:scale-110 transition"
      >
        <img
          src="/doner.png"
          alt="prev"
          className="w-16 sm:w-24 md:w-32 xl:w-44 hidden md:block"
        />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-10 z-20 hover:scale-110 transition"
      >
        <img
          src="/snaks.png"
          alt="next"
          className="w-16 sm:w-24 md:w-32 xl:w-44 hidden md:block"
        />
      </button>

      {/* CONTENT */}
      <div className="relative z-10 max-w-3xl px-4 sm:px-6 text-white">

        <h2 className="text-lg sm:text-2xl md:text-4xl xl:text-5xl text-[var(--primary)] font-bold mb-4">
          What the Press Says
        </h2>

        <p className="text-xs sm:text-sm md:text-lg xl:text-xl italic leading-relaxed transition-all duration-500">
          “{reviews[index].quote}”
        </p>

        <div className="mt-4 text-[var(--primary)] font-semibold text-sm md:text-base">
          {reviews[index].author}
        </div>

        <div className="text-gray-300 text-xs md:text-sm">
          {reviews[index].site}
        </div>

        {/* DOTS */}
        <div className="flex justify-center mt-4 space-x-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "bg-[var(--primary)] w-5"
                  : "bg-gray-400 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
