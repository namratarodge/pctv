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
    name: "Change Password",
    href: "/account/plan",
    icon: AdjustmentsHorizontalIcon,
  },
  {
    name: "Update Profile details",
    href: "/account/password",
    icon: LockClosedIcon,
  }
];

export default function Security() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <>
      <div className="h-100 text-black">
        <h1 className="text-4xl font-semibold">Security</h1>
        <p className="my-4">Profile Details</p>
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
