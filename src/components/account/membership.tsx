"use client";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { usePublicData } from "../context/PublicDataContext";
import ListButton from "./ListButton";
import MyMembership from "./MyMembership";

export const accountSettingsLinks = [
  {
    name: "View payment History",
    href: "/account?name=payment_history",
    icon: AdjustmentsHorizontalIcon,
  },
];

export default function Membership() {
  const { user, refetchUser } = usePublicData();
  const subscription = user?.subscription;
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async () => {
    try {
      setIsProcessing(true);
      console.log(subscription);
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/create-portal-session`,
        {
          customerId: subscription.customer_id,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.data.payment === "stripe") {
        window.location.href = response.data.url; // redirect to billing portal if user is already subscribed
      } else {
        toast.success("Successfully Membership has been cancel.");
        // Refetch user data to update the UI
        if (refetchUser) {
          await refetchUser();
        }
      }
    } catch (error) {
      console.error("Subscription error", error);
      toast.error("Failed to cancel membership. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    handleSubscribe();
  };

  const handleCloseModal = () => {
    setShowCancelModal(false);
  };

  return (
    <>
      <div className="min-h-screen bg-white text-black max-w-3xl mx-auto ">
        <h1 className="text-4xl font-semibold">Membership</h1>
        <p className="my-4">Plan Details</p>
        <MyMembership />

        <p className="my-4">Payment Info </p>
        <div className="bg-gray-100 mt-4 py-2 px-6 rounded-sm">
          {accountSettingsLinks.map((item) => (
            <ListButton item={item} key={item.name} />
          ))}
        </div>
        {subscription?.status === "active" && (
          <button
            onClick={handleCancelClick}
            className="rounded-full text-red-400 border hover:bg-red-500 hover:text-white border-red-400 px-4 py-2 mt-4 text-sm cursor-pointer"
          >
            Cancel Membership
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Cancel Membership?
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your membership? You'll lose
              access to:
            </p>
            <ul className="text-gray-600 mb-6 space-y-2 list-disc list-inside">
              <li>Exclusive live and specialised sessions</li>
              <li>Premium videos</li>
              <li>Best video and sound quality</li>
            </ul>
            <p className="text-sm text-gray-500 mb-6">
              You can resubscribe at any time.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Keep Membership
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
