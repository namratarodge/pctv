"use client";

import {
  ChevronRightIcon,
  AdjustmentsHorizontalIcon,
  LockClosedIcon,
  UserCircleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import ListButton from "./ListButton";



export default function ChangeMembership() {
  return (
    <>
      <div className="h-100 text-black">
        <h1 className="text-4xl font-semibold">Membership</h1>
        <p className="my-4">Plan Details</p>
        

      </div>
    </>
  );
}
