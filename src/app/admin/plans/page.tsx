"use client";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { DataTable } from "@/components/forms";

const people = [
  {
    name: "Amelia Wright",
    title: "UI/UX Designer",
    department: "Design",
    email: "amelia.wright@example.com",
    role: "Member",
  },
  {
    name: "Noah Johnson",
    title: "Back-end Developer",
    department: "Engineering",
    email: "noah.johnson@example.com",
    role: "Admin",
  },
];

const planColumn: {
  key: keyof (typeof people)[number];
  label: string;
}[] = [
  { key: "name", label: "Name" },
  { key: "title", label: "Title" },
  { key: "department", label: "Department" },
  { key: "role", label: "Role" },
];

export default function Plans() {
  return (
    <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">
            Subscription Plans
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Your team is on the{" "}
            <strong className="font-semibold text-gray-900">Startup</strong>{" "}
            plan. The next payment of $80 will be due on August 4, 2022.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" /> Add New Plan
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <DataTable
            columns={planColumn}
            data={people}
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
  );
}
