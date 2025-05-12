"use client";

import { generateKeyPair } from "@/utils/pgp";
import { redirect } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function GenerateKeyPairForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passphrase, setPassphrase] = useState("");

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await generateKeyPair(name, email, passphrase);
        redirect("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name (optional)"
                onChange={(e) => setName(e.currentTarget.value)}
            />

            <input
                type="text"
                placeholder="E-Mail (optional)"
                onChange={(e) => setEmail(e.currentTarget.value)}
            />

            <input
                type="password"
                required
                placeholder="Passphrase"
                onChange={(e) => setPassphrase(e.currentTarget.value)}
            />

            <input type="submit" value="Generate" />
        </form>
    );
}
