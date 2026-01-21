"use client";

import ChangePassword from "@/components/account/change_password";
import General from "@/components/account/general";
import ManagePayment from "@/components/account/managePayment";
import Membership from "@/components/account/membership";
import Security from "@/components/account/SecurityPage";
import UpdateProfile from "@/components/account/updateProfile";

import CancelMembership from "@/components/account/cancel_membership";
import CancelMembershipFinal from "@/components/account/cancel_membership_final";
import ChangeMembership from "@/components/account/change_membership";
import MembershipPause from "@/components/account/membership_pause";
import { useSearchParams } from "next/navigation";

export default function Account() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <>
      {!name && <General />}
      {name === "membership" && <Membership />}
      {name === "change_membership" && <ChangeMembership />}
      {name === "cancel_membership" && <CancelMembership />}
      {name === "cancel_membership_final" && <CancelMembershipFinal />}
      {name === "pause_membership" && <MembershipPause />}
      {name === "security" && <Security />}
      {name === "change_password" && <ChangePassword />}
      {name === "update_profile" && <UpdateProfile />}
      {name === "manage_payment" && <ManagePayment />}
    </>
  );
}
