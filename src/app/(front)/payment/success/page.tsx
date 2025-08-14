"use client";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PaymentSuccess() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      // const response = await axios.get(
      //   `${process.env.NEXT_PUBLIC_API_URL}/checkout-session?session_id=${sessionId}`,
      //   {
      //     headers: {
      //       Authorization: token,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // const { subscription, session } = response.data;
      // const payload = {
      //   plan_id: session.client_reference_id,
      //   gateway_name: "stripe",
      //   gateway_id: subscription.plan.id,
      //   quantity: subscription.quantity,
      //   description: "",
      //   trial_ends_at: DateTimeConvert(subscription.trial_end),
      // };
      // const responsSubscription = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/subscription`,
      //   payload,
      //   {
      //     headers: {
      //       Authorization: token,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // console.log(responsSubscription.data.message);
      // if (responsSubscription.data.status) {
      //   toast(responsSubscription.data.message);

      //   const subscriptionData = responsSubscription.data.data; // Ensure your API returns subscription ID here
      //   const transactionPayload = {
      //     user_id: subscriptionData.user_id,
      //     subscription_id: subscriptionData._id, // Use ID from the subscription response
      //     stripe_payment_intent_id: session.payment_intent,
      //     stripe_invoice_id: session.invoice,
      //     amount: subscription.plan.amount / 100, // Stripe amounts are in cents
      //     currency: subscription.plan.currency,
      //     status: session.payment_status, // "succeeded" or other
      //     type: "initial", // For first payment
      //     payment_method: session.payment_method_types[0], // e.g. "card"
      //     paid_at: new Date().toISOString(), // Current timestamp
      //   };
      //   await axios.post(
      //     `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
      //     transactionPayload,
      //     {
      //       headers: {
      //         Authorization: token,
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );

      //   console.log("Transaction recorded successfully");
      // }
    } catch (error) {
      console.log(error);
      toast("Error fetching data:");
    }
  };

  // useEffect(() => {
  //   fetch();
  // }, []);

  return (
    <div className="pt-18 max-w-11/12 mx-auto flex flex-col lg:flex-row mb-10">
      <div className="w-full  text-white shadow-lg rounded-2xl p-8 text-center">
        <div className="text-green-500 mb-4">
          <CheckBadgeIcon className="w-20 h-20 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>
        <p className="mb-6">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        <Link
          href="/home"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}
