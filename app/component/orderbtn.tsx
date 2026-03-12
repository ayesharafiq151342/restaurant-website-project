"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

interface OrderButtonProps {
  productId: string;
}

export default function OrderButton({ productId }: OrderButtonProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleOrder = async () => {
    if (!user) {
      router.push(`/login?redirect=/user/order&productId=${productId}`);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          productId,
          quantity: 1,
        }),
      });

      const data = await res.json();
      console.log("Order Response:", data);

      if (!res.ok) throw new Error(data.message);

      alert("Order placed successfully ✅");
      router.push("/user/order");
    } catch (err: any) {
      console.error("Order Failed:", err.message);
      alert("Order failed ❌");
    }
  };

  return (
    <button
      onClick={handleOrder}
      className="bg-[var(--primary)] text-white px-4 py-2 rounded-md font-bold hover:opacity-90 transition"
    >
     Add to Cart
    </button>
  );
}
