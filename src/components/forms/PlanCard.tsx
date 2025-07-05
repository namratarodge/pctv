type PlanCardProps = {
    label: string;
    price: string;
    type: string;
    isHighlighted?: boolean;
    onSelect?: () => void;
    features: { label: string; value?: string }[];
  };
  
  export default function PlanCard({
    label,
    price,
    type,
    isHighlighted = false,
    onSelect,
    features,
  }: PlanCardProps) {
    return (
      <div
        className={`relative rounded-xl w-1/2 pt-5 h-auto ${
          isHighlighted ? "bg-red-500 text-white" : "border border-red-500"
        }`}
      >
        {isHighlighted && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            Best Value
          </div>
        )}
        <div className={`text-center space-y-3 ${isHighlighted ? "text-white" : "text-black"}`}>
          <small>{label}</small>
          <h3 className="text-5xl">{price}</h3>
          <button
            onClick={onSelect}
            className={`px-4 py-1.5 w-3/4 rounded-full ${
              isHighlighted ? "bg-white text-red-400" : "bg-red-500 text-white"
            } cursor-pointer`}
          >
            Select
          </button>
        </div>
        <div
          className={`px-4 py-6 space-y-4 ${
            isHighlighted ? "text-white" : "text-gray-500"
          }`}
        >
          {features.map((f, i) => (
            <p
              key={i}
              className={`border-b text-sm pb-2 flex flex-col ${
                i === features.length - 1 ? "border-none" : ""
              }`}
            >
              {f.label}
              {f.value && (
                <span className={`font-semibold ${!isHighlighted && "text-gray-800"}`}>
                  {f.value}
                </span>
              )}
            </p>
          ))}
        </div>
      </div>
    );
  }