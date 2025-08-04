import CreatePeople from "@/components/forms/CreatePeople";
import { Suspense } from "react";

export default function ProfilePeople() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <CreatePeople />
    </Suspense>
  );
}
