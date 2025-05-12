"use client";

import { isStoredPublicKeyValid } from "@/utils/pgp";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useEffect(() => {
        const initKeyPair = async () => {
            if (!(await isStoredPublicKeyValid()))
                redirect("/generate-key-pair");
        };

        initKeyPair();
    }, []);

    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
