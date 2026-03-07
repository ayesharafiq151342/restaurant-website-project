"use client";

import { useState } from "react";
import ProductGrid from "../admin/ProductGrid";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export default function MenuPage({ visibleProducts }: any) {

  const [cart, setCart] = useState<Product[]>([]);

  // Add Order
  const handleOrder = (product: Product) => {
    setCart([...cart, product]);
  };

  // Total Price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="p-10">

      {/* Product Grid */}
      <ProductGrid
        products={visibleProducts}
        limit={6}
        onOrder={handleOrder}
      />

      {/* Total Price */}
      <div className="mt-10 flex justify-end">

        <span className="text-sm font-semibold">
          Rs {totalPrice}
        </span>

      </div>

    </div>
  );
}
