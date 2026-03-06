"use client";

import Navbar from "./component/navbar";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import Footer from "./component/footer_jewllery";

import ProductGrid from "./admin/ProductGrid";

type CategoryType = "all" | "signature" | "snacks" | "drinks";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}
export default function Home({ params }: { params: { slug: string } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<CategoryType>("all");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => setProducts(res.data));
  }, []);

  const visibleProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter, products])

  return (
    <>
       <Navbar
    
      />

<div className="relative w-full h-[500px] xl:h-screen overflow-hidden">

  {/* Background Image with Slow Zoom */}
  <motion.img
    src="/haeder.jpg"
    alt="HJ Jewellery Banner"
    className="w-full h-full object-cover"
    initial={{ scale: 1.1 }}
    animate={{ scale: 1 }}
    transition={{ duration: 4, ease: "easeOut" }}
  />

  {/* Red Overlay */}
  <div className="absolute inset-0 bg-[var(--accent)]/60"></div>

  {/* Content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

    {/* Animated Heading */}
    <motion.h1
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-white text-6xl md:text-7xl xl:text-8xl 2xl:text-8xl font-bangers tracking-wider leading-tight mb-6"
    >
      Flavor On The Move
    </motion.h1>

    {/* Animated Paragraph */}
    <motion.p
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.3 }}
      className="text-white max-w-2xl text-sm md:text-base mb-8"
    >
    We offer authentic Mexican style fajitas, burritos, chalupas, chile rellenos, chimichangas, enchiladas, tamales, tostadas, salads, flautas...   </motion.p>

    {/* Animated Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 0.6 }}
      className="flex gap-4"
    >
      <button className="bg-[var(--primary)] text-white px-6 py-3 uppercase tracking-wide hover:scale-110 transition duration-300">
        Discover More
      </button>

      <button className="border border-white text-white px-6 py-3 uppercase tracking-wide hover:bg-white hover:text-[var(--accent)] transition duration-300">
        Our Menu
      </button>
    </motion.div>

  </div>
</div>




<section className="relative -mt-34 z-20">
  <div className="py-16">
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 text-center shadow-2xl">

      {/* Card 1 */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        whileHover={{ y: -10 }}
        viewport={{ once: true }}
        className="bg-[var(--accent)] text-white p-10"
      >
        <div className="text-4xl mb-4">🍸</div>
        <h3 className="text-2xl font-semibold italic mb-4">
          Perfect for dining
        </h3>
        <p className="text-sm leading-6 mb-6">
          Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        </p>
        <a href="#" className="uppercase text-sm font-semibold tracking-wider hover:underline">
          Read More
        </a>
      </motion.div>

      {/* Card 2 */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        whileHover={{ y: -10 }}
        viewport={{ once: true }}
        className="bg-[var(--primary)] p-10 text-white"
      >
        <div className="text-4xl mb-4">🍲</div>
        <h3 className="text-2xl font-semibold italic mb-4">
          Always New Menu
        </h3>
        <p className="text-sm leading-6 mb-6">
          Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        </p>
        <a href="#" className="uppercase text-sm font-semibold tracking-wider hover:underline">
          Read More
        </a>
      </motion.div>

      {/* Card 3 */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        whileHover={{ y: -10 }}
        viewport={{ once: true }}
        className="bg-[var(--accent)] p-10 text-white"
      >
        <div className="text-4xl mb-4">🛎️</div>
        <h3 className="text-2xl font-semibold italic mb-4">
          Only Best Service
        </h3>
        <p className="text-sm leading-6 mb-6">
          Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        </p>
        <a href="#" className="uppercase text-sm font-semibold tracking-wider hover:underline">
          Read More
        </a>
      </motion.div>

    </div>
  </div>
</section>



<section className=" py-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

  
    <div>
      <h2 className="text-5xl font-serif italic mb-4">Little About Us</h2>
      <h4 className="uppercase tracking-widest text-gray-600 mb-6">
        The History of Us
      </h4>

      <p className="text-gray-600 leading-7 mb-8">
  We are a university canteen built on a passion for fresh flavors and affordable meals. What started as a small campus spot has grown into a favorite gathering place for students and staff alike.
    </p>

      <button className="border border-[var(--primary)] px-6 py-3 uppercase tracking-wider hover:bg-[var(--primary)] hover:text-white transition">
        Learn More
      </button>
    </div>

 
   <div className="flex gap-8 justify-center">

  <motion.img
    src="/food-circle-5.webp"
    alt="Food 1"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    whileHover={{ scale: 1.08 }}
    viewport={{ once: true }}
    className="w-56 h-56 rounded-full object-cover shadow-lg cursor-pointer"
  />

  <motion.img
    src="/food-circle-6.webp"
    alt="Food 2"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    whileHover={{ scale: 1.08 }}
    viewport={{ once: true }}
    className="w-56 h-56 rounded-full object-cover shadow-lg cursor-pointer"
  />

</div>
  </div>
</section>    <div className="min-h-screen p-6 bg-[var(--skin)]">
      <div className="flex justify-center gap-4 mb-10 mt-4">
        {["all", "signature", "snacks", "drinks"].map((cat) => (
          <button key={cat} onClick={() => setFilter(cat as CategoryType)} className={`px-6 py-2 rounded-full font-semibold transition ${filter === cat ? "bg-[var(--primary)] text-white" : "bg-gray-200"}`}>
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <ProductGrid products={visibleProducts} isAdmin={false} />
    </div>


<Footer/>
    </>
  );
}
