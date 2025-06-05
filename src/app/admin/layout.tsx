import "@/app/globals.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Project Control TV",
  description: "Welcome to Project Control TV!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        <ToastContainer />
      </body>
    </html>
  );
}
