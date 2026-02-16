"use client";

import { useState } from "react";
import Image from "next/image";

export default function SignInPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can call your backend or API to send a verification code
    alert(`Verification code sent to ${email}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/jewllery/logo-removebg-preview.png"
            alt="Nayab Jewellery Logo"
            width={120}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-2">Sign In</h1>
        <p className="text-center text-gray-500 mb-6">
          Sign in or create an account
        </p>

        {/* Social Login */}
        <div className="flex flex-col gap-3 mb-6">
          <button className="w-full py-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
            <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
            Sign in with Google
          </button>
          <button className="w-full py-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
            <Image src="/icons/facebook.svg" alt="Facebook" width={20} height={20} />
            Sign in with Facebook
          </button>
        </div>

        <div className="flex items-center mb-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Email Login */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Continue
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          By continuing, you agree to Nayab Jewellery's{" "}
          <a href="#" className="text-black underline">Terms of Service</a> and{" "}
          <a href="#" className="text-black underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
