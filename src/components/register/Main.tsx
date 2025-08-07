"use client";
import Pricing from "@/components/register/Pricing";
import Step1 from "@/components/register/Step1";
import Step3 from "@/components/register/Step3";
import { useRouter, useSearchParams } from "next/navigation";

export default function Main() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  const router = useRouter();

  // useEffect(() => {
  //   // ✅ Ensure this runs only on the client
  //   if (typeof window !== "undefined") {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       router.push("/account");
  //     }
  //   }
  // }, [router]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-4 sm:px-6 lg:px-8 ">
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-4/6">
          {!step && <Step1 />}
          {step === "two" && (
            <Pricing
              step="Step 2 of 3"
              title="Choose the plan that matches your ambition"
              description="Pick a subscription - billing automatically starts after 7-day trial ends. Cancel anytime, no fee."
            />
          )}
          {step === "three" && <Step3 />}
        </div>
      </div>
    </>
  );
}
