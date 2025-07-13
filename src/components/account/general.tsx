"use client";

import {
  ChevronRightIcon,
  AdjustmentsHorizontalIcon,
  LockClosedIcon,
  UserCircleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

import ListButton from "./ListButton";

export const accountSettingsLinks = [
  {
    name: "Change plan",
    href: "/account?",
    icon: AdjustmentsHorizontalIcon,
  },
  {
    name: "Update password",
    href: "/account?name=change_password",
    icon: LockClosedIcon,
  },
  {
    name: "Update profile",
    href: "/account?name=update_profile",
    icon: UserCircleIcon,
  },
  {
    name: "Manage Payment Methods",
    href: "/account?name=manage_payment",
    icon: CreditCardIcon,
  },
];

export default function General() {
  return (
    <>
      <div className="min-h-screen bg-white text-black max-w-3xl mx-auto ">
        <h1 className="text-4xl font-semibold">Account</h1> 
        <p className="my-4">Membership Details</p>
        <div className="bg-gray-100 mt-4 sm:mt-6 p-4 sm:p-6 rounded-lg space-y-3 sm:space-y-4">
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
          {accountSettingsLinks.map((item,index) => (
            <ListButton item={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
