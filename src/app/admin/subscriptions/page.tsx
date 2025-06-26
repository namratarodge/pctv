"use client";
import { Filter } from "@/components/forms";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { AdditionalTagFilter } from "@/constants/Filter";
import AdvanceDataTable from "@/components/forms/AdvanceDataTable";
import Link from "next/link";

const AdditionalTag = [
  {
    name: "Amelia Wright",
    birthday: "11 November 1990",
    views: "12",
    email: "amelia.wright@example.com",
    popularity: "Member",
  },
  {
    name: "Noah Johnson",
    birthday: "21 January 1995",
    views: "21",
    email: "noah.johnson@example.com",
    popularity: "Admin",
  },
];

const AdditionalTagColumn: {
  key: keyof (typeof AdditionalTag)[number];
  label: string;
}[] = [
  { key: "name", label: "Name" },
  { key: "birthday", label: "birthday" },
  { key: "views", label: "Local View" },
  { key: "popularity", label: "Popularity" },
];

export default function Subscription() {
  return (
    <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md ">
      <h1 className="text-2xl font-semibold text-gray-600 ">Subscription</h1>
      <div className="sm:flex sm:items-center mt-4  h-auto ">
        <Filter filterType={AdditionalTagFilter} />
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none ">
          <Link
            href="additional-tags/create"
            className="flex items-center  gap-2 rounded-md bg-red-500 px-3 py-3 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" /> Add New Subscription 
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <AdvanceDataTable
              columns={AdditionalTagColumn}
              data={AdditionalTag}
              renderActions={(person) => (
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => console.log("Edit", person)}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => console.log("Delete", person)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
