import PlanCard from "@/components/forms/PlanCard";



export default function Step2() {
  return (
    <div className=" px-6 py-12  sm:rounded-lg sm:px-12">
      <form action="#" method="POST" className="space-y-6">
        <small className="text-sm font-extralight">Step 2 OF 3</small>
        <h2 className="mt-3 text-left text-5xl font-bold tracking-tight text-gray-800">
          Choose the plan That! <br />
          Mathes Your Ambition
        </h2>
        <p className=" text-sm">
          Pick a subscription - billing automatically starts after 7-day trial
          ends, <br />
          Cancel anytime, No fee
        </p>
        <div className="w-4/5 flex gap-4 h-auto">
          <PlanCard
            label="Monthly"
            price="$5.99"
            type="monthly"
            isHighlighted
            features={[
              { label: "Exclusive access to the latest live and specialised sessions and Premium videos." },
              { label: "Video and Sound Quality", value: "Best" },
              { label: "Resolution", value: "1080p" },
              { label: "Supported devices", value: "Any Device" },
            ]}
            onSelect={() => console.log("Monthly plan selected")}
          />

          <PlanCard
            label="Yearly"
            price="$49.99"
            type="yearly"
            features={[
              { label: "Exclusive access to the latest live and specialised sessions and Premium videos." },
              { label: "Video and Sound Quality", value: "Best" },
              { label: "Resolution", value: "1080p" },
              { label: "Supported devices", value: "Any Device" },
              { label: "Save Cost", value: "$21.89" },
            ]}
            onSelect={() => console.log("Yearly plan selected")}
          />
        </div>
      </form>
    </div>
  );
}
