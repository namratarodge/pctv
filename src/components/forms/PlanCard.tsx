import axios from "axios";

type PlanCardProps = {
  label: string;
  price: string;
  type: string;
  paypal_id: string;
  interval_count : number;
  isHighlighted?: boolean;
  onSelect?: () => void;
  features: { label: string; value?: string }[];
};

const handleSubscribe = async (priceId: string,interval_count:number) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
      {
        priceId,
        customerEmail: "mankarsandesh111@gmail.com", 
        trial_period_days: interval_count,
      }
    );
    console.log(res)
    window.location.href = res.data.url;
  } catch (error) {
    console.error("Subscription error", error);
  }
};

export default function PlanCard({
  label,
  price,
  paypal_id,
  interval_count,
  isHighlighted = false,
  onSelect,
  features,
}: PlanCardProps) {
  return (
    <div
      className={`relative rounded-xl w-full max-w-xs py-10 h-auto shadow-lg hover:bg-red-200 cursor-pointer ${
        isHighlighted ? "bg-red-500 text-white" : "border border-red-500"
      }`}
    >
      {/* Best Value badge */}
      {isHighlighted && (
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          Best Value
        </div>
      )}

      {/* Header */}
      <div
        className={`text-center space-y-3 ${
          isHighlighted ? "text-white" : "text-gray-600"
        }`}
      >
        <small className="uppercase tracking-wider">{label}</small>
        <h3 className="text-5xl font-bold">{price}</h3>
        <button
          onClick={() => handleSubscribe(paypal_id,interval_count)}
          className={`px-4 py-1.5 w-3/4 rounded-full mt-2 ${
            isHighlighted ? "bg-white text-red-500" : "bg-red-500 text-white"
          } cursor-pointer hover:opacity-90 transition`}
        >
          Select
        </button>
      </div>

      {/* Features */}
      <div
        className={`mt-10 text-xs px-4 space-y-4 ${
          isHighlighted ? "text-white" : "text-gray-700"
        }`}
      >
        {features.map((f, i) => (
          <p
            key={i}
            className={`border-b pb-2 text-sm border-gray-300 ${
              i === features.length - 1 ? "border-none" : ""
            }`}
          >
            {f.label}
            {f.value && (
              <span
                className={`font-semibold block ${
                  !isHighlighted && "text-gray-700"
                }`}
              >
                {f.value}
              </span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
