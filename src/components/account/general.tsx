"use client";

import {
  ChevronRightIcon,
  AdjustmentsHorizontalIcon,
  LockClosedIcon,
  UserCircleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

import { useSearchParams } from "next/navigation";

export const accountSettingsLinks = [
  {
    name: "Change plan",
    href: "/account/plan",
    icon: AdjustmentsHorizontalIcon,
  },
  {
    name: "Update password",
    href: "/account/password",
    icon: LockClosedIcon,
  },
  {
    name: "Update profile",
    href: "/account/profile",
    icon: UserCircleIcon,
  },
  {
    name: "Manage Payment Methods",
    href: "/account/payment-methods",
    icon: CreditCardIcon,
  },
];

export default function General() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <>
      <div className="h-100 text-black">
        <h1 className="text-4xl font-semibold">Account</h1>
        <p className="my-4">Membership Details</p>
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
            <div className="flex gap-2 text-sm">Manage Membership</div>

            <ChevronRightIcon className="w-5" />
          </div>
        </div>

        <p className="my-4">Quick List</p>
        <div className="bg-gray-100 mt-4 py-2 px-6 rounded-sm">
          {accountSettingsLinks.map((item) => (
            <div
              className=" py-3 flex justify-between border-b border-gray-300 cursor-pointer"
              key={item.name}
            >
              <div className="flex gap-2 text-sm">
                <item.icon className="h-5 w-5 text-gray-500" />
                {item.name}
              </div>

              <ChevronRightIcon className="w-5" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
