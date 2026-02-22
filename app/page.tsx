"use client";

import Navbar from "./component/navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import ProductGrid from "./component/ProductGrid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { products } from "./data/products";
import {
  Globe,
  Headphones,
  Link,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import ReviewCarousel from "./component/rewies";
import Footer from "./component/footer_jewllery";
import { useState } from "react";
export default function Home({ params }: { params: { slug: string } }) {
    const collections = [
  { name: "Mala", img: "/jewllery/na-18-b.jpg" },


  
  { name: "Bangles", img: "/jewllery/ba-1.jpg" },
  { name: "Earrings", img: "/jewllery/na-18-b.jpg" },

  { name: "neckless", img: "/jewllery/ba-1.jpg" },
  { name: "lockets", img: "/jewllery/na-18-b.jpg" },

  { name: "matha patti", img: "/jewllery/ba-1.jpg" },
  { name: "jhoomar", img: "/jewllery/na-18-b.jpg" },




]; const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(products.map((p) => p.category))
  );

const features = [
  {
    title: "WORLDWIDE SHIPPING",
    desc: "Our Moto is to move worldwide",
    icon: Globe,
  },
  {
    title: "SUPPORT 24/7",
    desc: "Contact us 24 hours a day, 7 days a week",
    icon: Headphones,
  },
  {
    title: "RISK FREE PURCHASE",
    desc: "Simply return it within 2 days for an exchange",
    icon: RefreshCcw,
  },
  {
    title: "100% PAYMENT SECURE",
    desc: "We ensure secure Payment Gateway card",
    icon: ShieldCheck,
  },
];
interface ProductPageProps {
  params: {
    slug: string;
  };
}
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
</section>
         <ProductGrid limit={6} />
    <div className="md:px-14">      

      </div>
    <div className=" flex justify-center"><a href="/jewellery">
      <button
        className="
          bg-black text-white
          px-6 py-2.5 
          text-sm font-medium
          hover:bg-gray-800
          transition
          md:text-xl mb-10 uppercase
        "
      >
       View All
      </button>
    </a></div>
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
<div className="w-full text-center px-4 md:px-12 py-16 bg-white">
   {/* Main Heading */}
  <h1 className="font-montserrat uppercase text-3xl md:text-4xl text-gray-900 mb-4">
   New Arrivals
  </h1>
  {/* Small Heading */}
  <strong className="uppercase font-montserrat tracking-[0.3em] text-sm text-black mb-4">
      2025 Latest Designs
  </strong>

 

  {/* Sub Text */}
   <h4 className="font-montserrat text-sm md:text-xl text-gray-900 mt-4">
   online artificial jewellery shopping in Pakistan

  </h4>

  {/* Divider */}
  <div className="w-20 h-[2px] bg-[var(--golden)] mx-auto mt-4 mb-4"></div>

  {/* Description */}
<h1 className="font-montserrat text-3xl md:text-5xl text-gray-900 mb-4">
    Pakistani Jewellery Design
  </h1>

  <p className="max-w-4xl mx-auto text-gray-600 leading-relaxed text-sm md:text-base">
    Explore the exquisite world of Pakistani Jewellery Design, where Traditional Jewellery meets innovation.
  </p>

</div>



<section className="w-full px-4 md:px-12 py-12 text-center">
      
      {/* HEADING */}
      <div className="font-atkinson text-2xl md:text-3xl lg:text-4xl text-white mb-8">
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
      </div>    </section>      
<section
  className="
    w-full h-screen
    bg-cover bg-top bg-fixed
    px-4 
mt-20  "
  style={{
    backgroundImage: "url('/jewllery/bg.jpeg')",
  }}
>
  {/* Content here */}
</section> <ProductGrid limit={8} />  
<div className="flex justify-center"><a href="/jewellery">
      <button
        className="
          bg-black text-white
          px-6 py-2.5 m-10
          text-sm font-medium
          hover:bg-gray-800
          transition
          md:text-xl uppercase
        "
      >
       View All
      </button>
    </a></div>
<div className="w-full text-center px-4 md:px-12 py-16 bg-white">
   {/* Main Heading */}
  <h1 className="font-montserrat uppercase text-3xl md:text-4xl text-gray-900 mb-4">
 BEST SELLING PRODUCTS
  </h1>
  {/* Small Heading */}

 

  {/* Sub Text */}
   <h4 className="font-montserrat uppercase mb-4 text-sm md:text-xl text-gray-900 mt-4">
  online jewellery shopping


  </h4>
  <strong className="uppercase xl:text-2xl font-montserrat tracking-[0.3em] text-sm text-black mb-4">
Exquisite Designer Jewellery 

  </strong>
  {/* Divider */}
 


  <p className="max-w-4xl mt-3 mx-auto text-gray-600 leading-relaxed text-sm md:text-base">
Indulge in opulence with Zak's designer jewellery collection, epitomizing exquisite craftsmanship and timeless beauty </p>

</div>

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
 
<section className="w-full px-4  xl:mt-7 md:px-12 py-12 text-center">
      
      {/* HEADING */}
      <div className="font-tharoma uppercase text-2xl md:text-3xl lg:text-4xl text-white mb-8">
       Shop our Collections
      </div>

      {/* COLLECTION ROW */}
      <div className="flex flex-wrap md:h-54 items-center justify-center gap-6 md:gap-10">
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

      <section className="w-full bg-white py-12">
      <div className="max-w-full mx-auto px-4">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-4"
              >
                {/* ICON */}
                <div className="mb-4">
                  <Icon className="w-10 h-10 text-[var(--golden)]" />
                </div>

                {/* TITLE */}
                <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-900">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>

              <div className="w-full text-center px-4 md:px-12 py-16 bg-white">
   {/* Main Heading */}


  {/* Description */}
<h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
  Best Artificial Jewellery Brands in Pakistan
  </h1>

  <p className="max-w-4xl mx-auto text-gray-600 leading-relaxed text-sm md:text-base">
Discover high-quality artificial jewelry sets at Zakcollections. We specialize in Bridal jewelry, including Mala, Rings, Bangles, Lockets, and Bracelets. Elevate your style with Fashion accessories from the top online
Jewelry store in Pakistan
  </p>

</div>
     

<Footer/>
    </>
  );
}
