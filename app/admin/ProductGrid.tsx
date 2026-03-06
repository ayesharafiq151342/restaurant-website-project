"use client";

import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface ProductGridProps {
  products: Product[];
  isAdmin?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

export default function ProductGrid({
  products,
  isAdmin = false,
  onEdit,
  onDelete,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
      {products.map((item, index) => (
        <motion.div
          key={item._id} // Use _id as unique key
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
          className="relative bg-[var(--accent)] rounded-xl p-6 pt-16 text-center hover:-translate-y-2 transition duration-300 shadow-lg"
        >
          {/* 🍕 Pizza on First Card */}
          {index === 0 && (
            <div className="absolute -top-40  transform -translate-x-1/2 hidden lg:block">
              <img
                src="/Group-8-e1769572982358.png"
                alt="Pizza"
                width={120}
                height={120}
              />
            </div>
          )}

          {/* 🥤 Pepsi on Third Card */}
          {index === 2 && (
            <div className="absolute -top-34 left-[80%] transform  hidden lg:block">
              <img
                src="/Group-10.png"
                alt="Pepsi"
                width={120}
                height={120}
              />
            </div>
          )}

          {/* Product Image */}
          <div className="h-56 mb-6">
            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              className="object-contain h-full w-full"
              alt={item.name}
            />
          </div>

          {/* Product Details */}
          <div className="bg-[#f3e5d8] rounded-lg p-6 text-left">
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>

            <div className="flex justify-between mt-5 items-center">
              <span className="bg-[var(--primary)] text-white px-4 py-2 rounded-md">
                PKR {item.price}
              </span>

              {isAdmin ? (
                <div className="flex gap-4 text-sm font-bold">
                  <button
                    onClick={() => onEdit && onEdit(item)}
                    className="text-[var(--primary)]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(item._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  className="bg-[var(--primary)] text-white px-4 py-2 rounded-md font-bold hover:opacity-90 transition"
                  onClick={() => alert(`Ordering ${item.name}...`)}
                >
                  Order Now
                </button>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
