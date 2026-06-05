"use client";

import { useState } from "react";
import Wrapper from "@/layouts/Wrapper";
import HomeOne from "@/components/homes/home-one";

// export const metadata = {
//   title: "Coming Soon",
// };

const PREDEFINED_PIN = "1234"; // Change this

export default function Home() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (pin === PREDEFINED_PIN) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid PIN");
    }
  };

  if (isAuthenticated) {
    return (
      <Wrapper>
        <HomeOne />
      </Wrapper>
    );
  }

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center">
      <div className="mb-6">
        <h1 className="text-5xl font-bold text-blue-600">Adshala</h1>
        <p className="text-gray-500 mt-2">Learning Without Limits</p>
      </div>

      <h2 className="text-2xl font-semibold mb-3">
        We're Launching Soon
      </h2>

      <p className="text-gray-600 mb-6">
        Adshala is building a modern learning platform designed to help
        students learn, grow, and achieve their academic goals.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter Access Code"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && (
          <p className="text-red-500 text-sm mb-4">
            Invalid access code
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-black py-3 rounded-lg font-medium transition"
        >
          Access Preview
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Adshala. All rights reserved.
      </div>
    </div>
  </div>
);
}