import RedirectToGenerateKeyPair from "./components/RedirectToGenerateKeyPair";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="light">
            <head>
                <title>PGP Messages</title>
            </head>

            <body className="p-4">
                <RedirectToGenerateKeyPair />
                {children}
            </body>
        </html>
    );
}
