'use client';
import { useEffect, useState } from "react";
import axios from "axios";

// Define TypeScript type for order
interface Order {
  _id: string;
  name: string;
  image?: string;
  quantity: number;
  price: number;
  status: string;
  paymentStatus: string;
  pickupToken: string;
  createdAt: string;
}

const LatestOrderByUser = ({ userId }: { userId: string }) => {
  const [orders, setOrders] = useState<Order[]>([]); // <-- specify type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`/api/orders/${userId}`);
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!orders.length) return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 space-y-6">
      {orders.map((order) => (
        <div key={order._id} className="flex flex-col md:flex-row items-center md:items-start border p-4 rounded-lg shadow hover:shadow-lg transition">
          <img
            src={order.image || "/placeholder.png"}
            alt={order.name}
            className="w-32 h-32 object-cover rounded-md mr-0 md:mr-6 mb-4 md:mb-0"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold">{order.name}</h2>
            <p>Quantity: <span className="font-semibold">{order.quantity}</span></p>
            <p>Price: <span className="font-semibold">${order.price}</span></p>
            <p>Status: <span className="text-blue-600 font-semibold">{order.status}</span></p>
            <p>Payment: <span className="text-green-600 font-semibold">{order.paymentStatus}</span></p>
            <p>Pickup Token: <span className="text-orange-600 font-bold text-lg">{order.pickupToken}</span></p>
            <p className="text-gray-400 text-sm mt-1">Ordered on: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestOrderByUser;