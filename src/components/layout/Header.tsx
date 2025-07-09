"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ArrowRightCircleIcon,
  Bars3Icon,
  ChevronDownIcon,
  ClipboardIcon,
  Cog6ToothIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePublicData } from "@/components/context/PublicDataContext";

import { redirect, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { TagType, DecodedUser } from "@/constants/Type";

const baseNavigation = [
  { name: "Home", key: "home", href: "/home" },
  {
    name: "TV Topics",
    key: "tv_topics",
    href: "/browse",
    children: [],
  },
  { name: "Course/Zones", key: "categories", href: "#", children: [] },
  { name: "Pricing", key: "price", href: "/pricing" },
];

const userNavigation = [
  { name: "Admin Home", key: "admin_home", href: "/admin", icon: UserIcon },
  { name: "Profile", key: "profile", href: "/account", icon: UserIcon },
  { name: "Watchlist", key: "watchlists", href: "/watchlists", icon: EyeIcon },
  { name: "Your List", key: "profile", href: "#", icon: ClipboardIcon },
  {
    name: "Account Settings",
    key: "security",
    href: "/account?name=security",
    icon: Cog6ToothIcon,
  },
  {
    name: "Log out",
    key: "logout",
    href: "#",
    icon: ArrowRightCircleIcon,
  },
];

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { tvtopic, categories } = usePublicData();
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSubmenu = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredNavigation = userNavigation.filter(
    (item) => item.key !== "admin_home" || user?.userType === "admin"
  );

  const loginButton = (type: string) => {
    setMobileMenuOpen(false);
    if (type == "login") {
      redirect("/login");
    }
    if (type == "register") {
      redirect("/register");
    }
  };

  const pageName = usePathname();

  const [navigation, setNavigation] = useState(baseNavigation);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token && token.split(".").length === 3) {
        const decoded = jwtDecode<DecodedUser>(token);
        setUser(decoded);
      }
    } catch (e) {
      console.error("Failed to decode token", e);
    }
    const merged = baseNavigation.map((item) => {
      if (item.key === "tv_topics") {
        return {
          ...item,
          children: (tvtopic || []).map((topic: TagType) => ({
            name: topic.display_name,
            href: `/browse?keyword=${encodeURIComponent(topic.name)}`,
          })),
        };
      }

      if (item.key === "categories") {
        return {
          ...item,
          children: (categories || []).map((category: TagType) => ({
            name: category.display_name,
            href: `/browse?genre=${encodeURIComponent(category.name)}`,
          })),
        };
      }

      return item;
    });
    setNavigation(merged);
  }, [tvtopic, categories]);

  const singOut = async () => {
    localStorage.clear(); // or remove specific keys
    window.location.href = "/login"; // or use router.push('/login') if using Next.js router
  };

  return (
    <header
      className={` absolute inset-x-0 top-0 z-50  ${
        pageName !== "/" && "bg-black"
      }`}
    >
      <nav
        aria-label="Global"
        className="flex items-center justify-between py-2  mx-auto max-w-11/12 "
      >
        <div className="flex lg:flex-1  items-center ">
          <div className="p-1.5">
            <span className="sr-only">Project Control TV</span>
            <Link href="/">
              <Image
                alt="Your Company"
                src="https://projectcontrolstv.com/storage/branding_media/5lbRjBu1jH2A3Q61DkPaPLVxw3fidK9SlSwU8PAU.png"
                width={100}
                height={10}
                className="w-40"
                unoptimized
              />
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <div key={item.key} className="relative group">
                  {/* Main menu link */}
                  <a
                    href={item.href}
                    className={classNames(
                      item.href === pageName && "text-white ",
                      "text-gray-300 text-sm hover:text-white items-center justify-center px-3 py-2 rounded-md font-semibold"
                    )}
                  >
                    {item.name}
                  </a>

                  {/* Submenu */}
                  {item.children && item.children.length > 0 && (
                    <div
                      className=" absolute  whitespace-nowrap
                     left-0 mt-1 cursor-pointer rounded-md  bg-black ring-opacity-5 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-200 z-50"
                    >
                      <div className="py-1">
                        {(
                          item.children as { name: string; href: string }[]
                        ).map((subItem, index) => (
                          <a
                            key={index}
                            href={subItem.href}
                            className="capitalize block px-3 py-2 text-xs text-gray-400 hover:text-gray-300 "
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 cursor-pointer"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-6 items-center">
          <MagnifyingGlassIcon className="w-5 h-5 text-white cursor-pointer" />
          {user && Object.keys(user).length > 0 ? (
            <>
              <Menu as="div" className="relative">
                <MenuButton className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <span className="hidden lg:flex lg:items-center cursor-pointer">
                    <Image
                      src="/default-front.jpg"
                      alt="test"
                      width={5}
                      height={5}
                      className="w-10 h-auto object-cover rounded-full"
                    />
                    {/* <UserCircleIcon className="w-6 h-6 text-gray-300 " /> */}
                    <span
                      aria-hidden="true"
                      className="ml-4 text-sm font-semibold text-white capitalize"
                    >
                      {user.full_name}
                    </span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="ml-2 size-5 text-gray-400"
                    />
                  </span>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-md text-gray-400  bg-gray-800 py-2  shadow-lg  transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  {filteredNavigation.map((item, index) =>
                    item.key === "logout" ? (
                      <MenuItem key={index}>
                        <button
                          onClick={() => singOut()}
                          className="cursor-pointer flex items-center gap-3 w-full text-left px-3 py-2 rounded hover:text-gray-100 transition text-sm"
                        >
                          <item.icon className="w-5 h-5 text-gray-300" />
                          {item.name}
                        </button>
                      </MenuItem>
                    ) : (
                      <MenuItem key={index}>
                        <a
                          href={item.href}
                          className="flex  items-center gap-3 w-full text-left px-3 py-2 rounded hover:text-gray-100 transition text-sm"
                        >
                          <item.icon className="w-5 h-5 text-gray-300" />
                          {item.name}
                        </a>
                      </MenuItem>
                    )
                  )}
                </MenuItems>
              </Menu>
            </>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="text-sm/6  text-white bg-gray-800 px-6 py-1 rounded-full"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="text-sm/6  text-white bg-red-500 px-6 py-1 rounded-full"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <div className="-m-1.5 p-1.5">
              <span className="sr-only">Project Control TV</span>
              <Link href="/">
                <Image
                  alt="Your Company"
                  src="https://projectcontrolstv.com/storage/branding_media/5lbRjBu1jH2A3Q61DkPaPLVxw3fidK9SlSwU8PAU.png"
                  width={400} // Replace with the actual width of the image or layout container
                  height={120} // Replace with the actual height
                  className="w-50 p-4"
                  unoptimized // required for external images unless configured in next.config.js
                />
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-400 cursor-pointer"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item, index) => (
                  <div
                    key={index}
                    className=" block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-800 cursor-pointer"
                    onClick={() => toggleSubmenu(index)}
                  >
                    {item.name}

                    {/* Submenu */}
                    {item.children && openIndex === index && (
                      <div className=" space-y-1 mt-4">
                        {(
                          item.children as { name: string; href: string }[]
                        ).map((child, childIndex) => (
                          <a
                            key={childIndex}
                            href={child.href}
                            className="block rounded-md px-1 py-2 text-sm text-gray-300"
                          >
                            {child.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="py-6">
                {user && Object.keys(user).length > 0 ? (
                  <div className="flex items-center">
                    <Image
                      src="/default-front.jpg"
                      alt="test"
                      width={10}
                      height={10}
                      className="w-10 h-auto object-cover rounded-full"
                    />
                    {/* <UserCircleIcon className="w-6 h-6 text-gray-300 " /> */}
                    <span
                      aria-hidden="true"
                      className="ml-4 text-sm font-semibold text-white"
                    >
                      {user.username}
                    </span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="ml-2 size-5 text-gray-400"
                    />
                  </div>
                ) : (
                  <>
                    <Button
                      onClick={() => loginButton("login")}
                      className="-mx-3 block w-full rounded-lg px-3 py-2.5 text-left text-base/7 font-semibold text-white hover:bg-gray-800 cursor-pointer"
                    >
                      Log in
                    </Button>
                    <Button
                      onClick={() => loginButton("register")}
                      className="-mx-3 block w-full rounded-lg px-3 text-left py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800 cursor-pointer"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
                ;
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
