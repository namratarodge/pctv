import { Suspense } from "react";
import CreateProfileInner from "@/components/forms/CreateProfileInner";

export default function CreateProfile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateProfileInner />
    </Suspense>
  );
}
