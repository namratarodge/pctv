"use client";

import { TransactionType } from "@/constants/Type";
import { formatDate } from "@/utils/common";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

export const accountSettingsLinks = [
  {
    name: "View payment History",
    href: "/account?name=payment_history",
    icon: AdjustmentsHorizontalIcon,
  },
];

function SubscriptionTableSkeleton() {
  return (
    <table className="min-w-full divide-y divide-gray-100 text-sm text-left">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 font-semibold text-gray-600">Plan</th>
          <th className="px-6 py-3 font-semibold text-gray-600">Gateway</th>
          <th className="px-6 py-3 font-semibold text-gray-600">Trial Ends</th>
          <th className="px-6 py-3 font-semibold text-gray-600">Status</th>
          <th className="px-6 py-3 font-semibold text-gray-600">Created</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {[...Array(5)].map((_, index) => (
          <tr className="bg-white hover:bg-gray-50" key={index}>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <td className="px-6 py-3" key={i}>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Payment_history() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions/user`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data.status) {
        setData(response.data.data);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white text-black max-w-3xl mx-auto ">
        <div className="px-2 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            Payment History
          </h2>
          <p className="text-sm text-gray-500">Active & past subscriptions</p>
        </div>
        {loading ? (
          <SubscriptionTableSkeleton />
        ) : (
          <table className="min-w-full divide-y divide-gray-100 text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-600">
                  Payment Type
                </th>
                <th className="px-6 py-3 font-semibold text-gray-600">
                  Amount
                </th>
                <th className="px-6 py-3 font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 font-semibold text-gray-600">
                  Payment Method
                </th>
                <th className="px-6 py-3 font-semibold text-gray-600">
                  Paid At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length > 0 ? (
                data.map((item: TransactionType, index) => (
                  <tr
                    key={index}
                    className="bg-white text-left hover:bg-gray-50"
                  >
                    <td className="px-6 py-3 text-gray-800">
                      {item.type || "-"}
                    </td>
                    <td className="px-6 py-3 text-gray-800">
                      £{parseFloat(item.amount.$numberDecimal).toFixed(2)}
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold capitalize ${
                          item.status === "paid"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-600 capitalize text-center">
                      {item.payment_method || "-"}
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      {formatDate(item.paid_at)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-6 py-4 text-gray-500 text-center"
                    colSpan={6}
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
