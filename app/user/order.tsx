"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../component/navbar";
import api from "@/utils/api"; // optional axios instance

export default function UserOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch(`http://localhost:5000/api/orders/${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.orders);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) return <p className="p-6">Please login to view your orders</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

        {loading && <p>Loading orders...</p>}

        {!loading && orders.length === 0 && (
          <p>You have not placed any orders yet.</p>
        )}

        {orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 rounded-lg mb-4 shadow-sm bg-white"
          >
            <p>
              <span className="font-semibold">Product ID:</span> {order.productId}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span> {order.quantity}
            </p>
            <p>
              <span className="font-semibold">Ordered At:</span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
