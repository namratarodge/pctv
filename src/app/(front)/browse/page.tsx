"use client";
import BrowserInner from "@/components/forms/BrowserInner";
import { LoadingForm } from "@/components/layout";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function BrowserPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <Suspense fallback={<LoadingForm />}>
      <BrowserInner />
    </Suspense>
  );
}
