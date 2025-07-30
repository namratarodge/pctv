"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Something went wrong.");
      } else {
        toast.success("Password reset link sent. Check your email.");
        setEmail("");
      }
    } catch (error) {
      toast.error("Failed to send reset email. Try again later.");
      console.error("Forgot Password Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 h-screen"
      style={{
        backgroundImage: 'url("/bg-login-page.jpg")',
      }}
    >
      <div className="mt-5 sm:mx-auto sm:w-full lg:w-1/4">
        <div className="bg-white/1 backdrop-blur-md border border-white/20 px-5 py-10 shadow-xl sm:rounded-xl sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-white text-2xl">Forgot Password</h2>
            <p className="text-gray-200 text-sm">
              Enter your email and we’ll send you a password reset link.
            </p>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 sm:text-sm/6"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-full cursor-pointer bg-[#f44336] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <p className="mt-10 text-center text-sm/6 text-gray-300">
            
              <Link
                href="/login"
                className="font-semibold text-red-400 hover:text-red-500 px-2"
              >
                Back to Login
              </Link>
            </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}