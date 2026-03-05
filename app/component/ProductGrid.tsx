"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "./products";
import { useMemo, useState } from "react";

interface ProductGridProps {
  limit?: number;
}

type CategoryType = "all" | "signature" | "snacks" | "drinks";

export default function ProductGrid({ limit = 6 }: ProductGridProps) {
  const [category, setCategory] = useState<CategoryType>("signature");

  // Compute visible products
  const visibleProducts = useMemo(() => {
    let list = products;

    // Filter by category if not "all"
    if (category !== "all") {
      list = list.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Limit to first `limit` items
    return list.slice(0, limit);
  }, [category, limit]);

  return (
    <section className="w-full bg-[var(--skin)] py-20 px-6 relative overflow-hidden">

      {/* HEADING */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--accent)] uppercase leading-tight">
          Street Favorites Made <br /> Fresh Every Day
        </h2>
      </div>

      {/* CATEGORY BUTTONS */}
      <div className="flex justify-center gap-4 mb-16">
        {["all", "signature", "snacks", "drinks"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat as CategoryType)}
            className={`px-8 py-3 rounded-full font-bold uppercase transition ${
              category === cat
                ? "bg-[var(--primary)] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {visibleProducts.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            className="relative bg-[var(--accent)] rounded-xl p-6 pt-16 text-center hover:-translate-y-2 transition duration-300"
          >

            {/* 🍕 Pizza on First Card */}
            {index === 0 && (
              <div className="absolute -top-40 left-12 -translate-x-1/2 hidden lg:block">
                <Image
                  src="/Group-8-e1769572982358.png"
                  alt="Pizza"
                  width={120}
                  height={120}
                />
              </div>
            )}

            {/* 🥤 Pepsi on Third Card */}
            {index === 2 && (
              <div className="absolute -top-50 left-1/2 translate-x-1/2 hidden lg:block">
                <Image
                  src="/Group-10.png"
                  alt="Pepsi"
                  width={120}
                  height={120}
                />
              </div>
            )}

            {/* PRODUCT IMAGE */}
            <div className="relative h-56 w-full mb-8">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>

            {/* INFO BOX */}
            <div className="bg-[#f3e5d8] rounded-lg p-6 text-left">
              <h3 className="text-lg font-extrabold text-[#5a0d0d] uppercase">
                {item.name}
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>

              <div className="flex items-center justify-between mt-5">
                <span className="bg-[var(--primary)] text-white px-4 py-2 rounded-md font-bold">
                  PKR {item.price.toLocaleString()}
                </span>

                <button className="text-[var(--primary)] font-bold uppercase text-sm hover:underline">
                  Order Now →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}