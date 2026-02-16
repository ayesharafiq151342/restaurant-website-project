"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/app/data/products";
import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";

interface ProductGridProps {
  limit?: number;
  category?: string;
  maxPrice?: number; // ✅ NEW
  imgHeight?: string;
  imgWidth?: string;
  columns?: number;
}

type SortType = "default" | "low-high" | "high-low" | "rating";

export default function ProductGrid({
  limit,
  category,
  maxPrice,
  imgHeight,
  imgWidth,
  columns,
}: ProductGridProps) {
  const [sort, setSort] = useState<SortType>("default");

  const visibleProducts = useMemo(() => {
    let list = category
      ? products.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        )
      : products;

    // ✅ PRICE FILTER
    if (maxPrice) {
      list = list.filter((p) => p.price <= maxPrice);
    }

    // SORTING
    if (sort === "low-high") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high-low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating")
      list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));

    // LIMIT
    if (limit) list = list.slice(0, limit);

    return list;
  }, [category, maxPrice, sort, limit]);

  // GRID LAYOUT
const gridClass =
  columns === 2
    ? "grid-cols-1 sm:grid-cols-2"
    : columns === 3
    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  // NO PRODUCTS
  if (visibleProducts.length === 0) {
    return (
      <div className="bg-gray-200 p-8 rounded-lg text-center border-t-4 border-[var(--text_skin)]">
        <h2 className="text-lg font-bold">
          No products were found matching your selection.
        </h2>
        <p className="text-sm mt-2 text-gray-600">
          Please try another filter.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full px-4 md:px-8 py-12">
      {/* SORT */}
   <div className="mb-6 flex flex-col sm:flex-row sm:justify-end gap-2">
  <select
    value={sort}
    onChange={(e) => setSort(e.target.value as SortType)}
    className="w-full sm:w-auto border px-4 py-2 rounded-md text-sm"
  >
    <option value="default">Relevance</option>
    <option value="rating">Sort by Average Rating</option>
    <option value="low-high">Price: Low → High</option>
    <option value="high-low">Price: High → Low</option>
  </select>
</div>

      {/* GRID */}
      <div className={`grid gap-6 ${gridClass}`}>
        {visibleProducts.map((item) => (
          <Link key={item.id} href={`/products/${item.slug}`}>
            <div className="group cursor-pointer">
              {/* IMAGE */}
              <div
                className={`relative bg-[#f6f2ec] overflow-hidden rounded-md ${
                  imgHeight ||
                  "h-[280px] sm:h-[300px] md:h-[360px] lg:h-[440px]"
                } ${imgWidth || "w-full"}`}
              >
                {item.discount && (
                  <span className="absolute top-3 left-3 bg-white text-xs px-3 py-1 rounded-full shadow z-10">
                    Sale!
                  </span>
                )}

                <span className="absolute top-3 right-3 bg-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition z-10">
                  <ShoppingBag size={16} />
                </span>

                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="pt-3 space-y-1">
                <p className="text-[11px] uppercase tracking-wide text-gray-400">
                  {item.category}
                </p>
                <p className="text-sm text-gray-800 leading-snug">
                  {item.name}
                </p>

                <div className="flex gap-2 items-center text-sm">
                  {item.oldPrice && (
                    <span className="line-through text-gray-400">
                      Rs {item.oldPrice}
                    </span>
                  )}
                  <span className="font-semibold text-black">
                    Rs {item.price}
                  </span>
                </div>

                {item.rating && (
                  <p className="text-yellow-500 text-sm">
                    ⭐ {item.rating.toFixed(1)} / 5
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
