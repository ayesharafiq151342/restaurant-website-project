"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, ShoppingBag, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { useCart } from "./CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "./OrderContext";

interface Order {
  _id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  status?: "Received" | "Cooking" | "Ready";
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { orders } = useOrders();
  const { cart } = useCart();

  const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalOrderItems = orders.reduce((sum, o) => sum + o.quantity, 0);
  const totalOrderPrice = orders.reduce((sum, o) => sum + o.price * o.quantity, 0);

  const totalItems = totalCartItems + totalOrderItems;
  const totalPrice = totalCartPrice + totalOrderPrice;

  const latestOrder = orders[orders.length - 1];
  const latestStatus = latestOrder?.status || null;

  const getStatusStyle = (status: string) => {
    if (status === "Received") return "bg-gray-100 text-gray-700";
    if (status === "Cooking") return "bg-yellow-100 text-yellow-700 animate-pulse";
    if (status === "Ready") return "bg-green-100 text-green-700";
    return "";
  };

  const menuItems = [
    { name: "Home", href: "/product-category/newarrivals" },
    { name: "About", href: "/product-category/mala" },
    { name: "Menu", href: "/product-category/rings" },
    { name: "Ordernow", href: "/product-category/bangles" },
  ];

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      logout();
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[var(--accent)] text-white px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
      {/* Logo */}
      <Link href="/jewellery" className="flex-shrink-0">
        <Image
          src="/logo.png"
          alt="HJ Jewellery"
          width={120}
          height={50}
          className="object-contain h-10 sm:h-12"
        />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 font-bangers uppercase text-xl lg:text-2xl tracking-wide">
        {menuItems.map((item, i) => (
          <li key={i}>
            <Link
              href={item.href}
              className={
                pathname === item.href
                  ? "text-[var(--golden)] font-bold"
                  : "hover:text-[var(--primary)] transition duration-300"
              }
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop User Section */}
      <div className="hidden md:flex items-center gap-4 ml-auto">
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-[var(--primary)] px-3 py-1 rounded-lg hover:bg-[var(--primary-hover)] transition shadow"
            >
              {latestStatus && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusStyle(latestStatus)}`}
                >
                  {latestStatus === "Received" && "📥 Received"}
                  {latestStatus === "Cooking" && "🍳 Cooking"}
                  {latestStatus === "Ready" && "✅ Ready"}
                </span>
              )}
              <span className="hidden sm:inline font-semibold">{user.name || user.email.split("@")[0]}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200 animate-fadeIn overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <span className="font-semibold">Hello, {user.name || user.email.split("@")[0]}!</span>
                </div>

                <div className="px-4 py-2 text-sm flex justify-between">
                  <span>Status:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusStyle(latestStatus || "")}`}>
                    {latestStatus === "Received" && "📥 Received"}
                    {latestStatus === "Cooking" && "🍳 Cooking"}
                    {latestStatus === "Ready" && "✅ Ready"}
                  </span>
                </div>

                <div className="px-4 py-2 text-sm flex justify-between">
                  <span>Total Items:</span>
                  <span>{totalItems}</span>
                </div>

                <div className="px-4 py-2 text-sm flex justify-between">
                  <span>Total Price:</span>
                  <span>Rs {totalPrice.toFixed(0)}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {!user && (
          <Link href="/login">
            <User className="w-6 h-6 cursor-pointer hover:text-[var(--golden)] transition" />
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-4">
        <button onClick={() => setMobileMenuOpen((prev) => !prev)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--accent)] text-white shadow-lg flex flex-col gap-2 py-3 md:hidden z-40">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="px-4 py-2 hover:bg-[var(--primary)] transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {user && (
            <div className="border-t border-gray-400 mt-2 pt-2 px-4 flex flex-col gap-2">
              <span className="font-semibold">{user.name || user.email.split("@")[0]}</span>
              {latestStatus && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusStyle(latestStatus)}`}>
                  {latestStatus === "Received" && "📥 Received"}
                  {latestStatus === "Cooking" && "🍳 Cooking"}
                  {latestStatus === "Ready" && "✅ Ready"}
                </span>
              )}
              <span>Total Items: {totalItems}</span>
              <span>Total Price: Rs {totalPrice.toFixed(0)}</span>
              <button
                onClick={handleLogout}
                className="text-red-600 py-1 hover:bg-[var(--primary-hover)] rounded transition"
              >
                Logout
              </button>
            </div>
          )}

          {!user && (
            <Link href="/login" className="px-4 py-2 hover:bg-[var(--primary)] transition">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
