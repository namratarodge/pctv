"use client";

import {
  AdjustmentsHorizontalIcon,
  LockClosedIcon
} from "@heroicons/react/24/outline";
import ListButton from "./ListButton";

export const accountSettingsLinks = [
  {
    name: "Change Password",
    href: "/account?name=change_password",
    icon: AdjustmentsHorizontalIcon,
  },
  {
    name: "Update Profile details",
    href: "/account?name=update_profile",
    icon: LockClosedIcon,
  },
];

export default function Security() {
  return (
    <>
      <div className="h-100 text-black">
        <h1 className="text-4xl font-semibold">Security</h1>
        <p className="my-4">Profile Details</p>
        <div className="bg-gray-100 mt-4 py-2 px-6 rounded-sm">
          {accountSettingsLinks.map((item) => (
             <ListButton item={item} key={item.name} />
          ))}
        </div>
      </div>
    </>
  );
}
