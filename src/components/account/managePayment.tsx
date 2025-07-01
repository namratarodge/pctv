"use client";

import { ChevronRightIcon, CreditCardIcon } from "@heroicons/react/24/outline";

export default function ManagePayment() {
  return (
    <>
      <div className="h-100 text-black">
        <h1 className="text-4xl font-semibold">Manage Payment Methods</h1>
        <p className="my-4">Control how you pay for your membership.</p>
        <div className="bg-gray-100 mt-4 py-2 px-6 rounded-sm space-y-4">
          <p className="flex gap-2">
            <CreditCardIcon className="w-5" />
            xxxx xxxx xxx24{" "}
          </p>
          <div className=" py-3 flex justify-between border-t border-gray-300 cursor-pointer">
            <div className="flex gap-2 text-sm">Change Payment Method</div>

            <ChevronRightIcon className="w-5" />
          </div>
        </div>
      </div>
    </>
  );
}
