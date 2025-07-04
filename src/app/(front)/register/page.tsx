"use client";
import Step1 from "@/components/register/Step1";
import Step2 from "@/components/register/Step2";
import Step3 from "@/components/register/Step3";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Register() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  const router = useRouter();

  useEffect(() => {
    // ✅ Ensure this runs only on the client
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/account");
      }
    }
  }, [router]);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-4 sm:px-6 lg:px-8 ">
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-3/5">
          {!step || (step == "one" && <Step1 />)}
          {step === "two" && <Step2 />}
          {step === "three" && <Step3 />}
        </div>
      </div>
    </>
  );
}
