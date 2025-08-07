"use client";
import { navigationAccount } from "@/constants/Menu";
import { Button } from "@headlessui/react";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function AccountSideBar() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  return (
    <>
      <nav aria-label="Sidebar" className="flex flex-1 flex-col">
      <Link href="/home">
        <Button className="bg-gray-200 items-center flex gap-4 px-3 py-2 mb-2 cursor-pointer text-md">
          <ArrowLongLeftIcon className="h-6 w-6 " /> Back to PCTVc
        </Button>
        </Link>
        <ul role="list" className=" space-y-1">
          {navigationAccount.map((item,index) => (
            <li key={index}>
              <a
                href={item.href}
                className={classNames(
                  item.href === "/account?name=" + name
                    ? "text-black font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-red-600",
                  "group flex gap-x-3 rounded-md p-2 pl-3 text-sm/6 items-center"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
