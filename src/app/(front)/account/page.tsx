import AccountInner from "@/components/account/AccountInner";
import { Suspense } from "react";

export default function AccountPage() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <AccountInner />
    </Suspense>
  );
}
