"use client";

import PlanCard from "@/components/forms/PlanCard";
import { PlanFormValues } from "@/constants/Type";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../layout/Loading";

export default function Pricing() {
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
        },
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
      plan_id: plan._id,
      label: plan.name,
      price: `US${plan.currency_symbol} ${plan.amount}`,
      type: plan.interval,
      interval_count: plan.interval_count,
      paypal_id: plan.paypal_id,
      isHighlighted: plan.name === "Monthly",
      // isHighlighted: false,
      features: parsedFeatures.map((label) => ({ label })),
      onSelect: () => console.log(`${plan.name} selected`),
    };
  };

  return (
    <div className="px-6 sm:rounded-lg sm:px-12 space-y-6">
      <h2 className="mt-3 line-clamp-3 text-left text-4xl font-bold tracking-tight text-gray-800 w-2/3 capitalize leading-tight">
        Change Plan
      </h2>
      <p>
        Try out a new plan. You can alwasy switch back if you do not love it.
      </p>

      {loading ? (
        <Loading />
      ) : (
        <div className="w-full flex  gap-4   ">
          {data.map((plan, idx) => (
            <PlanCard key={idx} {...mapPlanToPlanCardProps(plan)} />
          ))}
        </div>
      )}
    </div>
  );
}
