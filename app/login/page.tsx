"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import api from "@/utils/api";

export default function LoginPage() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [popup,setPopup] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // redirect after login
  const redirectTo = searchParams.get("redirect") || "/user";
  const productId = searchParams.get("productId");

  const { login } = useAuth();

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    try {

      const res = await api.post("/auth/login",{
        email,
        password
      });

      const userData = res.data.user;

      // save user in context
      login(userData);

      setPopup("Login Successful 🎉");

      setTimeout(()=>{

        if(productId){
          router.push(`${redirectTo}?productId=${productId}`);
        }else{
          router.push(redirectTo);
        }

      },1000);

    } catch(err:any){

      const message = err.response?.data?.message || "Login failed ❌";

      setPopup(message);

      setTimeout(()=>{
        setPopup("");
      },2000);

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

        {/* Left Section */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">

          <h1 className="text-4xl font-extrabold text-[var(--accent)]">
            🍔 Foodle
          </h1>

          <p className="text-gray-500 text-sm mb-8">
            Made with love ❤️
          </p>

          <h2 className="text-2xl font-bold mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-full bg-orange-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-full bg-orange-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />

            <button
              type="submit"
              className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition text-white py-3 rounded-full font-semibold shadow-lg"
            >
              Login
            </button>

            <p className="mt-4 text-sm text-gray-500">

              Don't have an account?{" "}

              <span
                onClick={()=>router.push("/register")}
                className="text-[var(--accent)] font-semibold cursor-pointer hover:underline"
              >
                Sign Up
              </span>

            </p>

          </form>

        </div>

        {/* Right Section */}
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