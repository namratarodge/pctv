import { Suspense } from "react";
import BrowserInner from "@/components/forms/BrowserInner";
import Loading from "@/components/layout/Loading";
import { LoadingForm } from "@/components/layout";

export default function CreateProfile() {
  return (
    <Suspense fallback={<LoadingForm />}>
      <BrowserInner />
    </Suspense>
  );
}
