import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Create your PCTV account to access premium project controls content. Join industry professionals learning from expert sessions on project management, scheduling, and cost control.",
    keywords: "register, sign up, create account, PCTV membership, project controls learning, project management training, construction management education",
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
