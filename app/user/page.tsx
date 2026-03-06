"use client";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ProductGrid from "../admin/ProductGrid";

type CategoryType = "all" | "signature" | "snacks" | "drinks";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export default function UserPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<CategoryType>("all");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => setProducts(res.data));
  }, []);

  const visibleProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter, products]);

  return (
    <div className="min-h-screen p-6 bg-[var(--skin)]">
      <div className="flex justify-center gap-4 mb-10 mt-4">
        {["all", "signature", "snacks", "drinks"].map((cat) => (
          <button key={cat} onClick={() => setFilter(cat as CategoryType)} className={`px-6 py-2 rounded-full font-semibold transition ${filter === cat ? "bg-[var(--primary)] text-white" : "bg-gray-200"}`}>
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <ProductGrid products={visibleProducts} isAdmin={false} />
    </div>
  );
}
