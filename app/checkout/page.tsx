"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrders } from "../component/OrderContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../component/navbar";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const { orders } = useOrders();
  const { user } = useAuth();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("bank");

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/checkout");
    }
  }, [user, router]);

  const subtotal = orders.reduce((sum, o) => sum + o.price * o.quantity, 0);
  const shipping = 4;
  const total = subtotal + shipping;
const handleCheckout = async () => {
  if (!user) return alert("Login first!");

  // ✅ Cash on Delivery
  if (paymentMethod === "cod") {

    Swal.fire({
      icon: "success",
      title: "Order Placed Successfully 🎉",
      text: "Thank you! You will pay when your order arrives.",
      confirmButtonColor: "var(--primary)",
    });

    return;
  }

  // ✅ Stripe Payment
  try {
    const res = await fetch(
      "http://localhost:5000/api/payment/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      }
    );

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }

  } catch (err) {
    console.error(err);
  }
};



  return (<><Navbar />
   <div className="min-h-screen grid md:grid-cols-2">

  {/* LEFT SIDE DESIGN */}
  <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-red-500 to-ted-400">

    <img
      src="/checkout.jpg"
      alt="Donut"
      className=" h-[950px] "
    />

  </div>


  {/* RIGHT SIDE CHECKOUT */}
  <div className="flex items-center justify-center p-6 bg-gray-100">

    <div className="max-w-md w-full bg-white p-6 rounded-lg shadow">

      <h2 className="text-2xl font-semibold mb-4">Your Order</h2>

      {/* Orders */}
      {orders.map((o) => (
        <div key={o._id} className="flex items-center gap-4 mb-4">
          
          <img
            src={`http://localhost:5000/uploads/${o.image}`}
            alt={o.name}
            className="w-16 h-16 rounded-full object-cover"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{o.name}</h3>
            <p className="text-gray-500">
              ${o.price} × {o.quantity}
            </p>
          </div>
        </div>
      ))}

      <hr className="my-4" />

      {/* Price */}
      <div className="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span>${subtotal}</span>
      </div>

      <div className="flex justify-between text-gray-600 mt-2">
        <span>Shipping Cost</span>
        <span>${shipping}</span>
      </div>

      <div className="flex justify-between font-semibold text-lg mt-2">
        <span>Total</span>
        <span>${total}</span>
      </div>

      <hr className="my-4" />

      {/* Payment */}
      <h3 className="text-xl font-semibold mb-3">Payment Method</h3>

      <div className="space-y-2">

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={paymentMethod === "bank"}
            onChange={() => setPaymentMethod("bank")}
          />
          Direct bank transfer
        </label>

 
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          Cash on delivery
        </label>

      </div>

     {/* Pay Now button */} <button onClick={handleCheckout} className="mt-6 w-full bg-[var(--golden)] text-white px-6 py-3 rounded hover:opacity-90 transition" > Pay Now </button>

    </div>

  </div>

</div></>

  );
}

