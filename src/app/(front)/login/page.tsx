"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        return toast("Your Email id and Password is not correct");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      if (data.user.userType === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      toast("Error during login:" + error);
    }
  }

  return (
    <>
      <div
        className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 h-screen "
        style={{
          backgroundImage: 'url("/bg-login-page.jpg")',
        }}
      >
        <div className="mt-5 sm:mx-auto sm:w-full lg:w-1/4 ">
          <div className="bg-white/1 backdrop-blur-md border border-white/20 px-5 py-10 shadow-xl sm:rounded-xl sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-white text-2xl">Log In</h2>
              <p className="text-gray-200 text-sm">
                Log in to access all PCTV Session hosted by experienced industry
                professionals.
              </p>
              <div>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    placeholder="Email address"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:-outline-offset-2  sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="block w-full rounded-lg bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:-outline-offset-2  sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm/6 mx-auto ">
                  <Link
                    href="/forgot-password"
                    className="font-semibold text-gray-500 hover:text-white"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-full cursor-pointer bg-[#f44336] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Log In
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-300">
              Don not have an account? 
              <Link
                href="register"
                className="font-semibold text-red-400 hover:text-red-500 px-2"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
