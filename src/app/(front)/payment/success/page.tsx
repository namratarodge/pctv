'use client'
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PaymentSuccess() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetch = async () => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout-session?session_id=${sessionId}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
      toast("Error fetching data:");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  
  return (
    <div className="pt-18 max-w-11/12 mx-auto flex flex-col lg:flex-row mb-10">
      <div className="w-full  text-white shadow-lg rounded-2xl p-8 text-center">
        <div className="text-green-500 mb-4">
          <CheckBadgeIcon className="w-20 h-20 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>
        <p className="mb-6">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        <Link
          href="/home"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}