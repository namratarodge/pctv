import { Suspense } from "react";
import CreatePeople from "@/components/forms/CreatePeople";

export default function CreateProfile() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <CreatePeople />
    </Suspense>
  );
}
