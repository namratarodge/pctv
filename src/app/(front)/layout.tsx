"use client";

import "@/app/globals.css";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout";
import { ToastContainer } from "react-toastify";
import { PublicDataProvider } from "@/components/context/PublicDataContext";
import { usePathname } from "next/navigation";

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
            pageName === "/account" ? "bg-white" : "bg-[#161f27]"
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
