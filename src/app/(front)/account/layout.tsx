"use client";

import { AccountSideBar } from "@/components/layout";
import React, { Suspense } from "react";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-1 justify-center py-4 sm:px-6 lg:px-8 mt-20 w-3/5 mx-auto">
      <div className="w-1/4 px-4">
        <Suspense fallback={<div>Loading account page...</div>}>
          <AccountSideBar />
        </Suspense>
      </div>
      <div className="w-3/4 border-gray-300 rounded-sm px-10 bg-white">
        {children}
      </div>
    </div>
  );
}
