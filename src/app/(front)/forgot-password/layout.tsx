import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password",
    description: "Reset your PCTV account password. Enter your email address to receive password recovery instructions and regain access to exclusive project controls content.",
    keywords: "forgot password, reset password, password recovery, account recovery, PCTV password reset, recover account access",
};

export default function ForgotPasswordLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
