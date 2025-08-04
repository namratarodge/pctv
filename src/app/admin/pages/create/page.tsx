import CreatePage from "@/components/forms/CreatePage";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <CreatePage />
    </Suspense>
  );
}
