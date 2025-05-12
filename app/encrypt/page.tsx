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
                    alert("Error encrypting message: " + error);
                }
            } else {
                setEncryptedMessage("");
            }
        };

        encryptAndShowMessage();
    }, [message, recipientPublicKey, passphrase]);

    return (
        <>
            <h1>Encrypt Message</h1>

            <div style={{ display: "flex", height: "calc(100vh - 100px)" }}>
                <textarea
                    placeholder="Recipient public key"
                    style={{ flex: 1, height: "100%", resize: "none" }}
                    value={recipientPublicKey}
                    onChange={(e) => setRecipientPublicKey(e.target.value)}
                />

                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <textarea
                        placeholder="Message"
                        style={{ resize: "none", flex: 1 }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Passphrase"
                        value={passphrase}
                        onChange={(e) => setPassphrase(e.target.value)}
                    />

                    <textarea
                        placeholder="Encrypted message"
                        readOnly
                        style={{ resize: "none", flex: 1 }}
                        value={encryptedMessage}
                        onChange={(e) => setEncryptedMessage(e.target.value)}
                    />
                </div>
            </div>
        </>
    );
}
