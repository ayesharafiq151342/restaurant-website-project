"use client";

import { useEffect, useState } from "react";
import SidebarAdmin from "@/app/component/sidebar";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

// ✅ FIXED TYPE
interface User {
  _id: string;
  name: string;
  email: string;
}

interface Order {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  userId: User; // ✅ now includes _id
  createdAt: string;
  status?: "Received" | "Cooking" | "Ready";
}

export default function NotificationsPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/all");
      const data = await res.json();

      const updated = data.map((o: Order) => ({
        ...o,
        status: o.status || "Received",
      }));

      setOrders(updated);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Group Orders
const groupedOrders = orders.reduce((acc: any, order) => {
  const key = order.userId?.email || "Unknown User"; // fallback

  if (!acc[key]) {
    acc[key] = {
      name: order.userId?.name || "Unknown",
      email: order.userId?.email || "Unknown",
      userId: order.userId?._id || order._id, // fallback
      totalQuantity: 0,
      totalPrice: 0,
      items: [],
      status: order.status,
    };
  }

  acc[key].totalQuantity += order.quantity;
  acc[key].totalPrice += order.price * order.quantity;
  acc[key].items.push(order);

  return acc;
}, {});

  // ✅ Update Status (FIXED)
  const updateStatus = async (userId: string, newStatus: string) => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/orders/update-status",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, status: newStatus }), // ✅ FIXED
        }
      );

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: `Status updated to ${newStatus}`,
        });

        fetchOrders();
      } else {
        Swal.fire({
          icon: "error",
          title: data.message || "Error updating status",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Server error" });
    }
  };

  // ✅ View Orders Popup
  const handleViewUserOrders = (items: Order[]) => {
    const total = items.reduce(
      (sum, o) => sum + o.price * o.quantity,
      0
    );

    const html = `
      <div style="text-align:left">
        ${items
          .map(
            (o) => `
          <div style="
            display:flex;
            justify-content:space-between;
            padding:10px;
            margin-bottom:8px;
            border-radius:8px;
            background:#f9fafb;
          ">
            <div>
              <strong>${o.name}</strong><br/>
              <small>Qty: ${o.quantity}</small>
            </div>
            <div style="font-weight:bold; color:#16a34a">
              Rs ${o.price * o.quantity}
            </div>
          </div>
        `
          )
          .join("")}

        <hr style="margin:10px 0"/>

        <div style="
          display:flex;
          justify-content:space-between;
          font-size:16px;
          font-weight:bold;
        ">
          <span>Total</span>
          <span style="color:#4f46e5">Rs ${total}</span>
        </div>
      </div>
    `;

    Swal.fire({
      title: "🧾 Order Details",
      html,
      width: 500,
      confirmButtonText: "Close",
      confirmButtonColor: "#4f46e5",
    });
  };

  // ✅ Status Colors + Animations
  const statusColor = (status: string) => {
    if (status === "Received")
      return "bg-gray-100 text-gray-700 border-gray-300 animate-pulse";

    if (status === "Cooking")
      return "bg-yellow-100 text-yellow-700 border-yellow-300 animate-bounce";

    if (status === "Ready")
      return "bg-green-100 text-green-700 border-green-300 animate-pulse";

    return "";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarAdmin />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            🍽️ Order Management
          </h1>

          <span className="text-sm text-green-500 animate-pulse">
            ● Live Updates
          </span>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">All Orders</h2>
            <span className="text-sm text-gray-500">
              Total Users: {Object.values(groupedOrders).length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <tbody>
                {Object.values(groupedOrders).map(
                  (user: any, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-b"
                    >
                      <td className="py-4">{user.name}</td>
                      <td className="py-4">{user.email}</td>
                      <td className="py-4 text-center">
                        {user.totalQuantity}
                      </td>
                      <td className="py-4 text-center">
                        Rs {user.totalPrice}
                      </td>

                      <td className="py-4 text-center">
                        <motion.select
                          value={user.status}
                          onChange={(e) =>
                            updateStatus(user.userId, e.target.value) // ✅ FIXED
                          }
                          className={`px-4 py-1 rounded-full border ${statusColor(
                            user.status
                          )}`}
                        >
                          <option value="Received">Received</option>
                          <option value="Cooking">Cooking</option>
                          <option value="Ready">Ready</option>
                        </motion.select>
                      </td>

                      <td className="py-4 text-center">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                          onClick={() =>
                            handleViewUserOrders(user.items)
                          }
                        >
                          View
                        </button>
                      </td>
                    </motion.tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
