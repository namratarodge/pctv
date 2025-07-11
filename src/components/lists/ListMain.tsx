"use client";

import PlanCard from "@/components/forms/PlanCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../layout/Loading";
import { PlanFormValues } from "@/constants/Type";
import { LockClosedIcon, PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
type PricingProps = {
  step?: string;
  title: string;
  description?: string;
};

export default function ListMain() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/get-plans`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data;
        setData(modifiedData);
      }
    } catch (error) {
      console.log(error);
      toast("Error fetching data:");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const mapPlanToPlanCardProps = (plan: PlanFormValues) => {
    const parsedFeatures: string[] = [];

    if (Array.isArray(plan.features)) {
      plan.features.forEach((item) => {
        if (typeof item === "string") {
          try {
            // Try parsing as JSON array of strings
            const maybeArray = JSON.parse(item);
            if (Array.isArray(maybeArray)) {
              parsedFeatures.push(...maybeArray);
            } else {
              parsedFeatures.push(item);
            }
          } catch {
            // Not JSON, use as-is
            parsedFeatures.push(item);
          }
        }
      });
    }

    return {
      label: plan.name,
      price: `${plan.currency_symbol}${plan.amount}`,
      type: plan.interval,
      isHighlighted: plan.recommended,
      features: parsedFeatures.map((label) => ({ label })),
      onSelect: () => console.log(`${plan.name} selected`),
    };
  };

  return (
    <div className="px-6 py-12 sm:rounded-lg sm:px-12 mx-auto w-full ">
      <form action="#" method="POST" className="space-y-6">
        <div className="flex justify-between">
          <h2 className="text-3xl">Your List</h2>
          
          <Link href="/lists/new" className="bg-red-500 rounded-md px-4 py-2 text-white cursor-pointer hover:bg-red-400">
            New List
          </Link>
        </div>
        <div className="">
          <div className=" mx-auto bg-white shadow-lg rounded-lg p-4 flex items-center justify-between hover:shadow-xl transition border border-gray-200">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-gray-800">Inception</h2>
              <div className="flex items-center mt-3 space-x-2">
                <span className="gap-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <LockClosedIcon className="w-5 h-5"/>
                  Public
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-4">June 12, 2025</div>
            </div>
            <button className="text-gray-400 hover:text-blue-500 transition cursor-pointer">
              <PencilIcon className="w-5 h-5"/>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
