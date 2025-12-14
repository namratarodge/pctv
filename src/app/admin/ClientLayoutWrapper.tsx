"use client";

import { TopHeader } from "@/components/layout";
import dynamic from "next/dynamic";
import { useState } from "react";

const SideBar = dynamic(() => import("@/components/layout/SideBar"), {
  ssr: false,
});

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <>
      <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />

      <div className="lg:pl-60">
        <TopHeader sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />

        <main className="py-5">
          <div className="px-2 sm:px-4 lg:px-4">{children}</div>
        </main>
      </div>
    </>
  );
}
