"use client";

import {
  ChevronRightIcon,
  AdjustmentsHorizontalIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";


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

export default function CancelMembership() {
  return (
    <>
      <div className="h-100 text-black">
        <h1 className="text-4xl font-semibold">Cancel Membership</h1>
        <p className="my-4 text-md">Whatever you choose , it'll take effect on 3 May 2025. You'll be able to watch until then.</p>
        <div className="bg-gray-100 mt-4 py-4 px-6 rounded-sm space-y-2 text-sm">
          <p className="font-semibold">
           Pause of a month
          </p>
          <p>Pause lets you keep your profile and preferences. you will still browse.</p>
          <button className="rounded-full text-white border bg-red-500 px-4 py-1.5 text-sm cursor-pointer">
         Pause of a month
        </button>
        </div>

        <div className="bg-gray-100 mt-4 py-4 px-6 rounded-sm space-y-2 text-sm">
          <p className="font-semibold">
           Change Plann
          </p>
          <p>Switch to a lower-priced plan in a few.easy steps.</p>
          <button className="rounded-full text-white border bg-red-500 px-4 py-1.5 text-sm cursor-pointer">
        Pricing
        </button>
        </div>

        <div className="bg-gray-100 mt-4 py-4 px-6 rounded-sm space-y-2 text-sm">
          <p className="font-semibold">
           Cancel
          </p>
          <p>Canceling your membership means losing access to personalized recommendations.</p>
          <button className="rounded-full text-white border bg-red-500 px-4 py-1.5 text-sm cursor-pointer">
        Cancel Membership
        </button>
        </div>

        
       
      </div>
    </>
  );
}
