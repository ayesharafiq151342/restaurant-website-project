"use client";

import { useRouter } from "next/navigation";

export default function Cancel() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-lg shadow text-center max-w-md">

        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Payment Cancelled ❌
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was not completed. You can try again or continue shopping.
        </p>

        <button
          onClick={() => router.push("/")}
          className="bg-[var(--golden)] text-white px-6 py-3 rounded hover:opacity-90 transition"
        >
          Back to Home
        </button>

      </div>

    </div>
  );
}
