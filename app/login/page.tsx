"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/utils/api";

interface LoginProps {
  mode?: "login" | "signup"; // default is login
}

export default function AuthForm({ mode = "login" }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [popup, setPopup] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/signup";
      const res = await api.post(endpoint, { email, password });
      const role = res.data.user.role;

      setPopup(`${mode === "login" ? "Login" : "Signup"} Successful 🎉`);

      setTimeout(() => {
        if (mode === "login") {
          role === "admin" ? router.push("/admin") : router.push("/user");
        } else {
          router.push("/user"); // After signup, always go to user dashboard
        }
      }, 2000);

    } catch (err: any) {
      const message = err.response?.data?.message || `${mode} failed ❌`;
      setError(message);
      setPopup(message);

      setTimeout(() => setPopup(""), 2000);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#e9dcd6] overflow-hidden px-4">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[var(--primary)] rounded-br-[200px]"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[var(--accent)] rounded-tr-[200px]"></div>
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
        {/* Left */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-[var(--accent)]">🍔 Foodle</h1>
          <p className="text-gray-500 text-sm mb-8">Made with love ❤️</p>
          <h2 className="text-2xl font-bold mb-6">{mode === "login" ? "Login" : "Sign Up"}</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Enter Email Id"
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
            <button
              type="submit"
              className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition text-white py-3 rounded-full font-semibold shadow-lg"
            >
              {mode === "login" ? "Login" : "Sign Up"}
            </button>{/* Inside the Left Card, below the form */}
<p className="mt-4 text-sm text-gray-500">
  {mode === "login" ? (
    <>
      Don't have an account?{" "}
      <span
        onClick={() => router.push("/register")} // or set mode if same page
        className="text-[var(--accent)] font-semibold cursor-pointer hover:underline"
      >
        Sign Up
      </span>
    </>
  ) : (
    <>
      Already have an account?{" "}
      <span
        onClick={() => router.push("/login")}
        className="text-[var(--accent)] font-semibold cursor-pointer hover:underline"
      >
        Login
      </span>
    </>
  )}
</p>

          </form>
        </div>

        {/* Right */}
        <div className="hidden md:flex w-1/2 bg-[var(--primary)] items-center justify-center">
          <img src="/burger.png" alt="Burger" className="w-[85%] drop-shadow-2xl" />
        </div>
      </div>
    </div>
  );
}
