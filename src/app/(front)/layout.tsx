"use client";

import "@/app/globals.css";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Footer } from "@/components/layout";
import { ToastContainer } from "react-toastify";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "TV Topics",
    href: "/browse",
    children: [
      { name: "Profile", href: "/settings/profile" },
      { name: "Billing", href: "/settings/billing" },
    ],
  },
  { name: "Course/Zones", href: "#" },
  { name: "Pricing", href: "#" },
];

import { usePathname } from "next/navigation";
import { formatDate } from "@/utils/common";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pageName = usePathname();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `https://projectcontrolstv.com/secure/titles/tags/keyword`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data;
        setLoading(false);
        setData(modifiedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  useEffect(() => {
    // fetch();
  }, []);

  return (
    <>
      <html lang="en">
        <body className="bg-[#161f27]">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav
              aria-label="Global"
              className="flex items-center justify-between p-4 lg:px-2 mx-auto max-w-7xl"
            >
              <div className="flex lg:flex-1">
                <div className="-m-1.5 p-1.5">
                  <span className="sr-only">Project Control TV</span>
                  <Link href="/">
                    <img
                      alt=""
                      src="https://projectcontrolstv.com/storage/branding_media/5lbRjBu1jH2A3Q61DkPaPLVxw3fidK9SlSwU8PAU.png"
                      className="h-8 w-auto"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <div key={item.name} className="relative group ">
                        {/* Main menu link */}
                        <a
                          href={item.href}
                          className={classNames(
                            item.href === pageName && "text-white ",
                            "text-gray-400 text-sm hover:text-white items-center justify-center px-3 py-2 rounded-md font-semibold"
                          )}
                        >
                          {item.name}
                        </a>

                        {/* Submenu */}
                        {item.children && item.children.length > 0 && (
                          <div className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-200 z-50">
                            <div className="py-1">
                              {item.children.map((subItem) => (
                                <a
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
              </div>

              <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 ">
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
                      <img
                        alt=""
                        src="https://projectcontrolstv.com/storage/branding_media/5lbRjBu1jH2A3Q61DkPaPLVxw3fidK9SlSwU8PAU.png"
                        className="h-8 w-auto"
                      />
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-m-2.5 rounded-md p-2.5 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/25">
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-800"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="py-6">
                      <a
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
                      >
                        Log in
                      </a>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </Dialog>
          </header>
          {children}
          <Footer />
        </body>
      </html>
      <ToastContainer />
    </>
  );
}
