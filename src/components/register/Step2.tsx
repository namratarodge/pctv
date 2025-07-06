import PlanCard from "@/components/forms/PlanCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../layout/Loading";

export default function Step2() {
  const [data, setData] = useState<any[]>([]);
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
        console.log(modifiedData);
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

  const mapPlanToPlanCardProps = (plan) => {
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
    <div className="px-6 py-12 sm:rounded-lg sm:px-12">
      <form action="#" method="POST" className="space-y-6">
        <small className="text-sm font-extralight">Step 2 OF 3</small>
        <h2 className="mt-3 text-left text-5xl font-bold tracking-tight text-gray-800">
          Choose the plan That! <br />
          Matches Your Ambition
        </h2>
        <p className="text-sm">
          Pick a subscription - billing automatically starts after 7-day trial
          ends, <br />
          Cancel anytime, No fee
        </p>

        {loading ? (
          <Loading /> 
        ) : (
          <div className="w-full flex flex-wrap gap-4 h-auto">
            {data.map((plan, idx) => (
              <PlanCard key={idx} {...mapPlanToPlanCardProps(plan)} />
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
