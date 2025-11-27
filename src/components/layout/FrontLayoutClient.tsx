"use client";

import { PublicDataProvider } from "@/components/context/PublicDataContext";
import { Footer } from "@/components/layout";
import Header from "@/components/layout/Header";
import { WhitePages } from "@/constants/Menu";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { ToastContainer } from "react-toastify";

export default function FrontLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // e.g. G-XXXXXXX
    const pageName = usePathname();

    return (
        <>
            <div
                className={`${WhitePages.includes(pageName)
                        ? "bg-white text-gray-700 "
                        : "bg-[#161f27] text-gray-300 "
                    } `}
            >
                <PublicDataProvider>
                    <Header />
                    {children}
                    <Footer />
                </PublicDataProvider>
                {GA_ID && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                            strategy="afterInteractive"
                        />
                        <Script id="ga-init" strategy="afterInteractive">
                            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
                        </Script>
                    </>
                )}
            </div>
            <ToastContainer />
        </>
    );
}
