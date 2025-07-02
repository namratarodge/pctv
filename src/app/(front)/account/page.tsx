"use client";

import General from "@/components/account/general";
import Membership from "@/components/account/membership";
import Security from "@/components/account/security";
import ChangePassword from "@/components/account/changePassword";
import UpdateProfile from "@/components/account/updateProfile";
import ManagePayment from "@/components/account/managePayment";

import { useSearchParams } from "next/navigation";
import CancelMembership from "@/components/account/cancel_membership";
import MembershipPause from "@/components/account/membership_pause";
import CancelMembershipFinal from "@/components/account/cancel_membership_final";

export default function account() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <>
      {!name && <General />}
      {name === "membership" && <Membership />}
      {name === "cancel_membership" && <CancelMembership />}
      {name === "cancel_membership_final" && <CancelMembershipFinal />}
      {name === "pause_membership" && <MembershipPause />}
      {name === "security" && <Security />}
      {name === "change_password" &&  <ChangePassword /> }
      {name === "update_profile" &&  <UpdateProfile /> }
      {name === "manage_payment" &&  <ManagePayment /> }
    </>
  );
}
