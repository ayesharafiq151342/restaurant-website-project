"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

type CategoryType = "all" | "signature" | "snacks" | "drinks";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<CategoryType>("signature");
  const [image, setImage] = useState<File | null>(null);
  const [filter, setFilter] = useState<CategoryType>("all");
  const [message, setMessage] = useState("");

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) return setMessage("All fields required");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Product added successfully 🎉");
      setName(""); setPrice(""); setCategory("signature"); setImage(null);
      fetchProducts();
    } catch (err) {
      console.log("Add error:", err);
      setMessage("Failed to add product ❌");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  // Delete product
  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // Filtered products for grid
  const visibleProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter(p => p.category === filter);
  }, [filter, products]);

  return (
    <div className="p-6 bg-[var(--skin)] min-h-screen">

      {/* ADD PRODUCT FORM */}
      <div className="max-w-md mx-auto mb-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Add Product</h2>
        {message && <p className="mb-4 text-center text-green-600 font-semibold">{message}</p>}

        <form onSubmit={addProduct} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />

          <select
            value={category}
            onChange={e => setCategory(e.target.value as CategoryType)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          >
            <option value="signature">Signature</option>
            <option value="snacks">Snacks</option>
            <option value="drinks">Drinks</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files?.[0] || null)}
            required
          />

          <button
            type="submit"
            className="bg-orange-400 text-white py-3 px-4 rounded-lg font-bold hover:bg-orange-500 transition shadow-md"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex justify-center gap-4 mb-8">
        {["all", "signature", "snacks", "drinks"].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat as CategoryType)}
            className={`px-6 py-2 rounded-full font-semibold transition transform hover:scale-105 ${
              filter === cat
                ? "bg-orange-400 text-white shadow-lg"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {visibleProducts.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="relative bg-white rounded-2xl p-6 pt-16 text-center shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className="relative h-56 w-full mb-6">
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
                className="object-contain w-full h-full rounded-lg"
              />
            </div>

            <div className="text-left">
              <h3 className="text-lg font-extrabold text-gray-800 uppercase">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-2">Delicious {item.category} item</p>
              <div className="flex items-center justify-between mt-5">
                <span className="bg-orange-400 text-white px-4 py-2 rounded-md font-bold shadow">{`PKR ${item.price.toLocaleString()}`}</span>
                <button
                  onClick={() => deleteProduct(item._id)}
                  className="text-red-500 font-bold uppercase text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}