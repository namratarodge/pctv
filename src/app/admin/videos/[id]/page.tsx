import { Suspense } from "react";
import CreateVideo from "@/components/forms/CreateVideo";

export default function CreateProfile() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <CreateVideo />
    </Suspense>
  );
}