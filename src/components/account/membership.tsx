"use client";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import axios from "axios";
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
  const { user } = usePublicData();

  const subscription = user?.subscription;

  const handleSubscribe = async () => {
    try {
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
        }
      );
      if (response.data) {
        window.location.href = response.data.url; // redirect to billing portal if user is already subscribed
      }
    } catch (error) {
      console.error("Subscription error", error);
    }
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

        {subscription.customer_id && (
          <button
            onClick={() => handleSubscribe()}
            className="rounded-full text-red-400 border hover:bg-red-500 hover:text-white border-red-400 px-4 py-2 mt-4 text-sm cursor-pointer"
          >
            Cancel Membership
          </button>
        )}
      </div>
    </>
  );
}
