import React, { Suspense } from "react";
import AccountInner from "@/components/account/AccountInner";

export default function AccountPage() {
  return (
    <Suspense fallback={<div>Loading account page...</div>}>
      <AccountInner />
    </Suspense>
  );
}
