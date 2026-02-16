"use client";

import Image from "next/image";
import { motion } from "framer-motion";


export default function ShopCollectiondev() {
    const collections = [
  { name: "Mala", img: "/jewllery/na-15.jpeg" },
  { name: "Necklace", img: "/jewllery/na-1c.jpg" },

  { name: "Bangles", img: "/jewllery/ba-1.jpg" },

];

const texts = [
  "12.12 Sale Live Now",
  "30,000+ Satisfied Customers",
  "1,000+ 5 Star Reviews",
  "Free Shipping Above Rs. 2990/-",
  "WORLDWIDE SHIPPING",
  "3-5 Working Days Delivery Time",
];
  return (
    <>

  <section className="w-full px-4 md:px-12 py-12 text-center">
        
        {/* HEADING */}
        <div className="font-atkinson text-2xl md:text-3xl lg:text-4xl text-gray-800 mb-8">
          Shop By Collections
        </div>
  
        {/* COLLECTION ROW */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {collections.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center cursor-pointer"
            >
              {/* ROUND IMAGE */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
  
              {/* TEXT */}
              <p className="mt-2 text-sm md:text-base text-gray-700">
                {item.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
  
   <div className="w-full overflow-hidden bg-[var(--golden)] py-3">
      <motion.div
        className="flex whitespace-nowrap gap-10 text-white font-medium text-sm md:text-base"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        }}
      >
        {/* Repeat content twice for smooth loop */}
        {[...texts, ...texts].map((text, i) => (
          <div key={i} className="flex items-center gap-2">
            <span>⭐</span>
            <span>{text}</span>
          </div>
        ))}
      </motion.div>
    </div>

    </>
  );
}
