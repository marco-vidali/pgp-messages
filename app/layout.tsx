import RedirectToGenerateKeyPair from "./components/RedirectToGenerateKeyPair";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="light">
            <RedirectToGenerateKeyPair />
            <body className="p-4">{children}</body>
        </html>
    );
}
