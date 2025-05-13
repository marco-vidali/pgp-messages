import RedirectToGenerateKeyPair from "./components/RedirectToGenerateKeyPair";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <RedirectToGenerateKeyPair />
            <body>{children}</body>
        </html>
    );
}
