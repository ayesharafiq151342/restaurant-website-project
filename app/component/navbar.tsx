"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, ChevronDown, Menu, X } from "lucide-react";
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
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
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
    <nav className="fixed top-0 left-0 w-full bg-[var(--accent)] text-white px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between z-[9999] shadow-md">
      
      {/* Logo */}
      <Link href="/" className="flex-shrink-0">
        <Image
          src="/logo.png"
          alt="HJ Jewellery"
          width={120}
          height={50}
          className="object-contain h-10 sm:h-12"
        />
      </Link>

      {/* ✅ Center Menu */}
      <ul className="hidden md:flex gap-8 font-bangers uppercase text-xl lg:text-2xl tracking-wide absolute left-1/2 transform -translate-x-1/2">
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

      {/* Right Side */}
      <div className="hidden md:flex items-center gap-4 ml-auto">
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-[var(--primary)] px-3 py-1 rounded-lg hover:bg-[var(--primary-hover)] transition shadow"
            >
              {latestStatus && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusStyle(latestStatus)}`}>
                  {latestStatus === "Received" && "📥 Received"}
                  {latestStatus === "Cooking" && "🍳 Cooking"}
                  {latestStatus === "Ready" && "✅ Ready"}
                </span>
              )}
              <span className="hidden sm:inline font-semibold">
                {user.name || user.email.split("@")[0]}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  Hello, {user.name || user.email.split("@")[0]}!
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
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {!user && (
          <Link href="/login">
            <User className="w-6 h-6 cursor-pointer hover:text-[var(--golden)]" />
          </Link>
        )}
      </div>

      {/* Mobile Button */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen((prev) => !prev)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--accent)] flex flex-col md:hidden">
          {menuItems.map((item, i) => (
            <Link key={i} href={item.href} className="px-4 py-2">
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}