import BrowserInner from "@/components/forms/BrowserInner";
import { LoadingForm } from "@/components/layout";
import { Suspense } from "react";

export default function BrowserPage() {
  return (
    <Suspense fallback={<LoadingForm />}>
      <BrowserInner />
    </Suspense>
  );
}
