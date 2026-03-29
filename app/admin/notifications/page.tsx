"use client";
import { useEffect, useState } from "react";
import SidebarAdmin from "@/app/component/sidebar";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

// ✅ TYPES
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
  userId: User;
  createdAt: string;
  status?: "Received" | "Cooking" | "Ready";
}

export default function NotificationsPage() {
  const [orders, setOrders] = useState<Order[]>([]);

const router = useRouter();
const { user } = useAuth();
  // ✅ Fetch Orders
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
  if (!user) return;

  if (user.role !== "admin") {
    router.push("/user"); // ❌ block user
  }
}, [user]);
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Group Orders by User
  const groupedOrders = orders.reduce((acc: any, order) => {
    const key = order.userId?.email || "Unknown";

    if (!acc[key]) {
      acc[key] = {
        name: order.userId?.name || "Unknown",
        email: order.userId?.email || "Unknown",
        userId: order.userId?._id || order._id,
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

  // ✅ Update Status
  const updateStatus = async (userId: string, newStatus: string) => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/orders/update-status",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, status: newStatus }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: `Status updated to ${newStatus}`,
          timer: 1200,
          showConfirmButton: false,
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

  // ✅ View Orders Popup (Premium UI)
  const handleViewUserOrders = (items: Order[]) => {
    const total = items.reduce(
      (sum, o) => sum + o.price * o.quantity,
      0
    );

    const html = `
      <div style="font-family:sans-serif; text-align:left">

        <h3 style="margin-bottom:10px; font-size:18px;">🛒 Order Items</h3>

        ${items
          .map(
            (o) => `
          <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding:12px;
            margin-bottom:10px;
            border-radius:12px;
            background:linear-gradient(to right,#f9fafb,#f3f4f6);
            box-shadow:0 2px 6px rgba(0,0,0,0.05);
          ">
            <div>
              <strong style="font-size:15px">${o.name}</strong><br/>
              <small style="color:#6b7280">Qty: ${o.quantity}</small>
            </div>

            <div style="
              font-weight:bold;
              font-size:15px;
              color:#16a34a;
            ">
              Rs ${o.price * o.quantity}
            </div>
          </div>
        `
          )
          .join("")}

        <div style="
          margin-top:15px;
          padding-top:10px;
          border-top:2px dashed #ddd;
          display:flex;
          justify-content:space-between;
          font-size:18px;
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
      width: 520,
      background: "#ffffff",
      confirmButtonText: "Close",
      confirmButtonColor: "#4f46e5",
      customClass: {
        popup: "rounded-2xl",
      },
    });
  };

  // ✅ Status Styles
  const statusColor = (status: string) => {
    if (status === "Received")
      return "bg-gray-100 text-gray-700 border-gray-300 animate-pulse";

    if (status === "Cooking")
      return "bg-yellow-100 text-yellow-700 border-yellow-300 animate-[bounce_1.5s_infinite]";

    if (status === "Ready")
      return "bg-green-100 text-green-700 border-green-300 shadow-md";

    return "";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <SidebarAdmin />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            🍽️ Order Management
          </h1>

          <span className="text-sm bg-green-100 text-[var(--primary)] px-4 py-1 rounded-full animate-pulse">
            ● Live Updates
          </span>
        </div>

        {/* Table */}
        <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-6 bg-[var(--primary)] px-6 py-3 rounded-xl shadow-md">
  
  <h2 className="text-2xl font-bold text-white tracking-wide">
    All Orders
  </h2>

  <span className="text-sm bg-white/20 text-white px-4 py-1 rounded-full backdrop-blur-sm">
    👥 {Object.values(groupedOrders).length} Users
  </span>

</div>


          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-3 text-left">User</th>
                  <th className="py-3 text-left">Email</th>
                  <th className="py-3 text-center">Items</th>
                  <th className="py-3 text-center">Total</th>
                  <th className="py-3 text-center">Status</th>
                  <th className="py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {Object.values(groupedOrders).map(
                  (user: any, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.01 }}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="py-4 font-semibold text-gray-800">
                        {user.name}
                      </td>

                      <td className="py-4 text-gray-600">
                        {user.email}
                      </td>

                      <td className="py-4 text-center font-medium">
                        {user.totalQuantity}
                      </td>

                      <td className="py-4 text-center font-bold text-green-600">
                        Rs {user.totalPrice}
                      </td>

                      <td className="py-4 text-center">
                        <select
                          value={user.status}
                          onChange={(e) =>
                            updateStatus(
                              user.userId,
                              e.target.value
                            )
                          }
                          className={`px-4 py-1 rounded-full border text-sm font-semibold ${statusColor(
                            user.status
                          )}`}
                        >
                          <option value="Received">
                            🧾 Received
                          </option>
                          <option value="Cooking">
                            🍳 Cooking
                          </option>
                          <option value="Ready">
                            ✅ Ready
                          </option>
                        </select>
                      </td>

                      <td className="py-4 text-center">
                        <button
                          className="bg-gradient-to-r bg-[var(--primary)] text-white px-4 py-1 rounded-full shadow hover:scale-105 transition-all"
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
