"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { usePublicData } from "../context/PublicDataContext";
import UserAvatar from "../forms/UserAvatar";

const userNavigation = [
  { name: "Your profile", href: "/account" },
  { name: "Sign out", href: "#" },
];

type SideBarProps = {
  sideBarOpen: boolean;
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const signOut = () => {
  localStorage.clear();
  window.location.href = "/login";
};

export default function TopHeader({
  sideBarOpen,
  setSideBarOpen,
}: SideBarProps) {
  const { user } = usePublicData();
  const router = useRouter();

  // ✅ Redirect based on userType
  useEffect(() => {
    if (user?.userType === "user") {
      router.replace("/home");
    }
  }, [user?.userType, router]);

  // ✅ Resolve avatar URL safely
  const avatarUrl = useMemo(() => {
    if (!user?.avatar) return undefined;

    return /^https?:\/\//i.test(user.avatar)
      ? user.avatar
      : `${process.env.NEXT_PUBLIC_WEBSITE}/${user.avatar}`;
  }, [user?.avatar]);

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => setSideBarOpen(!sideBarOpen)}
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden cursor-pointer"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon aria-hidden="true" className="size-6" />
      </button> 

      <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
          <div
            aria-hidden="true"
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
          />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5 cursor-pointer">
              <span className="sr-only">Open user menu</span>
              <UserAvatar poster={avatarUrl} rounded />

              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm/6 font-semibold text-gray-900 capitalize">
                  {user?.first_name} {user?.last_name}
                </span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="ml-2 size-5 text-gray-400"
                />
              </span>
            </MenuButton>

            <MenuItems className="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-md bg-white py-2 ring-1 shadow-lg ring-gray-900/5">
              <div className="px-4 py-3">
                <p className="text-sm">Signed in as</p>
                <p className="truncate text-sm font-medium text-gray-900">
                  {user?.email}
                </p>
              </div>

              {userNavigation.map((item) =>
                item.name === "Sign out" ? (
                  <MenuItem key={item.name}>
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-3 py-1 text-sm text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </button>
                  </MenuItem>
                ) : (
                  <MenuItem key={item.name}>
                    <a
                      href={item.href}
                      className="block px-3 py-1 text-sm text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  </MenuItem>
                )
              )}
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
}
