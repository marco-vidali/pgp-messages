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
                <link
                    rel="icon"
                    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔑</text></svg>"
                />
            </head>

            <body>
                <RedirectToGenerateKeyPair />

                <div className="flex flex-col h-screen">
                    <div className="p-4 grow">{children}</div>

                    <footer className="footer sm:footer-horizontal footer-center text-base-content p-4 border-t border-base-300">
                        <aside>
                            <p>Designed and developed by Marco Vidali.</p>
                        </aside>
                    </footer>
                </div>
            </body>
        </html>
    );
}
