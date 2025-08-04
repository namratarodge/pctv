import CreateProfileInner from "@/components/forms/CreateProfileInner";
import { Suspense } from "react";

export default function UsersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateProfileInner />
    </Suspense>
  );
}
