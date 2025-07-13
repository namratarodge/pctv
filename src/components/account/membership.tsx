"use client";

import {
  ChevronRightIcon,
  AdjustmentsHorizontalIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import ListButton from "./ListButton";

export const accountSettingsLinks = [
  {
    name: "View payment History",
    href: "/account/plan",
    icon: AdjustmentsHorizontalIcon,
  },
  {
    name: "Manage Payment Methods",
    href: "/account?name=manage_payment",
    icon: CreditCardIcon,
  },
];

export default function Membership() {
  return (
    <>
       <div className="min-h-screen bg-white text-black max-w-3xl mx-auto ">
        <h1 className="text-4xl font-semibold">Membership</h1>
        <p className="my-4">Plan Details</p>
        <div className="bg-gray-100 mt-4 py-4 px-6 rounded-sm space-y-4">
          <h2>
            Monthly plan{" "}
            <span className="ml-4 border border-red-400 text-red-400 px-2 py-1 rounded-full text-xs">
              7 days Free Trial
            </span>
          </h2>
          <p>Next Payment 4th May 2025</p>
          <p className="flex gap-2">
            <CreditCardIcon className="w-5" />
            xxxx xxxx xxx24{" "}
          </p>
          <div className=" py-3 flex justify-between border-t border-gray-300 cursor-pointer">
            <div className="flex gap-2 text-sm">Change Plan</div>

            <ChevronRightIcon className="w-5" />
          </div>
        </div>

        <p className="my-4">Payment Info </p>
        <div className="bg-gray-100 mt-4 py-2 px-6 rounded-sm">
          {accountSettingsLinks.map((item) => (
            <ListButton item={item} key={item.name} />
          ))}
        </div>
        <button className="rounded-full text-red-400 border hover:bg-red-500 hover:text-white border-red-400 px-4 py-2 mt-4 text-sm cursor-pointer">
          Cancel Membership
        </button>
      </div>
    </>
  );
}
