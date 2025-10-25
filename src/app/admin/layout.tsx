'use client'
import "@/app/globals.css";
import { PublicDataProvider } from "@/components/context/PublicDataContext";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

type JwtPayload = {
  exp?: number; // seconds since epoch
  iat?: number;
  [key: string]: unknown;
};

// export const metadata = {
//   title: "Project Control TV",
//   description: "Welcome to Project Control TV!",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token); // ✅ tell TS the shape
      const expMs = (decoded.exp ?? 0) * 1000;      // handle undefined
      if (!decoded.exp || expMs < Date.now()) {
        localStorage.removeItem("token");
        router.replace("/login");
      }
    } catch (err) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router]);

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <PublicDataProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          <ToastContainer />
        </PublicDataProvider>
      </body>
    </html>
  );
}
