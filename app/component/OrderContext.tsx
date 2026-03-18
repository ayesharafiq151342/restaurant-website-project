"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface Order {
  _id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  status?: "Received" | "Cooking" | "Ready"; // ✅ Add status
  createdAt: string;
}

interface OrderContextType {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  fetchOrders: () => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  deleteOrder: (id: string) => void;
  grandTotal: number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  // ✅ Fetch orders for current user (with status)
  const fetchOrders = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${user._id}`);
      const data = await res.json();
      // Map to ensure status exists
      const updated = (data.orders || []).map((o: Order) => ({
        ...o,
        status: o.status || "Received",
      }));
      setOrders(updated);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Poll orders every 5s to reflect admin updates
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [user]);

  const updateQuantityBackend = async (id: string, qty: number) => {
    try {
      await fetch(`http://localhost:5000/api/orders/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: qty }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const increaseQty = (id: string) => {
    const order = orders.find((o) => o._id === id);
    if (!order) return;
    const newQty = order.quantity + 1;
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, quantity: newQty } : o))
    );
    updateQuantityBackend(id, newQty);
  };

  const decreaseQty = (id: string) => {
    const order = orders.find((o) => o._id === id);
    if (!order || order.quantity <= 1) return;
    const newQty = order.quantity - 1;
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, quantity: newQty } : o))
    );
    updateQuantityBackend(id, newQty);
  };

  const deleteOrder = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${id}`, { method: "DELETE" });
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const grandTotal = orders.reduce(
    (sum, o) => sum + o.price * o.quantity,
    0
  );

  return (
    <OrderContext.Provider
      value={{ orders, setOrders, fetchOrders, increaseQty, decreaseQty, deleteOrder, grandTotal }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used inside OrderProvider");
  return context;
};
