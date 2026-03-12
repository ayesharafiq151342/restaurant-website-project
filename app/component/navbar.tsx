"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "./CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "./OrderContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth(); // use the logout from context
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { orders } = useOrders();
  const { cart } = useCart();

  // total cart items & price
  const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // total orders items & price
  const totalOrderItems = orders.reduce((sum, o) => sum + o.quantity, 0);
  const totalOrderPrice = orders.reduce((sum, o) => sum + o.price * o.quantity, 0);

  const totalItems = totalCartItems + totalOrderItems;
  const totalPrice = totalCartPrice + totalOrderPrice;

  const menuItems = [
    { name: "Home", href: "/product-category/newarrivals" },
    { name: "About", href: "/product-category/mala" },
    { name: "Menu", href: "/product-category/rings" },
    { name: "Ordernow", href: "/product-category/bangles" },
  ];

  const handleSearch = () => {
    if (!search) return;
    router.push(`/product-category/${search.toLowerCase()}`);
    setSearch("");
    setSearchOpen(false);
  };

const handleLogout = async () => {
  try {
    // Call backend logout to clear cookies
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    logout(); // clear user from context + localStorage
    router.push("/"); // <-- redirect to home page after logout
  } catch (err) {
    console.error("Logout error:", err);
  }
};

  return (
    <nav className="bg-[var(--accent)] text-white px-4 sm:px-6 md:px-8 py-4 flex items-center">
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
        

        {/* User */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[var(--golden)]">
              Hello, {user.name || user.email.split("@")[0]} 👋
            </span><div
    className="relative cursor-pointer ml-5 flex items-center gap-2"
    onClick={() => router.push("/user/order")}
  >
    <ShoppingBag className="w-6 h-6 hover:text-[var(--golden)] transition" />

    {/* Total Items */}
    {totalItems > 0 && (
      <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
        {totalItems}
      </span>
    )}

    {/* Total Price */}
    {totalPrice > 0 && (
      <span className="ml-2 text-sm font-semibold hidden lg:inline">
        Rs {totalPrice.toFixed(0)}
      </span>
    )}
  </div>
            <button
              onClick={handleLogout}
              className="text-sm bg-[var(--primary)] px-3 py-1 ml-5 rounded hover:bg-[var(--primary-hover)] "
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login">
            <User className="w-6 h-6 cursor-pointer hover:text-[var(--golden)] transition" />
          </Link>
        )}

 {/* ShoppingBag showing total items + total price */}


      </div>
    </nav>
  );
}
