"use client";

import "@/app/globals.css";
import { PublicDataProvider } from "@/components/context/PublicDataContext";
import { Footer } from "@/components/layout";
import Header from "@/components/layout/Header";
import { WhitePages } from "@/constants/Menu";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageName = usePathname();

  return (
    <>
      <html lang="en">
        <title> Project Controls TV </title>
        <body
          className={`${
            WhitePages.includes(pageName)
              ? "bg-white text-gray-700 "
              : "bg-[#161f27] text-gray-300 "
          } `}
        >
          <PublicDataProvider>
            <Header />
            {children}
            <Footer />
          </PublicDataProvider>
        </body>
      </html>
      <ToastContainer />
    </>
  );
}
