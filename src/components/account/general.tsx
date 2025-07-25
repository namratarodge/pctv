"use client";

import {
  AdjustmentsHorizontalIcon,
  CreditCardIcon,
  LockClosedIcon,
  UserCircleIcon
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

import MyMembership from "./MyMembership";

export default function General() {
  return (
    <>
      <div className="min-h-screen bg-white text-black max-w-3xl mx-auto ">
        <h1 className="text-4xl font-semibold">Account</h1> 
        <p className="my-4">Membership Details</p>
        <MyMembership />

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
