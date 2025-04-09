"use client";
import "@/app/globals.css";
import { useState } from "react";

import { SideBar, TopHeader } from "@/components/layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-gray-100">
          <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />

          <div className="lg:pl-72">
            <TopHeader
              sideBarOpen={sideBarOpen}
              setSideBarOpen={setSideBarOpen}
            />

            <main className="py-5">
              <div className="px-2 sm:px-4 lg:px-4">{children}</div>
            </main>
          </div>
      </body>
    </html>
  );
}
