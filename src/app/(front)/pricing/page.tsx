import Pricing from "@/components/register/Pricing";

export default function Register() {
  return (
    <div className="pt-18  max-w-11/12 mx-auto flex flex-col lg:flex-row mb-10">
      <Pricing
        title="Choose the plan that matches your ambition"
        description="Pick a subscription — billing automatically starts after your 14-day trial ends, Cancel anytime, No fee"
      />
    </div>
  );
}
