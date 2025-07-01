"use client";

import General from "@/components/account/general";
import Membership from "@/components/account/membership";
import Security from "@/components/account/security";

import { useSearchParams } from "next/navigation";

export default function account() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <>
      {!name && <General />}
      {name === "membership" && <Membership />}
      {name === "security" && <Security />}
    </>
  );
}
