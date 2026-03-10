"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "./CartContext";
import { useAuth } from "../context/AuthContext";

interface Order {
  _id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  createdAt: string;
  image: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  const { cart } = useCart();

  // total cart items & price
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // total orders price
  const totalOrderPrice = orders.reduce((sum, order) => sum + order.price * order.quantity, 0);
  const totalPrice = totalCartPrice + totalOrderPrice;

  const menuItems = [
    { name: "Home", href: "/product-category/newarrivals" },
    { name: "About", href: "/product-category/mala" },
    { name: "Menu", href: "/product-category/rings" },
    { name: "Ordernow", href: "/product-category/bangles" },
  ];

  // fetch user orders
  const fetchOrders = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${user._id}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleSearch = () => {
    if (!search) return;
    router.push(`/product-category/${search.toLowerCase()}`);
    setSearch("");
    setSearchOpen(false);
  };

  return (
    <nav className="bg-[var(--accent)] text-white px-4 sm:px-6 md:px-8 py-4 flex items-center">
      {/* Logo */}
      <Link href="/jewellery" className="flex-shrink-0">
        <Image src="/logo.png" alt="HJ Jewellery" width={120} height={50} className="object-contain h-10 sm:h-12" />
      </Link>

      {/* Desktop menu */}
      <ul className="hidden md:flex gap-8 font-bangers uppercase text-xl lg:text-2xl tracking-wide ml-auto">
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

      {/* Desktop icons */}
      <div className="hidden md:flex items-center gap-6 ml-auto">
        {/* Search */}
        <div className="relative">
          <Search
            className="w-6 h-6 cursor-pointer hover:text-[var(--golden)] transition"
            onClick={() => setSearchOpen(!searchOpen)}
          />
          {searchOpen && (
            <div className="absolute top-12 right-0 w-60 bg-white p-3 shadow-lg rounded-md z-50">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border w-full px-3 py-2 text-sm mb-2 rounded-md text-black"
                placeholder="Search category"
              />
              <button
                onClick={handleSearch}
                className="w-full bg-[var(--golden)] text-white py-2 text-sm rounded-md"
              >
                Go
              </button>
            </div>
          )}
        </div>

        {/* User */}
        {user ? (
          <span className="font-semibold text-[var(--golden)]">
            Hello, {user.name || user.email.split("@")[0]} 👋
          </span>
        ) : (
          <Link href="/login">
            <User className="w-6 h-6 cursor-pointer hover:text-[var(--golden)] transition" />
          </Link>
        )}

        {/* ShoppingBag showing total items + total price */}
        <div
          className="relative cursor-pointer flex items-center gap-2"
          onClick={() => router.push("/user/order")}
        >
          <ShoppingBag className="w-6 h-6 hover:text-[var(--golden)] transition" />

          {/* Badge for number of cart items */}
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
              {totalItems}
            </span>
          )}

          {/* Total price for cart + orders */}
          {totalPrice > 0 && (
            <span className="ml-2 text-sm font-semibold hidden lg:inline">
              Rs {totalPrice.toFixed(0)}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
