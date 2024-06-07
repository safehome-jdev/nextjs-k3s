import { RUMAgent } from "@/apmAgent";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "NextJS-K3s-PoC",
    description: "Created with Next.js and MongoDB",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    RUMAgent();
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
