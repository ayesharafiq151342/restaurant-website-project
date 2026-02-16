"use client";

import { useState, useMemo } from "react";
import Navbar from "../../component/navbar";
import Sidebar from "../../component/sidebar";
import ProductGrid from "@/app/component/ProductGrid";
import PriceFilter from "@/app/component/PriceFilter";
import { products } from "@/app/data/products";

export default function ChokerPage() {
  // CATEGORY + SEARCH
  const [category, setCategory] = useState<string | null>("PENDANTS");
  const [search, setSearch] = useState("");

  // PRICE FILTER
  const [price, setPrice] = useState(6500); // slider value
  const [appliedPrice, setAppliedPrice] = useState(6500); // applied value

  // unique categories
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // FINAL CATEGORY (search > sidebar)
  const activeCategory = useMemo(() => {
    return search.trim() ? search.toUpperCase() : category;
  }, [search, category]);

  return (
    <>
      <Navbar />

      <section className="bg-[#fbf6ea] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* SIDEBAR */}
          <aside className="space-y-10">

            {/* SEARCH */}
            <div className="bg-white p-5 rounded-md shadow">
              <div className="flex border rounded-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Search by category..."
                  className="flex-1 px-3 py-2 text-sm outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="bg-[#c9a14a] px-4 text-white font-bold">
                  ›
                </button>
              </div>
            </div>

            {/* PRICE FILTER */}
            <PriceFilter
              min={599}
              max={6500}
              value={price}
              onChange={setPrice}
              onApply={() => setAppliedPrice(price)}
            />

            {/* CATEGORY FILTER */}
            <div className="bg-white p-5 rounded-md shadow">
              <h3 className="text-sm font-semibold mb-4 uppercase">
                Filter by Categories
              </h3>

              <Sidebar
                categories={categories}
                selectedCategory={category}
                onCategorySelect={(cat) => {
                  setCategory(cat);
                  setSearch("");
                }}
              />
            </div>
          </aside>

          {/* CONTENT */}
          <div className="lg:col-span-3 space-y-8 bg-white">

            {/* HEADING */}
            <div className="flex flex-col gap-2 m-6">
              <p className="text-xs text-gray-400">
                Home /{" "}
                <span className="text-gray-600 font-medium">
                  {activeCategory || "PENDANTS"}
                </span>
              </p>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl p-4 sm:p-6 md:p-8 font-montserrat text-[var(--text_skin)]">
              {activeCategory || "PENDANTS"}
            </h1>
            
            <p className="mt-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[38px] text-gray-700 max-w-3xl">
              Elegant and stylish Pendants crafted with premium materials.
            </p>
                        </div>
                        {/* PRODUCTS */}
                        <div className="px-5">
              <ProductGrid
                limit={12}
                columns={3}
                imgHeight="h-[260px]"
                imgWidth="w-full md:w-auto" // <-- full width on mobile, auto width on medium screens and above
                category={activeCategory || undefined}
                maxPrice={appliedPrice}
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
