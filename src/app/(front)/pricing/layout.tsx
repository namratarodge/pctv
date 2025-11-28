import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing Plans",
    description: "Choose the perfect PCTV subscription plan for your project controls learning journey. Access exclusive sessions from industry experts on project management, scheduling, and cost control.",
    keywords: "pricing, subscription plans, membership, PCTV pricing, project controls training cost, membership plans, subscription options",
};

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
