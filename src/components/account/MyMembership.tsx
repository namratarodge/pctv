"use client";

import { formatDate, getTrialDaysLeft } from "@/utils/common";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MyMembership() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const responseData = response.data.data.data[0];
      setData(responseData);

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
      {loading ? (
        <div className="bg-gray-100 mt-4 sm:mt-6 p-4 sm:p-6 rounded-lg space-y-3 sm:space-y-4 animate-pulse">
          <div className="h-5 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      ) : (
        <div className="bg-gray-100 mt-4 sm:mt-6 p-4 sm:p-6 rounded-lg space-y-3 sm:space-y-4">
          <h2>
            {data?.plan_id?.name}
            {data?.trial_ends_at && (
              <span className="ml-4 border border-red-400 text-red-400 px-2 py-1 rounded-full text-xs">
                {getTrialDaysLeft(data.trial_ends_at)} days Free Trial left
              </span>
            )}
          </h2>
          <p>Next Payment {formatDate(data?.trial_ends_at)} </p>

          <Link
            href={"/pricing"}
            className=" py-3 flex justify-between border-t border-gray-300 cursor-pointer"
          >
            <div className="flex gap-2 text-sm">Change Membership</div>
            <ChevronRightIcon className="w-5" />
          </Link>
        </div>
      )}
    </>
  );
}
