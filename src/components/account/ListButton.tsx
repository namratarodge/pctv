"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ComponentType, SVGProps } from "react";

type ItemType = {
  href: string;
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type ListButtonProps = {
  item: ItemType;
};

export default function ListButton({ item }: ListButtonProps) {
  return (
    <Link
      href={item.href}
      className=" py-3 flex justify-between  border-gray-300 cursor-pointer"
      key={item.name}
    >
      <div className="flex gap-2 text-sm">
        <item.icon className="h-5 w-5 text-gray-500" />
        {item.name}
      </div>

      <ChevronRightIcon className="w-5" />
    </Link>
  );
}
