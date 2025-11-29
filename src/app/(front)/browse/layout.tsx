import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Videos",
  description:
    "Explore the complete PCTV video library. Search and discover expert sessions on project controls, project management, scheduling, cost control, and construction management.",
  keywords:
    "browse, video library, search videos, project controls content, training sessions, expert videos, project management courses",
};

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
