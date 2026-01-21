"use client";

import { formatDate, getTrialDaysLeft } from "@/utils/common";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePublicData } from "../context/PublicDataContext";

export default function MyMembership() {
  const { user, loading } = usePublicData();

  const subscription = user?.subscription;

  return (
    <>
      {loading ? (
        // Skeleton loading
        <div className="bg-gray-100 mt-4 sm:mt-6 p-4 sm:p-6 rounded-lg space-y-3 sm:space-y-4 animate-pulse">
          <div className="h-5 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      ) : (
        <div className="bg-gray-100 mt-4 sm:mt-6 p-4 sm:p-6 rounded-lg space-y-3 sm:space-y-4">
        
          {subscription ? (
            <>
              <h2 className="font-semibold text-gray-800">
                {subscription.plan_info?.name || "Free Plan"}
                {subscription?.subscriptionStatus === "trial" && subscription?.trial_end_date && (
                  <span className="ml-4 border border-red-400 text-red-400 px-2 py-1 rounded-full text-xs">
                    {getTrialDaysLeft(subscription.trial_end_date)} days Free Trial left
                  </span>
                )}
                {subscription?.subscriptionStatus === "trial_active_plan" && (
                  <span className="ml-4 border border-green-600 text-green-600 px-2 py-1 rounded-full text-xs">
                    Paid Plan — Trial Ends in {getTrialDaysLeft(subscription.trial_end_date)} days
                  </span>
                )}
                {subscription?.subscriptionStatus === "active" && (
                  <span className="ml-4 border border-green-400 text-green-400 px-2 py-1 rounded-full text-xs">
                    Active Plan
                  </span>
                )}
                {subscription?.subscriptionStatus === "canceled" && (
                  <span className="ml-4 border border-yellow-400 text-yellow-400 px-2 py-1 rounded-full text-xs">
                    Canceled
                  </span>
                )}
                {subscription?.subscriptionStatus === "expired" && (
                  <span className="ml-4 border border-gray-400 text-gray-400 px-2 py-1 rounded-full text-xs">
                    Expired
                  </span>
                )}
              </h2>

              {/* Trial End Date */}
              {subscription?.trial_end_date && (
                <p className="text-sm text-gray-600">
                  Trial ends on: {formatDate(subscription.trial_end_date)}
                </p>
              )}

              {/* Plan End Date */}
              {subscription?.plan_end_date && (
                <p className="text-sm text-gray-600">
                  Plan renews/ends on: {formatDate(subscription.plan_end_date)}
                </p>
              )}

              <Link
                href="/account?name=change-plan"
                className="py-3 flex justify-between border-t border-gray-300 cursor-pointer"
              >
                <div className="flex gap-2 text-sm">Change Membership</div>
                <ChevronRightIcon className="w-5" />
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-gray-600 font-semibold">No active membership</h2>
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