"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface OrderButtonProps {
  productId: string;
}

export default function OrderButton({ productId }: OrderButtonProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Ensure component only renders on client to avoid SSR mismatch
  useEffect(() => setMounted(true), []);

  const handleOrder = async () => {
    if (!user) {
      // Redirect to login and include redirect URL + productId
      router.push(`/login?redirect=/user/order&productId=${productId}`);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, productId, quantity: 1 }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      const data = await res.json();
      console.log("Order placed:", data);

      // Redirect to the user's orders page
      router.push("/user/order");
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleOrder}
      className="bg-[var(--primary)] text-white px-4 py-2 rounded-md font-bold hover:opacity-90 transition"
    >
      Order Now
    </button>
  );
}
