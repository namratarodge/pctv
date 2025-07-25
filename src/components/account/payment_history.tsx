"use client";

import { SubscriptionType } from "@/constants/Type";
import { formatDate } from "@/utils/common";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoadingForm } from "../layout";

export const accountSettingsLinks = [
  {
    name: "View payment History",
    href: "/account?name=payment_history",
    icon: AdjustmentsHorizontalIcon,
  },
];

export default function Payment_history() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/user`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast("Error fetching data:");
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-white text-black max-w-3xl mx-auto ">
        <div className="px-2 py-4 border-b border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-800">
            Payment History
          </h2>
          <p className="text-sm text-gray-500">Active & past subscriptions</p>
        </div>
        {loading ? (
          <LoadingForm />
        ) : (
          <table className="min-w-full divide-y divide-gray-100 text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-600">Plan</th>
                <th className="px-6 py-3 font-semibold text-gray-600">
                  Gateway
                </th>
                <th className="px-6 py-3 font-semibold text-gray-600">
                  Trial Ends
                </th>
                <th className="px-6 py-3 font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 font-semibold text-gray-600">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Example row */}

              {data.map((item: SubscriptionType, index) => (
                <tr className="bg-white text-left hover:bg-gray-50" key={index}>
                  <td className="px-6 py-3 text-gray-800">
                    {item.plan_id.name} : {item.plan_id.amount} {item.plan_id.currency}
                  </td>
                  <td className="px-6 py-3 text-gray-600">{item.gateway_name}</td>
                  <td className="px-6 py-3 text-gray-600">
                    {formatDate(item.trial_ends_at)}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {item.trial_ends_at && "Trial Data"}
                  </td>
                  <td className="px-6 py-3 text-gray-600">{formatDate(item.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
