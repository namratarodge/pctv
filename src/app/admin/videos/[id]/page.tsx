import CreateVideo from "@/components/forms/CreateVideo";
import { Suspense } from "react";

export default function VideoPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <CreateVideo />
    </Suspense>
  );
}