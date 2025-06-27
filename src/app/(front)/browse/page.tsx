import { Suspense } from "react";
import BrowserInner from "@/components/forms/BrowserInner";

export default function CreateProfile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserInner />
    </Suspense>
  );
}
