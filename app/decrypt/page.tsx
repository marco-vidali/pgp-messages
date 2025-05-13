"use client";

import { decryptMessage } from "@/utils/pgp";
import { useEffect, useState } from "react";

export default function Page() {
    const [senderPublicKey, setSenderPublicKey] = useState("");
    const [encryptedMessage, setEncryptedMessage] = useState("");
    const [passphrase, setPassphrase] = useState("");
    const [decryptedMessage, setDecryptedMessage] = useState("");

    useEffect(() => {
        const decryptAndShowMessage = async () => {
            if (encryptedMessage && senderPublicKey) {
                try {
                    const decryptedMessage = await decryptMessage(
                        encryptedMessage,
                        senderPublicKey,
                        passphrase
                    );

                    setDecryptedMessage(decryptedMessage);
                } catch (error) {
                    console.error("Error decrypting message:", error);
                }
            } else {
                setDecryptedMessage("");
            }
        };

        decryptAndShowMessage();
    }, [encryptedMessage, senderPublicKey, passphrase]);

    return (
        <div className="flex flex-col items-center gap-8">
            <h1 className="text-xl font-bold">Decrypt Message</h1>

            <div className="flex flex-col gap-4 w-full lg:flex-row lg:h-[calc(100vh-6rem)]">
                <div className="flex-1">
                    <textarea
                        placeholder="Sender public key"
                        value={senderPublicKey}
                        onChange={(e) => setSenderPublicKey(e.target.value)}
                        className="textarea w-full h-64 lg:h-full"
                    />
                </div>

                <div className="flex flex-col gap-4 flex-1">
                    <textarea
                        placeholder="Encrypted message"
                        value={encryptedMessage}
                        onChange={(e) => setEncryptedMessage(e.target.value)}
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
                        placeholder="Decrypted message"
                        readOnly
                        value={decryptedMessage}
                        onChange={(e) => setDecryptedMessage(e.target.value)}
                        className="textarea w-full h-64 grow"
                    />
                </div>
            </div>
        </div>
    );
}
