import "@/app/globals.css";
import GoogleAuthProvider from "@/components/providers/GoogleAuthProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Project Control TV",
    default: "Project Control TV",
  },
  description: "Project Control TV - Exclusive Project Controls Content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GoogleAuthProvider>
          {children}
        </GoogleAuthProvider>
      </body>
    </html>
  );
}
