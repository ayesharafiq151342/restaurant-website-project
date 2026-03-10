// ProductGrid.tsx
"use client";

import { motion } from "framer-motion";
import OrderButton from "../component/orderbtn";

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}
const handleOrder = () => {
  // Here you can add your order logic
  // Example: show a confirmation or send data to server
  alert("Your order has been placed!"); 
  // Or call API to save order
};

interface ProductGridProps {
  products: Product[];
  isAdmin?: boolean;
  limit?: number;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  onOrder?: (product: Product) => void;
}

export default function ProductGrid({
  products,
  isAdmin = false,
  limit,
  onEdit,
  onDelete,
  onOrder,
}: ProductGridProps) {
  const displayProducts = products.slice(0, limit ?? products.length);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
      {displayProducts.map((item, index) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
          className="relative bg-[var(--accent)] rounded-xl p-6 pt-16 text-center hover:-translate-y-2 transition duration-300 shadow-lg"
        >
          {/* Product Image */}
          <div className="h-56 mb-6 flex items-center justify-center">
            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              className="object-contain h-full"
              alt={item.name}
            />
          </div>

          {/* Product Info */}
          <div className="bg-[#f3e5d8] rounded-lg p-6 text-left">
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {item.description}
            </p>

            <div className="flex justify-between mt-5 items-center">
              <span className="bg-[var(--primary)] text-white px-4 py-2 rounded-md font-bold">
                PKR {item.price}
              </span>

              {isAdmin ? (
                <div className="flex gap-4 text-sm font-bold">
                  <button
                    onClick={() => onEdit && onEdit(item)}
                    className="text-[var(--primary)] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(item._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ) : (
          <OrderButton
  productId={item._id}

  
/>

              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
