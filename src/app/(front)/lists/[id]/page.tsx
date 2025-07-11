"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";

export default function TitleDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <div className="mt-20  max-w-8/12 mx-auto flex flex-col lg:flex-row">
      <div className="w-1/2 p-5">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">New List</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="flex  gap-4">
                <div className="flex items-center gap-x-3">
                  <input
                    defaultChecked
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-red-600 checked:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Public
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-red-600 checked:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Private
                  </label>
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="street-address"
                  name="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-red-500 rounded-md px-6 py-2 text-white cursor-pointer hover:bg-red-400">
                Save
              </button>
              <button className="bg-gray-800 rounded-md px-6 py-2 text-white cursor-pointer hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="p-5 ">
          <input
            type="text"
            className="border border-gray-300 rounded-md w-full px-4 py-2"
            placeholder="Enter title name"
          />
          <div className="border mt-5 ">
            <div>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
