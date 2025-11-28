import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password",
    description: "Set a new password for your PCTV account. Complete the password reset process to secure your access to project controls expert sessions and training content.",
    keywords: "reset password, new password, password change, account security, PCTV security, update password",
};

export default function ResetPasswordLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
