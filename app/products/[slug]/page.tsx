"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { products, Product } from "@/app/data/products";
import Navbar from "@/app/component/navbar";
import { motion } from "framer-motion";
import ProductGrid from "@/app/component/ProductGrid";
import Footer from "@/app/component/footer_jewllery";
import { useCart } from "@/app/component/CartContext";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const faqs = [
    {
      question: "Exchange Policy",
      sections: [
        {
          title: "",
          content: [
            "We don't offer any refund. We offer exchange only if the product received is broken, defected, rusted or a wrong article. You can claim this within 48 hours of delivery. After that, no claims will be considered. You need to send a proof / picture of the product to make a claim."
          ]
        }
      ]
    },
    {
      question: "Shipping Policy",
      sections: [
        {
          title: "Delivery Charges",
          content: ["Pakistan: PKR 200/-", "International: Calculated at checkout"]
        },
        {
          title: "Delivery Time",
          content: [
            "Pakistan: 3–5 working days",
            "International: 10–15 working days",
            "*Tracking number will be shared via WhatsApp once your order is dispatched*"
          ]
        },
        {
          title: "Free Shipping",
          content: [
            "Pakistan: Free on orders above PKR 2999",
            "International: Free on orders above USD 299"
          ]
        }
      ]
    },
    {
      question: "Description",
      sections: [
        {
          title: "PRODUCT INFORMATION",
          content: [
            "ZAK Jewellery, its leading artificial jewellery brand in Pakistan, is trying to provide its customers with the finest and highest-quality jewelry at affordable prices. Our specialty of expertise is creating the latest designs of artificial jewelry."
          ]
        },
        {
          title: "PRODUCT PICTURE",
          content: [
            "The image at the top is a genuine original shot of the product without any filters or photo editing. However, exposure to light may lead to a color variation of up to 5%."
          ]
        },
        {
          title: "JEWELLERY CARE",
          content: [
            "Here are some important guidelines to care for your jewelry:",
            "• Avoid spraying perfume directly onto the jewelry item. Tip: It's best to apply your perfume before putting on your jewelry.",
            "• Refrain from wearing jewelry while showering, washing your hands, or doing laundry.",
            "• Avoid wearing jewelry right after applying lotion or cream, as the chemicals may harm the product.",
            "• Store your jewelry in its box or pouch to protect it from wear and tear.",
            "• Do not wear jewelry while swimming, as exposure to seawater and chlorine can damage it.",
            "• Remember to remove your jewelry before going to bed to prevent any damage to the product."
          ]
        },
        {
          title: "SHIPPING",
          content: [
            "Free Shipping all over Pakistan on orders above Rs 3000/- in 2 to 4 working days."
          ]
        },
        {
          title: "ZAK Jewellery",
          content: [
            "ZAK Jewelry, the leading artificial jewelry brand in Pakistan, understands that people are constantly searching for the finest artificial jewelry online.",
            "If you're someone who's fascinated by the latest designs in artificial jewelry from Pakistan, be sure to explore our collection.",
            "Our inventory boasts a wide range of the latest items in various categories, including Mala Set, Locket Set, Bridal sets, Bangles, Earrings, Tops, Stud, Jhumka Rings, Necklace, Chokar, Bracelets, Chains, Bindiya, Jhoomar, Calligraphy, and Pendants."
          ]
        }
      ]
    }
  ];

  const texts = [
    "12.12 Sale Live Now",
    "30,000+ Satisfied Customers",
    "1,000+ 5 Star Reviews",
    "Free Shipping Above Rs. 2990/-",
    "WORLDWIDE SHIPPING",
    "3-5 Working Days Delivery Time",
  ];

  const { addToCart } = useCart();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Find the product by slug
  const product: Product | undefined = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="p-10 text-center text-red-600 text-lg font-semibold">
        Product not found
      </div>
    );
  }

  // Gallery images fallback
  const galleryImages: string[] = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  const [activeImage, setActiveImage] = useState<string>(galleryImages[0]);
  const [qty, setQty] = useState<number>(1);
  // const [activeColor, setActiveColor] = useState<string>(product.colors?.[0] || "");

  // Update active image when slug changes
  // useEffect(() => {
  //   setActiveImage(galleryImages[0]);
  //   setActiveColor(product.colors?.[0] || "");
  //   setQty(1);
  // }, [slug, galleryImages, product.colors]);

  return (
    <>
      <Navbar />
<div className="bg-[var(--skin)]">
      <section className="max-w-[1600px] mx-auto py-12 ">
        <div className="grid md:grid-cols-2 p-10 xl:p-0 gap-10">

          {/* LEFT: Image Gallery */}
          <div>
            <div className="overflow-hidden mb-5 w-full">
              <motion.div
                className="relative w-full h-[260px] md:h-[300px] xl:h-[80vh]"
                whileHover={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Optional Thumbnails (commented out) */}
            {/* <div className="grid grid-cols-6 gap-3 overflow-hidden">
              {galleryImages.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`border rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 ${
                    activeImage === img ? "border-black scale-105 shadow-md" : "border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    width={120}
                    height={140}
                    className="object-cover"
                  />
                </button>
              ))}
            </div> */}
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif mb-4">{product.name}</h1>

              {/* Price */}
              <div className="flex items-center gap-4 mb-4">
                {product.oldPrice && (
                  <span className="line-through text-gray-400 text-lg">
                    Rs.{product.oldPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-red-600 text-2xl font-bold">
                  Rs.{product.price.toLocaleString()}
                </span>
                {product.oldPrice && product.price && (
                  <span className="bg-yellow-200 text-yellow-800 text-sm px-2 py-1 rounded">
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Stock */}
              <p className="text-green-600 font-medium mb-4">In Stock</p>

              {/* Description */}
              <p className="text-gray-700 mb-4">{product.description || "No description available"}</p>

              {/* Features */}
              {/* {product.features?.length ? (
                <ul className="text-gray-700 space-y-2 mb-6">
                  {product.features.map((f: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-600">✔</span> {f}
                    </li>
                  ))}
                </ul>
              ) : null} */}

              {/* Colors */}
              {/* {product.colors?.length ? (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Color:</p>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color: string) => (
                      <button
                        key={color}
                        onClick={() => setActiveColor(color)}
                        className={`border px-3 py-1 text-sm rounded transition ${
                          activeColor === color ? "border-black bg-gray-100" : "border-gray-300"
                        }`}
                      >
                        {color}
                      </button>
                    ))} */}
                  {/* </div>
                </div>
              ) : null} */}

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-gray-100 transition"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-gray-100 transition"
                >
                  +
                </button>

                <button
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      qty,
                    })
                  }
                  className="w-full xl:w-96 bg-[var(--golden)] text-white py-3"
                >
                  Add to Cart
                </button>
              </div>
            {/* Category */}
{product.category && (
  <p className="text-sm text-gray-500 mb-2">
    Category:{" "}
    <span className="text-[var(--golden)] font-medium hover:underline cursor-pointer">
      {product.category}
    </span>
  </p>
)}
</div>
          </div>
        </div>
      </section>

      {/* Marquee / Info Text */}
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
          {[...texts, ...texts].map((text, i) => (
            <div key={i} className="flex items-center gap-2">
              <span>⭐</span>
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Related Products */}
      <h2 className="text-xl xl:text-4xl mt-5 ml-7 mb-5 xl:ml-12 font-serif">Related Products</h2>
      <div className="px-7">
        <ProductGrid limit={4} />
      </div>

      <Footer /> </div>
    </>
  );
}