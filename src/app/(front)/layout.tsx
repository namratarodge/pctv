import FrontLayoutClient from "@/components/layout/FrontLayoutClient";

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FrontLayoutClient>
      {children}
    </FrontLayoutClient>
  );
}
