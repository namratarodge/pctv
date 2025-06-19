"use client";

import { useEffect, useState } from "react";

import { navigationTitleSubMenu } from "@/constants/Menu";
import { useSearchParams } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Subscription() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const active = searchParams.get("active"); // "videos"

  return (
    <div className="flex gap-4">
      <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md w-4/5">
        {active}
      </div>
      <div className=" bg-white rounded-md w-1/5 border border-gray-200 ">
        <h2 className="bg-gray-600 text-white p-4 rounded-t-md text-sm/6 font-semibold">
          Edit
        </h2>
        <ul role="list" className="space-y-1">
          {navigationTitleSubMenu.map((item) => (
            <li key={item.name}>
              <a
                href={"edit?active=" + item.href}
                className={classNames(
                  item.href === active
                    ? " text-gray-800 "
                    : "text-gray-400  hover:text-gray-800",
                  "group flex gap-x-3 rounded-md px-4  py-2 text-sm/6 font-semibold cursor-pointer"
                )}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
