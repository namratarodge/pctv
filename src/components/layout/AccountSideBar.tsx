"use client";
import { navigationAccount } from "@/constants/Menu";
import { BackspaceIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams } from "next/navigation";

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function AccountSideBar() {
  const pageName = usePathname();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  return (
    <>
      <nav aria-label="Sidebar" className="flex flex-1 flex-col">
        <button className="bg-gray-200 items-center flex gap-4 px-3 py-2 mb-2 cursor-pointer">
          <BackspaceIcon className="h-5 w-5" /> Back to PCTV
        </button>
        <ul role="list" className=" space-y-1">
          {navigationAccount.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={classNames(
                  item.href === '/account?name='+name
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
