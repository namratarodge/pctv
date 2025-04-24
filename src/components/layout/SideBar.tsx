"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { navigation, teams } from "@/constants/Menu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

type SideBarProps = {
  sideBarOpen: boolean;
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
import { usePathname } from "next/navigation";

export default function SideBar({ sideBarOpen, setSideBarOpen }: SideBarProps) {
  const pageName = usePathname();

  return (
    <>
      <Dialog
        open={sideBarOpen}
        onClose={setSideBarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => setSideBarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-600 px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://projectcontrolstv.com/storage/branding_media/5lbRjBu1jH2A3Q61DkPaPLVxw3fidK9SlSwU8PAU.png"
                  className="w-full p-4"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.href === pageName
                                ? "border-l-4 border-red-600 text-gray-800 bg-white"
                                : "text-gray-400  hover:text-gray-200",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold "
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                item.href === pageName
                                  ? "text-gray-800"
                                  : "text-gray-300 group-hover:text-white",
                                "size-6 shrink-0"
                              )}
                            />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-700 px-4 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img
              alt="Your Company"
              src="https://projectcontrolstv.com/storage/branding_media/5lbRjBu1jH2A3Q61DkPaPLVxw3fidK9SlSwU8PAU.png"
              className="w-full p-4"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.href === pageName
                            ? "border-l-4 border-red-600 text-gray-800 bg-white"
                            : "text-gray-400  hover:text-gray-200",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.href === pageName
                              ? "text-gray-800"
                              : "text-gray-300 group-hover:text-white",
                            "size-6 shrink-0"
                          )}
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
