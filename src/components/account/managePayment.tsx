"use client";
import Image from "next/image";

import { ChevronRightIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";

export default function ManagePayment() {
  const searchParams = useSearchParams();
  const form = searchParams.get("form");
  return (
    <>
      <div className="h-100 text-black">
        <h1 className="text-4xl font-semibold">Manage Payment Methods </h1>
        <p className="my-4">Control how you pay for your membership.</p>
        {form !== "new" && (
          <>
            <div className="bg-gray-100 mt-4 py-2 px-6 rounded-sm space-y-4">
              <p className="flex gap-2">
                <CreditCardIcon className="w-5" />
                xxxx xxxx xxx24{" "}
              </p>
              <div className=" py-3 flex justify-between border-t border-gray-300 cursor-pointer">
                <div className="flex gap-2 text-sm">Change Payment Method</div>

                <ChevronRightIcon className="w-5" />
              </div>
            </div>
          </>
        )}
        {form === "new" && (
          <div className="flex gap-4">
            <div className="w-2/3 space-y-4 ">
              <div>
                <input
                  id="name"
                  name="email"
                  type="text"
                  required
                  placeholder="Card Number"
                  autoComplete="email"
                  className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                />
              </div>
              <div className=" flex gap-4">
                <div className="w-1/2">
                  <input
                    id="name"
                    name="first_name"
                    type="text"
                    required
                    placeholder="MM\YY"
                    autoComplete="email"
                    className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                  />
                </div>
                <div className="w-1/2">
                  <input
                    id="name"
                    name="last_name"
                    type="text"
                    required
                    placeholder="CVV"
                    autoComplete="email"
                    className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className=" flex gap-4">
                <div className="w-1/2">
                  <input
                    id="name"
                    name="first_name"
                    type="text"
                    required
                    placeholder="Name of Card"
                    autoComplete="email"
                    className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                  />
                </div>
                <div className="w-1/2">
                  <input
                    id="name"
                    name="last_name"
                    type="text"
                    required
                    placeholder="Card Holder name"
                    autoComplete="email"
                    className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="pb-2">Billing Address</div>

              <div>
                <input
                  id="name"
                  name="email"
                  type="text"
                  required
                  placeholder="Address"
                  autoComplete="email"
                  className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                />
              </div>
              <div className=" flex gap-4">
                <div className="w-1/2">
                  <input
                    id="name"
                    name="first_name"
                    type="text"
                    required
                    placeholder="City"
                    autoComplete="email"
                    className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                  />
                </div>
                <div className="w-1/2">
                  <input
                    id="name"
                    name="last_name"
                    type="text"
                    required
                    placeholder="State/Province"
                    autoComplete="email"
                    className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className=" flex gap-4">
                <div className="w-1/2">
                  <input
                    id="name"
                    name="first_name"
                    type="text"
                    required
                    placeholder="Pincode"
                    autoComplete="email"
                    className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                  />
                </div>
                <div className="w-1/2">
                  <input
                    id="name"
                    name="last_name"
                    type="text"
                    required
                    placeholder="India"
                    autoComplete="email"
                    className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button className="rounded-full bg-red-500 text-white px-6 py-1 mt-4 text-sm cursor-pointer">
                  Save
                </button>
                <button className="rounded-full text-red-400 border border-red-400 px-4 py-1 mt-4 text-sm cursor-pointer">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
