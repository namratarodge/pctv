'use client'
import { SettingSideBar } from "@/components/layout";
import React, { Suspense } from "react";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4 sm:px-6 lg:px-2 flex">
      <div className="w-1/4 px-4">
        <Suspense fallback={<div>Loading account page...</div>}>
            <SettingSideBar />
          </Suspense>
      </div>
      <div className="w-3/4 border border-gray-300 rounded-sm p-4 bg-white">
        <div className="bg-white text-gray-500">{children}</div>
      </div>
    </div>
  );
}
