"use client";
import { navigationSettings } from "@/constants/Menu";
import { usePathname } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SettingSideBar() {
  const pageName = usePathname();

  return (
    <>
      <nav aria-label="Sidebar" className="flex flex-1 flex-col">
        <ul role="list" className=" space-y-1">
          {navigationSettings.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={classNames(
                  item.href === pageName
                    ? "bg-red-50 text-black border-l-4 border-red-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-red-600",
                  "group flex gap-x-3 rounded-md p-2 pl-3 text-sm/6 "
                )}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
