import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Log In",
    description: "Log in to access exclusive PCTV sessions hosted by experienced project controls professionals. Stream expert content on project management, scheduling, and cost control.",
    keywords: "login, sign in, authentication, PCTV access, project controls sessions, project management login, construction management access",
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
