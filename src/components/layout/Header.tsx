"use client";

import { usePublicData } from "@/components/context/PublicDataContext";
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
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { NoBGPages, baseNavigation, userNavigation } from "@/constants/Menu";
import { TagType, TitleDetailsType } from "@/constants/Type";
import { redirect, usePathname, useRouter } from "next/navigation";
import { AutoCompeleteTitleForHeader } from "../forms";
import UserAvatar from "../forms/UserAvatar";

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, tvtopic, categories } = usePublicData();

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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
    const merged = baseNavigation.map((item) => {
      if (item.key === "tv_topics") {
        return {
          ...item,
          children: (tvtopic || []).map((topic: TagType) => ({
            _id: topic._id,
            name: topic.display_name,
            href: `/browse?keyword=${encodeURIComponent(topic.name)}`,
          })),
        };
      }

      if (item.key === "categories") {
        return {
          ...item,
          children: (categories || []).map((category: TagType) => ({
            _id: category._id,
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

  const handleUserSelected = async (data: TitleDetailsType) => {
    router.push(`/titles/${data._id}/${data.slug}`);
  };

  return (
    <header
      className={` absolute inset-x-0 top-0 z-50 inset-shadow-md  ${
        NoBGPages.includes(pageName)
          ? "inset-shadow-black topHeader"
          : "bg-black"
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
                src="/logo-dark.png"
                width={100}
                height={10}
                className="w-40"
                unoptimized
              />
            </Link>
          </div>
          {user && Object.keys(user).length > 0 && (
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <div key={item.key} className="relative group">
                    {/* Main menu link */}
                    <a
                      href={item.href}
                      className={classNames(
                        item.href === pageName && "text-white ",
                        "text-gray-300 text-sm hover:text-white items-center justify-center px-3 py-2 rounded-md "
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
                            item.children as {
                              _id: string;
                              name: string;
                              href: string;
                            }[]
                          ).map((subItem) => (
                            <a
                              key={subItem._id}
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
          )}
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

        <div className="relative hidden lg:flex lg:flex-1 lg:justify-end gap-6 items-center">
          {user && Object.keys(user).length > 0 ? (
            <>
              {showSearch && (
                <>
                  <AutoCompeleteTitleForHeader onSelect={handleUserSelected} />
                  <XMarkIcon
                    className="w-5 h-5  text-white cursor-pointer"
                    onClick={() => setShowSearch(!showSearch)}
                  />
                </>
              )}

              {!showSearch && (
                <MagnifyingGlassIcon
                  className="w-5 h-5 text-white cursor-pointer"
                  onClick={() => setShowSearch(!showSearch)}
                />
              )}

              <Menu as="div" className="relative">
                <MenuButton className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <span className="hidden lg:flex lg:items-center cursor-pointer">
                    <UserAvatar poster={user.avatar} rounded={true} />
                    <span
                      aria-hidden="true"
                      className="ml-4 text-sm font-semibold text-white capitalize"
                    >
                      {user?.first_name} &nbsp;
                      {user?.last_name}
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
                  {filteredNavigation.map((item) =>
                    item.key === "logout" ? (
                      <MenuItem key={item.key}>
                        <button
                          onClick={() => singOut()}
                          className="cursor-pointer flex items-center gap-3 w-full text-left px-3 py-2 rounded hover:text-gray-100 transition text-sm"
                        >
                          <item.icon className="w-5 h-5 text-gray-300" />
                          {item.name}
                        </button>
                      </MenuItem>
                    ) : (
                      <MenuItem key={item.key}>
                        <Link
                          href={item.href}
                          className="flex  items-center gap-3 w-full text-left px-3 py-2 rounded hover:text-gray-100 transition text-sm"
                        >
                          <item.icon className="w-5 h-5 text-gray-300" />
                          {item.name}
                        </Link>
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
                  src="/logo-dark.png"
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
                {user &&
                  Object.keys(user).length > 0 &&
                  navigation.map((item, index) => {
                    const hasChildren =
                      item.children && item.children.length > 0;

                    const menuContent = (
                      <div
                        className="block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-800 cursor-pointer"
                        onClick={() => hasChildren && toggleSubmenu(index)}
                      >
                        {item.name}

                        {hasChildren && openIndex === index && (
                          <div className="space-y-1 mt-4">
                            {(
                              item.children as {
                                _id: string;
                                name: string;
                                href: string;
                              }[]
                            ).map((child) => (
                              <Link
                                key={child._id}
                                href={child.href}
                                className="block rounded-md px-1 py-2 text-sm text-gray-300"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );

                    return hasChildren ? (
                      <div key={item.key}>{menuContent}</div>
                    ) : (
                      <Link key={item.key} href={item.href} className="block">
                        {menuContent}
                      </Link>
                    );
                  })}
              </div>
              <div className="py-6">
                {user && Object.keys(user).length > 0 ? (
                  <div>
                    <div
                      className="flex items-center"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <UserAvatar poster={user.avatar} rounded={true} />
                      <span
                        aria-hidden="true"
                        className="ml-4 text-sm font-semibold text-white capitalize"
                      >
                        {user?.first_name} &nbsp;
                        {user?.last_name}
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className={`ml-2 size-5 text-gray-400 transform transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {isOpen && (
                      <div className="bg-gray-800 mt-4 rounded-md ">
                        {filteredNavigation.map((item) =>
                          item.key === "logout" ? (
                            <button
                              key={item.key}
                              onClick={() => singOut()}
                              className="block px-4 py-2 text-sm text-gray-400 hover:text-gray-200 w-full text-left cursor-pointer"
                            >
                              {item.name}
                            </button>
                          ) : (
                            <Link
                              key={item.key}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-400 hover:text-gray-200 w-full text-left cursor-pointer"
                            >
                              {item.name}
                            </Link>
                          )
                        )}
                      </div>
                    )}
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
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
