"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "../component/navbar";
import { useEffect, useState } from "react";
import OurStory from "../component/ourstory";
import Testimonials from "../component/Testimonials";

export default function AboutPage() { const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount1((prev) => (prev < 30 ? prev + 1 : 30));
      setCount2((prev) => (prev < 100 ? prev + 5 : 100));
      setCount3((prev) => (prev < 10 ? prev + 1 : 10));
    }, 50);

    return () => clearInterval(interval);
  }, []);
  return ( 
    
  <>  <Navbar/>
    <div className="bg-[#f5f5f5]">

      {/* ================= HERO ================= */}
      <section className="relative h-[250px] md:h-[400px] w-full">
        <motion.img
    src="/haeder.jpg"
    alt="HJ Jewellery Banner"
    className="w-full h-full object-cover"
    initial={{ scale: 1.1 }}
    animate={{ scale: 1 }}
    transition={{ duration: 4, ease: "easeOut" }}
  />
        <div className="absolute inset-0 bg-[var(--accent)]/70 flex items-center justify-center">
          <div className="bg-[var(--accent)] px-10 py-4 rounded-md shadow-xl">
            <h1 className="text-white text-2xl md:text-4xl font-bold text-center">
              ABOUT
            </h1>
            <p className="text-center text-xs text-gray-200 mt-1">
              HOME • ABOUT
            </p>
          </div>
        </div>
      </section>
<OurStory/>
      <section className="bg-[#f5f5f5] py-16 px-4 md:px-8">
  <div className="max-w-7xl mx-auto items-center">

    {/* LEFT TEXT */}
    <div>
      <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
        About Us
      </p>

      <h2 className="text-3xl md:text-5xl font-extrabold text-[#3b0d0c] leading-tight mb-5">
        SERVING BOLD CANTEEN FOOD WITH PASSION, FLAVOR, AND AUTHENTIC URBAN TASTE ON THE MOVE ALWAYS.
      </h2>

      <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
        We are a canteen food brand built on passion for bold flavors and fast,
        fresh bites. Starting from a humble food truck, we bring high-quality
        ingredients and handcrafted recipes straight to the Canteen.
        <br /><br />
        Every meal we serve is cooked fresh, inspired by urban food culture, and
        made with premium care — just real food, real heat, and honesty.
      </p>

      <button className="bg-[#d78d27] hover:opacity-90 text-white px-6 py-2 rounded-full text-sm font-medium">
        Learn More
      </button>
    </div>

    {/* RIGHT IMAGES */}

  </div>
</section>
      <section className="bg-[#f5f5f5] py-16 px-4 md:px-8">    
        <div className="relative max-w-7xl mx-auto flex gap-6 md:gap-10 items-center justify-center">

      <img
        src="/about.jpg"
        className="rounded-xl object-cover h-[60vh] w-full"
        alt=""
      />
<div className="relative w-full">
  
  {/* MAIN IMAGE */}
  <img
    src="/about2.jpg"
    className="rounded-xl object-cover h-[60vh] w-full"
    alt=""
  />

  {/* SMALL OVERLAY IMAGE */}
<motion.img
  src="/burger.png"
  alt="burger"
  className="absolute bottom-[60vh] right-0 hidden md:block w-36 object-contain"
  
  initial={{ rotate: 12, y: 0 }}
  
  animate={{
    y: [0, -10, 0], // floating up-down
  }}
  
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  
  whileHover={{
    rotate: 0,
    scale: 1.1,
    y: -5,
  }}
/>

</div>

      {/* STATS OVERLAY */}
 <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[90%] h-40 bg-[var(--accent)] text-white rounded-lg shadow-lg py-5 grid grid-cols-3 text-center items-center">

  <div>
    <h3 className="text-xl md:text-2xl font-bold">{count1}+</h3>
    <p className="text-xs">LOCATIONS REACHED</p>
  </div>

  <div>
    <h3 className="text-xl md:text-2xl font-bold">{count2}K+</h3>
    <p className="text-xs">CUSTOMERS SERVED</p>
  </div>

  <div>
    <h3 className="text-xl md:text-2xl font-bold">{count3}+</h3>
    <p className="text-xs">YEARS EXPERIENCE</p>
  </div>

</div>

    </div>
    
</section>
      {/* ================= WHY SECTION ================= */}
      <section className="py-16 px-4 md:px-6">
        <div className="bg-[var(--accent)] text-white rounded-xl max-w-6xl mx-auto p-8 text-center">

          <p className="text-xs uppercase text-gray-300 mb-2">
            Why Choose Us
          </p>

          <h2 className="text-2xl md:text-4xl font-bold mb-8">
            Why Feastera Hits Different
          </h2>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white text-black px-4 py-2 rounded-full text-sm">
              Bold Canteen Flavors
            </div>

            <div className="bg-white text-black px-4 py-2 rounded-full text-sm">
              Fresh Ingredients
            </div>

            <div className="bg-white text-black px-4 py-2 rounded-full text-sm">
              Premium Service
            </div>

          </div>

          {/* Food Truck Image */}
          <div className="mt-10 flex justify-center">
            <img src="/truck.png" className="w-60 md:w-80" />
          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-16 px-4 md:px-6 max-w-6xl mx-auto">

        <p className="text-xs uppercase text-gray-500 mb-2">
          Reviews
        </p>

        <h2 className="text-2xl md:text-4xl font-bold text-[var(--accent)] mb-8">
          What People Say About Our Canteen Food
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[1,2,3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>

              <div className="flex items-center gap-3">
                <img src="/user.jpg" className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="text-sm font-semibold">Customer</h4>
                  <p className="text-xs text-gray-500">Food Lover</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

    </div><Testimonials/></>
  );
}
