"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [popup, setPopup] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { email, password, role });
     setPopup("Registration Successful 🎉");

setTimeout(() => {
  router.push("/login"); // <-- redirect to login page
}, 2000);


 

    } catch (err: any) {
      const message = err.response?.data?.message || "Registration failed ❌";
      setPopup(message);

      setTimeout(() => {
        setPopup("");
      }, 2000);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#e9dcd6] overflow-hidden px-4">

      {/* Background Shapes */}
   <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[var(--primary)] rounded-br-[200px]"></div>
<div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[var(--accent)] rounded-tr-[200px]"></div>

{/* Right Side Shapes */}
<div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[var(--accent)] rounded-bl-[200px]"></div>
<div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[var(--primary)] rounded-tl-[200px]"></div>

      {/* Popup */}
      {popup && (
        <div className="absolute top-6 z-50 bg-white shadow-2xl px-6 py-4 rounded-2xl border-l-4 border-[var(--primary)] animate-bounce">
          <p className="text-gray-800 font-semibold">{popup}</p>
        </div>
      )}

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <div className="mb-10">
                              <h1 className="text-4xl font-extrabold text-[var(--accent)]">

              🍔 Foodle
            </h1>
            <p className="text-gray-500 text-sm">Made with love ❤️</p>
          </div>

          <h2 className="text-2xl font-bold mb-1">Create Account</h2>
          <p className="text-gray-500 mb-6">Register as User or Admin</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                         className="w-full px-5 py-3 rounded-full bg-orange-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
  />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                       className="w-full px-5 py-3 rounded-full bg-orange-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
           />

            {/* Role Dropdown */}
            <div className="relative w-full">
              <button
                type="button"
                className="w-full px-5 py-3 rounded-full bg-orange-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] flex justify-between items-center"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
                <svg
                  className={`w-4 h-4 text-orange-600 transform transition-transform duration-200 ${showDropdown ? "rotate-180" : "rotate-0"}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute mt-2 w-full bg-white border border-orange-200 rounded-xl shadow-lg z-20">
                  {["user", "admin"].map((r) => (
                    <div
                      key={r}
                      className="px-5 py-3 hover:bg-orange-100 cursor-pointer rounded-xl"
                      onClick={() => {
                        setRole(r);
                        setShowDropdown(false);
                        setPopup(`Role set to ${r.charAt(0).toUpperCase() + r.slice(1)}`);
                        setTimeout(() => setPopup(""), 2000);
                      }}
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
                          className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition text-white py-3 rounded-full font-semibold shadow-lg"
     >
              Sign Up
            </button>
          </form>
        </div>

        {/* RIGHT */}
               <div className="hidden md:flex w-1/2 bg-[var(--primary)] items-center justify-center">
    <img
            src="/burger.png"
            alt="Burger"
            className="w-[85%] drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
