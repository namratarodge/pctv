import BrowserInner from "@/components/forms/BrowserInner";
import { LoadingForm } from "@/components/layout";
import { Suspense } from "react";

export default function CreateProfile() {
  return (
    <Suspense fallback={<LoadingForm />}>
      <BrowserInner />
    </Suspense>
  );
}
