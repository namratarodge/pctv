import { XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Register() {
  return (
    <div className="pt-18  max-w-11/12 mx-auto flex flex-col lg:flex-row mb-10">
      <div className=" w-full text-white shadow-lg rounded-2xl p-8 text-center">
        <div className="text-red-500 mb-4">
        <XCircleIcon className="w-20 h-20 mx-auto" />

        </div>
        <h2 className="text-2xl font-boldmb-2">Payment Cancelled</h2>
        <p className=" mb-6">
          Your transaction was not completed. If this was a mistake, please try
          again.
        </p>

        <Link
          href="/home"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
