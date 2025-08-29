import "@/app/globals.css";
import { PublicDataProvider } from "@/components/context/PublicDataContext";
import { ToastContainer } from "react-toastify";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

// export const metadata = {
//   title: "Project Control TV",
//   description: "Welcome to Project Control TV!",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
