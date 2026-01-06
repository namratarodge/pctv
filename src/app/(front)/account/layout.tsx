"use client";

import { AccountSideBar } from "@/components/layout";
import React, { Suspense } from "react";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-4xl mx-auto mt-30 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="w-full md:w-1/4 bg-white rounded-lg  border-gray-200 ">
          <Suspense fallback={<div>Loading account page...</div>}>
            <AccountSideBar />
          </Suspense>
        </div>
        <div className="w-full md:w-3/4 bg-white rounded-lg  border-gray-200  sm:p-2">
          {children}
        </div>
      </div>
    </div>
  );
}
