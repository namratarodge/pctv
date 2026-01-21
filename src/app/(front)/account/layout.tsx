"use client";

import { AccountSideBar } from "@/components/layout";
import React, { Suspense } from "react";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex  justify-center p-4">
      <div className="max-w-6xl mt-20 w-full  rounded-lg">
        <div className="flex flex-col md:flex-row gap-2 md:gap-2">
          <div className="w-full md:w-1/4 bg-white rounded-lg border-gray-200">
            <Suspense fallback={<div>Loading account page...</div>}>
              <AccountSideBar />
            </Suspense>
          </div>
          <div className="w-full md:w-4/4 bg-white rounded-lg border-gray-200 sm:p-2 ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
