"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import Image from "next/image";
import { useCart } from "./CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth(); // get logged-in user
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

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

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-[var(--accent)] text-white px-4 sm:px-6 md:px-8 py-4 flex items-center">
        {/* LOGO */}
        <Link href="/jewellery" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="HJ Jewellery"
            width={120}
            height={50}
            className="object-contain h-10 sm:h-12"
          />
        </Link>

        {/* DESKTOP MENU */}
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

        {/* DESKTOP ICONS */}
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

          {/* Cart */}
          <div
            className="relative cursor-pointer flex items-center gap-2"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="w-6 h-6 hover:text-[var(--golden)] transition" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
            <span className="text-sm font-semibold hidden lg:inline">
              Rs {totalPrice}
            </span>
          </div>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="ml-auto md:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-7 h-7 text-[var(--primary)]" />
        </button>
      </nav>

      {/* MOBILE SIDEBAR */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 bg-white p-6 h-full">
            <button
              className="mb-6 flex justify-end w-full"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-7 h-7" />
            </button>

            {/* Mobile Search */}
            <div className="mb-6">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border w-full px-3 py-2 text-sm rounded-md mb-3"
                placeholder="Search category"
              />
              <button
                onClick={handleSearch}
                className="w-full bg-[var(--golden)] text-white py-2 text-sm rounded-md"
              >
                Go
              </button>
            </div>

            {/* Mobile Menu */}
            <ul className="space-y-6 uppercase text-xl font-bangers tracking-wide">
              {menuItems.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={
                      pathname === item.href
                        ? "text-[var(--golden)] font-bold"
                        : "hover:text-[var(--primary)] transition"
                    }
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Cart & Profile */}
            <div className="mt-10 flex items-center gap-6">
              {user ? (
                <span className="font-semibold text-[var(--accent)]">
                  Hello, {user.name || user.email.split("@")[0]} 👋
                </span>
              ) : (
                <Link href="/login">
                  <User className="w-6 h-6 cursor-pointer" />
                </Link>
              )}

              <div
                className="relative cursor-pointer flex items-center gap-2"
                onClick={() => {
                  setCartOpen(true);
                  setMobileOpen(false);
                }}
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
                <span className="text-sm font-semibold">Rs {totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
