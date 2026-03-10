"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../component/navbar";

interface Order {
  _id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  createdAt: string;
}

export default function UserOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const res = await fetch(`http://localhost:5000/api/orders/${user._id}`);
      const data = await res.json();
      setOrders(data.orders || []);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Orders Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Please login to view your orders
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
          Your Orders
        </h1>

        {loading && (
          <p className="text-center text-gray-500">Loading orders...</p>
        )}

        {!loading && orders.length === 0 && (
          <p className="text-center text-gray-500">No orders yet.</p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-4 flex gap-4 hover:shadow-lg transition"
            >
              <img
                src={`http://localhost:5000/uploads/${order.image}`}
                alt={order.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    {order.name}
                  </p>
                  <p className="text-gray-600 mt-1">
                    Price: <span className="font-medium">${order.price}</span>
                  </p>
                  <p className="text-gray-600 mt-1">
                    Quantity: <span className="font-medium">{order.quantity}</span>
                  </p>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Ordered At: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
