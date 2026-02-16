"use client";

import Navbar from "../component/navbar";
import Image from "next/image";
import { motion } from "framer-motion";

import Footer from "../component/footer_jewllery";
import ProductGrid from "../component/ProductGrid";
import ShopCollectiondev from "../component/shopcollection";
export default function MAla() {

  return (
    <>

      <Navbar />
  
<ShopCollectiondev/>
   <div className="max-w-8xl mx-auto">
      <ProductGrid category="mala" /> 
    </div>
 

<Footer/>
    </>
  );
}
