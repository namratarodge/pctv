import { Suspense } from "react";
import CreatePage from "@/components/forms/CreatePage";

export default function CreateProfile() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <CreatePage />
    </Suspense>
  );
}
