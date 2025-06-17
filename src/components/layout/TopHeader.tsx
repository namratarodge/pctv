'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Account settings", href: "#" },
  { name: "Support", href: "#" },
  { name: "License", href: "#" },
  { name: "Sign out", href: "#" },
];
type SideBarProps = {
  sideBarOpen: boolean;
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const singOut = async () => {
  localStorage.clear(); // or remove specific keys
  window.location.href = "/login"; // or use router.push('/login') if using Next.js router
};
export default function TopHeader({
  sideBarOpen,
  setSideBarOpen,
}: SideBarProps) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token"); // Or from cookie if accessible
    console.log(token);
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      console.log("User info:", decoded);
    }
  }, []);

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => setSideBarOpen(true)}
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon aria-hidden="true" className="size-6" />
      </button>

      {/* Separator */}
      <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form action="#" method="GET" className="grid flex-1 grid-cols-1">
          <input
            name="search"
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm/6"
          />
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" className="size-6" />
          </button>

          {/* Separator */}
          <div
            aria-hidden="true"
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
          />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <img
                alt=""
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="size-8 rounded-full bg-gray-50"
              />
              <span className="hidden lg:flex lg:items-center cursor-pointer">
                <span
                  aria-hidden="true"
                  className="ml-4 text-sm/6 font-semibold text-gray-900"
                >
                  {user.username}
                </span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="ml-2 size-5 text-gray-400"
                />
              </span>
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-md bg-white py-2 ring-1 shadow-lg ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="px-4 py-3">
                <p className="text-sm">Signed in as</p>
                <p className="truncate text-sm font-medium text-gray-900">
                  {user.email}
                </p>
              </div>
              {userNavigation.map((item) =>
                item.name === "Sign out" ? (
                  <MenuItem key={item.name}>
                    <button
                      onClick={() => singOut()}
                      className="cursor-pointer block w-full text-left px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                    >
                      {item.name}
                    </button>
                  </MenuItem>
                ) : (
                  <MenuItem key={item.name}>
                    <a
                      href={item.href}
                      className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
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
