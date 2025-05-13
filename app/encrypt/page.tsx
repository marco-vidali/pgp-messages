"use client";

import { encryptMessage } from "@/utils/pgp";
import { useEffect, useState } from "react";

export default function Page() {
    const [recipientPublicKey, setRecipientPublicKey] = useState("");
    const [message, setMessage] = useState("");
    const [encryptedMessage, setEncryptedMessage] = useState("");
    const [passphrase, setPassphrase] = useState("");

    useEffect(() => {
        const encryptAndShowMessage = async () => {
            if (message && recipientPublicKey) {
                try {
                    const encryptedMessage = await encryptMessage(
                        message,
                        recipientPublicKey,
                        passphrase
                    );

                    setEncryptedMessage(encryptedMessage);
                } catch (error) {
                    console.error("Error encrypting message:", error);
                }
            } else {
                setEncryptedMessage("");
            }
        };

        encryptAndShowMessage();
    }, [message, recipientPublicKey, passphrase]);

    return (
        <div className="flex flex-col items-center gap-8">
            <h1 className="text-xl font-bold">Encrypt Message</h1>

            <div className="flex flex-col gap-4 w-full lg:flex-row lg:h-[calc(100vh-6rem)]">
                <div className="flex-1">
                    <textarea
                        placeholder="Recipient public key"
                        value={recipientPublicKey}
                        onChange={(e) => setRecipientPublicKey(e.target.value)}
                        className="textarea w-full h-64 lg:h-full"
                    />
                </div>

                <div className="flex flex-col gap-4 flex-1">
                    <textarea
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="textarea w-full h-32"
                    />

                    <input
                        type="password"
                        placeholder="Passphrase"
                        value={passphrase}
                        onChange={(e) => setPassphrase(e.target.value)}
                        className="input w-full"
                    />

                    <textarea
                        placeholder="Encrypted message"
                        readOnly
                        value={encryptedMessage}
                        onChange={(e) => setEncryptedMessage(e.target.value)}
                        className="textarea w-full h-64 grow"
                    />
                </div>
            </div>
        </div>
    );
}
