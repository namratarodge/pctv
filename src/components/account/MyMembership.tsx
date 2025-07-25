"use client";

import { formatDate, getTrialDaysLeft } from "@/utils/common";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePublicData } from "../context/PublicDataContext";

export default function MyMembership() {
  const { user, loading } = usePublicData();

  return (
    <>
      {loading ? (
        <div className="bg-gray-100 mt-4 sm:mt-6 p-4 sm:p-6 rounded-lg space-y-3 sm:space-y-4 animate-pulse">
          <div className="h-5 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      ) : (
        <div className="bg-gray-100 mt-4 sm:mt-6 p-4 sm:p-6 rounded-lg space-y-3 sm:space-y-4">
          {user.subscriptions ? (
            <>
              <h2>
                {user.subscriptions.plan_id?.name}
                {user.subscriptions.trial_ends_at && (
                  <span className="ml-4 border border-red-400 text-red-400 px-2 py-1 rounded-full text-xs">
                    {getTrialDaysLeft(user.subscriptions.trial_ends_at)} days
                    Free Trial left
                  </span>
                )}
              </h2>
              <p>Next Payment {formatDate(user.subscriptions.trial_ends_at)}</p>

              <Link
                href="/pricing"
                className="py-3 flex justify-between border-t border-gray-300 cursor-pointer"
              >
                <div className="flex gap-2 text-sm">Change Membership</div>
                <ChevronRightIcon className="w-5" />
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-gray-600 font-semibold">
                No active membership
              </h2>
              <p className="text-sm text-gray-500">
                You are not subscribed to any plan yet.
              </p>
              <Link
                href="/pricing"
                className="py-3 flex justify-between border-t border-gray-300 cursor-pointer"
              >
                <div className="flex gap-2 text-sm ">View Plans</div>
                <ChevronRightIcon className="w-5" />
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
