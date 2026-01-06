import { PlanCardProps } from "@/constants/Type";
import axios from "axios";
import { usePublicData } from "../context/PublicDataContext";

export default function PlanCard({
  label,
  price,
  paypal_id,
  plan_id,
  interval_count,
  isHighlighted = false,
  onSelect,
  features,
}: PlanCardProps) {
  const { user } = usePublicData();

  const handleSubscribe = async (
    priceId: string,
    interval_count: number,
    plan_id: string
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
        {
          priceId,
          trial_period_days: interval_count,
          plan_id: plan_id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (error) {
      console.error("Subscription error", error);
    }
  };

  return (
    <div
      className={`relative rounded-3xl w-full max-w-sm h-auto shadow-lg cursor-pointer p-8 overflow-hidden ${
        isHighlighted ? "bg-[#f44336] text-white" : "bg-white border-2 border-red-500"
      }`}
    >
      {/* Best Value Ribbon */}
      {isHighlighted && (
        <div className="absolute top-6 -right-10 bg-[#c9382e] text-gray-300 px-6 py-1.5 text-xs font-semibold transform rotate-45 shadow-sm w-40 text-center">
          Best Value
        </div>
      )}

      {/* Header Section */}
      <div className="text-center mb-8">
        <p className={`text-base mb-4 ${isHighlighted ? "text-white" : "text-gray-600"}`}>
          {label}
        </p>
        <h3 className={`text-3xl font-bold mb-6 ${isHighlighted ? "text-white" : "text-gray-900"}`}>
          {price}
        </h3>

        <button
          onClick={() => handleSubscribe(paypal_id, interval_count, plan_id)}
          className={`w-3/4 py-2 rounded-full text-lg font-semibold transition-all duration-200 ${
            isHighlighted 
              ? "bg-white text-red-500 hover:bg-gray-100" 
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          Select
        </button>
      </div>

      {/* Features List */}
      <div className="space-y-6">
        {features.map((f, i) => (
          <div
            key={i}
            className={`pt-6 ${
              i === 0 ? "" : "border-t"
            } ${
              isHighlighted ? "border-white/30" : "border-gray-300"
            }`}
          >
            <p className={`text-sm mb-1 ${isHighlighted ? "text-white" : "text-gray-600"}`}>
              {f.label}
            </p>
            {f.value && (
              <p className={`font-bold text-base ${isHighlighted ? "text-white" : "text-gray-900"}`}>
                {f.value}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}