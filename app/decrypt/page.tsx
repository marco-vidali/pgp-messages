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
                    alert("Error decrypting message: " + error);
                }
            } else {
                setDecryptedMessage("");
            }
        };

        decryptAndShowMessage();
    }, [encryptedMessage, senderPublicKey, passphrase]);

    return (
        <>
            <h1>Decrypt Message</h1>

            <div style={{ display: "flex", height: "calc(100vh - 100px)" }}>
                <textarea
                    placeholder="Sender public key"
                    style={{ flex: 1, height: "100%", resize: "none" }}
                    value={senderPublicKey}
                    onChange={(e) => setSenderPublicKey(e.target.value)}
                />

                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <textarea
                        placeholder="Encrypted message"
                        style={{ resize: "none", flex: 1 }}
                        value={encryptedMessage}
                        onChange={(e) => setEncryptedMessage(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Passphrase"
                        value={passphrase}
                        onChange={(e) => setPassphrase(e.target.value)}
                    />

                    <textarea
                        placeholder="Decrypted message"
                        readOnly
                        style={{ resize: "none", flex: 1 }}
                        value={decryptedMessage}
                        onChange={(e) => setDecryptedMessage(e.target.value)}
                    />
                </div>
            </div>
        </>
    );
}
