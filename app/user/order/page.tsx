"use client";

import { motion } from "framer-motion";
import Navbar from "../../component/navbar";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../component/OrderContext";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function UserOrders() {

  const { user } = useAuth();
  const { orders, increaseQty, decreaseQty, deleteOrder } = useOrders();

  const subtotal = orders.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 4;
  const total = subtotal + shipping;

  return (
<div className="bg-gray-50 min-h-screen">
<Navbar />

{/* Hero Section */}
<div className="relative w-full h-[250px] md:h-[350px]">

<img
src="/iedera.jpg"
alt="Food Banner"
className="w-full h-full object-cover"
/>

<div className="absolute inset-0 bg-gradient-to-r from-[#4c0a06]/90 to-[#4c0a06]/60"></div>

<motion.div
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
>

<h1 className="text-2xl md:text-5xl font-bold mb-3">
Delicious Food, Happy Mood
</h1>

<p className="text-sm md:text-xl max-w-xl">
"Good food is the foundation of genuine happiness."
</p>

</motion.div>

</div>

{/* Main Layout */}

<div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-8">

{/* Cart Table */}

<motion.div
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.7 }}
className="md:col-span-2 p-4 md:p-6 rounded-lg shadow bg-white"
>

<div className="overflow-x-auto">

<table className="w-full text-left min-w-[500px]">

<thead className="border-b">

<tr className="text-gray-600 text-sm">

<th className="pb-3">Product</th>
<th>Price</th>
<th>Quantity</th>
<th>Total</th>
<th></th>

</tr>

</thead>

<tbody>

{orders.map((order, index) => (

<motion.tr
key={order._id}
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.1 }}
className="border-b"
>

<td className="flex items-center gap-3 py-4">

<img
src={`http://localhost:5000/uploads/${order.image}`}
className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
/>

<span className="font-semibold text-gray-800 text-sm md:text-base">
{order.name}
</span>

</td>

<td className="text-sm md:text-base">{order.price}</td>

<td>

<div className="flex items-center gap-2 md:gap-3">

<button
onClick={() => decreaseQty(order._id)}
className="px-2 border rounded hover:bg-gray-100"
>
-
</button>

{order.quantity}

<button
onClick={() => increaseQty(order._id)}
className="px-2 border rounded hover:bg-gray-100"
>
+
</button>

</div>

</td>

<td className="font-semibold text-sm md:text-base">
Rs  {order.price * order.quantity}
</td>

<td>

<button
onClick={() => deleteOrder(order._id)}
className="text-gray-400 hover:text-red-500"
>

<Trash2 size={18} />

</button>

</td>

</motion.tr>

))}

</tbody>

</table>

</div>

{/* Coupon */}

<div className="flex flex-col sm:flex-row gap-3 mt-6">




</div>

</motion.div>

{/* Cart Total */}

<motion.div
initial={{ opacity: 0, x: 50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.7 }}
className="bg-white p-6 rounded-lg shadow h-fit"
>

<h2 className="text-lg md:text-xl font-bold mb-6">
Cart Total
</h2>

<div className="flex justify-between mb-3 text-gray-600 text-sm md:text-base">
<span>Item(s) Subtotal</span>
<span>Rs  {subtotal}</span>
</div>

<div className="flex justify-between mb-3 text-gray-600 text-sm md:text-base">
<span>Shipping Cost</span>
<span>Rs  {shipping}</span>
</div>

<div className="flex justify-between font-bold text-lg border-t pt-3">
<span>Order Total</span>
<span>Rs  {total}</span>
</div>
<Link href="/checkout">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="w-full mt-6 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white py-3 rounded-full font-semibold"
  >
    PROCEED TO CHECKOUT
  </motion.button>
</Link>

</motion.div>

</div>

</div>
);
}